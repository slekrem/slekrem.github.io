// Gemeinsame Einstellungen von index.html (Spieler) und schiri.html (Schiri): Relays und Import-Map.
//
// Klassisches Skript (kein Modul), das jede Seite im <head> vor ihrem Modul-Skript lädt:
//   <script src="einstellungen.js"></script>
// Es legt die Import-Map an, bevor das erste Modul geladen wird, damit `regeln.js` und die Seiten
// `nostr-tools` und `chess.js` mit denselben Namen importieren wie in Node. Die Relays stehen
// danach in `window.EINSTELLUNGEN.RELAYS`.
(() => {
  // Bibliotheken per CDN, fest auf die Versionen aus package.json
  const IMPORTS = {
    'nostr-tools': 'https://cdn.jsdelivr.net/npm/nostr-tools@2.25.5/+esm',
    'chess.js': 'https://cdn.jsdelivr.net/npm/chess.js@1.4.0/+esm',
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

  const karte = document.createElement('script');
  karte.type = 'importmap';
  karte.textContent = JSON.stringify({ imports: IMPORTS });
  document.currentScript.after(karte);
  window.EINSTELLUNGEN = Object.freeze({ RELAYS: Object.freeze(RELAYS) });
})();
