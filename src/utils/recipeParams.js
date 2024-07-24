class RecipeParams {
  constructor(params) {
    this.number = params.number;
    this.name = params.name;
    this.ingredients = params.ingredients || [];
  }

  setNumber(value) {
    this.number = value;
  }

  setName(value) {
    this.name = value;
  }

  setIngredients(arr) {
    this.ingredients = [...arr];
  }

  /**
   * Formating URL parameters
   * @returns {String} Part of URL Query string depending on parameters
   */
  generateParamsQuery() {
    let querySufix = "?";

    querySufix += this.name ? `query=${this.name}&` : "";
    querySufix += this.number ? `number=${this.number}&` : "";
    querySufix += this.ingredients
      ? `includeIngredients=${this.ingredients}&`
      : "";

    return querySufix.slice(0, -1);
  }
}

export default RecipeParams;
