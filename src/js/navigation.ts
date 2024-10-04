import { navSearch } from "./navSearch";
import { navMenu } from "./navMenu";
import { navTransparent } from "./navTransparent";
import { navScrollHide } from "./navScrollHide";
import { stickyTop } from "./stickyTop";

export const navigation = (
  body: HTMLBodyElement | null,
  disableFullHeight: HTMLElement | null,
) => {
  const navbar: HTMLDivElement | null = document.querySelector(".navbar");
  const searchContent: HTMLDivElement | null =
    document.querySelector(".navbar-search");
  const megaMenus: NodeListOf<HTMLElement> =
    document.querySelectorAll(".navbar-mega");

  stickyTop(navbar, searchContent, megaMenus, disableFullHeight);

  if (!navbar) return;

  const mainMenuButton: HTMLButtonElement | null =
    document.querySelector(".navbar-menu");
  const mainMenu: HTMLDivElement | null =
    document.querySelector(".navbar-main-menu");

  const searchButton: HTMLButtonElement | null = document.querySelector(
    ".navbar-search-button",
  );

  const searchInputWrapper: HTMLDivElement | null = document.querySelector(
    ".navbar-search-field-wrapper",
  );
  const searchInput: HTMLInputElement | null = document.querySelector(
    ".navbar-search-field",
  );
  const transparentNavbarIntersect: NodeListOf<HTMLElement> =
    document.querySelectorAll("[data-transparent-navbar]");

  navSearch(
    navbar,
    mainMenuButton,
    searchButton,
    searchContent,
    searchInputWrapper,
    searchInput,
    disableFullHeight,
  );

  navMenu(navbar, mainMenuButton, mainMenu, megaMenus, body, disableFullHeight);

  navScrollHide(navbar);

  navTransparent(navbar, transparentNavbarIntersect);
};
