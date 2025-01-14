import { html, LitElement } from 'lit';

export default class AppShell extends LitElement {
    createRenderRoot() { return this; }
    render = () => {  return html`asd`;  }
}

customElements.define('app-shell', AppShell);
