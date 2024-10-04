/* Issue List - Issue 5
   Replace all functions below
*/
export const infiniteMarqueeScrollLogo = () => {
  infiniteMarqueeScrollLogoFunction("logo-marquee", "logo-marquee-track");

  infiniteMarqueeScrollLogoFunction(
    "text-banner-images-center",
    "text-banner-images-center-track",
    4,
  );
};

const resize = (track: HTMLElement, marquee: HTMLElement) => {
  if (track.offsetWidth > marquee.offsetWidth) {
    marquee.style.width = `${track.offsetWidth}px`;
  }
};

export const infiniteMarqueeScrollLogoFunction = (
  marqueeName: string,
  trackName: string,
  duration: number = 1,
) => {
  const marquees: NodeListOf<HTMLElement> = document.querySelectorAll(
    `.${marqueeName}`,
  );

  marquees.forEach((marquee) => {
    const track: HTMLElement | null = marquee.querySelector(`.${trackName}`);

    if (track) {
      const items = track.childNodes;
      const totalItems: number = items.length;

      // Set container's width to be the same as marquee, for seamless animation
      resize(track, marquee);

      // Fix - 01 May 2024 - only reset marquee if width changes to prevent lag in mobile
      let windowWidthPrev = window.innerWidth;

      window.addEventListener("resize", () => {
        let windowWidth = window.innerWidth;

        if (window.innerWidth !== windowWidthPrev) {
          resize(track, marquee);
        }
        windowWidthPrev = windowWidth;
      });

      // Clone marquee, for infinite loops
      const trackClone = document.createElement("div");
      trackClone.classList.add(trackName);
      trackClone.innerHTML = track.innerHTML;
      marquee.append(trackClone);

      window.addEventListener("load", () => {
        setTimeout(() => {
          track.style.animation = `marquee-full ${
            duration * totalItems
          }s linear infinite`;

          trackClone.style.animation = `marquee-full ${
            duration * totalItems
          }s linear infinite`;
        }, 5);
      });
    }
  });
};
