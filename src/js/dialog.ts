// Lenis (plugin): https://github.com/darkroomengineering/lenis
import Lenis from "lenis";

import { getBreakpoint, setLenisScrollPopUp, getPageZoom } from "./utilites";
import { setFullHeightStyle, setFullHeightStyleNoReset } from "./fullHeight";
import { hasScrollAnimation, isTouch } from ".";

/*====================================================
  Reusable functions, see main function below
====================================================*/
// Fix - 29 Apr 2024 - Page not scrollable if modal is closed
const closeDialog = (
  dialog: HTMLDialogElement,
  dialogBreakpoint: string | null,
  lenisDialogBody: setLenisScrollPopUp | null,
  lenisSideTabs: setLenisScrollPopUp | null,
  lenisMain: Lenis | null,
) => {
  const breakpoint = dialogBreakpoint ? dialogBreakpoint : "lg";
  const timeout = getBreakpoint(breakpoint) ? 300 : 500;

  dialog.classList.add("closing");

  setTimeout(() => {
    dialog.close();
    dialog.classList.remove("closing");
  }, timeout);

  // Fix - 29 Apr 2024 - Page not scrollable if modal is closed
  // Added lenisMain
  lenisMain && lenisMain.start();
  document.body.style.overflow = "";

  if (lenisDialogBody) lenisDialogBody.destroy();

  if (lenisSideTabs) lenisSideTabs.destroy();
};

const showDialog = (
  dialog: HTMLDialogElement,
  dialogBody: HTMLElement | null,
  lenisDialogBody: setLenisScrollPopUp | null,
  lenisSideTabs: setLenisScrollPopUp | null,
) => {
  dialog.classList.add("opening");
  dialog.showModal();

  setTimeout(() => {
    dialog.classList.remove("opening");
  }, 300);

  // Fix - 29 Apr 2024 - Scroll to top of modal
  dialogBody && dialogBody.scrollTo(0, 0);

  if (lenisDialogBody) {
    setTimeout(() => {
      lenisDialogBody.init();
    }, 600);
  }

  if (lenisSideTabs) {
    setTimeout(() => {
      lenisSideTabs.init();
    }, 600);
  }
};

const setVideoDialog = (
  dialog: HTMLDialogElement,
  disableFullHeight: HTMLElement | null,
) => {
  // Zoom fix - updated offset value
  let windowWidth: number = window.innerWidth;
  const offset = 64 * getPageZoom();

  if (disableFullHeight) {
    // Fix - 10 May 2024: Fix for video modal not displaying in the center
    // Commented "dialog.style.top"
    // dialog.style.top = `0.625rem`;
    dialog.style.width = `calc(${windowWidth - offset}px`;
    dialog.style.height = `calc(${(windowWidth - offset) * 0.5625}px`;
  } else {
    const windowHeight = window.innerHeight;

    // Fix - 10 May 2024: Fix for video modal not displaying in the center
    // Commented "dialog.style.top"
    // dialog.style.top = `max(calc(${
    //   (windowHeight - windowWidth * 0.5625) / 2 - offset * 2
    // }px), 0.625rem)`;
    dialog.style.width = `min(calc(${windowWidth - offset}px), calc(${
      (windowHeight - offset) * 1.7777
    }px))`;
    dialog.style.height = `min(calc(${
      (windowWidth - offset) * 0.5625
    }px), calc(${windowHeight - offset}px))`;
  }
};

const setDialogHeight = (
  dialog: HTMLDialogElement,
  dialogContent: HTMLElement | null,
  disableFullHeight: HTMLElement | null,
  isVideo: boolean,
) => {
  if (isVideo) return;

  // Updated for sustainability 108 - 158
  if (dialog.classList.contains("dialog-full-image")) {
    if (navigator.maxTouchPoints <= 0) {
      dialog.style.width = `calc(${window.innerWidth - 64 * getPageZoom()}px)`;
      dialog.style.height = "max-content";
      setFullHeightStyleNoReset(dialog, "max", 56, null, 1, disableFullHeight);

      if (dialogContent) {
        dialogContent.style.height = "max-content";
        setFullHeightStyleNoReset(
          dialogContent,
          "max",
          56,
          null,
          1,
          disableFullHeight,
        );
      }
    } else {
      if (window.innerWidth >= 1024) {
        dialog.style.width = `calc(${
          window.innerWidth - 64 * getPageZoom()
        }px)`;
      } else {
        dialog.style.width = `calc(${window.innerWidth}px)`;
      }
      dialog.style.height = "max-content";
      dialog.style.width = `calc(${window.innerWidth - 64 * getPageZoom()}px)`;
      setFullHeightStyleNoReset(
        dialog,
        "height",
        0,
        "max-lg",
        1,
        disableFullHeight,
      );
      setFullHeightStyleNoReset(
        dialog,
        "max",
        0,
        "max-lg",
        1,
        disableFullHeight,
      );
      setFullHeightStyleNoReset(dialog, "max", 56, "lg", 1, disableFullHeight);

      if (dialogContent) {
        dialogContent.style.height = "max-content";
        setFullHeightStyleNoReset(
          dialogContent,
          "height",
          0,
          "max-lg",
          1,
          disableFullHeight,
        );
        setFullHeightStyleNoReset(
          dialogContent,
          "max",
          0,
          "max-lg",
          1,
          disableFullHeight,
        );
        setFullHeightStyleNoReset(
          dialogContent,
          "max",
          56,
          "lg",
          1,
          disableFullHeight,
        );
      }
    }
  } else {
    setFullHeightStyle(dialog, "min", 0, "max-lg", 1, disableFullHeight);
    setFullHeightStyleNoReset(dialog, "max", 0, "max-lg", 1, disableFullHeight);
    setFullHeightStyleNoReset(dialog, "max", 32, "lg", 1, disableFullHeight);

    if (dialogContent) {
      setFullHeightStyleNoReset(
        dialogContent,
        "min",
        0,
        "max-lg",
        1,
        disableFullHeight,
      );
      setFullHeightStyleNoReset(
        dialogContent,
        "max",
        0,
        "max-lg",
        1,
        disableFullHeight,
      );
      setFullHeightStyleNoReset(
        dialogContent,
        "max",
        32,
        "lg",
        1,
        disableFullHeight,
      );

      if (dialog.classList.contains("dialog-side-tabs")) {
        if (window.innerHeight < 768) {
          setFullHeightStyle(
            dialogContent,
            "min",
            32,
            "lg",
            1,
            disableFullHeight,
          );
        }
      }
    }
  }
};

const resize = (
  dialog: HTMLDialogElement,
  dialogContent: HTMLElement | null,
  dialogBreakpoint: string | null,
  isVideo: boolean,
  videoPlayer: HTMLVideoElement | null,
  disableFullHeight: HTMLElement | null,
  lenisMain: null | Lenis, // Android fix - Updated lenisMain
  lenisDialogBody: setLenisScrollPopUp | null,
  lenisSideTabs: setLenisScrollPopUp | null,
) => {
  if (dialogBreakpoint && !getBreakpoint(dialogBreakpoint)) {
    closeDialog(
      dialog,
      dialogBreakpoint,
      lenisDialogBody,
      lenisSideTabs,
      lenisMain,
    );

    if (videoPlayer) {
      videoPlayer.pause();
    }
  } else {
    // Set height
    setDialogHeight(dialog, dialogContent, disableFullHeight, isVideo);

    // Set height
    if (isVideo) {
      setVideoDialog(dialog, disableFullHeight);
    }
  }
};

/*========================================
  Main function here
========================================*/
export const dialog = (
  disableFullHeight: HTMLElement | null,
  lenisMain: null | Lenis, // Android fix - Updated lenisMain
) => {
  const showButtons: NodeListOf<HTMLElement> =
    document.querySelectorAll("[data-dialog]");

  showButtons.forEach((showButton) => {
    const dialogTarget: string | null =
      showButton.getAttribute("data-dialog-target");

    const dialog: HTMLDialogElement | null = dialogTarget
      ? document.querySelector(`#${dialogTarget}`)
      : null;

    if (!dialog) return;

    const dialogContent: HTMLElement | null =
      dialog.querySelector(`.dialog-content`);

    const dialogBody: HTMLElement | null =
      dialog.querySelector(`.dialog-body-content`);

    const sideTabs: HTMLElement | null =
      dialog.querySelector(`.side-tabs-wrapper`);

    const sideTabsItems: NodeListOf<HTMLElement> =
      dialog.querySelectorAll(".side-tabs-item");

    const accordionButtons: NodeListOf<HTMLElement> =
      dialog.querySelectorAll(".accordion-header");

    const selectMenuItems: NodeListOf<HTMLAnchorElement> =
      dialog.querySelectorAll(
        ".side-tabs-select-wrapper-inner > .form-select .dropdown-menu-item",
      );

    const closeButton: HTMLButtonElement | null =
      dialog.querySelector(`.dialog-close-button`);

    const dialogBreakpoint: string | null = dialog.getAttribute(
      `data-dialog-breakpoint`,
    );
    const isVideo = dialog.classList.contains("dialog-video");
    const videoPlayer: HTMLVideoElement | null =
      dialog.querySelector(`.dialog-video-player`);

    // Enable scroll for dialog
    let lenisDialogBody: setLenisScrollPopUp | null = null;
    let lenisSideTabs: setLenisScrollPopUp | null = null;

    if (dialogBody) {
      lenisDialogBody = new setLenisScrollPopUp(dialogBody);
    }

    if (sideTabs) {
      lenisSideTabs = new setLenisScrollPopUp(sideTabs);
    }

    if (!getBreakpoint(dialogBreakpoint)) {
      closeDialog(
        dialog,
        dialogBreakpoint,
        lenisDialogBody,
        lenisSideTabs,
        lenisMain,
      );

      if (videoPlayer) {
        videoPlayer.pause();
      }
    } else {
      // Set height
      setDialogHeight(dialog, dialogContent, disableFullHeight, isVideo);

      // Set height
      if (isVideo) {
        setVideoDialog(dialog, disableFullHeight);
      }
    }

    // Click to show dialog
    showButton.addEventListener("click", (event) => {
      event.preventDefault();
      // Fix - 29 Apr 2024 - Scroll to top of modal
      showDialog(dialog, dialogBody, lenisDialogBody, lenisSideTabs);

      // Set height
      setDialogHeight(dialog, dialogContent, disableFullHeight, isVideo);

      // Set height
      if (isVideo) {
        setVideoDialog(dialog, disableFullHeight);
      }

      // Fix - 29 Apr 2024 - Page not scrollable when Escape key is pressed to close modal
      lenisMain && lenisMain.stop();
      document.body.style.overflow = "hidden";
    });

    // Fix - 29 Apr 2024 - Page not scrollable when Escape key is pressed to close modal
    dialog.addEventListener("cancel", () => {
      lenisMain && lenisMain.start();
      document.body.style.overflow = "";

      if (videoPlayer) {
        videoPlayer.pause();
      }
    });

    // Click to close dialog
    if (closeButton) {
      closeButton.addEventListener("click", (event) => {
        event.preventDefault();
        closeDialog(
          dialog,
          dialogBreakpoint,
          lenisDialogBody,
          lenisSideTabs,
          lenisMain,
        );

        if (videoPlayer) {
          videoPlayer.pause();
        }

        // Android fix - Updated lenisMain
        // if (lenisMain) {
        //   lenisMain.start();
        // } else {
        //   document.body.style.overflow = "";
        // }
      });
    }

    // Hides dialog when clicks outside
    if (dialogContent && !isVideo) {
      dialog.addEventListener("click", (event) => {
        if (!dialogContent.contains(<Node>event.target)) {
          closeDialog(
            dialog,
            dialogBreakpoint,
            lenisDialogBody,
            lenisSideTabs,
            lenisMain,
          );

          if (videoPlayer) {
            videoPlayer.pause();
          }

          // Fix - 29 Apr 2024 - Page not scrollable if modal is closed
          // Commented code below
          // if (lenisMain) {
          //   lenisMain.start();
          // } else {
          //   document.body.style.overflow = "";
          // }
        }
      });
    }

    // Android fix - Updated resizeLenis
    const resizeLenis = () => {
      if (hasScrollAnimation && !isTouch) {
        setTimeout(() => {
          lenisDialogBody?.resize();
          lenisDialogBody?.scrollTo(0, true);
        }, 300);
      } else {
        dialogBody && dialogBody.scrollTo(0, 0);
      }
    };

    sideTabsItems.forEach((sideTabsItem) => {
      sideTabsItem.addEventListener("click", resizeLenis);
    });

    selectMenuItems.forEach((selectMenuItem) => {
      selectMenuItem.addEventListener("click", resizeLenis);
    });

    accordionButtons.forEach((accordionButton) => {
      accordionButton.addEventListener("click", resizeLenis);
    });

    window.addEventListener("resize", () =>
      resize(
        dialog,
        dialogContent,
        dialogBreakpoint,
        isVideo,
        videoPlayer,
        disableFullHeight,
        lenisMain, // Android fix - Updated lenisMain
        lenisDialogBody,
        lenisSideTabs,
      ),
    );
  });
};
