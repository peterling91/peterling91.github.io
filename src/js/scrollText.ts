function lerp(x: number, A: number, B: number, a: number, b: number): number {
  return ((b - a) * (x - A)) / (B - A) + a;
}

function toggleScroll(
  enabled: boolean,
  textPortion: HTMLElement,
  scrollContainer: HTMLElement,
) {
  if (enabled) {
    scrollContainer.style.textAlign = "left";
    textPortion.style.left = "0"; // Make sure it starts from position 0
  } else {
    textPortion.style.left = "initial"; // Adjusted this line
    scrollContainer.style.textAlign = "center";
  }
}

const resize = (textPortion: HTMLElement, scrollContainer: HTMLElement) => {
  if (scrollContainer.offsetWidth >= textPortion.offsetWidth) {
    toggleScroll(false, textPortion, scrollContainer);
  } else {
    toggleScroll(true, textPortion, scrollContainer);
  }
};

export const scrollText = (): void => {
  let isScrollEnabled = false; // Initially set to false
  const textPortion: HTMLElement | null = document.querySelector(
    ".scroll-text-portion",
  );
  const scrollContainer: HTMLElement | null = document.querySelector(
    ".text-scroll-container",
  );
  const touchScroll: HTMLElement | null =
    document.querySelector(".touch-scroll"); // Defining touchScroll here

  function updateScrollPosition(
    isScrollEnabled: boolean,
    textPortion: HTMLElement,
    scrollContainer: HTMLElement,
  ) {
    if (!isScrollEnabled) return;

    const textPortionWidth: number = textPortion.offsetWidth;
    const scrollContainerWidth: number = scrollContainer.offsetWidth;
    const leftoverValue: number = textPortionWidth - scrollContainerWidth;
    const scrollPosition: number =
      window.scrollY || document.documentElement.scrollTop;

    // Adjusting our lerp's A start value to match the moment when `.touch-scroll` touches the top.
    const startScrollPosition = touchScroll!.offsetTop;
    const leftValue: number = lerp(
      scrollPosition,
      startScrollPosition,
      startScrollPosition + 360,
      0,
      -leftoverValue,
    );

    textPortion.style.left = `${Math.max(
      -1 * (leftoverValue + 24),
      Math.min(0, leftValue * 1.2),
    )}px`;
  }

  if (textPortion && scrollContainer) {
    const touchScrollObserver = new IntersectionObserver(
      (entries, observer) => {
        const entry = entries[0];

        if (entry.boundingClientRect.top <= 0) {
          isScrollEnabled = true; // Activate scrolling once .touch-scroll is at the top
          toggleScroll(true, textPortion, scrollContainer);
          observer.disconnect();
        }
      },
      {
        threshold: 0, // trigger the callback whenever any part of the target is visible

        // Zoom fix - change units from px to rem
        rootMargin: "-0.0625rem 0 0 0", // -1px top margin to ensure top edge triggers the callback
      },
    );

    const touchScroll = document.querySelector(".touch-scroll");
    touchScroll && touchScrollObserver.observe(touchScroll);

    window.addEventListener("scroll", function () {
      updateScrollPosition(isScrollEnabled, textPortion, scrollContainer);
    });

    window.addEventListener("resize", () =>
      resize(textPortion, scrollContainer),
    );
  }
};
