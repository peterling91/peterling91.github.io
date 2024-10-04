import { dropdownHide, dropdownShow } from "./dropdown";
import { mainMenuIsOutside } from "./navMenu";
import { setLenisScroll, smoothScroll, getPageZoom } from "./utilites";

const DELAY = 500;

/*====================================================
  Reusable functions, see main function below
====================================================*/
const setActiveLink = (
  target: HTMLElement | null,
  targetRect: DOMRect | null,
  targetTop: number | null,
  links: NodeListOf<HTMLElement>,
  link: HTMLElement,
  menuButtonLabel: HTMLSpanElement | null,
  offset: number,
) => {
  if (target) {
    targetRect = target.getBoundingClientRect();
    targetTop = targetRect.top;

    // Highlight active link
    if (targetTop <= offset) {
      links.forEach((link) => {
        link.classList.remove("active");
      });
      link.classList.add("active");

      // Update menu button label
      if (menuButtonLabel) {
        menuButtonLabel.innerText = link.innerText;
      }
    }
  }
};

const resizeMenu = (
  menuButton: HTMLButtonElement,
  menu: HTMLDivElement,
  offset: number,
  disableFullHeight: HTMLElement | null,
) => {
  if (menuButton.getAttribute("aria-expanded") === "true") {
    if (disableFullHeight) {
      menu.style.maxHeight = `${menu.scrollHeight}px`;
    } else {
      menu.style.maxHeight = `min(${menu.scrollHeight}px, ${
        window.innerHeight - offset
      }px)`;
    }
  }
};

/*========================================
  Main function here
========================================*/
export const stickyTop = (
  navBar: HTMLElement | null,
  navBarSearch: HTMLElement | null,
  megaMenus: NodeListOf<HTMLElement>,
  disableFullHeight: HTMLElement | null,
) => {
  // let windowWidth: number = window.innerWidth;
  const stickyBars: NodeListOf<HTMLElement> =
    document.querySelectorAll(".sticky-bar-top");

  stickyBars.forEach((stickyBar) => {
    const links: NodeListOf<HTMLElement> = stickyBar.querySelectorAll(
      ".sticky-bar-top-item",
    );
    const menuButton: HTMLButtonElement | null = document.querySelector(
      ".sticky-bar-top-menu-button",
    );
    const menuButtonLabel: HTMLSpanElement | null = document.querySelector(
      ".sticky-bar-top-menu-button-label",
    );
    const menu: HTMLDivElement | null = document.querySelector(
      ".sticky-bar-top-menu",
    );
    let offset = 52;

    // Shows or hides menu in mobile view
    if (menu && menuButton) {
      // Enable scroll for menu
      setLenisScroll(menu);

      // Click to show or hide menu
      menuButton.addEventListener("click", () => {
        if (menuButton.getAttribute("aria-expanded") === "true") {
          dropdownHide(menuButton, menu, DELAY);
        } else {
          if (disableFullHeight) {
            dropdownShow(menuButton, menu, DELAY);
          } else {
            // Zoom fix - updated dropdownShow parameters
            dropdownShow(
              menuButton,
              menu,
              DELAY,
              `${window.innerHeight - offset * getPageZoom()}px`,
            );
          }
        }
      });

      window.addEventListener("resize", () =>
        resizeMenu(menuButton, menu, offset, disableFullHeight),
      );

      // Hides menu when clicks outside
      document.addEventListener("click", (event) => {
        if (mainMenuIsOutside(menuButton, menu, event.target)) {
          dropdownHide(menuButton, menu);
        }
      });
    }

    links.forEach((link) => {
      const targetName: string | null = link.getAttribute("href");
      let target: HTMLElement | null = null;
      let targetRect: DOMRect | null = null;
      let targetTop: number | null = null;

      if (targetName) {
        target = document.querySelector(targetName);

        // Anchor link fix - for "View course module" CTA on course page
        const anchorLinks: NodeListOf<HTMLElement> =
          document.querySelectorAll("[href^='#']");
        const anchorLinksWithValue: HTMLElement[] = [];

        anchorLinks.forEach((anchorLink, index) => {
          const href = anchorLink.getAttribute("href");

          if (href && href.length > 1) {
            anchorLinksWithValue.push(anchorLinks[index]);
          }
        });

        anchorLinksWithValue.forEach((anchorLink) => {
          const anchorLinkTargetName = anchorLink.getAttribute("href");

          if (
            anchorLinkTargetName === targetName &&
            link.innerText !== anchorLink.innerText
          ) {
            const anchorLinkTarget: HTMLElement | null =
              document.querySelector(anchorLinkTargetName);

            if (anchorLinkTarget) {
              anchorLink.addEventListener("click", (event) => {
                event.preventDefault();

                smoothScroll(anchorLinkTarget, `-${offset}`);

                // Show or hide menu
                if (menu && menuButton) {
                  dropdownHide(menuButton, menu);
                }

                // Update menu button label
                if (menuButtonLabel) {
                  menuButtonLabel.innerText = link.innerText;
                }
              });
            }
          }
        });
      }

      link.addEventListener("click", (event) => {
        event.preventDefault();

        if (target) {
          targetRect = target.getBoundingClientRect();
          targetTop = targetRect.top;

          // Scroll to active section
          smoothScroll(target, `-${offset}`);
        }

        // Show or hide menu
        if (menu && menuButton) {
          dropdownHide(menuButton, menu);
        }

        // Update menu button label
        if (menuButtonLabel) {
          menuButtonLabel.innerText = link.innerText;
        }
      });

      window.addEventListener("scroll", () =>
        setActiveLink(
          target,
          targetRect,
          targetTop,
          links,
          link,
          menuButtonLabel,
          offset,
        ),
      );

      window.addEventListener("resize", () =>
        setActiveLink(
          target,
          targetRect,
          targetTop,
          links,
          link,
          menuButtonLabel,
          offset,
        ),
      );
    });
  });

  if (stickyBars.length >= 1 && navBar && navBarSearch) {
    // Set top navbar position to "relative" if sticky bar exists
    navBar.classList.add("no-fixed");
    navBar.style.marginBottom = "-4.25rem";

    megaMenus.forEach((megaMenu) => {
      const menu: HTMLDivElement | null =
        megaMenu.querySelector(".navbar-mega-menu");

      if (!menu) return;

      menu.classList.add("no-fixed");
    });
  }
};
