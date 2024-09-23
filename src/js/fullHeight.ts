import { getBreakpoint } from "./utilites";

export const fullHeight = (disableFullHeight: HTMLElement | null) => {
  if (disableFullHeight) return;

  // Fix - 01 May 2024
  // Updated values below to fix some elements such as the modal being cropped off by address bar in mobile view

  // Set height
  setFullHeight(".scene-one", "height", 0);
  setFullHeight(".scene-two", "height", 0, null, null, "vh");
  setFullHeight(".nyp-map", "height", 68, null, null, "svh");
  setFullHeight("#two-map-container", "height", 68, null, null, "svh");
  setFullHeight(".modal.zoom-modal", "height", 68, "max-lg");
  setFullHeight(".modal.zoom-modal", "max", 132, "lg");
  setFullHeight(".masonry", "height", 0, null, null, "svh");

  // Set minimum height
  setFullHeight(".loading", "min", 0);
  setFullHeight("html", "min", 0, null, null, "vh");
  setFullHeight(".main-container", "min", 375, null, null, "vh");
  setFullHeight(".full-height", "min", 0, null, null, "vh"); // Added for sustainability
  setFullHeight(".full-height-navbar", "min", 68, null, null, "vh");
  setFullHeight(".tall-card", "min", 0, null, null, "svh");
  setFullHeight(".page-banner.v3", "min", 68, null, null, "svh");
  setFullHeight(
    "main > .page-banner.v4[data-transparent-navbar]",
    "min",
    0,
    null,
    null,
    "svh",
  );
  setFullHeight(
    ".page-banner.page-banner-masonry",
    "min",
    0,
    null,
    null,
    "svh",
  );
  setFullHeight(".text-banner", "min", 0, null, null, "svh");
  setFullHeight(".text-banner-inner", "min", 0, null, null, "svh");
  setFullHeight(
    ".text-banner-w-image .text-banner-wrapper",
    "min",
    0,
    null,
    null,
    "svh",
  );
  setFullHeight(
    ".page-banner-carousel .bottom-banner",
    "min",
    0,
    null,
    null,
    "svh",
  );
  setFullHeight(
    "main > .page-banner-carousel:first-of-type:not([data-transparent-navbar]) .bottom-banner",
    "min",
    68,
    null,
    null,
    "svh",
  );
  setFullHeight(".scalable-banner img", "min", 0, "md", null, "vh");
  setFullHeight("#sticky-parallax-header", "min", 68, "max-md", null, "vh");
  setFullHeight(".switch-role", "min", 0, null, null, "vh");
  setFullHeight(".how-you-learn-section", "min", 68, null, null, "svh");
  setFullHeight(".how-you-learn-intro", "min", 68, null, null, "svh");
  setFullHeight("dialog .side-tabs-content", "min", 116, "lg");

  // Set maximum height
  setFullHeight(".loading", "max", 0);
  setFullHeight("dialog .side-tabs-wrapper", "max", 116, "lg");
  setFullHeight(".scene-one", "max", 0);
  setFullHeight(".scene-two", "max", 0, null, null, "svh");
  setFullHeight("#two-map-container svg", "max", 68, null, null, "svh");
  setFullHeight(".mansory", "max", 0, null, null, "vh");
  setFullHeight(".page-banner.v4.cd", "max", 68, null, null, "vh");
  setFullHeight(".how-you-learn-section.fixed-height", "max", 68, "svh");
};

const setFullHeight = (
  elementClass: string,
  type: "height" | "min" | "max",
  offset: number,
  _breakpoint?: string | undefined | null,
  multiplier?: number | undefined | null,
  unit: "vh" | "dvh" | "svh" = "dvh", // Fix - 01 May 2024 - Added line
) => {
  const elements: NodeListOf<HTMLElement> =
    document.querySelectorAll(elementClass);

  elements.forEach((element) => {
    setFullHeightStyle(
      element,
      type,
      offset,
      _breakpoint,
      multiplier,
      null,
      unit, // Fix - 01 May 2024 - Added line
    );

    // Fix - 01 May 2024 - Commented code below
    window.addEventListener("resize", () =>
      setTimeout(() => {
        setFullHeightStyle(element, type, offset, _breakpoint, multiplier);
      }, 2),
    );
  });
};

const setFullHeightStyleCSS = (
  element: HTMLElement,
  type: "height" | "min" | "max",
  offset: number,
  multiplier?: number | undefined | null,
  unit: "vh" | "dvh" | "svh" = "dvh", // Fix - 01 May 2024 - Added line
) => {
  // Android fix - Updated windowHeight
  const windowHeight: number = multiplier ? multiplier * 100 : 100;

  // Android fix - Updated height
  const height = `calc(${windowHeight}vh - ${offset}px)`;
  const dynamicHeight = `calc(${windowHeight}${unit} - ${offset}px)`; // Fix - 01 May 2024 - Added line

  // Not using window.innerHeight because it's not detected correctly in Andriod devices
  // const windowHeight: number = multiplier
  //   ? multiplier * window.innerHeight
  //   : window.innerHeight;

  // const height: string = `${windowHeight - (offset * getPageZoom())}px`;

  // vh unit is kept below as a fallback
  switch (type) {
    case "height":
      element.style.height = "";
      element.style.height = height;
      if (unit !== "vh") element.style.height = dynamicHeight; // Fix - 01 May 2024 - Added line
      break;
    case "min":
      element.style.minHeight = "";
      element.style.minHeight = height;
      if (unit !== "vh") element.style.minHeight = dynamicHeight; // Fix - 01 May 2024 - Added line
      break;
    case "max":
      element.style.maxHeight = "";
      element.style.maxHeight = height;
      if (unit !== "vh") element.style.maxHeight = dynamicHeight; // Fix - 01 May 2024 - Added line
      break;
    default:
      break;
  }
};

export const setFullHeightStyleNoReset = (
  element: HTMLElement,
  type: "height" | "min" | "max",
  offset: number,
  _breakpoint: string | undefined | null,
  multiplier?: number | undefined | null,
  disableFullHeight?: HTMLElement | null,
  unit: "vh" | "dvh" | "svh" = "dvh", // Fix - 01 May 2024 - Added line
) => {
  if (disableFullHeight) {
    return;
  } else {
    if (document.querySelector("[data-disable-full-height]")) return;
  }

  element.classList.add("no-transition");

  if (!_breakpoint) {
    setFullHeightStyleCSS(element, type, offset, multiplier, unit); // Fix - 01 May 2024 - Updated line
  } else {
    if (getBreakpoint(_breakpoint)) {
      setFullHeightStyleCSS(element, type, offset, multiplier, unit); // Fix - 01 May 2024 - Updated line
    }
  }
  element.classList.remove("no-transition");
};

export const setFullHeightStyle = (
  element: HTMLElement,
  type: "height" | "min" | "max",
  offset: number,
  _breakpoint: string | undefined | null,
  multiplier?: number | undefined | null,
  disableFullHeight?: HTMLElement | null,
  unit: "vh" | "dvh" | "svh" = "dvh", // Fix - 01 May 2024 - Added line
) => {
  if (disableFullHeight) {
    return;
  } else {
    if (document.querySelector("[data-disable-full-height]")) return;
  }
  element.classList.add("no-transition");

  if (!_breakpoint) {
    setFullHeightStyleCSS(element, type, offset, multiplier, unit); // Fix - 01 May 2024 - Updated line
  } else {
    if (getBreakpoint(_breakpoint)) {
      setFullHeightStyleCSS(element, type, offset, multiplier, unit); // Fix - 01 May 2024 - Updated line
    } else {
      switch (type) {
        case "height":
          element.style.height = "";
          break;
        case "min":
          element.style.minHeight = "";
          break;
        case "max":
          element.style.maxHeight = "";
          break;
        default:
          break;
      }
    }
  }
  element.classList.remove("no-transition");
};
