export const announcement = () => {
  const banners = document.querySelectorAll(".announcement-banner");

  banners.forEach((banner) => {
    const closeButton = banner.querySelector(".announcement-banner__close");
    const expandButton = banner.querySelector(".announcement-banner__expand");
    const expandButtonLabel = banner.querySelector(".announcement-banner__expand > span");

    const content = banner.querySelector(".announcement-banner__content");
    closeButton?.addEventListener("click", () => {
      banner.remove();
    });

    if (content) {
      expandButton?.addEventListener("click", () => {
        let isExpanded = content.getAttribute("aria-expanded");

        if (isExpanded === "true") {
          content.setAttribute("aria-expanded", "false");
          if (expandButtonLabel) expandButtonLabel.textContent = "Show more";
        } else {
          content.setAttribute("aria-expanded", "true");
          if (expandButtonLabel) expandButtonLabel.textContent = "Show less";
        }
      });
    }
  });
};
