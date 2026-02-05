// "use client"
// import React, { useRef, useEffect, useState } from "react";
// import { gsap } from "gsap";

// const SpotlightOverlay: React.FC<{ initialSize?: number; duration?: number }> = ({
//   initialSize = 0,
//   duration = 2,
// }) => {
//   const overlayRef = useRef<HTMLDivElement>(null);
//   const [finalSize, setFinalSize] = useState(0);

//   // Calculate max radius to cover the screen
//   useEffect(() => {
//     const maxRadius = Math.hypot(window.innerWidth, window.innerHeight);
//     setFinalSize(maxRadius);
//   }, []);

//   // Animate with GSAP
//   useEffect(() => {
//     if (finalSize > 0 && overlayRef.current) {
//       let hole = { size: initialSize }; // GSAP animates object properties
//       gsap.to(hole, {
//         size: finalSize,
//         duration: duration,
//         ease: "power2.inOut",
//         onUpdate: () => {
//           if (overlayRef.current) {
//             overlayRef.current.style.background = `radial-gradient(circle ${hole.size}px at center, rgba(254,247,240,0) 0%, rgba(254,247,240,0) ${hole.size}px, #fef7f0 ${hole.size}px, #fef7f0 100%)`;
//           }
//         },
//       });
//     }
//   }, [finalSize, initialSize, duration]);

//   return <div ref={overlayRef} className="fixed inset-0 z-50 pointer-events-none" />;
// };

// export default SpotlightOverlay;



// "use client";

// import { useRef, useEffect, useState } from "react";
// import gsap from "gsap";
// import { usePathname } from "next/navigation";

// const SpotlightOverlay = () => {
//   const overlayRef = useRef<HTMLDivElement>(null);
//   const hole = useRef({ size: 0 });
//   const [finalSize, setFinalSize] = useState(0);

//   const pathname = usePathname();
//   const isFirstLoad = useRef(true);

//   // calculate screen coverage
//   useEffect(() => {
//     setFinalSize(Math.hypot(window.innerWidth, window.innerHeight));
//   }, []);

//   const updateBG = () => {
//     if (!overlayRef.current) return;

//     overlayRef.current.style.background = `
//       radial-gradient(
//         circle ${hole.current.size}px at center,
//         rgba(254,247,240,0) 0%,
//         rgba(254,247,240,0) ${hole.current.size}px,
//         #fef7f0 ${hole.current.size}px,
//         #fef7f0 100%
//       )
//     `;
//   };

//   // ENTER — cover screen
//   useEffect(() => {
//     const start = () => {
//       hole.current.size = finalSize;

//       gsap.fromTo(
//         hole.current,
//         { size: finalSize },
//         {
//           size: 0,
//           duration: 0.8,
//           ease: "power2.inOut",
//           onUpdate: updateBG,
//           onComplete: () => {
//             window.dispatchEvent(new Event("transition-in-complete"));
//           },
//         }
//       );
//     };

//     window.addEventListener("start-transition", start);
//     return () => window.removeEventListener("start-transition", start);
//   }, [finalSize]);

//   // EXIT — reveal new page
//   useEffect(() => {
//     if (isFirstLoad.current) {
//       isFirstLoad.current = false;
//       return;
//     }

//     hole.current.size = 0;

//     gsap.to(hole.current, {
//       size: finalSize,
//       duration: 2,
//       ease: "power3.out",
//       onUpdate: updateBG,
//       onComplete: () => {
//         window.dispatchEvent(new Event("transition-exit-complete"));
//       },
//     });
//   }, [pathname, finalSize]);

//   return (
//     <div
//       ref={overlayRef}
//       className="pointer-events-none fixed inset-0 z-[9999]"
//     />
//   );
// };

// export default SpotlightOverlay;


"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { usePathname } from "next/navigation";

const SpotlightPageTransition = () => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const hole = useRef({ size: 60 });
  const [finalSize, setFinalSize] = useState(0);

  const pathname = usePathname();
  const isFirstLoad = useRef(true);

  // calculate screen coverage
  useEffect(() => {
    setFinalSize(Math.hypot(window.innerWidth, window.innerHeight));
  }, []);

  const updateBG = () => {
    if (!overlayRef.current) return;

    overlayRef.current.style.background = `
      radial-gradient(
        circle ${hole.current.size}px at center,
        rgba(254,247,240,0) 0%,
        rgba(254,247,240,0) ${hole.current.size}px,
        #fef7f0 ${hole.current.size}px,
        #fef7f0 100%
      )
    `;
  };

  // ENTER — instant cover (NO animation)
  useEffect(() => {
    const start = () => {
      hole.current.size = 60; // fully covered
      updateBG();
     gsap.set(logoRef.current, { opacity: 1 });
      // immediately allow route change
      window.dispatchEvent(new Event("transition-in-complete"));
    };

    window.addEventListener("start-transition", start);
    return () => window.removeEventListener("start-transition", start);
  }, [finalSize]);

  // EXIT — reveal animation (AFTER route change)
useEffect(() => {
  if (isFirstLoad.current) {
    isFirstLoad.current = false;
    return;
  }

const tl = gsap.timeline();

tl.to(logoRef.current, {
  opacity: 0,
  duration: 2.5,
  delay:.5,
  ease: "power2.out",
}, 0) // 👈 start at time 0

.to(hole.current, {
  size: finalSize,
  duration: 2.1,
  ease: "power4.in",
  onUpdate: updateBG,
  onComplete: () => {
    window.dispatchEvent(new Event("transition-exit-complete"));
  },
}, 0);
}, [pathname, finalSize]);


  return (
     <div
    ref={overlayRef}
    className="pointer-events-none fixed inset-0 z-[99999] flex items-center justify-center"
  >
    <img
      ref={logoRef}
      src="/loaderlogo.png"
      alt="logo"
      className="w-[150px] h-[150px] object-contain"
    />
  </div>
  );
};

export default SpotlightPageTransition;
