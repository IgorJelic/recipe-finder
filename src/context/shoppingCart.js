const shoppingCart = () => {
  let items = [];

  /**
   * Exposed method for adding new items to shopping list
   * @param {Array} newItems Items to add to shopping list
   */
  async function addShoppingCartItems(newItems) {
    for (let i = 0; i < newItems.length; i++) {
      addShoppingCartItem(newItems[i]);
    }
    return Promise.resolve();
  }

  /**
   * Private method, handles adding new item inside shopping list
   * @param {Object} newItem Item to add inside shopping list
   */
  function addShoppingCartItem(newItem) {
    // FIX BUG, when adding same ingredients, value does not change
    const itemIndex = items.findIndex((i) => i.name === newItem.name);
    if (itemIndex !== -1) {
      items[itemIndex].value = items[itemIndex].value + newItem.value;
    } else {
      items.push({ ...newItem });
    }
    console.log(
      `SHOPPING LIST >> Added shopping cart item: ${JSON.stringify(newItem)}`
    );
  }

  /**
   * Exposed method for removing item from shopping list
   * @param {Object} item Item to remove from shopping list
   */
  async function removeShoppingCartItem(item) {
    items = items.filter((i) => i.name !== item.name);
    console.log(`SHOPPING LIST >> Removed item [${item.name}]`);
    return Promise.resolve();
  }

  /**
   * Exposed method for removing all items from shopping list
   */
  async function clearShoppingCartItems() {
    items = [];
    console.log("SHOPPING LIST >> Cleared.");
    return Promise.resolve();
  }

  /**
   * Exposed method for getting current shopping list state
   * @returns Copy of items array
   */
  function getShoppingCartItems() {
    return [...items];
  }

  return {
    addShoppingCartItems,
    removeShoppingCartItem,
    clearShoppingCartItems,
    getShoppingCartItems,
  };
};

const shoppingCartInstance = shoppingCart();
export default shoppingCartInstance;
