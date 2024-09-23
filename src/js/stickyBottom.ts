import { getBreakpoint } from "./utilites";

/*====================================================
  Reusable functions, see main function below
====================================================*/
const setContainerPadding = (
  container: HTMLElement,
  containerPaddingBottom: number,
  stickyItemBreakpoint: string | null,
  stickyItemHeight: number,
) => {
  if (stickyItemBreakpoint) {
    if (getBreakpoint(stickyItemBreakpoint)) {
      container.style.paddingBottom = `${
        containerPaddingBottom + stickyItemHeight
      }px`;
    } else {
      container.removeAttribute("style");
    }
  } else {
    container.style.paddingBottom = `${
      containerPaddingBottom + stickyItemHeight
    }px`;
  }
};

const setStickyItemPosition = (
  stickyItem: HTMLElement,
  stickyItemBreakpoint: string | null,
  containerRect: DOMRect,
  disableFullHeight: HTMLElement | null,
) => {
  if (disableFullHeight) return;

  const windowHeight = window.innerHeight;

  if (stickyItemBreakpoint) {
    if (
      getBreakpoint(stickyItemBreakpoint) &&
      containerRect.bottom <= windowHeight
    ) {
      stickyItem.style.transform = `translateY(-${
        windowHeight - containerRect.bottom
      }px)`;
    } else {
      stickyItem.removeAttribute("style");
    }
  } else {
    if (containerRect.bottom <= windowHeight) {
      stickyItem.style.transform = `translateY(-${
        windowHeight - containerRect.bottom
      }px)`;
    } else {
      stickyItem.removeAttribute("style");
    }
  }
};

const setSiteButtonPosition = (
  siteButton: HTMLElement,
  siteButtonBottom: number,
  stickyItemBreakpoint: string | null,
  stickyItemHeight: number,
  containerRect: DOMRect,
  disableFullHeight: HTMLElement | null,
) => {
  if (disableFullHeight) {
    if (getBreakpoint(stickyItemBreakpoint)) {
      siteButton.style.bottom = `${siteButtonBottom + stickyItemHeight - 8}px`;
    } else {
      siteButton.style.bottom = `${siteButtonBottom}px`;
    }
  } else {
    const windowHeight = window.innerHeight;

    if (stickyItemBreakpoint) {
      if (getBreakpoint(stickyItemBreakpoint)) {
        if (containerRect.bottom >= windowHeight) {
          siteButton.style.bottom = `${
            siteButtonBottom + stickyItemHeight - 8
          }px`;
        } else {
          siteButton.style.bottom = `${siteButtonBottom}px`;
        }
      } else {
        siteButton.style.bottom = `${siteButtonBottom}px`;
      }
    } else {
      if (containerRect.bottom >= windowHeight) {
        siteButton.style.bottom = `${
          siteButtonBottom + stickyItemHeight - 8
        }px`;
      } else {
        siteButton.style.bottom = `${siteButtonBottom}px`;
      }
    }
  }
};

const resize = (
  stickyItem: HTMLElement,
  stickyItemBreakpoint: string | null,
  stickyItemHeight: number,
  containerRect: DOMRect,
  helpImproveButton: HTMLElement | null,
  helpImproveButtonBottom: number,
  chatBotButton: HTMLElement | null,
  chatBotButtonBottom: number,
  backTopButton: HTMLElement | null,
  backTopButtonBottom: number,
  disableFullHeight: HTMLElement | null,
) => {
  setStickyItemPosition(
    stickyItem,
    stickyItemBreakpoint,
    containerRect,
    disableFullHeight,
  );

  if (helpImproveButton) {
    setSiteButtonPosition(
      helpImproveButton,
      helpImproveButtonBottom,
      stickyItemBreakpoint,
      stickyItemHeight,
      containerRect,
      disableFullHeight,
    );
  }

  if (chatBotButton) {
    setSiteButtonPosition(
      chatBotButton,
      chatBotButtonBottom,
      stickyItemBreakpoint,
      stickyItemHeight,
      containerRect,
      disableFullHeight,
    );
  }

  if (backTopButton) {
    setSiteButtonPosition(
      backTopButton,
      backTopButtonBottom,
      stickyItemBreakpoint,
      stickyItemHeight,
      containerRect,
      disableFullHeight,
    );
  }
};

/*========================================
  Main function here
========================================*/
export const stickyBottom = (disableFullHeight: HTMLElement | null) => {
  const containers: NodeListOf<HTMLElement> = document.querySelectorAll(
    "[data-sticky-bottom-container]",
  );

  for (
    let i = 0, containersLength = containers.length;
    i < containersLength;
    i++
  ) {
    const container: HTMLElement = containers[i];
    const stickyItem: HTMLElement | null = container.querySelector(
      "[data-sticky-bottom-item]",
    );

    if (!stickyItem) return;

    const stickyItemBreakpoint: string | null = container.getAttribute(
      "data-sticky-bottom-breakpoint",
    );
    let containerRect: DOMRect = container.getBoundingClientRect();
    const containerPaddingBottom: number = parseInt(
      window
        .getComputedStyle(container)
        .getPropertyValue("padding-bottom")
        .replace("px", ""),
    );
    let stickyItemHeight: number = stickyItem.offsetHeight;
    const helpImproveButton: HTMLElement | null = document.querySelector(
      ".site-button-help-improve",
    );
    const chatBotButton: HTMLElement | null = document.querySelector(
      ".site-button-chatbot",
    );
    const backTopButton: HTMLElement | null = document.querySelector(
      ".site-button-back-top",
    );
    let helpImproveButtonBottom: number = 16;
    let chatBotButtonBottom: number = 16;
    let backTopButtonBottom: number = 92;

    setContainerPadding(
      container,
      containerPaddingBottom,
      stickyItemBreakpoint,
      stickyItemHeight,
    );

    if (helpImproveButton) {
      helpImproveButtonBottom = parseInt(
        window
          .getComputedStyle(helpImproveButton)
          .getPropertyValue("bottom")
          .replace("px", ""),
      );
      setSiteButtonPosition(
        helpImproveButton,
        helpImproveButtonBottom,
        stickyItemBreakpoint,
        stickyItemHeight,
        containerRect,
        disableFullHeight,
      );
    }

    if (chatBotButton) {
      chatBotButtonBottom = parseInt(
        window
          .getComputedStyle(chatBotButton)
          .getPropertyValue("bottom")
          .replace("px", ""),
      );
      setSiteButtonPosition(
        chatBotButton,
        chatBotButtonBottom,
        stickyItemBreakpoint,
        stickyItemHeight,
        containerRect,
        disableFullHeight,
      );
    }

    if (backTopButton) {
      backTopButtonBottom = parseInt(
        window
          .getComputedStyle(backTopButton)
          .getPropertyValue("bottom")
          .replace("px", ""),
      );
      setSiteButtonPosition(
        backTopButton,
        backTopButtonBottom,
        stickyItemBreakpoint,
        stickyItemHeight,
        containerRect,
        disableFullHeight,
      );
    }

    window.addEventListener("resize", () => {
      containerRect = container.getBoundingClientRect();
      stickyItemHeight = stickyItem.offsetHeight;

      setContainerPadding(
        container,
        containerPaddingBottom,
        stickyItemBreakpoint,
        stickyItemHeight,
      );

      resize(
        stickyItem,
        stickyItemBreakpoint,
        stickyItemHeight,
        containerRect,
        helpImproveButton,
        helpImproveButtonBottom,
        chatBotButton,
        chatBotButtonBottom,
        backTopButton,
        backTopButtonBottom,
        disableFullHeight,
      );
    });

    window.addEventListener("scroll", () => {
      containerRect = container.getBoundingClientRect();

      resize(
        stickyItem,
        stickyItemBreakpoint,
        stickyItemHeight,
        containerRect,
        helpImproveButton,
        helpImproveButtonBottom,
        chatBotButton,
        chatBotButtonBottom,
        backTopButton,
        backTopButtonBottom,
        disableFullHeight,
      );
    });
  }
};
