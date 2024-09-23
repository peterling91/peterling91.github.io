export const continuousScroll = (): void => {
  const scrollContents = document.querySelectorAll(".scroll-content");

  scrollContents.forEach((content: Element, index: number) => {
    content.addEventListener("animationiteration", () => {
      let otherContent = scrollContents[
        (index + 1) % scrollContents.length
      ] as HTMLElement;
      otherContent.style.animationDelay = "5s"; // Adjust this based on your content length and desired appearance
    });
  });
};
