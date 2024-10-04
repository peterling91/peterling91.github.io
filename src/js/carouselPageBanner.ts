import { carouselFullData } from "./carouselFull";
import {
  removeHiddenSlide,
  createIndicator,
  setActiveIndicator,
} from "./carousel";
import { getBreakpoint } from "./utilites";

/*====================================================
  Reusable functions, see main function below
====================================================*/
const setImagesHeight = (
  carousel: HTMLElement,
  imageWrappers: NodeListOf<HTMLElement>,
) => {
  if (getBreakpoint("md")) {
    imageWrappers.forEach((imageWrapper) => {
      imageWrapper.style.minHeight = `${carousel.offsetHeight}px`;
    });
  } else {
    imageWrappers.forEach((imageWrapper) => {
      imageWrapper.removeAttribute("style");
    });
  }
};

const hideSlide = (slides: NodeListOf<HTMLElement>, data: carouselData) => {
  slides[data.prevActiveIndex].setAttribute("aria-current", "false");
  slides[data.prevActiveIndex].classList.add("hiding");

  setTimeout(() => {
    slides[data.prevActiveIndex].classList.remove("hiding");
    slides[data.prevActiveIndex].classList.remove("show");
  }, data.transitionDuration);
};

const showSlide = (slides: NodeListOf<HTMLElement>, data: carouselData) => {
  slides[data.activeIndex].setAttribute("aria-current", "true");
  slides[data.activeIndex].classList.add("showing");

  setTimeout(() => {
    slides[data.activeIndex].classList.add("show");
    slides[data.activeIndex].classList.remove("showing");
  }, data.transitionDuration);
};

const goToNextSlide = (
  carousel: HTMLElement,
  slides: NodeListOf<HTMLElement>,
  indicators: NodeListOf<HTMLButtonElement>,
  data: carouselData,
) => {
  data.updatePrevActiveIndex(data.activeIndex);

  if (data.activeIndex === data.totalSlides - 1) {
    data.updateActiveIndex(0);
  } else {
    data.updateActiveIndex(data.activeIndex + 1);
  }

  hideSlide(slides, data);
  showSlide(slides, data);
  setActiveIndicator(carousel, data.activeIndex, indicators);
};

const createPercentageBar = (pagesItems: NodeListOf<HTMLElement>) => {
  pagesItems.forEach((pagesItem) => {
    const bar = createPercentageBarElem("banner-page-bar");
    pagesItem.append(bar);
  });
};

const createPercentageBarElem = (className: string) => {
  const bar = document.createElement("div");
  bar.classList.add(className);
  return bar;
};

const updatePercentageBarWidth = (
  percentageBar: HTMLElement,
  data: carouselData,
  percentageBarStartTime: number,
) => {
  let currentTime = new Date().getTime();
  let timeElapsed = currentTime - percentageBarStartTime;
  let width = (timeElapsed / data.slideDuration) * 100;

  percentageBar.style.width = `${width}%`;
};

/*====================================================
  Classes
====================================================*/
class carouselData extends carouselFullData {
  slideDuration: number;
  transitionDuration: number;
  disableMove: boolean;

  constructor() {
    super();
    this.slideDuration = 5000;
    this.transitionDuration = 300;
    this.disableMove = false;
  }

  updateSlideDuration(slideDuration: number) {
    this.slideDuration = slideDuration;
  }
  updateTransitionDurationn(transitionDuration: number) {
    this.transitionDuration = transitionDuration;
  }
  updateDisableMove(disableMove: boolean) {
    this.disableMove = disableMove;
  }
}

/*========================================
  Main function here
========================================*/
export const carouselPageBanner = () => {
  const carousels: NodeListOf<HTMLElement> = document.querySelectorAll(
    ".page-banner-carousel",
  );

  carousels.forEach((carousel) => {
    const slidesWrapper: HTMLElement | null = carousel.querySelector(
      ".page-banner-carousel-items",
    );
    if (!slidesWrapper) return;

    let slides: NodeListOf<HTMLElement> = slidesWrapper.querySelectorAll(
      ".page-banner-carousel-item",
    );
    removeHiddenSlide(slides);
    slides = slidesWrapper.querySelectorAll(".page-banner-carousel-item");

    const imageWrappers: NodeListOf<HTMLElement> =
      carousel.querySelectorAll(".inner");

    // Stop running code if there's only 1 slide
    if (slides.length <= 1) {
      carousel.classList.add("only-page");
      setImagesHeight(carousel, imageWrappers);

      window.addEventListener("resize", () =>
        setImagesHeight(carousel, imageWrappers),
      );
      return;
    }

    const pagesItems: NodeListOf<HTMLElement> =
      carousel.querySelectorAll(".banner-page-item");

    const pagesItemsMobile: HTMLElement | null = carousel.querySelector(
      ".banner-pages-wrapper-m",
    );

    let slideInterval: NodeJS.Timeout;
    let percentageBarInterval: NodeJS.Timeout;
    let percentageBarFullInterval: NodeJS.Timeout;
    let percentageBarStartTime: number;
    let percentageBarFullStartTime: number;

    // Initialise carousel data
    const data = new carouselData();
    data.updateActiveIndex(0);
    data.updateTotalSlides(slides.length);
    data.updateCarouselWidth(carousel.offsetWidth);

    // Create indicators
    const indicatorWrapper = createIndicator(slides.length, data.activeIndex);
    carousel.append(indicatorWrapper);

    if (pagesItemsMobile) {
      pagesItemsMobile.prepend(indicatorWrapper);
    } else {
      carousel.append(indicatorWrapper);
    }

    const indicators: NodeListOf<HTMLButtonElement> = carousel.querySelectorAll(
      ".carousel-indicator",
    );

    // Create percentage bars
    createPercentageBar(pagesItems);

    const percentageBars: NodeListOf<HTMLElement> =
      carousel.querySelectorAll(".banner-page-bar");

    const percentageBarFull = createPercentageBarElem("banner-page-bar-full");
    carousel.append(percentageBarFull);

    // Percentage bars timer (desktop)
    const updatePercentageBar = () => {
      percentageBarStartTime = new Date().getTime();
      percentageBarInterval = setInterval(
        () =>
          updatePercentageBarWidth(
            percentageBars[data.activeIndex],
            data,
            percentageBarStartTime,
          ),
        10,
      );
    };

    // Percentage bars timer (mobile)
    const updatePercentageBarFull = () => {
      percentageBarFullStartTime = new Date().getTime();
      percentageBarFullInterval = setInterval(
        () =>
          updatePercentageBarWidth(
            percentageBarFull,
            data,
            percentageBarFullStartTime,
          ),
        10,
      );
    };

    // Change slide
    const updateSlide = () => {
      slideInterval = setInterval(() => {
        clearInterval(percentageBarInterval);
        clearInterval(percentageBarFullInterval);

        goToNextSlide(carousel, slides, indicators, data);
        percentageBars[data.prevActiveIndex].style.width = "0%";

        updatePercentageBar();
        updatePercentageBarFull();
      }, data.slideDuration);
    };

    window.addEventListener("load", () => {
      // Initialise carousel
      showSlide(slides, data);
      setImagesHeight(carousel, imageWrappers);
      updatePercentageBar();
      updatePercentageBarFull();
      updateSlide();

      // Recalculate carousel height
      window.addEventListener("resize", () =>
        setImagesHeight(carousel, imageWrappers),
      );

      // For clicking on page or indicator to go to slide
      const goToSlide = (index: number) => {
        if (!data.disableMove) {
          data.updateDisableMove(true);
          clearInterval(slideInterval);
          clearInterval(percentageBarInterval);

          data.updatePrevActiveIndex(data.activeIndex);
          data.updateActiveIndex(index);
          setActiveIndicator(carousel, data.activeIndex, indicators);
          hideSlide(slides, data);
          showSlide(slides, data);
          percentageBars[data.prevActiveIndex].style.width = "0%";

          updatePercentageBar();
          updatePercentageBarFull();
          updateSlide();

          setTimeout(() => {
            data.updateDisableMove(false);
          }, data.transitionDuration);
        }
      };

      // Click on page to go to slide
      pagesItems.forEach((pagesItem, index) => {
        pagesItem.addEventListener("click", (event) => {
          event.preventDefault();
          goToSlide(index);
        });
      });

      // Click on indicator to go to slide
      indicators.forEach((indicator, index) => {
        indicator.addEventListener("click", (event) => {
          event.preventDefault();
          goToSlide(index);
        });
      });
    });
  });
};
