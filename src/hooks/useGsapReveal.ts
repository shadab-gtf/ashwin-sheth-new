"use client";

import { useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Direction = "left" | "right" | "top" | "bottom";

export default function useGsapReveal(): void {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const textEls = document.querySelectorAll<HTMLElement>(".reveal-text");
      const imgEls = document.querySelectorAll<HTMLElement>(".reveal-img");

      /* ---------------- TEXT REVEAL ---------------- */
      textEls.forEach((el) => {
        const direction = (el.dataset.direction as Direction) || "bottom";

        let x = 0;
        let y = 0;

        if (direction === "left") x = -100;
        if (direction === "right") x = 100;
        if (direction === "top") y = -100;
        if (direction === "bottom") y = 100;

        gsap.set(el, { opacity: 0, x, y });

        ScrollTrigger.create({
          trigger: el,
          start: "top 90%",
          toggleActions: "play reverse play reverse",

          onEnter: () => {
            gsap.to(el, {
              opacity: 1,
              x: 0,
              y: 0,
              duration: 1.2,
              ease: "power3.out",
            });
          },

          onLeaveBack: () => {
            gsap.set(el, { opacity: 0, x, y });
          },
        });
      });

      /* ---------------- IMAGE REVEAL ---------------- */
      imgEls.forEach((el) => {
        const direction = (el.dataset.direction as Direction) || "left";
        const wrapper = el.parentElement as HTMLElement | null;

        if (!wrapper) return;

        gsap.set(el, { scale: 1.05 });

        let clipPathStart: string;
        const clipPathEnd =
          "polygon(0 0, 100% 0, 100% 100%, 0 100%)";

        switch (direction) {
          case "left":
            clipPathStart = "polygon(0 0, 0 0, 0 100%, 0 100%)";
            break;
          case "right":
            clipPathStart =
              "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)";
            break;
          case "top":
            clipPathStart =
              "polygon(0 0, 100% 0, 100% 0, 0 0)";
            break;
          case "bottom":
            clipPathStart =
              "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)";
            break;
          default:
            clipPathStart =
              "polygon(0 0, 0 0, 0 100%, 0 100%)";
        }

        gsap.set(el, { clipPath: clipPathStart });

        ScrollTrigger.create({
          trigger: wrapper,
          start: "top 85%",
          toggleActions: "play reverse play reverse",

          onEnter: () => {
            gsap.to(el, {
              clipPath: clipPathEnd,
              scale: 1,
              duration: 1.2,
              ease: "power3.out",
            });
          },

          onLeaveBack: () => {
            gsap.set(el, {
              clipPath: clipPathStart,
              scale: 1.05,
            });
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);
}
