import { CustomPage } from "../CustomPage";
import { getRecipeById } from "../../api/api";
import { hideElement } from "../../utils/domUtils";

export class DetailsPage extends CustomPage {
  constructor() {
    super();
    this.templateUrl = `/DetailsPage/DetailsPage.html`;
    this.stylesUrl = `/DetailsPage/DetailsPage.css`;
  }

  async connectedCallback() {
    await this.loadContent(this.templateUrl, this.stylesUrl);
    await this.initializeContent();
    this.attachEventListeners();
    hideElement(".search-wrapper");
  }

  async initializeContent() {
    const url = location.href;
    const recipeId = url.slice(url.lastIndexOf("/") + 1);

    const recipe = await getRecipeById(recipeId);
    console.log(JSON.stringify(recipe));

    this.shadowRoot.querySelector("img").src = recipe.image;
    this.shadowRoot.querySelector(".recipe-title").textContent = recipe.title;
    this.shadowRoot.querySelector(
      ".ready-in"
    ).textContent = `Ready in: ${recipe.readyInMinutes} min`;
    this.shadowRoot.querySelector(
      ".servings"
    ).textContent = `Servings: ${recipe.servings}`;
    this.shadowRoot.querySelector(
      ".price"
    ).textContent = `Price per serving: $${recipe.pricePerServing}`;
    this.shadowRoot.querySelector(".recipe-summary").innerHTML = recipe.summary;

    const recipeIsFavorite =
      _app.favoriteRecipes
        .getFavoriteRecipes()
        .findIndex((r) => r.id === recipe.id) !== -1;

    const addToFavoritesButton = this.shadowRoot.querySelector(
      ".add-to-favorites-button"
    );

    if (recipeIsFavorite) {
      addToFavoritesButton.classList.add("favorite");
    } else {
      addToFavoritesButton.addEventListener("click", (e) => {
        _app.favoriteRecipes.addFavoriteRecipe(recipe);
        addToFavoritesButton.classList.add("favorite");
      });
    }
  }
}

customElements.define("details-page", DetailsPage);
