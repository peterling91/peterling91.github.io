import { dropdownShow, dropdownHide } from "./dropdown";
import { getBreakpoint } from "./utilites";

const DELAY: number = 500;

const resize = (
  accordionButton: HTMLButtonElement,
  accordionContent: HTMLElement,
) => {
  accordionContent.classList.add("no-transition");

  if (getBreakpoint("md")) {
    dropdownShow(accordionButton, accordionContent, DELAY);
  } else {
    dropdownHide(accordionButton, accordionContent, DELAY);
  }
};

export const footer = () => {
  const footer: HTMLElement | null = document.querySelector(".footer");

  if (!footer) return;

  const accordions: NodeListOf<HTMLElement> =
    footer.querySelectorAll(".footer-accordion");

  for (
    let i = 0, accordionsLength = accordions.length;
    i < accordionsLength;
    i++
  ) {
    const accordion: HTMLElement = accordions[i];
    const accordionButton: HTMLButtonElement | null = accordion.querySelector(
      ".footer-accordion-button",
    );
    if (!accordionButton) return;

    const accordionContent: HTMLElement | null = accordion.querySelector(
      ".footer-accordion-content",
    );
    if (!accordionContent) return;

    // Click to toggle accordion
    accordionButton.addEventListener("click", (event: Event) => {
      // Prevent page from jumping to the top
      event.preventDefault();

      accordionContent.classList.remove("no-transition");

      if (getBreakpoint("max-md")) {
        // Toggle accordion
        const isExpanded: string | null =
          accordionButton.getAttribute("aria-expanded");

        if (isExpanded === "true") {
          dropdownHide(accordionButton, accordionContent, DELAY);
        } else {
          // Collapse all other items in the accordion
          for (
            let j = 0, itemsLength = accordions.length;
            j < itemsLength;
            j++
          ) {
            // Skip chosen item
            if (j === i) {
              continue;
            }

            /*--- All variables in this scope ---*/
            const otherItem: HTMLElement = accordions[j];
            const otherButton: HTMLDivElement | null = otherItem.querySelector(
              ".footer-accordion-button",
            );
            const otherContent: HTMLDivElement | null = otherItem.querySelector(
              ".footer-accordion-content",
            );

            // Only runs code if "otherContent" is in document, prevents console error
            if (otherButton && otherContent) {
              dropdownHide(otherButton, otherContent, DELAY);
            }
          }
          dropdownShow(accordionButton, accordionContent, DELAY);
        }
      }
    });

    window.addEventListener("resize", () =>
      resize(accordionButton, accordionContent),
    );
  }
};
