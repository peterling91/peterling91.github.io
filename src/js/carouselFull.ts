import {
  cursorPostion,
  createEmptyImage,
  createIndicator,
  setActiveIndicator,
  removeHiddenSlide,
} from "./carousel";

/*====================================================
  Reusable functions, see main function below
====================================================*/
// Set images size to 16:9 for full carousel
const setImageSizeFull = (
  slides: NodeListOf<HTMLElement>,
  data: carouselFullData,
) => {
  for (let i = 0, slidesLength = slides.length; i < slidesLength; i++) {
    const slide: HTMLElement = slides[i];
    slide.style.width = `${data.carouselWidth}px`;
    slide.style.height = `${(data.carouselWidth / 16) * 9}px`;
  }
};

// Go to active slide for full carousel
const goToActiveSlideFull = (
  slidesWrapper: HTMLElement,
  images: NodeListOf<HTMLElement>,
  data: carouselFullData,
) => {
  const newSlidePosition = -1 * (data.carouselWidth * data.activeIndex);
  slidesWrapper.style.transform = `translateX(${newSlidePosition}px)`;
  data.updateDragPosition(newSlidePosition);
  images[data.prevActiveIndex].setAttribute("aria-current", "false");
  images[data.activeIndex].setAttribute("aria-current", "true");
};

// Fix - 26 Apr 2024: 6) Jerky scrolling
// Updated swipeToActiveSlideFull

// Go to active slide for full carousel
const swipeToActiveSlideFull = (
  carousel: HTMLElement,
  slidesWrapper: HTMLElement,
  slides: NodeListOf<HTMLElement>,
  images: NodeListOf<HTMLElement>,
  data: carouselFullData,
  cursor: cursorPostion,
  isTouch: boolean = false,
) => {
  const swipeDistance = isTouch ? 50 : 0;

  if (isTouch && cursor.deltaX < swipeDistance && cursor.deltaX >= 0) return;
  if (isTouch && cursor.deltaX > -swipeDistance && cursor.deltaX <= 0) return;

  if (cursor.deltaX !== 0) {
    data.updatePrevActiveIndex(data.activeIndex);

    if (cursor.deltaX > 0) {
      // Go back
      data.updateActiveIndex(Math.max(0, data.activeIndex - 1));
    } else {
      // Go next
      data.updateActiveIndex(Math.min(slides.length - 1, data.activeIndex + 1));
    }
    goToActiveSlideFull(slidesWrapper, images, data);
    setActiveIndicator(carousel, data.activeIndex);
  }
};

// Drag to go to slide for full carousel
const dragImageFull = (
  slidesWrapper: HTMLElement,
  data: carouselFullData,
  cursor: cursorPostion,
  currCursorPosition: number,
) => {
  if (data.totalSlides > 1) {
    const currentSlidePosition: number =
      -1 * (data.activeIndex * data.carouselWidth);
    const cursorDelta: number = currCursorPosition - cursor.clientX;

    slidesWrapper.classList.add("no-transition");

    if (currCursorPosition !== 0) {
      switch (data.activeIndex) {
        case 0:
          if (currCursorPosition > cursor.clientX) {
            data.updateDragPosition(0);
          } else {
            data.updateDragPosition(
              Math.max(
                currentSlidePosition + -data.carouselWidth,
                currentSlidePosition + cursorDelta,
              ),
            );
          }
          break;
        case data.totalSlides - 1:
          if (currCursorPosition > cursor.clientX) {
            data.updateDragPosition(
              Math.min(
                currentSlidePosition + data.carouselWidth,
                currentSlidePosition + cursorDelta,
              ),
            );
          } else {
            data.updateDragPosition(currentSlidePosition);
          }
          break;
        default:
          if (currCursorPosition > cursor.clientX) {
            data.updateDragPosition(
              Math.min(
                currentSlidePosition + data.carouselWidth,
                currentSlidePosition + cursorDelta,
              ),
            );
          } else {
            data.updateDragPosition(
              Math.max(
                currentSlidePosition + -data.carouselWidth,
                currentSlidePosition + cursorDelta,
              ),
            );
          }
          break;
      }
      slidesWrapper.style.transform = `translateX(${data.dragPosition}px)`;
    }
  }
};

/*====================================================
  Classes
====================================================*/
export class carouselFullData {
  activeIndex: number;
  prevActiveIndex: number;
  totalSlides: number;
  carouselWidth: number;
  dragPosition: number;
  isLoop: boolean;
  isFirefox: boolean;

  constructor() {
    this.activeIndex = 0;
    this.prevActiveIndex = 0;
    this.totalSlides = 0;
    this.carouselWidth = 0;
    this.dragPosition = 0;
    this.isLoop = false;
    this.isFirefox = false;
  }
  updateActiveIndex(activeIndex: number) {
    this.activeIndex = activeIndex;
  }
  updatePrevActiveIndex(prevActiveIndex: number) {
    this.prevActiveIndex = prevActiveIndex;
  }
  updateTotalSlides(totalSlides: number) {
    this.totalSlides = totalSlides;
  }
  updateCarouselWidth(carouselWidth: number) {
    this.carouselWidth = carouselWidth;
  }
  updateDragPosition(dragPosition: number) {
    this.dragPosition = dragPosition;
  }
  updateIsFirefox(isFirefox: boolean) {
    this.isFirefox = isFirefox;
  }
}

const resize = (
  carousel: HTMLElement,
  slidesWrapper: HTMLElement,
  slides: NodeListOf<HTMLElement>,
  images: NodeListOf<HTMLElement>,
  data: carouselFullData,
) => {
  data.updateCarouselWidth(carousel.offsetWidth);
  setImageSizeFull(slides, data);
  goToActiveSlideFull(slidesWrapper, images, data);
};

/*========================================
  Main function here
========================================*/
export const carouselFull = (isFirefox: boolean) => {
  const carousels: NodeListOf<HTMLElement> =
    document.querySelectorAll(".carousel-full");

  for (
    let i = 0, carouselsLength = carousels.length;
    i < carouselsLength;
    i++
  ) {
    const carousel: HTMLElement = carousels[i];
    const slidesWrapper: HTMLElement | null = carousel.querySelector(
      ".carousel-full-items",
    );

    if (!slidesWrapper) return;

    let slides: NodeListOf<HTMLElement> = carousel.querySelectorAll(
      ".carousel-full-item",
    );
    removeHiddenSlide(slides);
    slides = carousel.querySelectorAll(".carousel-full-item");

    if (slides.length <= 1) return;

    const images: NodeListOf<HTMLElement> = carousel.querySelectorAll(
      ".carousel-full-image",
    );

    // Create empty image to replace thumbnail when dragging
    const emptyImage = createEmptyImage();

    // To track cursor position for dragging slides
    const cursor = new cursorPostion();

    // Initialise carousel data
    removeHiddenSlide(slides);
    slides = carousel.querySelectorAll(".carousel-full-item");
    const data = new carouselFullData();
    data.updateActiveIndex(0);
    data.updatePrevActiveIndex(data.activeIndex);
    data.updateTotalSlides(slides.length);
    data.updateCarouselWidth(carousel.offsetWidth);
    setImageSizeFull(slides, data);
    goToActiveSlideFull(slidesWrapper, images, data);
    slidesWrapper.setAttribute("draggable", "true");

    if (isFirefox) {
      data.updateIsFirefox(true);
    }

    images.forEach((image) => {
      image.setAttribute("draggable", "false");
    });

    // Create indicators
    const indicatorWrapper = createIndicator(slides.length, data.activeIndex);
    carousel.append(indicatorWrapper);

    const indicators: NodeListOf<HTMLButtonElement> = carousel.querySelectorAll(
      ".carousel-indicator",
    );

    // Initialise carousel data when dialog shows
    const dialogShowButtons: NodeListOf<HTMLElement> =
      document.querySelectorAll("[data-dialog]");

    for (
      let j = 0, dialogShowButtonsLength = dialogShowButtons.length;
      j < dialogShowButtonsLength;
      j++
    ) {
      const dialogShowButton: HTMLElement = dialogShowButtons[j];
      const dialogName: string | null =
        dialogShowButton.getAttribute("data-dialog-target");
      const dialog: HTMLDialogElement | null = dialogName
        ? document.querySelector(`#${dialogName}`)
        : null;

      if (dialog) {
        const tab: HTMLElement | null = dialog.querySelector(".side-tabs");
        const selectMenuItems: NodeListOf<HTMLAnchorElement> =
          dialog.querySelectorAll(
            ".side-tabs-select-wrapper-inner > .form-select .dropdown-menu-item",
          );

        dialogShowButton.addEventListener("click", () => {
          setTimeout(() => {
            data.updateCarouselWidth(carousel.offsetWidth);
            setImageSizeFull(slides, data);
            goToActiveSlideFull(slidesWrapper, images, data);
          }, 500);
        });

        if (tab) {
          const tabItems: NodeListOf<HTMLElement> = dialog.querySelectorAll(
            ".side-tabs > .side-tabs-item",
          );

          tab.addEventListener("keydown", () => {
            data.updateCarouselWidth(carousel.offsetWidth);
            setImageSizeFull(slides, data);
            goToActiveSlideFull(slidesWrapper, images, data);
          });

          tabItems.forEach((tabItem) => {
            tabItem.addEventListener("click", () => {
              data.updateCarouselWidth(carousel.offsetWidth);
              setImageSizeFull(slides, data);
              goToActiveSlideFull(slidesWrapper, images, data);
            });
          });

          selectMenuItems.forEach((selectMenuItem) => {
            selectMenuItem.addEventListener("click", () => {
              data.updateCarouselWidth(carousel.offsetWidth);
              setImageSizeFull(slides, data);
              goToActiveSlideFull(slidesWrapper, images, data);
            });
          });
        }
      }
    }

    // Fix - 01 May 2024 - only reset carousel if width changes to prevent lag in mobile
    let windowWidthPrev = window.innerWidth;

    window.addEventListener("resize", () => {
      let windowWidth = window.innerWidth;

      if (window.innerWidth !== windowWidthPrev) {
        resize(carousel, slidesWrapper, slides, images, data);
      }
      windowWidthPrev = windowWidth;
    });

    /*========================================
        Click on indicator to go to slide
      ========================================*/
    for (
      let j = 0, indicatorsLength = indicators.length;
      j < indicatorsLength;
      j++
    ) {
      indicators[j].addEventListener("click", (event) => {
        event.preventDefault();
        data.updatePrevActiveIndex(data.activeIndex);
        data.updateActiveIndex(j);

        goToActiveSlideFull(slidesWrapper, images, data);
        setActiveIndicator(carousel, data.activeIndex);
      });
    }

    /*========================================
        Drag to go to slide (mouse)
      ========================================*/
    // Track cursor position when dragging starts
    slidesWrapper.addEventListener("dragstart", (e) => {
      // Cache the client X coordinates
      cursor.updateClient(e.clientX);

      // Set empty image as drag thumbnail
      if (e.dataTransfer) {
        e.dataTransfer.setDragImage(emptyImage, 0, 0);
      }
    });

    // When dragging (firefox)
    slidesWrapper.addEventListener("dragover", (e) => {
      if (data.isFirefox) {
        e.preventDefault();
        cursor.updateDelta(e.clientX - cursor.clientX);

        dragImageFull(slidesWrapper, data, cursor, e.clientX);

        setTimeout(() => {
          slidesWrapper.classList.remove("no-transition");
        }, 1);
      }
    });

    // When dragging
    slidesWrapper.addEventListener("drag", (e) => {
      if (data.isFirefox) return;
      if (e.clientX !== 0) {
        cursor.updateDelta(e.clientX - cursor.clientX);

        dragImageFull(slidesWrapper, data, cursor, e.clientX);

        setTimeout(() => {
          slidesWrapper.classList.remove("no-transition");
        }, 1);
      } else {
        cursor.updateIsDragging(true);
        slidesWrapper.classList.remove("no-transition");
        swipeToActiveSlideFull(
          carousel,
          slidesWrapper,
          slides,
          images,
          data,
          cursor,
        );
      }
    });

    // Go to slide after drag ends
    slidesWrapper.addEventListener("dragend", () => {
      if (data.isFirefox) return;
      if (cursor.isDragging !== true) {
        slidesWrapper.classList.remove("no-transition");
        swipeToActiveSlideFull(
          carousel,
          slidesWrapper,
          slides,
          images,
          data,
          cursor,
        );
        cursor.updateIsDragging(false);
      }
    });

    // Go to slide after drag ends (firefox)
    slidesWrapper.addEventListener("drop", (e) => {
      if (data.isFirefox) {
        cursor.updateDelta(e.clientX - cursor.clientX);
        slidesWrapper.classList.remove("no-transition");
        swipeToActiveSlideFull(
          carousel,
          slidesWrapper,
          slides,
          images,
          data,
          cursor,
        );
      }
    });

    /*========================================
        Drag to go to slide (touch)
      ========================================*/
    // Track finger position when swiping starts
    slidesWrapper.addEventListener("touchstart", (e) => {
      // Cache the client X coordinates
      cursor.updateClient(e.touches[0].clientX);
      cursor.updateClientY(e.touches[0].clientY);
      cursor.updateIsDragging(true);
    });

    // Fix - 26 Apr 2024: 6) Jerky scrolling
    // Removed touchmove listener

    // When dragging
    // slidesWrapper.addEventListener("touchmove", (e) => {
    //   dragImageFull(slidesWrapper, data, cursor, e.touches[0].clientX);
    // });

    // Go to the previous or next image when swiping stops
    slidesWrapper.addEventListener("touchend", (e) => {
      // Compute the change in X coordinates
      cursor.updateDelta(e.changedTouches[0].clientX - cursor.clientX);
      cursor.updateIsDragging(false);

      slidesWrapper.classList.remove("no-transition");

      // Fix - 26 Apr 2024: 6) Jerky scrolling
      // Updated swipeToActiveSlideFull

      // Go to previous or next slide
      swipeToActiveSlideFull(
        carousel,
        slidesWrapper,
        slides,
        images,
        data,
        cursor,
        true,
      );
    });

    // Prevent page from scrolling up and down while swiping through carousel
    carousel.addEventListener("touchmove", (e) => {
      const moveX = e.touches[0].clientX - cursor.clientX;
      const moveY = e.touches[0].clientY - cursor.clientY;

      if (Math.abs(moveX) > Math.abs(moveY)) {
        e.preventDefault(); // Prevents vertical scroll
      }
    });
  }
};
