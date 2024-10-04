import { getBreakpoint, setLenisScroll, getPageZoom } from "./utilites";
import { dropdownHideNoHeight, dropdownShowNoHeight } from "./dropdown";
import { setFullHeightStyle } from "./fullHeight";

const DELAY: number = 300;

/*====================================================
  Reusable functions, see main function below
====================================================*/
// Hide search field
const navSearchHide = (
  searchButton: HTMLButtonElement,
  searchContent: HTMLDivElement,
  searchInput: HTMLInputElement,
  searchClearButton: HTMLButtonElement | null,
  recentSearch: HTMLDivElement | null,
  searchResult: HTMLDivElement | null,
  navbar: HTMLDivElement,
) => {
  navbar.classList.remove("bordered");
  navbar.classList.remove("expanded");
  dropdownHideNoHeight(searchButton, searchContent);
  searchInput.value = "";
  searchInput.blur();

  if (searchClearButton) {
    searchClearButton.style.display = "none";
  }
  if (recentSearch) {
    recentSearch.classList.remove("hide");
  }
  // if (searchResult) {
  //   searchResult.classList.remove("show");
  // }
};

// Show search field
const navSearchShow = (
  searchButton: HTMLButtonElement,
  searchContent: HTMLDivElement,
  searchInput: HTMLInputElement,
  navbar: HTMLDivElement,
) => {
  dropdownShowNoHeight(searchButton, searchContent);

  setTimeout(() => {
    navbar.classList.add("bordered");
    navbar.classList.add("expanded");
  }, 1);

  setTimeout(() => {
    searchInput.focus();
  }, DELAY + 1);
};

const setMaxHeight = (
  searchContent: HTMLDivElement,
  disableFullHeight: HTMLElement | null,
) => {
  if (disableFullHeight) {
    searchContent.style.maxHeight = `${searchContent.scrollHeight}px`;
  } else {
    // Zoom fix - updated max height value
    searchContent.style.maxHeight = `min(${
      window.innerHeight - 84 * getPageZoom()
    }px, ${searchContent.scrollHeight}px)`;
  }
};

const resize = (
  searchButton: HTMLButtonElement,
  searchContent: HTMLDivElement,
  searchInput: HTMLInputElement,
  searchClearButton: HTMLButtonElement | null,
  recentSearch: HTMLDivElement | null,
  searchResult: HTMLDivElement | null,
  mainMenuButton: HTMLButtonElement | null,
  navbar: HTMLDivElement,
  disableFullHeight: HTMLElement | null,
) => {
  searchContent.classList.add("no-transition");

  // Set height
  setFullHeightStyle(searchContent, "max", 84, "xl", 1, disableFullHeight);

  if (getBreakpoint("max-xl") && mainMenuButton) {
    if (mainMenuButton.getAttribute("aria-expanded") !== "true")
      navSearchHide(
        searchButton,
        searchContent,
        searchInput,
        searchClearButton,
        recentSearch,
        searchResult,
        navbar,
      );
  }
  if (getBreakpoint("xl")) {
    if (searchButton.getAttribute("aria-expanded") === "true") {
      setMaxHeight(searchContent, disableFullHeight);
    }
  }
};

/*========================================
  Main function here
========================================*/
export const navSearch = (
  navbar: HTMLDivElement,
  mainMenuButton: HTMLButtonElement | null,
  searchButton: HTMLButtonElement | null,
  searchContent: HTMLDivElement | null,
  searchInputWrapper: HTMLDivElement | null,
  searchInput: HTMLInputElement | null,
  disableFullHeight: HTMLElement | null,
) => {
  if (!searchButton || !searchContent || !searchInput) return;

  const searchClearButton: HTMLButtonElement | null = document.querySelector(
    ".navbar-search .form-clear-button",
  );
  const recentSearch: HTMLDivElement | null = document.querySelector(
    ".navbar-search-recent-search",
  );
  // const searchResult: HTMLDivElement | null = document.querySelector(
  //   ".navbar-search-results",
  // );
  const searchResult: HTMLDivElement | null = null;

  // Set height
  setFullHeightStyle(searchContent, "max", 84, "xl", 1, disableFullHeight);

  // Enable scroll for menu
  setLenisScroll(searchContent);

  // Click to toggle search
  searchButton.addEventListener("click", (event: Event) => {
    event.preventDefault();
    searchContent.classList.remove("no-transition");

    if (searchButton.getAttribute("aria-expanded") === "true") {
      navSearchHide(
        searchButton,
        searchContent,
        searchInput,
        searchClearButton,
        recentSearch,
        searchResult,
        navbar,
      );
    } else {
      navSearchShow(searchButton, searchContent, searchInput, navbar);
    }
  });

  window.addEventListener("resize", () =>
    resize(
      searchButton,
      searchContent,
      searchInput,
      searchClearButton,
      recentSearch,
      searchResult,
      mainMenuButton,
      navbar,
      disableFullHeight,
    ),
  );

  // Hides dropdown when clicks outside
  document.addEventListener("click", (event) => {
    searchContent.classList.remove("no-transition");

    if (getBreakpoint("xl")) {
      if (
        !searchContent.contains(<Node>event.target) &&
        !searchButton.contains(<Node>event.target)
      ) {
        navSearchHide(
          searchButton,
          searchContent,
          searchInput,
          searchClearButton,
          recentSearch,
          searchResult,
          navbar,
        );
      }
    }
  });

  // Only runs code if elements are in document, prevents console error
  if (searchClearButton && recentSearch && searchResult) {
    searchInput.addEventListener("keyup", () => {
      if (searchInput.value.length >= 3) {
        recentSearch.classList.add("hide");
        // searchResult.classList.add("show");
        setMaxHeight(searchContent, disableFullHeight);
      }
      if (searchInput.value.length === 0) {
        recentSearch.classList.remove("hide");
        // searchResult.classList.remove("show");
        setMaxHeight(searchContent, disableFullHeight);
      }
    });

    searchClearButton.addEventListener("click", () => {
      recentSearch.classList.remove("hide");
      // searchResult.classList.remove("show");
      setMaxHeight(searchContent, disableFullHeight);
    });
  }

  // Press escape to hide menu
  if (searchInputWrapper && getBreakpoint("xl")) {
    searchInputWrapper.addEventListener("keyup", (event) => {
      switch (event.key) {
        case "Escape":
          navSearchHide(
            searchButton,
            searchContent,
            searchInput,
            searchClearButton,
            recentSearch,
            searchResult,
            navbar,
          );
          break;
      }
    });

    searchButton.addEventListener("keyup", (event) => {
      switch (event.key) {
        case "Escape":
          navSearchHide(
            searchButton,
            searchContent,
            searchInput,
            searchClearButton,
            recentSearch,
            searchResult,
            navbar,
          );
          break;
      }
    });
  }
};
