// Popper (plugin): https://popper.js.org/docs/v2/
import { createPopper } from "@popperjs/core";

export const tooltip = (body: HTMLBodyElement | null): void => {
  if (!body) return;

  const buttons: NodeListOf<HTMLElement> =
    document.querySelectorAll(".tooltip-button");

  buttons.forEach((button) => {
    button.addEventListener("mouseover", (event: MouseEvent) => {
      // Null check for getAttribute
      const tooltipText = button.getAttribute("data-tooltip") || "";

      const tooltip = document.createElement("div");
      tooltip.classList.add("tooltip");
      tooltip.textContent = tooltipText;

      const x = event.clientX;
      const y = event.clientY;
      tooltip.style.left = `${x}px`;
      tooltip.style.top = `${y}px`;

      body.append(tooltip);

      let tooltipAdded = true;

      button.addEventListener("mouseout", () => {
        if (tooltipAdded) {
          tooltip.remove();
          tooltipAdded = false;
        }
      });
    });
  });
};

const createTooltip = (label: string) => {
  const tooltip = document.createElement("div");
  tooltip.classList.add("tooltip");
  tooltip.setAttribute("aria-hidden", "true");
  tooltip.innerText = label;
  return tooltip;
};

export const tooltipCardBadge = (body: HTMLBodyElement | null) => {
  if (!body) return;

  const cardBadges: NodeListOf<HTMLElement> =
    document.querySelectorAll(".card .badge");
  const articledBadges: NodeListOf<HTMLElement> = document.querySelectorAll(
    ".article-list-thumbnail .badge",
  );

  tooltipBadge(body, cardBadges);
  tooltipBadge(body, articledBadges, 55);
};

const tooltipBadge = (
  body: HTMLBodyElement,
  badges: NodeListOf<HTMLElement>,
  textLength: number = 34,
) => {
  badges.forEach((badge) => {
    const label: string = badge.innerText;

    if (label.length < textLength) return;

    const tooltip: HTMLDivElement = createTooltip(label);
    body.append(tooltip);

    // Set dropdown position
    const popperInstance = createPopper(badge, tooltip, {
      placement: "top",
      modifiers: [
        {
          name: "offset",
          options: {
            offset: [0, 10],
          },
        },
      ],
    });

    badge.addEventListener("mouseenter", () => {
      tooltip.classList.add("show");
      popperInstance.update();
    });

    badge.addEventListener("mouseleave", () => {
      tooltip.classList.remove("show");
    });
  });
};
