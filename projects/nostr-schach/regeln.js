// Regeln von Nostr-Schach: Events prüfen und eine Partie daraus nachbauen.
//
// Dieses Modul ist bewusst ohne DOM und ohne Relay-Verbindung. Die Spieler-Seite (index.html) und
// die Schiri-Seite (schiri.html) laden es im Browser (Import-Map aus einstellungen.js), die Tests
// laden es in Node.
// Beide müssen zu jedem Satz Events exakt dasselbe Ergebnis liefern.
//
// Protokoll (v2), Spezifikation in docs/protokoll.md
//   kind 4664 (regulär), Tags: ["t","nostr-schach"], ["g",<partie-id>]
//   Events mit dem alten kind 6464 (v1) werden nicht mehr gelesen.
//   content (JSON):
//     {"t":"create","farbe":"w"|"b"}            Ersteller und seine Farbe
//       dazu Tag ["time_control","600+5"]: 10 min Grundzeit, 5 s Zuschlag je Zug
//     {"t":"join"}                              erster fremder Beitritt = Gegner
//     {"t":"move","ply":n,"from":"e2","to":"e4","promotion":"q","san":"e4"}
//       dazu Tag ["e",<id>]: Event-ID des vorherigen gezählten Zugs, bei ply 1 des gezählten create
//     {"t":"resign"}
//   Schiri-Partie: create mit Tag ["schiri",<pubkey>] und ["p",<pubkey>]; Events des Schiris:
//     {"t":"start"}                             mit ["e",<join-id>], created_at = t₀ (Uhr läuft)
//     {"t":"ergebnis","art":…,"verlierer":…}    mit ["e",<auslösendes Event>], verbindlich
//     kind 3410 (ack), content leer, ["e",<zug-id>,"","attests"]: bestätigt einen Zug
//   Einsatz (nur Schiri-Partie): create zusätzlich mit ["einsatz","100"|"500"|"1000"] und ["mint",<url>]
//     {"t":"einsatz","token":"cashuB…"}         von jedem Spieler nach dem join: gesperrter Einsatz
//     {"t":"antrag","inputs":[…],"outputs":[…]} mit ["e",<ergebnis-id>]: vorbereiteter Tausch
//     {"t":"freigabe","sig":"<hex>"}            vom Schiri, mit ["e",<antrag-id>]: Signatur (SIG_ALL)

import { verifyEvent } from 'nostr-tools';
import { Chess } from 'chess.js';
import { getDecodedToken, hasValidDleq, parseP2PKSecret, hashToCurve, schnorrVerifyMessage, Amount } from '@cashu/cashu-ts';

export const KIND = 4664;
export const TAG = 'nostr-schach';

// Zeitkontrolle (E2): die einzige im MVP. Zeiten in Sekunden.
export const ZEITKONTROLLE = '600+5';
export const GRUNDZEIT = 600;
export const ZUSCHLAG = 5;
// Kommt der erste Zug nicht innerhalb dieser Zeit nach dem `join`, ist die Partie abgebrochen.
export const ABBRUCH_NACH = 30;

// Schiri-Partie (M2): Bestätigung eines Zugs nach dem Sashité-Entwurf „Event Timestamp
// Attestation“ (nostr-protocol/nips#2359, offener Entwurf).
export const KIND_ACK = 3410;
// Ist ein gültiger Zug so lange unbestätigt, oder kommt so lange nach dem `join` kein `start`,
// ist die Partie annulliert.
export const ANNULLIERT_NACH = 600;
// Lebenszeichen des Schiris (ersetzbar, ein Event je Schiri), jede Minute
export const KIND_LEBENSZEICHEN = 14664;
// Arten von `ende` bzw. `ergebnis` mit und ohne Verlierer
const MIT_VERLIERER = ['matt', 'aufgabe', 'zeit', 'doppelzug'];
const OHNE_VERLIERER = ['remis', 'abbruch', 'annulliert'];
// Nur in Einsatz-Partien: Verlierer ist, wer nicht bezahlt hat (fehlt, wenn beide nicht bezahlt haben)
const NICHT_BEZAHLT = 'nicht-bezahlt';

// Einsatz (M3, E3): feste Beträge in Sat. Die Einsätze sind Cashu-Token, per P2PK (NUT-11) auf
// 2 von 3 aus {Weiß, Schwarz, Schiri} gesperrt (`SIG_ALL`), nach der Sperrfrist (`created_at` des
// `create` + SPERRFRIST) auch für den Absender allein. Fehlt ZAHLFRIST nach dem `join` ein gültiger
// Einsatz, ist die Partie `nicht-bezahlt`.
export const EINSAETZE = [100, 500, 1000];
export const SPERRFRIST = 86400;
export const ZAHLFRIST = 600;
// Der Schiri sendet `start` nur, solange bis zur Sperrfrist (`create.created_at` + SPERRFRIST) noch
// mindestens so viele Sekunden bleiben. Sonst könnte ein Spieler seinen Einsatz während der Partie
// allein zurückholen.
export const START_VORLAUF = 7200;
// Erlaubte Mints: die URLs aus `EINSTELLUNGEN.MINTS` (einstellungen.js), ohne Schrägstrich am Ende.
// Gelesen beim Aufruf, damit einstellungen.js vor oder nach diesem Modul geladen werden darf.
export const erlaubteMints = () => (globalThis.EINSTELLUNGEN?.MINTS ?? []).map((m) => m.url);

// Trägt das Event genau einen `time_control`-Tag mit der Zeitkontrolle des MVP?
const zeitkontrolleOk = (ev) => {
  const t = ev.tags.filter((x) => x[0] === 'time_control');
  return t.length === 1 && t[0][1] === ZEITKONTROLLE;
};

const hex64 = (s) => typeof s === 'string' && /^[0-9a-f]{64}$/.test(s);
const eTags = (ev) => ev.tags.filter((t) => t[0] === 'e');
// ID aus dem einzigen `e`-Tag, sonst undefined
const einE = (ev) => { const e = eTags(ev); return e.length === 1 ? e[0][1] : undefined; };

// Schiri aus dem `create`: null ohne `schiri`-Tag, undefined bei kaputtem Tag (create ungültig).
// Mit `schiri`-Tag muss das `create` genau einen `p`-Tag mit demselben Schlüssel tragen, damit
// der Schiri seine Partien über `#p` abonnieren kann.
const schiriVon = (ev) => {
  const s = ev.tags.filter((x) => x[0] === 'schiri');
  if (s.length === 0) return null;
  const p = ev.tags.filter((x) => x[0] === 'p');
  return s.length === 1 && hex64(s[0][1]) && p.length === 1 && p[0][1] === s[0][1] ? s[0][1] : undefined;
};

// Einsatz aus dem `create`: null ohne `einsatz`- und `mint`-Tag, undefined, wenn das `create`
// deshalb ungültig ist (nur einer der Tags, doppelt, anderer Betrag, fremde Mint, ohne Schiri).
const einsatzVon = (ev, schiri) => {
  const e = ev.tags.filter((x) => x[0] === 'einsatz'), m = ev.tags.filter((x) => x[0] === 'mint');
  if (e.length === 0 && m.length === 0) return null;
  if (e.length !== 1 || m.length !== 1 || !schiri) return undefined;
  const betrag = EINSAETZE.find((b) => String(b) === e[0][1]);
  return betrag && erlaubteMints().includes(m[0][1]) ? { betrag, mint: m[0][1] } : undefined;
};

// Ist der Inhalt ein gültiges `ergebnis` (Art bekannt, Verlierer genau dann, wenn die Art einen hat)?
// `nicht-bezahlt` gibt es nur in Einsatz-Partien, mit oder ohne Verlierer.
const ergebnisOk = (c, mitEinsatz) => (MIT_VERLIERER.includes(c.art) && (c.verlierer === 'w' || c.verlierer === 'b'))
  || (OHNE_VERLIERER.includes(c.art) && c.verlierer === undefined)
  || (mitEinsatz && c.art === NICHT_BEZAHLT && [undefined, 'w', 'b'].includes(c.verlierer));

// P2PK-Schlüssel (NUT-11) zu einem Nostr-Schlüssel: komprimiert mit `02` und der x-Koordinate
const p2pk = (pk) => '02' + pk;
const ohneSchraegstrich = (url) => (typeof url === 'string' ? url.replace(/\/+$/, '') : url);
const farbeVon = (partie, pk) => (pk === partie.spieler.w ? 'w' : pk === partie.spieler.b ? 'b' : null);
// Erlaubte Tags im P2PK-Secret eines Einsatzes (jeder höchstens einmal, prüft cashu-ts)
const EINSATZ_TAGS = ['pubkeys', 'n_sigs', 'locktime', 'refund', 'n_sigs_refund', 'sigflag'];
const nein = (grund) => ({ gueltig: false, grund });

// Prüft einen `einsatz` (mit `lies` gelesen) gegen die Partie (aus `baue`) und die Schlüssel der
// Mint, ohne Netz. `mintSchluessel` ist eine Liste von Keysets der Mint der Partie, je
// `{ id, unit, keys: { <betrag>: <pubkey hex> }, input_fee_ppk }` (aus `GET /v1/keys` und
// `GET /v1/keysets`). Ob die Proofs noch unausgegeben sind (NUT-07), prüft der Schiri bei der Mint.
// Ergebnis: `{ gueltig: false, grund }` oder `{ gueltig: true, farbe, ev, summe, gebuehr, proofs }`,
// `proofs` je `{ id, amount, secret, C, Y }` (Y = hash_to_curve(secret), für NUT-07), `gebuehr`
// die Gebühr der Mint in Sat für einen Tausch aller Proofs (NUT-02).
export function pruefeEinsatz(ev, partie, mintSchluessel) {
  if (!partie?.einsatz) return nein('Partie ohne Einsatz');
  if (ev?.c?.t !== 'einsatz' || partieVon(ev) !== partie.g) return nein('kein einsatz dieser Partie');
  const { spieler, schiri, create, join } = partie;
  if (!join) return nein('noch kein Gegner');
  const farbe = farbeVon(partie, ev.pubkey);
  if (!farbe) return nein('Absender ist keiner der Spieler');
  if (ev.created_at < join.created_at) return nein('vor dem join');
  if (ev.created_at > join.created_at + ZAHLFRIST) return nein('nach der Zahlfrist');
  const keysets = (Array.isArray(mintSchluessel) ? mintSchluessel : [])
    .filter((k) => k && typeof k.id === 'string' && k.keys && typeof k.keys === 'object');
  if (!keysets.length) return nein('keine Schlüssel der Mint');
  let token;
  try { token = getDecodedToken(ev.c.token, keysets.map((k) => k.id)); } catch { return nein('Token nicht lesbar oder Keyset unbekannt'); }
  if (ohneSchraegstrich(token.mint) !== partie.einsatz.mint) return nein('fremde Mint');
  if (token.unit !== 'sat') return nein('Einheit nicht sat');
  if (!token.proofs.length) return nein('keine Proofs');

  const lockSchluessel = [spieler.w, spieler.b, schiri].map(p2pk);
  const sperre = { n_sigs: '2', sigflag: 'SIG_ALL', locktime: String(create.created_at + SPERRFRIST), refund: p2pk(ev.pubkey) };
  let summe = 0n, ppk = 0, muster = null;
  const proofs = [], secrets = new Set();
  for (const p of token.proofs) {
    const ks = keysets.find((k) => k.id === p.id);
    if (!ks || ks.unit !== 'sat') return nein('Keyset unbekannt oder nicht sat');
    if (secrets.has(p.secret)) return nein('Proof doppelt');
    secrets.add(p.secret);
    let s;
    try { s = parseP2PKSecret(p.secret); } catch { return nein('kein P2PK-Secret'); }
    if (s[0] !== 'P2PK') return nein('kein P2PK-Secret');
    const tags = s[1].tags ?? [];
    if (!Array.isArray(tags) || tags.some((t) => !Array.isArray(t) || !EINSATZ_TAGS.includes(t[0]))) return nein('unbekannter Tag im Secret');
    const tag = (name) => tags.find((t) => t[0] === name)?.slice(1);
    const nur = (name, wert) => { const t = tag(name); return t?.length === 1 && t[0] === wert; };
    const schluessel = [s[1].data, ...(tag('pubkeys') ?? [])];
    if (schluessel.length !== 3 || new Set(schluessel).size !== 3 || !schluessel.every((k) => lockSchluessel.includes(k))) return nein('Schlüssel nicht genau Weiß, Schwarz und Schiri');
    if (!nur('n_sigs', sperre.n_sigs)) return nein('n_sigs nicht 2');
    if (!nur('sigflag', sperre.sigflag)) return nein('sigflag nicht SIG_ALL');
    if (!nur('locktime', sperre.locktime)) return nein('falsche Sperrfrist');
    if (!nur('refund', sperre.refund)) return nein('Erstattungsschlüssel nicht der des Absenders');
    if (tag('n_sigs_refund') && !nur('n_sigs_refund', '1')) return nein('n_sigs_refund nicht 1');
    // SIG_ALL: Alle Inputs eines Tauschs brauchen gleiche `data` und `tags` (nur die nonce variiert)
    const m = JSON.stringify([s[1].data, tags]);
    if (muster !== null && m !== muster) return nein('Secrets der Proofs unterscheiden sich');
    muster = m;
    let dleq = false;
    try { dleq = hasValidDleq(p, ks); } catch { /* Betrag ohne Schlüssel im Keyset */ }
    if (!dleq) return nein('DLEQ fehlt oder falsch');
    const betrag = Amount.from(p.amount).toBigInt();
    summe += betrag;
    ppk += Number(ks.input_fee_ppk ?? 0);
    proofs.push({ id: p.id, amount: Number(betrag), secret: p.secret, C: p.C,
      Y: hashToCurve(new TextEncoder().encode(p.secret)).toHex(true) });
  }
  if (summe !== BigInt(partie.einsatz.betrag)) return nein(`Summe ${summe} statt ${partie.einsatz.betrag} sat`);
  return { gueltig: true, farbe, ev, summe: partie.einsatz.betrag, gebuehr: Math.ceil(ppk / 1000), proofs };
}

// Die Nachricht, die nach NUT-11 bei `SIG_ALL` für einen Tausch (NUT-03) signiert wird:
// secret_0 ‖ C_0 ‖ … ‖ secret_n ‖ C_n ‖ amount_0 ‖ B_0 ‖ … ‖ amount_m ‖ B_m (Text, ohne Trenner).
// Signiert wird ihr SHA-256 (Schnorr, BIP-340).
export const sigAllNachricht = (inputs, outputs) =>
  [...inputs.flatMap((p) => [p.secret, p.C]), ...outputs.flatMap((o) => [String(o.amount), o.B_])].join('');

// Welche Einsätze welcher Spieler nach dem verbindlichen `ergebnis` des Schiris freigegeben bekommen
// darf: `{ w: [...], b: [...] }` mit den gezählten Einsätzen (wie von `pruefeEinsatz`, je mit
// `proofs`, darin `secret` und `Y`). Der Gewinner (Matt, Aufgabe, Zeit, Doppelzug) bekommt beide,
// bei Remis, Abbruch, Nicht-Zahlen und Annullierung jeder seinen eigenen. Ohne `ergebnis` oder in
// Partien ohne Einsatz null.
export function anspruch(partie) {
  if (!partie?.einsatz || !partie.ergebnis) return null;
  const { art, verlierer } = partie.ergebnis.c;
  const eigen = (f) => (partie.einsaetze[f] ? [partie.einsaetze[f]] : []);
  if (!MIT_VERLIERER.includes(art)) return { w: eigen('w'), b: eigen('b') };
  const sieger = verlierer === 'w' ? 'b' : 'w';
  return { [sieger]: [...eigen('w'), ...eigen('b')], [verlierer]: [] };
}

// Prüft einen `antrag` gegen die Partie (aus `baue`, mit Mint-Schlüsseln gebaut): `e`-Tag auf das
// `ergebnis`, Absender ist Spieler, `inputs` sind genau die Proofs eines Einsatzes, der ihm zusteht
// (ohne Witness), `outputs` sind BlindedMessages `{ amount, id, B_ }` mit Keyset und Betrag der Mint
// und zusammen höchstens die Inputs minus die Gebühr der Mint. Ergebnis: `{ gueltig: false, grund }`
// oder `{ gueltig: true, farbe, einsatz, nachricht }` (`einsatz`: wessen Einsatz, `nachricht`: die
// `SIG_ALL`-Nachricht, die der Schiri signiert).
export function pruefeAntrag(ev, partie) {
  const recht = anspruch(partie);
  if (!recht) return nein('kein ergebnis oder Partie ohne Einsatz');
  if (ev?.c?.t !== 'antrag' || partieVon(ev) !== partie.g) return nein('kein antrag dieser Partie');
  if (einE(ev) !== partie.ergebnis.id) return nein('e-Tag zeigt nicht auf das ergebnis');
  const farbe = farbeVon(partie, ev.pubkey);
  if (!farbe) return nein('Absender ist keiner der Spieler');
  const { inputs, outputs } = ev.c;
  if (!Array.isArray(inputs) || !inputs.length || !Array.isArray(outputs) || !outputs.length) return nein('inputs oder outputs fehlen');
  const quelle = recht[farbe].find((e) => e.proofs.some((p) => p.secret === inputs[0]?.secret));
  if (!quelle) return nein('Inputs gehören zu keinem Einsatz, der dem Absender zusteht');
  if (inputs.length !== quelle.proofs.length) return nein('Inputs sind nicht genau die Proofs des Einsatzes');
  const offen = new Map(quelle.proofs.map((p) => [p.secret, p]));
  for (const i of inputs) {
    const p = i && typeof i === 'object' && offen.get(i.secret);
    if (!p || i.C !== p.C || i.id !== p.id || i.amount !== p.amount || 'witness' in i) return nein('Inputs sind nicht genau die Proofs des Einsatzes');
    offen.delete(i.secret);
  }
  const keysets = partie.mintSchluessel ?? [];
  const bs = new Set();
  let summe = 0;
  for (const o of outputs) {
    if (!o || typeof o !== 'object' || !Number.isSafeInteger(o.amount) || o.amount <= 0
      || typeof o.B_ !== 'string' || !/^0[23][0-9a-f]{64}$/.test(o.B_) || bs.has(o.B_)) return nein('Output ungültig');
    const ks = keysets.find((k) => k?.id === o.id && k.unit === 'sat');
    if (!ks || !Object.hasOwn(ks.keys, String(o.amount))) return nein('Output mit fremdem Keyset oder Betrag');
    bs.add(o.B_);
    summe += o.amount;
  }
  const hoechstens = quelle.summe - quelle.gebuehr;
  if (summe > hoechstens) return nein(`Outputs ${summe} sat, höchstens ${hoechstens} sat`);
  return { gueltig: true, farbe, einsatz: quelle.farbe, nachricht: sigAllNachricht(inputs, outputs) };
}

// Geprüfte Einsätze je Satz Mint-Schlüssel merken (baue läuft auf der Schiri-Seite jede Sekunde)
const einsatzCache = new WeakMap();
function gepruefterEinsatz(ev, partie, mintSchluessel) {
  if (!einsatzCache.has(mintSchluessel)) einsatzCache.set(mintSchluessel, new Map());
  const cache = einsatzCache.get(mintSchluessel);
  const k = `${ev.id}:${partie.create.id}:${partie.join.id}`;
  if (!cache.has(k)) cache.set(k, pruefeEinsatz(ev, partie, mintSchluessel));
  return cache.get(k);
}

export const gueltigeId = (g) => typeof g === 'string' && /^[0-9a-f]{16}$/.test(g);
export const partieVon = (ev) => ev.tags?.find((t) => t[0] === 'g')?.[1];

// Prüft ein Event von einem Relay oder aus eigener Hand. Gibt das Event mit dem geparsten Inhalt
// in `ev.c` zurück, oder null, wenn es nicht zum Spiel gehört, kaputt ist oder die Signatur nicht
// stimmt. nostr-tools merkt sich bereits geprüfte Events, doppelte Prüfung kostet also nichts.
// Ein `ack` (kind 3410) hat keinen JSON-Inhalt und bekommt kein `ev.c`.
export function lies(ev) {
  if (!ev || (ev.kind !== KIND && ev.kind !== KIND_ACK)) return null;
  if (!gueltigeId(partieVon(ev))) return null;
  if (ev.kind === KIND_ACK) {
    const e = eTags(ev);
    if (ev.content !== '' || e.length !== 1 || !hex64(e[0][1]) || e[0][3] !== 'attests') return null;
    return verifyEvent(ev) ? ev : null;
  }
  if (!verifyEvent(ev)) return null;
  let c;
  try { c = JSON.parse(ev.content); } catch { return null; }
  if (!c || typeof c !== 'object' || typeof c.t !== 'string') return null;
  // Einsatz-Typen: Grundform prüfen, den Inhalt prüfen pruefeEinsatz und pruefeAntrag
  if (c.t === 'einsatz' && typeof c.token !== 'string') return null;
  if (c.t === 'antrag' && (!Array.isArray(c.inputs) || !Array.isArray(c.outputs) || einE(ev) === undefined)) return null;
  if (c.t === 'freigabe' && (typeof c.sig !== 'string' || !/^[0-9a-f]{128}$/.test(c.sig) || einE(ev) === undefined)) return null;
  ev.c = c;
  return ev;
}

// Baut eine Partie aus allen Events nach, die mit `lies` geprüft wurden und zu ihr gehören.
// Regeln:
//   - Das früheste `create` mit gültiger Farbe legt Ersteller und Farbe fest.
//   - Der früheste `join` eines anderen Schlüssels (nicht vor dem `create`) ist der Gegner.
//   - Pro `ply` zählen nur gültige Züge: legal, vom Spieler, der am Zug ist, und verkettet. Illegale
//     Züge, Züge fremder Schlüssel und Züge des Spielers, der nicht am Zug ist, werden ignoriert.
//   - Kette: Ein Zug trägt genau einen `e`-Tag mit der ID des gezählten Vorgängers (Zug `ply - 1`,
//     bei `ply` 1 das gezählte `create`) und ist nicht älter als dieser (`created_at` nicht
//     kleiner). Sonst zählt er nicht. Liegt der Vorgänger als mehrere gleiche Events vor, darf
//     der `e`-Tag auf jedes davon zeigen.
//   - Denselben Zug mehrfach zu senden (gleiches `from`, `to` und `promotion`) ist erlaubt.
//   - Doppelzug: Wer für denselben `ply` zwei verschiedene gültige Züge sendet, verliert
//     (`ende.art = 'doppelzug'`). Die Auswertung endet dort, eine spätere Aufgabe ändert nichts.
//     Eine fehlende `promotion` gilt wie beim Ausführen als Dame. Ein Zug, der nicht zählt
//     (z. B. ohne passenden `e`-Tag), löst keinen Doppelzug aus.
//   - Fehlt ein gültiger Zug für einen `ply`, endet die Auswertung dort.
//   - Uhr (Zeitkontrolle 600+5): Sie startet mit dem gezählten `join`. Ein Zug verbraucht sein
//     `created_at` minus das des Vorgängers (beim ersten Zug der `join`, sonst der vorherige
//     gezählte Zug, nie weniger als 0). Ist der Verbrauch größer als die Restzeit des Spielers,
//     zählt der Zug nicht, sonst wird er abgezogen und es gibt 5 s Zuschlag. Für den ersten Zug
//     gilt statt der Restzeit die Frist von 30 s (Abbruch).
//   - Eine Aufgabe eines Spielers beendet die Partie. Züge, die in der Sortierung danach kommen,
//     zählen nicht; so ändert auch eine Aufgabe nach Matt, Patt oder Doppelzug nichts.
//   - Zeitverlust und Abbruch nur mit `jetzt` (Sekunden): Ist die Restzeit des Spielers am Zug
//     (bzw. die 30 s ohne ersten Zug) zum Zeitpunkt `jetzt` überschritten, ist die Partie mit
//     `ende.art = 'zeit'` bzw. `'abbruch'` vorbei. Eine Aufgabe zählt nur, wenn sie nicht nach
//     diesem Ablauf kommt. Ohne `jetzt` wertet `baue()` nur die Events aus.
// Schiri-Partie (`create` mit Tag `["schiri",<pubkey>]`, nur Events dieses Schlüssels zählen):
//   - `start`: das früheste mit `e`-Tag auf den gezählten `join`, nicht vor ihm und höchstens
//     600 s danach. Sein `created_at` ist t₀. Erst ab t₀ läuft die Uhr und werden Züge gewertet.
//   - `ack` (kind 3410): Ein Zug zählt nur mit gültigem `ack` (nicht älter als der Zug und höchstens
//     600 s jünger). Bei mehreren gilt der früheste. Statt des `created_at` des Zugs zählt das des
//     `ack`, für Verbrauch, Frist und Zuschlag. Ein gültiger Zug ohne `ack` ist `ausstehend`.
//   - Solange ein Zug ausstehend ist, gibt es keinen Zeitverlust und keinen Abbruch. Ist er länger
//     als 600 s ausstehend, oder kommt 600 s nach dem `join` kein `start`, ist die Partie
//     annulliert (`ende.art = 'annulliert'`, nur mit `jetzt`).
//   - Das früheste gültige `ergebnis` des Schiris ist `ende`. Weicht das eigene Ende davon ab,
//     steht beides in `abweichung: { schiri, eigen }`.
// `ids` steht parallel zu `zuege` und enthält die Event-ID jedes gezählten Zugs (bei mehreren
// gleichen Events das erste nach `created_at`, dann `id`, in Schiri-Partien das mit dem
// frühesten `ack`). Darauf verweist der nächste Zug.
// `join` ist der gezählte `join` (oder null), `ergebnis` das verbindliche `ergebnis`-Event des
// Schiris (oder null). `ausloeser` ist das Event, das das eigene Ende auslöst (ohne Rücksicht auf
// ein `ergebnis`): bei Matt und Remis der letzte gezählte Zug, bei Doppelzug der zweite
// verschiedene Zug, bei Aufgabe das `resign`, bei Zeit und Abbruch das Event, ab dem die Uhr
// zuletzt lief (letzter gezählter Zug, sonst `start`, sonst `join`), bei Annullierung der
// ausstehende Zug bzw. der `join`. Ohne eigenes Ende ist er null.
// `uhr` enthält die Restzeiten `w` und `b` zum Zeitpunkt `jetzt` (ohne `jetzt` zum Beginn des
// laufenden Zugs), `amZug` (die Farbe, deren Uhr läuft, sonst null) und `seit` (`created_at`,
// ab dem diese Uhr läuft, sonst null).
// Einsatz-Partie (`create` mit `einsatz`- und `mint`-Tag, nur mit Schiri), docs/protokoll.md „Einsatz“:
//   - `einsatz` ist `{ betrag, mint }` (sonst null). `mintSchluessel` (Keysets der Mint, siehe
//     `pruefeEinsatz`) braucht `baue`, um Einsätze zu zählen; ohne ist der Zahlungsstand unbekannt.
//   - `einsaetze.w`/`.b`: der erste gültige `einsatz` des Spielers (Ergebnis von `pruefeEinsatz`)
//     oder null.
//   - Ohne `start` ist die Partie nach ZAHLFRIST nach dem `join` `nicht-bezahlt` (Verlierer: wer
//     keinen gültigen Einsatz hat, fehlen beide, kein Verlierer), haben beide bezahlt, annulliert.
//     Ohne `mintSchluessel` gibt es in diesem Fall kein eigenes Ende.
//   - `antraege`: alle `antrag`-Events der Spieler, je `{ ev, ...pruefeAntrag(ev) }`;
//     `freigaben`: die `freigabe`-Events des Schiris mit `e`-Tag auf einen gültigen Antrag und
//     gültiger Signatur über dessen Nachricht, je `{ ev, antrag }`.
// Gibt null zurück, solange kein gültiges `create` (mit `time_control`) bekannt ist.
export function baue(alle, jetzt, mintSchluessel) {
  alle = [...alle].sort((a, b) => a.created_at - b.created_at || (a.id < b.id ? -1 : 1));
  const evs = alle.filter((e) => e.kind !== KIND_ACK);
  const create = evs.find((e) => e.c.t === 'create' && (e.c.farbe === 'w' || e.c.farbe === 'b')
    && zeitkontrolleOk(e) && schiriVon(e) !== undefined && einsatzVon(e, schiriVon(e)) !== undefined);
  if (!create) return null;
  const g = partieVon(create);
  const schiri = schiriVon(create);
  const einsatz = einsatzVon(create, schiri);
  const vomSchiri = (e) => !!schiri && e.pubkey === schiri;
  const join = evs.find((e) => e.c.t === 'join' && e.pubkey !== create.pubkey && e.created_at >= create.created_at);
  const spieler = { w: null, b: null };
  spieler[create.c.farbe] = create.pubkey;
  if (join) spieler[create.c.farbe === 'w' ? 'b' : 'w'] = join.pubkey;
  const start = (join && evs.find((e) => vomSchiri(e) && e.c.t === 'start' && einE(e) === join.id
    && e.created_at >= join.created_at && e.created_at <= join.created_at + ANNULLIERT_NACH)) || null;

  // Einsatz-Partie: pro Spieler zählt der erste gültige `einsatz` (`evs` ist sortiert)
  const einsaetze = { w: null, b: null };
  const zahlungBekannt = !!einsatz && Array.isArray(mintSchluessel);
  if (zahlungBekannt && join) {
    const basis = { g, create, join, spieler, schiri, einsatz };
    for (const e of evs) {
      if (e.c.t !== 'einsatz') continue;
      const f = farbeVon(basis, e.pubkey);
      if (!f || einsaetze[f]) continue;
      const r = gepruefterEinsatz(e, basis, mintSchluessel);
      if (r.gueltig) einsaetze[f] = r;
    }
  }
  // Was gilt in einer Schiri-Partie, wenn bis zur Frist nach dem `join` kein `start` kommt?
  const ohneStart = () => {
    if (!einsatz) return { art: 'annulliert' };
    if (!zahlungBekannt) return null;
    if (einsaetze.w && einsaetze.b) return { art: 'annulliert' };
    const fehlt = ['w', 'b'].filter((f) => !einsaetze[f]);
    return fehlt.length === 1 ? { art: NICHT_BEZAHLT, verlierer: fehlt[0] } : { art: NICHT_BEZAHLT };
  };

  // Frühester gültiger `ack` des Schiris je Zug-ID (`alle` ist sortiert, der erste gewinnt).
  const ackZeit = new Map();
  if (schiri) {
    const zugMit = new Map(evs.filter((e) => e.c.t === 'move').map((e) => [e.id, e]));
    for (const a of alle) {
      if (a.kind !== KIND_ACK || a.pubkey !== schiri) continue;
      const z = zugMit.get(eTags(a)[0][1]);
      if (!z || ackZeit.has(z.id)) continue;
      if (a.created_at < z.created_at || a.created_at > z.created_at + ANNULLIERT_NACH) continue;
      ackZeit.set(z.id, a.created_at);
    }
  }
  // Kanonischer Zeitpunkt eines Zugs: ohne Schiri sein `created_at`, mit Schiri das des `ack`.
  const zeit = (e) => (schiri ? ackZeit.get(e.id) : e.created_at);

  const chess = new Chess();
  const zuege = [], ids = [];
  const rest = { w: GRUNDZEIT, b: GRUNDZEIT };
  let ende = null, amZug = null, seit = null, ausstehend = null;
  let ausloeser = null; // Event, das das eigene Ende auslöst
  let letzter = null;   // gezähltes Event des letzten Zugs
  if (spieler.w && spieler.b) {
    const aufgabe = evs.find((e) => e.c.t === 'resign' && (e.pubkey === spieler.w || e.pubkey === spieler.b));
    const pos = new Map(evs.map((e, i) => [e, i]));
    const vorAufgabe = (e) => !aufgabe || pos.get(e) < pos.get(aufgabe);
    const verbrauch = (t) => Math.max(0, t - seit);
    // Wie lange darf sich der Spieler am Zug noch Zeit lassen (ab `seit`)?
    const frist = () => (zuege.length === 0 ? ABBRUCH_NACH : rest[chess.turn()]);
    const laeuft = !schiri || !!start; // in Schiri-Partien erst ab t₀
    seit = start ? start.created_at : join.created_at;
    const nachPly = new Map();
    for (const e of evs) if (e.c.t === 'move' && Number.isInteger(e.c.ply)) {
      if (!nachPly.has(e.c.ply)) nachPly.set(e.c.ply, []);
      nachPly.get(e.c.ply).push(e);
    }
    // Zeigt der einzige `e`-Tag auf eines der Vorgänger-Events, und ist der Zug nicht älter?
    const verkettet = (e, vorher) => {
      const eTags = e.tags.filter((t) => t[0] === 'e');
      if (eTags.length !== 1) return false;
      const v = vorher.find((x) => x.id === eTags[0][1]);
      return !!v && e.created_at >= v.created_at;
    };
    let vorher = [create]; // gezählte Events des Vorgängers (derselbe Zug kann mehrfach vorliegen)
    let doppelzug = null; // Event, mit dem der zweite verschiedene Zug bekannt wurde
    for (let ply = 1; laeuft && nachPly.has(ply) && !chess.isGameOver(); ply++) {
      const gueltig = new Map(); // lan -> Events mit diesem Zug
      for (const e of nachPly.get(ply)) {
        if (e.pubkey !== spieler[chess.turn()] || !verkettet(e, vorher) || !vorAufgabe(e)) continue;
        // zu spät – zählt nicht. Ohne `ack` ist `created_at` die frühestmögliche `ack`-Zeit.
        if (verbrauch(zeit(e) ?? e.created_at) > frist()) continue;
        let z;
        try { z = chess.move({ from: e.c.from, to: e.c.to, promotion: e.c.promotion || 'q' }); }
        catch { continue; /* ungültiger Zug – ignorieren */ }
        chess.undo();
        if (!gueltig.has(z.lan)) gueltig.set(z.lan, []);
        gueltig.get(z.lan).push(e);
        if (gueltig.size > 1) { doppelzug = e; break; }
      }
      if (doppelzug) { ende = { art: 'doppelzug', verlierer: chess.turn() }; ausloeser = doppelzug; break; }
      if (gueltig.size === 0) break;
      const liste = gueltig.values().next().value;
      const bestaetigt = liste.filter((x) => zeit(x) != null);
      if (bestaetigt.length === 0) { ausstehend = liste[0]; break; } // wartet auf den `ack`
      vorher = liste;
      const e = bestaetigt.reduce((a, b) => (zeit(b) < zeit(a) ? b : a));
      const f = chess.turn();
      rest[f] += ZUSCHLAG - verbrauch(zeit(e));
      seit = zeit(e);
      zuege.push(chess.move({ from: e.c.from, to: e.c.to, promotion: e.c.promotion || 'q' }));
      ids.push(e.id);
      letzter = e;
    }
    // Läuft die Partie nach dem letzten gezählten Zug noch, kommen Aufgabe, Zeit, Abbruch und
    // Annullierung in der Reihenfolge, in der sie eintreten.
    if (!doppelzug && !chess.isGameOver()) {
      const f = chess.turn();
      // Was tritt ein, wenn bis `ablauf` nichts mehr geschieht?
      let ablauf, folge;
      // (ZAHLFRIST und ANNULLIERT_NACH sind gleich lang, ein `start` ist bis dahin gültig)
      if (!laeuft) [ablauf, folge] = [join.created_at + (einsatz ? ZAHLFRIST : ANNULLIERT_NACH), ohneStart()];
      else if (ausstehend) [ablauf, folge] = [ausstehend.created_at + ANNULLIERT_NACH, { art: 'annulliert' }];
      else [ablauf, folge] = [seit + frist(), zuege.length === 0 ? { art: 'abbruch' } : { art: 'zeit', verlierer: f }];
      const vorbei = jetzt != null && jetzt > ablauf && folge !== null;
      let stopp; // Zeitpunkt, bis zu dem die Uhr des Spielers am Zug gelaufen ist
      if (aufgabe && !(vorbei && aufgabe.created_at > ablauf)) {
        ende = { art: 'aufgabe', verlierer: aufgabe.pubkey === spieler.w ? 'w' : 'b' };
        ausloeser = aufgabe;
        stopp = aufgabe.created_at;
      } else if (vorbei) {
        ende = folge;
        // Annulliert: der ausstehende Zug bzw. der `join`; Zeit und Abbruch: das Event, ab dem die
        // Uhr zuletzt lief (letzter gezählter Zug, sonst `start`, sonst `join`).
        ausloeser = ausstehend ?? (laeuft ? letzter ?? start ?? join : join);
        stopp = ablauf;
      } else {
        if (laeuft) amZug = f;
        stopp = jetzt ?? seit;
      }
      if (laeuft) rest[f] -= Math.min(rest[f], Math.max(0, stopp - seit));
    }
  }
  if (!ende && chess.isCheckmate()) ende = { art: 'matt', verlierer: chess.turn() };
  else if (!ende && chess.isDraw()) ende = { art: 'remis' };
  if (ende && !ausloeser) ausloeser = letzter; // Matt oder Remis: der letzte Zug

  // Das früheste gültige `ergebnis` des Schiris ist verbindlich.
  let abweichung = null;
  const ergebnis = evs.find((e) => vomSchiri(e) && e.c.t === 'ergebnis' && ergebnisOk(e.c, !!einsatz)
    && einE(e) !== undefined && e.created_at >= create.created_at);
  if (ergebnis) {
    const eigen = ende;
    const { art, verlierer } = ergebnis.c;
    ende = verlierer ? { art, verlierer } : { art };
    amZug = null;
    if (eigen?.art !== ende.art || eigen?.verlierer !== ende.verlierer) abweichung = { schiri: ende, eigen };
  }
  const uhr = { w: rest.w, b: rest.b, amZug, seit: amZug ? seit : null };
  const partie = { g, create, join: join ?? null, spieler, chess, zuege, ids, ende, uhr, schiri, start, ausstehend,
    ergebnis: ergebnis ?? null, ausloeser, abweichung, letzte: alle.at(-1)?.created_at ?? create.created_at,
    einsatz, einsaetze, mintSchluessel: zahlungBekannt ? mintSchluessel : null, antraege: [], freigaben: [] };

  // Anträge der Spieler und Freigaben des Schiris (nur nach dem `ergebnis`)
  if (einsatz && partie.ergebnis) {
    for (const e of evs) {
      if (e.c.t === 'antrag' && farbeVon(partie, e.pubkey)) partie.antraege.push({ ev: e, ...pruefeAntrag(e, partie) });
    }
    for (const e of evs) {
      if (!vomSchiri(e) || e.c.t !== 'freigabe') continue;
      const a = partie.antraege.find((x) => x.gueltig && x.ev.id === einE(e));
      if (a && schnorrVerifyMessage(e.c.sig, a.nachricht, schiri)) partie.freigaben.push({ ev: e, antrag: a.ev });
    }
  }
  return partie;
}
