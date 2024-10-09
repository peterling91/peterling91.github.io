import { getBreakpoint, getPageZoom } from "./utilites";

/*====================================================
  Reusable functions, see main function below
====================================================*/
// Get total number of slides
const getTotalSlides = (
  slidesWrapper: HTMLElement,
  slides: NodeListOf<HTMLElement>,
  data: carouselData,
) => {
  let totalWidth: number = -(data.offset * 2.5);
  let imageWidth: number = data.imageWidth + data.offset * 2;

  // let prevImageWidth: number;

  // if (isLoopPages(data)) {
  //   for (let i = 0, slidesLength = slides.length; i < slidesLength; i++) {
  //     imageWidth = slides[data.activeIndex].offsetWidth + data.offset * 2;
  //     totalWidth += imageWidth;
  //   }
  // } else {
  //   imageWidth = slides[0].offsetWidth + data.offset * 2;
  //   totalWidth += slides.length * imageWidth;
  //   // prevImageWidth = imageWidth;

  //   // for (let j = 0, slidesLength = slides.length; j < slidesLength; j++) {
  //   //   imageWidth = slides[j].offsetWidth + data.offset * 2;
  //   //   totalWidth += imageWidth;

  //   //   if (imageWidth < prevImageWidth) {
  //   //     totalWidth -= prevImageWidth - imageWidth;
  //   //   }
  //   //   prevImageWidth = imageWidth;
  //   // }
  // }

  if (isLoopPages(data)) {
    imageWidth = slides[data.activeIndex].offsetWidth + data.offset * 2;
  } else {
    imageWidth = slides[0].offsetWidth + data.offset * 2;
  }

  if (imageWidth === data.offset * 2) {
    const currentSlide: HTMLElement | null = slidesWrapper.querySelector(
      ".carousel-card-cropped-item",
    );
    if (currentSlide) imageWidth = currentSlide.offsetWidth + data.offset * 2;
  }

  totalWidth += slides.length * imageWidth;
  return Math.ceil(totalWidth / data.carouselWidth);
};

// Remove slides with class "hidden"
export const removeHiddenSlide = (slides: NodeListOf<HTMLElement>) => {
  for (let i = 0, slidesLength = slides.length; i < slidesLength; i++) {
    const slide = slides[i];

    if (slide.classList.contains("hidden")) slide.remove();
  }
};

// Get total number of images in a slide
const getImagesPerSlide = (data: carouselData) => {
  return Math.floor(data.carouselWidth / (data.imageWidth - data.offset));
};

// Get active slide
const getActiveIndex = (data: carouselData, index: number) => {
  let newIndex = index;

  if (data.imagesPerSlide > data.prevImagesPerSlide) {
    newIndex = Math.min(
      Math.floor(index * (data.imagesPerSlide / data.prevImagesPerSlide)),
      data.totalSlides - 1,
    );
  }
  if (data.imagesPerSlide < data.prevImagesPerSlide) {
    newIndex = Math.min(
      Math.floor(index * (data.prevImagesPerSlide / data.imagesPerSlide)),
      data.totalSlides - 1,
    );
  }
  return newIndex;
};

// Get width of each image
const getImageWidth = (
  slidesWrapper: HTMLElement,
  slides: NodeListOf<HTMLElement>,
  data: carouselData,
) => {
  let imageWidth: number = data.imageWidth + data.offset * 2;
  // let prevImageWidth: number;
  // let defaultImageWidth: number = 0;

  if (isLoopPages(data)) {
    imageWidth = slides[data.activeIndex].offsetWidth + data.offset * 2;
  } else {
    imageWidth = slides[0].offsetWidth + data.offset * 2;
  }

  if (imageWidth === data.offset * 2) {
    const currentSlide: HTMLElement | null = slidesWrapper.querySelector(
      ".carousel-card-cropped-item",
    );
    if (currentSlide) imageWidth = currentSlide.offsetWidth + data.offset * 2;
  }

  return imageWidth;

  // if (isLoopPages(data)) {
  //   for (let i = 0, slidesLength = slides.length; i < slidesLength; i++) {
  //     if (slides[i].classList.contains("active")) {
  //       defaultImageWidth = slides[i].offsetWidth + data.offset * 2;
  //       break;
  //     }
  //   }
  //   if (defaultImageWidth === 0) {
  //     defaultImageWidth = slides[0].offsetWidth + data.offset * 2;
  //   }
  // } else {
  //   imageWidth = slides[0].offsetWidth + data.offset * 2;
  //   // prevImageWidth = imageWidth;
  //   defaultImageWidth = imageWidth;

  //   // for (let i = 0, slidesLength = slides.length; i < slidesLength; i++) {
  //   //   imageWidth = slides[i].offsetWidth + data.offset * 2;

  //   //   if (imageWidth <= prevImageWidth) {
  //   //     defaultImageWidth = imageWidth;
  //   //   }
  //   //   prevImageWidth = imageWidth;
  //   // }
  // }
  // return defaultImageWidth;
};

const isBreakpoint = (data: carouselData) => {
  if (!data.breakpoint) return true;

  if (data.breakpoint) {
    if (getBreakpoint(data.breakpoint)) {
      return true;
    } else {
      return false;
    }
  }
  return false;
};

const isLoopPages = (data: carouselData) => {
  // if (data.isLoop && data.totalSlides > 3 && getBreakpoint("max-md")) {
  if (data.isLoop && data.totalSlides > 1) {
    return true;
  }
  return false;
};

// Set active slide
const setActiveSlide = (
  slides: NodeListOf<HTMLElement>,
  data: carouselData,
) => {
  slides.forEach((slide) => {
    slide.classList.remove("active");
  });

  if (data.imagesPerSlide === 1) {
    slides[data.activeIndex].classList.add("active");
  } else {
    let maxImages: number;
    let imageWidth: number;

    switch (data.activeIndex) {
      case 0:
        maxImages = Math.min(data.imagesPerSlide, slides.length);

        for (let i = 0; i < maxImages; i++) {
          slides[data.activeIndex + i].classList.add("active");
        }
        break;
      case data.totalSlides - 1:
        maxImages = Math.min(data.imagesPerSlide, slides.length);

        for (let j = maxImages; j > 0; j--) {
          slides[slides.length - j].classList.add("active");
        }
        break;
      default:
        maxImages = data.imagesPerSlide;

        for (let k = 0; k < maxImages; k++) {
          imageWidth = slides[k].offsetWidth + data.offset * 2;

          if (imageWidth > data.imageWidth) {
            maxImages -= 1;
          }

          slides[data.activeIndex * data.imagesPerSlide + k].classList.add(
            "active",
          );
        }
        break;
    }
  }
};

// Go to active slide
const goToActiveSlide = (
  slidesWrapper: HTMLElement,
  data: carouselData,
  slides: NodeListOf<HTMLElement>,
) => {
  const slidesWrapperWidth: number = slidesWrapper.scrollWidth;
  let offset: number = data.offset;
  let scroll: number = 0;
  // let imagesScrolledPass: number = Math.min(
  //   data.imagesPerSlide * data.activeIndex,
  //   slides.length - data.imagesPerSlide,
  // );
  // let distanceScrolledPass: number = 0;
  let imageWidth: number = 0;

  switch (data.activeIndex) {
    case 0:
      offset = data.offset;

      if (getBreakpoint("lg") && data.hasSideNav) offset = 0;

      scroll = offset;
      break;
    case data.totalSlides - 1:
      offset = data.offset;

      if (getBreakpoint("lg") && data.hasSideNav) offset = 0;

      scroll = -1 * (slidesWrapperWidth - data.carouselWidth + offset);
      break;
    default:
      offset = data.offset * 1.5;

      if (data.isSingleCol) offset = data.offset;
      imageWidth = slides[0].offsetWidth + data.offset;
      // distanceScrolledPass = 0;

      // for (let i = 0; i < imagesScrolledPass; i++) {
      //   imageWidth = slides[i].offsetWidth + data.offset;
      //   distanceScrolledPass += imageWidth;

      //   if (imageWidth > data.imageWidth) {
      //     imagesScrolledPass -= 1;
      //   }
      // }
      // scroll = -1 * distanceScrolledPass + offset;
      scroll =
        -1 * (data.activeIndex * imageWidth * data.imagesPerSlide) + offset;
      break;
  }
  slidesWrapper.classList.remove("no-transition");
  slidesWrapper.style.transform = `translateX(${scroll}px)`;
  data.updateDragPosition(scroll);
  setActiveSlide(slides, data);
};

// Fix - 26 Apr 2024: 6) Jerky scrolling
// Updated swipeToActiveSlide

// Go to active slide
const swipeToActiveSlide = (
  carousel: HTMLElement,
  slidesWrapper: HTMLElement,
  data: carouselData,
  cursor: cursorPostion,
  slides: NodeListOf<HTMLElement>,
  slideNamePrev: HTMLElement | null,
  slideNameNext: HTMLElement | null,
  arrowBack: HTMLButtonElement | null,
  arrowNext: HTMLButtonElement | null,
  isTouch: boolean = false,
) => {
  const swipeDistance = isTouch ? 50 : 0;
  let direction: "back" | "next" = "next";

  if (isTouch && cursor.deltaX < swipeDistance && cursor.deltaX >= 0) return;
  if (isTouch && cursor.deltaX > -swipeDistance && cursor.deltaX <= 0) return;

  if (cursor.deltaX !== 0) {
    data.updatePrevIndex(data.activeIndex);

    if (cursor.deltaX > 0) {
      // Go back
      direction = "back";
      if (data.activeIndex === 0) {
        if (data.isLoop) {
          data.updateActiveIndex(data.totalSlides - 1);
        } else {
          data.updateActiveIndex(0);
        }
      } else {
        data.updateActiveIndex(data.activeIndex - 1);
      }
    } else {
      // Go next
      if (data.activeIndex === data.totalSlides - 1) {
        if (data.isLoop) {
          data.updateActiveIndex(0);
        } else {
          data.updateActiveIndex(data.totalSlides - 1);
        }
      } else {
        data.updateActiveIndex(data.activeIndex + 1);
      }
    }
    setSlideName(slides, data, slideNamePrev, slideNameNext);
    setActiveIndicator(carousel, data.activeIndex);
    disableArrows(arrowBack, arrowNext, data);

    if (isLoopPages(data)) {
      rearrangeSlides(slidesWrapper, data, slides, direction);
    } else {
      goToActiveSlide(slidesWrapper, data, slides);
    }
  }
};

const setInitialSlides = (
  slidesWrapper: HTMLElement,
  data: carouselData,
  slides: NodeListOf<HTMLElement>,
) => {
  if (
    (data.totalSlides > 3 && getBreakpoint("lg")) ||
    (data.totalSlides > 1 && getBreakpoint("max-lg"))
  ) {
    slides.forEach((slide, index) => {
      slide.setAttribute("data-index", `${index}`);
      slide.classList.remove("active");
      slide.remove();
    });

    if (data.totalSlides > 3) {
      switch (data.activeIndex) {
        case 0:
          slidesWrapper.append(slides[slides.length - 1]);
          slidesWrapper.append(slides[0]);
          slidesWrapper.append(slides[1]);
          break;
        case slides.length - 1:
          slidesWrapper.append(slides[slides.length - 2]);
          slidesWrapper.append(slides[slides.length - 1]);
          slidesWrapper.append(slides[0]);
          break;
        default:
          slidesWrapper.append(slides[data.activeIndex - 1]);
          slidesWrapper.append(slides[data.activeIndex]);
          slidesWrapper.append(slides[data.activeIndex + 1]);
          break;
      }
    } else if (data.totalSlides === 3) {
      switch (data.activeIndex) {
        case 0:
          slidesWrapper.append(slides[2]);
          slidesWrapper.append(slides[0]);
          slidesWrapper.append(slides[1]);
          break;
        case 1:
          slidesWrapper.append(slides[0]);
          slidesWrapper.append(slides[1]);
          slidesWrapper.append(slides[2]);
          break;
        case 2:
          slidesWrapper.append(slides[1]);
          slidesWrapper.append(slides[2]);
          slidesWrapper.append(slides[0]);
          break;
      }
    } else if (data.totalSlides === 2) {
      const cloneSlide0 = slides[0].cloneNode(true) as HTMLElement;
      const cloneSlide1 = slides[1].cloneNode(true) as HTMLElement;
      cloneSlide0.classList.add("clone-slide");
      cloneSlide1.classList.add("clone-slide");

      switch (data.activeIndex) {
        case 0:
          slidesWrapper.append(cloneSlide1);
          slidesWrapper.append(slides[0]);
          slidesWrapper.append(slides[1]);
          break;
        case 1:
          slidesWrapper.append(cloneSlide0);
          slidesWrapper.append(slides[1]);
          slidesWrapper.append(slides[0]);
          break;
      }
    }
    slides[data.activeIndex].classList.add("active");

    let imageWidth = data.imageWidth;

    const currentSlide: HTMLElement | null = slidesWrapper.querySelector(
      ".carousel-card-cropped-item",
    );
    if (currentSlide) imageWidth = currentSlide.offsetWidth + data.offset * 2;

    slidesWrapper.style.transform = `translateX(-${
      imageWidth - data.offset * 2.5
    }px)`;
  }
};

const rearrangeSlidesPrev = (
  slidesWrapper: HTMLElement,
  data: carouselData,
  slides: NodeListOf<HTMLElement>,
  prevSlidePosition: number,
  nextSlidePosition: number,
) => {
  slidesWrapper.classList.add("no-transition");

  if (data.totalSlides > 3) {
    slidesWrapper.prepend(slides[prevSlidePosition]);

    slidesWrapper.style.transform = `translateX(-${
      data.imageWidth * 2 - data.offset * 3.5
    }px)`;

    setTimeout(() => {
      slidesWrapper.classList.remove("no-transition");
      slidesWrapper.style.transform = `translateX(-${
        data.imageWidth - data.offset * 2.5
      }px)`;
      slides[data.activeIndex].classList.add("active");
    }, 1);

    setTimeout(() => {
      slides[nextSlidePosition].remove();
    }, 501);
  } else {
    const cloneSlidePrev = slides[prevSlidePosition].cloneNode(
      true,
    ) as HTMLElement;
    cloneSlidePrev.classList.add("clone-slide");

    slidesWrapper.prepend(cloneSlidePrev);

    const currentSlides: NodeListOf<HTMLElement> =
      slidesWrapper.querySelectorAll(".carousel-card-cropped-item");

    let imageWidth = currentSlides[0].offsetWidth + data.offset * 2;

    slidesWrapper.style.transform = `translateX(-${
      imageWidth * 2 - data.offset * 3.5
    }px)`;

    setTimeout(() => {
      slidesWrapper.classList.remove("no-transition");
      slidesWrapper.style.transform = `translateX(-${
        imageWidth - data.offset * 2.5
      }px)`;
      currentSlides[1].classList.add("active");
      currentSlides[2].classList.remove("active");
    }, 1);

    setTimeout(() => {
      currentSlides[currentSlides.length - 1].remove();
    }, 501);
  }
};

const rearrangeSlidesNext = (
  slidesWrapper: HTMLElement,
  data: carouselData,
  slides: NodeListOf<HTMLElement>,
  prevSlidePosition: number,
  nextSlidePosition: number,
) => {
  slidesWrapper.classList.remove("no-transition");

  if (data.totalSlides > 3) {
    slidesWrapper.append(slides[nextSlidePosition]);
    slidesWrapper.style.transform = `translateX(-${
      data.imageWidth * 2 - data.offset * 3.5
    }px)`;
    slides[data.activeIndex].classList.add("active");

    setTimeout(() => {
      slidesWrapper.classList.add("no-transition");
      slides[prevSlidePosition].remove();
      slidesWrapper.style.transform = `translateX(-${
        data.imageWidth - data.offset * 2.5
      }px)`;
    }, 500);
  } else {
    const cloneSlideNext = slides[nextSlidePosition].cloneNode(
      true,
    ) as HTMLElement;
    cloneSlideNext.classList.add("clone-slide");

    slidesWrapper.append(cloneSlideNext);

    const currentSlides: NodeListOf<HTMLElement> =
      slidesWrapper.querySelectorAll(".carousel-card-cropped-item");

    let imageWidth = currentSlides[0].offsetWidth + data.offset * 2;

    slidesWrapper.style.transform = `translateX(-${
      imageWidth * 2 - data.offset * 3.5
    }px)`;
    currentSlides[1].classList.remove("active");
    currentSlides[2].classList.add("active");

    setTimeout(() => {
      slidesWrapper.classList.add("no-transition");
      currentSlides[0].remove();
      slidesWrapper.style.transform = `translateX(-${
        imageWidth - data.offset * 2.5
      }px)`;
    }, 500);
  }
};

const rearrangeSlides = (
  slidesWrapper: HTMLElement,
  data: carouselData,
  slides: NodeListOf<HTMLElement>,
  direction: "back" | "next",
) => {
  if (
    (data.totalSlides > 3 && getBreakpoint("lg")) ||
    getBreakpoint("max-lg")
  ) {
    let prevSlidePosition: number = slides.length - 1;
    let nextSlidePosition: number = 1;

    slides[data.prevIndex].classList.remove("active");

    if (data.totalSlides > 3) {
      if (data.activeIndex > data.prevIndex) {
        switch (data.activeIndex) {
          case 1:
            prevSlidePosition = slides.length - 1;
            nextSlidePosition = data.activeIndex + 1;
            break;
          case slides.length - 1:
            if (data.prevIndex === 0) {
              prevSlidePosition = slides.length - 2;
              nextSlidePosition = 1;
            } else {
              prevSlidePosition = slides.length - 3;
              nextSlidePosition = 0;
            }
            break;
          default:
            prevSlidePosition = data.activeIndex - 2;
            nextSlidePosition = data.activeIndex + 1;
            break;
        }
      }

      if (data.activeIndex < data.prevIndex) {
        switch (data.activeIndex) {
          case 0:
            if (data.prevIndex === slides.length - 1) {
              prevSlidePosition = slides.length - 2;
              nextSlidePosition = 1;
            } else {
              prevSlidePosition = slides.length - 1;
              nextSlidePosition = data.activeIndex + 2;
            }
            break;
          case slides.length - 2:
            prevSlidePosition = slides.length - 3;
            nextSlidePosition = 0;
            break;
          default:
            prevSlidePosition = data.activeIndex - 1;
            nextSlidePosition = data.activeIndex + 2;
            break;
        }
      }
    } else if (data.totalSlides === 3) {
      switch (data.activeIndex) {
        default: // 0
          prevSlidePosition = 2;
          nextSlidePosition = 1;
          break;
        case 1:
          prevSlidePosition = 0;
          nextSlidePosition = 2;
          break;
        case 2:
          prevSlidePosition = 1;
          nextSlidePosition = 0;
          break;
      }
    } else if (data.totalSlides === 2) {
      switch (data.activeIndex) {
        default: // 0
          prevSlidePosition = 1;
          nextSlidePosition = 1;
          break;
        case 1:
          prevSlidePosition = 0;
          nextSlidePosition = 0;
          break;
      }
    }

    if (direction === "next") {
      rearrangeSlidesNext(
        slidesWrapper,
        data,
        slides,
        prevSlidePosition,
        nextSlidePosition,
      );
    }

    if (direction === "back") {
      rearrangeSlidesPrev(
        slidesWrapper,
        data,
        slides,
        prevSlidePosition,
        nextSlidePosition,
      );
    }
  }
};

const resizeSlides = (
  carousel: HTMLElement,
  slidesWrapper: HTMLElement,
  slides: NodeListOf<HTMLElement>,
  images: NodeListOf<HTMLElement>,
  data: carouselData,
  arrowWrapper: HTMLElement | null,
  arrowBack: HTMLButtonElement | null,
  arrowNext: HTMLButtonElement | null,
  slideNamePrev: HTMLElement | null,
  slideNameNext: HTMLElement | null,
) => {
  // If slides are hidden in DOM
  let carouselWidth = carousel.offsetWidth;
  if (carouselWidth === 0) return;

  let indicatorWrapper: HTMLDivElement | null = carousel.querySelector(
    ".carousel-indicator-wrapper",
  );
  const cloneSlides = carousel.querySelectorAll(".clone-slide");
  const cloneSlidesLength = cloneSlides.length;

  slidesWrapper.classList.add("no-transition");

  swapLayout(carousel, slidesWrapper, slides, arrowWrapper, data);

  if (isBreakpoint(data)) {
    // Reset carousel data
    data.updateCarouselWidth(carousel.offsetWidth);
    data.updateImageWidth(getImageWidth(slidesWrapper, slides, data));
    if (!data.isLoop)
      data.updateTotalSlides(getTotalSlides(slidesWrapper, slides, data));
    data.updateImagesPerSlide(getImagesPerSlide(data));
    data.updateActiveIndex(getActiveIndex(data, data.activeIndex));
    data.updatePrevImagesPerSlide(data.imagesPerSlide);
    data.updatePrevIndex(data.activeIndex);

    // Recreate indicator
    indicatorWrapper && indicatorWrapper.remove();
    indicatorWrapper = createIndicator(data.totalSlides, data.activeIndex);
    carousel.append(indicatorWrapper);

    indicatorClickHandler(
      carousel,
      slidesWrapper,
      data,
      slides,
      arrowBack,
      arrowNext,
      slideNamePrev,
      slideNameNext,
    );

    // Set slide name below arrows
    setSlideName(slides, data, slideNamePrev, slideNameNext);

    if (data.isLoop) {
      if (
        (data.totalSlides > 3 && getBreakpoint("lg")) ||
        (data.totalSlides > 1 && getBreakpoint("max-lg"))
      ) {
        if (cloneSlidesLength === 0) {
          setInitialSlides(slidesWrapper, data, slides);
        } else {
          slidesWrapper.style.transform = `translateX(-${
            data.imageWidth - data.offset * 2.5
          }px)`;
        }
      } else {
        slidesWrapper.style.transform = `translateX(0)`;
      }
    } else {
      goToActiveSlide(slidesWrapper, data, slides);
    }

    // Disable arrows on first or last page
    disableArrows(arrowBack, arrowNext, data);

    // Hide arrows if only one slide
    setOnlyPage(slidesWrapper, arrowWrapper, indicatorWrapper, data);
  } else {
    slidesWrapper.style.transform = `translateX(0)`;
    arrowWrapper && arrowWrapper.classList.add("hidden");
    indicatorWrapper && indicatorWrapper.classList.add("hidden");
  }

  if (isBreakpoint(data) && data.totalSlides > 1) {
    slidesWrapper.setAttribute("draggable", "true");

    images.forEach((image) => {
      image.setAttribute("draggable", "false");
    });

    slides.forEach((slide) => {
      slide.classList.add("select-none");
    });
  } else {
    slidesWrapper.removeAttribute("draggable");

    images.forEach((image) => {
      image.removeAttribute("draggable");
    });

    slides.forEach((slide) => {
      slide.classList.remove("select-none");
    });
  }
};

// Set previous and next slide name
const setSlideName = (
  slides: NodeListOf<HTMLElement>,
  data: carouselData,
  slideNamePrev: HTMLElement | null | undefined,
  slideNameNext: HTMLElement | null | undefined,
) => {
  if (
    !slideNamePrev ||
    !slideNameNext ||
    !data.isImageCarousel ||
    !isLoopPages(data)
  )
    return;

  let slideNamePrevLabel: HTMLElement | null = null;
  let slideNameNextLabel: HTMLElement | null = null;

  switch (data.activeIndex) {
    case 0:
      // Previous slide
      slideNamePrevLabel = slides[slides.length - 1].querySelector(
        ".card-image-text-title",
      );

      if (slideNamePrevLabel && data.isLoop) {
        slideNamePrev.innerText = slideNamePrevLabel.innerText;
      } else {
        slideNamePrev.innerText = "";
      }

      // Next slide
      slideNameNextLabel = slides[1].querySelector(".card-image-text-title");

      if (slideNameNextLabel) {
        slideNameNext.innerText = slideNameNextLabel.innerText;
      } else {
        slideNameNext.innerText = "";
      }

      break;
    case slides.length - 1:
      // Previous slide
      slideNamePrevLabel = slides[slides.length - 2].querySelector(
        ".card-image-text-title",
      );

      if (slideNamePrevLabel) {
        slideNamePrev.innerText = slideNamePrevLabel.innerText;
      } else {
        slideNamePrev.innerText = "";
      }

      // Next slide
      slideNameNextLabel = slides[0].querySelector(".card-image-text-title");

      if (slideNameNextLabel && data.isLoop) {
        slideNameNext.innerText = slideNameNextLabel.innerText;
      } else {
        slideNameNext.innerText = "";
      }
      break;
    default:
      // Previous slide
      slideNamePrevLabel = slides[data.activeIndex - 1].querySelector(
        ".card-image-text-title",
      );

      if (slideNamePrevLabel) {
        slideNamePrev.innerText = slideNamePrevLabel.innerText;
      } else {
        slideNamePrev.innerText = "";
      }

      // Next slide
      slideNameNextLabel = slides[data.activeIndex + 1].querySelector(
        ".card-image-text-title",
      );

      if (slideNameNextLabel) {
        slideNameNext.innerText = slideNameNextLabel.innerText;
      } else {
        slideNameNext.innerText = "";
      }
      break;
  }

  const brTagsPrev: NodeListOf<HTMLBRElement> =
    slideNamePrev.querySelectorAll("br");

  for (
    let i = 0, brTagsPrevLength = brTagsPrev.length;
    i < brTagsPrevLength;
    i++
  ) {
    brTagsPrev[i].remove();
  }

  const brTagsNext: NodeListOf<HTMLBRElement> =
    slideNameNext.querySelectorAll("br");

  for (
    let i = 0, brTagsNextLength = brTagsNext.length;
    i < brTagsNextLength;
    i++
  ) {
    brTagsNext[i].remove();
  }
};

// Drag to go to slide
const dragImage = (
  slidesWrapper: HTMLElement,
  data: carouselData,
  cursor: cursorPostion,
  currCursorPosition: number,
) => {
  if (data.totalSlides > 1) {
    const offset: number = data.offset ? data.offset : 0;
    const slidesWrapperWidth: number = slidesWrapper.scrollWidth;
    const currentSlidePosition: number = data.isLoop
      ? -1 * (data.imageWidth + offset - offset / 2)
      : -1 *
        (slidesWrapperWidth / data.totalImages) *
        Math.min(
          data.totalImages - data.imagesPerSlide,
          data.activeIndex * data.imagesPerSlide,
        );
    const cursorDelta: number = currCursorPosition - cursor.clientX;
    const isEven: boolean = data.totalImages % 2 === 0;

    slidesWrapper.classList.add("no-transition");

    if (currCursorPosition !== 0) {
      switch (data.activeIndex) {
        case 0:
          if (currCursorPosition > cursor.clientX) {
            data.updateDragPosition(0);
          } else {
            data.updateDragPosition(
              Math.max(
                currentSlidePosition - data.carouselWidth,
                currentSlidePosition + cursorDelta,
              ),
            );
          }
          break;
        case data.totalSlides - 1:
          if (isEven || data.imagesPerSlide === 1) {
            if (currCursorPosition > cursor.clientX) {
              data.updateDragPosition(
                Math.min(
                  slidesWrapper.scrollWidth,
                  currentSlidePosition + cursorDelta,
                ),
              );
            } else {
              data.updateDragPosition(
                -1 * slidesWrapperWidth + data.carouselWidth - offset,
              );
            }
          } else {
            if (currCursorPosition > cursor.clientX) {
              data.updateDragPosition(
                Math.min(
                  currentSlidePosition + data.carouselWidth,
                  currentSlidePosition + data.imageWidth + offset + cursorDelta,
                ),
              );
            } else {
              data.updateDragPosition(
                -1 * slidesWrapperWidth + data.carouselWidth - offset,
              );
            }
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
            if (data.activeIndex === data.totalSlides - 2) {
              data.updateDragPosition(
                Math.max(
                  currentSlidePosition + -data.carouselWidth,
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
          }
          break;
      }
      slidesWrapper.style.transform = `translateX(${data.dragPosition}px)`;
    }
  }
};

// Disable arrow on first or last page
const disableArrows = (
  arrowBack: HTMLButtonElement | null | undefined,
  arrowNext: HTMLButtonElement | null | undefined,
  data: carouselData,
) => {
  // if (
  //   (arrowBack && arrowNext && !data.isLoop) ||
  //   (arrowBack && arrowNext && !isLoopPages(data))
  // ) {
  if (arrowBack && arrowNext && !data.isLoop) {
    // Disabled back arrow if on first slide
    if (data.activeIndex === 0) {
      arrowBack.setAttribute("disabled", "");
    } else {
      arrowBack.removeAttribute("disabled");
    }

    // Disable next arrow if on last slide
    if (data.activeIndex === data.totalSlides - 1) {
      arrowNext.setAttribute("disabled", "");
    } else {
      arrowNext.removeAttribute("disabled");
    }
  }
};

// Create indicators
export const createIndicator = (slidesLength: number, activeIndex: number) => {
  const wrapper = document.createElement("div");
  wrapper.classList.add("carousel-indicator-wrapper");

  const wrapperInner = document.createElement("ul");
  wrapperInner.classList.add("carousel-indicator-wrapper-inner");

  for (let i = 0; i < slidesLength; i++) {
    const indicatorWrapper = document.createElement("li");
    const indicator = document.createElement("a");
    const indicatorLabel = document.createElement("span");

    indicator.setAttribute("href", "#");
    indicator.setAttribute("role", "button");

    indicatorLabel.classList.add("visually-hidden");
    indicatorLabel.innerText = `Slide ${i + 0}`;

    indicator.classList.add("carousel-indicator");
    i === activeIndex && indicator.classList.add("active");

    indicator.append(indicatorLabel);
    indicatorWrapper.append(indicator);
    wrapperInner.append(indicatorWrapper);
  }
  wrapper.append(wrapperInner);

  return wrapper;
};

// Set active indicator
export const setActiveIndicator = (
  carousel: HTMLElement,
  activeIndex: number,
  _indicators?: NodeListOf<HTMLButtonElement>,
) => {
  let indicators: NodeListOf<HTMLButtonElement> = _indicators
    ? _indicators
    : carousel.querySelectorAll(".carousel-indicator");

  for (
    let i = 0, indicatorsLength = indicators.length;
    i < indicatorsLength;
    i++
  ) {
    const indicator = indicators[i];

    if (i === activeIndex) {
      indicator.classList.add("active");
    } else {
      indicator.classList.remove("active");
    }
  }
};

// Click on indicator to go to slide
const indicatorClickHandler = (
  carousel: HTMLElement,
  slidesWrapper: HTMLElement,
  data: carouselData,
  slides: NodeListOf<HTMLElement>,
  arrowBack?: HTMLButtonElement | null,
  arrowNext?: HTMLButtonElement | null,
  slideNamePrev?: HTMLElement | null | undefined,
  slideNameNext?: HTMLElement | null | undefined,
) => {
  let indicators: NodeListOf<HTMLButtonElement> = carousel.querySelectorAll(
    ".carousel-indicator",
  );
  let direction: "back" | "next" = "next";

  for (
    let i = 0, indicatorsLength = indicators.length;
    i < indicatorsLength;
    i++
  ) {
    indicators[i].addEventListener("click", (event) => {
      event.preventDefault();
      data.updatePrevIndex(data.activeIndex);
      data.updateActiveIndex(i);

      setSlideName(slides, data, slideNamePrev, slideNameNext);
      setActiveIndicator(carousel, data.activeIndex, indicators);
      disableArrows(arrowBack, arrowNext, data);

      if (data.activeIndex < data.prevIndex) {
        direction = "back";
      }

      if (isLoopPages(data)) {
        rearrangeSlides(slidesWrapper, data, slides, direction);
      } else {
        goToActiveSlide(slidesWrapper, data, slides);
      }
    });
  }
};

// Create empty image to replace drag image thumbnail
export const createEmptyImage = (): HTMLImageElement => {
  const emptyImageCanvas = document.createElement("canvas");
  const emptyImage = document.createElement("img");
  emptyImage.setAttribute("src", emptyImageCanvas.toDataURL());
  return emptyImage;
};

const createSlideName = () => {
  const span = document.createElement("span");
  span.classList.add("slide-name");
  return span;
};

const setCarousel = (
  carousel: HTMLElement,
  slidesWrapper: HTMLElement,
  slides: NodeListOf<HTMLElement>,
  arrowWrapper: HTMLElement | null,
  arrowBack: HTMLButtonElement | null,
  arrowNext: HTMLButtonElement | null,
  slideNamePrev: HTMLElement | null,
  slideNameNext: HTMLElement | null,
  data: carouselData,
) => {
  swapLayout(carousel, slidesWrapper, slides, arrowWrapper, data);

  slidesWrapper.classList.add("no-transition");

  setTimeout(() => {
    let indicatorWrapper: HTMLDivElement | null = null;

    // If slides are hidden in DOM
    let imageWidth = 0;

    for (let i = 0, slidesLength = slides.length; i < slidesLength; i++) {
      imageWidth = slides[i].offsetWidth;

      if (imageWidth > 0) break;
    }

    if (imageWidth === 0) return;

    if (data.isLoop) data.updateTotalSlides(slides.length);

    // Initialise carousel data
    data.updateActiveIndex(0);
    data.updatePrevIndex(0);
    data.updateTotalImages(slides.length);
    data.updateCarouselWidth(carousel.offsetWidth);
    data.updateImageWidth(getImageWidth(slidesWrapper, slides, data));
    if (!data.isLoop)
      data.updateTotalSlides(getTotalSlides(slidesWrapper, slides, data));
    data.updateImagesPerSlide(getImagesPerSlide(data));
    data.updatePrevImagesPerSlide(data.imagesPerSlide);

    if (!data.breakpoint || getBreakpoint(data.breakpoint)) {
      // Create indicators
      indicatorWrapper = carousel.querySelector(".carousel-indicator-wrapper");
      indicatorWrapper && indicatorWrapper.remove();
      indicatorWrapper = createIndicator(data.totalSlides, data.activeIndex);
      carousel.append(indicatorWrapper);

      indicatorClickHandler(
        carousel,
        slidesWrapper,
        data,
        slides,
        arrowBack,
        arrowNext,
        slideNamePrev,
        slideNameNext,
      );
    }

    // Set active slide
    setSlides(slidesWrapper, slides, slideNamePrev, slideNameNext, data);

    // Disable arrows on first or last page
    disableArrows(arrowBack, arrowNext, data);

    // Hide arrows if only one slide
    setOnlyPage(slidesWrapper, arrowWrapper, indicatorWrapper, data);
  }, 2);
};

const setOnlyPage = (
  slidesWrapper: HTMLElement | null,
  arrowWrapper: HTMLElement | null,
  indicatorWrapper: HTMLDivElement | null,
  data: carouselData,
) => {
  if (isLoopPages(data)) {
    return;
  } else {
    // Hide elements if only one slide
    if (data.totalSlides <= 1 || !isBreakpoint(data)) {
      if (slidesWrapper) {
        slidesWrapper.classList.add("only-page");
        slidesWrapper.style.transform = "translateX(0)";
      }
      arrowWrapper && arrowWrapper.classList.add("hidden");
      indicatorWrapper && indicatorWrapper.classList.add("hidden");
    } else {
      slidesWrapper && slidesWrapper.classList.remove("only-page");
      arrowWrapper && arrowWrapper.classList.remove("hidden");
      indicatorWrapper && indicatorWrapper.classList.remove("hidden");
    }
  }
};

const setSlides = (
  slidesWrapper: HTMLElement,
  slides: NodeListOf<HTMLElement>,
  slideNamePrev: HTMLElement | null,
  slideNameNext: HTMLElement | null,
  data: carouselData,
) => {
  if (isBreakpoint(data)) {
    setSlideName(slides, data, slideNamePrev, slideNameNext);

    if (isLoopPages(data)) {
      setInitialSlides(slidesWrapper, data, slides);
    } else if (!data.isLoop) {
      goToActiveSlide(slidesWrapper, data, slides);
    }
  }
};

// Click to go to previous slide
const arrowsBackHandler = (
  carousel: HTMLElement,
  slidesWrapper: HTMLElement,
  slides: NodeListOf<HTMLElement>,
  arrowBack: HTMLButtonElement | null,
  arrowNext: HTMLButtonElement | null,
  slideNamePrev: HTMLElement | null,
  slideNameNext: HTMLElement | null,
  data: carouselData,
) => {
  if (!data.disableMove) {
    data.updateDisableMove(true);
    data.updatePrevIndex(data.activeIndex);

    if (data.activeIndex === 0) {
      if (data.isLoop) {
        data.updateActiveIndex(data.totalSlides - 1);
      } else {
        data.updateActiveIndex(0);
      }
    } else {
      data.updateActiveIndex(data.activeIndex - 1);
    }
    setSlideName(slides, data, slideNamePrev, slideNameNext);
    setActiveIndicator(carousel, data.activeIndex);
    disableArrows(arrowBack, arrowNext, data);

    if (isLoopPages(data)) {
      rearrangeSlides(slidesWrapper, data, slides, "back");
    } else {
      goToActiveSlide(slidesWrapper, data, slides);
    }
    setTimeout(() => {
      data.updateDisableMove(false);
    }, 502);
  }
};

// Click to go to next slide
const arrowsNextHandler = (
  carousel: HTMLElement,
  slidesWrapper: HTMLElement,
  slides: NodeListOf<HTMLElement>,
  arrowBack: HTMLButtonElement | null,
  arrowNext: HTMLButtonElement | null,
  slideNamePrev: HTMLElement | null,
  slideNameNext: HTMLElement | null,
  data: carouselData,
) => {
  if (!data.disableMove) {
    data.updateDisableMove(true);
    data.updatePrevIndex(data.activeIndex);

    if (data.activeIndex === data.totalSlides - 1) {
      if (data.isLoop) {
        data.updateActiveIndex(0);
      } else {
        data.updateActiveIndex(data.totalSlides - 1);
      }
    } else {
      data.updateActiveIndex(data.activeIndex + 1);
    }
    setSlideName(slides, data, slideNamePrev, slideNameNext);
    setActiveIndicator(carousel, data.activeIndex);
    disableArrows(arrowBack, arrowNext, data);

    if (isLoopPages(data)) {
      rearrangeSlides(slidesWrapper, data, slides, "next");
    } else {
      goToActiveSlide(slidesWrapper, data, slides);
    }
    setTimeout(() => {
      data.updateDisableMove(false);
    }, 502);
  }
};

const swapLayout = (
  carousel: HTMLElement,
  slidesWrapper: HTMLElement,
  slides: NodeListOf<HTMLElement>,
  arrowWrapper: HTMLElement | null,
  data: carouselData,
) => {
  if (data.isLoop) {
    // Single slide
    if (data.totalSlides === 1) {
      slides[0].classList.add("active");
      slidesWrapper.classList.remove("carousel-card-cropped-inner");
      slidesWrapper.classList.remove("col-1");
      slidesWrapper.classList.add("only-page");
      slidesWrapper.classList.add("single-slide");

      if (arrowWrapper) arrowWrapper.classList.add("!hidden");

      let carouselParent: HTMLElement | null = carousel.parentElement;

      if (carouselParent) {
        carouselParent.style.maxWidth = "35.25rem";
      }
      // 3 slides and less in smaller screen
    } else if (data.totalSlides <= 3 && getBreakpoint("lg")) {
      const currentSlides = slidesWrapper.querySelectorAll(
        ".carousel-card-cropped-item",
      );

      currentSlides.forEach((currentSlide) => currentSlide.remove());

      slides.forEach((slide) => {
        slidesWrapper.append(slide);
        slide.classList.add("active");
      });

      slidesWrapper.classList.remove("carousel-card-cropped-inner");
      slidesWrapper.classList.remove("col-1");
      slidesWrapper.classList.add("only-page");

      switch (data.totalSlides) {
        case 2:
          slidesWrapper.classList.add("col-2");
          break;
        case 3:
          slidesWrapper.classList.add("col-3");
          break;
        default:
          break;
      }

      if (arrowWrapper) arrowWrapper.classList.add("!hidden");

      let carouselParent: HTMLElement | null = carousel.parentElement;

      if (carouselParent) {
        carouselParent.style.maxWidth = "75rem";
        carouselParent.style.paddingLeft = "1.5rem";
        carouselParent.style.paddingRight = "1.5rem";
      }
      // Carousel mode
    } else {
      slides.forEach((slide) => {
        slide.classList.remove("active");
      });

      slides[data.activeIndex].classList.add("active");
      slidesWrapper.classList.add("carousel-card-cropped-inner");
      slidesWrapper.classList.add("col-1");
      slidesWrapper.classList.remove("only-page");
      slidesWrapper.classList.remove("single-slide");
      slidesWrapper.classList.remove("col-2");
      slidesWrapper.classList.remove("col-3");
      slidesWrapper.style.transform = `translateX(-${
        data.imageWidth * 2 - data.offset * 3.5
      }px)`;

      if (arrowWrapper) arrowWrapper.classList.remove("!hidden");

      let carouselParent: HTMLElement | null = carousel.parentElement;

      if (carouselParent) {
        carouselParent.style.maxWidth = "";
        carouselParent.style.paddingLeft = "";
        carouselParent.style.paddingRight = "";
      }
    }
  }
};

/*====================================================
  Classes
====================================================*/
class carouselData {
  activeIndex: number;
  prevIndex: number;
  prevImagesPerSlide: number;
  imagesPerSlide: number;
  totalSlides: number;
  totalImages: number;
  carouselWidth: number;
  imageWidth: number;
  dragPosition: number;
  hasSideNav: boolean;
  isImageCarousel: boolean;
  isLoop: boolean;
  disableMove: boolean;
  breakpoint: string | null;
  isSingleCol: boolean;
  isFirefox: boolean;
  offset: number;

  constructor() {
    this.activeIndex = 0;
    this.prevIndex = 0;
    this.prevImagesPerSlide = 0;
    this.imagesPerSlide = 0;
    this.totalSlides = 0;
    this.totalImages = 0;
    this.carouselWidth = 0;
    this.imageWidth = 0;
    this.dragPosition = 0;
    this.hasSideNav = false;
    this.isImageCarousel = false;
    this.isLoop = false;
    this.disableMove = false;
    this.breakpoint = null;
    this.isSingleCol = false;
    this.isFirefox = false;
    this.offset = 24;
  }
  updateActiveIndex(activeIndex: number) {
    this.activeIndex = activeIndex;
  }
  updatePrevIndex(prevIndex: number) {
    this.prevIndex = prevIndex;
  }
  updatePrevImagesPerSlide(prevImagesPerSlide: number) {
    this.prevImagesPerSlide = prevImagesPerSlide;
  }
  updateImagesPerSlide(imagesPerSlide: number) {
    this.imagesPerSlide = imagesPerSlide;
  }
  updateTotalSlides(totalSlides: number) {
    this.totalSlides = totalSlides;
  }
  updateTotalImages(totalImages: number) {
    this.totalImages = totalImages;
  }
  updateCarouselWidth(carouselWidth: number) {
    this.carouselWidth = carouselWidth;
  }
  updateImageWidth(imageWidth: number) {
    this.imageWidth = imageWidth;
  }
  updateDragPosition(dragPosition: number) {
    this.dragPosition = dragPosition;
  }
  updateHasSideNav(hasSideNav: boolean) {
    this.hasSideNav = hasSideNav;
  }
  updateIsImageCarousel(isImageCarousel: boolean) {
    this.isImageCarousel = isImageCarousel;
  }
  updateIsLoop(isLoop: boolean) {
    this.isLoop = isLoop;
  }
  updateDisableMove(disableMove: boolean) {
    this.disableMove = disableMove;
  }
  updateBreakpoint(breakpoint: string | null) {
    this.breakpoint = breakpoint;
  }
  updateIsSingleCol(isSingleCol: boolean) {
    this.isSingleCol = isSingleCol;
  }
  updateIsFirefox(isFirefox: boolean) {
    this.isFirefox = isFirefox;
  }
  updateOffset(offset: number) {
    this.offset = offset;
  }
}

export class cursorPostion {
  clientX: number;
  clientY: number;
  deltaX: number;
  isDragging: boolean;

  constructor() {
    this.clientX = 0;
    this.clientY = 0;
    this.deltaX = 0;
    this.isDragging = false;
  }
  updateClient(clientX: number) {
    this.clientX = clientX;
  }
  updateClientY(clientY: number) {
    this.clientY = clientY;
  }
  updateDelta(deltaX: number) {
    this.deltaX = deltaX;
  }
  updateIsDragging(isDragging: boolean) {
    this.isDragging = isDragging;
  }
}

/*========================================
  Main function here (tile cards)
========================================*/
export const carouselAll = (isFirefox: boolean) => {
  carousel(
    isFirefox,
    ".carousel-card-cropped",
    ".carousel-card-cropped-inner",
    ".carousel-card-cropped-item",
    ".carousel-card-cropped-image",
  );

  carousel(
    isFirefox,
    ".card-tile",
    ".card-tile-inner",
    ".card-tile-item",
    ".card-tile-image",
  );
};

const carousel = (
  isFirefox: boolean,
  carouselsName: string,
  slidesWrapperName: string,
  slidesName: string,
  imagesName: string,
) => {
  const carousels: NodeListOf<HTMLElement> =
    document.querySelectorAll(carouselsName);

  for (
    let i = 0, carouselsLength = carousels.length;
    i < carouselsLength;
    i++
  ) {
    const carousel = carousels[i];

    const slidesWrapper: HTMLElement | null =
      carousel.querySelector(slidesWrapperName);

    if (!slidesWrapper) return;

    const data = new carouselData();

    // Slides
    let slides: NodeListOf<HTMLElement> = carousel.querySelectorAll(slidesName);
    removeHiddenSlide(slides);
    slides = carousel.querySelectorAll(slidesName);

    const images: NodeListOf<HTMLElement> =
      carousel.querySelectorAll(imagesName);

    // Create empty image to replace thumbnail when dragging
    const emptyImage = createEmptyImage();

    // To track cursor position for dragging slides
    const cursor = new cursorPostion();

    // Back and next arrows
    let arrowWrapperId = carousel.getAttribute("data-arrow-id");
    let arrowWrapper: HTMLElement | null = document.querySelector(
      `#${arrowWrapperId}`,
    );
    let arrowBack: HTMLButtonElement | null = document.querySelector(
      `#${arrowWrapperId} .carousel-arrow-back`,
    );
    let arrowNext: HTMLButtonElement | null = document.querySelector(
      `#${arrowWrapperId} .carousel-arrow-next`,
    );
    let slideNamePrev: HTMLElement | null = null;
    let slideNameNext: HTMLElement | null = null;

    // Custom settings
    let customBreakpoint = carousel.getAttribute("data-breakpoint");
    if (customBreakpoint) data.updateBreakpoint(customBreakpoint);

    let customOffset: string | number | null = carousel.getAttribute(
      "data-carousel-offset",
    );

    // Zoom fix - updated offset value
    if (customOffset) {
      customOffset = parseInt(customOffset);
      if (!isNaN(customOffset)) data.updateOffset(customOffset * getPageZoom());
    } else {
      data.updateOffset(24 * getPageZoom());
    }

    let isSingleCol = carousel.getAttribute("data-carousel-single-col");
    if (isSingleCol) data.updateIsSingleCol(true);

    if (carousel.getAttribute("data-has-side-nav") === "true")
      data.updateHasSideNav(true);

    if (carousel.getAttribute("data-carousel-loop") === "true")
      data.updateIsLoop(true);

    if (isFirefox) data.updateIsFirefox(true);

    if (carousel.getAttribute("data-carousel-image") === "true") {
      data.updateIsImageCarousel(true);

      if (arrowBack && arrowNext) {
        slideNamePrev = createSlideName();
        slideNameNext = createSlideName();
        arrowBack.append(slideNamePrev);
        arrowNext.append(slideNameNext);
      }

      if (carousel.parentElement?.parentElement) {
        carousel.parentElement.parentElement.style.maxWidth =
          "min(100vw, 2560px)"; /* Upper boundary limit */
        carousel.parentElement.parentElement.style.overflowX = "hidden";
      }
    }

    if (data.isLoop) data.updateTotalSlides(slides.length);

    // if (!data.isLoop || isLoopPages(data)) {
    // Make carousel draggable
    if (isBreakpoint(data) && data.totalSlides > 1) {
      slidesWrapper.setAttribute("draggable", "true");

      slides.forEach((slide) => {
        slide.classList.add("select-none");
      });

      images.forEach((image) => {
        image.setAttribute("draggable", "false");
      });
    }

    setCarousel(
      carousel,
      slidesWrapper,
      slides,
      arrowWrapper,
      arrowBack,
      arrowNext,
      slideNamePrev,
      slideNameNext,
      data,
    );

    // Reload carousel when dialog opens
    const dialogShowButtons: NodeListOf<HTMLElement> =
      document.querySelectorAll("data-dialog-target");

    for (
      let j = 0, dialogShowButtonsLength = dialogShowButtons.length;
      j < dialogShowButtonsLength;
      j++
    ) {
      const dialogShowButton = dialogShowButtons[j];

      dialogShowButton.addEventListener("click", () => {
        setTimeout(() => {
          if (isLoopPages(data)) {
            slides.forEach((slide) => {
              slidesWrapper.append(slide);
            });
          }

          setCarousel(
            carousel,
            slidesWrapper,
            slides,
            arrowWrapper,
            arrowBack,
            arrowNext,
            slideNamePrev,
            slideNameNext,
            data,
          );
        }, 601);
      });
    }

    // Reload carousel when toggling select
    const selectToggle: HTMLElement | null | undefined =
      carousel.parentElement?.parentElement;
    const selectToggleContent: HTMLElement | null = carousel.parentElement;

    if (selectToggle && selectToggleContent) {
      const select: HTMLSelectElement | null = selectToggle.querySelector(
        ".select-toggle-trigger",
      );

      if (select) {
        const selectMenuItems: NodeListOf<HTMLAnchorElement> =
          selectToggle.querySelectorAll(".form-select .dropdown-menu-item");
        const isSelectedOptionDisabled: boolean | null =
          select.options[select.selectedIndex].getAttribute("disabled") !==
          null;
        const selectPills: NodeListOf<HTMLAnchorElement> =
          selectToggle.querySelectorAll(".select-toggle-trigger-pill");
        const selectToggleContainerName: string | null =
          selectToggleContent.getAttribute("data-select-toggle-value");

        for (
          let j = 0, selectPillsLength = selectPills.length;
          j < selectPillsLength;
          j++
        ) {
          const selectPill = selectPills[j];

          selectPill.addEventListener("click", () => {
            if (selectToggleContainerName === selectPill.innerText) {
              if (isLoopPages(data)) {
                slides.forEach((slide) => {
                  slidesWrapper.append(slide);
                });
              }

              setCarousel(
                carousel,
                slidesWrapper,
                slides,
                arrowWrapper,
                arrowBack,
                arrowNext,
                slideNamePrev,
                slideNameNext,
                data,
              );
            }
          });
        }

        for (
          let j = 0, selectMenuItemsLength = selectMenuItems.length;
          j < selectMenuItemsLength;
          j++
        ) {
          const selectMenuItem = selectMenuItems[j];

          selectMenuItem.addEventListener("click", () => {
            let selectedTargetName: string;

            if (isSelectedOptionDisabled) {
              selectedTargetName = select.options[j + 1].value;
            } else {
              selectedTargetName = select.options[j].value;
            }

            if (selectToggleContainerName === selectedTargetName) {
              if (isLoopPages(data)) {
                slides.forEach((slide) => {
                  slidesWrapper.append(slide);
                });
              }

              setCarousel(
                carousel,
                slidesWrapper,
                slides,
                arrowWrapper,
                arrowBack,
                arrowNext,
                slideNamePrev,
                slideNameNext,
                data,
              );
            }
          });
        }
      }
    }

    // Fix - 01 May 2024 - only reset carousel if width changes to prevent lag in mobile
    let windowWidthPrev = window.innerWidth;

    window.addEventListener("resize", () => {
      setTimeout(() => {
        let windowWidth = window.innerWidth;

        if (window.innerWidth !== windowWidthPrev) {
          resizeSlides(
            carousel,
            slidesWrapper,
            slides,
            images,
            data,
            arrowWrapper,
            arrowBack,
            arrowNext,
            slideNamePrev,
            slideNameNext,
          );
        }
        windowWidthPrev = windowWidth;
      }, 300);
    });

    if (arrowBack && arrowNext) {
      // Click to go to previous slide
      arrowBack.addEventListener("click", () => {
        arrowsBackHandler(
          carousel,
          slidesWrapper,
          slides,
          arrowBack,
          arrowNext,
          slideNamePrev,
          slideNameNext,
          data,
        );
      });

      // Click to go to next slide
      arrowNext.addEventListener("click", () => {
        arrowsNextHandler(
          carousel,
          slidesWrapper,
          slides,
          arrowBack,
          arrowNext,
          slideNamePrev,
          slideNameNext,
          data,
        );
      });
    }

    /*========================================
        Drag to go to slide (mouse)
      ========================================*/
    // Track cursor position when dragging starts
    slidesWrapper.addEventListener("dragstart", (e) => {
      if (isBreakpoint(data) && data.totalSlides > 1) {
        // Cache the client X coordinates
        cursor.updateClient(e.clientX);

        // Set empty image as drag thumbnail
        if (e.dataTransfer) {
          e.dataTransfer.setDragImage(emptyImage, 0, 0);
        }
      }
    });

    // When dragging (firefox)
    if (data.isFirefox) {
      slidesWrapper.addEventListener("dragover", (e) => {
        if (isBreakpoint(data) && data.totalSlides > 1) {
          e.preventDefault();
          cursor.updateDelta(e.clientX - cursor.clientX);

          if (!data.isLoop) {
            dragImage(slidesWrapper, data, cursor, e.clientX);

            setTimeout(() => {
              slidesWrapper.classList.remove("no-transition");
            }, 1);
          }
        }
      });
    }

    // When dragging
    slidesWrapper.addEventListener("drag", (e) => {
      if (!data.isFirefox && isBreakpoint(data) && data.totalSlides > 1) {
        if (e.clientX !== 0) {
          cursor.updateDelta(e.clientX - cursor.clientX);

          if (!data.isLoop) {
            dragImage(slidesWrapper, data, cursor, e.clientX);

            setTimeout(() => {
              slidesWrapper.classList.remove("no-transition");
            }, 1);
          }
        } else {
          cursor.updateIsDragging(true);

          if (!data.disableMove) {
            data.updateDisableMove(true);
            slidesWrapper.classList.remove("no-transition");

            // Go to previous or next slide
            swipeToActiveSlide(
              carousel,
              slidesWrapper,
              data,
              cursor,
              slides,
              slideNamePrev,
              slideNameNext,
              arrowBack,
              arrowNext,
            );

            setTimeout(() => {
              data.updateDisableMove(false);
            }, 502);
          }
        }
      }
    });

    if (!data.isFirefox) {
      // Go to slide after drag ends
      slidesWrapper.addEventListener("dragend", () => {
        if (
          isBreakpoint(data) &&
          data.totalSlides > 1 &&
          cursor.isDragging !== true &&
          !data.disableMove
        ) {
          data.updateDisableMove(true);
          cursor.updateIsDragging(false);
          slidesWrapper.classList.remove("no-transition");

          // Go to previous or next slide
          swipeToActiveSlide(
            carousel,
            slidesWrapper,
            data,
            cursor,
            slides,
            slideNamePrev,
            slideNameNext,
            arrowBack,
            arrowNext,
          );

          setTimeout(() => {
            data.updateDisableMove(false);
          }, 502);
        }
      });
    } else {
      // Go to slide after drag ends (firefox)
      slidesWrapper.addEventListener("dragend", (e) => {
        if (isBreakpoint(data) && data.totalSlides > 1) {
          cursor.updateDelta(e.clientX - cursor.clientX);
          slidesWrapper.classList.remove("no-transition");

          // Go to previous or next slide
          swipeToActiveSlide(
            carousel,
            slidesWrapper,
            data,
            cursor,
            slides,
            slideNamePrev,
            slideNameNext,
            arrowBack,
            arrowNext,
          );
        }
      });
    }

    /*========================================
        Drag to go to slide (touch)
      ========================================*/
    // Track finger position when swiping starts
    slidesWrapper.addEventListener("touchstart", (e) => {
      if (isBreakpoint(data) && isBreakpoint(data) && data.totalSlides > 1) {
        // Cache the client X coordinates
        cursor.updateClient(e.touches[0].clientX);
        cursor.updateClientY(e.touches[0].clientY);
        cursor.updateIsDragging(true);
      }
    });

    // Fix - 26 Apr 2024: 6) Jerky scrolling
    // Removed touchmove listener

    // When dragging
    // slidesWrapper.addEventListener("touchmove", (e) => {
    //   if (isBreakpoint(data) && isBreakpoint(data) && data.totalSlides > 1) {
    //     dragImage(slidesWrapper, data, cursor, e.touches[0].clientX);
    //   }
    // });

    // Go to the previous or next image when swiping stops
    slidesWrapper.addEventListener("touchend", (e) => {
      if (
        isBreakpoint(data) &&
        isBreakpoint(data) &&
        data.totalSlides > 1 &&
        !data.disableMove
      ) {
        // Compute the change in X coordinates
        cursor.updateDelta(e.changedTouches[0].clientX - cursor.clientX);
        cursor.updateIsDragging(false);
        data.updateDisableMove(true);
        slidesWrapper.classList.remove("no-transition");

        // Fix - 26 Apr 2024: 6) Jerky scrolling
        // Updated swipeToActiveSlide

        // Go to previous or next slide
        swipeToActiveSlide(
          carousel,
          slidesWrapper,
          data,
          cursor,
          slides,
          slideNamePrev,
          slideNameNext,
          arrowBack,
          arrowNext,
          true,
        );

        setTimeout(() => {
          data.updateDisableMove(false);
        }, 502);
      }
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
  // }
};
