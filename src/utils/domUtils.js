function hideElement(selector) {
  const element = document.querySelector(selector);

  if (!element) console.error("Element does not exist");
  else {
    element.classList.add("hidden");
  }
}

function showElement(selector) {
  const element = document.querySelector(selector);

  if (!element) console.error("Element does not exist");
  else {
    element.classList.remove("hidden");
  }
}

export { hideElement, showElement };
