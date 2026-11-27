// Wallet-Kasten der Spieler-Seite (index.html, rechte Spalte unter „Identität“): Guthaben je Mint,
// Aufladen per Lightning (mit QR-Code und Liste der offenen Aufladungen), Token einfügen, Auszahlen,
// Token exportieren, Umbuchen zwischen Mints, Backup und die gesperrten Einsätze mit Rückholung.
// Dazu der Schutz beim Wechsel der Identität, die Sperre, wenn dieselbe Wallet in zwei Tabs offen
// ist, die Prüfung der Mints beim Laden (Mints, die gerade nicht alles können, sind ausgegraut) und
// die Bestätigung jeder Gutschrift (grüner Kasten und Toast).
//
// Die Geldlogik steht in cashu.js (CashuWallet); hier entstehen nur Oberfläche und Ablauf. Kein
// Token, Proof oder Schlüssel geht an console.log. Token zeigt die Seite nur beim Export.

import qrcode from 'qrcode-generator';
import { nip19 } from 'nostr-tools';
import { CashuWallet, localStorageSpeicher } from './cashu.js';

const { MINTS, MINT } = window.EINSTELLUNGEN;
const TAB_TAKT = 2000;          // ms; so oft erneuert der Tab mit der Wallet seinen Eintrag
const TAB_ALT = 6000;           // ms; älter → der andere Tab ist weg
const AUFLADEN_TAKT = 3000;     // ms; so oft fragt die Seite nach, ob eine Rechnung bezahlt ist
const MINT_PRUEFEN = 10 * 60_000; // ms; so alt darf der geprüfte Stand einer Mint (pruefeMint) werden
const MINT_NOCHMAL = 60_000;    // ms; nicht erreichbare Mint nach dieser Zeit erneut prüfen
const BESTAETIGUNG_DAUER = 60_000; // ms; so lange steht die Bestätigung einer Gutschrift im Kasten
const HERVOR_DAUER = 4000;      // ms; so lange ist das Guthaben einer Mint nach einer Gutschrift hervorgehoben
const LS_TAB = 'nostr-schach.wallet-tab.';         // + pubkey: { id, zeit } des Tabs, der Geld bewegt
const LS_HINWEIS = 'nostr-schach.wallet-hinweis.'; // + pubkey: erstes Aufladen geschafft (nsec-Hinweis gesehen)

export const mintName = (url) => MINTS.find((m) => m.url === url)?.name ?? url;
export const istTestMint = (url) => !!MINTS.find((m) => m.url === url)?.test;
// Name der Mint, bei Test-Mints mit dem Hinweis „Spielgeld“ (falls er nicht schon im Namen steht)
export const mintText = (url) => mintName(url) + (istTestMint(url) && !/Spielgeld/.test(mintName(url)) ? ' (Spielgeld)' : '');
const ls = {
  get(k) { try { return localStorage.getItem(k); } catch { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch { /* voll oder gesperrt */ } },
  del(k) { try { localStorage.removeItem(k); } catch { /* gesperrt */ } },
};
const pause = (ms) => new Promise((ok) => setTimeout(ok, ms));
const datum = (s) => new Date(s * 1000).toLocaleString('de-DE', { dateStyle: 'short', timeStyle: 'short' });

// Element bauen: el('button', { class: 'x', onclick }, 'Text', kind, …). Texte immer als Textknoten.
const EIGENSCHAFTEN = ['value', 'disabled', 'checked', 'open', 'selected', 'readOnly', 'href', 'download', 'title', 'type'];
export function el(tag, eig = {}, ...kinder) {
  const e = document.createElement(tag);
  for (const [k, v] of Object.entries(eig)) {
    if (v === null || v === undefined || v === false) continue;
    if (k === 'class') e.className = v;
    else if (k.startsWith('on')) e[k] = v;
    else if (EIGENSCHAFTEN.includes(k)) e[k] = v;
    else e.setAttribute(k, v === true ? '' : String(v));
  }
  e.append(...kinder.flat().filter((x) => x !== null && x !== undefined && x !== false));
  return e;
}

// Modaler Dialog mit Knöpfen; Ergebnis: `wert` des gedrückten Knopfs (null bei Esc).
// knoepfe: [{ text, wert, primaer }]. `text`: ein Absatz oder eine Liste von Absätzen.
export function frage({ titel, text, knoepfe }) {
  return new Promise((ok) => {
    let d = document.querySelector('#dialog');
    if (!d) { d = el('dialog', { id: 'dialog' }); document.body.append(d); }
    d.replaceChildren(el('h2', {}, titel), ...[].concat(text).map((t) => el('p', {}, t)),
      el('div', { class: 'reihe' }, knoepfe.map((k) => el('button', { class: k.primaer ? 'primaer' : null, 'data-wert': k.wert,
        onclick: () => { d.close(); ok(k.wert); } }, k.text))));
    d.oncancel = () => ok(null);
    d.showModal();
  });
}

// Kurze Meldung oben auf der Seite (Toast), verschwindet nach `dauer` ms von selbst. `art`: 'ok' oder 'warn'.
export function toast(text, { art = 'ok', dauer = 6000 } = {}) {
  let box = document.querySelector('#toasts');
  if (!box) { box = el('div', { id: 'toasts', role: 'status', 'aria-live': 'polite' }); document.body.append(box); }
  const t = el('div', { class: `toast ${art}` }, text);
  box.append(t);
  setTimeout(() => { t.classList.add('weg'); setTimeout(() => t.remove(), 400); }, dauer);
  return t;
}

// QR-Code als SVG (Module als ein Pfad). `gross`: Text in Großbuchstaben (alphanumerischer Modus,
// kleinerer Code, z. B. für LIGHTNING:LNBC…). Passt der Text nicht, ein Hinweis statt des Codes.
export function qrSvg(text, { gross = false } = {}) {
  let q;
  try {
    q = qrcode(0, 'L');
    if (gross) q.addData(text.toUpperCase(), 'Alphanumeric'); else q.addData(text);
    q.make();
  } catch {
    return el('p', { class: 'muted' }, 'Zu lang für einen QR-Code, bitte den Text kopieren.');
  }
  const n = q.getModuleCount(), rand = 4, ns = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(ns, 'svg');
  svg.setAttribute('viewBox', `0 0 ${n + 2 * rand} ${n + 2 * rand}`);
  svg.setAttribute('shape-rendering', 'crispEdges');
  svg.setAttribute('role', 'img');
  svg.setAttribute('aria-label', 'QR-Code');
  const hinten = document.createElementNS(ns, 'rect');
  hinten.setAttribute('width', '100%'); hinten.setAttribute('height', '100%'); hinten.setAttribute('fill', '#fff');
  let d = '';
  for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) if (q.isDark(y, x)) d += `M${x + rand} ${y + rand}h1v1h-1z`;
  const pfad = document.createElementNS(ns, 'path');
  pfad.setAttribute('d', d); pfad.setAttribute('fill', '#000');
  svg.append(hinten, pfad);
  return svg;
}

async function kopiere(text, feld) {
  try { await navigator.clipboard.writeText(text); return true; } catch {
    if (feld) { feld.focus(); feld.select(); }
    return false;
  }
}

const GERUEST = `
  <h2>Wallet</h2>
  <p id="w-nip07" class="hinweis warn versteckt">Mit der Browser-Erweiterung (NIP-07) kann diese Seite nicht für
    Cashu signieren (P2PK braucht den Schlüssel in der Seite). Guthaben anzeigen, Token einfügen, Aufladen und
    Auszahlen gehen, Einsatz-Partien und das Zurückholen gesperrter Einsätze nicht.</p>
  <p id="w-tab" class="hinweis warn versteckt">Diese Wallet ist schon in einem anderen Tab offen. Nur ein Tab
    sollte Geld bewegen: Hier sind Geldaktionen gesperrt, bis der andere Tab geschlossen ist.</p>
  <p id="w-meldung" class="muted"></p>
  <div id="w-ok" class="bestaetigung versteckt" role="status"></div>
  <div id="w-mints" class="mints"></div>
  <details id="w-aufladen"><summary>Aufladen per Lightning</summary>
    <p id="w-auf-hinweis" class="hinweis">Das Guthaben liegt nur in diesem Browser. Sichere deinen nsec
      („nsec anzeigen“ unter Identität) und lade ab und zu das Backup herunter. Gesperrte Einsätze lassen sich
      nur mit dem nsec zurückholen.</p>
    <div class="reihe"><select id="w-auf-mint"></select></div>
    <div class="reihe"><input id="w-auf-betrag" type="number" min="1" step="1" value="1000" class="zahl"> sat
      <button id="w-auf-los" class="geld">Rechnung erzeugen</button></div>
    <div id="w-auf-rechnung" class="versteckt">
      <div id="w-auf-daten">
        <div id="w-auf-qr" class="qr"></div>
        <textarea id="w-auf-text" class="mono" rows="3" readonly></textarea>
        <div class="reihe"><button id="w-auf-kopieren">Kopieren</button><a id="w-auf-link" href="#">In Lightning-Wallet öffnen</a></div>
      </div>
      <p id="w-auf-status" class="muted"></p>
    </div>
    <div id="w-auf-offen-box" class="versteckt">
      <p class="muted">Offene Aufladungen (werden weiter geprüft und gutgeschrieben, sobald sie bezahlt sind):</p>
      <ul id="w-auf-offen" class="liste"></ul>
    </div>
  </details>
  <details id="w-einfuegen"><summary>Token einfügen</summary>
    <textarea id="w-ein-text" class="mono" rows="3" placeholder="cashuB… oder cashuA…"></textarea>
    <div class="reihe"><button id="w-ein-los" class="geld">Bei der Mint einlösen</button></div>
  </details>
  <details id="w-auszahlen"><summary>Auszahlen per Lightning</summary>
    <div class="reihe"><select id="w-aus-mint"></select></div>
    <input id="w-aus-ziel" type="text" placeholder="BOLT11-Rechnung oder Lightning-Adresse (name@domain)">
    <div class="reihe"><input id="w-aus-betrag" type="number" min="1" step="1" class="zahl" placeholder="Betrag"> sat
      <span class="muted">(nur bei Lightning-Adresse)</span></div>
    <div class="reihe"><button id="w-aus-pruefen" class="geld">Gebühr prüfen</button></div>
    <div id="w-aus-bestaetigen" class="versteckt">
      <p id="w-aus-info" class="hinweis"></p>
      <div class="reihe"><button id="w-aus-los" class="primaer geld">Bezahlen</button><button id="w-aus-abbrechen">Abbrechen</button></div>
    </div>
  </details>
  <details id="w-export"><summary>Token exportieren</summary>
    <div class="reihe"><select id="w-exp-mint"></select></div>
    <div class="reihe"><input id="w-exp-betrag" type="number" min="1" step="1" class="zahl" placeholder="Betrag"> sat
      <button id="w-exp-los" class="geld">Token erzeugen</button></div>
    <div id="w-exp-token" class="versteckt">
      <div id="w-exp-qr" class="qr"></div>
      <textarea id="w-exp-text" class="mono" rows="3" readonly></textarea>
      <div class="reihe"><button id="w-exp-kopieren">Kopieren</button></div>
    </div>
    <p class="muted">Eigene Exporte, die bei der Mint noch nicht eingelöst sind:</p>
    <ul id="w-exp-liste" class="liste"></ul>
    <div class="reihe"><button id="w-exp-pruefen">Liste prüfen</button></div>
  </details>
  <details id="w-umbuchen"><summary>Umbuchen zwischen Mints</summary>
    <div class="reihe">von <select id="w-um-von"></select></div>
    <div class="reihe">nach <select id="w-um-nach"></select></div>
    <div class="reihe"><input id="w-um-betrag" type="number" min="1" step="1" class="zahl" placeholder="Betrag"> sat
      <button id="w-um-pruefen" class="geld">Gebühr prüfen</button></div>
    <div id="w-um-bestaetigen" class="versteckt">
      <p id="w-um-info" class="hinweis"></p>
      <div class="reihe"><button id="w-um-los" class="primaer geld">Umbuchen</button><button id="w-um-abbrechen">Abbrechen</button></div>
    </div>
  </details>
  <details id="w-einsaetze"><summary>Gesperrte Einsätze <span id="w-einsaetze-zahl"></span></summary>
    <ul id="w-einsaetze-liste" class="liste"></ul>
  </details>
  <div class="reihe" style="margin-top:8px"><button id="w-backup">Backup herunterladen</button></div>
  <p class="muted">Das Backup enthält das frei verfügbare Guthaben als Cashu-Token (wer die Datei hat, hat das
    Geld). <strong>Gesperrte Einsätze sind nicht dabei:</strong> Sie lassen sich nur mit deinem nsec zurückholen.</p>`;

// `kasten`: Element, in das der Wallet-Kasten kommt. `aufAenderung`: wird nach jeder Änderung von
// Guthaben, Einsätzen oder Tab-Sperre aufgerufen (die Seite zeichnet dann z. B. die Einsatz-Auswahl neu).
export function starteWallet({ kasten, aufAenderung = () => {} }) {
  kasten.innerHTML = GERUEST;
  const $ = (s) => kasten.querySelector(s);
  const tabId = Array.from(crypto.getRandomValues(new Uint8Array(8)), (b) => b.toString(16).padStart(2, '0')).join('');
  let wallet = null, pk = null, sk = null;
  let halter = false;           // dieser Tab darf Geld bewegen
  let fortgesetzt = null;       // pubkey, für den fortsetzen() schon lief
  let meldungZeit = null;
  const staende = new Map();    // Mint → { <partie-id>: Stand bei der Mint } (pruefeEinsaetze)
  const beobachtet = new Set(); // Quotes, deren Bezahlung die Seite gerade abwartet
  const zwecke = new Map();     // Quote → Wofür (z. B. 'Umbuchung'), für die Bestätigung der Gutschrift
  const mintStatus = new Map(); // Mint → { aufladen, auszahlen, alles, unbekannt, zeit } (pruefeMints)
  const hervor = new Map();     // Mint → Zeitpunkt (ms) der letzten Gutschrift (Guthaben hervorgehoben)
  let angezeigt = null;         // { url, quote, ablauf, abgelaufen } der Rechnung im Kasten
  let auszahlung = null, umbuchung = null;

  const meldung = (text, art = '', dauer = 0) => {
    const p = $('#w-meldung');
    p.textContent = text;
    p.className = art === 'warn' ? 'hinweis warn' : art === 'ok' ? 'hinweis ok' : 'muted';
    clearTimeout(meldungZeit);
    if (dauer) meldungZeit = setTimeout(() => { if (p.textContent === text) { p.textContent = ''; p.className = 'muted'; } }, dauer);
  };
  const geaendert = () => { zeige(); aufAenderung(); };
  // Geldaktion: nur mit Wallet in diesem Tab, Knöpfe gesperrt, solange sie läuft, Fehler als Meldung
  let laeuft = false;
  async function aktion(f) {
    if (!wallet || !halter || laeuft) return;
    laeuft = true; sperren();
    try { await f(); } catch (e) { meldung(text(e), 'warn'); } finally { laeuft = false; sperren(); geaendert(); }
  }
  const text = (e) => {
    const m = e?.message ?? String(e);
    const fremd = m.match(/^Mint nicht in der Liste \(EINSTELLUNGEN\.MINTS\): (.*)$/);
    if (fremd) return `Abgelehnt: Die Mint ${fremd[1]} steht nicht in der Liste dieser Seite. Angenommen werden nur Token der Mints aus der Liste.`;
    return m;
  };
  const zahl = (sel) => { const n = Number($(sel).value); return Number.isSafeInteger(n) && n > 0 ? n : null; };

  // --- Zwei Tabs ------------------------------------------------------------------------------
  // Der Tab, der die Wallet eines Schlüssels zuerst öffnet, erneuert alle 2 s einen Eintrag im
  // localStorage. Ein zweiter Tab mit demselben Schlüssel sieht ihn und sperrt seine Geldaktionen,
  // bis der Eintrag älter als 6 s ist (Tab geschlossen).
  function pruefeTab() {
    if (!pk) return;
    const k = LS_TAB + pk;
    let e = null;
    try { e = JSON.parse(ls.get(k) || 'null'); } catch { /* kaputt */ }
    const frei = !e || e.id === tabId || Date.now() - e.zeit > TAB_ALT;
    if (frei) ls.set(k, JSON.stringify({ id: tabId, zeit: Date.now() }));
    if (frei !== halter) {
      halter = frei;
      if (halter) nachDemLaden();
      geaendert();
    }
  }
  setInterval(pruefeTab, TAB_TAKT);
  window.addEventListener('pagehide', () => { if (halter && pk) ls.del(LS_TAB + pk); });

  // --- Identität ------------------------------------------------------------------------------
  function setzeIdentitaet({ sk: neuSk, pk: neuPk }) {
    if (pk && halter && pk !== neuPk) ls.del(LS_TAB + pk);
    sk = neuSk ?? null; pk = neuPk; halter = false;
    staende.clear(); beobachtet.clear(); zwecke.clear(); hervor.clear(); auszahlung = umbuchung = null;
    for (const b of ['#w-aus-bestaetigen', '#w-um-bestaetigen', '#w-exp-token']) $(b).classList.add('versteckt');
    $('#w-exp-liste').replaceChildren();
    versteckeRechnung();
    versteckeBestaetigung();
    try { wallet = new CashuWallet({ sk, pubkey: pk, speicher: localStorageSpeicher() }); } catch (e) { wallet = null; meldung(text(e), 'warn'); }
    $('#w-nip07').classList.toggle('versteckt', !!sk);
    pruefeTab();
    geaendert();
    pruefeMints();
  }

  // --- Mints prüfen ---------------------------------------------------------------------------
  // Beim Laden und danach alle 10 Minuten: kann jede Mint der Liste gerade alles (pruefeMint, mit
  // Cache)? Mints, die nicht aufladen oder auszahlen können, sind in den Auswahlen ausgegraut, mit Grund.
  // Eine nicht erreichbare Mint gilt als unbekannt (nicht ausgegraut) und wird nach einer Minute erneut geprüft.
  async function pruefeMints() {
    const w = wallet;
    if (!w) return;
    let neu = false;
    await Promise.all(MINTS.map(async (m) => {
      const alt = mintStatus.get(m.url);
      if (alt && Date.now() < alt.zeit + (alt.unbekannt ? MINT_NOCHMAL : MINT_PRUEFEN)) return;
      let st;
      try {
        const r = await w.pruefeMint(m.url, { neu: !!alt });
        st = { aufladen: r.gesperrt.aufladen, auszahlen: r.gesperrt.auszahlen, alles: null };
      } catch (e) {
        st = e.unklar ? { unbekannt: e.message } : { alles: `nicht nutzbar (${e.message})` };
      }
      mintStatus.set(m.url, { ...st, zeit: Date.now() });
      neu = true;
    }));
    if (neu && w === wallet) geaendert();
  }
  setInterval(pruefeMints, MINT_NOCHMAL);
  // Grund, warum die Mint `was` ('aufladen', 'auszahlen' oder 'einsatz': beides) gerade nicht kann, sonst null
  function mintGrund(url, was) {
    const st = mintStatus.get(url);
    if (!st) return null;
    if (st.alles) return st.alles;
    if (was === 'einsatz') return st.aufladen ?? st.auszahlen ?? null;
    return st[was] ?? null;
  }
  const mintGruende = (url) => { const st = mintStatus.get(url); return st?.alles ? [st.alles] : [st?.aufladen, st?.auszahlen].filter(Boolean); };

  // Nach dem Laden (bzw. sobald dieser Tab die Wallet übernimmt): offene Vorgänge aller Mints fortsetzen,
  // offene Aufladungen weiter beobachten (sie stehen unter „Offene Aufladungen“), Stand der gesperrten
  // Einsätze bei der Mint holen
  function nachDemLaden() {
    if (!wallet || fortgesetzt === pk) return;
    fortgesetzt = pk;
    const w = wallet;
    w.fortsetzen().then((rs) => {
      if (w !== wallet) return;
      meldung(fortsetzenText(rs), rs.some((r) => r.fehler) ? 'warn' : '', rs.some((r) => r.fehler) ? 0 : 8000);
      for (const r of rs) if (r.art === 'aufladen' && r.ergebnis?.status === 'gutgeschrieben') gutschrift({ url: r.mint, betrag: r.ergebnis.betrag, wofuer: 'Aufladung' });
      for (const m of MINTS) for (const a of w.offeneAufladungen(m.url)) beobachte(m.url, a.quote);
      geaendert();
      pruefeEinsaetze();
    });
  }

  // --- Bestätigung einer Gutschrift -------------------------------------------------------------
  // Grüner Kasten mit Häkchen („+300 sat bei Minibits gutgeschrieben“, neues Guthaben der Mint
  // hervorgehoben) und ein Toast oben auf der Seite, für Aufladen, Token, Umbuchen, Gewinne und
  // Erstattungen. `wofuer`: kurzer Zusatz in Klammern.
  let okZeit = null;
  function gutschrift({ url, betrag, wofuer = null }) {
    if (!wallet || !(betrag > 0)) return;
    hervor.set(url, Date.now());
    const satz = `+${betrag} sat bei ${mintName(url)} gutgeschrieben`;
    const box = $('#w-ok');
    box.replaceChildren(el('span', { class: 'haken', 'aria-hidden': 'true' }, '✓'),
      el('div', { class: 'text' }, el('div', { class: 'titel' }, satz + (wofuer ? ` (${wofuer})` : '')),
        el('div', {}, `Guthaben bei ${mintName(url)}: `, el('strong', { class: 'neu', 'data-mint': url }, `${wallet.guthaben(url)} sat`))),
      el('button', { class: 'zu', title: 'Schließen', 'aria-label': 'Bestätigung schließen', onclick: versteckeBestaetigung }, '×'));
    box.classList.remove('versteckt');
    clearTimeout(okZeit);
    okZeit = setTimeout(versteckeBestaetigung, BESTAETIGUNG_DAUER);
    toast(`✓ ${satz}${wofuer ? ` (${wofuer})` : ''}`);
    geaendert();
  }
  function versteckeBestaetigung() {
    clearTimeout(okZeit);
    $('#w-ok').classList.add('versteckt');
    $('#w-ok').replaceChildren();
  }
  function fortsetzenText(rs) {
    if (!rs.length) return 'Wallet geprüft: keine offenen Vorgänge.';
    const n = (f) => rs.filter(f).length;
    const teile = [];
    const gut = n((r) => r.ergebnis?.status === 'gutgeschrieben'), tausch = n((r) => r.art === 'tausch' && !r.fehler);
    const bezahlt = n((r) => r.ergebnis?.status === 'bezahlt'), offen = n((r) => r.ergebnis?.status === 'offen' || r.ergebnis?.status === 'ausstehend');
    const fehler = rs.filter((r) => r.fehler);
    if (gut) teile.push(`${gut} Aufladung${gut > 1 ? 'en' : ''} gutgeschrieben`);
    if (tausch) teile.push(`${tausch} Tausch${tausch > 1 ? 'e' : ''} abgeschlossen`);
    if (bezahlt) teile.push(`${bezahlt} Auszahlung${bezahlt > 1 ? 'en' : ''} verbucht`);
    if (offen) teile.push(`${offen} noch offen`);
    if (fehler.length) teile.push(`${fehler.length} nicht geklärt (${fehler[0].fehler})`);
    return `Wallet: offene Vorgänge fortgesetzt – ${teile.join(', ') || `${rs.length} geprüft`}.`;
  }

  // --- Anzeige --------------------------------------------------------------------------------
  // Auswahl → was die Mint dafür können muss (ohne Eintrag: nur Tausch)
  const AUSWAHL = { '#w-auf-mint': 'aufladen', '#w-aus-mint': 'auszahlen', '#w-exp-mint': null, '#w-um-von': 'auszahlen', '#w-um-nach': 'aufladen' };
  function zeige() {
    zeigeMints();
    for (const [sel, was] of Object.entries(AUSWAHL)) fuelleAuswahl($(sel), was);
    $('#w-auf-hinweis').classList.toggle('versteckt', !pk || ls.get(LS_HINWEIS + pk) === '1');
    zeigeOffeneAufladungen();
    zeigeEinsaetze();
    $('#w-tab').classList.toggle('versteckt', !wallet || halter);
    sperren();
  }
  function sperren() {
    for (const b of kasten.querySelectorAll('button.geld')) b.disabled = !wallet || !halter || laeuft;
    $('#w-backup').disabled = !wallet;
  }
  function zeigeMints() {
    const box = $('#w-mints');
    const offen = new Set([...box.querySelectorAll('details[open]')].map((d) => d.dataset.mint));
    box.replaceChildren(...MINTS.map((m) => {
      const g = wallet?.guthaben(m.url) ?? 0;
      const vorgaenge = wallet?.offeneVorgaenge(m.url) ?? [];
      const gruende = mintGruende(m.url);
      const neu = Date.now() - (hervor.get(m.url) ?? 0) < HERVOR_DAUER;
      const rest = !gruende.length || mintStatus.get(m.url)?.alles || !g ? ''
        : mintGrund(m.url, 'auszahlen') ? ' Dein Guthaben bleibt hier sichtbar; Token exportieren geht weiter.'
          : ' Dein Guthaben bleibt hier und lässt sich weiter auszahlen oder umbuchen.';
      return el('details', { class: 'mint', 'data-mint': m.url, open: g > 0 || offen.has(m.url) },
        el('summary', {}, el('span', { class: 'name' }, m.name), m.test ? el('span', { class: 'spielgeld' }, 'Spielgeld') : null,
          gruende.length ? el('span', { class: 'eingeschraenkt', title: gruende.join(', ') }, 'eingeschränkt') : null,
          el('span', { class: `betrag${neu ? ' neu' : ''}` }, `${g} sat`)),
        el('div', { class: 'mono muted' }, m.url),
        m.test ? el('div', { class: 'muted' }, 'Test-Mint: kein echtes Geld.') : null,
        gruende.length ? el('div', { class: 'warn mint-grund' }, `Kann gerade nicht alles: ${gruende.join(', ')}.${rest}`) : null,
        vorgaenge.length ? el('div', { class: 'muted' }, `Offene Vorgänge: ${vorgaenge.map((v) => v.zweck ?? v.art).join(', ')}`) : null);
    }));
  }
  // Auswahl der Mints; mit `was` sind Mints ausgegraut, die das gerade nicht können (mit kurzem Grund)
  function fuelleAuswahl(sel, was) {
    const vorher = sel.value;
    const grund = (m) => (was ? mintGrund(m.url, was) : null);
    sel.replaceChildren(...MINTS.map((m) => el('option', { value: m.url, disabled: !!grund(m) },
      `${m.name}${m.test ? ' · Spielgeld' : ''} – ${wallet?.guthaben(m.url) ?? 0} sat${grund(m) ? ` · ${grund(m)}` : ''}`)));
    const frei = MINTS.filter((m) => !grund(m));
    sel.value = [vorher, MINT].find((u) => frei.some((m) => m.url === u)) ?? frei[0]?.url
      ?? (MINTS.some((m) => m.url === vorher) ? vorher : (MINTS.find((m) => m.url === MINT) ?? MINTS[0]).url);
  }

  // --- Aufladen -------------------------------------------------------------------------------
  // Im Kasten steht höchstens eine Rechnung (`angezeigt`). Sie verschwindet nach dem Zahlungseingang
  // (dann die Bestätigung), wenn der Nutzer Mint oder Betrag ändert, und vor jeder neuen Rechnung.
  // Offene Aufladungen bleiben gespeichert, werden weiter geprüft und stehen unter „Offene Aufladungen“.
  const jetztS = () => Math.floor(Date.now() / 1000);
  const istAbgelaufen = (a) => !!a?.ablauf && jetztS() > a.ablauf;
  const alter = (s) => { const d = Math.max(0, jetztS() - s); return d < 60 ? `${d} s` : d < 3600 ? `${Math.floor(d / 60)} min` : d < 172800 ? `${Math.floor(d / 3600)} h` : `${Math.floor(d / 86400)} Tagen`; };
  function zeigeRechnung(url, q) {
    angezeigt = { url, quote: q.quote, ablauf: q.ablauf ?? null, abgelaufen: false };
    $('#w-aufladen').open = true;
    const box = $('#w-auf-rechnung');
    box.classList.remove('versteckt');
    box.dataset.quote = q.quote;
    $('#w-auf-daten').classList.remove('versteckt');
    $('#w-auf-status').className = 'muted';
    if (istAbgelaufen(q)) markiereAbgelaufen();
    else {
      $('#w-auf-qr').replaceChildren(qrSvg(`lightning:${q.rechnung}`, { gross: true }));
      $('#w-auf-text').value = q.rechnung;
      $('#w-auf-link').href = `lightning:${q.rechnung}`;
      $('#w-auf-status').textContent = `Warte auf die Zahlung von ${q.betrag} sat an ${mintName(url)} …`
        + (q.ablauf ? ` (gültig bis ${new Date(q.ablauf * 1000).toLocaleTimeString('de-DE', { timeStyle: 'short' })})` : '');
    }
    zeigeOffeneAufladungen();
  }
  function leereRechnung() {
    $('#w-auf-qr').replaceChildren();
    $('#w-auf-text').value = '';
    $('#w-auf-link').href = '#';
  }
  function versteckeRechnung() {
    angezeigt = null;
    const box = $('#w-auf-rechnung');
    box.classList.add('versteckt');
    delete box.dataset.quote;
    leereRechnung();
    $('#w-auf-status').textContent = '';
    zeigeOffeneAufladungen();
  }
  // Abgelaufen: kein QR, kein Text, kein Link mehr, nur der Hinweis
  function markiereAbgelaufen() {
    if (!angezeigt) return;
    angezeigt.abgelaufen = true;
    leereRechnung();
    $('#w-auf-daten').classList.add('versteckt');
    $('#w-auf-status').className = 'hinweis warn';
    $('#w-auf-status').textContent = 'Diese Rechnung ist abgelaufen, ohne bezahlt zu sein. Erzeuge bei Bedarf eine neue.';
  }
  // Liste der offenen Aufladungen aller Mints (ohne die angezeigte), neueste zuerst
  function zeigeOffeneAufladungen() {
    const alle = wallet ? MINTS.flatMap((m) => wallet.offeneAufladungen(m.url).map((a) => ({ ...a, url: m.url }))) : [];
    const liste = alle.filter((a) => a.quote !== angezeigt?.quote).sort((a, b) => (b.erstellt ?? 0) - (a.erstellt ?? 0));
    $('#w-auf-offen-box').classList.toggle('versteckt', !liste.length);
    $('#w-auf-offen').replaceChildren(...liste.map((a) => {
      const ab = istAbgelaufen(a);
      return el('li', { 'data-quote': a.quote, class: ab ? 'abgelaufen' : null },
        el('span', {}, `${mintName(a.url)} · ${a.betrag} sat${a.erstellt ? ` · vor ${alter(a.erstellt)}` : ''}`,
          ab ? el('span', { class: 'warn' }, ' · abgelaufen') : null),
        ab ? null : el('button', { onclick: () => {
          $('#w-auf-mint').value = a.url; $('#w-auf-betrag').value = String(a.betrag);
          versteckeBestaetigung();
          zeigeRechnung(a.url, a);
          beobachte(a.url, a.quote);
        } }, 'Rechnung zeigen'));
    }));
  }
  setInterval(() => {
    if (angezeigt && !angezeigt.abgelaufen && istAbgelaufen(angezeigt)) markiereAbgelaufen();
    zeigeOffeneAufladungen(); // Alter und „abgelaufen“
  }, 5000);
  // Mint oder Betrag geändert: Rechnung aus der Anzeige nehmen (die Aufladung bleibt offen und geprüft)
  const nachAenderung = () => { if (angezeigt) versteckeRechnung(); };
  $('#w-auf-mint').addEventListener('change', nachAenderung);
  $('#w-auf-betrag').addEventListener('input', nachAenderung);

  // Fragt alle 3 s nach, bis die Rechnung bezahlt (dann gutgeschrieben) oder abgelaufen ist
  async function beobachte(url, quote) {
    if (beobachtet.has(quote)) return;
    beobachtet.add(quote);
    const w = wallet;
    const zuMir = () => angezeigt?.quote === quote;
    const status = (t) => { if (zuMir() && !angezeigt.abgelaufen) $('#w-auf-status').textContent = t; };
    try {
      for (;;) {
        if (w !== wallet || !beobachtet.has(quote)) return;
        if (halter) {
          let r;
          try { r = await w.pruefeAufladung(url, quote); } catch (e) {
            if (e.unklar) { status(`Mint gerade nicht erreichbar, versuche es weiter … (${e.message})`); await pause(AUFLADEN_TAKT * 3); continue; }
            if (/Keine offene Aufladung/.test(e.message)) { if (zuMir()) versteckeRechnung(); return geaendert(); } // schon erledigt (z. B. fortsetzen)
            throw e;
          }
          if (w !== wallet) return;
          if (r.status === 'gutgeschrieben') {
            ls.set(LS_HINWEIS + pk, '1');
            if (zuMir()) versteckeRechnung();
            gutschrift({ url, betrag: r.betrag, wofuer: zwecke.get(quote) ?? 'Aufladung' });
            zwecke.delete(quote);
            return geaendert();
          }
          if (r.status === 'abgelaufen') {
            if (zuMir()) markiereAbgelaufen();
            return geaendert();
          }
          status(`Warte auf die Zahlung von ${r.betrag} sat an ${mintName(url)} … (zuletzt geprüft ${new Date().toLocaleTimeString('de-DE')})`);
        }
        await pause(AUFLADEN_TAKT);
      }
    } catch (e) {
      meldung(text(e), 'warn');
    } finally { beobachtet.delete(quote); }
  }
  $('#w-auf-los').onclick = () => aktion(async () => {
    // Vorher alles weg: Schlägt die neue Rechnung fehl, steht nur die Fehlermeldung da
    versteckeRechnung();
    versteckeBestaetigung();
    meldung('');
    const url = $('#w-auf-mint').value, betrag = zahl('#w-auf-betrag');
    if (!betrag) throw new Error('Bitte einen Betrag in sat eingeben.');
    let q;
    try { q = await wallet.aufladen(url, betrag); } catch (e) {
      if (e.mint) { mintStatus.delete(url); pruefeMints(); } // Stand der Mint neu holen (z. B. Aufladen abgeschaltet)
      throw e;
    }
    // Inzwischen Mint oder Betrag geändert: nur in die Liste der offenen Aufladungen
    if ($('#w-auf-mint').value === url && zahl('#w-auf-betrag') === betrag) zeigeRechnung(url, q);
    beobachte(url, q.quote);
  });
  $('#w-auf-kopieren').onclick = async () => {
    if (await kopiere($('#w-auf-text').value, $('#w-auf-text'))) meldung('Rechnung kopiert.', '', 3000);
  };

  // --- Token einfügen -------------------------------------------------------------------------
  $('#w-ein-los').onclick = () => aktion(async () => {
    const t = $('#w-ein-text').value.trim();
    if (!t) throw new Error('Bitte einen Token (cashuA… oder cashuB…) einfügen.');
    const r = await wallet.empfange(t);
    $('#w-ein-text').value = '';
    meldung(`Token eingelöst: ${r.betrag} sat bei ${mintName(r.mint)}${r.gebuehr ? ` (Gebühr der Mint ${r.gebuehr} sat)` : ''}.`, 'ok');
    gutschrift({ url: r.mint, betrag: r.betrag, wofuer: 'Token' });
  });

  // --- Auszahlen ------------------------------------------------------------------------------
  const gebuehrText = (v) => `Lightning-Gebühr höchstens ${v.gebuehr} sat (fee_reserve der Mint)`
    + (v.inputGebuehr ? `, Tauschgebühr der Mint ${v.inputGebuehr} sat` : '') + `; zusammen höchstens ${v.gesamt} sat. `
    + 'Was von der Gebühr nicht gebraucht wird, bleibt im Guthaben.';
  $('#w-aus-pruefen').onclick = () => aktion(async () => {
    const url = $('#w-aus-mint').value, ziel = $('#w-aus-ziel').value.trim();
    if (!ziel) throw new Error('Bitte eine BOLT11-Rechnung oder eine Lightning-Adresse eingeben.');
    let v;
    if (ziel.includes('@')) {
      const betrag = zahl('#w-aus-betrag');
      if (!betrag) throw new Error('Bei einer Lightning-Adresse bitte den Betrag in sat angeben.');
      v = await wallet.auszahlungVorbereiten(url, { adresse: ziel, betrag });
    } else v = await wallet.auszahlungVorbereiten(url, { rechnung: ziel.replace(/^lightning:/i, '') });
    auszahlung = { url, v, adresse: ziel.includes('@') ? ziel : null };
    $('#w-aus-info').textContent = `Auszahlen von ${mintName(url)}: ${v.betrag} sat${ziel.includes('@') ? ` an ${ziel}` : ''}. `
      + (v.beschreibung ? `Beschreibung der Rechnung: „${v.beschreibung}“. ` : '') + gebuehrText(v);
    $('#w-aus-bestaetigen').classList.remove('versteckt');
  });
  $('#w-aus-abbrechen').onclick = () => { auszahlung = null; $('#w-aus-bestaetigen').classList.add('versteckt'); };
  $('#w-aus-los').onclick = () => aktion(async () => {
    if (!auszahlung) return;
    const { url, v, adresse } = auszahlung;
    auszahlung = null;
    $('#w-aus-bestaetigen').classList.add('versteckt');
    const r = await wallet.auszahlen(url, v);
    if (r.status === 'bezahlt') {
      $('#w-aus-ziel').value = ''; $('#w-aus-betrag').value = '';
      // Nur Betrag und tatsächliche Gebühr: Das Wechselgeld der Mint ist meist der Rest aus dem
      // Aufteilen größerer Proofs und bleibt ohnehin im Guthaben
      meldung(`Bezahlt: ${r.betrag} sat${adresse ? ` an ${adresse}` : ''}, Gebühr ${r.gebuehr} sat.`, 'ok');
    } else meldung('Die Mint bezahlt die Rechnung noch. Das Ergebnis klärt die Seite beim nächsten Laden.', 'warn');
  });

  // --- Token exportieren ----------------------------------------------------------------------
  $('#w-exp-los').onclick = () => aktion(async () => {
    const url = $('#w-exp-mint').value, betrag = zahl('#w-exp-betrag');
    if (!betrag) throw new Error('Bitte einen Betrag in sat eingeben.');
    const token = await wallet.exportiere(url, betrag);
    $('#w-exp-token').classList.remove('versteckt');
    $('#w-exp-text').value = token;
    $('#w-exp-qr').replaceChildren(qrSvg(token));
    meldung(`Token über ${betrag} sat erzeugt. Wer ihn hat, hat das Geld.`, 'ok');
  });
  $('#w-exp-kopieren').onclick = async () => {
    if (await kopiere($('#w-exp-text').value, $('#w-exp-text'))) meldung('Token kopiert.', '', 3000);
  };
  $('#w-exp-pruefen').onclick = async () => {
    if (!wallet) return;
    const liste = $('#w-exp-liste');
    liste.replaceChildren(el('li', { class: 'muted' }, 'Frage die Mints …'));
    const eintraege = [];
    for (const m of MINTS) {
      if (!wallet.exporte(m.url).length) continue;
      try { for (const x of await wallet.offeneExporte(m.url)) eintraege.push({ ...x, url: m.url }); }
      catch (e) { eintraege.push({ fehler: `${m.name}: ${text(e)}` }); }
    }
    liste.replaceChildren(...(eintraege.length ? eintraege.reverse().map((x) => x.fehler ? el('li', { class: 'warn' }, x.fehler)
      : el('li', {}, el('span', {}, `${datum(x.zeit)} · ${x.betrag} sat · ${mintName(x.url)}`),
        el('button', { onclick: async () => { if (await kopiere(x.token)) meldung('Token kopiert.', '', 3000); } }, 'Kopieren')))
      : [el('li', { class: 'muted' }, 'Keine offenen Exporte.')]));
  };

  // --- Umbuchen -------------------------------------------------------------------------------
  // Aufladung bei der Ziel-Mint anlegen und mit Guthaben der Quell-Mint bezahlen (Lightning)
  $('#w-um-pruefen').onclick = () => aktion(async () => {
    const von = $('#w-um-von').value, nach = $('#w-um-nach').value, betrag = zahl('#w-um-betrag');
    if (von === nach) throw new Error('Bitte zwei verschiedene Mints wählen.');
    if (!betrag) throw new Error('Bitte einen Betrag in sat eingeben.');
    const q = await wallet.aufladen(nach, betrag);
    const v = await wallet.auszahlungVorbereiten(von, { rechnung: q.rechnung });
    umbuchung = { von, nach, q, v };
    $('#w-um-info').textContent = `Umbuchen: ${betrag} sat von ${mintName(von)} nach ${mintName(nach)}. ${gebuehrText(v)}`;
    $('#w-um-bestaetigen').classList.remove('versteckt');
  });
  $('#w-um-abbrechen').onclick = () => { umbuchung = null; $('#w-um-bestaetigen').classList.add('versteckt'); };
  $('#w-um-los').onclick = () => aktion(async () => {
    if (!umbuchung) return;
    const { von, nach, q, v } = umbuchung;
    umbuchung = null;
    $('#w-um-bestaetigen').classList.add('versteckt');
    const r = await wallet.auszahlen(von, v);
    if (r.status !== 'bezahlt') { meldung('Die Mint bezahlt noch. Die Gutschrift folgt, sobald die Zahlung durch ist.', 'warn'); }
    else meldung(`Umgebucht: ${r.betrag} sat von ${mintName(von)} bezahlt (Gebühr ${r.gebuehr} sat), Gutschrift bei ${mintName(nach)} folgt …`, 'ok');
    zwecke.set(q.quote, `Umbuchung von ${mintName(von)}`);
    beobachte(nach, q.quote);
  });

  // --- Gesperrte Einsätze ---------------------------------------------------------------------
  const alleEinsaetze = () => (wallet ? MINTS.flatMap((m) => Object.entries(wallet.einsaetze(m.url))
    .map(([g, e]) => ({ g, url: m.url, ...e, stand: staende.get(m.url)?.[g] ?? null }))) : [])
    .sort((a, b) => b.locktime - a.locktime);
  // Stand der nicht zurückgeholten Einsätze bei der Mint abfragen (NUT-07)
  async function pruefeEinsaetze() {
    if (!wallet) return;
    const w = wallet;
    for (const url of new Set(alleEinsaetze().filter((e) => !e.zurueck).map((e) => e.url))) {
      try { const s = await w.pruefeEinsaetze(url); if (w === wallet) staende.set(url, s); } catch { /* bleibt unbekannt */ }
    }
    if (w === wallet) geaendert();
  }
  function einsatzStand(e) {
    if (e.zurueck) return { text: 'zurückgeholt' };
    if (e.stand === 'SPENT') return { text: 'eingelöst' };
    const jetzt = Date.now() / 1000;
    if (jetzt <= e.locktime) return { text: `läuft · zurückholbar ab ${datum(e.locktime + 1)}` };
    return { text: 'Sperrfrist vorbei, zurückholbar', zurueck: true };
  }
  function zeigeEinsaetze() {
    const liste = alleEinsaetze();
    const offen = liste.filter((e) => !e.zurueck && e.stand !== 'SPENT');
    $('#w-einsaetze-zahl').textContent = offen.length ? `(${offen.length}, ${offen.reduce((s, e) => s + e.betrag, 0)} sat)` : '';
    $('#w-einsaetze-liste').replaceChildren(...(liste.length ? liste.map((e) => {
      const st = einsatzStand(e);
      return el('li', { 'data-g': e.g },
        el('span', {}, el('a', { href: `#${e.g}` }, `Partie ${e.g.slice(0, 6)}`), ` · ${e.betrag} sat · ${mintName(e.url)} · `,
          el('span', { class: 'stand' }, st.text)),
        st.zurueck ? el('button', { class: 'geld', onclick: () => holeZurueck(e.url, e.g) }, 'Zurückholen') : null);
    }) : [el('li', { class: 'muted' }, 'Keine.')]));
  }
  $('#w-einsaetze').addEventListener('toggle', () => { if ($('#w-einsaetze').open) pruefeEinsaetze(); });
  function holeZurueck(url, g) {
    return aktion(async () => {
      const r = await wallet.holeZurueck(url, g);
      meldung(`Einsatz der Partie ${g.slice(0, 6)} zurückgeholt: ${r.betrag} sat (nach Gebühr der Mint).`, 'ok');
      gutschrift({ url, betrag: r.betrag, wofuer: `Einsatz der Partie ${g.slice(0, 6)} zurückgeholt` });
    });
  }

  // --- Backup ---------------------------------------------------------------------------------
  function backup() {
    if (!wallet) return;
    const gesperrt = alleEinsaetze().filter((e) => !e.zurueck && e.stand !== 'SPENT');
    const daten = {
      art: 'nostr-schach-wallet-backup', version: 1, erstellt: new Date().toISOString(), npub: nip19.npubEncode(pk),
      hinweis: 'Frei verfügbares Guthaben als Cashu-Token (cashuB…), einlösbar mit „Token einfügen“ oder jeder '
        + 'Cashu-Wallet. Wer diese Datei hat, hat das Geld. Gesperrte Einsätze stehen nicht als Token darin: Sie '
        + 'lassen sich nur mit dem nsec dieses Schlüssels zurückholen (nach der Sperrfrist).',
      token: wallet.exportiereAlles(),
      gesperrteEinsaetze: gesperrt.map((e) => ({ partie: e.g, mint: e.url, betrag: e.betrag, zurueckholbarAb: new Date((e.locktime + 1) * 1000).toISOString() })),
    };
    const blob = new Blob([JSON.stringify(daten, null, 2)], { type: 'application/json' });
    const a = el('a', { href: URL.createObjectURL(blob), download: `nostr-schach-wallet-${new Date().toISOString().slice(0, 10)}.json` });
    document.body.append(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 60_000);
    meldung(`Backup heruntergeladen (${daten.token.reduce((s, t) => s + t.betrag, 0)} sat als Token).`
      + (gesperrt.length ? ' Gesperrte Einsätze holst du nur mit dem nsec zurück.' : ''), 'ok', 10000);
  }
  $('#w-backup').onclick = backup;

  // --- Schutz beim Wechsel der Identität -------------------------------------------------------
  // Vor „Neue Identität“, „nsec importieren“ und dem Wechsel zu NIP-07: Hat die Wallet Guthaben,
  // gesperrte Einsätze oder offene Vorgänge, fragt die Seite nach und bietet vorher das Backup an.
  // Ergebnis: null (nichts in der Wallet, ohne Rückfrage), true (Nutzer will wechseln) oder false.
  // `zeigeNsec`: zeigt den nsec (Knopf im Dialog).
  async function vorWechsel(zeigeNsec) {
    if (!wallet) return null;
    const guthaben = MINTS.reduce((s, m) => s + wallet.guthaben(m.url), 0);
    const gesperrt = alleEinsaetze().filter((e) => !e.zurueck && e.stand !== 'SPENT');
    const vorgaenge = MINTS.flatMap((m) => wallet.offeneVorgaenge(m.url));
    if (!guthaben && !gesperrt.length && !vorgaenge.length) return null;
    const teile = [];
    if (guthaben) teile.push(`${guthaben} sat Guthaben`);
    if (gesperrt.length) teile.push(`${gesperrt.length} gesperrte Einsätze (${gesperrt.reduce((s, e) => s + e.betrag, 0)} sat)`);
    if (vorgaenge.length) teile.push(`${vorgaenge.length} offene Vorgänge`);
    for (;;) {
      const wahl = await frage({
        titel: 'Wallet mit Geld',
        text: [`Die Wallet dieses Schlüssels hat ${teile.join(', ')}.`,
          'Nach dem Wechsel siehst du sie nicht mehr. Die Wallet liegt je Schlüssel im Browser-Speicher: Wechselst du '
          + 'später zurück zum alten Schlüssel (nsec importieren), ist das Guthaben wieder sichtbar.',
          'Sichere vorher das Backup (frei verfügbares Guthaben als Token). Gesperrte Einsätze lassen sich nur mit dem '
          + 'nsec zurückholen.'],
        knoepfe: [{ text: 'Backup herunterladen', wert: 'backup' }, ...(sk && zeigeNsec ? [{ text: 'nsec anzeigen', wert: 'nsec' }] : []),
          { text: 'Trotzdem wechseln', wert: 'weiter' }, { text: 'Abbrechen', wert: 'abbrechen', primaer: true }],
      });
      if (wahl === 'backup') backup();
      else if (wahl === 'nsec') zeigeNsec();
      else return wahl === 'weiter';
    }
  }

  // Bereich öffnen und vorbelegen (z. B. aus „Guthaben zu klein“)
  function zeigeBereich(id, fuellen) {
    const d = $(id);
    d.open = true;
    fuellen();
    d.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }

  return {
    setzeIdentitaet,
    get wallet() { return wallet; },
    kannSignieren: () => !!wallet && !!sk,
    darfGeldBewegen: () => !!wallet && halter,
    guthaben: (url) => wallet?.guthaben(url) ?? 0,
    vorWechsel,
    holeZurueck,
    meldung,
    gutschrift,
    mintGrund,
    aktualisiere: geaendert,
    pruefeEinsaetze,
    zeigeAufladen: (url, betrag) => zeigeBereich('#w-aufladen', () => {
      if (angezeigt && (angezeigt.url !== url || (betrag && zahl('#w-auf-betrag') !== betrag))) versteckeRechnung();
      $('#w-auf-mint').value = url; if (betrag) $('#w-auf-betrag').value = betrag;
    }),
    zeigeUmbuchen: (nach, betrag) => zeigeBereich('#w-umbuchen', () => {
      $('#w-um-nach').value = nach;
      const von = MINTS.filter((m) => m.url !== nach).sort((a, b) => wallet.guthaben(b.url) - wallet.guthaben(a.url))[0];
      if (von) $('#w-um-von').value = von.url;
      if (betrag) $('#w-um-betrag').value = betrag;
    }),
  };
}
