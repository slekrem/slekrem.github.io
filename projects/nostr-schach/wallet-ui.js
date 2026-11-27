// Wallet-Kasten der Spieler-Seite (index.html, rechte Spalte unter „Identität“): Guthaben je Mint,
// Aufladen per Lightning (mit QR-Code), Token einfügen, Auszahlen, Token exportieren, Umbuchen
// zwischen Mints, Backup und die gesperrten Einsätze mit Rückholung. Dazu der Schutz beim Wechsel der
// Identität und die Sperre, wenn dieselbe Wallet in zwei Tabs offen ist.
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
  <div id="w-mints" class="mints"></div>
  <details id="w-aufladen"><summary>Aufladen per Lightning</summary>
    <p id="w-auf-hinweis" class="hinweis">Das Guthaben liegt nur in diesem Browser. Sichere deinen nsec
      („nsec anzeigen“ unter Identität) und lade ab und zu das Backup herunter. Gesperrte Einsätze lassen sich
      nur mit dem nsec zurückholen.</p>
    <div class="reihe"><select id="w-auf-mint"></select></div>
    <div class="reihe"><input id="w-auf-betrag" type="number" min="1" step="1" value="1000" class="zahl"> sat
      <button id="w-auf-los" class="geld">Rechnung erzeugen</button></div>
    <div id="w-auf-rechnung" class="versteckt">
      <div id="w-auf-qr" class="qr"></div>
      <textarea id="w-auf-text" class="mono" rows="3" readonly></textarea>
      <div class="reihe"><button id="w-auf-kopieren">Kopieren</button><a id="w-auf-link" href="#">In Lightning-Wallet öffnen</a></div>
      <p id="w-auf-status" class="muted"></p>
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
    staende.clear(); beobachtet.clear(); auszahlung = umbuchung = null;
    for (const b of ['#w-aus-bestaetigen', '#w-um-bestaetigen', '#w-auf-rechnung', '#w-exp-token']) $(b).classList.add('versteckt');
    $('#w-exp-liste').replaceChildren();
    try { wallet = new CashuWallet({ sk, pubkey: pk, speicher: localStorageSpeicher() }); } catch (e) { wallet = null; meldung(text(e), 'warn'); }
    $('#w-nip07').classList.toggle('versteckt', !!sk);
    pruefeTab();
    geaendert();
  }

  // Nach dem Laden (bzw. sobald dieser Tab die Wallet übernimmt): offene Vorgänge aller Mints fortsetzen,
  // offene Aufladungen weiter beobachten, Stand der gesperrten Einsätze bei der Mint holen
  function nachDemLaden() {
    if (!wallet || fortgesetzt === pk) return;
    fortgesetzt = pk;
    const w = wallet;
    w.fortsetzen().then((rs) => {
      if (w !== wallet) return;
      meldung(fortsetzenText(rs), rs.some((r) => r.fehler) ? 'warn' : '', rs.some((r) => r.fehler) ? 0 : 8000);
      for (const m of MINTS) for (const a of w.offeneAufladungen(m.url)) { zeigeRechnung(m.url, a); beobachte(m.url, a.quote); }
      geaendert();
      pruefeEinsaetze();
    });
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
  function zeige() {
    zeigeMints();
    for (const sel of ['#w-auf-mint', '#w-aus-mint', '#w-exp-mint', '#w-um-von', '#w-um-nach']) fuelleAuswahl($(sel));
    $('#w-auf-hinweis').classList.toggle('versteckt', !pk || ls.get(LS_HINWEIS + pk) === '1');
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
      return el('details', { class: 'mint', 'data-mint': m.url, open: g > 0 || offen.has(m.url) },
        el('summary', {}, el('span', { class: 'name' }, m.name), m.test ? el('span', { class: 'spielgeld' }, 'Spielgeld') : null,
          el('span', { class: 'betrag' }, `${g} sat`)),
        el('div', { class: 'mono muted' }, m.url),
        m.test ? el('div', { class: 'muted' }, 'Test-Mint: kein echtes Geld.') : null,
        vorgaenge.length ? el('div', { class: 'muted' }, `Offene Vorgänge: ${vorgaenge.map((v) => v.zweck ?? v.art).join(', ')}`) : null);
    }));
  }
  function fuelleAuswahl(sel) {
    const vorher = sel.value;
    sel.replaceChildren(...MINTS.map((m) => el('option', { value: m.url },
      `${m.name}${m.test ? ' · Spielgeld' : ''} – ${wallet?.guthaben(m.url) ?? 0} sat`)));
    sel.value = MINTS.some((m) => m.url === vorher) ? vorher : (MINTS.find((m) => m.url === MINT) ?? MINTS[0]).url;
  }

  // --- Aufladen -------------------------------------------------------------------------------
  function zeigeRechnung(url, q) {
    $('#w-aufladen').open = true;
    $('#w-auf-rechnung').classList.remove('versteckt');
    $('#w-auf-rechnung').dataset.quote = q.quote;
    $('#w-auf-qr').replaceChildren(qrSvg(`lightning:${q.rechnung}`, { gross: true }));
    $('#w-auf-text').value = q.rechnung;
    $('#w-auf-link').href = `lightning:${q.rechnung}`;
    $('#w-auf-status').textContent = `Warte auf die Zahlung von ${q.betrag} sat an ${mintName(url)} …`;
  }
  // Fragt alle 3 s nach, bis die Rechnung bezahlt (dann gutgeschrieben) oder abgelaufen ist
  async function beobachte(url, quote) {
    if (beobachtet.has(quote)) return;
    beobachtet.add(quote);
    const w = wallet;
    const zuMir = () => $('#w-auf-rechnung').dataset.quote === quote;
    try {
      for (;;) {
        if (w !== wallet || !beobachtet.has(quote)) return;
        if (halter) {
          let r;
          try { r = await w.pruefeAufladung(url, quote); } catch (e) {
            if (e.unklar) { if (zuMir()) $('#w-auf-status').textContent = `Mint gerade nicht erreichbar, versuche es weiter … (${e.message})`; await pause(AUFLADEN_TAKT * 3); continue; }
            if (/Keine offene Aufladung/.test(e.message)) return geaendert(); // schon erledigt (z. B. fortsetzen)
            throw e;
          }
          if (r.status === 'gutgeschrieben') {
            ls.set(LS_HINWEIS + pk, '1');
            if (zuMir()) $('#w-auf-status').textContent = `Bezahlt: ${r.betrag} sat gutgeschrieben.`;
            meldung(`Aufladung: ${r.betrag} sat bei ${mintName(url)} gutgeschrieben.`, 'ok', 10000);
            return geaendert();
          }
          if (r.status === 'abgelaufen') {
            if (zuMir()) $('#w-auf-status').textContent = 'Die Rechnung ist abgelaufen, ohne bezahlt zu sein.';
            return geaendert();
          }
          if (zuMir()) $('#w-auf-status').textContent = `Warte auf die Zahlung von ${r.betrag} sat an ${mintName(url)} … (zuletzt geprüft ${new Date().toLocaleTimeString('de-DE')})`;
        }
        await pause(AUFLADEN_TAKT);
      }
    } catch (e) {
      meldung(text(e), 'warn');
    } finally { beobachtet.delete(quote); }
  }
  $('#w-auf-los').onclick = () => aktion(async () => {
    const url = $('#w-auf-mint').value, betrag = zahl('#w-auf-betrag');
    if (!betrag) throw new Error('Bitte einen Betrag in sat eingeben.');
    const q = await wallet.aufladen(url, betrag);
    zeigeRechnung(url, q);
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
  });

  // --- Auszahlen ------------------------------------------------------------------------------
  const gebuehrText = (v) => `Lightning-Gebühr höchstens ${v.gebuehr} sat (fee_reserve der Mint)`
    + (v.inputGebuehr ? `, Tauschgebühr der Mint ${v.inputGebuehr} sat` : '') + `; zusammen höchstens ${v.gesamt} sat. `
    + 'Was von der Gebühr übrig bleibt, kommt als Wechselgeld zurück.';
  $('#w-aus-pruefen').onclick = () => aktion(async () => {
    const url = $('#w-aus-mint').value, ziel = $('#w-aus-ziel').value.trim();
    if (!ziel) throw new Error('Bitte eine BOLT11-Rechnung oder eine Lightning-Adresse eingeben.');
    let v;
    if (ziel.includes('@')) {
      const betrag = zahl('#w-aus-betrag');
      if (!betrag) throw new Error('Bei einer Lightning-Adresse bitte den Betrag in sat angeben.');
      v = await wallet.auszahlungVorbereiten(url, { adresse: ziel, betrag });
    } else v = await wallet.auszahlungVorbereiten(url, { rechnung: ziel.replace(/^lightning:/i, '') });
    auszahlung = { url, v };
    $('#w-aus-info').textContent = `Auszahlen von ${mintName(url)}: ${v.betrag} sat${ziel.includes('@') ? ` an ${ziel}` : ''}. ${gebuehrText(v)}`;
    $('#w-aus-bestaetigen').classList.remove('versteckt');
  });
  $('#w-aus-abbrechen').onclick = () => { auszahlung = null; $('#w-aus-bestaetigen').classList.add('versteckt'); };
  $('#w-aus-los').onclick = () => aktion(async () => {
    if (!auszahlung) return;
    const { url, v } = auszahlung;
    auszahlung = null;
    $('#w-aus-bestaetigen').classList.add('versteckt');
    const r = await wallet.auszahlen(url, v);
    if (r.status === 'bezahlt') {
      $('#w-aus-ziel').value = ''; $('#w-aus-betrag').value = '';
      meldung(`Bezahlt: ${r.betrag} sat, Gebühr ${r.gebuehr} sat, Wechselgeld ${r.wechselgeld} sat zurück.`, 'ok');
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
    aktualisiere: geaendert,
    pruefeEinsaetze,
    zeigeAufladen: (url, betrag) => zeigeBereich('#w-aufladen', () => { $('#w-auf-mint').value = url; if (betrag) $('#w-auf-betrag').value = betrag; }),
    zeigeUmbuchen: (nach, betrag) => zeigeBereich('#w-umbuchen', () => {
      $('#w-um-nach').value = nach;
      const von = MINTS.filter((m) => m.url !== nach).sort((a, b) => wallet.guthaben(b.url) - wallet.guthaben(a.url))[0];
      if (von) $('#w-um-von').value = von.url;
      if (betrag) $('#w-um-betrag').value = betrag;
    }),
  };
}
