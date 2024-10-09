// GSAP (plugin): https://gsap.com/docs/v3/
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, Flip, ScrollToPlugin);

ScrollTrigger.config({
  ignoreMobileResize: true,
});

export { gsap, ScrollTrigger, Flip, ScrollToPlugin };
