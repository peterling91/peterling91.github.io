// Lenis (plugin): https://github.com/darkroomengineering/lenis
import Lenis from "lenis";

import { BREAKPOINT } from "./constants";
import { lenisMain } from ".";

export const getBreakpoint = (breakpointSet: string | null | undefined) => {
  const windowWidth: number = window.innerWidth;

  switch (breakpointSet) {
    case "xs":
      if (windowWidth >= BREAKPOINT.XS) {
        return true;
      }
      break;
    case "max-xs":
      if (windowWidth < BREAKPOINT.XS) {
        return true;
      }
      break;
    case "sm":
      if (windowWidth >= BREAKPOINT.SM) {
        return true;
      }
      break;
    case "max-sm":
      if (windowWidth < BREAKPOINT.SM) {
        return true;
      }
      break;
    case "md":
      if (windowWidth >= BREAKPOINT.MD) {
        return true;
      }
      break;
    case "max-md":
      if (windowWidth < BREAKPOINT.MD) {
        return true;
      }
      break;
    case "lg":
      if (windowWidth >= BREAKPOINT.LG) {
        return true;
      }
      break;
    case "max-lg":
      if (windowWidth < BREAKPOINT.LG) {
        return true;
      }
      break;
    case "xl":
      if (windowWidth >= BREAKPOINT.XL) {
        return true;
      }
      break;
    case "max-xl":
      if (windowWidth < BREAKPOINT.XL) {
        return true;
      }
      break;
    case null:
    case undefined:
    default:
      return false;
  }
  return false;
};

export const smoothScroll = (
  target?: HTMLElement | null,
  positionOffset?: string,
  wrapper?: HTMLElement | null,
  _duration?: number,
) => {
  const getTargetPosition = (
    target: HTMLElement | null,
    positionOffset: string | undefined,
  ) => {
    if (target && positionOffset) {
      if (wrapper) {
        return (
          wrapper.scrollTop +
          target.getBoundingClientRect().top +
          parseInt(positionOffset)
        );
      }
      return (
        window.scrollY +
        target.getBoundingClientRect().top +
        parseInt(positionOffset)
      );
    }
    if (target) {
      if (wrapper) {
        return wrapper.scrollTop + target.getBoundingClientRect().top;
      }
      return window.scrollY + target.getBoundingClientRect().top;
    }
    return 0;
  };

  const ease = (
    currentTime: number,
    startingPosition: number,
    distance: number,
    timeMultiplier: number,
  ) => {
    // Easing function - here using easeInOutQuad
    currentTime /= timeMultiplier / 2;
    if (currentTime < 1)
      return (distance / 2) * currentTime * currentTime + startingPosition;
    currentTime--;
    return (
      (-distance / 2) * (currentTime * (currentTime - 2) - 1) + startingPosition
    );
  };

  let startingPosition: number = wrapper ? wrapper.scrollTop : window.scrollY;
  let targetPosition: number = target
    ? getTargetPosition(target, positionOffset)
    : 0;
  const duration: number = _duration ? _duration : 1000;
  const startTime: number = performance.now();

  const setPositions = () => {
    startingPosition = wrapper ? wrapper.scrollTop : window.scrollY;
    targetPosition = target ? getTargetPosition(target, positionOffset) : 0;
  };

  window.addEventListener("resize", () => setPositions());

  const scroll = () => {
    let currentTime = Math.min(1, (performance.now() - startTime) / duration);
    const newPosition = ease(
      currentTime,
      startingPosition,
      targetPosition - startingPosition,
      1,
    );

    if (wrapper) {
      wrapper.scrollTo(0, newPosition);
    } else {
      window.scrollTo(0, newPosition);
    }

    if (currentTime < 1) {
      requestAnimationFrame(scroll);
    }
  };

  requestAnimationFrame(scroll);
};

// Android fix - Updated setLenisScroll
export const setLenisScroll = (
  element: any,
  orientation?: "vertical" | "horizontal",
  gestureOrientation?: "vertical" | "horizontal" | "both",
) => {
  if (!lenisMain) return; // Fix - 01 May 2024 - Updated line, only runs code if lenis is active on page

  const lenisElement = new Lenis({
    lerp: 0.1,
    smoothWheel: true,
    syncTouch: true,
    orientation: orientation ? orientation : "vertical",
    gestureOrientation: gestureOrientation ? gestureOrientation : "vertical",
    wrapper: element,
  });

  const rafElement = (time: any) => {
    lenisElement.raf(time);
    requestAnimationFrame(rafElement);
  };
  requestAnimationFrame(rafElement);

  if (
    orientation === "horizontal" ||
    gestureOrientation === "horizontal" ||
    gestureOrientation === "both"
  ) {
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const target = entry.target as HTMLElement;

        const elementWidth = target.offsetWidth;
        const elementScroll = target.scrollWidth;

        if (elementWidth === 0 || elementScroll === 0) return;

        if (elementWidth >= elementScroll) {
          lenisElement.stop();
        } else {
          lenisElement.start();
        }
      }
    });

    resizeObserver.observe(element);
  }
};

// Android fix - Updated setLenisScrollPopUp
export class setLenisScrollPopUp {
  element: any;
  orientation: "vertical" | "horizontal";
  gestureOrientation: "vertical" | "horizontal" | "both";
  lenisElement: Lenis | null;

  constructor(
    element: any,
    orientation: "vertical" | "horizontal" = "vertical",
    gestureOrientation: "vertical" | "horizontal" | "both" = "vertical",
  ) {
    this.element = element;
    this.orientation = orientation;
    this.gestureOrientation = gestureOrientation;
    this.lenisElement = null;
  }

  init() {
    if (!lenisMain) return; // Fix - 01 May 2024 - Updated line, only runs code if lenis is active on page

    this.lenisElement = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      syncTouch: true,
      orientation: this.orientation,
      gestureOrientation: this.gestureOrientation,
      wrapper: this.element,
    });

    if (this.lenisElement) {
      const rafElement = (time: any) => {
        this.lenisElement && this.lenisElement.raf(time);
        requestAnimationFrame(rafElement);
      };
      requestAnimationFrame(rafElement);
    }
  }

  resize() {
    if (!lenisMain) return; // Fix - 01 May 2024 - Updated line, only runs code if lenis is active on page

    this.lenisElement && this.lenisElement.resize();
  }

  destroy() {
    if (!lenisMain) return; // Fix - 01 May 2024 - Updated line, only runs code if lenis is active on page

    this.lenisElement && this.lenisElement.destroy();
  }

  scrollTo(postion: number, immediate: boolean) {
    if (!lenisMain) return; // Fix - 01 May 2024 - Updated line, only runs code if lenis is active on page

    this.lenisElement &&
      this.lenisElement.scrollTo(postion, { immediate: immediate });
  }
}

export const getPageZoom = () => {
  return 1;
  // const root: HTMLElement | null = document.querySelector(":root");

  // if (!root) return 1;

  // const zoomValue = root.style.getPropertyValue("--zoom");
  // return zoomValue ? parseFloat(zoomValue) : 1;
};
