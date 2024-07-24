export class CustomPage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async loadTemplate(templateUrl) {
    const res = await fetch(templateUrl);
    const html = await res.text();
    return html;
  }

  async loadStyles(stylesUrl) {
    const res = await fetch(stylesUrl);
    const css = await res.text();
    const style = document.createElement("style");
    style.textContent = css;
    return style;
  }

  async loadContent(templateUrl, stylesUrl) {
    const [html, style] = await Promise.all([
      this.loadTemplate(templateUrl),
      this.loadStyles(stylesUrl),
    ]);

    this.shadowRoot.innerHTML = html;
    this.shadowRoot.appendChild(style);
  }
}

customElements.define("custom-page", CustomPage);
