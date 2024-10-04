export const sectionTabs = (): void => {
  /*====================================================
  Section Tabs
====================================================*/
  const tabs = document.querySelectorAll(
    ".tab-button",
  ) as NodeListOf<HTMLElement>;
  const contents = document.querySelectorAll(
    ".section-tab-content",
  ) as NodeListOf<HTMLElement>;
  const mobileSelect = document.querySelector(
    'select[name="section-tab-buttons-mobile"]',
  ) as HTMLSelectElement | null;

  // Initially hide all contents except the first one
  contents.forEach((content, index) => {
    if (index !== 0) content.classList.add("hidden");
  });

  tabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      activateTabAndContent(this);

      // Update the dropdown to reflect the active tab
      const activeTabData = this.getAttribute("data-tab");
      if (mobileSelect && activeTabData !== null) {
        mobileSelect.value = activeTabData;
      }
    });
  });

  // Event listener for the select element
  mobileSelect?.addEventListener("change", function () {
    const selectedValue = this.value;
    const correspondingTab = document.querySelector(
      `.tab-button[data-tab="${selectedValue}"]`,
    ) as HTMLElement | null;

    if (correspondingTab) {
      activateTabAndContent(correspondingTab);
    }
  });

  // Function to activate tab and show its content
  function activateTabAndContent(tabElement: HTMLElement) {
    const targetClass = tabElement.getAttribute("data-tab");
    if (!targetClass) return;

    const targetContent = document.querySelector(
      `.${targetClass}`,
    ) as HTMLElement | null;

    // Deactivate all tabs
    tabs.forEach((t) => t.classList.remove("active-tab"));

    // Hide all content
    contents.forEach((content) => content.classList.add("hidden"));

    // Activate clicked tab and show its content
    tabElement.classList.add("active-tab");
    if (targetContent) {
      targetContent.classList.remove("hidden");
    }
  }
};
