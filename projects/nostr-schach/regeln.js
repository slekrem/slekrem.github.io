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
//     {"t":"join"}                              erster fremder Beitritt = Gegner
//     {"t":"move","ply":n,"from":"e2","to":"e4","promotion":"q","san":"e4"}
//       dazu Tag ["e",<id>]: Event-ID des vorherigen gezählten Zugs, bei ply 1 des gezählten create
//     {"t":"resign"}

import { verifyEvent } from 'nostr-tools';
import { Chess } from 'chess.js';

export const KIND = 4664;
export const TAG = 'nostr-schach';

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
//   - Eine Aufgabe eines Spielers beendet die Partie, sofern sie nicht nach einem Doppelzug kommt.
// `ids` steht parallel zu `zuege` und enthält die Event-ID jedes gezählten Zugs (bei mehreren
// gleichen Events das erste nach `created_at`, dann `id`). Darauf verweist der nächste Zug.
// Gibt null zurück, solange kein `create` bekannt ist.
export function baue(evs) {
  evs = [...evs].sort((a, b) => a.created_at - b.created_at || (a.id < b.id ? -1 : 1));
  const create = evs.find((e) => e.c.t === 'create' && (e.c.farbe === 'w' || e.c.farbe === 'b'));
  if (!create) return null;
  const g = partieVon(create);
  const join = evs.find((e) => e.c.t === 'join' && e.pubkey !== create.pubkey && e.created_at >= create.created_at);
  const spieler = { w: null, b: null };
  spieler[create.c.farbe] = create.pubkey;
  if (join) spieler[create.c.farbe === 'w' ? 'b' : 'w'] = join.pubkey;

  const chess = new Chess();
  const zuege = [], ids = [];
  let ende = null;
  if (spieler.w && spieler.b) {
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
        if (e.pubkey !== spieler[chess.turn()] || !verkettet(e, vorher)) continue;
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
      zuege.push(chess.move({ from: e.c.from, to: e.c.to, promotion: e.c.promotion || 'q' }));
      ids.push(e.id);
    }
    const aufgabe = evs.find((e) => e.c.t === 'resign' && (e.pubkey === spieler.w || e.pubkey === spieler.b)
      && (!doppelzug || evs.indexOf(e) < evs.indexOf(doppelzug)));
    if (aufgabe) ende = { art: 'aufgabe', verlierer: aufgabe.pubkey === spieler.w ? 'w' : 'b' };
  }
  if (!ende && chess.isCheckmate()) ende = { art: 'matt', verlierer: chess.turn() };
  else if (!ende && chess.isDraw()) ende = { art: 'remis' };
  return { g, create, spieler, chess, zuege, ids, ende, letzte: evs.at(-1)?.created_at ?? create.created_at };
}
