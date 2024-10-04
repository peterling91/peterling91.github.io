import {
  dropdownHide,
  dropdownShow,
  dropdownHideNoHeight,
  dropdownShowNoHeight,
} from "./dropdown";
import { getBreakpoint, setLenisScroll, getPageZoom } from "./utilites";
import { setFullHeightStyle } from "./fullHeight";

const DELAY: number = 500;
const DELAY_XL: number = 600;

/*====================================================
  Reusable functions, see main function below
====================================================*/
// Check if click is outside of the menu
export const mainMenuIsOutside = (
  mainMenuButton: HTMLButtonElement,
  mainMenu: HTMLDivElement,
  target: EventTarget | null,
) => {
  if (!mainMenu.contains(<Node>target)) {
    if (mainMenuButton.contains(<Node>target)) {
      return false;
    }
    return true;
  }
  return false;
};

const hideMainMenu = (
  mainMenuButton: HTMLButtonElement,
  mainMenu: HTMLDivElement,
  body: HTMLBodyElement | null,
  mainMenuItems: NodeListOf<HTMLElement>,
  navbar: HTMLDivElement,
) => {
  body && body.classList.remove("overflow-hidden");
  navbar.classList.remove("bordered");
  navbar.classList.remove("expanded");
  dropdownHideNoHeight(mainMenuButton, mainMenu, DELAY);

  setTimeout(() => {
    resetMainMenuItems(mainMenuItems);
  }, DELAY);
};

const showMainMenu = (
  mainMenuButton: HTMLButtonElement,
  mainMenu: HTMLDivElement,
  body: HTMLBodyElement | null,
  navbar: HTMLDivElement,
) => {
  body && body.classList.add("overflow-hidden");
  dropdownShowNoHeight(mainMenuButton, mainMenu, DELAY);

  setTimeout(() => {
    navbar.classList.add("bordered");
    navbar.classList.add("expanded");
  }, 1);
};

const toggleMainMenu = (
  mainMenuButton: HTMLButtonElement,
  mainMenu: HTMLDivElement,
  body: HTMLBodyElement | null,
  mainMenuItems: NodeListOf<HTMLElement>,
  navbar: HTMLDivElement,
) => {
  const isExpanded: string | null =
    mainMenuButton.getAttribute("aria-expanded");

  if (isExpanded === "true") {
    hideMainMenu(mainMenuButton, mainMenu, body, mainMenuItems, navbar);
  } else {
    showMainMenu(mainMenuButton, mainMenu, body, navbar);
  }
};

export const hideMainMenuItems = (
  mainMenu: HTMLDivElement,
  mainMenuItems: NodeListOf<HTMLElement>,
) => {
  mainMenuItems.forEach((mainMenuItem) => {
    mainMenuItem.classList.add("moving-out");
    mainMenu.classList.add("no-scroll");

    setTimeout(() => {
      mainMenuItem.classList.add("hide");
      mainMenuItem.classList.remove("moving-out");
    }, DELAY);
  });
};

export const showMainMenuItems = (
  mainMenu: HTMLDivElement,
  mainMenuItems: NodeListOf<HTMLElement>,
) => {
  mainMenuItems.forEach((mainMenuItem) => {
    mainMenuItem.classList.add("moving-in");

    setTimeout(() => {
      mainMenuItem.classList.remove("hide");
    }, 1);

    setTimeout(() => {
      mainMenuItem.classList.remove("moving-in");
      mainMenu.classList.remove("no-scroll");
    }, DELAY + 1);
  });
};

export const resetMainMenuItems = (mainMenuItems: NodeListOf<HTMLElement>) => {
  mainMenuItems.forEach((mainMenuItem) => {
    mainMenuItem.classList.remove("hide");
  });
};

const hideMegaMenu = (
  button: HTMLElement,
  menu: HTMLDivElement,
  mainMenu: HTMLDivElement,
  mainMenuItems: NodeListOf<HTMLElement>,
  navbar: HTMLDivElement,
) => {
  if (getBreakpoint("xl")) {
    dropdownHide(button, menu);
    navbar.classList.add("bordered");
    navbar.classList.remove("expanded");
  } else {
    showMainMenuItems(mainMenu, mainMenuItems);
    dropdownHideNoHeight(button, menu, DELAY);
    mainMenu.scrollTo(0, 0);
  }
};

const showMegaMenu = (
  button: HTMLElement,
  menu: HTMLDivElement,
  mainMenu: HTMLDivElement,
  mainMenuItems: NodeListOf<HTMLElement>,
  navbar: HTMLDivElement,
  disableFullHeight: HTMLElement | null,
) => {
  if (getBreakpoint("xl")) {
    if (disableFullHeight) {
      dropdownShow(button, menu);
    } else {
      // Zoom fix - updated dropdownShow parameters
      dropdownShow(
        button,
        menu,
        300,
        `${window.innerHeight - 84 * getPageZoom()}px`,
      );
    }
    setTimeout(() => {
      navbar.classList.add("bordered");
      navbar.classList.add("expanded");
    }, 1);
  } else {
    menu.removeAttribute("style");
    setFullHeightStyle(menu, "height", 68, "max-xl", 1, disableFullHeight);
    hideMainMenuItems(mainMenu, mainMenuItems);
    dropdownShowNoHeight(button, menu, DELAY);

    setTimeout(() => {
      menu.scrollTo(0, 0);
    }, DELAY + 1);
  }
};

const toggleMegaMenu = (
  button: HTMLElement,
  menu: HTMLDivElement,
  mainMenu: HTMLDivElement,
  mainMenuItems: NodeListOf<HTMLElement>,
  navbar: HTMLDivElement,
  disableFullHeight: HTMLElement | null,
) => {
  const isExpanded: string | null = button.getAttribute("aria-expanded");

  if (isExpanded === "true") {
    hideMegaMenu(button, menu, mainMenu, mainMenuItems, navbar);
  } else {
    showMegaMenu(
      button,
      menu,
      mainMenu,
      mainMenuItems,
      navbar,
      disableFullHeight,
    );
  }
};

const hideSubMenu = (
  subMenuButton: HTMLElement,
  subMenuMenu: HTMLElement,
  menu: HTMLDivElement,
  disableFullHeight: HTMLElement | null,
) => {
  subMenuButton.setAttribute("aria-expanded", "false");
  menu.style.transform = "translateX(0)";

  setTimeout(() => {
    menu.removeAttribute("style");
    setFullHeightStyle(menu, "height", 68, "max-xl", 1, disableFullHeight);
    subMenuMenu.style.display = "none";
  }, DELAY);
};

const showSubMenu = (
  subMenuButton: HTMLElement,
  subMenuMenu: HTMLElement,
  menu: HTMLDivElement,
  disableFullHeight: HTMLElement | null,
) => {
  subMenuButton.setAttribute("aria-expanded", "true");
  menu.style.width = "min(200vw, 5120px)"; /* Upper boundary limit */
  subMenuMenu.style.display = "block";
  subMenuMenu.style.top = `${menu.scrollTop}px`;
  // Set height
  setFullHeightStyle(subMenuMenu, "height", 68, "max-xl", 1, disableFullHeight);
  setFullHeightStyle(subMenuMenu, "max", 68, "max-xl", 1, disableFullHeight);

  setTimeout(() => {
    menu.style.transform =
      "translateX(max(-100vw, -2560px))"; /* Upper boundary limit */
  }, 1);

  setTimeout(() => {
    menu.scrollTo(0, 0);
    menu.style.overflowY = "auto";
    subMenuMenu.style.top = "0";
  }, DELAY + 1);
};

const resetSubMenu = (
  subMenuButton: HTMLElement,
  subMenuMenu: HTMLElement,
  menu: HTMLDivElement,
  disableFullHeight: HTMLElement | null,
) => {
  subMenuButton.setAttribute("aria-expanded", "false");

  menu.removeAttribute("style");
  setFullHeightStyle(menu, "height", 68, "max-xl", 1, disableFullHeight);

  subMenuMenu.removeAttribute("style");
  setFullHeightStyle(subMenuMenu, "height", 68, "max-xl", 1, disableFullHeight);
  setFullHeightStyle(subMenuMenu, "max", 68, "max-xl", 1, disableFullHeight);
};

const resizeMainMenu = (
  navbar: HTMLDivElement,
  mainMenu: HTMLDivElement,
  mainMenuButton: HTMLButtonElement,
  mainMenuItems: NodeListOf<HTMLElement>,
  body: HTMLBodyElement | null,
  disableFullHeight: HTMLElement | null,
) => {
  // Remove transition when resizing
  mainMenu.classList.add("no-transition");

  // Hide mainMenu when layout changes depending screen size
  if (getBreakpoint("xl")) {
    hideMainMenu(mainMenuButton, mainMenu, body, mainMenuItems, navbar);
    mainMenu.removeAttribute("style");
  } else {
    setFullHeightStyle(mainMenu, "height", 68, "max-xl", 1, disableFullHeight);
  }
};

const resizeMenu = (
  button: HTMLElement,
  menu: HTMLDivElement,
  disableFullHeight: HTMLElement | null,
) => {
  menu.classList.add("no-transition");

  // Set height
  setFullHeightStyle(menu, "height", 68, "max-xl", 1, disableFullHeight);

  // Hide mega menu when resizing, for larger screens only
  if (getBreakpoint("xl")) {
    dropdownHide(button, menu);
  } else {
    if (button.getAttribute("aria-expanded") === "true") {
      setFullHeightStyle(menu, "max", 68, "max-xl", 1, disableFullHeight);
    }
  }
};

const resizeSubMenu = (
  menu: HTMLDivElement,
  subMenuButton: HTMLElement,
  subMenuMenu: HTMLDivElement,
  disableFullHeight: HTMLElement | null,
) => {
  if (getBreakpoint("xl")) {
    subMenuButton.setAttribute("aria-expanded", "false");
    resetSubMenu(subMenuButton, subMenuMenu, menu, disableFullHeight);
  } else {
    setFullHeightStyle(
      subMenuMenu,
      "height",
      68,
      "max-xl",
      1,
      disableFullHeight,
    );
    setFullHeightStyle(subMenuMenu, "max", 68, "max-xl", 1, disableFullHeight);
  }
};

/*========================================
  Main function here
========================================*/
export const navMenu = (
  navbar: HTMLDivElement,
  mainMenuButton: HTMLButtonElement | null,
  mainMenu: HTMLDivElement | null,
  megaMenus: NodeListOf<HTMLElement>,
  body: HTMLBodyElement | null,
  disableFullHeight: HTMLElement | null,
) => {
  if (!mainMenuButton || !mainMenu) return;

  const mainMenuItems: NodeListOf<HTMLElement> = document.querySelectorAll(
    ".navbar-main-menu-item",
  );

  setFullHeightStyle(mainMenu, "height", 68, "max-xl", 1, disableFullHeight);

  // Enable scroll for main menu
  setLenisScroll(mainMenu);

  // Click to toggle mainMenu
  mainMenuButton.addEventListener("click", () => {
    mainMenu.classList.remove("no-transition");
    toggleMainMenu(mainMenuButton, mainMenu, body, mainMenuItems, navbar);
  });

  window.addEventListener("resize", () =>
    resizeMainMenu(
      navbar,
      mainMenu,
      mainMenuButton,
      mainMenuItems,
      body,
      disableFullHeight,
    ),
  );

  // Hides mainMenu when clicks outside
  document.addEventListener("click", (event) => {
    mainMenu.classList.remove("no-transition");

    mainMenuIsOutside(mainMenuButton, mainMenu, event.target) &&
      hideMainMenu(mainMenuButton, mainMenu, body, mainMenuItems, navbar);
  });

  // Press escape to hide mainMenu
  mainMenu.addEventListener("keyup", (event) => {
    switch (event.key) {
      case "Escape":
        hideMainMenu(mainMenuButton, mainMenu, body, mainMenuItems, navbar);
        break;
    }
  });

  mainMenuButton.addEventListener("keyup", (event) => {
    switch (event.key) {
      case "Escape":
        hideMainMenu(mainMenuButton, mainMenu, body, mainMenuItems, navbar);
        break;
    }
  });

  megaMenus.forEach((megaMenu) => {
    const button: HTMLElement | null =
      megaMenu.querySelector(".navbar-links-item");
    const menu: HTMLDivElement | null =
      megaMenu.querySelector(".navbar-mega-menu");

    // Only runs code if all elements are in document, prevents console error
    if (!button || !menu || !mainMenu) return;

    const subMenus: NodeListOf<HTMLElement> = menu.querySelectorAll(
      ".navbar-mega-submenu",
    );
    const backButton: HTMLElement | null = menu.querySelector(
      ".navbar-mega-back-button",
    );

    // Set height
    setFullHeightStyle(menu, "height", 68, "max-xl", 1, disableFullHeight);

    // Enable scroll for menu
    setLenisScroll(menu);

    // Click to toggle mega menu
    button.addEventListener("click", (event: Event) => {
      // Prevent page from jumping to the top
      event.preventDefault();

      menu.classList.remove("no-transition");

      // Toggle mega menu
      toggleMegaMenu(
        button,
        menu,
        mainMenu,
        mainMenuItems,
        navbar,
        disableFullHeight,
      );
    });

    // Click "back" to close mega menu, for smaller screens
    backButton?.addEventListener("click", () => {
      // showMainMenuItems(mainMenuItems);
      hideMegaMenu(button, menu, mainMenu, mainMenuItems, navbar);
    });

    // Close mega menu when main menu is closed
    mainMenuButton.addEventListener("click", () => {
      menu.classList.remove("no-transition");

      if (mainMenuButton.getAttribute("aria-expanded") === "false") {
        setTimeout(() => {
          resetMainMenuItems(mainMenuItems);
          button.setAttribute("aria-expanded", "false");
          menu.classList.remove("show");
          menu.removeAttribute("style");
        }, DELAY_XL);
      }
    });

    window.addEventListener("resize", () => {
      resizeMenu(button, menu, disableFullHeight);
    });

    // Hide mega menu when clicks outside
    document.addEventListener("click", (event) => {
      if (getBreakpoint("xl")) {
        if (!megaMenu.contains(<Node>event.target)) {
          menu.classList.remove("no-transition");
          dropdownHide(button, menu);
        }
      }
    });

    // Press escape to hide menu
    menu.addEventListener("keyup", (event) => {
      if (getBreakpoint("xl")) {
        switch (event.key) {
          case "Escape":
            dropdownHide(button, menu);
            break;
        }
      }
    });

    button.addEventListener("keyup", (event) => {
      if (getBreakpoint("xl")) {
        switch (event.key) {
          case "Escape":
            dropdownHide(button, menu);
            break;
        }
      }
    });

    // Sub menus
    subMenus.forEach((subMenu) => {
      const subMenuButton: HTMLElement | null = subMenu.querySelector(
        ".navbar-mega-submenu-button",
      );
      const subMenuMenu: HTMLDivElement | null = subMenu.querySelector(
        ".navbar-mega-submenu-content",
      );
      const subMenuBackButton: HTMLElement | null = subMenu.querySelector(
        ".navbar-mega-submenu-content > .navbar-mega-header > .navbar-mega-header-wrapper > .navbar-mega-back-button",
      );

      if (subMenuButton && subMenuMenu) {
        // Set height
        setFullHeightStyle(
          subMenuMenu,
          "height",
          68,
          "max-xl",
          1,
          disableFullHeight,
        );
        setFullHeightStyle(
          subMenuMenu,
          "max",
          68,
          "max-xl",
          1,
          disableFullHeight,
        );

        // Click to show sub menu
        subMenuButton.addEventListener("click", (event: Event) => {
          if (getBreakpoint("max-xl")) {
            // Prevent page from jumping to the top
            event.preventDefault();

            showSubMenu(subMenuButton, subMenuMenu, menu, disableFullHeight);
          }
        });

        // Click "back" to close sub menu, for smaller screens
        subMenuBackButton?.addEventListener("click", () => {
          hideSubMenu(subMenuButton, subMenuMenu, menu, disableFullHeight);
        });

        // Close sub menu when main menu is closed
        mainMenuButton?.addEventListener("click", () => {
          if (mainMenuButton.getAttribute("aria-expanded") === "false") {
            subMenuMenu.style.maxHeight = "0";
            subMenuMenu.style.padding = "0";
            subMenuMenu.style.opacity = "0";
            subMenuMenu.style.overflow = "hidden !important";

            setTimeout(() => {
              resetSubMenu(subMenuButton, subMenuMenu, menu, disableFullHeight);
            }, DELAY_XL);
          }
        });

        window.addEventListener("resize", () =>
          resizeSubMenu(menu, subMenuButton, subMenuMenu, disableFullHeight),
        );
      }
    });
  });
};
