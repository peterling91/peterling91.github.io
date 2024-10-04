import { getPageZoom } from "./utilites";

// Scroll fix -  updated setNavTransparent
const setNavTransparent = (
  navbar: HTMLElement,
  intersectElem: HTMLElement,
  intersectElemHeight: number,
  scrollY: number,
  scrollYPrev: number,
) => {
  const top = intersectElem.getBoundingClientRect().top;
  const offset = 68 * getPageZoom();

  if (top >= -offset) {
    navbar.classList.add("no-transition");

    setTimeout(() => {
      navbar.classList.add("is-transparent");
      navbar.classList.remove("hiding");
      navbar.classList.remove("no-transition");
    }, 1);
  } else {
    if (top >= -1 * intersectElemHeight) {
      if (scrollY > scrollYPrev) {
        navbar.classList.add("no-transition");

        setTimeout(() => {
          navbar.classList.add("hiding");
          navbar.classList.remove("no-transition");
        }, 1);
      } else {
        navbar.classList.add("hiding");

        setTimeout(() => {
          navbar.classList.remove("no-transition");
          navbar.classList.add("is-transparent");
          navbar.classList.remove("hiding");
          navbar.classList.remove("no-transition");
        }, 550);
      }
    } else {
      navbar.classList.remove("is-transparent");
      navbar.classList.remove("hiding");
    }
  }
};

export const navTransparent = (
  navbar: HTMLDivElement,
  transparentNavbarIntersect: NodeListOf<HTMLElement>,
) => {
  let scrollY: number = window.scrollY;
  let scrollYPrev: number = scrollY;

  transparentNavbarIntersect.forEach((intersectElem) => {
    let intersectElemHeight: number = intersectElem.offsetHeight;
    navbar.classList.add("navbar-transparent");

    setNavTransparent(
      navbar,
      intersectElem,
      intersectElemHeight,
      scrollY,
      scrollYPrev,
    );

    window.addEventListener("resize", () => {
      intersectElemHeight = intersectElem.offsetHeight;

      setNavTransparent(
        navbar,
        intersectElem,
        intersectElemHeight,
        scrollY,
        scrollYPrev,
      );
    });

    window.addEventListener("scroll", () => {
      scrollY = window.scrollY;

      setNavTransparent(
        navbar,
        intersectElem,
        intersectElemHeight,
        scrollY,
        scrollYPrev,
      );
      scrollYPrev = scrollY;
    });
  });
};
