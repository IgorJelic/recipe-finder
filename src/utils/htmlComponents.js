import { formatIngredientString } from "./ingredients";

const htmlComponents = {
  recipeCard: (recipe) => getRecipeCard(recipe),
  shortRecipeCard: (recipe) => getShortRecipeCard(recipe),
  shoppingListItem: (ingredient) => getShoppingListItem(ingredient),
};

function getShoppingListItem(ingredient) {
  const itemString = formatIngredientString(ingredient);

  return `
    <div class="list-item">
    ${itemString}
    <span><i class="fa fa-times" aria-hidden="true"></i></span>
  </div>`;
}

function getShortRecipeCard(recipe) {
  return `
  <div class="recipe-card-upper">
    <img
      src="${recipe.image}"
      alt="Recipe Image"
    />
    <div class="recipe-heading flex-col flex-start">
      <h3 class="recipe-title">
          ${recipe.title}
      </h3>
      <div class="flex-row">
        <button data-url="/details" class="view-details-button">Details</button>
      </div>
    </div>
  </div>`;
}

function getRecipeCard(recipe) {
  return `
    <div class="recipe-card-upper">
    <img
      src="${recipe.image}"
      alt="Recipe Image"
    />
    <div class="recipe-heading flex-col flex-start">
      <h3 class="recipe-title">
          ${recipe.title}
      </h3>
      <div class="flex-row">
        <button data-url="/details" class="view-details-button">Details</button>
        <button class="add-to-shopping-cart-button">
          <i class="fa fa-shopping-cart" aria-hidden="true"></i>
        </button>
        <button class="add-to-favorites-button">
          <i class="fa fa-heart" aria-hidden="true"></i>
        </button>
        <button class="remove-from-favorites-button">
          Remove
        </button>
      </div>
    </div>
  </div>
  <div class="recipe-card-lower">
    <ul>
      <li>Ready in: ${recipe.readyInMinutes} minutes</li>
      <li>Servings: ${recipe.servings}</li>
      <li>Price per serving: $${recipe.pricePerServing}</li>
    </ul>
    <p class="recipe-summary">
      ${recipe.summary}
    </p>
  </div>`;
}

export { htmlComponents };
