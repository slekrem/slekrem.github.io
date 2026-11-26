// Regeln von Nostr-Schach: Events prüfen und eine Partie daraus nachbauen.
//
// Dieses Modul ist bewusst ohne DOM und ohne Relay-Verbindung. Die Spieler-Seite und später die
// Schiri-Seite laden es im Browser (Import-Map in der HTML-Datei), die Tests laden es in Node.
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

// Trägt das Event genau einen `time_control`-Tag mit der Zeitkontrolle des MVP?
const zeitkontrolleOk = (ev) => {
  const t = ev.tags.filter((x) => x[0] === 'time_control');
  return t.length === 1 && t[0][1] === ZEITKONTROLLE;
};

export const gueltigeId = (g) => typeof g === 'string' && /^[0-9a-f]{16}$/.test(g);
export const partieVon = (ev) => ev.tags?.find((t) => t[0] === 'g')?.[1];

// Prüft ein Event von einem Relay oder aus eigener Hand. Gibt das Event mit dem geparsten Inhalt
// in `ev.c` zurück, oder null, wenn es nicht zum Spiel gehört, kaputt ist oder die Signatur nicht
// stimmt. nostr-tools merkt sich bereits geprüfte Events, doppelte Prüfung kostet also nichts.
export function lies(ev) {
  if (!ev || ev.kind !== KIND) return null;
  if (!gueltigeId(partieVon(ev))) return null;
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
// `ids` steht parallel zu `zuege` und enthält die Event-ID jedes gezählten Zugs (bei mehreren
// gleichen Events das erste nach `created_at`, dann `id`). Darauf verweist der nächste Zug.
// `uhr` enthält die Restzeiten `w` und `b` zum Zeitpunkt `jetzt` (ohne `jetzt` zum Beginn des
// laufenden Zugs), `amZug` (die Farbe, deren Uhr läuft, sonst null) und `seit` (`created_at`,
// ab dem diese Uhr läuft, sonst null).
// Gibt null zurück, solange kein gültiges `create` (mit `time_control`) bekannt ist.
export function baue(evs, jetzt) {
  evs = [...evs].sort((a, b) => a.created_at - b.created_at || (a.id < b.id ? -1 : 1));
  const create = evs.find((e) => e.c.t === 'create' && (e.c.farbe === 'w' || e.c.farbe === 'b') && zeitkontrolleOk(e));
  if (!create) return null;
  const g = partieVon(create);
  const join = evs.find((e) => e.c.t === 'join' && e.pubkey !== create.pubkey && e.created_at >= create.created_at);
  const spieler = { w: null, b: null };
  spieler[create.c.farbe] = create.pubkey;
  if (join) spieler[create.c.farbe === 'w' ? 'b' : 'w'] = join.pubkey;

  const chess = new Chess();
  const zuege = [], ids = [];
  const rest = { w: GRUNDZEIT, b: GRUNDZEIT };
  let ende = null, amZug = null, seit = null;
  if (spieler.w && spieler.b) {
    const aufgabe = evs.find((e) => e.c.t === 'resign' && (e.pubkey === spieler.w || e.pubkey === spieler.b));
    const pos = new Map(evs.map((e, i) => [e, i]));
    const vorAufgabe = (e) => !aufgabe || pos.get(e) < pos.get(aufgabe);
    const verbrauch = (e) => Math.max(0, e.created_at - seit);
    // Wie lange darf sich der Spieler am Zug noch Zeit lassen (ab `seit`)?
    const frist = () => (zuege.length === 0 ? ABBRUCH_NACH : rest[chess.turn()]);
    seit = join.created_at;
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
    for (let ply = 1; nachPly.has(ply) && !chess.isGameOver(); ply++) {
      const gueltig = new Map(); // lan -> Events mit diesem Zug
      for (const e of nachPly.get(ply)) {
        if (e.pubkey !== spieler[chess.turn()] || !verkettet(e, vorher) || !vorAufgabe(e)) continue;
        if (verbrauch(e) > frist()) continue; // zu spät – zählt nicht
        let z;
        try { z = chess.move({ from: e.c.from, to: e.c.to, promotion: e.c.promotion || 'q' }); }
        catch { continue; /* ungültiger Zug – ignorieren */ }
        chess.undo();
        if (!gueltig.has(z.lan)) gueltig.set(z.lan, []);
        gueltig.get(z.lan).push(e);
        if (gueltig.size > 1) { doppelzug = e; break; }
      }
      if (doppelzug) { ende = { art: 'doppelzug', verlierer: chess.turn() }; break; }
      if (gueltig.size === 0) break;
      vorher = gueltig.values().next().value;
      const e = vorher[0];
      const f = chess.turn();
      rest[f] += ZUSCHLAG - verbrauch(e);
      seit = e.created_at;
      zuege.push(chess.move({ from: e.c.from, to: e.c.to, promotion: e.c.promotion || 'q' }));
      ids.push(e.id);
    }
    // Läuft die Partie nach dem letzten gezählten Zug noch, kommen Aufgabe, Zeit und Abbruch
    // in der Reihenfolge, in der sie eintreten.
    if (!doppelzug && !chess.isGameOver()) {
      const f = chess.turn();
      const ablauf = seit + frist();
      const zeitAus = jetzt != null && jetzt > ablauf;
      let stopp; // Zeitpunkt, bis zu dem die Uhr des Spielers am Zug gelaufen ist
      if (aufgabe && !(zeitAus && aufgabe.created_at > ablauf)) {
        ende = { art: 'aufgabe', verlierer: aufgabe.pubkey === spieler.w ? 'w' : 'b' };
        stopp = aufgabe.created_at;
      } else if (zeitAus) {
        ende = zuege.length === 0 ? { art: 'abbruch' } : { art: 'zeit', verlierer: f };
        stopp = ablauf;
      } else {
        amZug = f;
        stopp = jetzt ?? seit;
      }
      rest[f] -= Math.min(rest[f], Math.max(0, stopp - seit));
    }
  }
  if (!ende && chess.isCheckmate()) ende = { art: 'matt', verlierer: chess.turn() };
  else if (!ende && chess.isDraw()) ende = { art: 'remis' };
  const uhr = { w: rest.w, b: rest.b, amZug, seit: amZug ? seit : null };
  return { g, create, spieler, chess, zuege, ids, ende, uhr, letzte: evs.at(-1)?.created_at ?? create.created_at };
}
