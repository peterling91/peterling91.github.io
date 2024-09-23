import { getPageZoom } from "./utilites";

// Zoom fix - updated values, look for getPageZoom()
export const courseDetailsBanner = (
  disableFullHeight: HTMLElement | null,
): void => {
  const containers = document.querySelectorAll(".scalable-banner-container");

  containers.forEach((container) => {
    const banner: HTMLElement | null =
      container.querySelector(".scalable-banner");
    const bannerBottom: HTMLElement | null =
      container.querySelector(".page-banner-sub");

    if (!banner || !bannerBottom) return;

    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;
    let windowAspectRation = windowWidth / windowHeight;
    let bannerHeight = !disableFullHeight
      ? windowHeight - 68 * getPageZoom()
      : 640 * getPageZoom();
    let bannerWidth = banner.offsetWidth;
    const finalHeight = 376 * getPageZoom();
    const finalWidth = 636 * getPageZoom();

    // Calculate the scroll fraction (0 at the top of the page, 1 at 70vh down)
    let scrollPosition;
    let scrollFraction;
    let speedX = windowWidth / finalWidth / 4;
    let speedY = windowHeight / finalHeight / 1.5;

    // Interpolate the properties between their start and end values
    let height;
    let width;
    let top;

    function updateBannerStyle(state: "load" | "resize" | "scroll"): void {
      if (!banner || !bannerBottom) return;

      if (state !== "scroll") {
        windowWidth = window.innerWidth;
        windowHeight = window.innerHeight;
        windowAspectRation = windowWidth / windowHeight;
        bannerHeight = !disableFullHeight
          ? windowHeight - 68 * getPageZoom()
          : 640 * getPageZoom();
        bannerWidth = windowWidth;
        speedX = windowWidth / finalWidth / 4;
        speedY = windowHeight / finalHeight / 1.5;
      }

      // Calculate the scroll fraction (0 at the top of the page, 1 at 70vh down)
      scrollPosition = window.scrollY;
      scrollFraction = Math.min(scrollPosition / bannerHeight, 1);

      // Interpolate the properties between their start and end values
      height = Math.max(
        finalHeight,
        bannerHeight - (bannerHeight * scrollFraction * speedY) / 2.5,
      );
      width = Math.max(
        finalWidth,
        bannerWidth - bannerWidth * scrollFraction * speedX * 1.18,
      );
      top = Math.floor(
        Math.min(scrollPosition * speedY * 1.11, bannerHeight + 136),
      );

      // Zoom fix - updated banner.style values
      if (windowWidth >= 768) {
        banner.style.height = `${height}px`;
        banner.style.width = `${width}px`;
        banner.style.transform = `translateY(${top}px)`;
        bannerBottom.style.paddingTop = `${
          bannerHeight + 56 * getPageZoom()
        }px`;
      } else {
        banner.style.height = `${window.innerHeight - 68 * getPageZoom()}px`;
        banner.style.width = `${window.innerWidth}px`;
        banner.style.transform = `translateY(0)`;
        bannerBottom.removeAttribute("style");
      }
    }

    window.addEventListener("scroll", () => updateBannerStyle("scroll"));

    // Fix - 01 May 2024 - only reset reset if width changes to prevent lag in mobile
    let windowWidthPrev = window.innerWidth;

    window.addEventListener("resize", () => {
      let windowWidth = window.innerWidth;

      if (windowWidth >= 768) {
        updateBannerStyle("resize");
      } else if (window.innerWidth !== windowWidthPrev) {
        updateBannerStyle("resize");
      }
      windowWidthPrev = windowWidth;
    });

    updateBannerStyle("load");
  });
};
