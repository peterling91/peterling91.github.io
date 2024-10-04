// GSAP (plugin): https://gsap.com/docs/v3/
import { gsap , Flip} from "./registerGsap";

const SLIDE_DURATION = 1500;
const TRANSITION_DURATION = 300;
const START_TRANSITION_DURATION = 1300;
const ANIMATE_ITEM_DURATION = 1000;

/*====================================================
  Reusable functions, see main function below
====================================================*/
// Hide current slide
const hideSlide = (slides: NodeListOf<HTMLElement>, index: number) => {
  slides[index].classList.add("transition-out");

  setTimeout(() => {
    slides[index].classList.remove("show");
    slides[index].classList.remove("transition-out");
    window.scrollTo(0, 0);
  }, TRANSITION_DURATION);

  if (slides[index].getAttribute("data-pcm-animate-item") !== null) {
    const item: HTMLElement | null = slides[index].querySelector(
      "[data-pcm-animate-item-item]",
    );
    const itemBefore: HTMLElement | null = slides[index].querySelector(
      "[data-pcm-animate-item-item-before]",
    );

    if (!item || !itemBefore) return;

    setTimeout(() => {
      itemBefore.append(item);
      itemBefore.insertAdjacentElement("afterend", item);
    }, TRANSITION_DURATION);
  }
};

// Show current slide
const showSlide = (
  slides: NodeListOf<HTMLElement>,
  index: number,
  data: pcmData,
) => {
  window.scrollTo(0, 0);
  slides[index].classList.add("transition-in");

  setTimeout(
    () => {
      slides[index].classList.remove("transition-in");
      slides[index].classList.add("show");
      data.updateSlideIndex(index);
    },
    index === 0 ? START_TRANSITION_DURATION : TRANSITION_DURATION,
  );

  // animate page flying into furnance
  const hasAnimateItem =
    slides[index].getAttribute("data-pcm-animate-item") !== null;

  if (hasAnimateItem) {
    const item: HTMLElement | null = slides[index].querySelector(
      "[data-pcm-animate-item-item]",
    );
    const target: HTMLElement | null = slides[index].querySelector(
      "[data-pcm-animate-item-target]",
    );

    if (!item || !target) return;

    if (slides[index].getAttribute("data-pcm-animate-pencils") !== null) {
      // Pencils
      const min = Math.ceil(75);
      const max = Math.floor(120);
      const degree = Math.floor(Math.random() * (max - min) + min);
      const state = Flip.getState(item);

      gsap.to(item, {
        rotate: () => `${degree}deg`,
      });

      Flip.from(state, {
        ease: "none",
        absolute: true,
        scale: true,
        duration: 0.5,
      });

      const state2 = Flip.getState(item);

      item.removeAttribute("style");
      target.append(item);

      Flip.from(state2, {
        ease: "none",
        absolute: true,
        scale: true,
        duration: 0.5,
        delay: 0.5,
      });
    } else if (slides[index].getAttribute("data-pcm-animate-books") !== null) {
      // Books
      const state = Flip.getState(item);

      gsap.to(item, {
        yPercent: -60,
        x: 250,
      });

      Flip.from(state, {
        ease: "none",
        absolute: true,
        scale: true,
        duration: 0.5,
      });

      const state2 = Flip.getState(item);

      item.removeAttribute("style");
      target.append(item);

      Flip.from(state2, {
        ease: "none",
        absolute: true,
        scale: true,
        duration: 0.5,
        delay: 0.5,
      });
    } else {
      // Others
      const delay: string | null = slides[index].getAttribute(
        "data-pcm-animate-item-delay",
      );

      const state = Flip.getState(item);

      target.append(item);

      Flip.from(state, {
        ease: "power2.inOut",
        absolute: true,
        scale: true,
        duration: 0.8,
        delay: delay ? delay : 0,
      });
    }
    setTimeout(() => {
      data.updateIsTransitioning(false);
    }, ANIMATE_ITEM_DURATION);
  } else {
    setTimeout(() => {
      data.updateIsTransitioning(false);
    }, TRANSITION_DURATION);
  }

  // Lottie animations
  const lottiePlayers: NodeListOf<any> =
    slides[index].querySelectorAll("lottie-player");

  lottiePlayers.forEach((lottiePlayer) => {
    const customDelay = lottiePlayer.getAttribute("data-delay");
    const delay = customDelay ? parseInt(customDelay) : 700;

    setTimeout(() => {
      lottiePlayer.seek(0);
      lottiePlayer.play();
    }, delay);
  });
};

// Show next slide, hide current slide
const showNextSlide = (
  prevButtonWrapper: HTMLElement,
  startSlide: HTMLElement,
  slides: NodeListOf<HTMLElement>,
  index: number,
  data: pcmData,
) => {
  if (index > 0) {
    hideSlide(slides, index - 1);
  } else {
    hideStartSlide(prevButtonWrapper, startSlide);
  }
  if (
    slides[data.slideIndex].getAttribute("data-pcm-slide-stop") !== null ||
    slides[data.slideIndex].getAttribute("data-pcm-slide-end") !== null
  ) {
    setTimeout(() => {
      showSlide(slides, index, data);
    }, TRANSITION_DURATION);
  } else {
    showSlide(slides, index, data);
  }
};

// Got to next slide
const nextSlide = (
  startSlide: HTMLElement,
  slides: NodeListOf<HTMLElement>,
  prevButtonWrapper: HTMLElement,
  data: pcmData,
) => {
  setTimeout(() => {
    let slideDuration: number = SLIDE_DURATION + TRANSITION_DURATION;
    let customSlideDuration: string | null = null;

    data.updateSlideIndex(Math.min(data.slideIndex + 1, slides.length - 1));
    showNextSlide(prevButtonWrapper, startSlide, slides, data.slideIndex, data);

    customSlideDuration = slides[data.slideIndex].getAttribute(
      "data-pcm-slide-duration",
    );
    if (customSlideDuration)
      slideDuration = parseInt(customSlideDuration) + TRANSITION_DURATION;

    if (slides[data.slideIndex].getAttribute("data-pcm-slide-stop") === null) {
      prevButtonWrapper.classList.remove("show");
    } else {
      prevButtonWrapper.classList.add("show");
    }

    setTimeout(() => {
      if (
        slides[data.slideIndex].getAttribute("data-pcm-slide-stop") === null
      ) {
        nextSlide(startSlide, slides, prevButtonWrapper, data);
      }
    }, slideDuration);
  }, TRANSITION_DURATION);
};

// hide start slide
const hideStartSlide = (
  prevButtonWrapper: HTMLElement,
  startSlide: HTMLElement,
) => {
  prevButtonWrapper.classList.add("show");
  startSlide.classList.add("transition-out");

  setTimeout(() => {
    startSlide.classList.add("hide");
    startSlide.classList.remove("transition-out");
  }, START_TRANSITION_DURATION);
};

// show start slide
const showStartSlide = (
  prevButtonWrapper: HTMLElement,
  startSlide: HTMLElement,
) => {
  prevButtonWrapper.classList.remove("show");
  startSlide.classList.remove("hide");
  startSlide.classList.add("transition-in");

  setTimeout(() => {
    startSlide.classList.remove("transition-in");
  }, 1);
};

class pcmData {
  slideIndex: number;
  isTransitioning: boolean;

  constructor() {
    this.slideIndex = 0;
    this.isTransitioning = false;
  }
  updateSlideIndex(slideIndex: number) {
    this.slideIndex = slideIndex;
  }
  updateIsTransitioning(isTransitioning: boolean) {
    this.isTransitioning = isTransitioning;
  }
}

const zoomPage = () => {
  const root: HTMLElement | null = document.querySelector(":root");
  if (!root) return;

  let zoomY, zoomX, zoom, windowWidth, windowHeight;

  const setZoom = () => {
    // zoomBaseValue = root.style.getPropertyValue("--zoom");
    // zoomBase = zoomBaseValue ? parseFloat(zoomBaseValue) : 1;
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
    zoomX = 1;
    zoomY = 1;

    if (windowHeight > 768) {
      zoomY = windowHeight / 768;

      // if (windowWidth > 1200) {
      //   zoomX = windowWidth / 1200;
      // }

      // if (windowWidth > 1800) {
      //   zoomX = windowWidth / 856;
      // }
    }

    zoom = Math.min(zoomX, zoomY);

    root.style.setProperty("--zoom-pcm", `${zoom}`);
  };

  setZoom();

  window.addEventListener("resize", setZoom);
};

/*========================================
  Main function here
========================================*/
export const pcm = () => {
  const startSlide: HTMLElement | null = document.querySelector(
    "[data-pcm-slide-start]",
  );
  if (!startSlide) return;

  const startButton: HTMLButtonElement | null = document.querySelector(
    "[data-pcm-button-start]",
  );
  if (!startButton) return;

  const prevButton: HTMLButtonElement | null = document.querySelector(
    "[data-pcm-button-prev]",
  );
  if (!prevButton) return;

  const prevButtonWrapper: HTMLElement | null = document.querySelector(
    ".how-you-learn-prev-wrapper",
  );
  if (!prevButtonWrapper) return;

  const restartButton: HTMLButtonElement | null = document.querySelector(
    "[data-pcm-button-restart]",
  );
  if (!restartButton) return;

  const nextButtons: NodeListOf<HTMLButtonElement> = document.querySelectorAll(
    "[data-pcm-button-next]",
  );
  const slides: NodeListOf<HTMLElement> =
    document.querySelectorAll("[data-pcm-slide]");
  const data = new pcmData();

  zoomPage();

  // Start slide show
  startButton.addEventListener("click", () => {
    if (slides.length > 0) {
      let slideDuration: number = SLIDE_DURATION;
      let customSlideDuration: string | null = slides[
        data.slideIndex
      ].getAttribute("data-pcm-slide-duration");
      if (customSlideDuration) slideDuration = parseInt(customSlideDuration);

      showNextSlide(
        prevButtonWrapper,
        startSlide,
        slides,
        data.slideIndex,
        data,
      );

      if (
        slides[data.slideIndex].getAttribute("data-pcm-slide-stop") === null
      ) {
        setTimeout(() => {
          nextSlide(startSlide, slides, prevButtonWrapper, data);
        }, slideDuration);
      }
    }
  });

  // Restart slide show
  restartButton.addEventListener("click", () => {
    if (data.isTransitioning) return;

    data.updateIsTransitioning(true);

    for (let i = 0, slidesLength = slides.length; i < slidesLength; i++) {
      hideSlide(slides, i);
    }
    data.updateSlideIndex(0);
    showStartSlide(prevButtonWrapper, startSlide);
  });

  // Go to previous slide with "stop"
  prevButton.addEventListener("click", () => {
    if (data.isTransitioning) return;

    data.updateIsTransitioning(true);

    if (data.slideIndex === 0) {
      hideSlide(slides, 0);
      showStartSlide(prevButtonWrapper, startSlide);
    } else {
      hideSlide(slides, data.slideIndex);

      for (let i = data.slideIndex - 1; i > -1; i--) {
        let slide = slides[i];

        if (slide.getAttribute("data-pcm-slide-stop") !== null) {
          showSlide(slides, i, data);
          break;
        }
      }
    }
  });

  // Set z-index - later slides are on top
  for (let i = 0, slidesLength = slides.length; i < slidesLength; i++) {
    const slide = slides[i];
    slide.style.zIndex = `${i + 1}`;
  }

  // Click to go to next slide
  for (
    let i = 0, nextButtonsLength = nextButtons.length;
    i < nextButtonsLength;
    i++
  ) {
    const nextButton = nextButtons[i];

    nextButton.addEventListener("click", () => {
      if (data.isTransitioning) return;

      data.updateIsTransitioning(true);

      nextSlide(startSlide, slides, prevButtonWrapper, data);
    });
  }
};
