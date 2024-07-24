import RecipeParams from "../utils/recipeParams";

const BASE_URL = "https://api.spoonacular.com/recipes";
const API_KEY = "apiKey=24b1035d28804ca791b15abb641a8aaa";

const recipeOptions = {
  byId: (id) => `/${id}/information`,
  randomRecipes: "/random",
  specificRecipes: "/complexSearch",
};

/**
 * Formating Query string based on type of request, and request parameters
 * @param {String} type Type of request
 * @param {Object} params Object containing optional parameters
 * @returns {String} URL Query ready for sending API request
 */
function getQuery(type, params) {
  let queryString = BASE_URL;
  if (type) {
    queryString += type;
  }

  if (params) {
    const recipeParams = new RecipeParams(params);
    const paramsQuery = recipeParams.generateParamsQuery();
    queryString += paramsQuery.length > 0 ? `${paramsQuery}&` : "?";
  } else {
    queryString += "?";
  }

  console.log("API call: " + queryString + API_KEY);
  return queryString + API_KEY;
}

/**
 * Gets random recipes from API
 * @param {number} numberOfRecipes Number of recipes to fetch from API
 * @returns {Array} Array of recipe objects
 */
async function initialRecipes(numberOfRecipes = 2) {
  const query = getQuery(recipeOptions.randomRecipes, {
    number: numberOfRecipes,
  });
  try {
    const res = await fetch(query);
    const data = await res.json();
    return data.recipes;
  } catch (error) {
    throw new Error(error.message);
  }
}

/**
 * Gets recipe from API based on recipe ID
 * @param {number} recipeId
 * @returns {Object}
 */
async function getRecipeById(recipeId) {
  const query = getQuery(recipeOptions.byId(recipeId));
  try {
    const res = await fetch(query);
    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getRecipesByName(recipeName) {
  const query = getQuery(recipeOptions.specificRecipes, {
    name: recipeName,
    number: 10,
  });

  try {
    const res = await fetch(query);
    const data = await res.json();
    return data.results;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getRecipesByIngredients(ingredients) {
  const query = getQuery(recipeOptions.specificRecipes, {
    ingredients: ingredients,
    number: 10,
  });

  try {
    const res = await fetch(query);
    const data = await res.json();
    return data.results;
  } catch (error) {
    throw new Error(error.message);
  }
}

export {
  initialRecipes,
  getRecipeById,
  getRecipesByName,
  getRecipesByIngredients,
};
