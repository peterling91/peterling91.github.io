import { getBreakpoint, getPageZoom } from "./utilites";
import { createIndicator, createEmptyImage } from "./carousel";

function arrangeCards(
  cardsWrapper: HTMLElement,
  cards: NodeListOf<HTMLElement>,
  carouselData: _carouselData,
) {
  cards.forEach((card, index) => {
    // Zoom fix - updated cardMargin value
    const cardWidth: number = card.offsetWidth;
    const cardHeight: number = card.offsetHeight;
    const offset = index - carouselData.activeIndex;
    let cardOffset: number = offset;
    let cardMargin: number = 80 * getPageZoom();
    let rotation: number = 7;

    if (getBreakpoint("xs") && getBreakpoint("max-sm")) {
      cardMargin = 96 * getPageZoom();
    }

    if (carouselData.activeIndex === 0) {
      cardsWrapper.style.transform = `translateX(${cardMargin * 0.5}px)`;
    } else {
      if (getBreakpoint("max-sm")) {
        cardsWrapper.style.transform = `translateX(-${
          (cardWidth + cardMargin) * carouselData.activeIndex - cardMargin * 0.5
        }px)`;
      } else {
        cardsWrapper.style.transform = `translateX(-${
          (cardWidth + cardMargin) * carouselData.activeIndex -
          (cardWidth - cardMargin * 0.5)
        }px)`;
      }
    }

    for (let i = 1; i < offset; i++) {
      cardOffset += cardOffset;
    }
    card.style.transform = `translateY(${Math.abs(
      (cardHeight / (rotation * Math.PI)) * cardOffset,
    )}px) rotate(${rotation * offset}deg)`;
  });
}

// Fix - 26 Apr 2024: 4) Alumni fan design (scrolling issue)
// Updated handleRelease
function handleRelease(
  cardsWrapper: HTMLElement,
  cards: NodeListOf<HTMLElement>,
  indicators: NodeListOf<HTMLElement>,
  carouselData: _carouselData,
  isTouch: boolean = false,
) {
  const swipeDistance = isTouch ? 50 : 0;

  if (carouselData.startX < carouselData.moveX - swipeDistance) {
    carouselData.updateActiveIndex(Math.max(0, carouselData.activeIndex - 1));
    switchActiveCard(cardsWrapper, cards, indicators, carouselData);
  } else if (carouselData.startX > carouselData.moveX + swipeDistance) {
    carouselData.updateActiveIndex(
      Math.min(cards.length - 1, carouselData.activeIndex + 1),
    );
    switchActiveCard(cardsWrapper, cards, indicators, carouselData);
  }
}

function switchActiveCard(
  cardsWrapper: HTMLElement,
  cards: NodeListOf<HTMLElement>,
  indicators: NodeListOf<HTMLElement>,
  carouselData: _carouselData,
) {
  cards.forEach((card) => {
    card.classList.remove("active");
    card.setAttribute("aria-disabled", "true");
  });

  indicators.forEach((indicator) => {
    indicator.classList.remove("active");
  });

  cards[carouselData.activeIndex].classList.add("active");
  cards[carouselData.activeIndex].removeAttribute("aria-disabled");
  indicators[carouselData.activeIndex].classList.add("active");

  arrangeCards(cardsWrapper, cards, carouselData);
}

class _carouselData {
  activeIndex: number;
  startX: number;
  moveX: number;
  isDragging: boolean;
  isFirefox: boolean;

  constructor() {
    this.activeIndex = 0;
    this.startX = 0;
    this.moveX = 0;
    this.isDragging = false;
    this.isFirefox = false;
  }
  updateActiveIndex(activeIndex: number) {
    this.activeIndex = activeIndex;
  }
  updateStartX(startX: number) {
    this.startX = startX;
  }
  updateMoveX(moveX: number) {
    this.moveX = moveX;
  }
  updateIsDragging(isDragging: boolean) {
    this.isDragging = isDragging;
  }
  updateIsFirefox(isFirefox: boolean) {
    this.isFirefox = isFirefox;
  }
}

const resize = (
  cardsWrapper: HTMLElement,
  cards: NodeListOf<HTMLElement>,
  carouselData: _carouselData,
) => {
  if (getBreakpoint("max-lg")) {
    arrangeCards(cardsWrapper, cards, carouselData);
  } else {
    cards.forEach((card) => {
      card.removeAttribute("style");
      cardsWrapper.removeAttribute("style");
    });
  }
};

export const arcCarousel = (isFirefox: boolean): void => {
  const carousels: NodeListOf<HTMLElement> =
    document.querySelectorAll(".arc-carousel");

  for (
    let i = 0, carouselsLength = carousels.length;
    i < carouselsLength;
    i++
  ) {
    const carousel: HTMLElement = carousels[i];
    const cardsWrapper: HTMLElement | null = carousel.querySelector(
      ".arc-carousel-cards",
    );
    if (!cardsWrapper) return;

    const cards: NodeListOf<HTMLElement> = carousel.querySelectorAll(".card");
    const images: NodeListOf<HTMLElement> =
      carousel.querySelectorAll(".card-header img");
    const carouselData = new _carouselData();

    if (isFirefox) {
      carouselData.updateIsFirefox(true);
    }

    cardsWrapper.setAttribute("draggable", "true");

    images.forEach((image) => {
      image.setAttribute("draggable", "false");
    });

    // Create empty image to replace thumbnail when dragging
    const emptyImage = createEmptyImage();

    // Create indicator
    const indicatorWrapper: HTMLDivElement = createIndicator(
      cards.length,
      carouselData.activeIndex,
    );
    carousel.append(indicatorWrapper);
    const indicators: NodeListOf<HTMLButtonElement> = carousel.querySelectorAll(
      ".carousel-indicator",
    );

    if (getBreakpoint("max-lg")) {
      arrangeCards(cardsWrapper, cards, carouselData);
    }

    window.addEventListener("resize", () =>
      resize(cardsWrapper, cards, carouselData),
    );

    // Click on indicator to go to page
    indicators.forEach((indicator, index) => {
      indicator.addEventListener("click", (event) => {
        event.preventDefault();

        if (getBreakpoint("max-lg")) {
          carouselData.updateActiveIndex(index);
          switchActiveCard(cardsWrapper, cards, indicators, carouselData);
        }
      });
    });

    // Mouse events for click-drag
    carousel.addEventListener("dragstart", (e) => {
      if (getBreakpoint("max-lg")) {
        carouselData.updateStartX(e.clientX);
      }
      // Set empty image as drag thumbnail
      if (e.dataTransfer) {
        e.dataTransfer.setDragImage(emptyImage, 0, 0);
      }
    });

    // When dragging
    carousel.addEventListener("drag", (e) => {
      if (carouselData.isFirefox) return;
      if (getBreakpoint("max-lg")) {
        if (e.clientX !== 0) {
          carouselData.updateMoveX(e.clientX);
        } else {
          carouselData.updateIsDragging(true);
          handleRelease(cardsWrapper, cards, indicators, carouselData);
        }
      }
    });

    // Go to slide after drag ends
    carousel.addEventListener("dragend", (e) => {
      if (getBreakpoint("max-lg")) {
        if (carouselData.isFirefox) carouselData.updateMoveX(e.clientX);

        if (carouselData.isDragging !== true || carouselData.isFirefox) {
          handleRelease(cardsWrapper, cards, indicators, carouselData);
          carouselData.updateIsDragging(false);
        }
      }
    });

    // Touch events for swipe
    carousel.addEventListener("touchstart", (e) => {
      if (getBreakpoint("max-lg")) {
        carouselData.updateStartX(e.touches[0].clientX);
        carouselData.updateIsDragging(true);
      }
    });

    carousel.addEventListener("touchmove", (e) => {
      if (getBreakpoint("max-lg")) {
        carouselData.updateMoveX(e.touches[0].clientX);
      }
    });

    carousel.addEventListener("touchend", () => {
      if (getBreakpoint("max-lg")) {
        // Fix - 26 Apr 2024: 4) Alumni fan design (scrolling issue)
        // Updated handleRelease
        handleRelease(cardsWrapper, cards, indicators, carouselData, true);
        carouselData.updateIsDragging(false);
      }
    });
  }
};
