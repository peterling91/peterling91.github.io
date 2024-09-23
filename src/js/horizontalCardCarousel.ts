/*========================================
  Horizontal Card Carousel (cards)
 ========================================*/
export const horizontalCardCarousel = () => {
  const syncButtonGroups = (
    originalPrevButton: HTMLElement,
    originalNextButton: HTMLElement,
    newPrevButton: HTMLElement,
    newNextButton: HTMLElement,
  ) => {
    newPrevButton.addEventListener("click", () => {
      originalPrevButton.click();
    });

    newNextButton.addEventListener("click", () => {
      originalNextButton.click();
    });
  };

  // Function to initialize each carousel
  const initializeCarousel = (carouselContainer1: HTMLElement): void => {
    const carousel1: HTMLElement | null =
      carouselContainer1.querySelector(".penguin-carousel");
    if (!carousel1) return;

    const mobilePrevButton: HTMLElement | null =
      carouselContainer1.querySelector(".mobile-penguin-arrows .penguin-prev");
    const mobileNextButton: HTMLElement | null =
      carouselContainer1.querySelector(".mobile-penguin-arrows .penguin-next");
    const cards1: NodeListOf<HTMLElement> = carousel1?.querySelectorAll(
      ".penguin-carousel .penguin-card",
    ) as NodeListOf<HTMLElement>;

    const totalCards1: number = cards1 ? cards1.length : 0;

    let currentIndex1: number = 0;

    const nextButton1: HTMLElement | null =
      carouselContainer1.querySelector(".penguin-next");
    const prevButton1: HTMLElement | null =
      carouselContainer1.querySelector(".penguin-prev");

    if (prevButton1 && nextButton1 && mobilePrevButton && mobileNextButton) {
      syncButtonGroups(
        prevButton1,
        nextButton1,
        mobilePrevButton,
        mobileNextButton,
      );
    }

    const updateCarousel = (): void => {
      const cardWidth: number = cards1[currentIndex1].offsetWidth;
      const visibleWidth: number = cardWidth * 1; // Set this value to the desired visible width of the previous card

      // Calculate the translateX value
      let translateX: number;

      cards1.forEach((card, index) => {
        if (index === currentIndex1) {
          card.classList.add("active");
        } else {
          card.classList.remove("active");
        }
      });

      // Ensure currentIndex is within valid range
      currentIndex1 =
        currentIndex1 < 0 ? totalCards1 - 1 : currentIndex1 % totalCards1;

      // Calculate the translateX value to center the current card within the visible width
      translateX = -(currentIndex1 * cardWidth);

      carousel1.style.transform = `translateX(${translateX}px)`; // Adjust the transform here

      // Inside the updateCarousel function

      // Check if we're dealing with the specific carousel variant

      // Assuming prevButton and nextButton are always HTMLElements, use type assertion
      const prevButtonEl = prevButton1 as HTMLElement;
      const nextButtonEl = nextButton1 as HTMLElement;

      const mobilePrevButtonEl = mobilePrevButton as HTMLElement;
      const mobileNextButtonEl = mobileNextButton as HTMLElement;

      // Use optional chaining to safely access the setAttribute and removeAttribute methods
      if (currentIndex1 === 0) {
        prevButtonEl?.setAttribute("disabled", "true");
        prevButtonEl?.classList.add("disabled");
        mobilePrevButtonEl?.setAttribute("disabled", "true");
        mobilePrevButtonEl?.classList.add("disabled");
      } else {
        prevButtonEl?.removeAttribute("disabled");
        prevButtonEl?.classList.remove("disabled");
        mobilePrevButtonEl?.removeAttribute("disabled");
        mobilePrevButtonEl?.classList.remove("disabled");
      }

      // Disable 'Next' button if on the last slide
      if (currentIndex1 === totalCards1 - 1) {
        nextButtonEl?.setAttribute("disabled", "true");
        nextButtonEl?.classList.add("disabled");
        mobileNextButtonEl?.setAttribute("disabled", "true");
        mobileNextButtonEl?.classList.add("disabled");
      } else {
        nextButtonEl?.removeAttribute("disabled");
        nextButtonEl?.classList.remove("disabled");
        mobileNextButtonEl?.removeAttribute("disabled");
        mobileNextButtonEl?.classList.remove("disabled");
      }
    };

    nextButton1?.addEventListener("click", () => {
      if (currentIndex1 < totalCards1 - 1) {
        currentIndex1++;
      } else {
        //currentIndex1 = 0; // Loop back to the first card
        return;
      }
      updateCarousel();
    });

    prevButton1?.addEventListener("click", () => {
      if (currentIndex1 > 0) {
        currentIndex1--;
      } else {
        // currentIndex1 = totalCards1 - 1; // Loop back to the last card
        return;
      }
      updateCarousel();
    });

    updateCarousel(); // Initialize the carousel

    // Fix - 01 May 2024 - only reset carousel if width changes to prevent lag in mobile
    let windowWidthPrev = window.innerWidth;

    window.addEventListener("resize", () => {
      let windowWidth = window.innerWidth;

      if (window.innerWidth !== windowWidthPrev) {
        updateCarousel();
      }
      windowWidthPrev = windowWidth;
    });

    let startX = 0;
    let startTime = 0;

    const handleTouchStart = (event: TouchEvent): void => {
      startX = event.touches[0].clientX;
      startTime = Date.now();
      // console.log("Touch Start"); // Debugging
    };

    const handleTouchEnd = (event: TouchEvent) => {
      const endX = event.changedTouches[0].clientX;
      // console.log("Touch End"); // Debugging

      const endTime = Date.now();
      const distance = endX - startX;
      const timeElapsed = endTime - startTime;
      const velocity = distance / timeElapsed; // Calculate swipe velocity

      // Define a threshold for what you consider a swipe
      const swipeThreshold = 0.5; // Adjust this value based on testing

      if (Math.abs(velocity) > swipeThreshold) {
        // Check swipe direction
        if (velocity < 0) {
          // Swipe left
          currentIndex1 = Math.min(currentIndex1 + 1, totalCards1 - 1);
        } else {
          // Swipe right
          currentIndex1 = Math.max(currentIndex1 - 1, 0);
        }
      }

      updateCarousel();
    };

    // console.log("Adding Event Listeners"); // Debugging
    carousel1.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });
    carousel1.addEventListener("touchend", handleTouchEnd, { passive: true });
  };

  // Initialize each carousel on the page
  const carouselContainers: NodeListOf<HTMLElement> = document.querySelectorAll(
    ".penguin-carousel-container",
  );
  carouselContainers.forEach((container) => {
    initializeCarousel(container);
  });
};
