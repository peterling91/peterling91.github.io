import { getBreakpoint, getPageZoom } from "./utilites";

/*====================================================
  3 Carousel Card
====================================================*/
export const threeCardCarousel = () => {
  const carousels: NodeListOf<HTMLElement> = document.querySelectorAll(
    ".three-deck-component .carousel",
  );

  threeCardCarouselInit(carousels);
  threeCardCarouselUpdate(carousels);
};

const threeCardCarouselInit = (carousels: NodeListOf<HTMLElement>): void => {
  carousels.forEach((carousel) => {
    // Initialize the carousel items
    // const carouselList = document.querySelector(
    //   ".carousel__list",
    // ) as HTMLElement | null;
    const carouselItems = carousel.querySelectorAll(".carousel__item");
    const elems = Array.from(carouselItems) as HTMLElement[];

    // Function to calculate the new position
    const getPos = (current: string, active: string): number => {
      const diff = parseInt(current) - parseInt(active);
      const itemCount = elems.length;
      // console.log("Item Count:", itemCount); // This will log the item count

      // Adjust the logic for 4 items
      if (itemCount === 4) {
        // Adjust logic for 4 items
        if (diff === 3 || diff === -1) {
          return -1; // Move one step back
        } else if (diff === -3 || diff === 1) {
          return 1; // Move one step forward
        } else if (diff === 2 || diff === -2) {
          return 2; // The card that was at the farthest end moves to the position before the active card
        } else {
          return 0; // Active card stays in place
        }
      } else {
        // Existing logic for 3 items
        if (diff === 2) {
          return -1;
        } else if (diff === -2) {
          return 1;
        } else {
          return diff;
        }
      }
    };

    // Update function for changing the active item
    const update = (newActive: HTMLElement): void => {
      const newActivePos = (newActive.dataset as any).pos;

      elems.forEach((item) => {
        const itemPos = (item.dataset as any).pos;
        (item.dataset as any).pos = getPos(itemPos, newActivePos).toString();
      });
    };

    // Function to move to the next item
    const moveToNext = (): void => {
      const currentActive = elems.find(
        (elem) => (elem.dataset as any).pos === "0",
      ) as HTMLElement | undefined;

      if (currentActive) {
        const nextIndex = (elems.indexOf(currentActive) + 1) % elems.length;
        const nextActive = elems[nextIndex];
        update(nextActive);
      }
    };
    // Function to move to the previous item
    const moveToPrev = (): void => {
      const currentActive = elems.find(
        (elem) => (elem.dataset as any).pos === "0",
      ) as HTMLElement | undefined;

      if (currentActive) {
        const prevIndex =
          (elems.indexOf(currentActive) - 1 + elems.length) % elems.length;
        const prevActive = elems[prevIndex];
        update(prevActive);
      }
    };

    // Set up initial state on page load
    window.onload = () => {
      const initialActive = elems.find(
        (elem) => (elem.dataset as any).pos === "0",
      ) as HTMLElement | undefined;
      if (initialActive) {
        update(initialActive);
      }
    };

    // Attach event listeners to the buttons
    const prevButton = document.getElementById(
      "prevCarouselButton",
    ) as HTMLButtonElement | null;
    const nextButton = document.getElementById(
      "nextCarouselButton",
    ) as HTMLButtonElement | null;

    if (prevButton && nextButton) {
      prevButton.addEventListener("click", moveToPrev);
      nextButton.addEventListener("click", moveToNext);
    }

    const initialActive = elems.find(
      (elem) => (elem.dataset as any).pos === "0",
    );
    if (initialActive) {
      update(initialActive);
    }
  });
};

const threeCardCarouselUpdate = (carousels: NodeListOf<HTMLElement>) => {
  carousels.forEach((carousel) => {
    function updateThreeDeckComponent() {
      const carouselItem = carousel.querySelector(
        '.carousel__item.stacked-card-carousel-item[data-pos="0"]',
      );

      if (!carouselItem) return;

      if (getBreakpoint("lg")) {
        let distanceFromLeft = carouselItem.getBoundingClientRect().left;

        // Zoom fix - updated newLeft value
        let newLeft = distanceFromLeft - 15 * getPageZoom(); // Subtract 15px from the distance
        let styleTag = document.getElementById("dynamic-styles");

        if (!styleTag) {
          styleTag = document.createElement("style");
          styleTag.id = "dynamic-styles";
          document.head.appendChild(styleTag);
        }
        styleTag.textContent = `.three-deck-component:after { left: ${newLeft}px; }`;
      } else {
        let distanceFromLeft = carouselItem.getBoundingClientRect().left;

        // Zoom fix - updated newLeft value
        let newLeft = distanceFromLeft - 15 * getPageZoom(); // Subtract 15px from the distance
        let styleTag = document.getElementById("dynamic-styles");

        if (!styleTag) {
          styleTag = document.createElement("style");
          styleTag.id = "dynamic-styles";
          document.head.appendChild(styleTag);
        }
        styleTag.textContent = `.three-deck-component:after { left: ${newLeft}px; }`;
      }
    }

    // Run with a delay after load
    setTimeout(updateThreeDeckComponent, 500);

    // Fix - 01 May 2024 - only reset carousel if width changes to prevent lag in mobile
    let windowWidthPrev = window.innerWidth;

    window.addEventListener("resize", () => {
      let windowWidth = window.innerWidth;

      if (window.innerWidth !== windowWidthPrev) {
        updateThreeDeckComponent();
      }
      windowWidthPrev = windowWidth;
    });
    carousel.addEventListener("click", updateThreeDeckComponent);
  });
};
