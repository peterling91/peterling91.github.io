// Plugin: https://gsap.com/docs/v3/
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, Flip, ScrollToPlugin);

// Plugin: https://github.com/yomotsu/ScrambleText
import { ScrambleText } from "./ScrambleText";

// Plugin: https://www.npmjs.com/package/@georgedoescode/spline
// @ts-ignore
// import { spline } from "@georgedoescode/spline";

// Plugin: https://www.npmjs.com/package/simplex-noise
// import { createNoise2D } from "simplex-noise";

/*=================================================================
  Custom cursor
=================================================================*/
const customCursor = () => {
  const cursor: HTMLElement | null = document.getElementById("cursor");
  if (cursor) {
    const isTouch = navigator.maxTouchPoints > 0;

    const IDLE_TIME = 3000;
    let idleTime: string | number | NodeJS.Timeout | undefined;

    const hideCursor = (cursor: HTMLElement) => {
      cursor.style.opacity = "0";
    };

    const showCursor = (cursor: HTMLElement) => {
      cursor.style.opacity = "1";
    };

    const resetIdleTimer = () => {
      clearTimeout(idleTime);
      idleTime = setTimeout(() => {
        hideCursor(cursor); // Hide cursor after a period of inactivity
      }, IDLE_TIME);
    };

    resetIdleTimer();
    window.addEventListener("scroll", () => {
      showCursor(cursor);
      resetIdleTimer();
    });

    const displayCursor = () => {
      if (cursor) {
        if (isTouch) {
          cursor.style.display = "none";
        } else {
          cursor.style.display = "block";
        }
      }
    };

    displayCursor();
    window.addEventListener("resize", displayCursor);

    if (!isTouch && cursor) {
      const currentDate = new Date();
      const lf = Math.floor(6);
      let cf: any;
      let uf: number = 0;
      let hf = {
        x: 0,
        y: 0,
      };
      let df: any[] = [];
      let pf = !1;
      let offset = 12;

      class ff {
        index: number;
        anglespeed: number;
        x: number;
        y: number;
        scale: number;
        range: number;
        limit: number;
        element: HTMLSpanElement;
        lockX: number;
        lockY: number;
        angleX: number;
        angleY: number;

        constructor(t = 0) {
          (this.index = t),
            (this.anglespeed = 0.05),
            (this.x = 0),
            (this.y = 0),
            (this.scale = 1 - 0.05 * t),
            (this.range = offset - offset * this.scale + 2),
            (this.limit = 19.5 * this.scale),
            (this.lockX = 0),
            (this.lockY = 0),
            (this.angleX = 0.05),
            (this.angleY = 0.05),
            (this.element = document.createElement("span")),
            gsap.set(this.element, {
              scale: this.scale,
            }),
            cursor && cursor.appendChild(this.element);
        }

        lock() {
          (this.lockX = this.x),
            (this.lockY = this.y),
            (this.angleX = 2 * Math.PI * Math.random()),
            (this.angleY = 2 * Math.PI * Math.random());
        }

        draw() {
          !pf ||
            this.index <= lf ||
            ((this.angleX += this.anglespeed),
            (this.angleY += this.anglespeed),
            (this.y = this.lockY + Math.sin(this.angleY) * this.range),
            (this.x = this.lockX + Math.sin(this.angleX) * this.range)),
            gsap.set(this.element, {
              x: this.x,
              y: this.y,
            });
        }
      }

      const mf = () => {
        clearTimeout(cf), (cf = setTimeout(gf, 150)), (pf = !1);
      };

      const gf = () => {
        pf = !0;
        for (let t of df) t.lock();
      };

      const vf = (event: MouseEvent) => {
        showCursor(cursor);
        resetIdleTimer();
        (hf.x = event.clientX - offset), (hf.y = event.clientY - offset), mf();
      };

      const yf = (event: TouchEvent) => {
        (hf.x = event.touches[0].clientX - offset),
          (hf.y = event.touches[0].clientY - offset),
          mf();
      };

      const xf = () => {
        const currentDate = new Date();
        const t = currentDate.getDate();

        _f(t - uf), (uf = t), requestAnimationFrame(xf);
      };

      const _f = (t: number) => {
        let e = hf.x,
          n = hf.y;
        df.forEach((i, r, o) => {
          let s = o[r + 1] || o[0];
          if (((i.x = e), (i.y = n), i.draw(t), !pf || r <= lf)) {
            const t = 0.35 * (s.x - i.x),
              r = 0.35 * (s.y - i.y);
            (e += t), (n += r);
          }
        });
      };

      window.addEventListener("mousemove", vf);

      window.addEventListener("touchmove", yf);

      uf += currentDate.getDate();

      for (let t = 0; t < 20; t++) {
        let e = new ff(t);
        df.push(e);
      }

      xf();
    }
  }
};

/*=================================================================
  Green blob animation
=================================================================*/
// const blobAnimation = () => {
//   const greenBlobs = document.querySelectorAll(".green-blob");

//   greenBlobs.forEach((greenBlob) => {
//     // our <path> element
//     const path = greenBlob.querySelector("path");
//     // used to set our custom property values
//     // const root = document.documentElement;

//     // let hueNoiseOffset = 0;
//     let noiseStep = 0.005;

//     const noise2D = createNoise2D();

//     const points = createPoints();

//     (function animate() {
//       path && path.setAttribute("d", spline(points, 1, true));

//       // for every point...
//       for (let i = 0; i < points.length; i++) {
//         const point = points[i];

//         // return a pseudo random value between -1 / 1 based on this point's current x, y positions in "time"
//         const nX = noise(point.noiseOffsetX, point.noiseOffsetX);
//         const nY = noise(point.noiseOffsetY, point.noiseOffsetY);
//         // map this noise value to a new value, somewhere between it's original location -20 and it's original location + 20
//         const x = map(nX, -1, 1, point.originX - 20, point.originX + 20);
//         const y = map(nY, -1, 1, point.originY - 20, point.originY + 20);

//         // update the point's current coordinates
//         point.x = x;
//         point.y = y;

//         // progress the point's x, y values through "time"
//         point.noiseOffsetX += noiseStep;
//         point.noiseOffsetY += noiseStep;
//       }

//       // const hueNoise = noise(hueNoiseOffset, hueNoiseOffset);
//       // const hue = map(hueNoise, -1, 1, 0, 360);

//       // root.style.setProperty("--startColor", `hsl(${hue}, 100%, 75%)`);
//       // root.style.setProperty("--stopColor", `hsl(${hue + 60}, 100%, 75%)`);
//       // document.body.style.background = `hsl(${hue + 60}, 75%, 5%)`;

//       // hueNoiseOffset += noiseStep / 6;

//       requestAnimationFrame(animate);
//     })();

//     function map(
//       n: any,
//       start1: number,
//       end1: number,
//       start2: number,
//       end2: number,
//     ) {
//       return ((n - start1) / (end1 - start1)) * (end2 - start2) + start2;
//     }

//     function noise(x: number, y: number) {
//       return noise2D(x, y);
//     }

//     function createPoints() {
//       const points = [];
//       // how many points do we need
//       const numPoints = 6;
//       // used to equally space each point around the circle
//       const angleStep = (Math.PI * 2) / numPoints;
//       // the radius of the circle
//       const rad = 75;

//       for (let i = 1; i <= numPoints; i++) {
//         // x & y coordinates of the current point
//         const theta = i * angleStep;

//         const x = 100 + Math.cos(theta) * rad;
//         const y = 100 + Math.sin(theta) * rad;

//         // store the point's position
//         points.push({
//           x: x,
//           y: y,
//           // we need to keep a reference to the point's original point for when we modulate the values later
//           originX: x,
//           originY: y,
//           // progress the point's x, y values through "time"
//           noiseOffsetX: Math.random() * 800,
//           noiseOffsetY: Math.random() * 800,
//         });
//       }

//       return points;
//     }
//   });
// };

/*=================================================================
  Prevent scroll
=================================================================*/
const preventDefault = (e: any) => {
  e.preventDefault();
};

const preventScrollKeys = (e: any) => {
  // Prevent scrolling with the arrow keys, space, page up/down
  const keys = [37, 38, 39, 40, 32, 33, 34];
  if (keys.includes(e.keyCode)) {
    e.preventDefault();
  }
};

// Disable scrolling
const disableScroll = () => {
  // document.body.style.overflow = "hidden";
  document.body.setAttribute("data-lenis-prevent", "");
  window.addEventListener("scroll", () => preventDefault, { passive: false });
  window.addEventListener("wheel", preventDefault, { passive: false });
  window.addEventListener("touchmove", preventDefault, { passive: false });
  window.addEventListener("keydown", preventScrollKeys, { passive: false });
};

// Re-enable scrolling
const enableScroll = () => {
  // document.body.style.overflow = "";
  document.body.removeAttribute("data-lenis-prevent");
  window.removeEventListener("scroll", preventDefault);
  window.removeEventListener("wheel", preventDefault);
  window.removeEventListener("touchmove", preventDefault);
  window.removeEventListener("keydown", preventScrollKeys);
};

/*=================================================================
  Home - Hero banner mask
=================================================================*/
const heroBannerMask = () => {
  const masks = document.querySelectorAll(".page-banner-mask");

  masks.forEach((mask) => {
    const animation = gsap.timeline();

    animation.to(mask, {
      "--page-banner-mask-percent": () => "0%",
      ease: "none",
    });

    ScrollTrigger.create({
      animation: animation,
      trigger: mask,
      start: `top top`,
      end: `130%`,
      scrub: 1,
    });
  });
};

/*=================================================================
  Home - Four circles scroll section
=================================================================*/
const fourCircles = () => {
  const elements: NodeListOf<HTMLElement> =
    document.querySelectorAll(".four-circles");
  const endPoint = `top -120%`;

  elements.forEach((element) => {
    const chart: HTMLElement | null = element.querySelector(
      ".four-circles__chart",
    );

    const content: HTMLElement | null = element.querySelector(
      ".four-circles__intro__content",
    );

    if (content) {
      const contentAnimationMedia = gsap.matchMedia();

      // Mobile
      contentAnimationMedia.add("(max-width: 1023.98px)", () => {
        // Content fade in
        const contentAnimationSm = gsap.timeline();

        contentAnimationSm.from(content, {
          y: () => "100%",
          duration: 1,
          ease: "power1.inOut",
        });

        ScrollTrigger.create({
          animation: contentAnimationSm,
          trigger: element,
          start: `top top`,
          end: endPoint,
          toggleActions: "play none none reverse",
          fastScrollEnd: true,
        });

        // Content fade out
        const contentAnimationFade = gsap.timeline();

        contentAnimationFade.to(content, {
          opacity: () => 0,
          delay: 0.5,
          duration: 0.5,
          ease: "power1.inOut",
        });

        ScrollTrigger.create({
          animation: contentAnimationFade,
          trigger: chart,
          start: endPoint,
          end: endPoint,
          toggleActions: "play none none reverse",
          fastScrollEnd: true,
        });
      });

      // Desktop
      contentAnimationMedia.add("(min-width: 1024px)", () => {
        // Content fade in
        const contentAnimation = gsap.timeline();

        contentAnimation.from(content, {
          x: () => "35%",
          duration: 1,
          ease: "power1.inOut",
        });

        ScrollTrigger.create({
          animation: contentAnimation,
          trigger: chart,
          start: `top top`,
          end: endPoint,
          toggleActions: "play none none reverse",
          fastScrollEnd: true,
        });

        // Content fade out
        const contentAnimationFade = gsap.timeline();

        contentAnimationFade.to(content, {
          y: () => -100,
          opacity: () => 0,
          delay: 0.2,
          duration: 0.7,
          ease: "power1.inOut",
        });

        ScrollTrigger.create({
          animation: contentAnimationFade,
          trigger: chart,
          start: endPoint,
          end: endPoint,
          toggleActions: "play none none reverse",
          fastScrollEnd: true,
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

      // Chart fade in
      const chartAnimationPositionMedia = gsap.matchMedia();
      const chartAnimationPositionSm = gsap.timeline();
      const chartAnimationPosition = gsap.timeline();

      chartAnimationPositionMedia.add("(max-width: 1023.98px)", () => {
        chartAnimationPositionSm.from(chart, {
          opacity: () => 0,
          rotate: () => -180,
          duration: 1,
          ease: "power1.inOut",
          onStart: () => disableScroll(),
        });

        ScrollTrigger.create({
          animation: chartAnimationPositionSm,
          trigger: chart,
          start: `top top`,
          end: endPoint,
          toggleActions: "play none none none",
          fastScrollEnd: true,
        });
      });

      chartAnimationPositionMedia.add("(min-width: 1024px)", () => {
        chartAnimationPosition
          .from(chart, {
            y: () => -100,
            opacity: () => 0,
            duration: 1,
            ease: "power1.inOut",
            onStart: () => disableScroll(),
          })
          .from(chart, {
            rotate: () => -180,
            x: () => {
              return (
                (Math.min(1296, window.innerWidth) - chart.offsetWidth - 64) /
                -2
              );
            },
            duration: 1,
            ease: "power1.inOut",
            // onComplete: () => enableScroll(),
          });

        ScrollTrigger.create({
          animation: chartAnimationPosition,
          trigger: chart,
          start: `top top`,
          end: endPoint,
          toggleActions: "play none none reverse",
          fastScrollEnd: true,
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
          const circleAnimationSm = gsap.timeline();
          const circleAnimation = gsap.timeline();

          circleAnimationMedia.add("(max-width: 1023.98px)", () => {
            circleAnimationSm
              .from(circle, {
                left: () => "26.457%",
                top: () => "21.225%",
                bottom: () => "auto",
                right: () => "auto",
                // delay: 0.1,
                duration: 1,
                ease: "power1.inOut",
              })
              .from(circleContent, {
                opacity: () => 0,
                delay: 0.1,
                duration: 0.4,
                ease: "power1.inOut",
                onComplete: () => enableScroll(),
              });

            ScrollTrigger.create({
              animation: circleAnimationSm,
              trigger: chart,
              start: `top top`,
              end: endPoint,
              toggleActions: "play none none reverse",
              fastScrollEnd: true,
            });
          });

          circleAnimationMedia.add("(min-width: 1024px)", () => {
            circleAnimation
              .from(circle, {
                left: () => "26.457%",
                top: () => "21.225%",
                bottom: () => "auto",
                right: () => "auto",
                duration: 1,
                delay: 1,
                ease: "power1.inOut",
              })
              .from(circleContent, {
                opacity: () => 0,
                delay: 0.1,
                duration: 0.4,
                ease: "power1.inOut",
                onComplete: () => enableScroll(),
              });

            ScrollTrigger.create({
              animation: circleAnimation,
              trigger: chart,
              start: `top top`,
              end: endPoint,
              toggleActions: "play none none reverse",
              fastScrollEnd: true,
            });
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
            trigger: chart,
            start: endPoint,
            end: endPoint,
            toggleActions: "play none none reverse",
            fastScrollEnd: true,
          });

          // Circle content
          const circleContentAnimation = gsap.timeline();

          circleContentAnimation.to(circleContent, {
            marginTop: () => -40,
            marginBottom: () => -8,
            duration: 1,
            ease: "power1.inOut",
          });

          ScrollTrigger.create({
            animation: circleContentAnimation,
            trigger: chart,
            start: endPoint,
            end: endPoint,
            toggleActions: "play none none reverse",
            fastScrollEnd: true,
          });
        }
      });

      // Circle intersection
      if (intersection) {
        const intersectionAnimation = gsap.timeline();

        intersectionAnimation
          .from(intersection, {
            scale: () => 0,
            duration: 0.3,
            ease: "power1.inOut",
            onStart: () => disableScroll(),
          })
          .to(intersection, {
            y: () => -100,
            opacity: () => 0,
            duration: 1,
            ease: "power1.inOut",
          });

        ScrollTrigger.create({
          animation: intersectionAnimation,
          trigger: chart,
          start: endPoint,
          end: endPoint,
          toggleActions: "play none none reverse",
          fastScrollEnd: true,
        });
      }

      // Green blob
      if (greenBlob) {
        const greenBlobFixed: HTMLElement | null = element.querySelector(
          ".sustainability-green-blob--fixed",
        );
        const headlineSection: HTMLElement | null = document.querySelector(
          ".four-circles__headline",
        );

        if (greenBlobFixed) {
          // Move blob away from or back to chart
          const greenBlobFlip = () => {
            // disableScroll();

            if (!greenBlob.classList.contains("is-fixed")) {
              // Away from chart
              gsap.to(greenBlob, {
                scale: () => 1,
                duration: 0.7,
                ease: "power4.inOut",
              });

              setTimeout(() => {
                const state = Flip.getState(greenBlob);

                greenBlobFixed.appendChild(greenBlob);
                greenBlob.classList.add("is-fixed");

                Flip.from(state, {
                  ease: "power1.inOut",
                  scale: true,
                  duration: 1,
                  onStart: () => {
                    gsap.to(headlineSection, {
                      opacity: () => 1,
                      marginTop: () => 0,
                      duration: 0.5,
                      ease: "power1.inOut",
                    });
                  },
                  onComplete: () => enableScroll(),
                });
              }, 700);
            } else {
              // Back to chart
              const state = Flip.getState(greenBlob);

              chart.appendChild(greenBlob);
              greenBlob.classList.remove("is-fixed");

              Flip.from(state, {
                ease: "power4.inOut",
                scale: true,
                duration: 1,
                onStart: () => {
                  gsap.to(headlineSection, {
                    opacity: () => 0,
                    marginTop: () => "20rem",
                    duration: 0.5,
                    ease: "power1.inOut",
                  });
                },
                onComplete: () => enableScroll(),
              });

              gsap.to(greenBlob, {
                scale: () => 0,
                duration: 1,
                ease: "power4.inOut",
              });
            }
          };

          ScrollTrigger.create({
            trigger: chart,
            start: endPoint,
            end: endPoint,
            onEnter: () => greenBlobFlip(),
            onEnterBack: () => greenBlobFlip(),
            scrub: 1,
          });

          // Blob disappearing
          const livingLabImage = document.getElementById("livingLabImage");
          const homeIntro = document.getElementById("homeIntro");

          if (livingLabImage) {
            const greenBlobEndAnimation = gsap.timeline();

            greenBlobEndAnimation.to(greenBlobFixed, {
              scale: () => 0,
              x: () => {
                if (navigator.maxTouchPoints > 0) return 0;
                return -8;
              },
              // y: () => "40%",
              // duration: 0.4,
              // ease: "power4.inOut",
              ease: "none",
            });

            ScrollTrigger.create({
              animation: greenBlobEndAnimation,
              trigger: livingLabImage,
              start: `top 45%`,
              end: `top 25%`,
              // toggleActions: "play none none reverse",
              scrub: 0.5,
              snap: 1.5,
            });
          }

          if (homeIntro) {
            const homeIntroBackground = gsap.timeline();

            homeIntroBackground.to(homeIntro, {
              backgroundColor: () => "#1d1e24",
              duration: 0.4,
              ease: "power1.inOut",
            });

            ScrollTrigger.create({
              animation: homeIntroBackground,
              trigger: livingLabImage,
              start: `top 5%`,
              toggleActions: "play none none reverse",
            });
          }
        }
      }
    }
  });
};

/*=================================================================
  Home - Images with mask
=================================================================*/
const imageMaskAnimation = () => {
  const containers = document.querySelectorAll(".image-with-mask");

  containers.forEach((container) => {
    const image = container.querySelector(".image-with-mask__image--active");

    if (image) {
      const splash: HTMLElement | null =
        container.querySelector(".green-splash");
      const start = container.getAttribute("data-image-with-mask-start");

      // Animate image mask
      const maskAnimation = gsap.timeline();

      maskAnimation.to(image, {
        "--image-with-mask-percent": () => "100%",
        // duration: 1.5,
        // delay: 0.4,
        // ease: "power2.inOut",
        ease: "none",
      });

      ScrollTrigger.create({
        animation: maskAnimation,
        trigger: container,
        start: start ? start : `top 25%`,
        end: `bottom 70%`,
        // toggleActions: "play none none reverse",
        scrub: 1,
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
            end: `bottom 70%`,
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
const transitionCircle = () => {
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
    // const circleWave: HTMLElement | null = container.querySelector(
    //   ".scroll-transition-circle--wave",
    // );

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
          return Math.max(
            (window.innerWidth / circle.offsetWidth) * 1.5,
            (container.offsetHeight / circle.offsetWidth) * 1.5,
          );
        },
        ease: "power1.inOut",
        // delay: () => {
        //   if (circleLg) return 0.5;
        //   return 0;
        // },
        duration: 0.7,
      });

      ScrollTrigger.create({
        animation: transitionAnimation,
        trigger: container,
        start: () => {
          if (circleLg) return `top top`;
          return `top 50%`;
        },
        end: () => {
          if (circleLg) return `top top`;
          return `top 50%`;
        },
        toggleActions: "play none none reverse",
        onEnter: () => {
          if (target) {
            let delay = 0;

            // if (circleLg) delay = 500;

            disableScroll();

            gsap.set(targetContainer, { zIndex: 70 });

            setTimeout(() => {
              gsap.to(target, {
                opacity: 1,
                y: 0,
                duration: 0.4,
                ease: "power1.inOut",
              });

              gsap.to(target, {
                backgroundColor: targetBackground,
                delay: 0.5,
                duration: 0.3,
                ease: "power4.out",
              });
            }, delay);

            setTimeout(() => {
              enableScroll();
            }, delay + 400);
          }
        },
        onEnterBack: () => {
          // disableScroll();

          gsap.to(target, {
            opacity: 0,
            y: "6.25rem",
            backgroundColor: "rgba(227, 240, 231, 0)",
            duration: 0.3,
            ease: "power4.out",
          });

          setTimeout(() => {
            // enableScroll();
            gsap.set(targetContainer, { zIndex: 10 });
          }, 300);
        },
      });

      if (circleLg) {
        const circleLgAnimation = gsap.timeline();

        circleLgAnimation.to(circleLg, {
          // opacity: () => 0,
          scale: () => 1.2,
          ease: "none",
          duration: 0.5,
        });

        ScrollTrigger.create({
          animation: circleLgAnimation,
          trigger: container,
          start: `top 50%`,
          end: `top top`,
          // toggleActions: onEnter, onLeave, onEnterBack, and onLeaveBack
          // toggleActions: "play reverse play reverse",
          scrub: 1,
        });
      }

      // if (circleWave) {
      //   const circleWaveAnimation = gsap.timeline();

      //   circleWaveAnimation
      //     .to(circleWave, {
      //       opacity: () => 0.3,
      //       scale: () => 1.5,
      //       ease: "power1.in",
      //       duration: 0.3,
      //     })
      //     .to(circleWave, {
      //       opacity: () => 0,
      //       filter: () => `blur(5px)`,
      //       scale: () => 2,
      //       ease: "power1.out",
      //       duration: 0.3,
      //     });

      //   ScrollTrigger.create({
      //     animation: circleWaveAnimation,
      //     trigger: container,
      //     start: `top top`,
      //     end: `top top`,
      //     // toggleActions: onEnter, onLeave, onEnterBack, and onLeaveBack
      //     toggleActions: "play none none reverse",
      //   });
      // }
    }
  });
};

/*=================================================================
  Home - Card with pop up image (Maka a difference)
=================================================================*/
const cardWithPopUpImage = () => {
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
  Living lab - Three circles scroll section (intro)
=================================================================*/
const threeCirclesIntro = (container: HTMLElement) => {
  const chart: HTMLElement | null = container.querySelector(
    ".three-circles__chart",
  );

  if (chart) {
    const circles: NodeListOf<HTMLElement> = chart.querySelectorAll(
      ".three-circles__chart__item",
    );
    const arrows = chart.querySelectorAll(".three-circles__chart__item__line");
    const content = container.querySelector(".three-circles__intro__content");

    const targetName = chart.getAttribute("data-transition-target");

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
      trigger: chart,
      start: `top top`,
      end: `bottom top`,
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
        trigger: chart,
        start: `top -=90%`,
        end: `bottom top`,
        toggleActions: "play none none reverse",
        snap: 1,
      });
    });

    const chartAnimationFadeOut = gsap.timeline();

    chartAnimationFadeOut.to(chart, {
      scale: () => 1.5,
      // delay: 0.5,
      // ease: "power1.inOut",
      ease: "none",
    });

    ScrollTrigger.create({
      animation: chartAnimationFadeOut,
      trigger: chart,
      start: `top -=190%`,
      end: `top -=200%`,
      // toggleActions: "play none none reverse",
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
          trigger: chart,
          start: `top -=190%`,
          end: `top -=190%`,
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
          trigger: chart,
          start: `top -=190%`,
          end: `top -=190%`,
          toggleActions: "play none none reverse",
        });
      });
    }

    // Individual circles
    circles.forEach((circle) => {
      // Transition circle
      if (circle.classList.contains("three-circles__chart__item--transition")) {
        const transitionAnimation = gsap.timeline();

        transitionAnimation.to(circle, {
          "--circle-transition-scale": () =>
            Math.max(
              (window.innerWidth / circle.offsetWidth) * 1.3333,
              (window.innerHeight / circle.offsetWidth) * 2,
            ),
          ease: "none",
        });

        ScrollTrigger.create({
          trigger: chart,
          start: `top -=190%`,
          end: `top -=200%`,
          // toggleActions: "play none none reverse",
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
          trigger: chart,
          start: `top -=200%`,
          end: `top -=260%`,
          // toggleActions: "play none none reverse",
          scrub: 1,
          onEnter: () => {
            if (target) {
              gsap.to(window, {
                duration: 1.5,
                scrollTo:
                  window.scrollY + target.getBoundingClientRect().top + 2,
              });
            }
          },
        });

        ScrollTrigger.create({
          trigger: chart,
          start: `top -=260%`,
          end: `top -=260%`,
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
              let newBgColor = chart.getAttribute("data-bg-color");

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
          trigger: chart,
          start: `top +=60%`,
          end: `bottom +=50%`,
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
          trigger: chart,
          start: `top top`,
          end: `bottom top`,
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
            trigger: chart,
            start: `top +=0%`,
            end: `bottom +=50%`,
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
        trigger: chart,
        start: `top -=200`,
        end: `bottom top`,
        scrub: 1,
      });
    });
  }
};

/*=================================================================
  Living lab - Three circles scroll section (sections)
=================================================================*/
const threeCirclesSection = (container: HTMLElement) => {
  const sections: NodeListOf<HTMLElement> = container.querySelectorAll(
    ".three-circles__section",
  );
  const isTouch = navigator.maxTouchPoints > 0;

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
    // const content = section.querySelector(".three-circles__section__content");

    const targetName = section.getAttribute("data-transition-target");

    let target: HTMLElement | null = targetName
      ? document.getElementById(targetName)
      : null;

    // Large circle
    if (circleLg) {
      const circleLgAnimationMedia = gsap.matchMedia();
      const circleLgAnimationSm = gsap.timeline();
      const circleLgAnimation = gsap.timeline();

      circleLgAnimationMedia.add("(max-width: 1023.98px)", () => {
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
          snap: 1,
        });
      });

      circleLgAnimationMedia.add("(min-width: 1024px)", () => {
        circleLgAnimation.from(circleLg, {
          marginTop: () => {
            if (section.classList.contains("three-circles__section--3"))
              return "-100%";
            return "-70%";
          },
          scale: () => 0,
          // ease: "power1.inOut",
          // delay: 0.5,
          // duration: 1.5,
          ease: "none",
        });

        ScrollTrigger.create({
          animation: circleLgAnimation,
          trigger: section,
          start: `top 100%`,
          end: `top top`,
          scrub: 1,
          // toggleActions: section.classList.contains("three-circles__section--3")
          //   ? "play none none reverse"
          //   : "play reverse play reverse",
        });
      });

      // Large circle parallax
      const circleLgAnimationParallax = gsap.timeline();

      circleLgAnimationParallax.to(circleLg, {
        y: () => -200,
        ease: "none",
      });

      ScrollTrigger.create({
        animation: circleLgAnimationParallax,
        trigger: section,
        start: `top 100%`,
        end: `top -100%`,
        scrub: 1,
      });
    }

    // Image
    if (image) {
      const imageAnimation = gsap.timeline();

      imageAnimation.from(image, {
        width: () => 0,
        marginTop: () => "200%",
        marginBottom: () => "-200%",
        duration: 1.5,
        // delay: 0.2,
        ease: "power1.inOut",
      });

      ScrollTrigger.create({
        animation: imageAnimation,
        trigger: section,
        start: `top 50%`,
        end: `top -100%`,
        toggleActions: "play none none reverse",
      });

      // Image parallax
      const imageAnimationParallax = gsap.timeline();

      imageAnimationParallax.to(image, {
        y: () => -100,
        ease: "none",
      });

      ScrollTrigger.create({
        animation: imageAnimationParallax,
        trigger: section,
        start: `top 50%`,
        end: `top -100%`,
        scrub: 1,
      });
    }

    // Transition
    if (transitionCircle && target) {
      const transitionAnimation = gsap.timeline();
      const containerHeight = Math.max(
        section.offsetHeight,
        window.innerHeight,
      );
      transitionAnimation.to(transitionCircle, {
        scale: () =>
          Math.max(
            (window.innerWidth / transitionCircle.offsetWidth) * 2,
            (containerHeight / transitionCircle.offsetWidth) * 3,
          ),
        // ease: "power1.inOut",
        // duration: 1,
        ease: "none",
      });

      ScrollTrigger.create({
        animation: transitionAnimation,
        trigger: section,
        start: `top -100%`,
        end: `top -150%`,
        scrub: 0.5,
        onEnter: () => {
          if (target) {
            gsap.to(window, {
              duration: 1.5,
              scrollTo: window.scrollY + target.getBoundingClientRect().top + 2,
            });
          }
        },
      });

      // Background color
      ScrollTrigger.create({
        trigger: section,
        start: `top -150%`,
        end: `top -150%`,
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

    // if (content && !section.classList.contains("three-circles__section--3")) {
    //   const contentAnimationFadeOut = gsap.timeline();

    //   contentAnimationFadeOut.to(content, {
    //     marginTop: () => -100,
    //     opacity: () => 0,
    //     ease: "power1.inOut",
    //     duration: 0.5,
    //   });

    //   ScrollTrigger.create({
    //     animation: contentAnimationFadeOut,
    //     trigger: section,
    //     start: `bottom -50%`,
    //     // end: `top -100%`,
    //     end: `bottom top`,
    //     toggleActions: "play none none reverse",
    //   });
    // }
  });
};

/*=================================================================
  Living lab - Three circles scroll section (all)
=================================================================*/
const threeCircles = () => {
  const containers: NodeListOf<HTMLElement> =
    document.querySelectorAll(".three-circles");

  containers.forEach((container) => {
    threeCirclesIntro(container);
    threeCirclesSection(container);
  });
};

/*=================================================================
  ASI, NYPxAMK - Carousel with progress indicator
=================================================================*/
const carouselProgressIndicator = () => {
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
      preventDefault: true,
    });

    const navbar: HTMLDivElement | null = document.querySelector(".navbar");

    const snapToContainer = () => {
      disableScroll();
      navbar && navbar.classList.add("hide-up");

      if (!hasLenis()) {
        gsap.to(window, {
          duration: 0.5,
          scrollTo:
            window.scrollY + scrollContainer.getBoundingClientRect().top + 2,
        });

        setTimeout(() => {
          navbar && navbar.classList.add("hide-up");
        }, 500);
      }
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
const anchorLinkScroll = () => {
  const stickyBar: HTMLElement | null =
    document.querySelector(".sticky-bar-top");

  if (!stickyBar) {
    let offset = 0;
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
              scrollTo: window.scrollY + anchorLinkTarget.getBoundingClientRect().top - offset,
            });
          });
        }
      }
    });
  }
};

/*=================================================================
  Report - Stats circle
=================================================================*/
const statsCircle = () => {
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

/*=================================================================
  Dialog - View full image
=================================================================*/
const dialogFullImage = () => {
  const dialogs = document.querySelectorAll(".dialog-full-image");

  dialogs.forEach((dialog) => {
    const closeButton: HTMLElement | null = dialog.querySelector(
      ".dialog-close-button",
    );
    const image: HTMLElement | null = dialog.querySelector(
      ".dialog-full-image__image",
    );
    const contentArea: HTMLElement | null = dialog.querySelector(
      ".dialog-body-content",
    );

    if (closeButton && image && contentArea) {
      // Close dialog functions
      closeButton.addEventListener("click", () => {
        resetImage(); // Reset image when closing
      });

      // Variables for zooming, panning, and interaction tracking
      let scale = 1;
      let targetScale = 1;
      let initialDistance = 0;
      let startX = 0;
      let startY = 0;
      let offsetX = 0;
      let offsetY = 0;
      let isPanning = false;
      let lastTap = 0; // For detecting double-tap
      let isPinching = false; // To track whether pinch zoom is happening

      // Variables for inertia
      let lastTouchX = 0;
      let lastTouchY = 0;
      let velocityX = 0;
      let velocityY = 0;
      let inertiaFrame: number;
      let isAnimating = false; // To throttle updates and prevent flickering

      // Helper function to calculate distance between two touch points
      const getDistance = (touch1: Touch, touch2: Touch) => {
        const deltaX = touch2.clientX - touch1.clientX;
        const deltaY = touch2.clientY - touch1.clientY;
        return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      };

      // Smoothly scale the image using requestAnimationFrame
      const smoothScaleImage = () => {
        if (Math.abs(scale - targetScale) > 0.01) {
          scale += (targetScale - scale) * 0.1;
          updateImageTransform(); // Update image transform using new scale
          requestAnimationFrame(smoothScaleImage);
        } else {
          scale = targetScale;
          updateImageTransform(); // Ensure the final position is applied
        }
      };

      // Function to update the image transform (called only when necessary)
      const updateImageTransform = () => {
        if (image)
          image.style.transform = `scale(${scale}) translate(${offsetX}px, ${offsetY}px)`;
      };

      // Function to apply inertia for panning
      const applyInertia = () => {
        // Dampen the velocity (reduce it over time)
        velocityX *= 0.95;
        velocityY *= 0.95;

        // Update the image position based on the velocity
        offsetX += velocityX;
        offsetY += velocityY;

        // Apply the translation with the updated offsets
        updateImageTransform();

        // If velocity is very low, stop the animation
        if (Math.abs(velocityX) > 0.1 || Math.abs(velocityY) > 0.1) {
          inertiaFrame = requestAnimationFrame(applyInertia);
        }
      };

      // Throttled panning handler using requestAnimationFrame
      const handlePanning = (touchX: number, touchY: number) => {
        if (!isAnimating) {
          requestAnimationFrame(() => {
            // Update the position of the image
            offsetX = touchX - startX;
            offsetY = touchY - startY;

            // Apply the translation
            updateImageTransform();
            isAnimating = false; // Allow the next frame update
          });
          isAnimating = true; // Prevent multiple updates in the same frame
        }
      };

      // Pinch-to-zoom and pan event handling
      contentArea.addEventListener("touchmove", (event) => {
        if (window.innerWidth < 1024) {
          if (event.touches.length === 2) {
            event.preventDefault();
            isPinching = true; // Set flag to true during pinch

            // Cancel inertia if pinch zoom starts
            cancelAnimationFrame(inertiaFrame); // Stop any ongoing inertia when pinch-zoom starts

            const touch1 = event.touches[0];
            const touch2 = event.touches[1];
            const currentDistance = getDistance(touch1, touch2);

            if (initialDistance === 0) {
              initialDistance = currentDistance;
            } else {
              // Calculate new target scale based on pinch gesture
              const distanceRatio = currentDistance / initialDistance;
              targetScale = Math.max(1, scale * distanceRatio);

              // Start smooth scaling
              requestAnimationFrame(smoothScaleImage);

              // Update the initial distance
              initialDistance = currentDistance;
            }
          } else if (event.touches.length === 1 && scale > 1) {
            // Handle panning when image is zoomed in
            event.preventDefault();
            const touch = event.touches[0];

            if (!isPanning) {
              startX = touch.clientX - offsetX;
              startY = touch.clientY - offsetY;
              isPanning = true;
            }

            // Calculate velocity for inertia
            velocityX = touch.clientX - lastTouchX;
            velocityY = touch.clientY - lastTouchY;

            // Update the image position smoothly using requestAnimationFrame
            handlePanning(touch.clientX, touch.clientY);

            // Store the last touch position
            lastTouchX = touch.clientX;
            lastTouchY = touch.clientY;
          }
        }
      });

      // Detect double-tap to zoom
      contentArea.addEventListener("touchend", (event) => {
        if (window.innerWidth < 1024) {
          // Reset pinching when touch ends
          if (event.touches.length === 0) {
            initialDistance = 0;
            isPanning = false;

            // Apply inertia after panning ends, but not if pinch zoom was active
            if (
              !isPinching &&
              scale > 1 &&
              (Math.abs(velocityX) > 0.1 || Math.abs(velocityY) > 0.1)
            ) {
              inertiaFrame = requestAnimationFrame(applyInertia);
            }
            isPinching = false; // Reset pinch state after touch ends
          }

          // Ignore double-tap if pinch zooming is active
          if (isPinching) return;

          // Double-tap detection logic (with a timeout for debouncing)
          const currentTime = new Date().getTime();
          const tapLength = currentTime - lastTap;

          if (tapLength < 300 && tapLength > 0) {
            // Toggle between zoom in (scale 2.5) and zoom out (scale 1)
            if (scale === 1) {
              targetScale = 2.5;
            } else {
              targetScale = 1;
              offsetX = 0;
              offsetY = 0;
            }

            // Start smooth scaling
            requestAnimationFrame(smoothScaleImage);
          }

          lastTap = currentTime;
        }
      });

      // Reset the image when closing the dialog
      const resetImage = () => {
        scale = 1;
        targetScale = 1;
        offsetX = 0;
        offsetY = 0;
        updateImageTransform(); // Ensure the reset state is applied
        cancelAnimationFrame(inertiaFrame); // Stop any ongoing inertia
        isAnimating = false;
      };

      // Prevent default dialog close on background click
      dialog.addEventListener("click", (event) => {
        if (event.target === dialog) resetImage();
      });
    }
  });
};

/*=================================================================
  Check if lenis is activated
=================================================================*/
const hasLenis = () => {
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

  let hasScrollAnimation = false;
  const isTouch = navigator.maxTouchPoints > 0;

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

  if (hasScrollAnimation && !isTouch) {
    return true;
  }
  return false;
};

/*=================================================================
  Call all functions
=================================================================*/
// blobAnimation();
customCursor();
heroBannerMask();
fourCircles();
imageMaskAnimation();
transitionCircle();
cardWithPopUpImage();
threeCircles();
carouselProgressIndicator();
anchorLinkScroll();
statsCircle();
dialogFullImage();
