// Gemeinsame Einstellungen von index.html (Spieler) und schiri.html (Schiri): Relays, Import-Map
// und der Standard-Schiri.
//
// Klassisches Skript (kein Modul), das jede Seite im <head> vor ihrem Modul-Skript lädt:
//   <script src="einstellungen.js"></script>
// Es legt die Import-Map an, bevor das erste Modul geladen wird, damit `regeln.js` und die Seiten
// `nostr-tools` und `chess.js` mit denselben Namen importieren wie in Node. Die Relays stehen
// danach in `window.EINSTELLUNGEN.RELAYS`, der Standard-Schiri in `window.EINSTELLUNGEN.SCHIRI`.
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
  // Standard-Schiri für neue Schiri-Partien auf der Spieler-Seite (Pubkey hex), also
  // npub1rheshnwm4qh45lpaelmexphr3dmvwyef6uu8ta73jq982p88qqwqw4nvak
  const SCHIRI = '1df30bcddba82f5a7c3dcff79306e38b76c71329d73875f7d1900a7504e7001c';

  const karte = document.createElement('script');
  karte.type = 'importmap';
  karte.textContent = JSON.stringify({ imports: IMPORTS });
  document.currentScript.after(karte);
  window.EINSTELLUNGEN = Object.freeze({ RELAYS: Object.freeze(RELAYS), SCHIRI });
})();
