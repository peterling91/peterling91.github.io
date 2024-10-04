// Android fix - Updated lenisMain

// Lenis (plugin): https://github.com/darkroomengineering/lenis
import Lenis from "lenis";

import { smoothScroll } from "./utilites";

/*====================================================
  Reusable functions, see main function below
====================================================*/
// Collapse accordion item
const collapseAccordion = (item: HTMLElement, content: HTMLElement) => {
  item.setAttribute("data-accordion-expanded", "false");

  content.classList.add("collapsing");
  content.style.maxHeight = "0";

  setTimeout(() => {
    content.classList.remove("collapsing");
  }, 300);
};

// Expand accordion item
const expandAccordion = (
  items: NodeListOf<HTMLElement>,
  item: HTMLElement,
  itemIndex: number,
  content: HTMLElement,
  scrollOffset: number,
  lenisMain: null | Lenis, // Android fix - Updated lenisMain
) => {
  // Fix - 29 Apr 2024 - Accordion not expanding if there's only 1 item
  // Added itemsLength
  let itemsLength = items.length;

  // Fix - 29 Apr 2024 - Accordion not expanding if there's only 1 item
  // Added if conditions

  // Collapse all other items in the accordion
  if (itemsLength > 1) {
    for (let i = 0; i < itemsLength; i++) {
      // Skip chosen item
      if (i === itemIndex) {
        continue;
      }

      /*--- All variables in this scope ---*/
      const otherItem: HTMLElement = items[i];
      const otherContent: HTMLDivElement | null =
        otherItem.querySelector(".accordion-content");

      // Only runs code if "otherContent" is in document, prevents console error
      if (otherContent) {
        collapseAccordion(otherItem, otherContent);
      }
    }
  }

  // Expand chosen item
  item.setAttribute("data-accordion-expanded", "true");
  content.classList.add("expanding");

  setTimeout(() => {
    // Fix - 01 May 2024 - Fix: Accordion is cropped off in modal
    // Added if conditions
    if (content.scrollHeight > 0) {
      content.style.maxHeight = `${content.scrollHeight + 80}px`;
    } else {
      content.style.maxHeight = `none`;
    }
    content.classList.remove("expanding");
  }, 1);

  // Fix - 01 May 2024 - Adjusted scroll to position
  const stickyBarTop = document.querySelector(".sticky-bar-top");
  let dialogBody: HTMLElement | null = null;

  // To check if accordion is inside a modal
  const checkIfInsideDialog = (item: HTMLElement) => {
    const parent = item.parentElement;

    if (parent) {
      const isDialog = parent.classList.contains("dialog-body-content");

      if (!isDialog) checkIfInsideDialog(parent);

      if (isDialog) dialogBody = parent;
    }
  };

  checkIfInsideDialog(item);

  setTimeout(() => {
    if (dialogBody) {
      // If accordion is inside a modal
      smoothScroll(item, `${-181}`, dialogBody, 400);
    } else {
      // If accordion is NOT inside a modal
      let windowTop = window.scrollY;
      let itemTop =
        windowTop + item.getBoundingClientRect().top + scrollOffset - 92;
      let offset = 92;

      // Check if scrolling up or down
      if (windowTop < itemTop && !stickyBarTop) offset = 24;

      // Scroll to target
      smoothScroll(item, `${scrollOffset - offset}`, null, 400);
    }
  }, 301);
};

const resize = (items: NodeListOf<HTMLElement>) => {
  items.forEach((item) => {
    const content: HTMLElement | null =
      item.querySelector(".accordion-content");
    if (!content) return;

    const isExpanded = item.getAttribute("data-accordion-expanded");

    if (isExpanded === "true") {
      // Fix - 01 May 2024 - Fix: Accordion is cropped off in modal
      // Added if conditions
      if (content.scrollHeight > 0) {
        content.style.maxHeight = `${content.scrollHeight + 80}px`;
      } else {
        content.style.maxHeight = `none`;
      }
    }
  });
};

/*========================================
  Main function here
========================================*/
export const accordion = (
  lenisMain: null | Lenis, // Android fix - Updated lenisMain
): void => {
  const accordions = document.querySelectorAll<HTMLElement>(".accordion");

  accordions.forEach((accordion) => {
    const items = accordion.querySelectorAll<HTMLElement>(".accordion-item");

    items.forEach((item, itemIndex) => {
      const trigger: HTMLElement | null =
        item.querySelector(".accordion-header");
      if (!trigger) return;

      const content: HTMLElement | null =
        item.querySelector(".accordion-content");
      if (!content) return;

      const customScrollOffset = accordion.getAttribute(
        "data-accordion-scroll-offset",
      );
      const scrollOffset = customScrollOffset
        ? parseInt(customScrollOffset, 10)
        : 0;

      // Click to toggle accordion
      trigger.addEventListener("click", () => {
        const isExpanded = item.getAttribute("data-accordion-expanded");

        if (isExpanded === "true") {
          collapseAccordion(item, content);
        } else {
          expandAccordion(
            items,
            item,
            itemIndex,
            content,
            scrollOffset,
            lenisMain,
          );
        }
      });
    });

    window.addEventListener("resize", () => resize(items));
  });
};
