import { hideElement } from "../../utils/domUtils";
import { htmlComponents } from "../../utils/htmlComponents";
import { CustomPage } from "../CustomPage";

export class FavoritesPage extends CustomPage {
  constructor() {
    super();
    this.templateUrl = `/FavoritesPage/FavoritesPage.html`;
    this.stylesUrl = `/FavoritesPage/FavoritesPage.css`;
  }

  async connectedCallback() {
    await this.loadContent(this.templateUrl, this.stylesUrl);
    await this.initializeContent();
    hideElement(".search-wrapper");
  }

  async initializeContent() {
    const favorites = _app.favoriteRecipes.getFavoriteRecipes();

    if (favorites.length > 1) {
      const recipesContainer = this.shadowRoot.querySelector(".recipes");
      for (let i = 0; i < favorites.length; i++) {
        const card = document.createElement("div");
        card.classList.add("recipe-card");
        card.innerHTML = htmlComponents.recipeCard(favorites[i]);
        await this.attachEventListeners(card, favorites[i]);
        recipesContainer.appendChild(card);
      }
    }

    this.shadowRoot.querySelector(".heading").textContent =
      "Huh!? No favorites so far!? Really!? 🍔";
  }

  async attachEventListeners(card, recipe) {
    const detailsButton = card.querySelector(".view-details-button");
    const shoppingListButton = card.querySelector(
      ".add-to-shopping-cart-button"
    );
    const addFavoriteRecipeButton = card.querySelector(
      ".add-to-favorites-button"
    );
    const removeFavoriteRecipeButton = card.querySelector(
      ".remove-from-favorites-button"
    );

    shoppingListButton.hidden = true;
    addFavoriteRecipeButton.hidden = true;

    detailsButton.addEventListener("click", (e) => {
      console.log(`View Details [${recipe.id}]`);
      const url = `${e.target.dataset.url}/${recipe.id}`;
      console.log(url);
      _app.router.go(url);
    });

    removeFavoriteRecipeButton.addEventListener("click", () => {
      _app.favoriteRecipes.removeFavoriteRecipe(recipe);
      _app.router.go("/favorites", false);
    });

    return Promise.resolve();
  }
}

customElements.define("favorites-page", FavoritesPage);
