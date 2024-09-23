import { getBreakpoint } from "./utilites";

/* NYP_CORP_UAT_Issue_Tracker - Issue 26
   UAT fixes (internal tracker) - Issue 11
   
   Replace all functions below
*/
const toggleNav = (
  navbar: HTMLDivElement,
  navbarHeight: number,
  sideNav: HTMLElement | null,
  sideNavWrapper: HTMLElement | null,
  scrollY: number,
  scrollYPrev: number,
  contentTopPadding: number,
) => {
  const isTransparent = navbar.classList.contains("is-transparent");

  if (isTransparent) return;

  if (scrollY > scrollYPrev && scrollY > navbarHeight * 2) {
    navbar.classList.add("hide-up");
  } else {
    navbar.classList.remove("hide-up");
  }

  // if (sideNav && sideNavWrapper) {
  //   if (getBreakpoint("lg")) {
  //     const contentTop = scrollY - sideNavWrapper.offsetTop;

  //     if (
  //       scrollY > scrollYPrev &&
  //       scrollY > navbarHeight * 2 &&
  //       contentTop >= -contentTopPadding
  //     ) {
  //       sideNav && sideNav.classList.add("hide-up");
  //     } else {
  //       sideNav.classList.remove("hide-up");
  //     }
  //   } else {
  //     sideNav.classList.remove("hide-up");
  //   }
  // }
};

const resize = (
  navbar: HTMLDivElement,
  navbarHeight: number,
  sideNav: HTMLElement | null,
  sideNavWrapper: HTMLElement | null,
  scrollY: number,
  scrollYPrev: number,
  contentTopPadding: number,
) => {
  if (sideNavWrapper) {
    contentTopPadding = parseInt(
      window
        .getComputedStyle(sideNavWrapper)
        .getPropertyValue("padding-top")
        .replace("px", ""),
    );
  }

  toggleNav(
    navbar,
    navbarHeight,
    sideNav,
    sideNavWrapper,
    scrollY,
    scrollYPrev,
    contentTopPadding,
  );
};

export const navScrollHide = (navbar: HTMLDivElement) => {
  const sideNav: HTMLElement | null =
    document.querySelector(".side-nav-wrapper");
  const sideNavWrapper: HTMLElement | null = document.querySelector(
    ".side-nav-content-wrapper",
  );
  let navbarHeight: number = navbar.offsetHeight;
  let scrollY: number = window.scrollY;
  let scrollYPrev: number = scrollY;
  let contentTopPadding = 0;

  resize(
    navbar,
    navbarHeight,
    sideNav,
    sideNavWrapper,
    scrollY,
    scrollYPrev,
    contentTopPadding,
  );

  window.addEventListener("resize", () => {
    navbarHeight = navbar.offsetHeight;
    scrollY = window.scrollY;
    scrollYPrev = scrollY;

    resize(
      navbar,
      navbarHeight,
      sideNav,
      sideNavWrapper,
      scrollY,
      scrollYPrev,
      contentTopPadding,
    );
  });

  window.addEventListener("scroll", () => {
    scrollY = window.scrollY;

    toggleNav(
      navbar,
      navbarHeight,
      sideNav,
      sideNavWrapper,
      scrollY,
      scrollYPrev,
      contentTopPadding,
    );

    scrollYPrev = scrollY;
  });
};
