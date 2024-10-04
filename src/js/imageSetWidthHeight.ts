export const imageSetWidthHeight = () => {
  const images = document.querySelectorAll("img");

  images.forEach((image) => {
    const width = image.offsetWidth;
    const height = image.offsetHeight;

    if (width !== 0) image.setAttribute("width", `${width}px`);
    if (height !== 0) image.setAttribute("height", `${height}px`);
  });
};
