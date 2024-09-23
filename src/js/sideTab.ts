import { smoothScroll, getPageZoom } from "./utilites";

/*====================================================
  Reusable functions, see main function below
====================================================*/
const deactivateTab = (
  items: NodeListOf<HTMLElement>,
  currentItemIndex: number,
) => {
  items[currentItemIndex].blur();
  items[currentItemIndex].classList.remove("active");
  items[currentItemIndex].setAttribute("aria-selected", "false");
  items[currentItemIndex].setAttribute("tabindex", "-1");
};

const activateTab = (
  items: NodeListOf<HTMLElement>,
  currentItemIndex: number,
) => {
  items[currentItemIndex].focus();
  items[currentItemIndex].classList.add("active");
  items[currentItemIndex].setAttribute("aria-selected", "true");
  items[currentItemIndex].setAttribute("tabindex", "0");
};

const setActiveTab = (
  items: NodeListOf<HTMLElement>,
  currentItemIndex: number,
) => {
  // set chosen tab to active
  activateTab(items, currentItemIndex);

  // set other tabs to inactive
  for (let i = 0, itemsLength = items.length; i < itemsLength; i++) {
    if (i === currentItemIndex) {
      continue;
    }
    if (!items[i].classList.contains("side-tabs-link")) {
      deactivateTab(items, i);
    }
  }
};

const scrollToActiveTab = (tab: HTMLElement, item: HTMLElement) => {
  tab.scrollTo(item.offsetLeft - 64, 0);
};

const setActiveTarget = (
  item: HTMLElement,
  targets: NodeListOf<HTMLElement> | undefined,
  dialogBody: HTMLElement | null,
) => {
  if (targets) {
    const targetName: string | null = item.getAttribute("aria-controls");
    const target: HTMLElement | null = targetName
      ? document.getElementById(targetName)
      : null;

    if (target) {
      // set all targets to inactive
      for (let i = 0, targetsLength = targets.length; i < targetsLength; i++) {
        targets[i].setAttribute("hidden", "");
      }

      // set selected target to active
      target.removeAttribute("hidden");

      if (dialogBody) {
        smoothScroll(target, "-188", dialogBody);
      }
    }
  }
};

const setWrapperHeight = (wrapper: HTMLElement, tabHeight: number) => {
  // Zoom fix - updated min height value
  wrapper.style.minHeight = `${tabHeight + 88 * getPageZoom()}px`;
};

const setSelectValue = (
  select: HTMLSelectElement | null,
  selectLabel: HTMLSpanElement | null,
  selectMenuItems: NodeListOf<HTMLAnchorElement>,
  isSelectedOptionDisabled: boolean | null,
  item: HTMLElement,
  currentItemIndex: number,
  targetsArray: HTMLElement[],
) => {
  const selectedTargetName: string | null = item.getAttribute("aria-controls");
  const selectedTarget: HTMLElement | null = document.querySelector(
    `#${selectedTargetName}`,
  );

  if (selectedTarget && select) {
    currentItemIndex = targetsArray.indexOf(selectedTarget);

    for (
      let i = 0, menuItemsLength = selectMenuItems.length;
      i < menuItemsLength;
      i++
    ) {
      const selectMenuItem = selectMenuItems[i];
      if (isSelectedOptionDisabled) {
        if (i !== currentItemIndex + 1) {
          selectMenuItem.classList.remove("active");
        } else {
          selectMenuItem.classList.add("active");
        }
      } else {
        if (i !== currentItemIndex) {
          selectMenuItem.classList.remove("active");
        } else {
          selectMenuItem.classList.add("active");
        }
      }
    }

    if (selectLabel) {
      if (isSelectedOptionDisabled) {
        selectLabel.innerText = `${select.options[
          currentItemIndex + 1
        ].innerText.trim()}`;
      } else {
        selectLabel.innerText = `${select.options[
          currentItemIndex
        ].innerText.trim()}`;
      }
      selectLabel.classList.remove("not-selected");
    }
  }
};

/*========================================
  Main function here
========================================*/
export const sideTab = () => {
  const wrappers: NodeListOf<HTMLElement> = document.querySelectorAll(
    ".side-tabs-content-wrapper",
  );

  for (let i = 0, wrappersLength = wrappers.length; i < wrappersLength; i++) {
    const wrapper: HTMLElement = wrappers[i];
    const tab: HTMLElement | null = wrapper.querySelector(".side-tabs");

    if (!tab) return;

    const dialogName: string | null = wrapper.getAttribute(
      "data-side-tabs-parent",
    );
    const dialogBody: HTMLElement | null = dialogName
      ? document.querySelector(`${dialogName} .dialog-body`)
      : null;

    const items: NodeListOf<HTMLElement> =
      wrapper.querySelectorAll(".side-tabs-item");
    const itemsArray: HTMLElement[] = Array.from(items);
    const targets: NodeListOf<HTMLElement> | undefined =
      wrapper.querySelectorAll('.side-tabs-content [role="tabpanel"]');
    const targetsArray: HTMLElement[] = Array.from(targets);

    const select: HTMLSelectElement | null =
      wrapper.querySelector(".side-tabs-select");
    let selectLabel: HTMLSpanElement | null;
    let options: HTMLOptionsCollection;
    let isSelectedOptionDisabled: boolean | null;
    const selectMenuItems: NodeListOf<HTMLAnchorElement> =
      wrapper.querySelectorAll(
        ".side-tabs-select-wrapper-inner > .form-select .dropdown-menu-item",
      );

    let tabHeight: number = tab.offsetHeight;
    let currentItemIndex: number = 0;

    if (select) {
      selectLabel = wrapper.querySelector(
        ".side-tabs-select-wrapper-inner > .form-select .select-label",
      );
      options = select.options;
      isSelectedOptionDisabled =
        options[select.selectedIndex].getAttribute("disabled") !== null;
    }

    // Set minimum height of wrapper to the height of tabs, so tabs don't get cropped off
    setWrapperHeight(wrapper, tabHeight);

    window.addEventListener("resize", () =>
      setWrapperHeight(wrapper, tabHeight),
    );

    const dialogShowButtons: NodeListOf<HTMLElement> =
      document.querySelectorAll("[data-dialog]");

    for (
      let j = 0, dialogShowButtonsLength = dialogShowButtons.length;
      j < dialogShowButtonsLength;
      j++
    ) {
      const dialogShowButton: HTMLElement = dialogShowButtons[j];

      dialogShowButton.addEventListener("click", () => {
        setTimeout(() => {
          setWrapperHeight(wrapper, tabHeight);
        }, 500);
      });
    }

    // Use arrow keys to navigate tabs (for accessibility)
    tab.addEventListener("keydown", (event: KeyboardEvent) => {
      let newItemIndex: number = 0;

      // press "->" to go to next tab
      if (event.key === "ArrowLeft") {
        newItemIndex = Math.max(currentItemIndex - 1, 0);

        if (!items[newItemIndex].classList.contains("side-tabs-link")) {
          deactivateTab(items, currentItemIndex);
          currentItemIndex = newItemIndex;
          activateTab(items, currentItemIndex);
          scrollToActiveTab(tab, items[currentItemIndex]);
          setActiveTarget(items[currentItemIndex], targets, dialogBody);
          setSelectValue(
            select,
            selectLabel,
            selectMenuItems,
            isSelectedOptionDisabled,
            items[currentItemIndex],
            currentItemIndex,
            targetsArray,
          );
          setWrapperHeight(wrapper, tabHeight);
        }
      }

      // press "<-" to go to previous tab
      if (event.key === "ArrowRight") {
        newItemIndex = Math.min(currentItemIndex + 1, items.length - 1);

        if (!items[newItemIndex].classList.contains("side-tabs-link")) {
          deactivateTab(items, currentItemIndex);
          currentItemIndex = newItemIndex;
          activateTab(items, currentItemIndex);
          scrollToActiveTab(tab, items[currentItemIndex]);
          setActiveTarget(items[currentItemIndex], targets, dialogBody);
          setSelectValue(
            select,
            selectLabel,
            selectMenuItems,
            isSelectedOptionDisabled,
            items[currentItemIndex],
            currentItemIndex,
            targetsArray,
          );
          setWrapperHeight(wrapper, tabHeight);
        }
      }
    });

    for (let j = 0, itemsLength = items.length; j < itemsLength; j++) {
      const item = items[j];

      // Click to activate tab
      item.addEventListener("click", (event: MouseEvent) => {
        event.preventDefault();
        if (!item.classList.contains("side-tabs-link")) {
          currentItemIndex = itemsArray.indexOf(item);
          setActiveTab(items, currentItemIndex);
          scrollToActiveTab(tab, item);
          setActiveTarget(item, targets, dialogBody);
          setSelectValue(
            select,
            selectLabel,
            selectMenuItems,
            isSelectedOptionDisabled,
            items[currentItemIndex],
            currentItemIndex,
            targetsArray,
          );
          setWrapperHeight(wrapper, tabHeight);
        }
      });

      // Scroll to active tab when document loads
      if (item.classList.contains("active")) {
        currentItemIndex = itemsArray.indexOf(item);
        scrollToActiveTab(tab, item);
      }

      // Only show active target when document loads
      if (item.classList.contains("active")) {
        setActiveTarget(item, targets, dialogBody);
      }
    }

    if (select) {
      for (
        let k = 0, selectMenuItemsLength = selectMenuItems.length;
        k < selectMenuItemsLength;
        k++
      ) {
        const selectMenuItem = selectMenuItems[k];

        selectMenuItem.addEventListener("click", () => {
          let selectedTargetName;

          if (isSelectedOptionDisabled) {
            selectedTargetName = select.options[k + 1].value;
          } else {
            selectedTargetName = select.options[k].value;
          }

          const selectedTarget: HTMLElement | null = document.querySelector(
            `#${selectedTargetName}`,
          );

          if (selectedTarget) {
            currentItemIndex = targetsArray.indexOf(selectedTarget);

            setActiveTab(items, currentItemIndex);
            scrollToActiveTab(tab, items[currentItemIndex]);
            setActiveTarget(items[currentItemIndex], targets, dialogBody);
            setWrapperHeight(wrapper, tabHeight);
          }
        });
      }
    }
  }
};
