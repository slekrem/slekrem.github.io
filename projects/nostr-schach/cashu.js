// Kleine Cashu-Wallet für Nostr-Schach (M3): Guthaben je Nostr-Schlüssel und Mint, Aufladen und
// Auszahlen per Lightning, Token empfangen und exportieren, Einsatz sperren, Antrag bauen, Freigabe
// einlösen und Rückholung nach der Sperrfrist. Spezifikation in docs/protokoll.md („Einsatz“ und
// „Wallet“).
//
// Ohne DOM: Die Seiten laden das Modul im Browser (Import-Map aus einstellungen.js), die Tests in
// Node (test/cashu.test.js gegen test/schein-mint.mjs). Jeder Netzzugriff geht über das übergebene
// `fetch` an die Mint-URL. Erlaubt sind nur Mints aus `EINSTELLUNGEN.MINTS`.
//
// Speicher: je Nostr-Schlüssel und Mint ein Eintrag `nostr-schach.wallet.<pubkey>.<mint-url>` (JSON),
// getrennt vom Spieler-Schlüssel. Alles, was eine laufende Zahlung braucht (Quote-ID, Secrets,
// Blinding-Faktoren, Inputs), steht dort, bevor die Anfrage an die Mint geht. Nach einem Neuladen
// setzt `fortsetzen()` (oder der nächste Aufruf derselben Sache) fort, ohne doppelt zu tauschen.
// Wer den Browser-Speicher löscht, verliert das Guthaben, außer es wurde vorher exportiert.
//
// Kein Schlüssel, Token oder Proof geht an console.log.

import { getPublicKey } from 'nostr-tools';
import {
  blindMessage, unblindSignature, pointFromHex, hashToCurve, hasValidDleq, getEncodedToken, getDecodedToken,
  getTokenMetadata, parseSecret, schnorrSignMessage, Amount,
} from '@cashu/cashu-ts';
import { erlaubteMints, pruefeEinsatz, anspruch, sigAllNachricht, SPERRFRIST } from './regeln.js';
import { rechnungFuerAdresse, bolt11Betrag, bolt11Ablauf } from './lnurl.js';

export const SPEICHER_PRAEFIX = 'nostr-schach.wallet.';
// NUTs, die eine Mint laut /v1/info können muss; NUT-09 (restore) braucht die Wallet, um nach einer
// verlorenen Antwort wiederherzustellen. NUT-04/05 (bolt11, sat) sind keine Pflicht: Fehlen sie oder
// sind sie abgeschaltet, gehen nur Aufladen bzw. Auszahlen nicht (`gesperrt` in pruefeMint).
const NUTS_PFLICHT = ['7', '9', '11', '12'];
// So viele exportierte Token merkt sich die Wallet (falls das Kopieren schiefgeht)
const EXPORTE_MERKEN = 20;

// Fehler der Wallet. `mint`: die Mint hat abgelehnt (endgültig). `unklar`: Netz weg oder Mint mit
// 5xx; der Vorgang bleibt gespeichert und `fortsetzen()` klärt ihn später.
export class WalletFehler extends Error {
  constructor(text, { code, mint = false, unklar = false } = {}) {
    super(text);
    this.name = 'WalletFehler';
    this.code = code;
    this.mint = mint;
    this.unklar = unklar;
  }
}

// Speicher über localStorage (Browser). Schnittstelle: lies(k) → Text oder null, schreibe(k, v), loesche(k).
export function localStorageSpeicher(ls = globalThis.localStorage) {
  return { lies: (k) => ls.getItem(k), schreibe: (k, v) => ls.setItem(k, v), loesche: (k) => ls.removeItem(k) };
}
// Speicher im Arbeitsspeicher (Tests); mehrere Wallets mit demselben Objekt teilen sich den Speicher
export function ramSpeicher() {
  const m = new Map();
  return { lies: (k) => (m.has(k) ? m.get(k) : null), schreibe: (k, v) => m.set(k, String(v)), loesche: (k) => m.delete(k), daten: m };
}

const ohneSchraegstrich = (url) => (typeof url === 'string' ? url.trim().replace(/\/+$/, '') : '');
// Mint-URL prüfen: nur aus der Liste (ohne Schrägstrich am Ende verglichen)
export function erlaubteMint(url) {
  const u = ohneSchraegstrich(url);
  if (!erlaubteMints().includes(u)) throw new WalletFehler(`Mint nicht in der Liste (EINSTELLUNGEN.MINTS): ${u || '(leer)'}`);
  return u;
}

const hexAus = (bytes) => Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
const zufallHex = (n = 32) => hexAus(globalThis.crypto.getRandomValues(new Uint8Array(n)));
const bytes = (s) => new TextEncoder().encode(s);
const zahl = (a) => Number(Amount.from(a).toBigInt());
const yVon = (secret) => hashToCurve(bytes(secret)).toHex(true);
const summe = (ps) => ps.reduce((s, p) => s + p.amount, 0);
const nurProof = ({ id, amount, secret, C }) => ({ id, amount, secret, C });
const blinded = ({ amount, id, B_ }) => ({ amount, id, B_ });
const p2pk = (pk) => '02' + pk;

// Schnorr-Signatur (BIP-340, hex) über SHA-256 der Nachricht mit einem Nostr-Schlüssel (Uint8Array),
// wie NUT-11 es verlangt. Damit signieren die Wallet (eigener Anteil) und die Schiri-Seite (`freigabe`).
export const signiereNachricht = (nachricht, sk) => schnorrSignMessage(nachricht, sk);

// Betrag in Stückelungen des Keysets zerlegen (größte zuerst)
function zerlege(betrag, ks) {
  const werte = Object.keys(ks.keys).map(Number).filter((w) => Number.isSafeInteger(w) && w > 0).sort((a, b) => b - a);
  const teile = [];
  for (const w of werte) while (betrag >= w) { teile.push(w); betrag -= w; }
  if (betrag !== 0) throw new WalletFehler('Betrag lässt sich mit den Schlüsseln der Mint nicht darstellen');
  return teile;
}

export class CashuWallet {
  // `sk`: Nostr-Schlüssel (Uint8Array), zum Signieren nötig. Mit NIP-07-Erweiterung nur `pubkey`
  // (hex); dann geht alles außer Einlösen und Rückholung. `speicher`: siehe localStorageSpeicher.
  constructor({ sk = null, pubkey = null, speicher = null, fetch = null } = {}) {
    if (sk && pubkey && getPublicKey(sk) !== pubkey) throw new WalletFehler('pubkey passt nicht zum Schlüssel');
    this.pubkey = sk ? getPublicKey(sk) : pubkey;
    if (!/^[0-9a-f]{64}$/.test(this.pubkey ?? '')) throw new WalletFehler('Kein Nostr-Schlüssel für die Wallet');
    this._sk = sk;
    this._speicher = speicher ?? localStorageSpeicher();
    this._fetch = fetch ?? ((...a) => globalThis.fetch(...a));
    this._mints = new Map();   // url → { url, info, keysets, ids } (Cache)
    this._sperren = new Map(); // url → Promise (eine Aktion je Mint zur Zeit)
  }

  // --- Signieren -----------------------------------------------------------------------------
  // Schnorr (BIP-340) über SHA-256 der Nachricht mit dem Nostr-Schlüssel; die Mint prüft gegen
  // `02` + x-Koordinate. Mit NIP-07-Erweiterung gibt es keinen Schlüssel in der Seite.
  signiere(nachricht) {
    if (!this._sk) throw new WalletFehler('Signieren für Cashu geht nur mit einem Schlüssel in diesem Browser, nicht mit einer NIP-07-Erweiterung');
    return signiereNachricht(nachricht, this._sk);
  }

  // --- Mint ----------------------------------------------------------------------------------
  async _anfrage(url, pfad, body) {
    const f = this._fetch;
    let r;
    try {
      r = await f(url + pfad, body === undefined ? { headers: { accept: 'application/json' } }
        : { method: 'POST', headers: { 'content-type': 'application/json', accept: 'application/json' }, body: JSON.stringify(body) });
    } catch {
      throw new WalletFehler(`Mint nicht erreichbar (${url})`, { unklar: true });
    }
    let d = null;
    try { d = await r.json(); } catch { /* kein JSON */ }
    if (r.ok && d && typeof d === 'object') return d;
    if (r.status >= 400 && r.status < 500) {
      throw new WalletFehler(`Mint lehnt ab: ${typeof d?.detail === 'string' ? d.detail : `HTTP ${r.status}`}`, { code: d?.code, mint: true });
    }
    throw new WalletFehler(`Mint antwortet mit HTTP ${r.status}`, { unklar: true });
  }

  // Lädt /v1/info, /v1/keysets und /v1/keys und prüft, ob die Mint kann, was die Wallet braucht.
  // Ergebnis (mit Cache): `{ url, name, info, keysets, gesperrt }`, `keysets` im Format der
  // Prüffunktionen aus regeln.js: `[{ id, unit: 'sat', active, input_fee_ppk, keys }]` (nur Keysets
  // mit Schlüsseln). `gesperrt`: `{ aufladen, auszahlen }`, je null oder der Grund, warum das gerade
  // nicht geht (NUT-04/05 abgeschaltet oder ohne bolt11/sat); alles andere geht dann trotzdem.
  async pruefeMint(url, { neu = false } = {}) {
    url = erlaubteMint(url);
    if (!neu && this._mints.has(url)) return this._oeffentlich(this._mints.get(url));
    const info = await this._anfrage(url, '/v1/info');
    const nuts = info?.nuts ?? {};
    const lightning = (n, was) => {
      const nut = nuts[n];
      const bolt11 = Array.isArray(nut?.methods) && nut.methods.some((x) => x?.method === 'bolt11' && x?.unit === 'sat');
      if (!nut || !bolt11) return `${was} per Lightning (bolt11, sat) nicht angeboten`;
      return nut.disabled ? `${was} derzeit abgeschaltet` : null;
    };
    const gesperrt = { aufladen: lightning('4', 'Aufladen'), auszahlen: lightning('5', 'Auszahlen') };
    const fehlt = [];
    for (const n of NUTS_PFLICHT) if (nuts[n]?.supported !== true) fehlt.push(`NUT-${n.padStart(2, '0')}`);
    if (fehlt.length) throw new WalletFehler(`Mint kann nicht alles, was die Wallet braucht: ${fehlt.join(', ')}`);
    const { keysets: alle } = await this._anfrage(url, '/v1/keysets');
    if (!Array.isArray(alle)) throw new WalletFehler('Mint liefert keine Keysets');
    const { keysets: aktiv } = await this._anfrage(url, '/v1/keys');
    const keysets = alle.filter((k) => k?.unit === 'sat' && typeof k.id === 'string').map((k) => ({
      id: k.id, unit: 'sat', active: k.active !== false, input_fee_ppk: Number(k.input_fee_ppk ?? 0),
      keys: (Array.isArray(aktiv) ? aktiv : []).find((a) => a?.id === k.id)?.keys ?? null,
    }));
    if (!keysets.some((k) => k.active && k.keys)) throw new WalletFehler('Mint hat kein aktives Keyset für sat');
    const m = { url, info, keysets, ids: alle.map((k) => k.id), gesperrt };
    this._mints.set(url, m);
    return this._oeffentlich(m);
  }
  _oeffentlich(m) {
    return { url: m.url, name: m.info?.name ?? m.url, info: m.info, keysets: m.keysets.filter((k) => k.keys), gesperrt: { ...m.gesperrt } };
  }
  async _mint(url) { await this.pruefeMint(url); return this._mints.get(erlaubteMint(url)); }
  // Mint für Aufladen bzw. Auszahlen (`was`: 'aufladen' | 'auszahlen'). Sagt der Cache, dass es
  // gerade nicht geht, wird /v1/info noch einmal geladen (die Mint kann es wieder eingeschaltet haben).
  async _mintFuer(url, was) {
    let m = await this._mint(url);
    if (m.gesperrt[was]) { await this.pruefeMint(url, { neu: true }); m = this._mints.get(m.url); }
    if (m.gesperrt[was]) throw new WalletFehler(`Bei dieser Mint gerade nicht möglich: ${m.gesperrt[was]}`, { mint: true });
    return m;
  }

  // Keyset mit Schlüsseln (lädt die Schlüssel eines älteren Keysets bei Bedarf nach)
  async _keyset(m, id) {
    const ks = m.keysets.find((k) => k.id === id);
    if (!ks) throw new WalletFehler(`Keyset ${id} gehört nicht zur Mint (oder ist nicht sat)`);
    if (!ks.keys) {
      const { keysets } = await this._anfrage(m.url, `/v1/keys/${id}`);
      ks.keys = keysets?.find((k) => k?.id === id)?.keys ?? null;
      if (!ks.keys) throw new WalletFehler(`Mint liefert keine Schlüssel für Keyset ${id}`);
    }
    return ks;
  }
  // Aktives Keyset für neue Outputs: das mit der kleinsten Gebühr
  _aktiv(m) {
    return m.keysets.filter((k) => k.active && k.keys).sort((a, b) => a.input_fee_ppk - b.input_fee_ppk)[0];
  }
  // Gebühr der Mint für einen Tausch dieser Inputs (NUT-02): ⌈Σ input_fee_ppk / 1000⌉
  _gebuehr(m, proofs) {
    const ppk = proofs.reduce((s, p) => s + (m.keysets.find((k) => k.id === p.id)?.input_fee_ppk ?? 0), 0);
    return Math.ceil(ppk / 1000);
  }

  // --- Speicher ------------------------------------------------------------------------------
  _schluessel(url) { return `${SPEICHER_PRAEFIX}${this.pubkey}.${url}`; }
  _lade(url) {
    let d = {};
    const text = this._speicher.lies(this._schluessel(url));
    if (text) { try { d = JSON.parse(text); } catch { throw new WalletFehler('Wallet-Speicher ist beschädigt'); } }
    return { proofs: [], offen: [], einsaetze: {}, antraege: [], exporte: [], ...d };
  }
  _speichere(url, d) { this._speicher.schreibe(this._schluessel(url), JSON.stringify(d)); }
  // Eine Aktion je Mint zur Zeit (sonst könnten zwei Aufrufe dieselben Proofs wählen)
  _exklusiv(url, f) {
    const vorher = this._sperren.get(url) ?? Promise.resolve();
    const lauf = vorher.then(() => f(this._lade(url)));
    this._sperren.set(url, lauf.catch(() => {}));
    return lauf;
  }

  // --- Outputs ---------------------------------------------------------------------------------
  // Neue Outputs mit Secret und Blinding-Faktor (zum Speichern vor der Anfrage). `ziel` sagt, wohin
  // der Proof nach dem Entblinden gehört: 'guthaben', 'export' oder 'einsatz'.
  _ausgaben(ks, betraege, ziel, secret = () => zufallHex(32)) {
    return betraege.map((amount) => {
      const s = secret();
      const bm = blindMessage(bytes(s));
      return { amount, id: ks.id, B_: bm.B_.toHex(true), secret: s, r: bm.r.toString(16).padStart(64, '0'), ziel };
    });
  }
  // Leere Outputs für das Wechselgeld beim Melt (NUT-08): so viele, wie Zweierpotenzen in `bis` passen
  _leereAusgaben(ks, bis) {
    const n = Math.max(1, Math.ceil(Math.log2(bis + 1)));
    return this._ausgaben(ks, Array(n).fill(1), 'guthaben').map((o) => ({ ...o, leer: true }));
  }
  // Signaturen der Mint entblinden und (falls vorhanden, bei `dleqPflicht` immer) per DLEQ prüfen
  async _entblinde(m, ausgaben, signaturen) {
    if (!Array.isArray(signaturen) || signaturen.length < ausgaben.filter((o) => !o.leer).length) throw new WalletFehler('Mint liefert zu wenige Signaturen');
    const proofs = [];
    for (let i = 0; i < signaturen.length && i < ausgaben.length; i++) {
      const o = ausgaben[i], s = signaturen[i];
      const amount = zahl(s.amount);
      if (s.id !== o.id || (!o.leer && amount !== o.amount)) throw new WalletFehler('Signatur der Mint passt nicht zum Output');
      const ks = await this._keyset(m, o.id);
      const A = ks.keys[String(amount)];
      if (!A) throw new WalletFehler(`Mint signiert einen Betrag ohne Schlüssel (${amount})`);
      const C = unblindSignature(pointFromHex(s.C_), BigInt('0x' + o.r), pointFromHex(A)).toHex(true);
      const proof = { id: o.id, amount, secret: o.secret, C };
      if (s.dleq?.e && s.dleq?.s) proof.dleq = { e: s.dleq.e, s: s.dleq.s, r: o.r };
      if (o.ziel === 'einsatz' && !proof.dleq) throw new WalletFehler('Mint liefert keinen DLEQ-Nachweis (NUT-12)');
      if (proof.dleq && !hasValidDleq(proof, ks)) throw new WalletFehler('DLEQ-Nachweis der Mint ist falsch');
      proofs.push({ ...proof, ziel: o.ziel });
    }
    return proofs;
  }

  // Zustand von Proofs bei der Mint (NUT-07): je Proof 'UNSPENT', 'PENDING' oder 'SPENT'
  async _zustaende(m, proofs) { return this._zustaendeY(m, proofs.map((p) => yVon(p.secret))); }
  async _zustaendeY(m, alleYs) {
    const ergebnis = [];
    for (let i = 0; i < alleYs.length; i += 100) {
      const ys = alleYs.slice(i, i + 100);
      const { states } = await this._anfrage(m.url, '/v1/checkstate', { Ys: ys });
      const nach = new Map((Array.isArray(states) ? states : []).map((s) => [s?.Y, s?.state]));
      for (const y of ys) {
        const s = nach.get(y);
        if (!['UNSPENT', 'PENDING', 'SPENT'].includes(s)) throw new WalletFehler('Mint liefert keinen Zustand der Proofs (NUT-07)', { unklar: true });
        ergebnis.push(s);
      }
    }
    return ergebnis;
  }
  // Signaturen zu schon eingereichten Outputs wiederholen (NUT-09). Ergebnis: Signaturen in der
  // Reihenfolge der Outputs, oder null, wenn die Mint nicht alle kennt.
  async _wiederhole(m, ausgaben) {
    let r;
    try { r = await this._anfrage(m.url, '/v1/restore', { outputs: ausgaben.map(blinded) }); }
    catch (e) { if (e.unklar) throw e; return null; } // Mint ohne NUT-09
    const outs = Array.isArray(r.outputs) ? r.outputs : [];
    const sigs = Array.isArray(r.signatures) ? r.signatures : Array.isArray(r.promises) ? r.promises : [];
    const nach = new Map(outs.map((o, i) => [o?.B_, sigs[i]]));
    const ergebnis = ausgaben.map((o) => nach.get(o.B_));
    if (ausgaben.some((o) => o.leer)) { // Wechselgeld: nur die ersten, die die Mint gefüllt hat
      const n = ergebnis.findIndex((s) => !s);
      return n === -1 ? ergebnis : ergebnis.slice(0, n);
    }
    return ergebnis.every(Boolean) ? ergebnis : null;
  }

  // Neue Proofs verbuchen: 'guthaben' ins Guthaben, 'einsatz' in d.einsaetze[v.g], 'export' als
  // Token in d.exporte. Gibt die Proofs nach Ziel zurück.
  _verbuche(d, v, proofs, m) {
    const nach = { guthaben: [], export: [], einsatz: [] };
    for (const { ziel, ...p } of proofs) nach[ziel].push(p);
    d.proofs.push(...nach.guthaben);
    if (nach.einsatz.length) {
      d.einsaetze[v.g] = { token: getEncodedToken({ mint: m.url, unit: 'sat', proofs: nach.einsatz }), proofs: nach.einsatz,
        betrag: summe(nach.einsatz), locktime: v.locktime, erstellt: Math.floor(Date.now() / 1000) };
    }
    if (nach.export.length) {
      v.token = getEncodedToken({ mint: m.url, unit: 'sat', proofs: nach.export });
      d.exporte = [...d.exporte, { zeit: Math.floor(Date.now() / 1000), betrag: summe(nach.export), token: v.token }].slice(-EXPORTE_MERKEN);
    }
    if (v.antrag) {
      const a = d.antraege.find((x) => x.id === v.antrag);
      if (a) a.eingeloest = true;
    }
    if (v.rueckholung) d.einsaetze[v.rueckholung].zurueck = true;
    d.offen = d.offen.filter((x) => x.id !== v.id);
    return nach;
  }

  // --- Tausch (NUT-03) mit gespeichertem Vorgang -------------------------------------------------
  // `v`: { id, art: 'tausch', inputs, ausgaben, eigeneInputs, … }. Eigene Inputs verlassen das
  // Guthaben, bevor die Anfrage rausgeht; lehnt die Mint ab, kommen unausgegebene zurück.
  async _tausche(m, d, v) {
    if (v.eigeneInputs) {
      const weg = new Set(v.inputs.map((p) => p.secret));
      d.proofs = d.proofs.filter((p) => !weg.has(p.secret));
    }
    d.offen.push(v);
    this._speichere(m.url, d);
    return this._tauschEinreichen(m, d, v);
  }
  async _tauschEinreichen(m, d, v) {
    let sigs;
    try {
      ({ signatures: sigs } = await this._anfrage(m.url, '/v1/swap', { inputs: v.inputs, outputs: v.ausgaben.map(blinded) }));
    } catch (e) {
      if (e.unklar) throw e; // Vorgang bleibt gespeichert
      return this._nachAblehnung(m, d, v, e);
    }
    const nach = this._verbuche(d, v, await this._entblinde(m, v.ausgaben, sigs), m);
    this._speichere(m.url, d);
    return nach;
  }
  // Die Mint lehnt ab oder die Inputs sind schon ausgegeben: Waren es unsere Outputs (Antwort
  // verloren), holen wir die Signaturen (NUT-09). Sonst geben wir unausgegebene eigene Inputs zurück
  // ins Guthaben und verwerfen den Vorgang.
  async _nachAblehnung(m, d, v, fehler) {
    const sigs = await this._wiederhole(m, v.ausgaben);
    if (sigs) {
      const nach = this._verbuche(d, v, await this._entblinde(m, v.ausgaben, sigs), m);
      this._speichere(m.url, d);
      return nach;
    }
    if (v.eigeneInputs) {
      const z = await this._zustaende(m, v.inputs);
      d.proofs.push(...v.inputs.filter((_, i) => z[i] === 'UNSPENT').map(nurProof));
    }
    d.offen = d.offen.filter((x) => x.id !== v.id);
    this._speichere(m.url, d);
    throw fehler;
  }
  // Nach einem Neuladen: Sind die Inputs schon ausgegeben (NUT-07), holen wir die Signaturen zu den
  // gespeicherten Outputs, statt neu zu tauschen. Sind sie unausgegeben, reichen wir denselben
  // Tausch (dieselben Outputs) noch einmal ein.
  async _tauschKlaeren(m, d, v) {
    const z = await this._zustaende(m, v.inputs);
    if (z.every((s) => s === 'UNSPENT')) return this._tauschEinreichen(m, d, v);
    if (z.some((s) => s === 'PENDING')) throw new WalletFehler('Mint meldet die Proofs als in Bearbeitung', { unklar: true });
    return this._nachAblehnung(m, d, v, new WalletFehler('Die Proofs wurden schon anderweitig ausgegeben', { mint: true }));
  }

  // Proofs für `ziel` Sat wählen (nach Abzug der Gebühr ihres Tauschs), größte zuerst
  _waehle(m, proofs, ziel) {
    const wahl = [];
    let s = 0;
    for (const p of [...proofs].sort((a, b) => b.amount - a.amount)) {
      if (s - this._gebuehr(m, wahl) >= ziel) break;
      wahl.push(p);
      s += p.amount;
    }
    const netto = s - this._gebuehr(m, wahl);
    if (netto < ziel) throw new WalletFehler(`Guthaben reicht nicht: ${ziel} sat nötig, verfügbar ${Math.max(0, netto)} sat (nach Gebühr)`);
    return wahl;
  }
  // Proofs, die zusammen genau `betrag` ergeben (größte zuerst), sonst null
  _genau(proofs, betrag) {
    const wahl = [];
    for (const p of [...proofs].sort((a, b) => b.amount - a.amount)) if (p.amount <= betrag) { wahl.push(p); betrag -= p.amount; }
    return betrag === 0 ? wahl : null;
  }

  // --- Guthaben --------------------------------------------------------------------------------
  // Guthaben bei einer Mint (Summe der gespeicherten Proofs, ohne Netz)
  guthaben(url) { return summe(this._lade(erlaubteMint(url)).proofs); }
  // Guthaben je Mint aus der Liste: { <url>: sat }
  guthabenAlle() { return Object.fromEntries(erlaubteMints().map((u) => [u, this.guthaben(u)])); }
  // Zustand fremder Proofs bei der Mint (NUT-07) über ihre `Y` (z. B. aus pruefeEinsatz): je Y
  // 'UNSPENT', 'PENDING' oder 'SPENT', in derselben Reihenfolge. Ohne Speicher und ohne Schlüssel
  // nutzbar (Schiri-Seite).
  async pruefeZustaende(url, ys) {
    const m = await this._mint(url);
    return this._zustaendeY(m, ys);
  }
  // Prüft alle Proofs bei der Mint (NUT-07), räumt ausgegebene auf und gibt das Guthaben zurück
  async pruefeGuthaben(url) {
    const m = await this._mint(url);
    return this._exklusiv(m.url, async (d) => {
      const z = await this._zustaende(m, d.proofs);
      const weg = new Set(d.proofs.filter((_, i) => z[i] === 'SPENT').map((p) => p.secret));
      if (weg.size) { d.proofs = d.proofs.filter((p) => !weg.has(p.secret)); this._speichere(m.url, d); }
      return { guthaben: summe(d.proofs), entfernt: weg.size };
    });
  }

  // --- Token empfangen und exportieren -------------------------------------------------------------
  // Tauscht einen eingefügten cashuA…/cashuB…-Token sofort bei seiner Mint (NUT-03), damit der
  // Absender ihn nicht noch einmal ausgeben kann. Ergebnis: { mint, betrag, gebuehr }.
  async empfange(token) {
    const text = typeof token === 'string' ? token.trim().replace(/^cashu:/, '') : '';
    let meta;
    try { meta = getTokenMetadata(text); } catch { throw new WalletFehler('Kein lesbarer Cashu-Token'); }
    const m = await this._mint(meta.mint);
    if ((meta.unit ?? 'sat') !== 'sat') throw new WalletFehler('Token ist nicht in sat');
    let t;
    try { t = getDecodedToken(text, m.ids); } catch { throw new WalletFehler('Token nicht lesbar oder Keyset der Mint unbekannt'); }
    const inputs = t.proofs.map((p) => ({ id: p.id, amount: zahl(p.amount), secret: p.secret, C: p.C }));
    if (!inputs.length) throw new WalletFehler('Token ohne Proofs');
    for (const p of inputs) {
      await this._keyset(m, p.id);
      let s = null;
      try { s = parseSecret(p.secret); } catch { /* einfaches Secret */ }
      if (s) throw new WalletFehler('Gesperrter Token (NUT-10/11) lässt sich hier nicht empfangen');
    }
    const gebuehr = this._gebuehr(m, inputs), betrag = summe(inputs) - gebuehr;
    if (betrag <= 0) throw new WalletFehler('Token deckt die Gebühr der Mint nicht');
    return this._exklusiv(m.url, async (d) => {
      const v = { id: zufallHex(16), art: 'tausch', zweck: 'empfang', eigeneInputs: false, inputs,
        ausgaben: this._ausgaben(this._aktiv(m), zerlege(betrag, this._aktiv(m)), 'guthaben') };
      await this._tausche(m, d, v);
      return { mint: m.url, betrag, gebuehr };
    });
  }

  // Gibt `betrag` Sat als cashuB…-Token aus (für eine andere Wallet) und nimmt die Proofs aus dem
  // Guthaben. Passt kein Satz Proofs genau, wird vorher getauscht (Gebühr trägt das Guthaben).
  async exportiere(url, betrag) {
    if (!Number.isSafeInteger(betrag) || betrag <= 0) throw new WalletFehler('Betrag muss eine positive ganze Zahl (sat) sein');
    const m = await this._mint(url);
    return this._exklusiv(m.url, async (d) => {
      const genau = this._genau(d.proofs, betrag);
      if (genau) {
        const weg = new Set(genau.map((p) => p.secret));
        const token = getEncodedToken({ mint: m.url, unit: 'sat', proofs: genau });
        d.proofs = d.proofs.filter((p) => !weg.has(p.secret));
        d.exporte = [...d.exporte, { zeit: Math.floor(Date.now() / 1000), betrag, token }].slice(-EXPORTE_MERKEN);
        this._speichere(m.url, d);
        return token;
      }
      const ks = this._aktiv(m);
      const inputs = this._waehle(m, d.proofs, betrag).map(nurProof);
      const rest = summe(inputs) - this._gebuehr(m, inputs) - betrag;
      const v = { id: zufallHex(16), art: 'tausch', zweck: 'export', eigeneInputs: true, inputs,
        ausgaben: [...this._ausgaben(ks, zerlege(betrag, ks), 'export'), ...this._ausgaben(ks, zerlege(rest, ks), 'guthaben')] };
      await this._tausche(m, d, v);
      return v.token;
    });
  }
  // Zuletzt exportierte Token (falls das Kopieren schiefging), neueste zuletzt
  exporte(url) { return this._lade(erlaubteMint(url)).exporte; }
  // Exportierte Token, die bei der Mint noch nicht (ganz) ausgegeben sind (NUT-07), neueste zuletzt
  async offeneExporte(url) {
    const m = await this._mint(url);
    const liste = this._lade(m.url).exporte.map((x) => {
      try { return { ...x, proofs: getDecodedToken(x.token, m.ids).proofs }; } catch { return null; }
    }).filter((x) => x?.proofs.length);
    const z = await this._zustaende(m, liste.flatMap((x) => x.proofs));
    let i = 0;
    return liste.filter((x) => { const s = z.slice(i, i += x.proofs.length); return s.some((st) => st !== 'SPENT'); })
      .map(({ zeit, betrag, token }) => ({ zeit, betrag, token }));
  }
  // Backup: das ganze Guthaben je Mint als cashuB…-Token, ohne es aus der Wallet zu nehmen.
  // Ergebnis: [{ mint, betrag, token }] für jede Mint mit Guthaben.
  exportiereAlles() {
    return erlaubteMints().map((url) => {
      const { proofs } = this._lade(url);
      return proofs.length ? { mint: url, betrag: summe(proofs), token: getEncodedToken({ mint: url, unit: 'sat', proofs }) } : null;
    }).filter(Boolean);
  }

  // --- Aufladen per Lightning (NUT-04) --------------------------------------------------------------
  // Legt eine Mint-Quote an und gibt die Rechnung zurück: { quote, rechnung, betrag, ablauf, erstellt }.
  // `ablauf` (Unix-Sekunden): das frühere aus `expiry` der Quote und dem Ablauf der BOLT11-Rechnung.
  // Die Quote steht im Speicher und übersteht ein Neuladen (offeneAufladungen, fortsetzen).
  async aufladen(url, betrag) {
    if (!Number.isSafeInteger(betrag) || betrag <= 0) throw new WalletFehler('Betrag muss eine positive ganze Zahl (sat) sein');
    const m = await this._mintFuer(url, 'aufladen');
    return this._exklusiv(m.url, async (d) => {
      const q = await this._anfrage(m.url, '/v1/mint/quote/bolt11', { amount: betrag, unit: 'sat' });
      if (typeof q.quote !== 'string' || typeof q.request !== 'string') throw new WalletFehler('Mint liefert keine Rechnung');
      let ablauf = Number.isSafeInteger(q.expiry) && q.expiry > 0 ? q.expiry : null;
      try { const b = bolt11Ablauf(q.request); if (ablauf === null || b < ablauf) ablauf = b; } catch { /* Rechnung nicht lesbar: nur expiry */ }
      const v = { id: zufallHex(16), art: 'aufladen', quote: q.quote, betrag, rechnung: q.request, ablauf,
        erstellt: Math.floor(Date.now() / 1000), ausgaben: null };
      d.offen.push(v);
      this._speichere(m.url, d);
      return { quote: v.quote, rechnung: v.rechnung, betrag, ablauf: v.ablauf, erstellt: v.erstellt };
    });
  }
  // Offene Aufladungen einer Mint: [{ quote, rechnung, betrag, ablauf, erstellt }] (`erstellt` fehlt bei älteren)
  offeneAufladungen(url) {
    return this._lade(erlaubteMint(url)).offen.filter((v) => v.art === 'aufladen')
      .map(({ quote, rechnung, betrag, ablauf, erstellt }) => ({ quote, rechnung, betrag, ablauf: ablauf ?? null, erstellt: erstellt ?? null }));
  }
  // Fragt den Stand der Quote ab; ist sie bezahlt, werden die Proofs geprägt (die Outputs stehen
  // vorher im Speicher). Ergebnis: { status: 'offen' | 'gutgeschrieben' | 'abgelaufen', betrag }.
  async pruefeAufladung(url, quote) {
    const m = await this._mint(url);
    return this._exklusiv(m.url, async (d) => {
      const v = d.offen.find((x) => x.art === 'aufladen' && x.quote === quote);
      if (!v) throw new WalletFehler('Keine offene Aufladung mit dieser Quote');
      return this._aufladungAbschliessen(m, d, v);
    });
  }
  async _aufladungAbschliessen(m, d, v) {
    const q = await this._anfrage(m.url, `/v1/mint/quote/bolt11/${encodeURIComponent(v.quote)}`);
    const weg = () => { d.offen = d.offen.filter((x) => x.id !== v.id); this._speichere(m.url, d); };
    if (q.state === 'UNPAID') {
      if (v.ablauf && Date.now() / 1000 > v.ablauf) { weg(); return { status: 'abgelaufen', betrag: v.betrag }; }
      return { status: 'offen', betrag: v.betrag };
    }
    if (q.state !== 'PAID' && q.state !== 'ISSUED') return { status: 'offen', betrag: v.betrag };
    let sigs = null;
    if (q.state === 'ISSUED') {
      sigs = v.ausgaben ? await this._wiederhole(m, v.ausgaben) : null;
      if (!sigs) { weg(); throw new WalletFehler('Quote wurde schon eingelöst, die Proofs sind nicht in dieser Wallet', { mint: true }); }
    } else {
      if (!v.ausgaben) {
        const ks = this._aktiv(m);
        v.ausgaben = this._ausgaben(ks, zerlege(v.betrag, ks), 'guthaben');
        this._speichere(m.url, d); // vor der Anfrage
      }
      try {
        ({ signatures: sigs } = await this._anfrage(m.url, '/v1/mint/bolt11', { quote: v.quote, outputs: v.ausgaben.map(blinded) }));
      } catch (e) {
        if (e.unklar) throw e;
        sigs = await this._wiederhole(m, v.ausgaben); // schon geprägt, Antwort verloren?
        if (!sigs) throw e;
      }
    }
    this._verbuche(d, v, await this._entblinde(m, v.ausgaben, sigs), m);
    this._speichere(m.url, d);
    return { status: 'gutgeschrieben', betrag: v.betrag };
  }
  // Fragt alle `intervall` ms nach, bis die Rechnung bezahlt (oder abgelaufen) ist
  async warteAufAufladung(url, quote, { intervall = 3000, signal } = {}) {
    for (;;) {
      const r = await this.pruefeAufladung(url, quote);
      if (r.status !== 'offen') return r;
      if (signal?.aborted) return r;
      await new Promise((ok) => setTimeout(ok, intervall));
    }
  }

  // --- Auszahlen per Lightning (NUT-05) -------------------------------------------------------------
  // Holt eine Melt-Quote für eine BOLT11-Rechnung oder (mit `adresse` und `betrag`) für eine
  // Lightning-Adresse (lnurl.js). Ergebnis zum Anzeigen vor dem Bezahlen:
  // { quote, rechnung, betrag, gebuehr (fee_reserve), inputGebuehr, gesamt, ablauf, beschreibung }.
  // `beschreibung`: Feld `d` einer Rechnung von einer Lightning-Adresse ohne description_hash, sonst null.
  async auszahlungVorbereiten(url, { rechnung, adresse, betrag } = {}) {
    const m = await this._mintFuer(url, 'auszahlen');
    let beschreibung = null;
    if (adresse) ({ rechnung, beschreibung } = await rechnungFuerAdresse(adresse, betrag, { fetch: this._fetch }));
    let msat;
    try { msat = bolt11Betrag(rechnung); } catch (e) { throw new WalletFehler(e.message); }
    if (msat === null) throw new WalletFehler('Rechnung ohne Betrag');
    if (betrag !== undefined && msat !== betrag * 1000) throw new WalletFehler(`Rechnung lautet über ${msat} msat statt ${betrag * 1000} msat`);
    const q = await this._anfrage(m.url, '/v1/melt/quote/bolt11', { request: rechnung, unit: 'sat' });
    const sat = zahl(q.amount), reserve = zahl(q.fee_reserve ?? 0);
    if (sat !== Math.ceil(msat / 1000)) throw new WalletFehler(`Mint nennt ${sat} sat, die Rechnung lautet über ${msat} msat`);
    const proofs = this._lade(m.url).proofs;
    let inputGebuehr = 0;
    try { inputGebuehr = this._gebuehr(m, this._waehle(m, proofs, sat + reserve)); } catch { /* reicht nicht; zeigt auszahlen */ }
    return { quote: q.quote, rechnung, betrag: sat, gebuehr: reserve, inputGebuehr, gesamt: sat + reserve + inputGebuehr, ablauf: q.expiry ?? null, beschreibung };
  }
  // Bezahlt eine vorbereitete Auszahlung und nimmt das Wechselgeld zurück (NUT-08). Ergebnis:
  // { status: 'bezahlt', betrag, gebuehr (tatsächlich), wechselgeld, preimage } oder
  // { status: 'ausstehend' } (Mint bezahlt noch; fortsetzen() klärt später).
  async auszahlen(url, vorbereitung) {
    const m = await this._mintFuer(url, 'auszahlen');
    return this._exklusiv(m.url, async (d) => {
      if (d.offen.some((x) => x.art === 'auszahlen' && x.quote === vorbereitung.quote)) throw new WalletFehler('Diese Auszahlung läuft schon');
      const ks = this._aktiv(m);
      const inputs = this._waehle(m, d.proofs, vorbereitung.betrag + vorbereitung.gebuehr).map(nurProof);
      const ueber = summe(inputs) - this._gebuehr(m, inputs) - vorbereitung.betrag;
      const v = { id: zufallHex(16), art: 'auszahlen', quote: vorbereitung.quote, betrag: vorbereitung.betrag, inputs,
        ausgaben: this._leereAusgaben(ks, ueber), ablauf: vorbereitung.ablauf ?? null };
      const weg = new Set(inputs.map((p) => p.secret));
      d.proofs = d.proofs.filter((p) => !weg.has(p.secret));
      d.offen.push(v);
      this._speichere(m.url, d); // vor der Anfrage
      return this._auszahlungEinreichen(m, d, v);
    });
  }
  async _auszahlungEinreichen(m, d, v) {
    let q;
    try {
      q = await this._anfrage(m.url, '/v1/melt/bolt11', { quote: v.quote, inputs: v.inputs, outputs: v.ausgaben.map(blinded) });
    } catch (e) {
      if (e.unklar) throw e;
      // Abgelehnt: War sie schon bezahlt (Antwort verloren)? Sonst Inputs zurück.
      const stand = await this._anfrage(m.url, `/v1/melt/quote/bolt11/${encodeURIComponent(v.quote)}`).catch(() => null);
      if (stand?.state === 'PAID') return this._auszahlungVerbuchen(m, d, v, stand);
      if (stand?.state === 'PENDING') return { status: 'ausstehend' };
      const z = await this._zustaende(m, v.inputs);
      d.proofs.push(...v.inputs.filter((_, i) => z[i] === 'UNSPENT'));
      d.offen = d.offen.filter((x) => x.id !== v.id);
      this._speichere(m.url, d);
      throw e;
    }
    if (q.state === 'PAID') return this._auszahlungVerbuchen(m, d, v, q);
    if (q.state === 'PENDING') return { status: 'ausstehend' };
    return this._auszahlungKlaeren(m, d, v);
  }
  async _auszahlungVerbuchen(m, d, v, q) {
    let change = Array.isArray(q.change) ? q.change : null;
    if (!change) change = (await this._wiederhole(m, v.ausgaben)) ?? [];
    const proofs = await this._entblinde(m, v.ausgaben.slice(0, change.length), change);
    this._verbuche(d, v, proofs, m);
    this._speichere(m.url, d);
    const wechselgeld = summe(proofs);
    return { status: 'bezahlt', betrag: v.betrag, gebuehr: summe(v.inputs) - v.betrag - wechselgeld, wechselgeld,
      preimage: q.payment_preimage ?? null };
  }
  // Nach einem Neuladen oder bei unklarem Stand: Quote abfragen und je nach Stand verbuchen,
  // erneut einreichen oder die Inputs zurück ins Guthaben nehmen
  async _auszahlungKlaeren(m, d, v) {
    const q = await this._anfrage(m.url, `/v1/melt/quote/bolt11/${encodeURIComponent(v.quote)}`);
    if (q.state === 'PAID') return this._auszahlungVerbuchen(m, d, v, q);
    if (q.state === 'PENDING') return { status: 'ausstehend' };
    const z = await this._zustaende(m, v.inputs);
    const abgelaufen = v.ablauf && Date.now() / 1000 > v.ablauf;
    if (z.every((s) => s === 'UNSPENT') && !abgelaufen) return this._auszahlungEinreichen(m, d, v);
    d.proofs.push(...v.inputs.filter((_, i) => z[i] === 'UNSPENT'));
    d.offen = d.offen.filter((x) => x.id !== v.id);
    this._speichere(m.url, d);
    return { status: 'abgebrochen' };
  }

  // --- Einsatz ------------------------------------------------------------------------------------
  // Meine Farbe in der Partie (aus `baue`), sonst Fehler
  _farbe(partie) {
    const f = partie?.spieler?.w === this.pubkey ? 'w' : partie?.spieler?.b === this.pubkey ? 'b' : null;
    if (!f) throw new WalletFehler('Diese Wallet gehört keinem der beiden Spieler');
    return f;
  }

  // Tauscht aus dem eigenen Guthaben genau den Einsatz der Partie (aus `baue`, mit join) in Proofs
  // mit den Sperrbedingungen: 2 von 3 {Weiß, Schwarz, Schiri}, SIG_ALL, locktime = create + SPERRFRIST,
  // refund = eigener Schlüssel; mit DLEQ. Ergebnis: der cashuB…-Token für das `einsatz`-Event, geprüft
  // mit pruefeEinsatz(). Ein zweiter Aufruf für dieselbe Partie gibt denselben Token zurück.
  async sperreEinsatz(partie) {
    if (!partie?.einsatz || !partie.schiri) throw new WalletFehler('Partie ohne Einsatz');
    if (!partie.join || !partie.spieler.w || !partie.spieler.b) throw new WalletFehler('Partie hat noch keinen Gegner');
    this._farbe(partie);
    const m = await this._mint(partie.einsatz.mint);
    const token = await this._exklusiv(m.url, async (d) => {
      if (d.einsaetze[partie.g]) return d.einsaetze[partie.g].token;
      const offen = d.offen.find((x) => x.art === 'tausch' && x.g === partie.g);
      if (offen) { await this._tauschKlaeren(m, d, offen); return d.einsaetze[partie.g]?.token; }
      const { betrag } = partie.einsatz;
      const locktime = partie.create.created_at + SPERRFRIST;
      const tags = [['pubkeys', p2pk(partie.spieler.b), p2pk(partie.schiri)], ['n_sigs', '2'], ['locktime', String(locktime)],
        ['refund', p2pk(this.pubkey)], ['sigflag', 'SIG_ALL']];
      const secret = () => JSON.stringify(['P2PK', { nonce: zufallHex(32), data: p2pk(partie.spieler.w), tags }]);
      const ks = this._aktiv(m);
      const inputs = this._waehle(m, d.proofs, betrag).map(nurProof);
      const rest = summe(inputs) - this._gebuehr(m, inputs) - betrag;
      const v = { id: zufallHex(16), art: 'tausch', zweck: 'einsatz', eigeneInputs: true, g: partie.g, locktime, inputs,
        ausgaben: [...this._ausgaben(ks, zerlege(betrag, ks), 'einsatz', secret), ...this._ausgaben(ks, zerlege(rest, ks), 'guthaben')] };
      await this._tausche(m, d, v);
      return d.einsaetze[partie.g]?.token;
    });
    if (!token) throw new WalletFehler('Einsatz wurde nicht gesperrt');
    // Zur Sicherheit wie der Schiri prüfen (als käme der Token gleich nach dem join)
    const probe = { pubkey: this.pubkey, created_at: partie.join.created_at, tags: [['g', partie.g]], c: { t: 'einsatz', token } };
    const r = pruefeEinsatz(probe, partie, m.keysets.filter((k) => k.keys));
    if (!r.gueltig) throw new WalletFehler(`Gesperrter Einsatz besteht die Prüfung nicht: ${r.grund}`);
    return token;
  }
  // Gesperrte eigene Einsätze bei einer Mint: { <partie-id>: { token, betrag, locktime, zurueck } }
  einsaetze(url) {
    const e = this._lade(erlaubteMint(url)).einsaetze;
    return Object.fromEntries(Object.entries(e).map(([g, x]) => [g, { token: x.token, betrag: x.betrag, locktime: x.locktime, zurueck: !!x.zurueck }]));
  }
  // Stand der eigenen gesperrten Einsätze bei der Mint (NUT-07): { <partie-id>: 'UNSPENT' | 'SPENT' |
  // 'PENDING' | 'TEILWEISE' } (TEILWEISE: ein Teil der Proofs ist ausgegeben)
  async pruefeEinsaetze(url) {
    const m = await this._mint(url);
    const e = Object.entries(this._lade(m.url).einsaetze);
    const z = await this._zustaende(m, e.flatMap(([, x]) => x.proofs));
    let i = 0;
    return Object.fromEntries(e.map(([g, x]) => {
      const s = z.slice(i, i += x.proofs.length);
      return [g, s.every((st) => st === 'UNSPENT') ? 'UNSPENT' : s.every((st) => st === 'SPENT') ? 'SPENT' : s.includes('PENDING') ? 'PENDING' : 'TEILWEISE'];
    }));
  }
  // Reicht das Guthaben bei der Mint für einen Einsatz von `betrag` Sat samt Tauschgebühr der Mint
  // (input_fee_ppk)? Ergebnis: { moeglich, gebuehr, guthaben } (gebuehr: für die gewählten Proofs,
  // sonst für alle).
  async einsatzMoeglich(url, betrag) {
    const m = await this._mint(url);
    const { proofs } = this._lade(m.url);
    try {
      return { moeglich: true, gebuehr: this._gebuehr(m, this._waehle(m, proofs, betrag)), guthaben: summe(proofs) };
    } catch {
      return { moeglich: false, gebuehr: this._gebuehr(m, proofs), guthaben: summe(proofs) };
    }
  }
  // Offene Vorgänge (Aufladen, Tausch, Auszahlen), die fortsetzen() noch klären muss: [{ art, zweck, betrag }]
  offeneVorgaenge(url) {
    return this._lade(erlaubteMint(url)).offen.map((v) => ({ art: v.art, zweck: v.zweck ?? null,
      betrag: v.betrag ?? summe(v.inputs ?? []) }));
  }

  // Baut aus dem anspruch() des eigenen Schlüssels je Einsatz einen Antrag: Inputs (die gesperrten
  // Proofs ohne Witness) und Outputs (BlindedMessages) über Inputs minus Gebühr der Mint. Die
  // Blinding-Faktoren stehen vor der Rückgabe im Speicher. Ergebnis: [{ einsatz, inputs, outputs }],
  // je passend zu pruefeAntrag() als Inhalt eines `antrag`. Schon gebaute (nicht eingelöste) Anträge
  // kommen wieder, mit `neu: true` entstehen neue.
  async baueAntrag(partie, { neu = false } = {}) {
    const recht = anspruch(partie);
    if (!recht) throw new WalletFehler('Noch kein ergebnis des Schiris oder Partie ohne Einsatz');
    const liste = recht[this._farbe(partie)];
    if (!liste.length) throw new WalletFehler('Dir steht kein Einsatz zu');
    const m = await this._mint(partie.einsatz.mint);
    return this._exklusiv(m.url, async (d) => {
      const ks = this._aktiv(m);
      const antraege = [];
      for (const e of liste) {
        const inputs = e.proofs.map(nurProof);
        let a = !neu && d.antraege.find((x) => x.g === partie.g && x.einsatz === e.farbe && !x.eingeloest
          && x.inputs[0]?.secret === inputs[0].secret);
        if (!a) {
          const betrag = summe(inputs) - this._gebuehr(m, inputs);
          a = { id: zufallHex(16), g: partie.g, einsatz: e.farbe, inputs, ausgaben: this._ausgaben(ks, zerlege(betrag, ks), 'guthaben'), eingeloest: false };
          d.antraege.push(a);
        }
        antraege.push(a);
      }
      this._speichere(m.url, d); // vor der Rückgabe
      return antraege.map((a) => ({ einsatz: a.einsatz, inputs: a.inputs.map(nurProof), outputs: a.ausgaben.map(blinded) }));
    });
  }

  // Löst eine Freigabe ein: eigene SIG_ALL-Signatur und die des Schiris in den Witness des ersten
  // Inputs, Tausch bei der Mint, neue Proofs ins Guthaben. `freigabe`: ein Eintrag aus
  // `partie.freigaben` ({ ev, antrag }) oder { inputs, outputs, sig }. Nach einem Neuladen (Tausch
  // schon eingereicht) wird wiederhergestellt statt neu getauscht. Ergebnis: { betrag }.
  async loeseEin(partie, freigabe) {
    const inputs = freigabe?.inputs ?? freigabe?.antrag?.c?.inputs;
    const outputs = freigabe?.outputs ?? freigabe?.antrag?.c?.outputs;
    const sig = freigabe?.sig ?? freigabe?.ev?.c?.sig;
    if (!Array.isArray(inputs) || !Array.isArray(outputs) || typeof sig !== 'string') throw new WalletFehler('Freigabe ohne Antrag oder Signatur');
    const m = await this._mint(partie.einsatz.mint);
    return this._exklusiv(m.url, async (d) => {
      const a = d.antraege.find((x) => x.g === partie.g && x.ausgaben.length === outputs.length
        && x.ausgaben.every((o, i) => o.B_ === outputs[i]?.B_ && o.amount === outputs[i]?.amount));
      if (!a) throw new WalletFehler('Zu diesem Antrag fehlen die Blinding-Faktoren in diesem Browser');
      const betrag = summe(a.ausgaben);
      if (a.eingeloest) return { betrag };
      const offen = d.offen.find((x) => x.antrag === a.id);
      if (offen) { await this._tauschKlaeren(m, d, offen); return { betrag }; }
      const nachricht = sigAllNachricht(a.inputs, a.ausgaben.map(blinded));
      const witness = JSON.stringify({ signatures: [this.signiere(nachricht), sig] });
      const v = { id: zufallHex(16), art: 'tausch', zweck: 'einloesen', eigeneInputs: false, antrag: a.id,
        inputs: a.inputs.map((p, i) => (i === 0 ? { ...nurProof(p), witness } : nurProof(p))), ausgaben: a.ausgaben };
      await this._tausche(m, d, v);
      return { betrag };
    });
  }

  // Rückholung nach der Sperrfrist: den eigenen gesperrten Einsatz der Partie `g` mit dem
  // Erstattungsschlüssel allein tauschen. Vor der locktime (nach der Uhr der Mint) lehnt die Mint ab.
  // Ergebnis: { betrag }.
  async holeZurueck(url, g) {
    this.signiere(''); // ohne lokalen Schlüssel gleich ein klarer Fehler
    const m = await this._mint(url);
    return this._exklusiv(m.url, async (d) => {
      const e = d.einsaetze[g];
      if (!e) throw new WalletFehler('Kein gesperrter Einsatz dieser Partie in der Wallet');
      if (e.zurueck) throw new WalletFehler('Einsatz wurde schon zurückgeholt');
      const offen = d.offen.find((x) => x.rueckholung === g);
      if (offen) { await this._tauschKlaeren(m, d, offen); return { betrag: summe(offen.ausgaben) }; }
      const inputs = e.proofs.map(nurProof);
      const ks = this._aktiv(m);
      const ausgaben = this._ausgaben(ks, zerlege(summe(inputs) - this._gebuehr(m, inputs), ks), 'guthaben');
      const witness = JSON.stringify({ signatures: [this.signiere(sigAllNachricht(inputs, ausgaben.map(blinded)))] });
      const v = { id: zufallHex(16), art: 'tausch', zweck: 'rueckholung', eigeneInputs: false, rueckholung: g,
        inputs: inputs.map((p, i) => (i === 0 ? { ...p, witness } : p)), ausgaben };
      try {
        await this._tausche(m, d, v);
      } catch (f) {
        if (f.mint && Date.now() / 1000 <= e.locktime) {
          throw new WalletFehler(`${f.message} (Sperrfrist bis ${new Date(e.locktime * 1000).toISOString()})`, { code: f.code, mint: true });
        }
        throw f;
      }
      return { betrag: summe(ausgaben) };
    });
  }

  // --- Fortsetzen nach Neuladen -------------------------------------------------------------------
  // Klärt alle offenen Vorgänge einer Mint (bzw. aller Mints aus der Liste): bezahlte Aufladungen
  // prägen, eingereichte Tausche wiederherstellen oder einreichen, Auszahlungen verbuchen. Wirft
  // nicht; Ergebnis: [{ art, zweck, ergebnis } | { art, zweck, fehler }].
  async fortsetzen(url) {
    const urls = url ? [erlaubteMint(url)] : erlaubteMints().filter((u) => this._lade(u).offen.length);
    const ergebnisse = [];
    for (const u of urls) {
      if (!this._lade(u).offen.length) continue;
      let m;
      try { m = await this._mint(u); } catch (e) { ergebnisse.push({ mint: u, fehler: e.message }); continue; }
      await this._exklusiv(u, async (d) => {
        for (const v of [...d.offen]) {
          try {
            let ergebnis;
            if (v.art === 'aufladen') ergebnis = await this._aufladungAbschliessen(m, d, v);
            else if (v.art === 'auszahlen') ergebnis = await this._auszahlungKlaeren(m, d, v);
            else ergebnis = await this._tauschKlaeren(m, d, v);
            ergebnisse.push({ mint: u, art: v.art, zweck: v.zweck, ergebnis });
          } catch (e) {
            ergebnisse.push({ mint: u, art: v.art, zweck: v.zweck, fehler: e.message });
          }
        }
      });
    }
    return ergebnisse;
  }
}
