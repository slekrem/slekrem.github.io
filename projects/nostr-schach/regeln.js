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

import { verifyEvent } from 'nostr-tools';
import { Chess } from 'chess.js';

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

// Ist der Inhalt ein gültiges `ergebnis` (Art bekannt, Verlierer genau dann, wenn die Art einen hat)?
const ergebnisOk = (c) => (MIT_VERLIERER.includes(c.art) && (c.verlierer === 'w' || c.verlierer === 'b'))
  || (OHNE_VERLIERER.includes(c.art) && c.verlierer === undefined);

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
// Gibt null zurück, solange kein gültiges `create` (mit `time_control`) bekannt ist.
export function baue(alle, jetzt) {
  alle = [...alle].sort((a, b) => a.created_at - b.created_at || (a.id < b.id ? -1 : 1));
  const evs = alle.filter((e) => e.kind !== KIND_ACK);
  const create = evs.find((e) => e.c.t === 'create' && (e.c.farbe === 'w' || e.c.farbe === 'b')
    && zeitkontrolleOk(e) && schiriVon(e) !== undefined);
  if (!create) return null;
  const g = partieVon(create);
  const schiri = schiriVon(create);
  const vomSchiri = (e) => !!schiri && e.pubkey === schiri;
  const join = evs.find((e) => e.c.t === 'join' && e.pubkey !== create.pubkey && e.created_at >= create.created_at);
  const spieler = { w: null, b: null };
  spieler[create.c.farbe] = create.pubkey;
  if (join) spieler[create.c.farbe === 'w' ? 'b' : 'w'] = join.pubkey;
  const start = (join && evs.find((e) => vomSchiri(e) && e.c.t === 'start' && einE(e) === join.id
    && e.created_at >= join.created_at && e.created_at <= join.created_at + ANNULLIERT_NACH)) || null;

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
      if (!laeuft) [ablauf, folge] = [join.created_at + ANNULLIERT_NACH, { art: 'annulliert' }];
      else if (ausstehend) [ablauf, folge] = [ausstehend.created_at + ANNULLIERT_NACH, { art: 'annulliert' }];
      else [ablauf, folge] = [seit + frist(), zuege.length === 0 ? { art: 'abbruch' } : { art: 'zeit', verlierer: f }];
      const vorbei = jetzt != null && jetzt > ablauf;
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
  const ergebnis = evs.find((e) => vomSchiri(e) && e.c.t === 'ergebnis' && ergebnisOk(e.c)
    && einE(e) !== undefined && e.created_at >= create.created_at);
  if (ergebnis) {
    const eigen = ende;
    const { art, verlierer } = ergebnis.c;
    ende = verlierer ? { art, verlierer } : { art };
    amZug = null;
    if (eigen?.art !== ende.art || eigen?.verlierer !== ende.verlierer) abweichung = { schiri: ende, eigen };
  }
  const uhr = { w: rest.w, b: rest.b, amZug, seit: amZug ? seit : null };
  return { g, create, join: join ?? null, spieler, chess, zuege, ids, ende, uhr, schiri, start, ausstehend,
    ergebnis: ergebnis ?? null, ausloeser, abweichung, letzte: alle.at(-1)?.created_at ?? create.created_at };
}
