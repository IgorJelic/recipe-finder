const Router = {
  init: () => {
    document.querySelectorAll("a.link").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const url = link.getAttribute("href");
        Router.go(url);
      });
    });

    window.addEventListener("popstate", (e) => {
      Router.go(e.state.route, false);
    });

    Router.go(location.pathname);
  },
  go: (route, addToHistory = true) => {
    console.log(`Going to : ${route}`);

    if (addToHistory) {
      history.pushState({ route }, null, route);
    }

    let contentSection = document.querySelector(".content-wrapper");
    let generatedContent = null;
    switch (route) {
      case "/":
        // Home page, random recipes
        contentSection.innerHTML = "";
        generatedContent = document.createElement("home-page");
        break;
      case "/favorites":
        // Favorites page with all liked recipes
        contentSection.innerHTML = "";
        generatedContent = document.createElement("favorites-page");
        break;
      default:
        if (route.startsWith("/details/")) {
          // Details page with recipe details
          contentSection.innerHTML = "";
          generatedContent = document.createElement("details-page");
        }
        break;
    }

    if (!generatedContent)
      contentSection.innerHTML = "<h1>Non existing route!</h1>";
    else contentSection.appendChild(generatedContent);

    window.scrollX = 0;
    window.scrollY = 0;
  },
};

export default Router;
