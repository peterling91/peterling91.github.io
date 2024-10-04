// Popper (plugin): https://popper.js.org/docs/v2/
import { Instance, Placement, createPopper } from "@popperjs/core";
import { setLenisScroll } from "./utilites";

/*====================================================
  Reusable functions, see main function below
====================================================*/
// Hide dropdown, with height animation
export const dropdownHide = (
  trigger: Element,
  content: HTMLElement,
  duration?: number | null,
  reverse: boolean = false,
) => {
  trigger.setAttribute("aria-expanded", "false");
  content.classList.add("collapsing");
  content.style.maxHeight = "0";

  setTimeout(
    () => {
      content.classList.remove("collapsing");

      if (reverse) {
        content.classList.add("hide");
      } else {
        content.classList.remove("show");
      }
    },
    duration ? duration : 300,
  );
};

// Hide dropdown
export const dropdownHideNoHeight = (
  trigger: Element,
  content: HTMLElement,
  duration?: number | null,
) => {
  trigger.setAttribute("aria-expanded", "false");
  content.classList.add("collapsing");

  setTimeout(
    () => {
      content.classList.remove("show");
      content.classList.remove("collapsing");
    },
    duration ? duration : 300,
  );
};

// Show dropdown, with height animation
export const dropdownShow = (
  trigger: Element,
  content: HTMLElement,
  duration?: number | null,
  height?: string | null, // Custom height, otherwise full height is used
  reverse: boolean = false,
) => {
  trigger.setAttribute("aria-expanded", "true");
  content.classList.add("expanding");

  setTimeout(() => {
    const contentHeight = content.scrollHeight;

    if (contentHeight <= 0) {
      if (height) {
        content.style.maxHeight = `${height}`;
      } else {
        content.style.maxHeight = "none";
      }
    } else {
      content.style.maxHeight = height
        ? `min(${contentHeight}px, ${height})`
        : `${contentHeight}px`;
    }

    if (reverse) {
      content.classList.remove("hide");
    } else {
      content.classList.add("show");
    }
  }, 1);

  setTimeout(
    () => {
      content.classList.remove("expanding");
    },
    duration ? duration + 1 : 301,
  );
};

// Show dropdown
export const dropdownShowNoHeight = (
  trigger: Element,
  content: HTMLElement,
  duration?: number | null,
) => {
  trigger.setAttribute("aria-expanded", "true");
  content.classList.add("expanding");

  setTimeout(() => {
    content.classList.add("show");
  }, 1);

  setTimeout(
    () => {
      content.classList.remove("expanding");
    },
    duration ? duration + 1 : 301,
  );
};

// Toggle dropdown, with height animation
export const dropdownToggle = (
  trigger: Element,
  content: HTMLElement,
  duration?: number,
  height?: string | null, // Custom height, otherwise full height is used
  reverse: boolean = false,
) => {
  const customHeight: string | null = height ? height : null;
  const customDuration: number | null = duration ? duration : null;

  if (trigger.getAttribute("aria-expanded") === "true") {
    dropdownHide(trigger, content, customDuration, reverse);
  } else {
    dropdownShow(trigger, content, customDuration, customHeight, reverse);
  }
};

// Toggle dropdown
export const dropdownToggleNoHeight = (
  trigger: Element,
  content: HTMLElement,
  duration?: number,
) => {
  const customDuration: number | null = duration ? duration : null;

  if (trigger.getAttribute("aria-expanded") === "true") {
    dropdownHideNoHeight(trigger, content, customDuration);
  } else {
    dropdownShowNoHeight(trigger, content);
  }
};

const setActiveIcon = (menuItems: NodeListOf<HTMLElement>) => {
  for (
    let i = 0, menuItemsLength = menuItems.length;
    i < menuItemsLength;
    i++
  ) {
    const menuItem = menuItems[i];
    const menuIcon: HTMLElement | null = menuItem.querySelector(
      ".dropdown-menu-item-icon",
    );

    if (menuIcon) {
      if (menuItem.classList.contains("active")) {
        menuIcon.classList.remove("fa-regular");
        menuIcon.classList.add("fa-solid");
      } else {
        menuIcon.classList.remove("fa-solid");
        menuIcon.classList.add("fa-regular");
      }
    }
  }
};

const menuItemClick = (
  menuItems: NodeListOf<HTMLElement>,
  triggerIcon: HTMLElement | null,
  triggerLabel: HTMLSpanElement | null,
  trigger: Element,
  content: HTMLElement,
) => {
  for (
    let i = 0, menuItemsLength = menuItems.length;
    i < menuItemsLength;
    i++
  ) {
    const menuItem = menuItems[i];

    menuItem.addEventListener("click", () => {
      dropdownHide(trigger, content);

      for (
        let j = 0, menuItemsLength = menuItems.length;
        j < menuItemsLength;
        j++
      ) {
        const allMenuItems = menuItems[j];
        const menuIcon: HTMLElement | null = allMenuItems.querySelector(
          ".dropdown-menu-item-icon",
        );
        const menuLabel: HTMLElement | null = allMenuItems.querySelector(
          ".dropdown-menu-item-label",
        );
        let menuIconClasses: string | null;

        if (j === i) {
          allMenuItems.classList.add("active");
          allMenuItems.setAttribute("aria-selected", "true");

          if (menuIcon) {
            menuIcon.classList.remove("fa-regular");
            menuIconClasses = menuIcon.getAttribute("class");
            menuIcon.classList.add("fa-solid");

            if (menuIconClasses && triggerIcon) {
              triggerIcon.setAttribute(
                "class",
                `${menuIconClasses.replace(
                  " dropdown-menu-item-icon",
                  "",
                )} fa-solid dropdown-trigger-icon`,
              );
            }
          }
          if (menuLabel && triggerLabel) {
            triggerLabel.innerText = menuLabel.innerText;
          }
        } else {
          allMenuItems.classList.remove("active");
          allMenuItems.setAttribute("aria-selected", "false");

          if (menuIcon) {
            menuIcon.classList.remove("fa-solid");
            menuIcon.classList.add("fa-regular");
          }
        }
      }
    });
  }
};

const initFields = (
  menuFields: NodeListOf<HTMLInputElement>,
  data: dropdownData,
) => {
  let newItemsSelected: string[] = [...data.itemsSelected];

  for (
    let i = 0, menuFieldsLength = menuFields.length;
    i < menuFieldsLength;
    i++
  ) {
    const menuField = menuFields[i];

    if (menuField.checked && !menuField.classList.contains("check-all")) {
      data.updateSelectedFieldCount(
        Math.min(data.totalFieldCount, data.selectedFieldCount + 1),
      );
      data.updateInitialSelectedFieldCount(data.selectedFieldCount);
      newItemsSelected.push(menuFields[i].value);
      data.updateItemsSelected(newItemsSelected);
      data.updateItemsSelectedInitial(data.itemsSelected);
    }
  }

  if (data.initialSelectedFieldCount === 0) {
    data.updateInitialFieldLabelDisabled(true);
  } else {
    data.updateInitialFieldLabelDisabled(false);
  }
};

const updateTriggerLabel = (
  menuFields: NodeListOf<HTMLInputElement>,
  menuLabels: NodeListOf<HTMLLabelElement>,
  triggerLabel: HTMLSpanElement | null,
  data: dropdownData,
  action: "init" | "update" | "reset",
) => {
  if (triggerLabel) {
    if (data.isMultiSelect) {
      // For Checkboxes
      if (data.selectedFieldCount === 0) {
        triggerLabel.innerText = data.initialFieldLabel;
        triggerLabel.classList.add("not-selected");
      } else {
        if (data.selectedFieldCount === data.totalFieldCount) {
          triggerLabel.innerText = "All";
        } else {
          triggerLabel.innerText = `${data.selectedFieldCount} selected`;
        }
        triggerLabel.classList.remove("not-selected");
      }
    }
    if (data.isRadio) {
      // For radios
      if (action === "reset") {
        triggerLabel.innerText = data.initialFieldLabel;
        if (data.initialFieldLabelDisabled)
          triggerLabel.classList.add("not-selected");
      }

      if (action === "init") {
        let newLabel = data.initialFieldLabel;

        for (
          let i = 0, menuFieldsLength = menuFields.length;
          i < menuFieldsLength;
          i++
        ) {
          const menuField = menuFields[i];

          if (data.fieldTypes[i] === "radio") {
            if (menuField.checked) {
              newLabel = menuLabels[i].innerText.trim();
            }
          }
        }

        if (newLabel === data.initialFieldLabel) {
          data.updateInitialFieldLabelDisabled(true);
        } else {
          data.updateInitialFieldLabelDisabled(false);
        }
        triggerLabel.innerText = newLabel;
        data.updateInitialFieldLabel(newLabel);
      }

      if (action === "update") {
        let newLabel = data.initialFieldLabel;

        for (
          let i = 0, menuFieldsLength = menuFields.length;
          i < menuFieldsLength;
          i++
        ) {
          const menuField = menuFields[i];

          if (data.fieldTypes[i] === "radio") {
            if (menuField.checked) {
              newLabel = menuLabels[i].innerText.trim();
            }
          }
        }

        if (newLabel === data.initialFieldLabel) {
          if (data.initialFieldLabelDisabled)
            triggerLabel.classList.add("not-selected");
        } else {
          triggerLabel.classList.remove("not-selected");
        }
        triggerLabel.innerText = newLabel;
      }
    }
  }
};

const updateClearButton = (
  clearButton: HTMLElement | null,
  data: dropdownData,
) => {
  if (clearButton && data.hideClearButton) {
    if (
      JSON.stringify(data.itemsSelectedInitial) ===
      JSON.stringify(data.itemsSelected)
    ) {
      clearButton.style.display = "none";
    } else {
      clearButton.removeAttribute("style");
    }
  }
};

const applyFilter = (
  filterItems: NodeListOf<HTMLElement> | null,
  data: dropdownData,
) => {
  if (!filterItems) return;

  data.updateItemsSelectedApplied([...data.itemsSelected]);

  if (data.selectedFieldCount > 0) {
    filterItems.forEach((filterItem) => {
      filterItem.classList.add("hidden");
    });

    filterItems.forEach((filterItem) => {
      const filterItemValue = filterItem.getAttribute(
        "data-dropdown-filter-value",
      );

      if (filterItemValue) {
        const filterItemList = filterItemValue.split(",");

        filterItemList.forEach((filterItemListValue) => {
          if (
            filterItemListValue === "All" ||
            data.itemsSelected.indexOf(filterItemListValue) !== -1
          ) {
            filterItem.classList.remove("hidden");
          }
        });
      }
    });
  } else {
    filterItems.forEach((filterItem) => {
      filterItem.classList.remove("hidden");
    });
  }
};

const setSelectedFields = (menuField: HTMLInputElement, data: dropdownData) => {
  const newItemsSelected: string[] = [...data.itemsSelected];

  if (menuField.checked) {
    data.updateSelectedFieldCount(
      Math.min(data.totalFieldCount, data.selectedFieldCount + 1),
    );
    newItemsSelected.push(menuField.value);
    data.updateItemsSelected(newItemsSelected);
  } else {
    data.updateSelectedFieldCount(Math.max(0, data.selectedFieldCount - 1));

    if (newItemsSelected.indexOf(menuField.value) !== -1) {
      newItemsSelected.splice(newItemsSelected.indexOf(menuField.value), 1);
      data.updateItemsSelected(newItemsSelected);
    }
  }
};

const setCheckboxAllSelected = (
  menuFields: NodeListOf<HTMLInputElement>,
  menuLabels: NodeListOf<HTMLLabelElement>,
  menuField: HTMLInputElement,
  triggerLabel: HTMLSpanElement | null,
  clearButton: HTMLElement | null,
  data: dropdownData,
) => {
  const checkAllTargetsWrapperName = menuField.getAttribute(
    "data-check-all-targets",
  );

  if (checkAllTargetsWrapperName) {
    const checkAllTargetsWrapper: HTMLElement | null = document.getElementById(
      checkAllTargetsWrapperName,
    );

    if (checkAllTargetsWrapper) {
      const checkAllTargets: NodeListOf<HTMLInputElement> | null =
        checkAllTargetsWrapper.querySelectorAll("input");
      const totalCheckAllTargets = checkAllTargets.length;

      menuField.addEventListener("change", () => {
        const newItemsSelected: string[] = [...data.itemsSelected];

        if (menuField.checked) {
          for (let i = 0; i < totalCheckAllTargets; i++) {
            const target = checkAllTargets[i];
            target.checked = true;
            data.updateSelectedFieldCount(
              Math.min(data.totalFieldCount, data.selectedFieldCount + 1),
            );
            newItemsSelected.push(target.value);
            data.updateItemsSelected(newItemsSelected);
          }
        } else {
          for (let i = 0; i < totalCheckAllTargets; i++) {
            const target = checkAllTargets[i];
            target.checked = false;

            data.updateSelectedFieldCount(
              Math.max(0, data.selectedFieldCount - 1),
            );

            if (newItemsSelected.indexOf(target.value) !== -1) {
              newItemsSelected.splice(
                newItemsSelected.indexOf(target.value),
                1,
              );
              data.updateItemsSelected(newItemsSelected);
            }
          }
        }

        updateTriggerLabel(
          menuFields,
          menuLabels,
          triggerLabel,
          data,
          "update",
        );
        updateClearButton(clearButton, data);
      });

      for (let i = 0; i < totalCheckAllTargets; i++) {
        const target = checkAllTargets[i];

        target.addEventListener("change", () => {
          const newItemsSelected: string[] = [...data.itemsSelected];
          let currentChecked = 0;

          for (let j = 0; j < totalCheckAllTargets; j++) {
            if (checkAllTargets[j].checked) {
              currentChecked += 1;
            }
          }

          if (target.checked) {
            if (currentChecked === totalCheckAllTargets) {
              menuField.checked = true;
            }
          } else {
            menuField.checked = false;
          }
        });
      }
    }
  }
};

/*========================================
  Class
========================================*/
class dropdownData {
  offset: number;
  position: Placement;
  isMultiSelect: boolean;
  isRadio: boolean;
  fieldTypes: string[];
  initialFieldLabel: string;
  initialFieldLabelDisabled: boolean;
  totalFieldCount: number;
  initialSelectedFieldCount: number;
  selectedFieldCount: number;
  itemsSelected: string[];
  itemsSelectedInitial: string[];
  itemsSelectedApplied: string[];
  hideClearButton: boolean;

  constructor() {
    this.offset = 8;
    this.position = "top";
    this.isMultiSelect = false;
    this.isRadio = false;
    this.fieldTypes = [];
    this.initialFieldLabel = "";
    this.initialFieldLabelDisabled = true;
    this.totalFieldCount = 0;
    this.selectedFieldCount = 0;
    this.initialSelectedFieldCount = 0;
    this.itemsSelected = [];
    this.itemsSelectedInitial = [];
    this.itemsSelectedApplied = [];
    this.hideClearButton = true;
  }

  updateOffset(offset: number) {
    this.offset = offset;
  }
  updatePosition(position: Placement) {
    this.position = position;
  }
  updateIsMultiSelect(isMultiSelect: boolean) {
    this.isMultiSelect = isMultiSelect;
  }
  updateIsRadio(isRadio: boolean) {
    this.isRadio = isRadio;
  }
  updateFieldTypes(fieldTypes: string[]) {
    this.fieldTypes = fieldTypes;
  }
  updateInitialFieldLabel(initialFieldLabel: string) {
    this.initialFieldLabel = initialFieldLabel;
  }
  updateInitialFieldLabelDisabled(initialFieldLabelDisabled: boolean) {
    this.initialFieldLabelDisabled = initialFieldLabelDisabled;
  }
  updateTotalFieldCount(totalFieldCount: number) {
    this.totalFieldCount = totalFieldCount;
  }
  updateSelectedFieldCount(selectedFieldCount: number) {
    this.selectedFieldCount = selectedFieldCount;
  }
  updateInitialSelectedFieldCount(initialSelectedFieldCount: number) {
    this.initialSelectedFieldCount = initialSelectedFieldCount;
  }
  updateItemsSelected(itemsSelected: string[]) {
    this.itemsSelected = itemsSelected;
  }
  updateItemsSelectedInitial(itemsSelectedInitial: string[]) {
    this.itemsSelectedInitial = itemsSelectedInitial;
  }
  updateItemsSelectedApplied(itemsSelectedApplied: string[]) {
    this.itemsSelectedApplied = itemsSelectedApplied;
  }
  updateHideClearButton(hideClearButton: boolean) {
    this.hideClearButton = hideClearButton;
  }
}

const resize = (
  trigger: HTMLElement,
  content: HTMLElement,
  data: dropdownData,
  popperInstance: Instance,
) => {
  setTimeout(() => {
    if (data.isMultiSelect || data.isRadio) {
      content.style.width = `${trigger.offsetWidth}px`;
    }
    popperInstance.update();
  }, 300);
};

/*========================================
  Main function here
========================================*/
export const dropdown = () => {
  const dropdowns: NodeListOf<HTMLElement> =
    document.querySelectorAll(".dropdown");

  for (
    let i = 0, dropdownsLength = dropdowns.length;
    i < dropdownsLength;
    i++
  ) {
    const dropdown: HTMLElement = dropdowns[i];
    const trigger: HTMLElement | null =
      dropdown.querySelector(".dropdown-trigger");
    if (!trigger) return;

    const content: HTMLElement | null =
      dropdown.querySelector(".dropdown-content");
    if (!content) return;

    const menu: HTMLElement | null = dropdown.querySelector(".dropdown-menu");
    if (!menu) return;

    const triggerLabel: HTMLSpanElement | null = dropdown.querySelector(
      ".dropdown-trigger-label",
    );
    const triggerLabelText: string | undefined = triggerLabel?.innerText;
    const triggerIcon: HTMLElement | null = dropdown.querySelector(
      ".dropdown-trigger-icon",
    );
    const menuItems: NodeListOf<HTMLElement> = dropdown.querySelectorAll(
      ".dropdown-menu-item",
    );
    const data = new dropdownData();

    let customOffset: string | null;
    let customPosition: string | null;

    data.updateInitialFieldLabel(
      triggerLabelText ? triggerLabelText : "Select...",
    );

    // Check if menu should be the same width as trigger
    if (trigger.getAttribute("data-dropdown-multi-select") == "true") {
      data.updateIsMultiSelect(true);
    }

    if (trigger.getAttribute("data-dropdown-radio") == "true") {
      data.updateIsRadio(true);
    }

    if (data.isMultiSelect || data.isRadio) {
      data.updatePosition("bottom-start");
      content.style.width = `${trigger.offsetWidth}px`;
    }

    // Get custom offset (set in document)
    customOffset = trigger.getAttribute("data-dropdown-offset");
    if (customOffset) {
      data.updateOffset(parseInt(customOffset, 10));
    }

    // Get custom placement (set in document)
    customPosition = trigger.getAttribute("data-dropdown-placement");
    if (customPosition && !data.isMultiSelect && !data.isRadio) {
      data.updatePosition(<Placement>customPosition);
    }

    // Set dropdown position
    const popperInstance = createPopper(trigger, content, {
      placement: data.position,
      modifiers: [
        {
          name: "offset",
          options: {
            offset: [0, data.offset],
          },
        },
      ],
    });

    setActiveIcon(menuItems);
    menuItemClick(menuItems, triggerIcon, triggerLabel, trigger, content);

    if (triggerLabel) {
      triggerLabel.classList.add("not-selected");
    }

    // Enable scroll for menu
    setLenisScroll(menu);

    // Resize menu
    window.addEventListener("resize", () =>
      resize(trigger, content, data, popperInstance),
    );

    // Click to toggle dropdown
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      if (data.isMultiSelect || data.isRadio) {
        content.style.width = `${trigger.offsetWidth}px`;
      }
      dropdownToggle(trigger, content);
      popperInstance.update();

      setTimeout(() => {
        popperInstance.update();
      }, 302);

      if (trigger.classList.contains("navbar-dropdown-button")) {
        const navbar = document.querySelector(".navbar");

        if (navbar) {
          if (trigger.getAttribute("aria-expanded") === "true") {
            setTimeout(() => {
              navbar.classList.add("expanded");
            }, 1);
          } else {
            navbar.classList.remove("expanded");
          }
        }
      }
    });

    // Hides dropdown when clicks outside
    document.addEventListener("click", (event) => {
      if (!dropdown.contains(<Node>event.target)) {
        dropdownHide(trigger, content);
      }
    });

    // Press escape to hide menu
    content.addEventListener("keyup", (event) => {
      switch (event.key) {
        case "Escape":
          dropdownHide(trigger, content);
          break;
      }
    });

    trigger.addEventListener("keyup", (event) => {
      switch (event.key) {
        case "Escape":
          dropdownHide(trigger, content);
          break;
      }
    });

    if (data.isMultiSelect || data.isRadio) {
      const menuFields: NodeListOf<HTMLInputElement> =
        dropdown.querySelectorAll(".form-check-field");
      const menuLabels: NodeListOf<HTMLLabelElement> =
        dropdown.querySelectorAll(".form-check-field ~ .form-check-label");
      const cancelButton: HTMLButtonElement | null = dropdown.querySelector(
        ".dropdown-cancel-button",
      );
      const applyButton: HTMLButtonElement | null = dropdown.querySelector(
        ".dropdown-apply-button",
      );

      data.updateTotalFieldCount(menuFields.length);

      menuFields.forEach((menuField) => {
        if (menuField.classList.contains("check-all")) {
          data.updateTotalFieldCount(data.totalFieldCount - 1);
        }
        if (menuField.getAttribute("type") !== "checkbox") {
          data.updateTotalFieldCount(data.totalFieldCount - 1);
        }
        let type: string | null = menuField.getAttribute("type");
        let newFieldTypes = [...data.fieldTypes];

        if (type === null) {
          newFieldTypes.push("");
        } else {
          newFieldTypes.push(type);
        }
        data.updateFieldTypes(newFieldTypes);
      });

      const search: HTMLInputElement | null =
        dropdown.querySelector(".dropdown-search");

      let clearButtonName: string | null = null;
      let clearButton: HTMLElement | null = null;
      let contentIdName = trigger.getAttribute("data-dropdown-content-id");
      let contentId: HTMLElement | null = document.querySelector(
        `#${contentIdName}`,
      );
      let filterItems: NodeListOf<HTMLElement> | null = null;

      if (contentId) {
        filterItems = contentId.querySelectorAll("[data-dropdown-filter-item]");
      }

      clearButtonName = trigger.getAttribute("data-dropdown-clear-button");
      if (clearButtonName) {
        clearButton = document.getElementById(`${clearButtonName}`);

        if (clearButton) {
          if (clearButton.getAttribute("data-hide") === "false") {
            data.updateHideClearButton(false);
          }
        }
      }

      initFields(menuFields, data);
      updateTriggerLabel(menuFields, menuLabels, triggerLabel, data, "init");
      updateClearButton(clearButton, data);
      applyFilter(filterItems, data);

      menuFields.forEach((menuField) => {
        const isCheckAll = menuField.classList.contains("check-all");

        if (!isCheckAll) {
          menuField.addEventListener("change", () => {
            setSelectedFields(menuField, data);
            updateTriggerLabel(
              menuFields,
              menuLabels,
              triggerLabel,
              data,
              "update",
            );
            updateClearButton(clearButton, data);
          });
        } else {
          setCheckboxAllSelected(
            menuFields,
            menuLabels,
            menuField,
            triggerLabel,
            clearButton,
            data,
          );
        }
      });

      if (cancelButton && applyButton) {
        applyButton.addEventListener("click", (event) => {
          event.preventDefault();
          applyFilter(filterItems, data);
          dropdownHide(trigger, content);
        });

        cancelButton.addEventListener("click", (event) => {
          event.preventDefault();
          dropdownHide(trigger, content);
        });
      }

      if (clearButton) {
        updateClearButton(clearButton, data);

        clearButton.addEventListener("click", () => {
          data.updateSelectedFieldCount(data.initialSelectedFieldCount);
          data.updateItemsSelected(data.itemsSelectedInitial);
          updateTriggerLabel(
            menuFields,
            menuLabels,
            triggerLabel,
            data,
            "reset",
          );
          updateClearButton(clearButton, data);
          applyFilter(filterItems, data);
        });
      }

      if (search) {
        const searchTargetsWrapperName = search.getAttribute(
          "data-search-targets",
        );

        if (searchTargetsWrapperName) {
          const searchTargetsWrapper: HTMLElement | null =
            document.getElementById(searchTargetsWrapperName);

          if (searchTargetsWrapper) {
            const searchTargets: NodeListOf<HTMLLabelElement> | null =
              searchTargetsWrapper.querySelectorAll(".form-check");
            const totalSearchTargets = searchTargets.length;

            if (totalSearchTargets <= 0) return;

            const searchClearButton: HTMLButtonElement | null =
              dropdown.querySelector(".dropdown-search-clear");

            const clearAllButtonName = search.getAttribute(
              "data-clear-all-button",
            );
            let clearAllButton: HTMLElement | null = null;

            if (clearAllButtonName) {
              clearAllButton = document.querySelector(`#${clearAllButtonName}`);
            }

            search.addEventListener("input", () => {
              const value = search.value;

              if (value.length === 0) {
                for (let i = 0; i < totalSearchTargets; i++) {
                  searchTargets[i].classList.remove("hidden");
                }
              } else {
                for (let i = 0; i < totalSearchTargets; i++) {
                  const target = searchTargets[i];
                  const label = target.querySelector("label");

                  if (!label) return;

                  if (
                    label.innerText.toLowerCase().includes(value.toLowerCase())
                  ) {
                    target.classList.remove("hidden");
                  } else {
                    target.classList.add("hidden");
                  }
                }
              }
            });

            if (searchClearButton) {
              searchClearButton.addEventListener("click", () => {
                for (let i = 0; i < totalSearchTargets; i++) {
                  searchTargets[i].classList.remove("hidden");
                }
              });
            }

            if (clearAllButton) {
              clearAllButton.addEventListener("click", () => {
                for (let i = 0; i < totalSearchTargets; i++) {
                  searchTargets[i].classList.remove("hidden");
                }

                if (searchClearButton) {
                  searchClearButton.style.display = "none";
                }
              });
            }
          }
        }
      }
    }
  }
};
