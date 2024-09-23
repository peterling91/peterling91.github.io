import { setWrapperHeightStyle } from "./sideNav";
import { dropdownShow, dropdownToggle } from "./dropdown";

const DELAY: number = 500;

/*====================================================
  Reusable functions, see main function below
====================================================*/
const setWrapperHeight = (wrapper: HTMLElement, sideNav: HTMLElement) => {
  if (!wrapper.classList.contains("dialog-content")) {
    setWrapperHeightStyle(wrapper, sideNav);
  }
};

// Show filter counter badge and set counter number
const showFilterCountBadges = (
  filterCountBadges: NodeListOf<HTMLElement>,
  filterCount: number,
) => {
  filterCountBadges.forEach((filterCountBadge) => {
    filterCountBadge.classList.add("show");
    filterCountBadge.innerText = `${filterCount}`;

    const linkedBadgeName: string | null =
      filterCountBadge.getAttribute("data-linked-badge");

    if (linkedBadgeName) {
      const linkedBadge = document.getElementById(linkedBadgeName);

      if (linkedBadge) {
        linkedBadge.classList.add("show");
        linkedBadge.innerText = `${filterCount}`;
      }
    }
  });
};

// Hide filter counter badge and reset counter number
const hideFilterCountBadges = (
  filterCountBadges: NodeListOf<HTMLElement>,
  filterCount: number,
) => {
  filterCountBadges.forEach((filterCountBadge) => {
    filterCountBadge.classList.remove("show");
    filterCountBadge.innerText = `${filterCount}`;

    const linkedBadgeName: string | null =
      filterCountBadge.getAttribute("data-linked-badge");

    if (linkedBadgeName) {
      const linkedBadge = document.getElementById(linkedBadgeName);

      if (linkedBadge) {
        linkedBadge.classList.remove("show");
        linkedBadge.innerText = `${filterCount}`;
      }
    }
  });
};

const toggleFilterCountBadges = (
  filterCountBadges: NodeListOf<HTMLElement>,
  data: filterData,
) => {
  if (data.filterCount > 0) {
    showFilterCountBadges(filterCountBadges, data.filterCount);
  } else {
    hideFilterCountBadges(filterCountBadges, data.filterCount);
  }
};

// Reset filter count, when clear all is chosen
const resetFilterCounted = (
  formFields: NodeListOf<HTMLInputElement> | NodeListOf<HTMLSelectElement>,
) => {
  const filterCounted: Boolean[] = [];

  formFields.forEach((formField) => {
    filterCounted.push(false);
  });

  return filterCounted;
};

// Selects - get initial value of selected option
const getSelectInitialValue = (selects: NodeListOf<HTMLSelectElement>) => {
  const selectValues: string[] = [];

  selects.forEach((select) => {
    selectValues.push(select.value);
  });

  return selectValues;
};

// Radios - get initial value of selected option
const getradioInitialValues = (inputs: NodeListOf<HTMLInputElement>) => {
  const radioArray: object[] = [];

  for (let i = 0, inputsLength = inputs.length; i < inputsLength; i++) {
    const input: HTMLInputElement = inputs[i];
    const inputType: string | null = input.getAttribute("type");

    if (inputType === "radio") {
      const inputName: string | null = input.getAttribute("name");
      const inputValue: string | null = input.getAttribute("value");
      const inputNameValue: any = {};

      if (inputName) {
        if (input.checked) {
          inputNameValue[inputName] = inputValue;
        } else {
          inputNameValue[inputName] = "none";
        }
      } else {
        inputNameValue[i] = input.checked;
      }
      radioArray.push(inputNameValue);
    }
  }
  const filteredRadioArray = radioArray.filter((valueA, filteredValue) => {
    return (
      filteredValue ===
      radioArray.findIndex((valueB) => {
        return JSON.stringify(valueB) === JSON.stringify(valueA);
      })
    );
  });

  const filteredRadioKeyValue: any[] = [];
  let currentKey: string | null = null;

  for (const item of filteredRadioArray) {
    for (const [key, value] of Object.entries(item)) {
      const keyValue: any[] = [];

      if (key !== currentKey) {
        keyValue.push(key);
        keyValue.push(value);
        filteredRadioKeyValue.push(keyValue);
      } else {
        if (value !== "none") {
          for (const item of filteredRadioKeyValue) {
            item[1] = value;
          }
        }
      }
      currentKey = key;
    }
  }
  return filteredRadioKeyValue;
};

const expandSections = (
  expandButtons: NodeListOf<HTMLButtonElement>,
  filter: HTMLElement,
  filterFields: HTMLElement | null,
) => {
  let expandButtonsLength = expandButtons.length;

  if (expandButtonsLength >= 1) {
    const expandContents: NodeListOf<HTMLElement> = filter.querySelectorAll(
      ".filter-options-header ~ .filter-options-fields-wrapper",
    );

    for (let i = 0; i < expandButtonsLength; i++) {
      const expandButton = expandButtons[i];
      const expandContent = expandContents[i];

      // Show expanded items when document loads
      if (expandButton.getAttribute("aria-expanded") === "true") {
        dropdownShow(expandButton, expandContent, DELAY, null, true);
      }

      // Click to expand item
      expandButton.addEventListener("click", (event) => {
        event.preventDefault();
        dropdownToggle(expandButton, expandContent, DELAY, null, true);

        // Set height of content wrapper
        setTimeout(() => {
          if (filterFields) setWrapperHeight(filter, filterFields);
        }, DELAY + 1);
      });
    }
  }
};

const resetFilter = (
  filterCountBadges: NodeListOf<HTMLElement>,
  inputs: NodeListOf<HTMLInputElement>,
  selects: NodeListOf<HTMLSelectElement>,
  selectMenus: NodeListOf<HTMLAnchorElement>,
  data: filterData,
) => {
  hideFilterCountBadges(filterCountBadges, data.filterCount);
  data.updateFilterCount(0);
  data.updateInputFilterCounted(resetFilterCounted(inputs));
  data.updateSelectFilterCounted(resetFilterCounted(selects));

  for (
    let i = 0, selectMenusLength = selectMenus.length;
    i < selectMenusLength;
    i++
  ) {
    const selectMenu = selectMenus[i];
    const selectLabel: HTMLSpanElement | null =
      selectMenu.querySelector(".select-label");

    if (selectLabel) {
      selectLabel.innerText = data.selectInitialValue[i];
    }
  }
};

const setSelectFilterCount = (
  selects: NodeListOf<HTMLSelectElement>,
  selectMenus: NodeListOf<HTMLAnchorElement>,
  filterCountBadges: NodeListOf<HTMLElement>,
  data: filterData,
) => {
  for (
    let i = 0, selectMenusLength = selectMenus.length;
    i < selectMenusLength;
    i++
  ) {
    const selectMenu = selectMenus[i];
    const select = selects[i];
    const ignore = select.getAttribute("data-filter-ignore") === "true";

    if (!ignore) {
      const isSelectedOptionDisabled =
        select.options[select.selectedIndex].getAttribute("disabled") !== null;
      const selectMenuItems: NodeListOf<HTMLAnchorElement> =
        selectMenu.querySelectorAll(".dropdown-menu-item");

      for (
        let j = 0, selectMenuItemsLength = selectMenuItems.length;
        j < selectMenuItemsLength;
        j++
      ) {
        const selectMenuItem = selectMenuItems[j];

        selectMenuItem.addEventListener("click", () => {
          let selectValue: string | null;
          let currentIndex: number = j;

          if (isSelectedOptionDisabled) {
            currentIndex = j + 1;
          }
          selectValue = select.options[currentIndex].value;
          const newSelectFilterCounted = [...data.selectFilterCounted];

          if (newSelectFilterCounted[i] === false) {
            if (selectValue !== data.selectInitialValue[i]) {
              data.updateFilterCount(data.filterCount + 1);
              newSelectFilterCounted[i] = true;
              data.updateSelectFilterCounted(newSelectFilterCounted);
            }
          }
          if (
            newSelectFilterCounted[i] === true &&
            selectValue === data.selectInitialValue[i]
          ) {
            data.updateFilterCount(data.filterCount - 1);
            newSelectFilterCounted[i] = false;
            data.updateSelectFilterCounted(newSelectFilterCounted);
          }

          toggleFilterCountBadges(filterCountBadges, data);
        });
      }
    }
  }
};

const setRadioFilterCount = (
  inputs: NodeListOf<HTMLInputElement>,
  input: HTMLInputElement,
  inputIndex: number,
  filterCountBadges: NodeListOf<HTMLElement>,
  data: filterData,
) => {
  const ignore = input.getAttribute("data-filter-ignore") === "true";

  if (!ignore) {
    input.addEventListener("change", () => {
      const radioName: string | null = input.getAttribute("name");
      const radioValue: string | null = input.getAttribute("value");
      const newInputFilterCounted = [...data.inputFilterCounted];

      for (const item of data.radioInitialValues) {
        if (radioName) {
          if (item[0] === radioName) {
            if (item[1] === "none") {
              if (
                newInputFilterCounted[inputIndex] === false &&
                input.checked
              ) {
                data.updateFilterCount(data.filterCount + 1);

                for (
                  let i = 0, inputsLength = inputs.length;
                  i < inputsLength;
                  i++
                ) {
                  if (input.getAttribute("name") === item[0]) {
                    newInputFilterCounted[i] = true;
                    data.updateInputFilterCounted(newInputFilterCounted);
                  }
                }
              }
            } else {
              if (
                newInputFilterCounted[inputIndex] === false &&
                item[1] !== radioValue &&
                input.checked
              ) {
                data.updateFilterCount(data.filterCount + 1);

                for (
                  let i = 0, inputsLength = inputs.length;
                  i < inputsLength;
                  i++
                ) {
                  if (input.getAttribute("name") === item[0]) {
                    newInputFilterCounted[i] = true;
                    data.updateInputFilterCounted(newInputFilterCounted);
                  }
                }
              }
              if (item[1] === radioValue && input.checked) {
                data.updateFilterCount(data.filterCount - 1);

                for (
                  let i = 0, inputsLength = inputs.length;
                  i < inputsLength;
                  i++
                ) {
                  if (input.getAttribute("name") === item[0]) {
                    newInputFilterCounted[i] = false;
                    data.updateInputFilterCounted(newInputFilterCounted);
                  }
                }
              }
            }
          }
        } else {
          if (parseInt(item[0]) === inputIndex) {
            if (
              newInputFilterCounted[inputIndex] === false &&
              input.checked !== item[1]
            ) {
              data.updateFilterCount(data.filterCount + 1);
              newInputFilterCounted[inputIndex] = true;
              data.updateInputFilterCounted(newInputFilterCounted);
            }
          }
        }
      }

      toggleFilterCountBadges(filterCountBadges, data);
    });
  }
};

const setInputFilterCount = (
  filterCountBadges: NodeListOf<HTMLElement>,
  input: HTMLInputElement,
  inputIndex: number,
  data: filterData,
) => {
  const ignore = input.getAttribute("data-filter-ignore") === "true";

  if (!ignore) {
    const initialValue = input.value;
    let clearButton: HTMLButtonElement | null = null;

    if (input.parentElement) {
      clearButton = input.parentElement.querySelector(".form-clear-button");
    }

    const updateInput = () => {
      const newInputFilterCounted = [...data.inputFilterCounted];

      if (newInputFilterCounted[inputIndex] === false) {
        if (input.value !== initialValue) {
          data.updateFilterCount(data.filterCount + 1);
          newInputFilterCounted[inputIndex] = true;
          data.updateInputFilterCounted(newInputFilterCounted);
        }
      }

      if (input.value === initialValue) {
        data.updateFilterCount(data.filterCount - 1);
        newInputFilterCounted[inputIndex] = false;
        data.updateInputFilterCounted(newInputFilterCounted);
      }

      toggleFilterCountBadges(filterCountBadges, data);
    };

    input.addEventListener("input", updateInput);
    clearButton?.addEventListener("click", updateInput);
  }
};

const setCheckboxFilterCount = (
  filterCountBadges: NodeListOf<HTMLElement>,
  input: HTMLInputElement,
  data: filterData,
) => {
  const isCheckAll = input.classList.contains("check-all");
  const ignore = input.getAttribute("data-filter-ignore") === "true";

  if (!ignore && !isCheckAll) {
    const initiallyChecked = input.checked;

    // Set filter counter for checkboxes
    input.addEventListener("change", () => {
      if (input.checked !== initiallyChecked) {
        data.updateFilterCount(data.filterCount + 1);
      } else {
        data.updateFilterCount(data.filterCount - 1);
      }

      toggleFilterCountBadges(filterCountBadges, data);
    });
  }
};

const setCheckAllFilterCount = (
  filterCountBadges: NodeListOf<HTMLElement>,
  input: HTMLInputElement,
  data: filterData,
  clearButton: HTMLButtonElement | null,
) => {
  const isCheckAll = input.classList.contains("check-all");

  if (isCheckAll) {
    let isChanged = false;
    const checkAllTargetsWrapperName = input.getAttribute(
      "data-check-all-targets",
    );

    if (checkAllTargetsWrapperName) {
      const checkAllTargetsWrapper: HTMLElement | null =
        document.getElementById(checkAllTargetsWrapperName);

      if (checkAllTargetsWrapper) {
        const checkAllTargets: NodeListOf<HTMLInputElement> | null =
          checkAllTargetsWrapper.querySelectorAll("input");
        const totalCheckAllTargets = checkAllTargets.length;
        const checkAllTargetsInitialValue: boolean[] = [];

        for (let i = 0; i < totalCheckAllTargets; i++) {
          if (checkAllTargets[i].checked) {
            checkAllTargetsInitialValue.push(true);
          } else {
            checkAllTargetsInitialValue.push(false);
          }
        }

        let checkAllTargetsCurrentValue = [...checkAllTargetsInitialValue];

        for (let i = 0; i < totalCheckAllTargets; i++) {
          const checkAllTarget = checkAllTargets[i];

          checkAllTarget.addEventListener("change", () => {
            if (checkAllTarget.checked) {
              checkAllTargetsCurrentValue[i] = true;
            } else {
              checkAllTargetsCurrentValue[i] = false;
            }

            if (
              JSON.stringify(checkAllTargetsCurrentValue) !==
                JSON.stringify(checkAllTargetsInitialValue) &&
              !isChanged
            ) {
              data.updateFilterCount(data.filterCount + 1);
              isChanged = true;
            }

            if (
              JSON.stringify(checkAllTargetsCurrentValue) ===
                JSON.stringify(checkAllTargetsInitialValue) &&
              isChanged
            ) {
              data.updateFilterCount(data.filterCount - 1);
              isChanged = false;
            }

            toggleFilterCountBadges(filterCountBadges, data);
          });
        }

        input.addEventListener("change", () => {
          if (input.checked) {
            for (let i = 0; i < totalCheckAllTargets; i++) {
              checkAllTargetsCurrentValue[i] = true;
            }
          } else {
            for (let i = 0; i < totalCheckAllTargets; i++) {
              checkAllTargetsCurrentValue[i] = false;
            }
          }

          if (
            JSON.stringify(checkAllTargetsCurrentValue) !==
              JSON.stringify(checkAllTargetsInitialValue) &&
            !isChanged
          ) {
            data.updateFilterCount(data.filterCount + 1);
            isChanged = true;
          }

          if (
            JSON.stringify(checkAllTargetsCurrentValue) ===
              JSON.stringify(checkAllTargetsInitialValue) &&
            isChanged
          ) {
            data.updateFilterCount(data.filterCount - 1);
            isChanged = false;
          }

          toggleFilterCountBadges(filterCountBadges, data);
        });

        clearButton?.addEventListener("click", () => {
          checkAllTargetsCurrentValue = [...checkAllTargetsInitialValue];
          isChanged = false;
        });
      }
    }
  }
};

/*========================================
  Class
========================================*/
class filterData {
  totalInputFields: number;
  filterCount: number;
  inputFilterCounted: Boolean[];
  selectFilterCounted: Boolean[];
  selectInitialValue: string[];
  radioInitialValues: any[];

  constructor() {
    this.totalInputFields = 0;
    this.filterCount = 0;
    this.inputFilterCounted = [];
    this.selectFilterCounted = [];
    this.selectInitialValue = [];
    this.radioInitialValues = [];
  }

  updateTotalFields(totalInputFields: number) {
    this.totalInputFields = totalInputFields;
  }
  updateFilterCount(filterCount: number) {
    this.filterCount = filterCount;
  }
  updateInputFilterCounted(inputFilterCounted: Boolean[]) {
    this.inputFilterCounted = inputFilterCounted;
  }
  updateSelectFilterCounted(selectFilterCounted: Boolean[]) {
    this.selectFilterCounted = selectFilterCounted;
  }
  updateSelectInitialValue(selectInitialValue: string[]) {
    this.selectInitialValue = selectInitialValue;
  }
  updateRadioInitialValues(radioInitialValues: any[]) {
    this.radioInitialValues = radioInitialValues;
  }
}

const resize = (filter: HTMLElement, filterFields: HTMLElement) => {
  // Set height of content wrapper
  setTimeout(() => {
    setWrapperHeight(filter, filterFields);
  }, 301);
};

/*========================================
  Main function here
========================================*/
export const filters = () => {
  const filters: NodeListOf<HTMLElement> =
    document.querySelectorAll(".filter-form");

  for (let i = 0, filtersLength = filters.length; i < filtersLength; i++) {
    const filter = filters[i];
    const filterFields: HTMLElement | null = filter.querySelector(".filter");
    const expandButtons: NodeListOf<HTMLButtonElement> =
      filter.querySelectorAll(".filter-options-header");
    const filterCountBadges: NodeListOf<HTMLElement> =
      filter.querySelectorAll(".filter-counter");

    // Form elements
    const clearButton: HTMLButtonElement | null = filter.querySelector(
      ".filter-clear-button",
    );
    const inputs: NodeListOf<HTMLInputElement> =
      filter.querySelectorAll("input");
    const selects: NodeListOf<HTMLSelectElement> = filter.querySelectorAll(
      ".form-select > select",
    );
    const selectMenus: NodeListOf<HTMLAnchorElement> =
      filter.querySelectorAll(".form-select");

    const data = new filterData();

    data.updateInputFilterCounted(resetFilterCounted(inputs));
    data.updateSelectFilterCounted(resetFilterCounted(selects));
    data.updateSelectInitialValue(getSelectInitialValue(selects));
    data.updateRadioInitialValues(getradioInitialValues(inputs));

    if (filterFields) {
      // Set height of content wrapper
      resize(filter, filterFields);
      window.addEventListener("resize", () => resize(filter, filterFields));
    }

    /*========================================
      Expand or collapse category
    ========================================*/
    expandSections(expandButtons, filter, filterFields);

    /*========================================
      Filter counter
    ========================================*/
    // Clear filter counter
    if (clearButton) {
      clearButton.addEventListener("click", () => {
        resetFilter(filterCountBadges, inputs, selects, selectMenus, data);
      });
    }

    // Set filter counter for selects
    setSelectFilterCount(selects, selectMenus, filterCountBadges, data);

    for (let j = 0, inputsLength = inputs.length; j < inputsLength; j++) {
      const input: HTMLInputElement = inputs[j];
      const inputType: string | null = input.getAttribute("type");

      switch (inputType) {
        case undefined:
        case null:
          break;
        case "checkbox":
          // Set filter counter for checkboxes
          setCheckboxFilterCount(filterCountBadges, input, data);

          // Set filter counter for select all checkboxes
          setCheckAllFilterCount(filterCountBadges, input, data, clearButton);
          break;
        case "radio":
          // Set filter counter for radios
          setRadioFilterCount(inputs, input, j, filterCountBadges, data);
          break;
        default:
          // Set filter counter for other input types
          setInputFilterCount(filterCountBadges, input, j, data);
          break;
      }
    }
  }
};
