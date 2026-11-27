// Lightning-Adressen (LUD-16) über LNURL-pay (LUD-06) zu einer BOLT11-Rechnung auflösen.
//
// Ohne DOM und ohne eigene Netzzugriffe: Jede Anfrage geht über das übergebene `fetch`, damit die
// Tests einen Schein-LNURL-Server (test/schein-mint.mjs) einsetzen können. Genutzt von cashu.js
// (Auszahlen an eine Lightning-Adresse).
//
//   name@domain  →  GET https://<domain>/.well-known/lnurlp/<name>
//                →  { tag: "payRequest", callback, minSendable, maxSendable, metadata }  (msat)
//                →  GET <callback>?amount=<msat>  →  { pr: "lnbc…" }
// Die Rechnung wird nur angenommen, wenn ihr Betrag genau dem verlangten entspricht und, falls sie
// einen `description_hash` (Feld `h`) trägt, dieser gleich SHA-256 des `metadata`-Texts aus der ersten
// Antwort ist (LUD-06). Ohne `h` (verbreitet, z. B. Wallet of Satoshi mit Feld `d`) gilt sie, weil sie
// vom `callback` der aufgelösten Adresse kommt; ihre Beschreibung (`d`) zeigt die Wallet vor dem Zahlen.

// Teil einer Lightning-Adresse: Name (LUD-16: a-z0-9-_.+) und Domain (ohne Schema, ohne Pfad)
const ADRESSE = /^([a-z0-9._+-]+)@([a-z0-9-]+(?:\.[a-z0-9-]+)+(?::\d+)?)$/;

// URL zum Auflösen einer Lightning-Adresse, wirft bei einer ungültigen Adresse
export function adresseZuUrl(adresse) {
  const m = typeof adresse === 'string' && adresse.trim().toLowerCase().match(ADRESSE);
  if (!m) throw new Error('Keine gültige Lightning-Adresse (name@domain)');
  return `https://${m[2]}/.well-known/lnurlp/${m[1]}`;
}

// Betrag einer BOLT11-Rechnung in msat (aus dem lesbaren Teil, z. B. `lnbc2500u1…`), null bei einer
// Rechnung ohne Betrag. Wirft, wenn die Rechnung nicht wie BOLT11 aussieht. Die Signatur der
// Rechnung prüft die Mint beim Bezahlen.
const MULTIPLIKATOR = { m: 100_000_000n, u: 100_000n, n: 100n }; // msat je Einheit (BTC = 10¹¹ msat)
export function bolt11Betrag(rechnung) {
  const r = typeof rechnung === 'string' ? rechnung.trim().toLowerCase().replace(/^lightning:/, '') : '';
  const trenner = r.lastIndexOf('1');
  const m = trenner > 0 && /^[02-9ac-hj-np-z]+$/.test(r.slice(trenner + 1))
    && r.slice(0, trenner).match(/^ln(?:bcrt|bc|tbs|tb|sb)(?:(\d+)([munp]?))?$/);
  if (!m) throw new Error('Keine BOLT11-Rechnung');
  if (m[1] === undefined) return null;
  const zahl = BigInt(m[1]);
  let msat;
  if (m[2] === '') msat = zahl * 100_000_000_000n;
  else if (m[2] === 'p') {
    if (zahl % 10n !== 0n) throw new Error('BOLT11-Betrag ist kein ganzes msat');
    msat = zahl / 10n;
  } else msat = zahl * MULTIPLIKATOR[m[2]];
  if (msat > BigInt(Number.MAX_SAFE_INTEGER)) throw new Error('BOLT11-Betrag zu groß');
  return Number(msat);
}

// `description_hash` einer BOLT11-Rechnung (Feld `h`, 32 Byte) als Hex, null ohne dieses Feld. Wirft,
// wenn die Rechnung nicht wie BOLT11 aussieht. Aufbau des Datenteils (5-Bit-Wörter, bech32):
// Zeitstempel (7 Wörter), Felder je Typ (1 Wort), Länge (2 Wörter) und Daten, Signatur (104 Wörter),
// Prüfsumme (6 Wörter). Die Prüfsumme und die Signatur prüft die Mint beim Bezahlen.
const BECH32 = 'qpzry9x8gf2tvdw0s3jn54khce6mua7l';
const FELD_H = 23; // 'h' in bech32
const FELD_D = 13; // 'd' in bech32
// 5-Bit-Wörter zu Bytes; übrige Bits am Ende (Auffüllung) fallen weg
const bytesAus = (woerter) => {
  let bits = 0, wert = 0;
  const bytes = [];
  for (const x of woerter) {
    wert = ((wert << 5) | x) & 0xfff; bits += 5;
    if (bits >= 8) { bits -= 8; bytes.push((wert >> bits) & 0xff); }
  }
  return bytes;
};
// Daten des ersten Felds vom Typ `gesucht` (mit Länge `laengeSoll`, falls angegeben) als
// 5-Bit-Wörter, null ohne dieses Feld
function bolt11Feld(rechnung, gesucht, laengeSoll = null) {
  bolt11Betrag(rechnung); // Form prüfen
  const r = rechnung.trim().toLowerCase().replace(/^lightning:/, '');
  const w = [...r.slice(r.lastIndexOf('1') + 1)].map((c) => BECH32.indexOf(c));
  const ende = w.length - 6 - 104;
  if (ende < 7) throw new Error('BOLT11-Rechnung zu kurz');
  for (let i = 7; i + 3 <= ende;) {
    const typ = w[i], laenge = w[i + 1] * 32 + w[i + 2];
    if (i + 3 + laenge > ende) throw new Error('BOLT11-Feld reicht über das Ende');
    if (typ === gesucht && (laengeSoll === null || laenge === laengeSoll)) return w.slice(i + 3, i + 3 + laenge);
    i += 3 + laenge;
  }
  return null;
}
export function bolt11BeschreibungHash(rechnung) {
  const daten = bolt11Feld(rechnung, FELD_H, 52);
  return daten && bytesAus(daten).slice(0, 32).map((b) => b.toString(16).padStart(2, '0')).join('');
}

// Beschreibung einer BOLT11-Rechnung im Klartext (Feld `d`, UTF-8), null ohne dieses Feld. Wirft,
// wenn die Rechnung nicht wie BOLT11 aussieht.
export function bolt11Beschreibung(rechnung) {
  const daten = bolt11Feld(rechnung, FELD_D);
  return daten && new TextDecoder().decode(new Uint8Array(bytesAus(daten)));
}

// Ablauf einer BOLT11-Rechnung in Unix-Sekunden: Zeitstempel (die ersten 7 Wörter) plus Feld `x`
// (Gültigkeit in Sekunden, ohne Feld 3600). Wirft, wenn die Rechnung nicht wie BOLT11 aussieht.
const FELD_X = 6; // 'x' in bech32
const wortZahl = (w) => w.reduce((s, x) => s * 32 + x, 0);
export function bolt11Ablauf(rechnung) {
  bolt11Betrag(rechnung); // Form prüfen
  const r = rechnung.trim().toLowerCase().replace(/^lightning:/, '');
  const w = [...r.slice(r.lastIndexOf('1') + 1)].map((c) => BECH32.indexOf(c));
  const ende = w.length - 6 - 104;
  if (ende < 7) throw new Error('BOLT11-Rechnung zu kurz');
  let dauer = 3600;
  for (let i = 7; i + 3 <= ende;) {
    const typ = w[i], laenge = w[i + 1] * 32 + w[i + 2];
    if (i + 3 + laenge > ende) throw new Error('BOLT11-Feld reicht über das Ende');
    if (typ === FELD_X && laenge > 0 && laenge <= 10) dauer = wortZahl(w.slice(i + 3, i + 3 + laenge));
    i += 3 + laenge;
  }
  return wortZahl(w.slice(0, 7)) + dauer;
}

const sha256Hex = async (text) => [...new Uint8Array(await globalThis.crypto.subtle.digest('SHA-256', new TextEncoder().encode(text)))]
  .map((b) => b.toString(16).padStart(2, '0')).join('');

async function holeJson(f, url) {
  let r;
  try { r = await f(url, { headers: { accept: 'application/json' } }); }
  catch { throw new Error(`LNURL-Server nicht erreichbar (${new URL(url).host})`); }
  let daten = null;
  try { daten = await r.json(); } catch { /* kein JSON */ }
  if (daten?.status === 'ERROR') throw new Error(`LNURL-Server meldet: ${daten.reason ?? 'Fehler'}`);
  if (!r.ok || !daten || typeof daten !== 'object') throw new Error(`LNURL-Server antwortet mit HTTP ${r.status}`);
  return daten;
}

// Löst die Adresse auf: `{ callback, min, max, metadata }` (min/max in msat, wie vom Server;
// `metadata` als Text, wie geliefert)
export async function loeseAdresseAuf(adresse, { fetch: f = globalThis.fetch } = {}) {
  const d = await holeJson(f, adresseZuUrl(adresse));
  if (d.tag !== 'payRequest') throw new Error('Lightning-Adresse ist keine Zahlungsadresse (tag nicht payRequest)');
  if (typeof d.metadata !== 'string') throw new Error('LNURL-Server liefert kein metadata');
  const min = Number(d.minSendable), max = Number(d.maxSendable);
  if (!Number.isSafeInteger(min) || !Number.isSafeInteger(max) || min < 1 || max < min) throw new Error('LNURL-Server nennt keinen gültigen Mindest- und Höchstbetrag');
  let callback;
  try { callback = new URL(d.callback); } catch { throw new Error('LNURL-Server nennt keine gültige Callback-Adresse'); }
  if (callback.protocol !== 'https:') throw new Error('Callback-Adresse ist nicht https');
  return { callback: callback.href, min, max, metadata: d.metadata };
}

// Holt eine Rechnung über `sat` an die Adresse: `{ rechnung, msat, beschreibung }`. Wirft, wenn der
// Betrag außerhalb von Mindest- und Höchstbetrag liegt, die Rechnung über einen anderen Betrag lautet
// oder ihr `description_hash` nicht SHA-256 des `metadata` ist (LUD-06). Ohne `description_hash`
// (z. B. Wallet of Satoshi, die nur das Feld `d` setzt) gilt die Rechnung trotzdem, weil sie vom
// `callback` der aufgelösten Adresse kommt und der Betrag stimmt; `beschreibung` ist dann das Feld `d`
// (Klartext, sonst null), zum Anzeigen vor dem Bezahlen.
export async function rechnungFuerAdresse(adresse, sat, optionen = {}) {
  if (!Number.isSafeInteger(sat) || sat <= 0) throw new Error('Betrag muss eine positive ganze Zahl (sat) sein');
  const msat = sat * 1000;
  const { callback, min, max, metadata } = await loeseAdresseAuf(adresse, optionen);
  if (msat < min) throw new Error(`Betrag unter dem Mindestbetrag der Adresse (${Math.ceil(min / 1000)} sat)`);
  if (msat > max) throw new Error(`Betrag über dem Höchstbetrag der Adresse (${Math.floor(max / 1000)} sat)`);
  const url = new URL(callback);
  url.searchParams.set('amount', String(msat));
  const d = await holeJson(optionen.fetch ?? globalThis.fetch, url.href);
  if (typeof d.pr !== 'string') throw new Error('LNURL-Server liefert keine Rechnung');
  const betrag = bolt11Betrag(d.pr);
  if (betrag !== msat) throw new Error(`Rechnung lautet über ${betrag === null ? 'keinen Betrag' : `${betrag} msat`} statt ${msat} msat`);
  const hash = bolt11BeschreibungHash(d.pr);
  if (hash !== null && hash !== await sha256Hex(metadata)) throw new Error('description_hash der Rechnung passt nicht zum metadata der Adresse');
  return { rechnung: d.pr, msat, beschreibung: hash === null ? bolt11Beschreibung(d.pr) : null };
}
