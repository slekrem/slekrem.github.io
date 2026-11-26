// Regeln von Nostr-Schach: Events prüfen und eine Partie daraus nachbauen.
//
// Dieses Modul ist bewusst ohne DOM und ohne Relay-Verbindung. Die Spieler-Seite und später die
// Schiri-Seite laden es im Browser (Import-Map in der HTML-Datei), die Tests laden es in Node.
// Beide müssen zu jedem Satz Events exakt dasselbe Ergebnis liefern.
//
// Protokoll (v1)
//   kind 6464 (regulär), Tags: ["t","nostr-schach"], ["g",<partie-id>]
//   content (JSON):
//     {"t":"create","farbe":"w"|"b"}            Ersteller und seine Farbe
//     {"t":"join"}                              erster fremder Beitritt = Gegner
//     {"t":"move","ply":n,"from":"e2","to":"e4","promotion":"q","san":"e4"}
//     {"t":"resign"}

import { verifyEvent } from 'nostr-tools';
import { Chess } from 'chess.js';

export const KIND = 6464;
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
//   - Pro `ply` zählen nur legale Züge des Spielers, der am Zug ist. Illegale Züge, Züge fremder
//     Schlüssel und Züge des Spielers, der nicht am Zug ist, werden ignoriert.
//   - Denselben Zug mehrfach zu senden (gleiches `from`, `to` und `promotion`) ist erlaubt.
//   - Doppelzug: Wer für denselben `ply` zwei verschiedene legale Züge sendet, verliert
//     (`ende.art = 'doppelzug'`). Die Auswertung endet dort, eine spätere Aufgabe ändert nichts.
//     Eine fehlende `promotion` gilt wie beim Ausführen als Dame.
//   - Fehlt ein gültiger Zug für einen `ply`, endet die Auswertung dort.
//   - Eine Aufgabe eines Spielers beendet die Partie, sofern sie nicht nach einem Doppelzug kommt.
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
  const zuege = [];
  let ende = null;
  if (spieler.w && spieler.b) {
    const nachPly = new Map();
    for (const e of evs) if (e.c.t === 'move' && Number.isInteger(e.c.ply)) {
      if (!nachPly.has(e.c.ply)) nachPly.set(e.c.ply, []);
      nachPly.get(e.c.ply).push(e);
    }
    let doppelzug = null; // Event, mit dem der zweite verschiedene Zug bekannt wurde
    for (let ply = 1; nachPly.has(ply) && !chess.isGameOver(); ply++) {
      const legal = new Map(); // lan -> erstes Event mit diesem Zug
      for (const e of nachPly.get(ply)) {
        if (e.pubkey !== spieler[chess.turn()]) continue;
        let z;
        try { z = chess.move({ from: e.c.from, to: e.c.to, promotion: e.c.promotion || 'q' }); }
        catch { continue; /* ungültiger Zug – ignorieren */ }
        chess.undo();
        if (!legal.has(z.lan)) legal.set(z.lan, e);
        if (legal.size > 1) { doppelzug = e; break; }
      }
      if (doppelzug) { ende = { art: 'doppelzug', verlierer: chess.turn() }; break; }
      if (legal.size === 0) break;
      const e = legal.values().next().value;
      zuege.push(chess.move({ from: e.c.from, to: e.c.to, promotion: e.c.promotion || 'q' }));
    }
    const aufgabe = evs.find((e) => e.c.t === 'resign' && (e.pubkey === spieler.w || e.pubkey === spieler.b)
      && (!doppelzug || evs.indexOf(e) < evs.indexOf(doppelzug)));
    if (aufgabe) ende = { art: 'aufgabe', verlierer: aufgabe.pubkey === spieler.w ? 'w' : 'b' };
  }
  if (!ende && chess.isCheckmate()) ende = { art: 'matt', verlierer: chess.turn() };
  else if (!ende && chess.isDraw()) ende = { art: 'remis' };
  return { g, create, spieler, chess, zuege, ende, letzte: evs.at(-1)?.created_at ?? create.created_at };
}
