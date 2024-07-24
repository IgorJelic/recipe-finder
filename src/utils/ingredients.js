/**
 *
 * @param {Array} ingredientsOriginal Array of ingredients in original form, retrieved from API
 * @returns {Array} Array of ingredient objects suitable for shopping list manipulation
 */
function formatIngredientsArray(ingredientsOriginal) {
  const ingredients = ingredientsOriginal.map((original) => {
    return {
      name: original.originalName,
      amount: original.measures.metric.amount,
      unit: original.measures.metric.unitShort,
    };
  });
  return ingredients;
}

/**
 *
 * @param {Object} ingredient
 * @returns Formatted string suitable for Shopping List item representation
 */
function formatIngredientString(ingredient) {
  return `${ingredient.name} - ${ingredient.amount}${ingredient.unit}`;
}

// function formatIngredientsArray(ingredientsOriginal, unit = us/metric)

export { formatIngredientsArray, formatIngredientString };
