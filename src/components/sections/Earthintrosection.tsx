'use client';

import gsap from 'gsap';
import React from 'react';
import { createCircleReveal } from '@/utils/Circlereveal';
import GlobeWithMarkers from '../model/GlobeWithMarkers';

interface EarthIntroSectionProps {
  refs: {
    earth: React.RefObject<HTMLDivElement | null>;
    earthScrollDown: React.RefObject<HTMLDivElement | null>;
    circleWhite1: React.RefObject<HTMLDivElement | null>;
  };
}
export default function EarthIntroSection({ refs }: EarthIntroSectionProps) {
  return (
    <>
      {/* EARTH CONTAINER */}
      <div className="absolute inset-0 z-27 pointer-events-none">
        <div
          ref={refs.earth}
          className="absolute left-1/2 w-[85vw] md:w-[60vh] aspect-square"
          style={{
            transform: 'translateX(-50%)',
            opacity: 0,
          }}
        >
          {/* <img
            src="/assets/earth.png"
            alt="Earth"
            className="w-full h-full object-contain drop-shadow-2xl"
            style={{ willChange: 'transform, opacity' }}
          /> */}
          <GlobeWithMarkers
            enableControls={true}
            autoRotate={true}
          />
        </div>
      </div>

      {/* SCROLL DOWN INDICATOR */}
      <div
        ref={refs.earthScrollDown}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-27 flex flex-col-reverse items-center gap-3 opacity-0 pointer-events-none"
        style={{ visibility: 'hidden' }}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-[#F07D00] animate-bounce" />
        <span className="text-[#F07D00] text-[10px] font-bold tracking-[0.2em] uppercase">
          Scroll Down
        </span>
      </div>

      {/* WHITE CIRCLE REVEAL */}
      <div
        ref={refs.circleWhite1}
        className="fixed inset-0 z-26 pointer-events-none opacity-0"
        style={{
          clipPath: 'circle(0% at 50% 100%)',
          willChange: 'clip-path',
        }}
      />
    </>
  );
}

// "use client";

// import gsap from "gsap";
// import React from "react";
// import { createCircleReveal } from "@/app/utils/Circlereveal";
// import GlobeWithMarkers from "../model/GlobeWithMarkers";

// interface EarthIntroSectionProps {
//   refs: {
//     earth: React.RefObject<HTMLDivElement | null>;
//     earthScrollDown: React.RefObject<HTMLDivElement | null>;
//     circleWhite1: React.RefObject<HTMLDivElement | null>;
//   };
// }

// /* -------------------------------------------
//    SELF-CONTAINED TIMELINE CREATOR
//    Called from master with minimal parameters
// -------------------------------------------- */
// export function createEarthIntroTimeline(
//   scrollTL: gsap.core.Timeline,
//   label: string,
//   prevTextRef: React.RefObject<HTMLHeadingElement | null>,
//   refs: EarthIntroSectionProps["refs"]
// ) {
//   /* ---------- INITIAL STATES ---------- */
//   scrollTL.set(refs.earthScrollDown.current, {
//     opacity: 0,
//     y: 10,
//     visibility: "hidden",
//   }, label);

//   scrollTL.set(refs.earth.current, {
//     y: "75vh",
//     scale: 0.65,
//     opacity: 1,
//     zIndex: 27,
//   }, label);

//   /* ---------- FADE OUT PREVIOUS TEXT ---------- */
//   if (prevTextRef?.current) {
//     scrollTL.to(
//       prevTextRef.current,
//       {
//         opacity: 0,
//         duration: 0.6,
//         ease: "power2.in",
//       },
//       label
//     );
//   }

//   /* ---------- CIRCLE REVEAL ---------- */
//   createCircleReveal(
//     scrollTL,
//     refs.circleWhite1.current!,
//     "#FFFFFF",
//     `${label}+=0.05`
//   );

//   /* ---------- MOVE EARTH TO CENTER ---------- */
//   scrollTL.to(
//     refs.earth.current,
//     {
//       y: "30vh",
//       scale: 1,
//       duration: 1.2,
//       ease: "power3.inOut",
//     },
//     `${label}+=1.35`
//   );

//   /* ---------- SCROLL DOWN INDICATOR ---------- */
//   scrollTL.to(
//     refs.earthScrollDown.current,
//     {
//       opacity: 1,
//       y: 0,
//       visibility: "visible",
//       duration: 0.5,
//       ease: "power2.out",
//     },
//     `${label}+=2.6`
//   );

//   /* ---------- HOLD ---------- */
//   scrollTL.to({}, { duration: 0.4 });

//   return scrollTL;
// }

// /* -------------------------------------------
//    RENDER
// -------------------------------------------- */
// export default function EarthIntroSection({ refs }: EarthIntroSectionProps) {
//   return (
//     <>
//       {/* EARTH */}
//       <div className="absolute inset-0 z-55 pointer-events-none">
//         <div
//           ref={refs.earth}
//           className="absolute left-1/2 w-[80vw] md:w-[55vh] aspect-square canvas-container"
//           style={{
//             transform: "translateX(-50%)",
//             opacity: 0,
//             willChange: "transform",
//           }}
//         >
//           <div
//             style={{
//               maxWidth: "2048px",
//               maxHeight: "2048px",
//               aspectRatio: "1 / 1",
//             }}
//           >
//             <GlobeWithMarkers />
//           </div>
//         </div>
//       </div>

//       {/* EARTH SCROLL DOWN INDICATOR */}
//       <div
//         ref={refs.earthScrollDown}
//         className="absolute bottom-8 left-1/2 -translate-x-1/2 z-60 flex flex-col-reverse items-center gap-3 opacity-0 pointer-events-none"
//         style={{ visibility: "hidden" }}
//       >
//         <div className="w-1.5 h-1.5 rounded-full bg-[#F07D00] animate-bounce" />
//         <span className="text-[#F07D00] text-[10px] font-bold tracking-[0.2em] uppercase">
//           Scroll Down
//         </span>
//       </div>

//       {/* WHITE CIRCLE REVEAL */}
//       <div
//         ref={refs.circleWhite1}
//         className="absolute inset-0 z-50 pointer-events-none"
//         style={{
//           opacity: 0,
//           clipPath: "circle(0% at 50% 100%)",
//           willChange: "clip-path",
//         }}
//       />
//     </>
//   );
// }