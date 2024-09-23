// Popper (plugin): https://popper.js.org/docs/v2/
import { createPopper } from "@popperjs/core";

import { getBreakpoint, setLenisScroll } from "./utilites";
import { dropdownHide, dropdownToggle } from "./dropdown";

const formResize = (
  formField: HTMLButtonElement,
  placeholderDesktop: string,
  placeholderMobile: string,
) => {
  if (getBreakpoint("md")) {
    formField.setAttribute("placeholder", placeholderDesktop);
  } else {
    formField.setAttribute("placeholder", placeholderMobile);
  }
};

export const form = () => {
  const forms: NodeListOf<HTMLElement> =
    document.querySelectorAll(".form-item");

  for (let i = 0, formsLength = forms.length; i < formsLength; i++) {
    const form: HTMLElement = forms[i];
    const formField: HTMLButtonElement | null =
      form.querySelector(".form-field");
    if (!formField) return;

    const clearButton: HTMLButtonElement | null =
      form.querySelector(".form-clear-button");

    const placeholderDesktop: string | null = formField.getAttribute(
      "data-placeholder-desktop",
    );
    const placeholderMobile: string | null = formField.getAttribute(
      "data-placeholder-mobile",
    );

    /*====================================================
        Clear input button
      ====================================================*/
    if (clearButton) {
      // Show or hide clear button
      formField.addEventListener("input", () => {
        if (formField.value.length > 0) {
          clearButton.style.display = "inline-flex";
        } else {
          clearButton.style.display = "none";
        }
      });

      // Click on clear button to clear field
      clearButton.addEventListener("click", (event) => {
        event.preventDefault();
        clearButton.style.display = "none";
        formField.value = "";
        formField.focus();
      });
    }

    /*====================================================
        Input placeholder
      ====================================================*/
    if (placeholderDesktop && placeholderMobile) {
      formResize(formField, placeholderDesktop, placeholderMobile);

      window.addEventListener("resize", () =>
        formResize(formField, placeholderDesktop, placeholderMobile),
      );
    }
  }
};

const createCustomSelectField = (
  defaultValue: string,
  isDefaultValueDisabled: boolean,
) => {
  const field: HTMLButtonElement = document.createElement("button");
  const label: HTMLSpanElement = document.createElement("span");

  field.classList.add("select-field");
  field.setAttribute("aria-expanded", "false");

  label.classList.add("select-label");
  label.innerText = defaultValue;
  isDefaultValueDisabled && label.classList.add("not-selected");

  field.append(label);
  return field;
};

const createCustomSelectMenu = (
  input: HTMLSelectElement,
  options: HTMLOptionsCollection,
  selectWidth: number,
) => {
  const menuContent: HTMLDivElement = document.createElement("div");
  const menu: HTMLUListElement = document.createElement("ul");

  menuContent.classList.add("dropdown-content");
  menuContent.style.width = `${selectWidth}px`;

  menu.classList.add("dropdown-menu");

  for (let i = 0, optionsLength = options.length; i < optionsLength; i++) {
    let isOptionDisabled: boolean | null =
      input.options[i].getAttribute("disabled") !== null;

    if (isOptionDisabled !== true) {
      const menuItemLi: HTMLLIElement = document.createElement("li");
      const menuItem: HTMLAnchorElement = document.createElement("a");
      const menuItemInner: HTMLDivElement = document.createElement("div");
      const optionLabel: string = input.options[i].innerText.trim();
      const isOptionSelected: boolean | null =
        input.options[i].getAttribute("selected") !== null;

      menuItemInner.innerText = optionLabel;

      menuItem.classList.add("dropdown-menu-item");
      menuItem.setAttribute("href", "#");
      menuItem.setAttribute("role", "button");

      if (isOptionSelected) {
        menuItem.classList.add("active");
        menuItem.setAttribute("aria-selected", "true");
      } else {
        menuItem.setAttribute("aria-selected", "false");
      }
      menuItem.append(menuItemInner);
      menuItemLi.append(menuItem);
      menu.append(menuItemLi);

      const brTags: NodeListOf<HTMLBRElement> =
        menuItemInner.querySelectorAll("br");

      for (let i = 0, brTagsLength = brTags.length; i < brTagsLength; i++) {
        brTags[i].remove();
      }
    }
  }
  menuContent.append(menu);
  return menuContent;
};

const setSelectLabel = (
  input: HTMLSelectElement,
  selectLabel: HTMLSpanElement | null,
  activeIndex: number,
) => {
  if (selectLabel) {
    selectLabel.innerText = `${input.options[activeIndex].innerText.trim()}`;
    selectLabel.classList.remove("not-selected");

    const brTags: NodeListOf<HTMLBRElement> =
      selectLabel.querySelectorAll("br");

    for (let i = 0, brTagsLength = brTags.length; i < brTagsLength; i++) {
      brTags[i].remove();
    }
  }
};

const customSelectResize = (select: HTMLElement, menu: HTMLDivElement) => {
  menu.style.width = `${select.offsetWidth}px`;
};

export const customSelect = () => {
  let activeIndex: number = 0;
  const selects: NodeListOf<HTMLElement> =
    document.querySelectorAll(".form-select");

  for (let i = 0, selectsLength = selects.length; i < selectsLength; i++) {
    const select: HTMLElement = selects[i];
    const input: HTMLSelectElement | null = select.querySelector("select");
    if (!input) return;

    const options: HTMLOptionsCollection = input.options;
    activeIndex = input.selectedIndex;
    const selectedOption: string = options[activeIndex].innerText.trim();
    const isSelectedOptionDisabled: boolean | null =
      options[activeIndex].getAttribute("disabled") !== null;

    const field: HTMLButtonElement = createCustomSelectField(
      selectedOption,
      isSelectedOptionDisabled,
    );
    select.append(field);
    const selectLabel: HTMLSpanElement | null =
      field.querySelector(".select-label");

    const menu: HTMLDivElement = createCustomSelectMenu(
      input,
      options,
      select.offsetWidth,
    );
    select.append(menu);
    const menuItemsWrapper: HTMLUListElement | null =
      menu.querySelector(".dropdown-menu");
    const menuItems: NodeListOf<HTMLAnchorElement> = menu.querySelectorAll(
      ".dropdown-menu-item",
    );

    const popperInstance = createPopper(field, menu, {
      placement: "bottom",
      modifiers: [
        {
          name: "offset",
          options: {
            offset: [0, 8],
          },
        },
      ],
    });

    if (menuItemsWrapper) {
      // Enable scroll for menu
      setLenisScroll(menuItemsWrapper);

      window.addEventListener("resize", () => customSelectResize(select, menu));

      // Click to show menu
      field.addEventListener("click", (event) => {
        event.preventDefault();
        menu.style.width = `${select.offsetWidth}px`;
        dropdownToggle(field, menu, 300, `12rem`);
        popperInstance.update();

        if (menuItemsWrapper) {
          if (isSelectedOptionDisabled) {
            menuItemsWrapper.scrollTo(
              0,
              menuItems[Math.max(0, activeIndex - 1)].offsetTop - 8,
            );
          } else {
            menuItemsWrapper.scrollTo(0, menuItems[activeIndex].offsetTop - 8);
          }
        }
      });

      // Hides menu when clicks outside
      document.addEventListener("click", (event) => {
        if (!select.contains(<Node>event.target)) {
          dropdownHide(field, menu);
        }
      });

      // Press escape to hide menu
      menu.addEventListener("keyup", (event) => {
        switch (event.key) {
          case "Escape":
            dropdownHide(field, menu);
            break;
        }
      });

      field.addEventListener("keyup", (event) => {
        switch (event.key) {
          case "Escape":
            dropdownHide(field, menu);
            break;
        }
      });

      for (
        let j = 0, menuItemsLength = menuItems.length;
        j < menuItemsLength;
        j++
      ) {
        const menuItem = menuItems[j];

        // Click to select option
        menuItem.addEventListener("click", (event) => {
          event.preventDefault();

          if (isSelectedOptionDisabled) {
            activeIndex = j + 1;
          } else {
            activeIndex = j;
          }
          input.selectedIndex = activeIndex;

          for (
            let k = 0, menuItemsLength = menuItems.length;
            k < menuItemsLength;
            k++
          ) {
            if (k !== j) {
              menuItems[k].classList.remove("active");
              menuItems[k].setAttribute("aria-selected", "false");
            }
          }
          menuItem.setAttribute("aria-selected", "true");
          menuItem.classList.add("active");

          setSelectLabel(input, selectLabel, activeIndex);
          dropdownHide(field, menu);
        });
      }
    }
  }
};

const createPseudoContainer = (type: "radio" | "checkbox"): HTMLElement => {
  const container = document.createElement("div");
  container.setAttribute("aria-hidden", "true");
  container.classList.add(`form-check-field-container-${type}`);
  return container;
};

export const firefoxPseudoFix = () => {
  const radios: NodeListOf<HTMLElement> = document.querySelectorAll(
    ".form-check-field[type='radio']",
  );
  const checkboxes: NodeListOf<HTMLElement> = document.querySelectorAll(
    ".form-check-field[type='checkbox']",
  );

  radios.forEach((radio) => {
    radio.insertAdjacentElement("afterend", createPseudoContainer("radio"));
  });

  checkboxes.forEach((checkbox) => {
    checkbox.insertAdjacentElement(
      "afterend",
      createPseudoContainer("checkbox"),
    );
  });
};
