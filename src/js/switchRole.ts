export const switchRole = (body: HTMLBodyElement | null) => {
  const element: HTMLElement | null = document.querySelector(".switch-role");
  if (!element) return;
  const navButtonContainer: HTMLElement | null = document.querySelector(
    ".switch-role-navbutton",
  );
  if (!navButtonContainer) return;

  const navButton: HTMLElement | null = document.querySelector(
    ".navbar-dropdown-button",
  );
  if (!navButton) return;

  const dialog: HTMLElement | null = document.querySelector(
    ".switch-role-dialog",
  );
  if (!dialog) return;

  const closeButton: HTMLElement | null = document.querySelector(
    ".switch-role-close-button",
  );

  // Clone nav button
  navButtonContainer.append(navButton.cloneNode(true));
  body && body.classList.add("no-scroll");

  // Remove element when click outside of dialog
  document.addEventListener("click", (event) => {
    if (!dialog.contains(<Node>event.target)) {
      element.style.opacity = "0";

      setTimeout(() => {
        element.remove();
        body && body.classList.remove("no-scroll");
      }, 300);
    }
  });

  if (closeButton) {
    // Remove element if close button is clicked
    closeButton.addEventListener("click", () => {
      element.style.opacity = "0";

      setTimeout(() => {
        element.remove();
        body && body.classList.remove("no-scroll");
      }, 300);
    });
  }
};
