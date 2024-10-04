import { getBreakpoint, getPageZoom } from "./utilites";
import { setFullHeightStyle } from "./fullHeight";
import { isTouch } from ".";

const setWeGoStyle = (
  title: HTMLElement,
  sections: NodeListOf<HTMLElement>,
  sectionTitle: HTMLElement,
  sectionInner: HTMLElement,
  offset: number,
) => {
  title.removeAttribute("style");

  let totalSections = sections.length;

  for (let i = 0; i < totalSections; i++) {
    const cards: NodeListOf<HTMLElement> = sections[i].querySelectorAll(
      ".we-go-section-card",
    );
    sections[i].removeAttribute("style");

    for (let j = 0, cardLength = cards.length; j < cardLength; j++) {
      cards[j].removeAttribute("style");
    }
  }
  let windowHeight = window.innerHeight;
  let titleHeight = title.offsetHeight;
  let sectionTitleHeight = sectionTitle.offsetHeight;
  let sectionInnerHeight = sectionInner.offsetHeight;
  let totalHeight =
    titleHeight + sectionTitleHeight + sectionInnerHeight + offset;

  for (let i = 0; i < totalSections; i++) {
    const cards: NodeListOf<HTMLElement> = sections[i].querySelectorAll(
      ".we-go-section-card",
    );
    if (totalHeight >= windowHeight - 112 && getBreakpoint("md")) {
      for (let j = 0, cardLength = cards.length; j < cardLength; j++) {
        cards[j].style.maxHeight = "";
        cards[j].style.maxHeight = `${Math.max(
          144,
          windowHeight - (titleHeight + sectionTitleHeight + 56),
        )}px`;
      }
      sectionInnerHeight = sectionInner.offsetHeight;
      totalHeight =
        titleHeight + sectionTitleHeight + sectionInnerHeight + offset - 56;
    }
  }

  if (totalSections > 1) {
    // let offset = 0;
    title.style.paddingTop = `${(windowHeight - totalHeight) / 2}px`;
    title.style.marginBottom = `-${(windowHeight - totalHeight) / 2}px`;

    for (let i = 0; i < totalSections; i++) {
      // if (getBreakpoint("md")) offset = 32;
      sections[i].style.paddingTop = `${Math.max(
        title.offsetHeight,
        (windowHeight - totalHeight + titleHeight) / 2,
      )}px`;
    }
  } else {
    if (getBreakpoint("md")) {
      // Zoom fix - updated values below
      const offset = 68 * getPageZoom();
      title.style.paddingTop = `${(windowHeight - totalHeight) / 2 - offset}px`;
      title.style.marginBottom = `-${
        (windowHeight - totalHeight) / 2 - offset
      }px`;
      sectionTitle.style.marginBottom = `-1.7rem`;
      sections[0].style.paddingTop = `${
        (windowHeight - totalHeight) / 2 - offset
      }px`;
    } else {
      // Zoom fix - updated values below
      title.style.paddingTop = `${
        (windowHeight - totalHeight) / 2 + 24 * getPageZoom()
      }px`;
      title.style.marginBottom = `-${
        (windowHeight - totalHeight) / 2 - 40 * getPageZoom()
      }px`;
      sectionTitle.style.marginBottom = ``;
      sections[0].style.paddingTop = `${
        (windowHeight - totalHeight) / 2 - 24 * getPageZoom()
      }px`;
    }
  }
};

export const weGo = (disableFullHeight: HTMLElement | null) => {
  if (disableFullHeight) return;

  const containers: NodeListOf<HTMLElement> =
    document.querySelectorAll(".we-go");

  containers.forEach((container) => {
    const innerContainer: HTMLElement | null =
      container.querySelector(".we-go-inner");
    if (!innerContainer) return;

    const title: HTMLElement | null = container.querySelector(
      ".we-go-title-wrapper",
    );
    if (!title) return;

    const sectionTitle: HTMLElement | null = container.querySelector(
      ".we-go-section-title",
    );
    if (!sectionTitle) return;

    const sectionInner: HTMLElement | null = container.querySelector(
      ".we-go-section-inner",
    );
    if (!sectionInner) return;

    const sections: NodeListOf<HTMLElement> =
      container.querySelectorAll(".we-go-section");
    if (sections.length < 0) return;

    let offset = 80;

    if (getBreakpoint("max-md")) offset = -24;

    setWeGoStyle(title, sections, sectionTitle, sectionInner, offset);

    // Fix - 10 May 2024: Fix for overlapping text in we go section
    // Replace code from this line onwards
    let windowWidthPrev = window.innerWidth;
    let totalSections = sections.length;

    const setHeight = () => {
      if (totalSections > 1) {
        for (let i = 0; i < totalSections; i++) {
          if (i < totalSections - 1) {
            setFullHeightStyle(sections[i], "min", 0, null, 1.8, null, "svh");
          }
        }
      } else if (totalSections === 1) {
        setFullHeightStyle(sections[0], "min", 112, null, null, null, "svh");
      }
    };

    setHeight();

    window.addEventListener("resize", () => {
      if (navigator.maxTouchPoints > 0 === isTouch) {
        let windowWidth = window.innerWidth;

        if (windowWidth !== windowWidthPrev) {
          setWeGoStyle(title, sections, sectionTitle, sectionInner, offset);
          setHeight();
        }

        windowWidthPrev = windowWidth;
      } else {
        setWeGoStyle(title, sections, sectionTitle, sectionInner, offset);
        setHeight();
      }
    });
  });
};
