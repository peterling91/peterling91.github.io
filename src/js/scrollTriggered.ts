// GSAP (plugin): https://gsap.com/docs/v3/
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";

// Lenis (plugin): https://github.com/darkroomengineering/lenis
import Lenis from "lenis";
// @ts-ignore
import Snap from "lenis/snap";

import { setLenisScroll } from "./utilites";
import { isTouch } from ".";

gsap.registerPlugin(ScrollTrigger, Flip);

export const scrollTriggered = (
  disableFullHeight: HTMLElement | null,
  lenisMain: null | Lenis, // Android fix - Updated lenisMain
  hasScrollAnimation: boolean,
  isTouch: boolean,
) => {
  if (disableFullHeight) return;

  // window.addEventListener("load", () => {
  if (hasScrollAnimation) {
    scrollFixed();
    scrollFadeIn();
    scrollFadeUp();
    scrollMarquee();
    scrollBackgroundColor();
    scrollRotate();
    scrollActive();
    parallax();
    scrollMasonry();
  }
  smoothScrollAnimation(lenisMain, hasScrollAnimation, isTouch);
  scrollSnap(lenisMain, hasScrollAnimation);
  // });
};

/*========================================
  Masonry
========================================*/
const scrollMasonry = () => {
  const elements: NodeListOf<HTMLElement> =
    document.querySelectorAll(".scroll-masonry");

  elements.forEach((element) => {
    const start: string | null = element.getAttribute(
      "data-scroll-masonry-start",
    );
    const end: string | null = element.getAttribute("data-scroll-masonry-end");

    const images: NodeListOf<HTMLElement> =
      element.querySelectorAll(".masonry-item");

    const setScaleX = () => {
      images[0].style.height = "";
      return window.innerWidth / images[0].offsetWidth;
    };

    const setScaleY = () => {
      images[0].style.height = "";
      return element.offsetHeight / images[0].offsetHeight;
    };

    const getGap = () => {
      return parseInt(
        window
          .getComputedStyle(element)
          .getPropertyValue("gap")
          .replace("px", ""),
      );
    };

    const setX = () => {
      return -0.5 * (window.innerWidth - getGap() * setScaleX());
    };

    const setY = () => {
      return -0.5 * element.offsetHeight;
    };

    const setScaleImages = () => {
      return setScaleX();
    };

    const getYOffset = () => {
      images[0].style.height = "";
      images[2].style.height = "";
      images[5].style.height = "";

      const image0Height = setHeight();
      const top = images[0].offsetTop;
      const bottom = element.offsetHeight - (image0Height + top);

      return (bottom - top) / 2;
    };

    const setHeight = () => {
      images[0].style.height = "";
      return (images[0].offsetHeight / setScaleX()) * setScaleY();
    };

    const sideYOffset = 300;

    for (let i = 0, imagesLength = images.length; i < imagesLength; i++) {
      const image = images[i];

      //  top: 1, 2, 3  |  bottom: 5  |  left: 1, 4  |  right: 3, 6
      switch (i) {
        case 0:
          const gsap0 = () =>
            gsap.to(image, {
              height: () => setHeight(),
              y: () => getYOffset(),
            });

          const tl0 = gsap.timeline();

          tl0.to(image, {
            scale: () => setScaleX(),
            height: () => setHeight(),
            y: () => getYOffset(),
          });

          // const createScrollAnimation0 = () =>
          ScrollTrigger.create({
            animation: tl0,
            trigger: element,
            start: start ? start : `top top`,
            end: end ? end : `bottom top`,
            scrub: 1,
            invalidateOnRefresh: true,
          });

          gsap0();

          // let scrollAnimation0 = createScrollAnimation0();

          // Fix - 01 May 2024 - commented code below, don't need this any more because page reloads on resize
          // window.addEventListener("resize", () => {
          //   scrollAnimation0.kill();
          //   gsap0();
          //   scrollAnimation0 = createScrollAnimation0();
          //   scrollAnimation0.refresh();
          //   scrollAnimation0.update();
          // });
          break;
        case 1:
          const tl1 = gsap.timeline();

          tl1.to(image, {
            scale: () => setScaleImages(),
            x: () => setX(),
            y: () => sideYOffset,
          });

          // const createScrollAnimation1 = () =>
          ScrollTrigger.create({
            animation: tl1,
            trigger: element,
            start: start ? start : `top top`,
            end: end ? end : `bottom top`,
            scrub: 1,
            invalidateOnRefresh: true,
          });

          // let scrollAnimation1 = createScrollAnimation1();

          // Fix - 01 May 2024 - commented code below, don't need this any more because page reloads on resize
          // window.addEventListener("resize", () => {
          //   scrollAnimation1.kill();
          //   scrollAnimation1 = createScrollAnimation1();
          //   scrollAnimation1.refresh();
          //   scrollAnimation1.update();
          // });
          break;
        case 2:
          const gsap2 = () =>
            gsap.to(image, {
              y: () => getYOffset(),
            });

          const tl2 = gsap.timeline();

          tl2.to(image, {
            scale: () => setScaleImages(),
            y: () =>
              setY() +
              getYOffset() * setScaleImages() +
              getGap() * setScaleImages() * 0.7,
          });

          // const createScrollAnimation2 = () =>
          ScrollTrigger.create({
            animation: tl2,
            trigger: element,
            start: start ? start : `top top`,
            end: end ? end : `bottom top`,
            scrub: 1,
            invalidateOnRefresh: true,
          });

          gsap2();

          // let scrollAnimation2 = createScrollAnimation2();

          // Fix - 01 May 2024 - commented code below, don't need this any more because page reloads on resize
          // window.addEventListener("resize", () => {
          //   scrollAnimation2.kill();
          //   gsap2();
          //   scrollAnimation2 = createScrollAnimation2();
          //   scrollAnimation2.refresh();
          //   scrollAnimation2.update();
          // });
          break;
        case 3:
          const tl3 = gsap.timeline();

          tl3.to(image, {
            scale: () => setScaleImages(),
            x: () => setX() * -1,
            y: () => sideYOffset,
          });

          // const createScrollAnimation3 = () =>
          ScrollTrigger.create({
            animation: tl3,
            trigger: element,
            start: start ? start : `top top`,
            end: end ? end : `bottom top`,
            scrub: 1,
            invalidateOnRefresh: true,
          });

          // let scrollAnimation3 = createScrollAnimation3();

          // Fix - 01 May 2024 - commented code below, don't need this any more because page reloads on resize
          // window.addEventListener("resize", () => {
          //   scrollAnimation3.kill();
          //   scrollAnimation3 = createScrollAnimation3();
          //   scrollAnimation3.refresh();
          //   scrollAnimation3.update();
          // });
          break;
        case 4:
          const tl4 = gsap.timeline();

          tl4.to(image, {
            scale: () => setScaleImages(),
            x: () => setX(),
            y: () => (getGap() * setScaleX()) / 2 + sideYOffset,
          });

          // const createScrollAnimation4 = () =>
          ScrollTrigger.create({
            animation: tl4,
            trigger: element,
            start: start ? start : `top top`,
            end: end ? end : `bottom top`,
            scrub: 1,
            invalidateOnRefresh: true,
          });

          // let scrollAnimation4 = createScrollAnimation4();

          // Fix - 01 May 2024 - commented code below, don't need this any more because page reloads on resize
          // window.addEventListener("resize", () => {
          //   scrollAnimation4.kill();
          //   scrollAnimation4 = createScrollAnimation4();
          //   scrollAnimation4.refresh();
          //   scrollAnimation4.update();
          // });
          break;
        case 5:
          const gsap5 = () =>
            gsap.to(image, {
              y: () => {
                if (window.innerWidth / window.innerHeight > 1) {
                  return getYOffset() + getGap();
                }
                return getYOffset();
              },
            });

          const tl5 = gsap.timeline();

          tl5.to(image, {
            scale: () => setScaleImages(),
            y: () => -1 * setY() + getYOffset() * setScaleImages(),
          });

          // const createScrollAnimation5 = () =>
          ScrollTrigger.create({
            animation: tl5,
            trigger: element,
            start: start ? start : `top top`,
            end: end ? end : `bottom top`,
            scrub: 1,
            invalidateOnRefresh: true,
          });

          gsap5();

          // let scrollAnimation5 = createScrollAnimation5();

          // Fix - 01 May 2024 - commented code below, don't need this any more because page reloads on resize
          // window.addEventListener("resize", () => {
          //   scrollAnimation5.kill();
          //   gsap5();
          //   scrollAnimation5 = createScrollAnimation5();
          //   scrollAnimation5.refresh();
          //   scrollAnimation5.update();
          // });
          break;
        case 6:
          const tl6 = gsap.timeline();

          tl6.to(image, {
            scale: () => setScaleImages(),
            x: () => setX() * -1,
            y: () => (getGap() * setScaleX()) / 2 + sideYOffset,
          });

          // const createScrollAnimation6 = () =>
          ScrollTrigger.create({
            animation: tl6,
            trigger: element,
            start: start ? start : `top top`,
            end: end ? end : `bottom top`,
            scrub: 1,
            invalidateOnRefresh: true,
          });

          // let scrollAnimation6 = createScrollAnimation6();

          // Fix - 01 May 2024 - commented code below, don't need this any more because page reloads on resize
          // window.addEventListener("resize", () => {
          //   scrollAnimation6.kill();
          //   scrollAnimation6 = createScrollAnimation6();
          //   scrollAnimation6.refresh();
          //   scrollAnimation6.update();
          // });
          break;
        default:
          break;
      }
    }
  });
};

/*========================================
  Set active class
========================================*/
const scrollActive = () => {
  const containers: NodeListOf<HTMLElement> =
    document.querySelectorAll(".scroll-active");

  containers.forEach((container) => {
    const elements: NodeListOf<HTMLElement> = container.querySelectorAll(
      ".scroll-active-item",
    );

    elements.forEach((element) => {
      const start: string | null = element.getAttribute(
        "data-scroll-active-start",
      );
      const end: string | null = element.getAttribute("data-scroll-active-end");
      let duration: string | null = element.getAttribute(
        "data-scroll-active-duration",
      );
      const triggerName: string | null = element.getAttribute(
        "data-scroll-active-trigger",
      );
      let trigger: HTMLElement | null = null;

      if (triggerName) {
        trigger = document.querySelector(triggerName);
      }

      const setActive = () => {
        const state = Flip.getState(element);

        element.classList.add("active");

        Flip.from(state, {
          duration: duration ? duration : 0,
          scale: true,
          ease: "power1.inOut",
        });
      };

      const setInactive = () => {
        const state = Flip.getState(element);

        element.classList.remove("active");

        Flip.from(state, {
          duration: duration ? duration : 0,
          scale: true,
          ease: "power1.inOut",
        });
      };

      // toggleActions: onEnter, onLeave, onEnterBack, and onLeaveBack / "play reverse play reverse"
      // const createScrollAnimation = () =>
      ScrollTrigger.create({
        trigger: trigger ? trigger : element,
        start: start ? start : `top top`,
        end: end ? end : `bottom top`,
        onEnter: () => {
          setActive();
        },
        onLeave: () => {
          setInactive();
        },
        onEnterBack: () => {
          setActive();
        },
        onLeaveBack: () => {
          setInactive();
        },
      });

      // let scrollAnimation = createScrollAnimation();

      // Fix - 01 May 2024 - commented code below, don't need this any more because page reloads on resize
      // window.addEventListener("resize", () => {
      //   scrollAnimation.kill();
      //   scrollAnimation = createScrollAnimation();
      //   scrollAnimation.refresh();
      //   scrollAnimation.update();
      // });
    });
  });
};

/*========================================
  Scroll rotate
========================================*/
const scrollRotate = () => {
  const containers: NodeListOf<HTMLElement> =
    document.querySelectorAll(".scroll-rotate");

  containers.forEach((container) => {
    const elements: NodeListOf<HTMLElement> = container.querySelectorAll(
      ".scroll-rotate-item",
    );

    elements.forEach((element) => {
      const start: string | null = element.getAttribute(
        "data-scroll-rotate-start",
      );
      const end: string | null = element.getAttribute("data-scroll-rotate-end");

      const mm = gsap.matchMedia();

      mm.add("(max-width: 639.98px)", () => {
        const rotateSm: string | null = element.getAttribute(
          "data-scroll-rotate-rotate-sm",
        );
        const xSm: string | null = element.getAttribute(
          "data-scroll-rotate-x-sm",
        );
        const ySm: string | null = element.getAttribute(
          "data-scroll-rotate-y-sm",
        );

        const tl = gsap.timeline();
        tl.from(element, {
          rotate: () => (rotateSm ? rotateSm : "11.25deg"),
          x: () => (xSm ? xSm : "0"),
          y: () => (ySm ? ySm : "0"),
          ease: "none",
        });

        // const createScrollAnimation = () =>
        ScrollTrigger.create({
          animation: tl,
          trigger: container,
          scrub: 1,
          start: start ? start : `top bottom`,
          end: end ? end : `bottom bottom`,
        });

        // let scrollAnimation = createScrollAnimation();

        // Fix - 01 May 2024 - commented code below, don't need this any more because page reloads on resize
        // window.addEventListener("resize", () => {
        //   scrollAnimation.kill();
        //   scrollAnimation = createScrollAnimation();
        //   scrollAnimation.refresh();
        //   scrollAnimation.update();
        // });
      });

      mm.add("(min-width: 640px) and (max-width: 1279.98px)", () => {
        const rotateMd: string | null = element.getAttribute(
          "data-scroll-rotate-rotate-md",
        );
        const xMd: string | null = element.getAttribute(
          "data-scroll-rotate-x-md",
        );
        const yMd: string | null = element.getAttribute(
          "data-scroll-rotate-y-md",
        );

        const tl = gsap.timeline();
        tl.from(element, {
          rotate: () => (rotateMd ? rotateMd : "11.25deg"),
          x: () => (xMd ? xMd : "0"),
          y: () => (yMd ? yMd : "0"),
          ease: "none",
        });

        // const createScrollAnimation = () =>
        ScrollTrigger.create({
          animation: tl,
          trigger: container,
          scrub: 1,
          start: start ? start : `top bottom`,
          end: end ? end : `bottom bottom`,
        });

        // let scrollAnimation = createScrollAnimation();

        // Fix - 01 May 2024 - commented code below, don't need this any more because page reloads on resize
        // window.addEventListener("resize", () => {
        //   scrollAnimation.kill();
        //   scrollAnimation = createScrollAnimation();
        //   scrollAnimation.refresh();
        //   scrollAnimation.update();
        // });
      });

      mm.add("(min-width: 1280px)", () => {
        const rotate: string | null = element.getAttribute(
          "data-scroll-rotate-rotate",
        );
        const x: string | null = element.getAttribute("data-scroll-rotate-x");
        const y: string | null = element.getAttribute("data-scroll-rotate-y");

        const tl = gsap.timeline();
        tl.from(element, {
          rotate: () => (rotate ? rotate : "11.25deg"),
          x: () => (x ? x : "0"),
          y: () => (y ? y : "0"),
          ease: "none",
        });

        // const createScrollAnimation = () =>
        ScrollTrigger.create({
          animation: tl,
          trigger: container,
          scrub: 1,
          start: start ? start : `top bottom`,
          end: end ? end : `bottom bottom`,
        });

        // let scrollAnimation = createScrollAnimation();

        // Fix - 01 May 2024 - commented code below, don't need this any more because page reloads on resize
        // window.addEventListener("resize", () => {
        //   scrollAnimation.kill();
        //   scrollAnimation = createScrollAnimation();
        //   scrollAnimation.refresh();
        //   scrollAnimation.update();
        // });
      });
    });
  });
};

/*========================================
  Scroll color
========================================*/
const scrollBackgroundColor = () => {
  const elements: NodeListOf<HTMLElement> = document.querySelectorAll(
    ".scroll-background-color",
  );

  elements.forEach((element) => {
    const start: string | null = element.getAttribute(
      "data-scroll-background-color-start",
    );
    const end: string | null = element.getAttribute(
      "data-scroll-background-color-end",
    );
    const backgroundColor: string | null = element.getAttribute(
      "data-scroll-background-color",
    );

    const tl = gsap.timeline();
    tl.from(element, {
      backgroundColor: () => (backgroundColor ? backgroundColor : "#CD1017"),
      ease: "none",
    });

    // const createScrollAnimation = () =>
    ScrollTrigger.create({
      animation: tl,
      trigger: element,
      scrub: 1,
      start: start ? start : `top top`,
      end: end ? end : `bottom bottom`,
    });

    // let scrollAnimation = createScrollAnimation();

    // Fix - 01 May 2024 - commented code below, don't need this any more because page reloads on resize
    // window.addEventListener("resize", () => {
    //   scrollAnimation.kill();
    //   scrollAnimation = createScrollAnimation();
    //   scrollAnimation.refresh();
    //   scrollAnimation.update();
    // });
  });
};

/*========================================
  Scroll marquee
========================================*/
const scrollMarquee = () => {
  const containers: NodeListOf<HTMLElement> =
    document.querySelectorAll(".scroll-marquee");

  containers.forEach((container) => {
    const elements: NodeListOf<HTMLElement> = container.querySelectorAll(
      ".scroll-marquee-item",
    );

    elements.forEach((element) => {
      const start: string | null = element.getAttribute(
        "data-scroll-marquee-start",
      );
      const end: string | null = element.getAttribute(
        "data-scroll-marquee-end",
      );
      const xPercent: string | null = element.getAttribute(
        "data-scroll-marquee-xPercent",
      );
      const useWidth: string | null = element.getAttribute(
        "data-scroll-marquee-use-width",
      );
      const toggleActions: string | null = element.getAttribute(
        "data-scroll-marquee-toggle-actions",
      );

      const tl = gsap.timeline();

      if (useWidth === "true") {
        tl.fromTo(
          element,
          {
            x: () => (element.offsetWidth - window.innerWidth) / 2,
            ease: "none",
          },
          {
            x: () => -0.5 * (element.offsetWidth - window.innerWidth),
            ease: "none",
          },
        );
      } else {
        tl.fromTo(
          element,
          {
            xPercent: () => (xPercent ? xPercent : "100"),
            opacity: () => 0,
            ease: "none",
          },
          {
            xPercent: () => 0,
            opacity: () => 1,
            ease: "none",
          },
        );
      }

      // const createScrollAnimation = () =>
      ScrollTrigger.create({
        animation: tl,
        trigger: container,
        scrub: 1,
        start: start ? start : `top center`,
        end: end ? end : `bottom bottom`,
        // toggleActions: onEnter, onLeave, onEnterBack, and onLeaveBack
        toggleActions: toggleActions ? toggleActions : "play none none reverse",
      });

      // let scrollAnimation = createScrollAnimation();

      // Fix - 01 May 2024 - commented code below, don't need this any more because page reloads on resize
      // window.addEventListener("resize", () => {
      //   scrollAnimation.kill();
      //   scrollAnimation = createScrollAnimation();
      //   scrollAnimation.refresh();
      //   scrollAnimation.update();
      // });
    });
  });
};

/*========================================
  Fixed position when scrolling
========================================*/
const scrollFixed = () => {
  let index: number = 29;
  const containers: NodeListOf<HTMLElement> =
    document.querySelectorAll(".scroll-fixed");

  containers.forEach((container) => {
    const elements: NodeListOf<HTMLElement> =
      container.querySelectorAll(".scroll-fixed-item");

    elements.forEach((element) => {
      const start: string | null = element.getAttribute(
        "data-scroll-fixed-start",
      );
      const end: string | null = element.getAttribute("data-scroll-fixed-end");
      const pinSpacing: string | null = element.getAttribute(
        "data-scroll-pin-spacing",
      );
      const fixedTop: string | null = element.getAttribute(
        "data-scroll-fixed-top",
      );
      const triggerName: string | null = element.getAttribute(
        "data-scroll-fixed-trigger",
      );
      const endTriggerName: string | null = element.getAttribute(
        "data-scroll-fixed-end-trigger",
      );
      let trigger: HTMLElement | null = null;
      let endTrigger: HTMLElement | null = null;

      if (triggerName) {
        trigger = document.querySelector(triggerName);
      }

      if (endTriggerName) {
        endTrigger = document.querySelector(endTriggerName);

        if (trigger && !endTrigger) endTrigger = trigger;
      }

      if (endTriggerName) {
        endTrigger = document.querySelector(endTriggerName);
      }

      // Fix - 01 May 2024 - Fix: content not covering entire container
      // Added isMasonry
      const isMasonry = element.classList.contains("page-banner-masonry");

      if (fixedTop) {
        // const createScrollAnimation = () =>
        ScrollTrigger.create({
          trigger: trigger ? trigger : container,
          endTrigger: endTrigger ? endTrigger : container,
          pin: element,
          pinType: "fixed",
          pinSpacing: pinSpacing ? pinSpacing : false,
          pinnedContainer: container,
          start: () => {
            const elementHeight = element.offsetHeight;

            if (start) return start;

            // Fix - 01 May 2024 - Fix: content not covering entire container
            // Updated return values
            return `top top+=${Math.max(window.innerHeight, elementHeight)}px`;
          },
          end: () => {
            const elementHeight = element.offsetHeight;

            // Fix - 01 May 2024 - Fix: content not covering entire container
            // Updated return values
            if (isMasonry && isTouch) return "bottom top-=240%";

            if (end) return end;

            return `bottom top+=${Math.max(
              window.innerHeight,
              elementHeight,
            )}px`;
          },
          onEnter: () => {
            element.style.marginTop = `-${element.offsetHeight}px`;
          },
          onEnterBack: () => {
            element.style.marginTop = `-${element.offsetHeight}px`;
          },
          onLeave: () => {
            element.style.marginTop = `-${element.offsetHeight}px`;
          },
          onLeaveBack: () => {
            element.style.marginTop = `-${element.offsetHeight}px`;
          },
        });
        container.style.zIndex = `${index}`;

        const setContainerMarginBottom = () =>
          (container.style.marginBottom = `-${element.offsetHeight}px`);

        if (pinSpacing === "true") {
          setContainerMarginBottom();
        }

        // let scrollAnimation = createScrollAnimation();

        // Fix - 01 May 2024 - commented some code inside resize listener, don't need this any more because page reloads on resize
        window.addEventListener("resize", () => {
          // scrollAnimation.kill();

          if (pinSpacing === "true") {
            setContainerMarginBottom();
          }
          // scrollAnimation = createScrollAnimation();
          // scrollAnimation.refresh();
          // scrollAnimation.update();
        });
      } else {
        // const createScrollAnimation = () =>
        ScrollTrigger.create({
          trigger: trigger ? trigger : container,
          endTrigger: endTrigger ? endTrigger : container,
          pin: element,
          pinSpacing: pinSpacing ? pinSpacing : false,
          pinType: "fixed",
          pinnedContainer: container,
          start: start ? start : `top top`,
          end: end ? end : `bottom center`,
        });

        // let scrollAnimation = createScrollAnimation();

        // Fix - 01 May 2024 - commented code below, don't need this any more because page reloads on resize
        // window.addEventListener("resize", () => {
        //   scrollAnimation.kill();
        //   scrollAnimation = createScrollAnimation();
        //   scrollAnimation.refresh();
        //   scrollAnimation.update();
        // });
      }
    });
    index -= 1;
  });
};

/*========================================
  Fade up
========================================*/
const scrollFadeUp = () => {
  const elements: NodeListOf<HTMLElement> =
    document.querySelectorAll(".scroll-fade-up");

  elements.forEach((element) => {
    const start: string | null = element.getAttribute(
      "data-scroll-fade-up-start",
    );
    const end: string | null = element.getAttribute("data-scroll-fade-up-end");
    const duration: string | null = element.getAttribute(
      "data-scroll-fade-up-duration",
    );
    const delay: string | null = element.getAttribute(
      "data-scroll-fade-up-delay",
    );
    const toggleActions: string | null = element.getAttribute(
      "data-scroll-fade-up-toggle-actions",
    );
    const triggerName: string | null = element.getAttribute(
      "data-scroll-fade-up-trigger",
    );
    const endTriggerName: string | null = element.getAttribute(
      "data-scroll-fade-up-end-trigger",
    );
    let trigger: HTMLElement | null = null;
    let endTrigger: HTMLElement | null = null;

    if (triggerName) {
      trigger = document.querySelector(triggerName);
    }

    if (endTriggerName) {
      endTrigger = document.querySelector(endTriggerName);

      if (trigger && !endTrigger) endTrigger = trigger;
    }

    const tl = gsap.timeline();
    tl.from(element, {
      y: () => 100,
      opacity: () => 0,
      duration: duration ? duration : 0.5,
      delay: delay ? delay : 0,
    });

    // const createScrollAnimation = () =>
    ScrollTrigger.create({
      animation: tl,
      trigger: trigger ? trigger : element,
      endTrigger: endTrigger ? endTrigger : element,
      // toggleActions: onEnter, onLeave, onEnterBack, and onLeaveBack
      toggleActions: toggleActions ? toggleActions : "play none none reverse",
      start: start ? start : `top bottom`,
      end: end ? end : `bottom bottom`,
    });

    // let scrollAnimation = createScrollAnimation();

    // Fix - 01 May 2024 - commented code below, don't need this any more because page reloads on resize
    // window.addEventListener("resize", () => {
    //   scrollAnimation.kill();
    //   scrollAnimation = createScrollAnimation();
    //   scrollAnimation.refresh();
    //   scrollAnimation.update();
    // });
  });
};

/*========================================
  Fade in
========================================*/
const scrollFadeIn = () => {
  const elements: NodeListOf<HTMLElement> =
    document.querySelectorAll(".scroll-fade-in");

  elements.forEach((element) => {
    const start: string | null = element.getAttribute(
      "data-scroll-fade-in-start",
    );
    const end: string | null = element.getAttribute("data-scroll-fade-in-end");
    const duration: string | null = element.getAttribute(
      "data-scroll-fade-in-duration",
    );
    const toggleActions: string | null = element.getAttribute(
      "data-scroll-fade-in-toggle-actions",
    );
    const reverse: string | null = element.getAttribute(
      "data-scroll-fade-in-reverse",
    );
    const customOpacity: string | number | null = element.getAttribute(
      "data-scroll-fade-in-opacity",
    );
    const triggerName: string | null = element.getAttribute(
      "data-scroll-fade-in-trigger",
    );
    const endTriggerName: string | null = element.getAttribute(
      "data-scroll-fade-in-end-trigger",
    );

    let trigger: HTMLElement | null = null;
    let endTrigger: HTMLElement | null = null;
    let opacity = 0;

    if (triggerName) {
      trigger = document.getElementById(`${triggerName}`);
    }

    if (endTriggerName) {
      endTrigger = document.querySelector(endTriggerName);

      if (trigger && !endTrigger) endTrigger = trigger;
    }

    if (customOpacity) opacity = parseFloat(customOpacity);

    const tl = gsap.timeline();

    if (reverse === "true") {
      element.style.zIndex = "1";
      tl.to(element, {
        opacity: () => (opacity ? opacity : 0),
        zIndex: () => 700,
        duration: duration ? duration : 0.5,
      });
    } else {
      tl.from(element, {
        opacity: () => (opacity ? opacity : 0),
        duration: duration ? duration : 0.5,
      });
    }

    // const createScrollAnimation = () =>
    ScrollTrigger.create({
      animation: tl,
      trigger: trigger ? trigger : element,
      endTrigger: endTrigger ? endTrigger : element,
      // toggleActions: onEnter, onLeave, onEnterBack, and onLeaveBack
      toggleActions: toggleActions ? toggleActions : "play none none reverse",
      start: start ? start : `top bottom`,
      end: end ? end : `bottom bottom`,
    });

    // let scrollAnimation = createScrollAnimation();

    // Fix - 01 May 2024 - commented code below, don't need this any more because page reloads on resize
    // window.addEventListener("resize", () => {
    //   scrollAnimation.kill();
    //   scrollAnimation = createScrollAnimation();
    //   scrollAnimation.refresh();
    //   scrollAnimation.update();
    // });
  });
};

/*========================================
  Parallax
========================================*/
export const parallax = () => {
  const elements: NodeListOf<HTMLElement> =
    document.querySelectorAll(".parallax-item");

  elements.forEach((element) => {
    let y: number = -100;
    const customY: string | null = element.getAttribute("data-parallax-y");

    if (customY) y = parseInt(customY);

    const mm = gsap.matchMedia();

    if (!element.classList.contains("we-go-section-card")) {
      mm.add("(max-width: 767.98px)", () => {
        const tl = gsap.timeline();
        tl.to(element, {
          y: () => y / 3,
          ease: "none",
        });

        // const createScrollAnimation = () =>
        ScrollTrigger.create({
          animation: tl,
          trigger: element,
          scrub: 1,
        });

        // let scrollAnimation = createScrollAnimation();

        // Fix - 01 May 2024 - commented code below, don't need this any more because page reloads on resize
        // window.addEventListener("resize", () => {
        //   scrollAnimation.kill();
        //   scrollAnimation = createScrollAnimation();
        //   scrollAnimation.refresh();
        //   scrollAnimation.update();
        // });
      });
    }

    mm.add("(min-width: 768px)", () => {
      const tl = gsap.timeline();
      tl.to(element, {
        y: () => y,
        ease: "none",
      });

      // const createScrollAnimation = () =>
      ScrollTrigger.create({
        animation: tl,
        trigger: element,
        scrub: 1,
      });

      // let scrollAnimation = createScrollAnimation();

      // Fix - 01 May 2024 - commented code below, don't need this any more because page reloads on resize
      // window.addEventListener("resize", () => {
      //   scrollAnimation.kill();
      //   scrollAnimation = createScrollAnimation();
      //   scrollAnimation.refresh();
      //   scrollAnimation.update();
      // });
    });
  });
};

/*==============================================
  Smooth scroll animation
==============================================*/
const smoothScrollAnimation = (
  lenisMain: null | Lenis,
  hasScrollAnimation: boolean,
  isTouch: boolean,
) => {
  // Fix - 10 May 2024: Page automatically reloads when toggled to full screen
  // Update if (hasScrollAnimation)
  if (hasScrollAnimation) {
    const scrollTopElement = document.querySelector(".refresh-scroll-top");
    const masonry = document.querySelector(".scroll-masonry");
    const weGo = document.querySelector(".we-go");

    const resizeScroll = () => {
      if (masonry || weGo || scrollTopElement) {
        window.scrollTo(0, 0);
        window.history.scrollRestoration = "manual";
      }

      setTimeout(() => {
        ScrollTrigger.refresh();
        ScrollTrigger.update();
      }, 100);
    };

    resizeScroll();

    if (isTouch) {
      if (!navigator.userAgent.includes("Firefox") && weGo)
        ScrollTrigger.normalizeScroll(true);
    }

    let windowWidthPrev = window.innerWidth;

    window.addEventListener("resize", () => {
      if (window.innerWidth !== windowWidthPrev && !isTouch) {
        resizeScroll();
      }

      // if (window.innerWidth !== windowWidthPrev) {
      //   resizeScroll();
      // }

      windowWidthPrev = window.innerWidth;
    });

    screen.orientation.addEventListener("change", () => {
      if (isTouch) {
        setTimeout(() => {
          resizeScroll();
        }, 500);
      }
    });
  }

  // Enable scroll for tabs
  const tabs: NodeListOf<HTMLElement> =
    document.querySelectorAll(".scrollable-tabs");

  for (let i = 0, tabsLength = tabs.length; i < tabsLength; i++) {
    setLenisScroll(tabs[i], "horizontal", "horizontal");

    const tabItems: NodeListOf<HTMLElement> =
      tabs[i].querySelectorAll(".tabs > li");
    const tabItemsLength = tabItems.length;

    tabItems.forEach((tabItem) => {
      const button = tabItem.querySelector("a");

      // Click to  select tab
      tabItem.addEventListener("click", () => {
        // Scroll to selected tab
        tabs[i].scrollTo(tabItem.offsetLeft - 40, 0);

        // Set other tab to inactive
        if (tabItemsLength > 1) {
          tabItems.forEach((tabItemOther) => {
            const buttonOther = tabItemOther.querySelector("a");

            buttonOther && buttonOther.classList.remove("active");
          });
        }

        // Set selected tab to active
        button && button.classList.add("active");
      });
    });
  }

  const tables: NodeListOf<HTMLElement> =
    document.querySelectorAll(".table-responsive");

  for (let i = 0, tablesLength = tables.length; i < tablesLength; i++) {
    const table = tables[i];

    // Enable scroll for tables
    setLenisScroll(table, "horizontal", "horizontal");

    // Set shadow for table with horizontal scroll
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const target = entry.target as HTMLElement;

        const elementWidth = target.offsetWidth;
        const elementScroll = target.scrollWidth;

        if (elementWidth === 0 || elementScroll === 0) return;

        if (elementWidth >= elementScroll) {
          target.style.boxShadow = "none";
        } else {
          target.style.boxShadow =
            "inset -0.5rem 0.5rem 0.5rem 0 rgba(0, 0, 0, 0.08)";
        }
      }
    });

    resizeObserver.observe(table);
  }
};

const scrollSnap = (lenisMain: null | Lenis, hasScrollAnimation: boolean) => {
  const sections: NodeListOf<HTMLElement> =
    document.querySelectorAll("[data-scroll-snap]");

  if (sections.length > 0) {
  const navbar: HTMLDivElement | null = document.querySelector(".navbar");
  let snap: { add: (arg0: number) => void } | null = null;

  const setScrollSnap = () => {
    if (lenisMain) {
      snap = new Snap(lenisMain, {
        type: "proximity",
        duration: 1,
        onSnapComplete: () => {
          setTimeout(() => {
            navbar && navbar.classList.add("hide-up");
          }, 50);
        },
      });

      sections.forEach((section) => {
        snap &&
          snap.add(section.getBoundingClientRect().top + window.scrollY + 8);
      });
    }
  };

  const resetScrollSnap = () => {
    if (navigator.maxTouchPoints > 0 && snap) {
      snap = null;
    } else {
      if (hasScrollAnimation && !snap) {
        setScrollSnap();
      }
    }
  };

  setScrollSnap();
  window.addEventListener("resize", resetScrollSnap);
  }
};
