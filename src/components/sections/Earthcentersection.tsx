'use client';

import gsap from 'gsap';

interface EarthCenterSectionProps {
    refs: {
        earth: React.RefObject<HTMLDivElement | null>;
    };
}

export function createEarthCenterTimeline(
    scrollTL: gsap.core.Timeline,
    refs: EarthCenterSectionProps['refs'],
    video3Ref: React.RefObject<HTMLDivElement | null>
) {
    /* ---------- FADE OUT VIDEO 3 ---------- */
    scrollTL.to(
        video3Ref.current,
        {
            opacity: 0,
            duration: 0.6,
            ease: 'power2.in',
        },
        'earth_center'
    );

    /* ---------- SUBTLE EARTH BREATHING ---------- */
    scrollTL.to(
        refs.earth.current,
        {
            scale: 1.05,
            duration: 1.6,
            ease: 'sine.inOut',
        },
        'earth_center+=0.4'
    );

    /* ---------- HOLD FOR IMPACT ---------- */
    scrollTL.to({}, { duration: 0.6 });
}

export default function EarthCenterSection({ refs }: EarthCenterSectionProps) {
    return null;
}
// 'use client';

// import gsap from 'gsap';
// import React from 'react';
// import { createCircleReveal } from '@/app/utils/Circlereveal';

// interface EarthCenterSectionProps {
//   refs: {
//     earth: React.RefObject<HTMLDivElement | null>;
//     earthScrollDown: React.RefObject<HTMLDivElement | null>;
//     circleWhite1: React.RefObject<HTMLDivElement | null>;
//   };
// }

// /* -------------------------------------------
//    EARTH MOVE TOWARDS CENTER TIMELINE
// -------------------------------------------- */
// export function createEarthCenterTimeline(
//   scrollTL: gsap.core.Timeline,
//   refs: EarthCenterSectionProps['refs'],
//   video3Ref: React.RefObject<HTMLDivElement | null>
// ) {
//   /* ---------- INITIAL STATES (LOCKED) ---------- */
//   scrollTL.set(refs.circleWhite1.current, {
//     opacity: 1,
//     clipPath: 'circle(0% at 50% 50%)',
//     willChange: 'clip-path',
//   });

//   /* ---------- SECTION START ---------- */
//   scrollTL.addLabel('earth_center');

//   // Hide scroll hint (VERY IMPORTANT)
//   scrollTL.to(
//     refs.earthScrollDown.current,
//     {
//       opacity: 0,
//       duration: 0.25,
//       ease: 'power2.inOut',
//     },
//     'earth_center'
//   );

//   // Fully fade video 3
//   scrollTL.to(
//     video3Ref.current,
//     {
//       opacity: 0,
//       duration: 0.4,
//       ease: 'power2.inOut',
//     },
//     'earth_center+=0.05'
//   );

//   // WHITE CIRCLE FULL COVER
//   createCircleReveal(
//     scrollTL,
//     refs.circleWhite1.current!,
//     '#90deef78',
//     'earth_center+=0.15'
//   );

//   // EARTH ZOOM + LIFT (NOT FINAL CENTER YET)
//   scrollTL.to(
//     refs.earth.current,
//     {
//       y: '30vh',       // visually closer to center
//       scale: 1.15,
//       duration: 1,
//       ease: 'power3.inOut',
//     },
//     'earth_center+=0.3'
//   );

//   // Luxury breathing pause
//   scrollTL.to({}, { duration: 0.35 });
// }

// /* -------------------------------------------
//    RENDER
// -------------------------------------------- */
// export default function EarthCenterSection(_: EarthCenterSectionProps) {
//   // This section is timeline-only by design
//   return null;
// }
