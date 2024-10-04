/*====================================================
  Reusable functions, see main function below
====================================================*/
export const selectToggleContent = (
  selectedItem: string,
  targets: NodeListOf<HTMLElement>,
  type: "select" | "radio",
) => {
  for (let i = 0, targetsLength = targets.length; i < targetsLength; i++) {
    const target = targets[i];
    let toggleValue: string | null = null;

    if (type === "select") {
      toggleValue = target.getAttribute("data-select-toggle-value");
    }

    if (type === "radio") {
      toggleValue = target.getAttribute("data-radio-toggle-value");
    }

    if (toggleValue === selectedItem) {
      target.classList.remove("!hidden");
      target.removeAttribute("hidden");
    } else {
      target.classList.add("!hidden");
      target.setAttribute("hidden", "");
    }
  }
};

/*========================================
  Main function here
========================================*/
export const selectToggle = () => {
  const containers: NodeListOf<HTMLElement> =
    document.querySelectorAll(".select-toggle");

  for (
    let i = 0, containersLength = containers.length;
    i < containersLength;
    i++
  ) {
    const container = containers[i];
    const select: HTMLSelectElement | null = container.querySelector(
      ".select-toggle-trigger",
    );
    if (!select) return;

    const targets: NodeListOf<HTMLElement> = container.querySelectorAll(
      ".select-toggle-content",
    );

    const selectLabel: HTMLSpanElement | null = container.querySelector(
      ".form-select .select-label",
    );
    const selectMenuItems: NodeListOf<HTMLAnchorElement> =
      container.querySelectorAll(".form-select .dropdown-menu-item");
    const isSelectedOptionDisabled: boolean | null =
      select.options[select.selectedIndex].getAttribute("disabled") !== null;
    const selectPills: NodeListOf<HTMLAnchorElement> =
      container.querySelectorAll(".select-toggle-trigger-pill");

    selectToggleContent(select.value, targets, "select");

    for (
      let j = 0, selectPillsLength = selectPills.length;
      j < selectPillsLength;
      j++
    ) {
      const selectPill = selectPills[j];

      selectPill.addEventListener("click", (event) => {
        event.preventDefault();

        const selectedTargetName = selectPill.innerText;

        selectPills.forEach((pill) => {
          pill.classList.remove("active");
        });

        selectPill.classList.add("active");

        selectToggleContent(selectedTargetName, targets, "select");

        selectMenuItems.forEach((selectMenuItem) => {
          if (selectedTargetName === selectMenuItem.innerText.trim()) {
            selectMenuItem.classList.add("active");
            selectMenuItem.setAttribute("aria-selected", "true");
          } else {
            selectMenuItem.classList.remove("active");
            selectMenuItem.setAttribute("aria-selected", "false");
          }
        });

        for (
          let k = 0, selectOptionsLength = select.options.length;
          k < selectOptionsLength;
          k++
        ) {
          if (selectLabel) {
            selectLabel.innerText = selectedTargetName;
          }
          if (selectedTargetName === select.options[k].value) {
            if (isSelectedOptionDisabled) {
              select.selectedIndex = k + 1;
            } else {
              select.selectedIndex = k;
            }
          }
        }
      });
    }

    for (
      let j = 0, selectMenuItemsLength = selectMenuItems.length;
      j < selectMenuItemsLength;
      j++
    ) {
      const selectMenuItem = selectMenuItems[j];

      selectMenuItem.addEventListener("click", () => {
        let selectedTargetName: string;

        if (isSelectedOptionDisabled) {
          selectedTargetName = select.options[j + 1].value;
        } else {
          selectedTargetName = select.options[j].value;
        }

        selectPills.forEach((pill) => {
          if (pill.innerText === selectedTargetName) {
            pill.classList.add("active");
          } else {
            pill.classList.remove("active");
          }
        });

        selectToggleContent(selectedTargetName, targets, "select");
      });
    }
  }
};

export const radioToggle = () => {
  const containers: NodeListOf<HTMLElement> =
    document.querySelectorAll(".radio-toggle");

  for (
    let i = 0, containersLength = containers.length;
    i < containersLength;
    i++
  ) {
    const container = containers[i];
    const radios: NodeListOf<HTMLInputElement> = container.querySelectorAll(
      ".radio-toggle-trigger",
    );
    const targets: NodeListOf<HTMLElement> = container.querySelectorAll(
      ".radio-toggle-content",
    );

    radios.forEach((radio) => {
      if (radio.checked) {
        targets.forEach((target) => {
          if (radio.value === target.getAttribute("data-radio-toggle-value")) {
            target.classList.remove("!hidden");
            target.removeAttribute("hidden");
          } else {
            target.classList.add("!hidden");
            target.setAttribute("hidden", "");
          }
        });
      }

      radio.addEventListener("change", () => {
        container.style.maxHeight = `none`;
        selectToggleContent(radio.value, targets, "radio");
        container.style.maxHeight = `${container.scrollHeight}px`;
      });
    });
  }
};
