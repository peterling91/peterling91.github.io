import { dropdownHide, dropdownShow, dropdownToggle } from "./dropdown";
import { getBreakpoint, setLenisScroll, getPageZoom } from "./utilites";

/*====================================================
  Reusable functions, see main function below
====================================================*/
export const setWrapperHeightStyle = (
  wrapper: HTMLElement,
  sideNav: HTMLElement,
) => {
  if (getBreakpoint("lg")) {
    const sideNavParent: HTMLElement | null = sideNav.parentElement;

    wrapper.style.minHeight = `${
      sideNavParent
        ? sideNavParent.offsetHeight + 88
        : sideNav.offsetHeight + 88
    }px`;
  } else {
    wrapper.removeAttribute("style");
  }
};

const setWrapperHeight = (wrapper: HTMLElement, sideNav: HTMLElement) => {
  if (sideNav.classList.contains("filter")) return;
  setWrapperHeightStyle(wrapper, sideNav);
};

const setMaxHeight = (
  menu: HTMLElement,
  disableFullHeight: HTMLElement | null,
) => {
  // Zoom fix - updated max height values
  if (disableFullHeight) {
    menu.style.maxHeight = `${menu.scrollHeight + 1 * getPageZoom()}px`;
  } else {
    menu.style.maxHeight = `min(${menu.scrollHeight + 1 * getPageZoom()}px, ${
      window.innerHeight - 164
    }px)`;
  }
};

const setMenuHeight = (
  wrapper: HTMLElement,
  sideNav: HTMLElement,
  menu: HTMLElement,
  disableFullHeight: HTMLElement | null,
) => {
  menu.classList.add("expanding");

  setTimeout(() => {
    menu.style.maxHeight = `none`;

    if (getBreakpoint("lg")) {
      setMaxHeight(menu, disableFullHeight);
    } else {
      menu.style.maxHeight = `${menu.scrollHeight}px`;
    }
    menu.classList.remove("expanding");
    setWrapperHeight(wrapper, sideNav);
  }, 301);
};

const resizeMenu = (
  wrapper: HTMLElement,
  sideNav: HTMLElement,
  menu: HTMLElement,
  button: HTMLButtonElement,
  disableFullHeight: HTMLElement | null,
) => {
  // Reset style
  menu.classList.add("no-transition");
  menu.removeAttribute("style");

  if (getBreakpoint("lg")) {
    setMaxHeight(menu, disableFullHeight);
  } else {
    if (button.getAttribute("aria-expanded") === "true") {
      menu.classList.add("show");
      menu.style.maxHeight = `${menu.scrollHeight}px`;
    } else {
      menu.classList.remove("show");
      menu.style.maxHeight = `0px`;
    }
  }
  setWrapperHeight(wrapper, sideNav);
};

const resizeSubMenu = (
  wrapper: HTMLElement,
  sideNav: HTMLElement,
  menu: HTMLElement,
  subMenuMenu: HTMLElement,
  subMenuButton: HTMLElement,
  disableFullHeight: HTMLElement | null,
) => {
  subMenuMenu.classList.add("no-transition");
  menu.classList.add("no-transition");

  if (subMenuButton.getAttribute("aria-expanded") === "true") {
    subMenuMenu.style.maxHeight = `${subMenuMenu.scrollHeight}px`;
  }

  setTimeout(() => {
    menu.style.maxHeight = `none`;

    if (getBreakpoint("lg")) {
      setMaxHeight(menu, disableFullHeight);
    } else {
      menu.style.maxHeight = `${menu.scrollHeight}px`;
    }
    setWrapperHeight(wrapper, sideNav);
  }, 2);
};

const resizeStickyTop = (stickyBar: HTMLElement) => {
  if (stickyBar.getBoundingClientRect().top <= 68 && getBreakpoint("max-lg")) {
    stickyBar.classList.add("is-fixed");
  } else {
    stickyBar.classList.remove("is-fixed");
  }
};

/*========================================
  Main function here
========================================*/
export const sideNav = (disableFullHeight: HTMLElement | null) => {
  const wrappers: NodeListOf<HTMLElement> = document.querySelectorAll(
    ".side-nav-content-wrapper",
  );

  for (let i = 0, wrappersLength = wrappers.length; i < wrappersLength; i++) {
    const wrapper = wrappers[i];
    const sideNav: HTMLElement | null = wrapper.querySelector(".side-nav");
    const button: HTMLButtonElement | null = wrapper.querySelector(
      ".side-nav-dropdown-button",
    );
    const menu: HTMLElement | null = wrapper.querySelector(
      ".side-nav-dropdown-menu",
    );
    if (sideNav && !button && !menu) {
      setWrapperHeight(wrapper, sideNav);

      window.addEventListener("resize", () =>
        setWrapperHeight(wrapper, sideNav),
      );
    }

    if (sideNav && button && menu) {
      const stickyBar: HTMLElement | null = wrapper.querySelector(
        ".sticky-sidenav-bar",
      );

      // Enable scroll for menu
      setLenisScroll(menu);

      // Set initial style
      menu.classList.add("no-transition");

      if (getBreakpoint("lg")) {
        menu.classList.add("show");
        setMaxHeight(menu, disableFullHeight);
      }
      setWrapperHeight(wrapper, sideNav);

      window.addEventListener("resize", () =>
        resizeMenu(wrapper, sideNav, menu, button, disableFullHeight),
      );

      // Click to toggle menu
      button.addEventListener("click", () => {
        menu.classList.remove("no-transition");

        if (getBreakpoint("lg") && !disableFullHeight) {
          // Zoom fix - updated dropdownToggle parameters
          dropdownToggle(
            button,
            menu,
            300,
            `${window.innerHeight - 164 * getPageZoom()}px`,
          );
        } else {
          dropdownToggle(button, menu);
        }
      });

      // Hides dropdown when clicks outside
      document.addEventListener("click", (event) => {
        if (!sideNav.contains(<Node>event.target) && getBreakpoint("max-lg")) {
          menu.classList.remove("no-transition");
          dropdownHide(button, menu);
        }
      });

      /*========================================
        Toggle menu items
      ========================================*/
      const subMenuButtons: NodeListOf<HTMLButtonElement> =
        wrapper.querySelectorAll(".side-nav-submenu .side-nav-submenu-button");

      const subMenuMenus: NodeListOf<HTMLElement> = wrapper.querySelectorAll(
        ".side-nav-submenu .side-nav-submenu-menu",
      );

      for (
        let j = 0, subMenuMenusLength = subMenuMenus.length;
        j < subMenuMenusLength;
        j++
      ) {
        const subMenuButton = subMenuButtons[j];
        const subMenuMenu = subMenuMenus[j];

        // Set menu items initial style
        subMenuMenu.classList.add("no-transition");

        if (
          getBreakpoint("lg") &&
          subMenuButton.getAttribute("aria-expanded") === "true"
        ) {
          subMenuMenu.classList.add("show");
          subMenuMenu.style.maxHeight = `${subMenuMenu.scrollHeight}px`;
        }

        setTimeout(() => {
          if (getBreakpoint("lg")) {
            setMaxHeight(menu, disableFullHeight);
          }
          setWrapperHeight(wrapper, sideNav);
        }, 2);

        window.addEventListener("resize", () =>
          resizeSubMenu(
            wrapper,
            sideNav,
            menu,
            subMenuMenu,
            subMenuButton,
            disableFullHeight,
          ),
        );

        // Click to toggle menu item
        subMenuButton.addEventListener("click", () => {
          menu.classList.remove("no-transition");
          subMenuMenu.classList.remove("no-transition");

          if (subMenuButton.getAttribute("aria-expanded") === "true") {
            dropdownHide(subMenuButton, subMenuMenu);
          } else {
            for (
              let k = 0, subMenuMenusLength = subMenuMenus.length;
              k < subMenuMenusLength;
              k++
            ) {
              const subMenuMenuOther: HTMLElement = subMenuMenus[k];
              const subMenuButtonOther: HTMLButtonElement = subMenuButtons[k];

              if (k !== j) {
                dropdownHide(subMenuButtonOther, subMenuMenuOther);
              }
            }
            dropdownShow(subMenuButton, subMenuMenu);
          }
          setMenuHeight(wrapper, sideNav, menu, disableFullHeight);
        });

        // Toggle menu item, if dropdown is open or close
        button.addEventListener("click", () => {
          menu.classList.remove("no-transition");
          subMenuMenu.classList.remove("no-transition");

          for (
            let l = 0, subMenuMenusLength = subMenuMenus.length;
            l < subMenuMenusLength;
            l++
          ) {
            const subMenuMenuOther: HTMLElement = subMenuMenus[l];
            const subMenuButtonOther: HTMLButtonElement = subMenuButtons[l];

            if (subMenuButtonOther.getAttribute("aria-expanded") === "true") {
              dropdownShow(subMenuButtonOther, subMenuMenuOther);
            } else {
              dropdownHide(subMenuButtonOther, subMenuMenuOther);
            }
          }
          setMenuHeight(wrapper, sideNav, menu, disableFullHeight);
        });
      }

      /*========================================
        Sticky bar inside side nav
      ========================================*/
      if (stickyBar) {
        resizeStickyTop(stickyBar);
        window.addEventListener("scroll", () => resizeStickyTop(stickyBar));
        window.addEventListener("resize", () => resizeStickyTop(stickyBar));
      }
    }
  }
};
