// Gemeinsame Einstellungen von index.html (Spieler) und schiri.html (Schiri): Relays, Import-Map,
// der Standard-Schiri und die Mints für Einsätze.
//
// Klassisches Skript (kein Modul), das jede Seite im <head> vor ihrem Modul-Skript lädt:
//   <script src="einstellungen.js"></script>
// Es legt die Import-Map an, bevor das erste Modul geladen wird, damit `regeln.js` und die Seiten
// `nostr-tools`, `chess.js`, `@cashu/cashu-ts` und `qrcode-generator` mit denselben Namen importieren
// wie in Node. Die
// Relays stehen danach in `window.EINSTELLUNGEN.RELAYS`, der Standard-Schiri in
// `window.EINSTELLUNGEN.SCHIRI`, die Mints in `window.EINSTELLUNGEN.MINTS`.
// Die Tests laden die Datei auch in Node (`import '../einstellungen.js'`); dort gibt es kein
// `document`, also auch keine Import-Map, nur `globalThis.EINSTELLUNGEN`.
(() => {
  // Bibliotheken per CDN, fest auf die Versionen aus package.json
  const IMPORTS = {
    'nostr-tools': 'https://cdn.jsdelivr.net/npm/nostr-tools@2.25.5/+esm',
    'chess.js': 'https://cdn.jsdelivr.net/npm/chess.js@1.4.0/+esm',
    '@cashu/cashu-ts': 'https://cdn.jsdelivr.net/npm/@cashu/cashu-ts@4.13.1/+esm',
    // QR-Codes für Lightning-Rechnungen und Token (nur die Spieler-Seite, wallet-ui.js)
    'qrcode-generator': 'https://cdn.jsdelivr.net/npm/qrcode-generator@1.4.4/+esm',
  };
  const RELAYS = [
    'wss://relay.damus.io',
    'wss://nos.lol',
    'wss://relay.primal.net',
    'wss://relay.snort.social',
    'wss://offchain.pub',
    'wss://relay.nostr.net',
    'wss://nostr.mom',
  ];
  // Standard-Schiri für neue Schiri-Partien auf der Spieler-Seite (Pubkey hex), also
  // npub1rheshnwm4qh45lpaelmexphr3dmvwyef6uu8ta73jq982p88qqwqw4nvak
  const SCHIRI = '1df30bcddba82f5a7c3dcff79306e38b76c71329d73875f7d1900a7504e7001c';
  // Vertrauenswürdige Mints für Einsätze (E9), URL ohne Schrägstrich am Ende. Geprüft am 26.11.2026
  // per /v1/info: NUT-04/05 (bolt11, sat), NUT-07, NUT-11, NUT-12, CORS für alle Origins. Ob sie
  // SIG_ALL wirklich annehmen, steht nicht in /v1/info. Ein `create` mit einer anderen Mint ist
  // ungültig. `MINT` ist die Vorgabe (Test-Mint, bis M4 erreicht ist).
  const MINTS = [
    { url: 'https://testnut.cashu.space', name: 'Test-Mint (Spielgeld)', test: true },
    { url: 'https://mint.minibits.cash/Bitcoin', name: 'Minibits' },
    { url: 'https://mint.coinos.io', name: 'Coinos' },
    { url: 'https://mint.cubabitcoin.org', name: 'Cuba Bitcoin' },
    { url: 'https://mint.lnvoltz.com', name: 'LN Voltz' },
  ].map(Object.freeze);
  const MINT = 'https://testnut.cashu.space';

  if (typeof document !== 'undefined') {
    const karte = document.createElement('script');
    karte.type = 'importmap';
    karte.textContent = JSON.stringify({ imports: IMPORTS });
    document.currentScript.after(karte);
  }
  globalThis.EINSTELLUNGEN = Object.freeze({ RELAYS: Object.freeze(RELAYS), SCHIRI, MINTS: Object.freeze(MINTS), MINT });
})();
