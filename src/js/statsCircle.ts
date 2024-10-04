// Plugin: https://github.com/yomotsu/ScrambleText
import { ScrambleText } from "./ScrambleText";

export const statsCircle = () => {
  const texts = document.querySelectorAll(".stats-circle__title");

  texts.forEach((text) => {
    const scrambleText = new ScrambleText(text, {
      timeOffset: 400,
      chars: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
      ignoreDifferentChars: true,
    });
    let isPlayed = false;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isPlayed) {
            scrambleText.start().play();
            isPlayed = true;
          }
        });
      },
      {
        threshold: 1, // 100% of the element needs to be visible for it to be considered in view
      },
    );

    observer.observe(text);
  });
};
