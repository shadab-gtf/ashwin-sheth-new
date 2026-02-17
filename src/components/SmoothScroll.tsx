// 'use client';

// import { useLayoutEffect } from 'react';
// import Lenis from 'lenis';
// import gsap from 'gsap';
// import ScrollTrigger from 'gsap/ScrollTrigger';

// gsap.registerPlugin(ScrollTrigger);

// export default function SmoothScroll({ children }: { children: React.ReactNode }) {
//   useLayoutEffect(() => {
//     const lenis = new Lenis({
//       duration: 1.2,
//       easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
//       orientation: 'vertical',
//       gestureOrientation: 'vertical',
//       smoothWheel: true,
//     });

//     lenis.on('scroll', ScrollTrigger.update);

//     gsap.ticker.add((time) => {
//       lenis.raf(time * 1000);
//     });

//     gsap.ticker.lagSmoothing(0);

//     return () => {
//       lenis.destroy();
//       gsap.ticker.remove((time) => lenis.raf(time * 600));
//     };
//   }, []);

//   return <>{children}</>;
// }

"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    } // new effect to prevent scroll restoration on refresh
    const lenis = new Lenis({
      smoothWheel: true,
      duration: 1.2,
    });
    lenisRef.current = lenis;  // new
    lenis.scrollTo(0, { immediate: true });  // new 
    lenis.on("scroll", ScrollTrigger.update);
    function raf(time: number) {
      lenis.raf(time);
      ScrollTrigger.update();
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    ScrollTrigger.normalizeScroll(true);

    return () => {
      lenis.destroy();
      ScrollTrigger.killAll();
    };
  }, []);

  return <>{children}</>;
}
