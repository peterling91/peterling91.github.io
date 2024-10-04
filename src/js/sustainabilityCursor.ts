// GSAP (plugin): https://gsap.com/docs/v3/
import { gsap } from "./registerGsap";

export const sustainabilityCursor = () => {
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
