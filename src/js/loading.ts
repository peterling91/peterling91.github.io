import Lenis from "lenis";

export const loading = (lenisMain: null | Lenis) => {
  const mainContainer: HTMLElement | null = document.querySelector("main");

  if (!mainContainer) return;

  lenisMain && lenisMain.stop();

  const loadingScreen = document.createElement("div");
  loadingScreen.classList.add("loading");
  mainContainer.append(loadingScreen);

  window.addEventListener("load", () => {
    loadingScreen.style.opacity = "0";

    setTimeout(() => {
      loadingScreen.remove();
      lenisMain && lenisMain.start();
    }, 300);
  });
};
