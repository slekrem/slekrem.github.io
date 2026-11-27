// Einsatz-Partien auf der Spieler-Seite (index.html): Schlüssel der Mint laden, den eigenen Einsatz
// nach dem `join` automatisch sperren und senden, nach dem `ergebnis` automatisch Anträge stellen,
// auf die `freigabe` warten und einlösen, und den Stand in der Partie anzeigen. Spezifikation in
// docs/protokoll.md („Einsatz“ und „Spieler-Seite“).
//
// Geldlogik und Prüfungen stehen in cashu.js (sperreEinsatz, baueAntrag, loeseEin, holeZurueck) und
// regeln.js (anspruch, baue); hier nur der Ablauf. Was übers Neuladen kommen muss, steht je Schlüssel
// und Partie im localStorage (`nostr-schach.einsatz.<pubkey>.<partie-id>`): das signierte
// `einsatz`-Event und die signierten Anträge, damit sie nach dem Neuladen mit gleicher ID erneut
// rausgehen, dazu der Stand des Einlösens. Kein Token oder Proof geht an console.log.

import { TAG, ZAHLFRIST, anspruch } from './regeln.js';
import { el, mintText } from './wallet-ui.js';

const LS = 'nostr-schach.einsatz.';
const EINSATZ_ERNEUT = 30_000;  // ms; ein noch nicht gezählter eigener `einsatz` geht so oft erneut raus
const ANTRAG_ERNEUT = 120_000;  // ms; ohne `freigabe` geht der Antrag nach dieser Zeit erneut raus (gleiche ID)
const NEUE_ANTRAEGE = 3;        // so oft baut die Seite nach einem gescheiterten Tausch einen neuen Antrag
const FEHLER_PAUSE = 15_000;    // ms; nach einem Fehler so lange warten
const MINT_PAUSE = 10_000;      // ms; Schlüssel einer Mint nach einem Fehler erneut laden
const ZWEI_TAGE = 2 * 86400;
const FARBE = { w: 'Weiß', b: 'Schwarz' };
const MIT_VERLIERER = ['matt', 'aufgabe', 'zeit', 'doppelzug'];
// Warum jeder seinen eigenen Einsatz zurückbekommt
const ANLASS = { remis: 'Remis', abbruch: 'Partie abgebrochen', annulliert: 'Partie annulliert', 'nicht-bezahlt': 'Gegner hat nicht bezahlt' };
const mmss = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
const datum = (s) => new Date(s * 1000).toLocaleString('de-DE', { dateStyle: 'short', timeStyle: 'short' });

// ctx: { W (wallet-ui), baue(g, { ohneMint }) (Partie mit Mint-Schlüsseln, falls geladen; mit
// `ohneMint` ohne Anfrage an die Mint), pk(), signiere(vorlage)
// (mit dem Schlüssel in der Seite), sende(ev) (signiertes Event anzeigen und an die Relays),
// neuZeichnen(), jetzt() }
export function starteEinsatz(ctx) {
  const { W } = ctx;
  const mints = new Map();        // URL → { keysets, laeuft, naechster, fehler }
  const kandidaten = new Set();   // Partie-IDs mit Einsatz (aus create-Events und der Wallet)
  const beschaeftigt = new Set(); // Partien mit laufender Geldaktion
  const gesendet = new Map();     // Event-ID → Zeitpunkt (ms) des letzten Sendens in dieser Sitzung
  const fehler = new Map();       // Partie-ID → { text, zeit }

  // Keysets der Mint (pruefeMint in cashu.js), nach einem Fehler nach 10 s erneut. Dasselbe Objekt
  // bleibt erhalten (baue merkt sich geprüfte Einsätze je Objekt).
  function schluessel(url) {
    let m = mints.get(url);
    if (!m) mints.set(url, m = { keysets: null, laeuft: false, naechster: 0, fehler: null });
    if (!m.keysets && !m.laeuft && Date.now() >= m.naechster && W.wallet) {
      m.laeuft = true;
      W.wallet.pruefeMint(url).then((r) => { m.keysets = r.keysets; m.fehler = null; ctx.neuZeichnen(); },
        (e) => { m.fehler = e.message; m.naechster = Date.now() + MINT_PAUSE; })
        .finally(() => { m.laeuft = false; });
    }
    return m.keysets;
  }

  const schl = (g) => `${LS}${ctx.pk()}.${g}`;
  function lade(g) { try { return JSON.parse(localStorage.getItem(schl(g)) || '{}'); } catch { return {}; } }
  function speichere(g, st) { try { localStorage.setItem(schl(g), JSON.stringify(st)); } catch { /* voll */ } }
  const farbe = (p) => (p.spieler.w === ctx.pk() ? 'w' : p.spieler.b === ctx.pk() ? 'b' : null);
  const sende = (ev) => { gesendet.set(ev.id, Date.now()); ctx.sende(ev); };
  // Erst einmal in dieser Sitzung (nach dem Laden), danach nach `ms`
  const faellig = (id, ms) => !gesendet.has(id) || Date.now() - gesendet.get(id) > ms;
  const pausiert = (g) => { const f = fehler.get(g); return f && Date.now() - f.zeit < FEHLER_PAUSE; };

  // Eine Geldaktion je Partie zur Zeit
  function lauf(g, f) {
    beschaeftigt.add(g);
    Promise.resolve().then(f).then(() => fehler.delete(g), (e) => fehler.set(g, { text: e?.message ?? String(e), zeit: Date.now() }))
      .finally(() => { beschaeftigt.delete(g); W.aktualisiere(); ctx.neuZeichnen(); }); // Guthaben im Wallet-Kasten neu
  }

  // Neues Event (aus verarbeite): Partien mit Einsatz merken
  function neuesEvent(ev) {
    if (ev.c?.t === 'create' && ev.tags.some((t) => t[0] === 'einsatz')) kandidaten.add(ev.tags.find((t) => t[0] === 'g')[1]);
  }
  // Eigene Partien mit Einsatz der letzten 2 Tage aus der Wallet (auch wenn die Lobby sie nicht mehr
  // liefert): zum Abonnieren nach dem Laden
  function eigenePartien() {
    if (!W.wallet) return [];
    const ab = ctx.jetzt() - ZWEI_TAGE;
    const gs = window.EINSTELLUNGEN.MINTS.flatMap((m) => Object.entries(W.wallet.einsaetze(m.url))
      .filter(([, e]) => e.locktime - 86400 >= ab).map(([g]) => g));
    for (const g of gs) kandidaten.add(g);
    return gs;
  }

  // Jede Sekunde: in jeder eigenen Einsatz-Partie sperren bzw. einlösen, was ansteht
  function takt() {
    if (!W.darfGeldBewegen() || !W.kannSignieren()) return;
    for (const g of kandidaten) {
      if (beschaeftigt.has(g) || pausiert(g)) continue;
      // Erst ohne Mint prüfen, ob ich mitspiele: fremde Partien aus der Lobby fragen keine Mint an
      const ohne = ctx.baue(g, { ohneMint: true });
      if (!ohne?.einsatz || !farbe(ohne)) continue;
      const p = ctx.baue(g);
      if (!p?.einsatz || !p.mintSchluessel) continue;
      const f = farbe(p);
      if (f) bearbeite(g, p, f);
    }
  }

  function bearbeite(g, p, f) {
    const st = lade(g);
    const wallet = W.wallet;
    // Sperren: sobald der join gezählt ist, innerhalb der Zahlfrist, ohne Klick
    if (!p.einsaetze[f]) {
      if (st.einsatz) {
        if (faellig(st.einsatz.id, EINSATZ_ERNEUT)) sende(st.einsatz); // nach dem Neuladen: gleiche ID
      } else if (p.join && !p.start && !p.ende && ctx.jetzt() < p.join.created_at + ZAHLFRIST - 10) {
        return lauf(g, async () => {
          const token = await wallet.sperreEinsatz(p); // nach einem Neuladen derselbe Token, kein zweiter Tausch
          const ev = ctx.signiere({ created_at: Math.max(ctx.jetzt(), p.join.created_at), tags: [['t', TAG], ['g', g]],
            content: JSON.stringify({ t: 'einsatz', token }) });
          const neu = lade(g);
          neu.einsatz = ev;
          speichere(g, neu);
          sende(ev);
        });
      }
    }
    // Einlösen: nach dem verbindlichen ergebnis alles, was mir zusteht
    if (!p.ergebnis || st.fertig) return;
    const recht = anspruch(p)?.[f] ?? [];
    if (!recht.length) return;
    st.antraege ??= {};
    const meins = wallet.einsaetze(p.einsatz.mint)[g];
    let offen = false;
    for (const e of recht) {
      const a = st.antraege[e.farbe] ??= { neu: 0 };
      if (a.eingeloest || a.uebersprungen) continue;
      if (e.farbe === f && meins?.zurueck) { a.uebersprungen = 'zurückgeholt'; speichere(g, st); continue; }
      offen = true;
      if (a.aufgegeben) continue;
      if (!a.ev) {
        return lauf(g, async () => {
          const liste = await wallet.baueAntrag(p, { neu: a.neu > 0 });
          const x = liste.find((y) => y.einsatz === e.farbe);
          if (!x) throw new Error('Kein Antrag für diesen Einsatz');
          a.ev = ctx.signiere({ tags: [['t', TAG], ['g', g], ['e', p.ergebnis.id]],
            content: JSON.stringify({ t: 'antrag', inputs: x.inputs, outputs: x.outputs }) });
          a.freigabe = false;
          speichere(g, st);
          sende(a.ev);
        });
      }
      const fr = p.freigaben.find((x) => x.antrag.id === a.ev.id);
      if (fr) {
        if (!a.freigabe) { a.freigabe = true; speichere(g, st); }
        return lauf(g, async () => {
          try {
            const r = await wallet.loeseEin(p, fr);
            a.eingeloest = true;
            a.betrag = r.betrag;
            W.gutschrift({ url: p.einsatz.mint, betrag: r.betrag,
              wofuer: `${MIT_VERLIERER.includes(p.ergebnis.c.art) ? 'Gewinn' : 'Erstattung'}, Partie ${g.slice(0, 6)}` });
          } catch (err) {
            if (!err?.mint) throw err; // unklar (Netz): später noch einmal
            // Tausch bei der Mint gescheitert: neuer Antrag, höchstens dreimal
            if (a.neu >= NEUE_ANTRAEGE) a.aufgegeben = err.message;
            else { a.neu++; a.ev = null; a.freigabe = false; }
          } finally { speichere(g, st); }
        });
      }
      if (faellig(a.ev.id, ANTRAG_ERNEUT)) sende(a.ev); // keine Freigabe: gleicher Antrag erneut
    }
    if (!offen) { st.fertig = true; speichere(g, st); W.aktualisiere(); }
  }

  // --- Anzeige in der Partie ------------------------------------------------------------------
  // Baut die Anzeige neu auf, ersetzt sie aber nur, wenn sich etwas geändert hat (die Seite ruft das
  // jede Sekunde auf; ein Klick soll nicht zwischen zwei Fassungen landen)
  function zeichne(ziel, p) {
    const box = el('div');
    inhalt(box, p);
    const schluessel = box.innerHTML;
    ziel.classList.toggle('versteckt', !p?.einsatz);
    if (ziel.dataset.inhalt === schluessel) return;
    ziel.dataset.inhalt = schluessel;
    ziel.replaceChildren(...box.childNodes);
  }
  function inhalt(box, p) {
    if (!p?.einsatz) return;
    const zeile = (t, klasse = '') => { const d = el('div', { class: klasse }, ...[].concat(t)); box.append(d); return d; };
    const f = farbe(p), url = p.einsatz.mint, betrag = p.einsatz.betrag;
    const st = f ? lade(p.g) : {};
    zeile(`Einsatz ${betrag} sat je Spieler · Mint ${mintText(url)}`, 'einsatz-kopf');
    const fehlt = f && !W.kannSignieren() ? 'Mit der Browser-Erweiterung (NIP-07) kann diese Seite den Einsatz nicht sperren und nicht einlösen.'
      : f && !W.darfGeldBewegen() ? 'Geldaktionen sind in diesem Tab gesperrt (die Wallet ist in einem anderen Tab offen). Dort läuft das Bezahlen und Einlösen.' : null;
    if (fehlt) zeile(fehlt, 'hinweis warn');
    const grund = !p.join ? W.mintGrund(url, 'einsatz') : null;
    if (grund) zeile(`Hinweis: ${mintText(url)} kann gerade nicht alles (${grund}).`, 'hinweis warn mint-hinweis');
    if (!p.join) {
      if (f) zeile('Lass diese Seite offen: Sobald jemand beitritt, sperrt sie deinen Einsatz automatisch. Ist sie dann zu, '
        + 'gilt die Partie nach 10 Minuten als nicht bezahlt (es geht kein Geld verloren).', 'hinweis');
      return;
    }
    const bezahlt = (x) => (!p.mintSchluessel ? 'unbekannt (Schlüssel der Mint werden geladen …)' : p.einsaetze[x] ? 'bezahlt' : 'fehlt');
    const einsatzZeilen = () => {
      for (const x of ['w', 'b']) zeile(`Einsatz ${FARBE[x]}${x === f ? ' (du)' : ''}: ${bezahlt(x)}`, p.einsaetze[x] ? 'online' : '');
    };
    const fe = fehler.get(p.g);
    if (!p.start && !p.ende) {
      einsatzZeilen();
      zeile(`Zahlfrist noch ${mmss(Math.max(0, p.join.created_at + ZAHLFRIST - ctx.jetzt()))} · warte auf Start durch den Schiri`);
      if (f && !p.einsaetze[f] && fe) zeile(`Dein Einsatz ist noch nicht gesperrt: ${fe.text}`, 'hinweis warn');
      return;
    }
    const meins = f && W.wallet ? W.wallet.einsaetze(url)[p.g] : null;
    const rueckholbar = meins && !meins.zurueck && ctx.jetzt() > meins.locktime && !st.antraege?.[f]?.eingeloest;
    if (!p.ergebnis) {
      einsatzZeilen();
      if (p.ende) zeile('Warte auf das Ergebnis des Schiris; danach löst die Seite automatisch ein, was dir zusteht.');
      if (rueckholbar) rueckholung(zeile, url, p.g, 'Der Schiri hat bis zum Ende der Sperrfrist kein Ergebnis gemeldet.');
      return;
    }
    const g = geld(p);
    if (!f) { zeile(g.text); return; }
    const { recht, fertig } = g;
    zeile(g.text, g.ausgang === 'gewonnen' ? 'geld-ergebnis online' : 'geld-ergebnis');
    // Stand des Einlösens je Einsatz
    for (const e of recht[f]) {
      const a = st.antraege?.[e.farbe] ?? {};
      const stand = a.eingeloest ? `eingelöst (+${a.betrag} sat)` : a.uebersprungen ? a.uebersprungen
        : a.aufgegeben ? `nicht eingelöst: ${a.aufgegeben}` : a.freigabe ? 'Freigabe erhalten, löse ein …'
          : a.ev ? 'Antrag gesendet, warte auf die Freigabe des Schiris …' : 'Antrag wird gebaut …';
      zeile(`Einsatz ${FARBE[e.farbe]}: ${stand}`, a.eingeloest ? 'online einloesen' : 'einloesen');
      if (a.aufgegeben) zeile('Das Einlösen ist mehrmals bei der Mint gescheitert. Nach der Sperrfrist kannst du deinen eigenen Einsatz zurückholen.', 'hinweis warn');
    }
    if (fe && !fertig) zeile(`Einlösen: ${fe.text} (versuche es gleich noch einmal)`, 'hinweis warn');
    if (rueckholbar && !fertig) rueckholung(zeile, url, p.g, 'Der Schiri hat bis zum Ende der Sperrfrist nicht freigegeben.');
    else if (meins && !meins.zurueck && !fertig && recht[f].length) {
      zeile(`Gibt der Schiri nicht frei, kannst du deinen Einsatz ab ${datum(meins.locktime + 1)} allein zurückholen.`, 'muted');
    }
  }
  // Geld nach dem verbindlichen ergebnis aus der Sicht der Seite: `text` (für #einsatz-info),
  // `betrag` und `zusatz` (kurz, für den Ergebnis-Kasten), `ausgang` (gewonnen, verloren, zurueck,
  // ohne), dazu Anspruch und Stand des Einlösens. Die Rückgabe heißt je Art richtig: Remis, Abbruch,
  // Annullierung oder nicht bezahlt.
  function geld(p) {
    const f = farbe(p), betrag = p.einsatz.betrag;
    const { art, verlierer } = p.ergebnis.c;
    const recht = anspruch(p) ?? { w: [], b: [] };
    if (!f) {
      const text = MIT_VERLIERER.includes(art) ? `${FARBE[verlierer === 'w' ? 'b' : 'w']} bekommt den Topf.` : 'Jeder bekommt seinen eigenen Einsatz zurück.';
      return { text, betrag: text, ausgang: 'ohne', recht, fertig: true };
    }
    const st = lade(p.g);
    const eigen = !!p.einsaetze[f];
    const gutschrift = recht[f].reduce((s, e) => s + (st.antraege?.[e.farbe]?.betrag ?? (e.summe - e.gebuehr)), 0);
    const fertig = !!st.fertig;
    const r = { recht, fertig, st, f };
    // `kurz`: für die Lobby (geldKurz)
    const ohneGeld = 'kein Geld geflossen';
    if (MIT_VERLIERER.includes(art)) {
      if (verlierer === f) return { ...r, ausgang: 'verloren', text: eigen ? `Verloren: −${betrag} sat` : 'Verloren.', betrag: eigen ? `−${betrag} sat` : 'Kein Geld geflossen.', kurz: eigen ? `−${betrag} sat` : ohneGeld };
      return { ...r, ausgang: 'gewonnen', text: `Gewonnen: +${gutschrift} sat (nach Gebühr der Mint)`, betrag: `+${gutschrift} sat`, zusatz: '(nach Gebühr der Mint)', kurz: `+${gutschrift} sat` };
    }
    if (!eigen) {
      const text = art === 'nicht-bezahlt' ? 'Du hast nicht rechtzeitig bezahlt. Die Partie hat nicht begonnen, es ist kein Geld geflossen.'
        : 'Du hattest keinen Einsatz gesperrt, es ist kein Geld geflossen.';
      return { ...r, ausgang: 'ohne', text, betrag: 'Kein Geld geflossen.', kurz: ohneGeld };
    }
    const anlass = ANLASS[art] ?? 'Partie beendet';
    return { ...r, ausgang: 'zurueck', text: `${anlass}: dein Einsatz ${fertig ? 'ist zurück' : 'kommt zurück'} (${gutschrift} sat nach Gebühr der Mint).`,
      betrag: `Einsatz zurück: ${gutschrift} sat`, zusatz: `(${anlass}, nach Gebühr der Mint)`, kurz: `Einsatz zurück (${gutschrift} sat)` };
  }

  // Kurz für die Lobby („Meine Partien“): Geld nach dem verbindlichen ergebnis aus eigener Sicht
  // („+198 sat“, „−100 sat“, „Einsatz zurück (99 sat)“), null, wenn es nichts zu sagen gibt.
  // Ohne die Schlüssel der Mint (lädt takt() für eigene Partien) ist der Betrag noch unbekannt.
  function geldKurz(p) {
    if (!p?.einsatz || !p.ergebnis || !farbe(p)) return null;
    if (!p.mintSchluessel) return W.wallet ? 'Betrag lädt …' : null;
    return geld(p).kurz;
  }

  // Geld im Ergebnis-Kasten (index.html): Betrag und Stand des Einlösens, jede Sekunde neu
  function zeichneKasten(ziel, p) {
    const box = el('div');
    kasten(box, p);
    ziel.classList.toggle('versteckt', !box.childNodes.length);
    const schluessel = box.innerHTML;
    if (ziel.dataset.inhalt === schluessel) return;
    ziel.dataset.inhalt = schluessel;
    ziel.replaceChildren(...box.childNodes);
  }
  function kasten(box, p) {
    if (!p?.einsatz || !p.ende) return;
    if (!p.ergebnis) { box.append(el('div', { class: 'muted' }, 'Geld: wartet auf das Ergebnis des Schiris.')); return; }
    const g = geld(p);
    box.append(el('div', { class: 'betrag' + (g.ausgang === 'gewonnen' ? ' online' : g.ausgang === 'verloren' ? ' warn' : '') }, g.betrag));
    if (g.zusatz) box.append(el('div', { class: 'muted' }, g.zusatz));
    if (!g.f || !g.recht[g.f].length) return;
    // Stand des Einlösens über alle Einsätze, die mir zustehen
    const a = g.recht[g.f].map((e) => g.st.antraege?.[e.farbe] ?? {});
    const stand = a.every((x) => x.eingeloest) ? ['eingelöst', 'online']
      : a.every((x) => x.eingeloest || x.uebersprungen) ? ['erledigt (Einsatz zurückgeholt)', 'online']
        : a.some((x) => x.aufgegeben) ? ['Einlösen gescheitert, siehe unter dem Brett', 'warn']
          : ['wird eingelöst …', 'muted'];
    box.append(el('div', { class: 'einloese-stand ' + stand[1] }, stand[0]));
  }

  function rueckholung(zeile, url, g, grund) {
    const d = zeile(`${grund} Du kannst deinen Einsatz jetzt allein zurückholen.`, 'hinweis');
    d.append(' ', el('button', { class: 'primaer', id: 'btn-zurueckholen', disabled: !W.darfGeldBewegen() || !W.kannSignieren(),
      onclick: () => W.holeZurueck(url, g) }, 'Zurückholen'));
  }

  return { schluessel, neuesEvent, eigenePartien, takt, zeichne, zeichneKasten, geldKurz, stand: lade };
}
