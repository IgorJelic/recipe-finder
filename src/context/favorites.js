const favorites = () => {
  let recipes = [];

  /**
   * Exposed method for adding new favorite recipe
   * @param {Object} newRecipe Favorite recipe to add
   */
  async function addFavoriteRecipe(newRecipe) {
    const recipeIndex = recipes.findIndex((r) => r.id === newRecipe.id);
    if (recipeIndex === -1) recipes.push(newRecipe);
    return Promise.resolve();
  }

  /**
   * Exposed method for removing recipe from favorite recipes
   * @param {Object} recipe Recipe to remove from favorite recipes
   */
  async function removeFavoriteRecipe(recipe) {
    recipes = recipes.filter((r) => r.id !== recipe.id);
    return Promise.resolve();
  }

  /**
   * Exposed method for getting current favorite recipe list
   * @returns Copy of favorite recipes array
   */
  function getFavoriteRecipes() {
    return [...recipes];
  }

  return { addFavoriteRecipe, removeFavoriteRecipe, getFavoriteRecipes };
};

const favoriteRecipesInstance = favorites();
export default favoriteRecipesInstance;
