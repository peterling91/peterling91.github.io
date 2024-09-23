/*====================================================
Module Time Line 
====================================================*/
export const moduleTimeLine = (): void => {
  // Type assertion for DOM elements
  const progressBar = document.querySelector(
    "#scroll-progress-bar",
  ) as HTMLDivElement;
  const section = document.querySelector("#moduleTimeline") as HTMLElement;

  // Checking if the elements exist
  if (!progressBar || !section) {
    // throw new Error('Required elements not found');
    return;
  }

  let rafId: number | null = null;
  let lastHeight = 0; // Track the last height to interpolate from

  const animateProgressBar = (): void => {
    if (!section) return;

    const totalScrollableHeight = section.scrollHeight - section.clientHeight;
    const scrollPosition = section.scrollTop;
    const targetProgress = (scrollPosition / totalScrollableHeight) * 100;
    const progressIncrement = (targetProgress - lastHeight) * 0.1; // Smoothing factor, adjust as needed

    // Linear interpolation for smoother transition
    lastHeight += progressIncrement;
    progressBar.style.height = `${lastHeight}%`;

    // If we haven't reached the target, request another frame
    if (Math.abs(lastHeight - targetProgress) > 0.1) {
      rafId = requestAnimationFrame(animateProgressBar);
    } else {
      lastHeight = targetProgress; // Snap to final position if we're close
    }
  };

  section.addEventListener("scroll", () => {
    if (rafId !== null) {
      cancelAnimationFrame(rafId); // Cancel any queued animations
    }
    rafId = requestAnimationFrame(animateProgressBar);
  });
};
