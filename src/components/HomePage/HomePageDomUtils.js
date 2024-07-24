import { htmlComponents } from "../../utils/htmlComponents";
import {
  initialRecipes,
  getRecipeById,
  getRecipesByName,
  getRecipesByIngredients,
} from "../../api/api";
import { formatIngredientsArray } from "../../utils/ingredients";
import { tempRecipe } from "../../utils/recipeExample";
import {
  DIET_TYPE,
  MEAL_TYPE,
  CUISINE_TYPE,
} from "../../utils/filterConfig.js";

/**
 * Provides random recipes when application starts
 * @param {any} root Shadow DOM root
 * @param {number} numOfRecipes Number of initial recipes to load
 */
async function initializeContent(root, numOfRecipes = 5) {
  const recipes = await initialRecipes(numOfRecipes);

  if (recipes !== undefined) {
    const contentContainer = root.querySelector(".content");

    for (let i = 0; i < recipes.length; i++) {
      contentContainer.appendChild(generateRecipeCard(root, recipes[i]));
    }
  }
}

function generateShortRecipeCard(recipe) {
  const recipeCard = document.createElement("div");
  recipeCard.classList.add("recipe-card");
  recipeCard.innerHTML = htmlComponents.shortRecipeCard(recipe);

  const detailsButton = recipeCard.querySelector(".view-details-button");
  detailsButton.addEventListener("click", (e) => {
    console.log(`View Details [${recipe.id}]`);
    const url = `${e.target.dataset.url}/${recipe.id}`;
    console.log(url);
    _app.router.go(url);
  });

  return recipeCard;
}

/**
 * @param {any} root Shadow DOM root
 * @param {Object} recipe Single recipe retrieved from API
 * @returns Generated recipe card
 */
function generateRecipeCard(root, recipe) {
  const recipeCard = document.createElement("div");
  recipeCard.classList.add("recipe-card");
  recipeCard.innerHTML = htmlComponents.recipeCard(recipe);

  const detailsButton = recipeCard.querySelector(".view-details-button");
  const shoppingCartButton = recipeCard.querySelector(
    ".add-to-shopping-cart-button"
  );
  const favoritesButton = recipeCard.querySelector(".add-to-favorites-button");
  const removeFavoritesButton = recipeCard.querySelector(
    ".remove-from-favorites-button"
  );

  removeFavoritesButton.hidden = true;

  detailsButton.addEventListener("click", (e) => {
    console.log(`View Details [${recipe.id}]`);
    const url = `${e.target.dataset.url}/${recipe.id}`;
    console.log(url);
    _app.router.go(url);
  });

  shoppingCartButton.addEventListener("click", () => {
    getRecipeById(recipe.id).then((recipe) => {
      // const ingredients = formatIngredientsArray(recipe.extendedIngredients);
      const ingredients = formatIngredientsArray(
        tempRecipe.extendedIngredients
      );
      _app.shoppingCart
        .addShoppingCartItems(ingredients)
        .then(() => renderShoppingList(root));
    });
  });

  if (
    _app.favoriteRecipes
      .getFavoriteRecipes()
      .findIndex((r) => r.id === recipe.id) !== -1
  ) {
    favoritesButton.classList.add("favorite");
  }
  favoritesButton.addEventListener("click", () => {
    _app.favoriteRecipes.addFavoriteRecipe(recipe);
    favoritesButton.classList.add("favorite");
  });

  return recipeCard;
}

/**
 * @param {any} root Shadow DOM root
 * Adding all event listeners
 */
function attachEventListeners(root) {
  const searchButton = document.querySelector("#search-btn");
  const clearSearchButton = document.querySelector("#clear-search-btn");
  const searchBar = document.querySelector("#search-input");

  const dietTypeFilter = root.querySelector("#diet-type");
  const cuisineTypeFilter = root.querySelector("#cuisine-type");
  const mealTypeFilter = root.querySelector("#meal-type");
  const clearShoppingListButton = root.getElementById(
    "clear-shopping-list-button"
  );
  const saveShoppingListButton = root.getElementById(
    "save-shopping-list-button"
  );

  searchButton.addEventListener("click", async (e) => {
    e.preventDefault();
    const contentContainer = root.querySelector(".content");
    const query = searchBar.value;
    searchBar.value = "";
    if (query.length > 0) {
      const byIngredients = document.querySelector(
        "#search-by-ingredients"
      ).checked;

      let recipes = [];

      if (byIngredients) {
        recipes = await getRecipesByIngredients(query);
      } else {
        recipes = await getRecipesByName(query);
      }

      contentContainer.replaceChildren();

      for (let i = 0; i < recipes.length; i++) {
        contentContainer.appendChild(generateShortRecipeCard(recipes[i]));
      }
    }
  });

  clearSearchButton.addEventListener("click", async (e) => {
    e.preventDefault();
    console.log("Clear search button clicked.");
    const contentContainer = root.querySelector(".content");
    searchBar.value = "";
    const recipes = await initialRecipes(5);

    for (let i = 0; i < recipes.length; i++) {
      contentContainer.appendChild(generateRecipeCard(root, recipes[i]));
    }
  });

  dietTypeFilter.addEventListener("click", () => {
    console.log("Diet-type filted event listener!");
    generateFiltersByType(root, DIET_TYPE);
  });
  cuisineTypeFilter.addEventListener("click", () => {
    console.log("Cuisine-type filted event listener!");
    generateFiltersByType(root, CUISINE_TYPE);
  });
  mealTypeFilter.addEventListener("click", () => {
    console.log("Meal-type filted event listener!");
    generateFiltersByType(root, MEAL_TYPE);
  });
  clearShoppingListButton.addEventListener("click", () => {
    _app.shoppingCart.clearShoppingCartItems().then(renderShoppingList(root));
  });
  saveShoppingListButton.addEventListener("click", () => {
    console.log("Saving shopping list...");
  });
}

/**
 * @param {any} root Shadow DOM root
 * Generates shopping list content based on current shopping list state
 */
function renderShoppingList(root) {
  const items = _app.shoppingCart.getShoppingCartItems();
  const list = root.querySelector(".shopping-list");

  list.innerHTML = "";
  for (let i = 0; i < items.length; i++) {
    const item = generateShoppingListItem(root, items[i]);
    list.appendChild(item);
  }
}

/**
 * Generates HTMLElement of single shopping list item
 * @param {any} root Shadow DOM root
 * @param {Object} ingredient
 * @returns {HTMLElement} Shopping list item
 */
function generateShoppingListItem(root, ingredient) {
  const item = document.createElement("li");
  item.innerHTML = htmlComponents.shoppingListItem(ingredient);

  const removeBtn = item.querySelector("i");
  removeBtn.addEventListener("click", () => {
    _app.shoppingCart
      .removeShoppingCartItem(ingredient)
      .then(renderShoppingList(root));
  });

  return item;
}

/**
 * Generates filters list depending on filterType
 * @param {any} root Shadow DOM root
 * @param {Object} filterType
 */
function generateFiltersByType(root, filterType) {
  const filtersContent = root.querySelector(".filters");
  filtersContent.innerHTML = "";
  for (let type in filterType) {
    const filter = document.createElement("div");
    filter.innerText = filterType[type];
    filter.classList.add("filter");
    filtersContent.appendChild(filter);
  }
}

export { initializeContent, attachEventListeners, renderShoppingList };
