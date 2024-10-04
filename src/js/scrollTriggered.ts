// GSAP (plugin): https://gsap.com/docs/v3/
import { gsap, ScrollTrigger, Flip, ScrollToPlugin } from "./registerGsap";

// Lenis (plugin): https://github.com/darkroomengineering/lenis
import Lenis from "lenis";

import { disableScroll, enableScroll, setLenisScroll } from "./utilites";
import { isTouch, lenisMain } from ".";

export const scrollTriggered = (
  disableFullHeight: HTMLElement | null,
  lenisMain: null | Lenis,
) => {
  if (disableFullHeight) return;

  scrollFixed();
  scrollFadeIn();
  scrollFadeUp();
  scrollMarquee();
  scrollBackgroundColor();
  scrollRotate();
  scrollActive();
  parallax();
  scrollMasonry();
  smoothScrollAnimation();
  scrollSnap(lenisMain);
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
      const startSm: string | null = element.getAttribute(
        "data-scroll-fixed-start-sm",
      );
      const endSm: string | null = element.getAttribute(
        "data-scroll-fixed-end-sm",
      );
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

            return `top top+=${Math.max(window.innerHeight, elementHeight)}px`;
          },
          end: () => {
            const elementHeight = element.offsetHeight;

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

        window.addEventListener("resize", () => {
          if (pinSpacing === "true") {
            setContainerMarginBottom();
          }
        });
      } else {
        const media = gsap.matchMedia();

        media.add("(max-width: 1023.98px)", () => {
          let startMobile = startSm ? startSm : start;
          let endMobile = endSm ? endSm : end;

          ScrollTrigger.create({
            trigger: trigger ? trigger : container,
            endTrigger: endTrigger ? endTrigger : container,
            pin: element,
            pinSpacing: pinSpacing ? pinSpacing : false,
            pinType: "fixed",
            pinnedContainer: container,
            start: startMobile ? startMobile : `top top`,
            end: endMobile ? endMobile : `bottom center`,
          });
        });

        media.add("(min-width: 1024px)", () => {
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
        });
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
    const startSm: string | null = element.getAttribute(
      "data-scroll-fade-in-start-sm",
    );
    const endSm: string | null = element.getAttribute(
      "data-scroll-fade-in-end-sm",
    );
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

    const media = gsap.matchMedia();

    media.add("(max-width: 1023.98px)", () => {
      let startMobile = startSm ? startSm : start;
      let endMobile = endSm ? endSm : end;

      ScrollTrigger.create({
        animation: tl,
        trigger: trigger ? trigger : element,
        endTrigger: endTrigger ? endTrigger : element,
        // toggleActions: onEnter, onLeave, onEnterBack, and onLeaveBack
        toggleActions: toggleActions ? toggleActions : "play none none reverse",
        start: startMobile ? startMobile : `top bottom`,
        end: endMobile ? endMobile : `bottom bottom`,
      });
    });

    media.add("(min-width: 1024px)", () => {
      ScrollTrigger.create({
        animation: tl,
        trigger: trigger ? trigger : element,
        endTrigger: endTrigger ? endTrigger : element,
        // toggleActions: onEnter, onLeave, onEnterBack, and onLeaveBack
        toggleActions: toggleActions ? toggleActions : "play none none reverse",
        start: start ? start : `top bottom`,
        end: end ? end : `bottom bottom`,
      });
    });
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
    const start: string | null = element.getAttribute("data-parallax-start");
    const end: string | null = element.getAttribute("data-parallax-end");
    const triggerName: string | null = element.getAttribute(
      "data-parallax-trigger",
    );
    let trigger: HTMLElement | null = null;

    if (customY) y = parseInt(customY);

    if (triggerName) {
      trigger = document.querySelector(triggerName);
    }

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
          trigger: trigger ? trigger : element,
          start: start ? start : `top bottom`,
          end: end ? end : `bottom top`,
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
        trigger: trigger ? trigger : element,
        start: start ? start : `top bottom`,
        end: end ? end : `bottom top`,
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
const smoothScrollAnimation = () => {
  if (ScrollTrigger.getAll().length > 0) {
    const scrollTopElement = document.querySelector(".refresh-scroll-top");
    const masonry = document.querySelector(".scroll-masonry");
    const weGo = document.querySelector(".we-go");
    let windowWidthPrev = window.innerWidth;

    if (isTouch) {
      if (!navigator.userAgent.includes("Firefox") && weGo)
        ScrollTrigger.normalizeScroll(true);
    }

    const resizeScroll = () => {
      if (masonry || weGo || scrollTopElement) {
        gsap.to(window, {
          duration: 0.1,
          scrollTo: 0,
        });
        window.history.scrollRestoration = "manual";
      }

      ScrollTrigger.refresh();

      setTimeout(() => {
        ScrollTrigger.refresh();
        // ScrollTrigger.update();
      }, 1000);
    };

    resizeScroll();

    window.addEventListener("load", resizeScroll);

    window.addEventListener("resize", () => {
      if (window.innerWidth !== windowWidthPrev && !isTouch) {
        resizeScroll();
      }

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
};

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
}

/*=================================================================
  Scroll snap
=================================================================*/
const scrollSnap = (lenisMain: null | Lenis) => {
  const sections: NodeListOf<HTMLElement> =
    document.querySelectorAll("[data-scroll-snap]");

  if (sections.length > 0) {
    const navbar: HTMLDivElement | null = document.querySelector(".navbar");

    sections.forEach((section) => {
      const snapToContainer = () => {
        navbar && navbar.classList.add("hide-up");

        if (lenisMain) {
          // If Lenis is active
          lenisMain.scrollTo(
            window.scrollY + section.getBoundingClientRect().top,
            {
              duration: 0.5,
              lock: true,
            },
          );

          setTimeout(() => {
            navbar && navbar.classList.add("hide-up");
          }, 600);
        } else {
          // If Lenis is inactive
          gsap.to(window, {
            duration: 0.5,
            scrollTo: section.getBoundingClientRect().top + window.scrollY,
          });

          setTimeout(() => {
            navbar && navbar.classList.add("hide-up");
          }, 600);
        }
      };

      ScrollTrigger.create({
        trigger: section,
        start: "top 20%",
        end: "bottom 80%",
        onEnter: () => snapToContainer(),
        onEnterBack: () => snapToContainer(),
      });
    });
  }
};

/*=================================================================
  Home - Hero banner with circle animation
=================================================================*/
export const pageBannerCircleAnimation = () => {
  const container = document.getElementById("heroBanner");
  const masks = document.querySelectorAll(".page-banner-mask");

  if (!container) return;

  masks.forEach((mask) => {
    gsap.delayedCall(0.5, () => {});
    const animation = gsap.timeline();

    animation.to(mask, {
      "--page-banner-mask-percent": () => "0%",
    });

    ScrollTrigger.create({
      animation: animation,
      trigger: container,
      start: `top top`,
      end: `bottom -65%`,
      scrub: 1,
    });
  });
};

/*=================================================================
  Home - Diagram with four circles
=================================================================*/
export const sustainabilityHomeDiagram = () => {
  const elements: NodeListOf<HTMLElement> =
    document.querySelectorAll(".four-circles");

  const startPoint = `top -140%`;
  const midPoint = `top -200%`;
  const midPoint3 = `top -215%`;
  const endPoint = `top -220%`;
  const endPoint2 = `top -225%`;

  const startPointSm = `top -100%`;
  const midPointSm = `top -140%`;
  const midPointSm3 = `top -155%`;
  const endPointSm = `top -180%`;

  elements.forEach((element) => {
    const chart: HTMLElement | null = element.querySelector(
      ".four-circles__chart",
    );
    const content: HTMLElement | null = element.querySelector(
      ".four-circles__intro__content",
    );

    if (content) {
      const contentAnimationMedia = gsap.matchMedia();

      // Content - Mobile
      contentAnimationMedia.add("(max-width: 1023.98px)", () => {
        // Content fade in
        const contentAnimationSm = gsap.timeline();

        contentAnimationSm.from(content, {
          y: () => "50%",
          duration: 1,
          ease: "power1.inOut",
        });

        ScrollTrigger.create({
          animation: contentAnimationSm,
          trigger: element,
          start: `top top`,
          end: midPointSm,
          toggleActions: "play none none reverse",
        });

        // Content fade out
        const contentAnimationFadeSm = gsap.timeline();

        contentAnimationFadeSm.to(content, {
          opacity: () => 0,
          duration: 0.5,
          ease: "power1.inOut",
        });

        ScrollTrigger.create({
          animation: contentAnimationFadeSm,
          trigger: element,
          start: endPointSm,
          end: endPointSm,
          toggleActions: "play none none reverse",
        });
      });

      // Content - Desktop
      contentAnimationMedia.add("(min-width: 1024px)", () => {
        // Content fade in
        const contentAnimation = gsap.timeline();

        contentAnimation.from(content, {
          x: () => "35%",
          ease: "none",
        });

        ScrollTrigger.create({
          animation: contentAnimation,
          trigger: element,
          start: `top top`,
          end: startPoint,
          scrub: 1,
        });

        // Content fade out
        const contentAnimationFade = gsap.timeline();

        contentAnimationFade.to(content, {
          y: () => -100,
          opacity: () => 0,
          duration: 0.7,
          delay: 0.3,
          ease: "power1.inOut",
        });

        ScrollTrigger.create({
          animation: contentAnimationFade,
          trigger: element,
          start: endPoint2,
          end: endPoint2,
          toggleActions: "play none none reverse",
        });
      });
    }

    if (chart) {
      const circles = chart.querySelectorAll(".four-circles__chart__item");
      const intersection = chart.querySelector(
        ".four-circles__chart__intersection",
      );
      const greenBlob: HTMLElement | null = chart.querySelector(
        ".sustainability-green-blob",
      );
      const greenBlobFixed: HTMLElement | null = element.querySelector(
        ".sustainability-green-blob--fixed",
      );
      const livingLabImage = document.getElementById("livingLabImage");
      const homeIntro = document.getElementById("homeIntro");

      // Chart fade in
      const chartAnimationPositionMedia = gsap.matchMedia();

      // Chart fade in - Mobile
      chartAnimationPositionMedia.add("(max-width: 1023.98px)", () => {
        const chartAnimationPositionSm = gsap.timeline();

        chartAnimationPositionSm.from(chart, {
          opacity: () => 0,
          rotate: () => -180,
          ease: "none",
        });

        ScrollTrigger.create({
          animation: chartAnimationPositionSm,
          trigger: element,
          start: `top top`,
          end: startPointSm,
          scrub: 1,
          snap: 1,
        });
      });

      // Chart fade in - Desktop
      chartAnimationPositionMedia.add("(min-width: 1024px)", () => {
        const chartAnimationFadeIn = gsap.timeline();

        chartAnimationFadeIn.from(chart, {
          opacity: () => 0,
          duration: 0.7,
          ease: "power1.inOut",
        });

        ScrollTrigger.create({
          animation: chartAnimationFadeIn,
          trigger: element,
          start: `top 10%`,
          end: startPoint,
          toggleActions: "play none none reverse",
        });

        const chartAnimationPosition = gsap.timeline();

        chartAnimationPosition.from(chart, {
          rotate: () => -180,
          x: () => {
            return (
              (Math.min(1296, window.innerWidth) - chart.offsetWidth - 64) / -2
            );
          },
          ease: "none",
        });

        ScrollTrigger.create({
          animation: chartAnimationPosition,
          trigger: element,
          start: `top top`,
          end: startPoint,
          scrub: 1,
          snap: 1,
        });
      });

      // Individual circles
      circles.forEach((circle) => {
        const circleContent = circle.querySelector(
          ".four-circles__chart__item__content",
        );

        if (circleContent) {
          // Circle
          const circleAnimationMedia = gsap.matchMedia();

          // Circle - Mobile
          circleAnimationMedia.add("(max-width: 1023.98px)", () => {
            const circleAnimationSm = gsap.timeline();

            circleAnimationSm.from(circle, {
              left: () => "26.457%",
              top: () => "21.225%",
              bottom: () => "auto",
              right: () => "auto",
              ease: "none",
            });

            ScrollTrigger.create({
              animation: circleAnimationSm,
              trigger: element,
              start: `top -40%`,
              end: startPointSm,
              scrub: 1,
            });

            const circleContentAnimationSm = gsap.timeline();

            circleContentAnimationSm.from(circleContent, {
              opacity: () => 0,
              // delay: 0.1,
              duration: 0.4,
              ease: "power1.inOut",
            });

            ScrollTrigger.create({
              animation: circleContentAnimationSm,
              trigger: element,
              start: startPointSm,
              end: endPointSm,
              toggleActions: "play none none reverse",
            });

            // Circle fade out
            const circleAnimationFade = gsap.timeline();

            circleAnimationFade.to(circle, {
              y: () => -100,
              opacity: () => 0,
              delay: 0.3,
              duration: 1,
              ease: "power1.inOut",
            });

            ScrollTrigger.create({
              animation: circleAnimationFade,
              trigger: element,
              start: endPointSm,
              end: endPointSm,
              toggleActions: "play none none reverse",
            });

            // Circle content
            const circleContentAnimationFade = gsap.timeline();

            circleContentAnimationFade.to(circleContent, {
              marginTop: () => -40,
              marginBottom: () => -8,
              duration: 1,
              ease: "power1.inOut",
            });

            ScrollTrigger.create({
              animation: circleContentAnimationFade,
              trigger: element,
              start: endPointSm,
              end: endPointSm,
              toggleActions: "play none none reverse",
            });
          });

          // Circle - Desktop
          circleAnimationMedia.add("(min-width: 1024px)", () => {
            const circleAnimation = gsap.timeline();

            circleAnimation.from(circle, {
              left: () => "26.457%",
              top: () => "21.225%",
              bottom: () => "auto",
              right: () => "auto",
              ease: "none",
            });

            ScrollTrigger.create({
              animation: circleAnimation,
              trigger: element,
              start: `top -40%`,
              end: startPoint,
              scrub: 1,
            });

            const circleContentAnimation = gsap.timeline();

            circleContentAnimation.from(circleContent, {
              opacity: () => 0,
              // delay: 0.1,
              duration: 0.4,
              ease: "power1.inOut",
            });

            ScrollTrigger.create({
              animation: circleContentAnimation,
              trigger: element,
              start: startPoint,
              end: midPoint,
              toggleActions: "play reverse play reverse",
            });

            // Circle fade out
            const circleAnimationFade = gsap.timeline();

            circleAnimationFade.to(circle, {
              y: () => -100,
              opacity: () => 0,
              delay: 0.2,
              duration: 0.7,
              ease: "power1.inOut",
            });

            ScrollTrigger.create({
              animation: circleAnimationFade,
              trigger: element,
              start: endPoint2,
              end: endPoint2,
              toggleActions: "play none none reverse",
            });

            // Circle content
            const circleContentAnimationFade = gsap.timeline();

            circleContentAnimationFade.to(circleContent, {
              marginTop: () => -40,
              marginBottom: () => -8,
              duration: 0.7,
              ease: "power1.inOut",
            });

            ScrollTrigger.create({
              animation: circleContentAnimationFade,
              trigger: element,
              start: midPoint,
              end: midPoint,
              toggleActions: "play none none reverse",
            });
          });
        }
      });

      // Circle intersection
      if (intersection) {
        const intersectionAnimationMedia = gsap.matchMedia();

        // Circle intersection - Mobile
        intersectionAnimationMedia.add("(max-width: 1023.98px)", () => {
          const intersectionAnimationSm = gsap.timeline();

          intersectionAnimationSm.from(intersection, {
            scale: () => 0,
            ease: "none",
          });

          ScrollTrigger.create({
            animation: intersectionAnimationSm,
            trigger: element,
            start: midPointSm,
            end: midPointSm3,
            scrub: 1,
            snap: 1,
          });

          const intersectionAnimationFadeSm = gsap.timeline();

          intersectionAnimationFadeSm.to(intersection, {
            y: () => -100,
            opacity: () => 0,
            delay: 0.3,
            duration: 1,
            ease: "power1.inOut",
          });

          ScrollTrigger.create({
            animation: intersectionAnimationFadeSm,
            trigger: element,
            start: endPointSm,
            end: endPointSm,
            toggleActions: "play none none reverse",
          });
        });

        // Circle intersection - Desktop
        intersectionAnimationMedia.add("(min-width: 1024px)", () => {
          const intersectionAnimation = gsap.timeline();

          intersectionAnimation.from(intersection, {
            scale: () => 0,
            ease: "none",
          });

          ScrollTrigger.create({
            animation: intersectionAnimation,
            trigger: element,
            start: midPoint,
            end: midPoint3,
            scrub: 0.5,
          });

          const intersectionAnimationFade = gsap.timeline();

          intersectionAnimationFade.to(intersection, {
            opacity: () => 0,
            duration: 0.4,
            ease: "power1.inOut",
          });

          ScrollTrigger.create({
            animation: intersectionAnimationFade,
            trigger: element,
            start: endPoint,
            end: endPoint,
            toggleActions: "play none none reverse",
          });

          const intersectionAnimationFadeUp = gsap.timeline();

          intersectionAnimationFadeUp.to(intersection, {
            y: () => -100,
            // opacity: () => 0,
            delay: 0.2,
            duration: 0.7,
            ease: "power1.inOut",
          });

          ScrollTrigger.create({
            animation: intersectionAnimationFadeUp,
            trigger: element,
            start: endPoint2,
            end: endPoint2,
            toggleActions: "play none none reverse",
          });
        });
      }

      if (greenBlob && greenBlobFixed) {
        // Move blob away from or back to chart
        const greenBlobFlip = (progress: number) => {
          // disableScroll();

          if (progress > 0) {
            // Away from chart
            gsap.to(greenBlob, {
              scale: () => 1,
              duration: 0.7,
              ease: "power4.inOut",
            });

            setTimeout(() => {
              const state = Flip.getState(greenBlob);

              greenBlobFixed.appendChild(greenBlob);

              Flip.from(state, {
                ease: "power1.inOut",
                scale: true,
                duration: 1,
                onComplete: () => enableScroll(),
              });
            }, 700);
          } else {
            // Back to chart
            const state = Flip.getState(greenBlob);

            chart.appendChild(greenBlob);

            Flip.from(state, {
              ease: "power4.inOut",
              scale: true,
              duration: 1,
              onComplete: () => enableScroll(),
            });

            gsap.to(greenBlob, {
              scale: () => 0,
              duration: 1,
              ease: "power4.inOut",
            });
          }
        };

        const greenBlobMedia = gsap.matchMedia();

        greenBlobMedia.add("(max-width: 1023.98px)", () => {
          ScrollTrigger.create({
            trigger: element,
            start: endPointSm,
            end: endPointSm,
            onEnter: (self) => greenBlobFlip(self.progress),
            onEnterBack: (self) => greenBlobFlip(self.progress),
            onLeaveBack: () => greenBlobFlip(0),
          });
        });

        greenBlobMedia.add("(min-width: 1024px)", () => {
          ScrollTrigger.create({
            trigger: element,
            start: endPoint,
            end: endPoint,
            onEnter: (self) => greenBlobFlip(self.progress),
            onEnterBack: (self) => greenBlobFlip(self.progress),
            onLeaveBack: () => greenBlobFlip(0),
          });
        });

        ScrollTrigger.create({
          trigger: element,
          start: "top top",
          end: "top top",
          onLeaveBack: () => greenBlobFlip(0),
        });

        if (livingLabImage) {
          // Blob disappearing
          const greenBlobEndAnimation = gsap.timeline();

          greenBlobEndAnimation.to(greenBlobFixed, {
            scale: 0,
            x: () => {
              if (navigator.maxTouchPoints <= 0) return -8;
              return 0;
            },
          });

          ScrollTrigger.create({
            animation: greenBlobEndAnimation,
            trigger: livingLabImage,
            start: `top 45%`,
            end: `top 20%`,
            scrub: 0.5,
            snap: 1.5,
          });
        }

        if (homeIntro) {
          // Background color of living lab section
          const homeIntroBackground = gsap.timeline();

          homeIntroBackground.to(homeIntro, {
            backgroundColor: () => "#1d1e24",
            duration: 0.4,
            ease: "power1.inOut",
          });

          ScrollTrigger.create({
            animation: homeIntroBackground,
            trigger: livingLabImage,
            start: `top 10%`,
            toggleActions: "play none none reverse",
          });
        }
      }
    }
  });
};

/*=================================================================
  Home - Images with splash animation
=================================================================*/
export const imageSplashAnimation = () => {
  const containers = document.querySelectorAll(".image-with-mask");

  containers.forEach((container) => {
    const image = container.querySelector(".image-with-mask__image--active");

    if (image) {
      const splash: HTMLElement | null =
        container.querySelector(".green-splash");
      const start = container.getAttribute("data-image-with-mask-start");
      const end = container.getAttribute("data-image-with-mask-end");

      // Animate image mask
      const maskAnimation = gsap.timeline({ paused: true });

      maskAnimation.to(image, {
        "--image-with-mask-percent": () => "100%",
        // ease: "none",
        ease: `power1.inOut`,
        duration: 1,
      });

      ScrollTrigger.create({
        animation: maskAnimation,
        trigger: container,
        start: start ? start : `top 25%`,
        end: end ? end : `bottom 50%`,
        onEnter: () => maskAnimation.play(),
        onEnterBack: () => maskAnimation.pause(),
        onLeaveBack: () => maskAnimation.reverse(),
        onLeave: () => {
          gsap.delayedCall(1, () => {
            // Enable scrubbing when scrolling back up
            ScrollTrigger.create({
              animation: maskAnimation,
              trigger: container,
              start: start ? start : `top 25%`,
              end: end ? end : `bottom 50%`,
              scrub: 1,
              onLeaveBack: (self) => {
                maskAnimation.pause();
                self.disable();
              },
            });
          });
        },
      });

      // Animate splash
      if (splash) {
        const splashImage: HTMLImageElement | null =
          splash.querySelector("img");

        if (splashImage) {
          const splashImageSrc = splashImage.getAttribute("src");

          splashImageSrc && splashImage.setAttribute("src", "");
          splashImage.remove();

          ScrollTrigger.create({
            trigger: image,
            start: start ? start : `top 25%`,
            end: end ? end : `bottom 50%`,
            onEnter: () => {
              splashImageSrc && splashImage.setAttribute("src", splashImageSrc);
              splash.append(splashImage);
            },
            onEnterBack: () => {
              splashImageSrc && splashImage.setAttribute("src", "");
              splashImage.remove();
            },
          });
        }
      }
    }
  });
};

/*=================================================================
  Home - Report
=================================================================*/
export const sustainabilityReport = () => {
  const containers: NodeListOf<HTMLElement> = document.querySelectorAll(
    ".scroll-transition-circle",
  );

  containers.forEach((container) => {
    const circle: HTMLElement | null = container.querySelector(
      ".scroll-transition-circle",
    );
    const circleLg: HTMLElement | null = container.querySelector(
      ".scroll-transition-circle--lg",
    );
    let targetContainer: HTMLElement | null = null;
    const targetName = container.getAttribute("data-transition-target");
    if (targetName) targetContainer = document.getElementById(targetName);

    let target = targetContainer;

    let innerContainer: HTMLElement | null | undefined =
      targetContainer?.querySelector(
        ".card-with-pop-up-image-container__inner",
      );

    if (innerContainer) {
      target = innerContainer;
    }

    let targetBackground = "";
    const targetBackgroundValue =
      targetContainer?.getAttribute("data-target-bg");
    if (targetBackgroundValue) targetBackground = targetBackgroundValue;

    // Circle transition
    if (circle) {
      const transitionAnimation = gsap.timeline();

      transitionAnimation.to(circle, {
        scale: () => {
          return Math.round(
            Math.max(
              (window.innerWidth / circle.offsetWidth) * 1.5,
              (container.offsetHeight / circle.offsetWidth) * 1.5,
            ),
          );
        },
        ease: "power1.inOut",
        duration: 0.7,
        force3D: false,
      });

      ScrollTrigger.create({
        animation: transitionAnimation,
        trigger: container,
        start: () => {
          if (circleLg) return `top -25%`;
          return `top 25%`;
        },
        end: () => {
          if (circleLg) return `top -25%`;
          return `top 25%`;
        },
        toggleActions: "play none none reverse",
        onEnter: () => {
          if (target) {
            disableScroll();

            gsap.set(targetContainer, { zIndex: 70 });

            gsap.to(target, {
              opacity: 1,
              y: 0,
              "--sustainability-home-report-percent": "100%",
              duration: 0.7,
              ease: "power1.inOut",
            });

            gsap.to(target, {
              backgroundColor: targetBackground,
              delay: 0.5,
              duration: 0.3,
              ease: "power4.out",
            });

            setTimeout(() => {
              enableScroll();
            }, 400);
          }
        },
        onEnterBack: () => {
          gsap.to(target, {
            opacity: 0,
            y: "6.25rem",
            backgroundColor: "rgba(227, 240, 231, 0)",
            "--sustainability-home-report-percent": "0%",
            duration: 0.3,
            ease: "power4.out",
          });

          setTimeout(() => {
            gsap.set(targetContainer, { zIndex: 10 });
          }, 300);
        },
      });

      if (circleLg) {
        const circleLgAnimation = gsap.timeline();

        circleLgAnimation.to(circleLg, {
          scale: () => 1.2,
          ease: "none",
          duration: 0.5,
        });

        ScrollTrigger.create({
          animation: circleLgAnimation,
          trigger: container,
          start: `top 50%`,
          end: `top -25%`,
          scrub: 1,
        });
      }
    }
  });
};

/*=================================================================
  Home - Make a difference
=================================================================*/
export const sustainabilityActions = () => {
  const elements: NodeListOf<HTMLElement> = document.querySelectorAll(
    ".card-with-pop-up-image__item",
  );

  elements.forEach((element) => {
    const image: HTMLElement | null = element.querySelector(
      ".card-with-pop-up-image__image",
    );

    if (image) {
      window.addEventListener("mousemove", (event) => {
        const rect = element.getBoundingClientRect();

        const animation = gsap.timeline();

        animation.to(image, {
          left: () => event.clientX - rect.left - image.offsetWidth / 2,
          top: () =>
            Math.max(-200, event.clientY - rect.top - image.offsetHeight / 2),
          duration: 2,
          ease: "power4.out",
        });
      });
    }
  });

  const cursor: HTMLElement | null = document.getElementById("cursor");

  if (cursor) {
    window.addEventListener("mousemove", (event) => {
      cursor.classList.remove("hide");

      for (let i = 0, totalElements = elements.length; i < totalElements; i++) {
        const rect = elements[i].getBoundingClientRect();
        const x = event.clientX;
        const y = event.clientY;

        // Check if cursor is within the element's boundaries
        if (
          x >= rect.left &&
          x <= rect.right &&
          y >= rect.top &&
          y <= rect.bottom
        ) {
          // Cursor is inside the element - hide cursor
          cursor.classList.add("hide");
          break;
        }
      }
    });
  }
};

/*=================================================================
  Living lab - Diagram with three circles
=================================================================*/
export const sustainabilityLivingLabDiagram = () => {
  const containers: NodeListOf<HTMLElement> =
    document.querySelectorAll(".three-circles");

  const point0 = `top 50%`;
  const point1 = `top top`;
  const point2 = `top -10%`;
  const point2b = `top -50%`;
  const point3 = `top -100%`;
  const point4 = `top -170%`;
  const point5 = `top -180%`;
  const point6 = `top -240%`;

  containers.forEach((container) => {
    const wrapper: HTMLElement | null = container.querySelector(
      ".three-circles__section__wrapper--intro",
    );
    const chart: HTMLElement | null = container.querySelector(
      ".three-circles__chart",
    );

    if (wrapper && chart) {
      const circles: NodeListOf<HTMLElement> = chart.querySelectorAll(
        ".three-circles__chart__item",
      );
      const arrows = chart.querySelectorAll(
        ".three-circles__chart__item__line",
      );
      const content = wrapper.querySelector(".three-circles__intro__content");

      const targetName = wrapper.getAttribute("data-transition-target");

      let target: HTMLElement | null;
      if (targetName) target = document.getElementById(targetName);

      // Chart
      const chartAnimationRotate = gsap.timeline();

      chartAnimationRotate.from(chart, {
        rotate: () => -180,
        ease: "none",
      });

      ScrollTrigger.create({
        animation: chartAnimationRotate,
        trigger: wrapper,
        start: point1,
        end: point3,
        scrub: 1,
        snap: 1,
      });

      const chartAnimationMedia = gsap.matchMedia();

      chartAnimationMedia.add("(min-width: 1024px)", () => {
        const chartAnimation = gsap.timeline();

        chartAnimation.from(chart, {
          translateX: () => {
            return (
              (Math.min(1296, window.innerWidth) - chart.offsetWidth - 64) / 2
            );
          },
          ease: "power1.inOut",
        });

        ScrollTrigger.create({
          animation: chartAnimation,
          trigger: wrapper,
          start: point3,
          end: point3,
          toggleActions: "play none none reverse",
          snap: 1,
        });
      });

      const chartAnimationFadeOut = gsap.timeline();

      chartAnimationFadeOut.to(chart, {
        scale: () => 1.5,
        ease: "none",
      });

      ScrollTrigger.create({
        animation: chartAnimationFadeOut,
        trigger: wrapper,
        start: point4,
        end: point5,
        scrub: 1,
        snap: 1,
      });

      // Intro text content
      if (content) {
        const contentAnimationFadeOutMedia = gsap.matchMedia();
        const contentAnimationFadeOutSm = gsap.timeline();
        const contentAnimationFadeOut = gsap.timeline();

        contentAnimationFadeOutMedia.add("(max-width: 1023.98px)", () => {
          contentAnimationFadeOutSm.to(content, {
            y: () => 100,
            opacity: () => 0,
            // delay: 0.5,
            ease: "power1.inOut",
          });

          ScrollTrigger.create({
            animation: contentAnimationFadeOutSm,
            trigger: wrapper,
            start: point4,
            end: point4,
            toggleActions: "play none none reverse",
          });
        });

        contentAnimationFadeOutMedia.add("(min-width: 1024px)", () => {
          contentAnimationFadeOut.to(content, {
            y: () => -100,
            opacity: () => 0,
            // delay: 0.5,
            ease: "power1.inOut",
          });

          ScrollTrigger.create({
            animation: contentAnimationFadeOut,
            trigger: wrapper,
            start: point4,
            end: point4,
            toggleActions: "play none none reverse",
          });
        });
      }

      // Individual circles
      circles.forEach((circle) => {
        // Transition circle
        if (
          circle.classList.contains("three-circles__chart__item--transition")
        ) {
          const transitionAnimation = gsap.timeline();

          transitionAnimation.to(circle, {
            "--circle-transition-scale": () =>
              Math.round(
                Math.max(
                  (window.innerWidth / circle.offsetWidth) * 1.3333,
                  (window.innerHeight / circle.offsetWidth) * 2,
                ),
              ),
            ease: "none",
          });

          ScrollTrigger.create({
            trigger: wrapper,
            start: point4,
            end: point5,
            scrub: 1,
            onEnter: () => {
              gsap.to(circle, {
                backgroundColor: () => "#E3F0E7",
                borderColor: () => "#E3F0E7",
                opacity: () => 1,
                duration: 0.3,
                ease: "power1.inOut",
              });
            },
            onEnterBack: () => {
              gsap.to(circle, {
                backgroundColor: () => "#023e83",
                borderColor: () => "#3cffc3",
                opacity: () => 0,
                duration: 0.3,
                ease: "power1.inOut",
              });
            },
          });

          ScrollTrigger.create({
            animation: transitionAnimation,
            trigger: wrapper,
            start: point5,
            end: point6,
            scrub: 0.5,
            snap: 1,
            onEnter: () => {
              if (target) {
                if (lenisMain) {
                  lenisMain.scrollTo(
                    target.getBoundingClientRect().top + window.scrollY,
                    {
                      duration: 1.5,
                      lock: true,
                      force: true,
                      easing: (x) => 1 - Math.pow(1 - x, 3),
                    },
                  );
                } else {
                  gsap.to(window, {
                    duration: 1.5,
                    scrollTo:
                      target.getBoundingClientRect().top + window.scrollY,
                  });
                }
              }
            },
          });

          ScrollTrigger.create({
            trigger: wrapper,
            start: point6,
            end: point6,
            onEnter: () => {
              if (target) {
                let newBgColor = target.getAttribute("data-bg-color");

                if (newBgColor) {
                  gsap.to(container, {
                    backgroundColor: newBgColor,
                    ease: "power1.inOut",
                    // delay: 0.5,
                    duration: 0.1,
                  });
                }
              }
            },
            onEnterBack: () => {
              if (target) {
                let newBgColor = wrapper.getAttribute("data-bg-color");

                if (newBgColor) {
                  gsap.to(container, {
                    backgroundColor: newBgColor,
                    ease: "power1.inOut",
                    // delay: 0.4,
                    duration: 0.1,
                  });
                }
              }
            },
          });
        } else {
          // Circle outline
          const circleOutlineAnimation = gsap.timeline();

          circleOutlineAnimation.from(circle, {
            borderColor: () => "rgba(60, 255, 195, 0)",
            ease: "none",
          });

          ScrollTrigger.create({
            animation: circleOutlineAnimation,
            trigger: wrapper,
            start: point0,
            end: point1,
            scrub: 1,
          });

          // Circle position
          const circleAnimation = gsap.timeline();

          circleAnimation.from(circle, {
            left: () => "31.882%",
            top: () => "31.882%",
            bottom: () => "auto",
            right: () => "auto",
            ease: "none",
          });

          ScrollTrigger.create({
            animation: circleAnimation,
            trigger: wrapper,
            start: point1,
            end: point3,
            scrub: 1,
          });

          // Circle label
          const label = circle.querySelector("span");

          if (label) {
            const labelAnimation = gsap.timeline();

            labelAnimation.from(label, {
              opacity: () => 0,
              ease: "none",
            });

            ScrollTrigger.create({
              animation: labelAnimation,
              trigger: wrapper,
              start: point1,
              end: point2b,
              scrub: 1,
            });
          }
        }
      });

      // Arrows
      arrows.forEach((arrow) => {
        // Arrow appearing
        const arrowAnimationAppear = gsap.timeline();

        arrowAnimationAppear.from(arrow, {
          scale: () => 0,
          delay: 1,
          ease: "none",
        });

        ScrollTrigger.create({
          animation: arrowAnimationAppear,
          trigger: wrapper,
          start: point2,
          end: point3,
          scrub: 1,
        });
      });
    }
  });
};

/*=================================================================
  Living lab - Sections with circle transition
=================================================================*/
export const sustainabilityLivingLabSection = () => {
  const containers: NodeListOf<HTMLElement> =
    document.querySelectorAll(".three-circles");

  containers.forEach((container) => {
    const sections: NodeListOf<HTMLElement> = container.querySelectorAll(
      ".three-circles__section__wrapper--sub",
    );

    sections.forEach((section) => {
      const circleLg = section.querySelector(
        ".three-circles__section__circle--lg",
      );
      const image = section.querySelector(
        ".three-circles__section__image__image",
      );
      const transitionCircle: HTMLElement | null = section.querySelector(
        ".three-circles__section__circle__circle--transition",
      );

      const targetName = section.getAttribute("data-transition-target");

      let target: HTMLElement | null = targetName
        ? document.getElementById(targetName)
        : null;

      // Large circle
      if (circleLg) {
        const circleLgMedia = gsap.matchMedia();

        // Large circle - mobile
        circleLgMedia.add("(max-width: 1023.98px)", () => {
          const circleLgAnimationSm = gsap.timeline();

          circleLgAnimationSm.from(circleLg, {
            marginTop: () => "-100%",
            scale: () => 0,
            ease: "none",
          });

          ScrollTrigger.create({
            animation: circleLgAnimationSm,
            trigger: section,
            start: `top 100%`,
            end: `top top`,
            scrub: 1,
          });

          // Large circle parallax
          const circleLgAnimationParallax = gsap.timeline();

          circleLgAnimationParallax.to(circleLg, {
            y: () => -50,
            ease: "none",
          });

          ScrollTrigger.create({
            animation: circleLgAnimationParallax,
            trigger: section,
            start: `top top`,
            end: `top -100%`,
            scrub: 1,
          });
        });

        // Large circle - desktop
        circleLgMedia.add("(min-width: 1024px)", () => {
          const circleLgAnimation = gsap.timeline();

          circleLgAnimation.from(circleLg, {
            marginTop: () => {
              if (section.classList.contains("three-circles__section--3"))
                return "-100%";
              return "-70%";
            },
            scale: () => 0,
            ease: "none",
          });

          ScrollTrigger.create({
            animation: circleLgAnimation,
            trigger: section,
            start: `top 100%`,
            end: `top top`,
            scrub: 1,
          });

          // Large circle parallax
          const circleLgAnimationParallax = gsap.timeline();

          circleLgAnimationParallax.to(circleLg, {
            y: () => -100,
            ease: "none",
          });

          ScrollTrigger.create({
            animation: circleLgAnimationParallax,
            trigger: section,
            start: `top top`,
            end: `top -100%`,
            scrub: 1,
          });
        });
      }

      // Image
      if (image) {
        const imageMedia = gsap.matchMedia();
        const imageAnimation = gsap.timeline();

        imageAnimation.from(image, {
          width: () => 0,
          marginTop: () => "200%",
          marginBottom: () => "-200%",
          duration: 1.2,
          ease: "power1.inOut",
        });

        ScrollTrigger.create({
          animation: imageAnimation,
          trigger: section,
          start: `top 100%`,
          end: `top -100%`,
          toggleActions: "play none none reverse",
        });

        imageMedia.add("(max-width: 767.98px)", () => {
          // Image parallax - mobile
          const imageAnimationParallaxSm = gsap.timeline();

          imageAnimationParallaxSm.to(image, {
            y: () => -50,
            ease: "none",
          });

          ScrollTrigger.create({
            animation: imageAnimationParallaxSm,
            trigger: section,
            start: `top top`,
            end: `top -100%`,
            scrub: 1,
          });
        });

        imageMedia.add("(min-width: 768px)", () => {
          // Image parallax - desktop
          const imageAnimationParallax = gsap.timeline();

          imageAnimationParallax.to(image, {
            y: () => -75,
            ease: "none",
          });

          ScrollTrigger.create({
            animation: imageAnimationParallax,
            trigger: section,
            start: `top top`,
            end: `top -100%`,
            scrub: 1,
          });
        });
      }

      // Transition
      if (transitionCircle && target) {
        const containerHeight = Math.max(
          section.offsetHeight,
          window.innerHeight,
        );

        const transitionAnimation = gsap.timeline();

        transitionAnimation.to(transitionCircle, {
          scale: () =>
            Math.round(
              Math.max(
                (window.innerWidth / transitionCircle.offsetWidth) * 2,
                (containerHeight / transitionCircle.offsetWidth) * 3,
              ),
            ),
          ease: "none",
          force3D: true,
        });

        ScrollTrigger.create({
          animation: transitionAnimation,
          trigger: section,
          start: `top -100%`,
          end: `top -180%`,
          scrub: 0.5,
          snap: 1,
          onEnter: () => {
            if (target) {
              if (lenisMain) {
                lenisMain.scrollTo(
                  target.getBoundingClientRect().top + window.scrollY,
                  {
                    duration: 1.5,
                    lock: true,
                    force: true,
                    easing: (x) => 1 - Math.pow(1 - x, 3),
                  },
                );
              } else {
                gsap.to(window, {
                  duration: 1.5,
                  scrollTo: target.getBoundingClientRect().top + window.scrollY,
                });
              }
            }
          },
        });

        // Background color
        ScrollTrigger.create({
          trigger: section,
          start: `top -180%`,
          end: `top -180%`,
          onEnter: () => {
            if (target) {
              let newBgColor = target.getAttribute("data-bg-color");

              if (newBgColor) {
                gsap.to(container, {
                  backgroundColor: newBgColor,
                  ease: "power1.inOut",
                  // delay: 1,
                  duration: 0.1,
                });
              }
            }
          },
          onEnterBack: () => {
            if (target) {
              let newBgColor = section.getAttribute("data-bg-color");

              if (newBgColor) {
                gsap.to(container, {
                  backgroundColor: newBgColor,
                  ease: "power1.inOut",
                  // delay: 0.5,
                  duration: 0.1,
                });
              }
            }
          },
        });
      }
    });
  });
};

/*=================================================================
  ASI, NYPxAMK - Carousel with progress indicator
=================================================================*/
export const carouselProgressIndicator = () => {
  const carousels: NodeListOf<HTMLElement> =
    document.querySelectorAll(".carousel-progress");

  carousels.forEach((carousel) => {
    const progressIndicator = carousel.querySelector(
      ".carousel-progress__indicator",
    );
    const slides = carousel.querySelectorAll(".carousel-progress__item");
    const slideContents = carousel.querySelectorAll(
      ".carousel-progress__content",
    );
    const slideImages = carousel.querySelectorAll(".carousel-progress__image");
    let currentIndex = 0;
    let animating = false;
    let progressIncrement = 100 / (slides.length - 1);

    let scrollContainer = carousel;
    const scrollContainerName = carousel.getAttribute("data-scroll-container");

    if (scrollContainerName) {
      let scrollContainerNew: HTMLElement | null =
        document.querySelector(scrollContainerName);

      if (scrollContainerNew) scrollContainer = scrollContainerNew;
    }

    // Create progress nodes based on the number of slides
    const createProgressNode = () => {
      if (!progressIndicator) return;

      let i = 0;

      while (i < slides.length) {
        const node = document.createElement("div");
        node.classList.add("carousel-progress__indicator__item");

        if (i === currentIndex)
          gsap.set(node, {
            backgroundColor: "#ed1c24",
            borderColor: "#ed1c24",
          });

        progressIndicator.append(node);
        i++;
      }
    };

    createProgressNode();

    const nodes = carousel.querySelectorAll(
      ".carousel-progress__indicator__item",
    );
    // Go to selected slide
    const gotoSlide = (index: number, direction: 1 | -1) => {
      // Scrolling up at the first slide
      if (currentIndex === 0 && direction === -1) {
        enableScroll();
        return;
      }

      // Scrolling down at the last slide
      if (currentIndex === slides.length - 1 && direction === 1) {
        enableScroll();
        return;
      }

      animating = true;

      // Default animation settings
      const tl = gsap.timeline({
        defaults: { duration: 0.5, ease: "power1.inOut" },
        onComplete: () => {
          animating = false;
          // if (index === slides.length - 1) enableScroll();
        },
      });

      // Set active slide
      tl.set(slides[index], { autoAlpha: 1, zIndex: 10 });

      // Set inactive progress node
      if (direction === -1) {
        tl.to(nodes[currentIndex], {
          backgroundColor: "#fff",
          borderColor: "#b1b5c9",
          duration: 0.3,
        });
      }

      // Progress bar percentage
      tl.to(progressIndicator, {
        "--carousel-progress-percent": `${progressIncrement * index}%`,
      });

      // Set active progress node
      tl.to(nodes[index], {
        backgroundColor: "#ed1c24",
        borderColor: "#ed1c24",
        duration: 0.3,
      });

      // Set inactive slide
      tl.set(slides[currentIndex], { autoAlpha: 0, zIndex: 0 });

      // Slide image - set inactive
      const tlSlideImages = gsap.timeline();

      tlSlideImages.fromTo(
        slideImages[currentIndex],
        {
          opacity: 1,
          duration: 0.7,
          ease: "power1.inOut",
        },
        {
          opacity: 0,
          duration: 0.7,
          ease: "power1.inOut",
        },
      );

      // Slide image - set active
      const tlSlideImagesNext = gsap.timeline();

      tlSlideImagesNext.fromTo(
        slideImages[index],
        {
          opacity: 0,
          duration: 0.5,
          ease: "power1.inOut",
        },
        {
          opacity: 1,
          duration: 0.5,
          ease: "power1.inOut",
        },
      );

      // Slide content - set inactive
      const tlSlideContents = gsap.timeline();

      tlSlideContents.fromTo(
        slideContents[currentIndex],
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power1.inOut",
        },
        {
          opacity: 0,
          y: -100 * direction,
          duration: 0.7,
          ease: "power1.inOut",
        },
      );

      // Slide content - set active
      const tlSlideContentsNext = gsap.timeline();

      tlSlideContentsNext.fromTo(
        slideContents[index],
        {
          opacity: 0,
          y: 100 * direction,
          delay: 0.3,
          duration: 0.7,
          ease: "power1.inOut",
        },
        {
          opacity: 1,
          y: 0,
          delay: 0.3,
          duration: 0.7,
          ease: "power1.inOut",
        },
      );

      currentIndex = index;

      if (navigator.maxTouchPoints > 0) {
        if (
          (currentIndex === 0 && direction === -1) ||
          (currentIndex === slides.length && direction === 1)
        ) {
          animating = false;
        }
      }
    };

    ScrollTrigger.observe({
      target: scrollContainer,
      type: "wheel,touch,pointer",
      wheelSpeed: -1,
      onDown: () => !animating && gotoSlide(currentIndex - 1, -1),
      onUp: () => !animating && gotoSlide(currentIndex + 1, 1),
      tolerance: 10,
      // preventDefault: true,
    });

    const snapToContainer = () => {
      disableScroll();
    };

    ScrollTrigger.create({
      trigger: scrollContainer,
      start: "top 20%",
      end: "bottom 80%",
      onEnter: () => snapToContainer(),
      onEnterBack: () => snapToContainer(),
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            enableScroll();
          }
        });
      },
      {
        threshold: 1, // 100% of the element needs to be visible for it to be considered in view
      },
    );

    observer.observe(carousel);
  });
};

/*=================================================================
  Greening efforts - Anchor link scroll
=================================================================*/
export const anchorLinkScroll = () => {
  const stickyBar: HTMLElement | null =
    document.querySelector(".sticky-bar-top");

  if (!stickyBar) {
    const anchorLinks: NodeListOf<HTMLElement> =
      document.querySelectorAll("[href^='#']");
    const anchorLinksWithValue: HTMLElement[] = [];

    anchorLinks.forEach((anchorLink, index) => {
      const href = anchorLink.getAttribute("href");

      if (href && href.length > 1) {
        anchorLinksWithValue.push(anchorLinks[index]);
      }
    });

    anchorLinksWithValue.forEach((anchorLink) => {
      const anchorLinkTargetName = anchorLink.getAttribute("href");

      if (anchorLinkTargetName) {
        const anchorLinkTarget: HTMLElement | null =
          document.querySelector(anchorLinkTargetName);

        if (anchorLinkTarget) {
          anchorLink.addEventListener("click", (event) => {
            event.preventDefault();

            gsap.to(window, {
              duration: 1,
              scrollTo:
                anchorLinkTarget.getBoundingClientRect().top + window.scrollY,
            });
          });
        }
      }
    });
  }
};
