import shoppingCartInstance from "./context/shoppingCart.js";
import favoriteRecipesInstance from "./context/favorites.js";
import Router from "./services/Router.js";
import { HomePage } from "./components/HomePage/HomePage.js";
import { DetailsPage } from "./components/DetailsPage/DetailsPage.js";
import { FavoritesPage } from "./components/FavoritesPage/FavoritesPage.js";

window._app = {};
_app.router = Router;
_app.shoppingCart = shoppingCartInstance;
_app.favoriteRecipes = favoriteRecipesInstance;

window.addEventListener("DOMContentLoaded", () => {
  _app.router.init();
});
