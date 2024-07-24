import { showElement } from "../../utils/domUtils";
import { CustomPage } from "../CustomPage";
import {
  initializeContent,
  attachEventListeners,
  renderShoppingList,
} from "./HomePageDomUtils";

export class HomePage extends CustomPage {
  constructor() {
    super();
    this.templateUrl = `/HomePage/HomePage.html`;
    this.stylesUrl = `/HomePage/HomePage.css`;
  }

  async connectedCallback() {
    showElement(".search-wrapper");
    await this.loadContent(this.templateUrl, this.stylesUrl);
    await initializeContent(this.shadowRoot, 5);
    attachEventListeners(this.shadowRoot);
    renderShoppingList(this.shadowRoot);
  }
}

customElements.define("home-page", HomePage);
