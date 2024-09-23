export const zoomPage = () => {
  const root: HTMLElement | null = document.querySelector(":root");
  if (!root) return;

  let zoom, windowWidth;

  const setZoom = () => {
    root.style.setProperty("font-size", `16px`);
    windowWidth = window.innerWidth;

    if (windowWidth >= 1440) {
      zoom = window.innerWidth / 1440;
    } else {
      zoom = 1;
    }

    root.style.setProperty("--zoom", `${zoom}`);
    root.style.setProperty("font-size", `calc(16px * ${zoom})`);
  };

  setZoom();

  window.addEventListener("resize", setZoom);
};
