import { getPageZoom } from "./utilites";

export const personaPage = (disableFullHeight: HTMLElement | null): void => {
  (function () {
    if (document.readyState === "loading") {
      // If the document is still loading
      document.addEventListener("DOMContentLoaded", adjustCardGroupHeight);
    } else {
      // If the document has already finished loading
      adjustCardGroupHeight();
    }

    window.addEventListener("resize", adjustCardGroupHeight);
  })();

  function adjustCardGroupHeight(): void {
    //console.log("adjustCardGroupHeight triggered");

    const medHead = document.querySelector(".med-head") as HTMLElement;
    const medCardGroup = document.querySelector(
      ".med-card-group",
    ) as HTMLElement;

    if (medHead && medCardGroup) {
      // Zoom fix - updated medHeadHeight value
      const medHeadHeight: number = medHead.offsetHeight + 90 * getPageZoom();

      // Zoom fix - updated newHeight value
      const newHeight: string = !disableFullHeight
        ? `${window.innerHeight - medHeadHeight}px`
        : `${640 * getPageZoom() - medHeadHeight}px`;
      medCardGroup.style.minHeight = newHeight;
      window.onload = adjustCardGroupHeight;
    }
  }
};
