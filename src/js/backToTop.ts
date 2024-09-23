import { smoothScroll } from "./utilites";
import { getBreakpoint } from "./utilites";

const createBackToTopButton = () => {
  const button = document.createElement("button");
  const label = document.createElement("span");
  const icon = document.createElement("i");

  label.classList.add("visually-hidden");
  label.innerText = "Back to top";
  icon.classList.add("fa-regular");
  icon.classList.add("fa-chevron-up");
  icon.setAttribute("aria-hidden", "true");

  button.classList.add("site-button-back-top");
  button.classList.add("button-white-primary");
  button.classList.add("button-icon");
  button.classList.add("button-sm");
  button.style.display = "none";
  button.style.position = "fixed";
  button.style.right = "1.75rem";
  button.style.bottom = "5.75rem";
  button.style.zIndex = "800";
  button.style.transition = "bottom 300ms ease-in-out";
  button.append(label);
  button.append(icon);

  // Click to go to the top of the page
  button.addEventListener("click", () => {
    smoothScroll();
  });

  return button;
};

const showBackToTopButton = (button: HTMLButtonElement) => {
  button.style.display = "inline-flex";
};

const hideBackToTopButton = (button: HTMLButtonElement) => {
  button.style.display = "none";
};

const resize = (button: HTMLButtonElement) => {
  // Hide or show back to top button according to screen size and amount scrolled
  if (getBreakpoint("max-lg") && window.scrollY > 640) {
    showBackToTopButton(button);
  } else {
    hideBackToTopButton(button);
  }
};

export const backToTop = () => {
  const container = document.querySelector(".main-container");

  if (!container) return;

  // let pageScrolled: number = window.scrollY;

  // Add back to top button to the page
  const button = createBackToTopButton();
  container.append(button);

  // Hide or show back to top button according to screen size and amount scrolled
  resize(button);
  window.addEventListener("resize", () => resize(button));
  window.addEventListener("scroll", () => resize(button));
};
