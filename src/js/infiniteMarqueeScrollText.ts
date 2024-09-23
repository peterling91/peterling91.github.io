/* Issue List - Issue 6 
    Updated infiniteMarqueeScrollText */

export const infiniteMarqueeScrollText = () => {
  function duplicateContentToMinChars(
    container: HTMLElement,
    minChars: number,
  ) {
    if (!container) return;

    let content = container.textContent?.replace(/\s/g, " ");

    if (content) {
      if (content.length === 0) return;

      let duplicatedContent = content;

      // Continue duplicating until the content length is at least minChars
      while (duplicatedContent.length < minChars) {
        duplicatedContent += content; // Duplicate the content
      }
      container.innerText = duplicatedContent; // Update content
    }
  }
  const marquees = document.querySelectorAll(".marquee-cont");

  marquees.forEach((marquee) => {
    const container: HTMLElement | null = marquee.querySelector(
      ".marquee-track-content",
    );

    const track: HTMLElement | null = marquee.querySelector(".marquee-track");

    if (!container || !track) return;

    duplicateContentToMinChars(container, 95);

    // Clone marquee, for infinite loops
    const trackClone = document.createElement("div");
    trackClone.classList.add("marquee-track-content");
    trackClone.innerHTML = container.innerHTML;
    track.append(trackClone);

    setTimeout(() => {
      if (marquee.classList.contains("display-1")) {
        container.style.animation = "marquee-full 25s linear infinite";
        trackClone.style.animation = "marquee-full 25s linear infinite";
      } else {
        container.style.animation = "marquee-full 20s linear infinite";
        trackClone.style.animation = "marquee-full 20s linear infinite";
      }
    }, 5);
  });
};
