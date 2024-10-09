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
// import { siteStickyButtons } from "./siteStickyButtons";

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
import { announcement } from "./announcement";

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

/* Sustainability */
import { sustainabilityCursor } from "./sustainabilityCursor";
import { statsCircle } from "./statsCircle";
import { dialogFullImage } from "./dialogFullImage";
import {
  pageBannerCircleAnimation,
  sustainabilityHomeDiagram,
  imageSplashAnimation,
  sustainabilityReport,
  sustainabilityActions,
  sustainabilityLivingLabDiagram,
  sustainabilityLivingLabSection,
  carouselProgressIndicator,
  anchorLinkScroll,
} from "./scrollTriggered";

/*========================================
  Initialise lenis
========================================*/

// Android fix - Updated lenisMain
export let lenisMain: null | Lenis = null;
export let isTouch = navigator.maxTouchPoints > 0;

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

if (!isTouch) createLenis();

const resetLenis = () => {
  if (navigator.maxTouchPoints > 0 === isTouch) return;

  if (navigator.maxTouchPoints > 0) {
    lenisMain && lenisMain.destroy();
    lenisMain = null;
  } else {
    if (!lenisMain) {
      createLenis();
    }
  }

  isTouch = navigator.maxTouchPoints > 0;
};

window.addEventListener("resize", resetLenis);

/*========================================
  Initialise all functions
========================================*/
// Loading screen
loading(lenisMain);

const body: HTMLBodyElement | null = document.querySelector("body");
export const disableFullHeight: HTMLElement | null = document.querySelector(
  "[data-disable-full-height]",
);
const isFirefox = navigator.userAgent.toLowerCase().includes("firefox");

lazyloadVideo();
imageSetWidthHeight();
fullHeight(disableFullHeight); /* Updated for sustainability */

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

/* Others */
dropdown();
dialog(disableFullHeight, lenisMain); /* Updated for sustainability */
accordion(lenisMain);
personaCard();
personaPage(disableFullHeight);
tooltip(body);
tooltipCardBadge(body);
courseDetailsBanner(disableFullHeight);
readMore();
alertLive();
weGo(disableFullHeight);
emptyLink();
playVideoSafari();
announcement();

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
scrollTriggered(disableFullHeight, lenisMain); /* Updated for sustainability */

/* How you'll learn */
pcm(); /* Updated for sustainability */

/* Plugins, APIs */
youtubeEmbed(body);

/* Sustainability */
sustainabilityCursor();
statsCircle();
dialogFullImage();
pageBannerCircleAnimation();
sustainabilityHomeDiagram();
imageSplashAnimation();
sustainabilityReport();
sustainabilityActions();
sustainabilityLivingLabDiagram();
sustainabilityLivingLabSection();
carouselProgressIndicator();
anchorLinkScroll();
