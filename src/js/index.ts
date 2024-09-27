import _ from "lodash";

// lazysizes (plugin): https://github.com/aFarkas/lazysizes?tab=readme-ov-file
import "lazysizes";

// Lenis (plugin): https://github.com/darkroomengineering/lenis
import Lenis from "lenis";

/* Loading */
import { loading } from "./loading";
import { fullHeight } from "./fullHeight";

/* Navigation */
import { navigation } from "./navigation";
import { switchRole } from "./switchRole";
import { sideNav } from "./sideNav";
import { sideTab } from "./sideTab";
import { footer } from "./footer";

/* Site sticky buttons */
import { backToTop } from "./backToTop";
// import { siteStickyButtons } from "./siteStickyButtons"; /* To remove in production */

/* Form */
import { selectToggle, radioToggle } from "./formToggle";
import { customSelect, firefoxPseudoFix, form } from "./form";
import { filters } from "./filters";
import { filterGroup } from "./filterGroup";

/* Others */
import { dropdown } from "./dropdown";
import { accordion } from "./accordion";
import { dialog } from "./dialog";
import { personaCard } from "./personaCard";
import { personaPage } from "./personaPage";
import { tooltip } from "./tooltip";
import { tooltipCardBadge } from "./tooltip";
import { courseDetailsBanner } from "./courseDetailsBanner";
import { readMore } from "./readMore";
import { pcm } from "./pcm";
import { weGo } from "./weGo";
import { alertLive } from "./alertLive";
import { emptyLink } from "./links";
import { playVideoSafari } from "./playVideoSafari";
import { lazyloadVideo } from "./lazyload";
import { imageSetWidthHeight } from "./imageSetWidthHeight";

/* Carousels */
import { carouselAll } from "./carousel";
import { carouselFull } from "./carouselFull";
import { arcCarousel } from "./arcCarousel";
import { horizontalCardCarousel } from "./horizontalCardCarousel";
import { threeCardCarousel } from "./threeCardCarousel";
import { carouselPageBanner } from "./carouselPageBanner";

/* Scroll components */
import { infiniteMarqueeScrollText } from "./infiniteMarqueeScrollText";
import { infiniteMarqueeScrollLogo } from "./infiniteMarqueeScrollLogo";
import { scrollTriggered } from "./scrollTriggered";

/* Plugins, APIs */
import { youtubeEmbed } from "./youtubeEmbed";

/*========================================
  Initialise lenis
========================================*/

// Android fix - Updated lenisMain
export let lenisMain: null | Lenis = null;

// Scroll fix
// Disable lenis on 1. on touch devices, 2. if there are no scroll triggered animations on page
const hasScrollFixed = document.querySelector(".scroll-fixed");
const hasScrollFadeIn = document.querySelector(".scroll-fade-in");
const hasScrollFadeUp = document.querySelector(".scroll-fade-up");
const hasScrollMarquee = document.querySelector(".scroll-marquee");
const hasScrollBackgroundColor = document.querySelector(
  ".scroll-background-color",
);
const hasScrollRotate = document.querySelector(".scroll-rotate");
const hasScrollActive = document.querySelector(".scroll-active");
const hasParallax = document.querySelector(".parallax-item");
const hasScrollMasonry = document.querySelector(".scroll-masonry");

export let hasScrollAnimation = false;
export const isTouch = navigator.maxTouchPoints > 0;

// Fix - 29 Apr 2024: Android fix - Updated conditions
if (
  hasScrollFixed ||
  hasScrollFadeIn ||
  hasScrollFadeUp ||
  hasScrollMarquee ||
  hasScrollBackgroundColor ||
  hasScrollRotate ||
  hasScrollActive ||
  hasParallax ||
  hasScrollMasonry
) {
  hasScrollAnimation = true;
}

const createLenis = () => {
  lenisMain = new Lenis({
    lerp: 0.1,
    smoothWheel: true,
  });

  const rafMain = (time: any) => {
    lenisMain && lenisMain.raf(time);
    requestAnimationFrame(rafMain);
  };
  requestAnimationFrame(rafMain);
};

// Fix - 29 Apr 2024: Android fix - Updated conditions
if (hasScrollAnimation && !isTouch) {
  createLenis();
}

const resetLenis = () => {
  if (navigator.maxTouchPoints > 0 === isTouch) return;
  
  if (navigator.maxTouchPoints > 0) {
    lenisMain && lenisMain.destroy();
    lenisMain = null;
  } else {
    if (hasScrollAnimation && !lenisMain) {
      createLenis();
    }
  }
};

window.addEventListener("resize", resetLenis);

/*========================================
  Initialise all functions
========================================*/
// Loading screen
loading(lenisMain);

const body: HTMLBodyElement | null = document.querySelector("body");
const disableFullHeight: HTMLElement | null = document.querySelector(
  "[data-disable-full-height]",
);
const isFirefox = navigator.userAgent.toLowerCase().includes("firefox");

lazyloadVideo();
imageSetWidthHeight();
fullHeight(disableFullHeight);

/* Form */
form();
customSelect();
firefoxPseudoFix();
filters();
filterGroup();

/* Navigation */
navigation(body, disableFullHeight);
switchRole(body);
sideNav(disableFullHeight);
sideTab();
footer();

/* Site sticky buttons */
backToTop();
// siteStickyButtons(); /* To remove in production */

/* Others */
dropdown();
dialog(disableFullHeight, lenisMain);
accordion(lenisMain);
// stickyBottom(disableFullHeight);
personaCard();
personaPage(disableFullHeight);
tooltip(body);
tooltipCardBadge(body);
courseDetailsBanner(disableFullHeight);
readMore();
alertLive();
// audio(); /* To remove in production if not using */
weGo(disableFullHeight);
emptyLink();
playVideoSafari();

/* Carousels */
carouselFull(isFirefox);
carouselAll(isFirefox);
arcCarousel(isFirefox);
horizontalCardCarousel();
threeCardCarousel();
carouselPageBanner();

/* Form toggle */
selectToggle();
radioToggle();

/* Scroll components */
infiniteMarqueeScrollText();
infiniteMarqueeScrollLogo();
scrollTriggered(disableFullHeight, lenisMain, hasScrollAnimation, isTouch);

/* How you'll learn */
pcm();

/* Plugins, APIs */
youtubeEmbed(body);
