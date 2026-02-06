// 'use client';

// import gsap from 'gsap';
// import { createCircleReveal } from '@/app/utils/Circlereveal';

// interface EarthSplitSectionProps {
//     refs: {
//         earth: React.RefObject<HTMLDivElement | null>;
//         earthScrollDown: React.RefObject<HTMLDivElement | null>;
//     };
//     gridContentRef: React.RefObject<HTMLDivElement | null>;
//     statsRef: React.RefObject<HTMLDivElement | null>;
//     circleWhite2Ref: React.RefObject<HTMLDivElement | null>;
// }

// export function createEarthSplitTimeline(
//     scrollTL: gsap.core.Timeline,
//     earthRefs: {
//         earth: React.RefObject<HTMLDivElement | null>;
//         earthScrollDown: React.RefObject<HTMLDivElement | null>;
//     },
//     splitRefs: {
//         gridContent: React.RefObject<HTMLDivElement | null>;
//         stats: React.RefObject<HTMLDivElement | null>;
//         circleWhite2: React.RefObject<HTMLDivElement | null>;
//     }
// ) {
//     // Set initial states
//     gsap.set(splitRefs.gridContent.current, { x: '-100px', opacity: 0, pointerEvents: 'none' });
//     gsap.set(splitRefs.stats.current, { opacity: 0, y: 50 });

//     // EARTH + CONTENT SPLIT SECTION
//     scrollTL.to(earthRefs.earthScrollDown.current, {
//         opacity: 0,
//         duration: 0.4,
//         ease: 'power2.in'
//     }, 'earth_split');

//     createCircleReveal(
//         scrollTL,
//         splitRefs.circleWhite2.current!,
//         '#ffffff53',
//         'earth_split'
//     );

//     // Move Earth to right
//     scrollTL.to(earthRefs.earth.current, {
//         x: '15vw',
//         y: '18vh',
//         scale: 1.2,
//         duration: 1.2,
//         ease: 'power2.inOut'
//     }, 'earth_split+=0.3');

//     // Reveal left content
//     scrollTL.fromTo(splitRefs.gridContent.current,
//         { x: '-100px', opacity: 0 },
//         {
//             x: '0',
//             opacity: 1,
//             duration: 1.2,
//             ease: 'power2.out',
//             pointerEvents: 'all'
//         },
//         'earth_split+=0.4'
//     );

//     // Reveal stats at bottom
//     scrollTL.to(splitRefs.stats.current, {
//         opacity: 1,
//         y: 0,
//         duration: 1,
//         ease: 'power2.out'
//     }, 'earth_split+=0.6');
// }

// export default function EarthSplitSection({
//     refs,
//     gridContentRef,
//     statsRef,
//     circleWhite2Ref
// }: EarthSplitSectionProps) {
//     return (
//         <>
//             {/* LEFT CONTENT (EARTH SPLIT SECTION) */}
//             <div
//                 ref={gridContentRef}
//                 className="absolute top-0 left-0 w-[50%] pl-16 md:pl-24 lg:pl-32 max-w-[566px] h-full z-60 
//                            flex flex-col justify-center items-center text-left
//                            opacity-0 pointer-events-none"
//             >
//                 <h2 className="text-2xl leading-[1.3] font-light text-center text-[#F07D00] mb-4 ">
//                     Designing The Present With A Vision<br />
//                     Of Tomorrow.
//                 </h2>

//                 <p className="text-[19px] text-center font-light text-black mb-5 max-w-[566px]">
//                     Our impact is driven by our belief: Great designs solve real problems! For nearly 4 decades, Ashwin Sheth has built a legacy with 80+ exceptional real estate projects in Mumbai and abroad.
//                 </p>

//                 <button
//                     className="relative w-fit mx-auto text-xs md:text-sm font-bold uppercase tracking-[0.1em] 
//                                text-[#0E4194] pb-1.5 cursor-pointer hover:opacity-70 transition-opacity"
//                 >
//                     READ MORE
//                     <span className="absolute left-0 bottom-0 w-full h-[2px] bg-[#0E4194]" />
//                 </button>
//             </div>

//             {/* STATS SECTION (BOTTOM) */}
//             <div
//                 ref={statsRef}
//                 className="absolute bottom-7 left-0 w-full z-30 opacity-0 pointer-events-none"
//             >
//                 <div className="max-w-7xl mx-auto px-12 lg:px-20 py-6 lg:py-10">
//                     <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-16 lg:gap-20">
//                         {/* Stat 1 */}
//                         <div className="text-center">
//                             <div className="text-2xl font-light text-[#2C2C2C] mb-1.5">
//                                 85+
//                             </div>
//                             <div className="text-xs md:text-sm uppercase tracking-[0.1em] text-black font-medium">
//                                 LANDMARK PROJECTS
//                             </div>
//                         </div>

//                         {/* Stat 2 */}
//                         <div className="text-center">
//                             <div className="text-2xl font-light text-[#2C2C2C] mb-1.5">
//                                 40M+
//                             </div>
//                             <div className="text-xs md:text-sm uppercase tracking-[0.1em] text-black font-medium">
//                                 SQ. FT. CONSTRUCTION
//                             </div>
//                         </div>

//                         {/* Stat 3 */}
//                         <div className="text-center">
//                             <div className="text-2xl font-light text-[#2C2C2C] mb-1.5">
//                                 35K+
//                             </div>
//                             <div className="text-xs md:text-sm uppercase tracking-[0.1em] text-black font-medium">
//                                 HAPPY FAMILIES
//                             </div>
//                         </div>

//                         {/* Stat 4 */}
//                         <div className="text-center">
//                             <div className="text-2xl font-light text-[#2C2C2C] mb-1.5">
//                                 21M+
//                             </div>
//                             <div className="text-xs md:text-sm uppercase tracking-[0.1em] text-black font-medium">
//                                 UNDERDEVELOPMENT
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* CIRCLE REVEAL WHITE 2 */}
//             <div
//                 ref={circleWhite2Ref}
//                 className="absolute inset-0 z-50 pointer-events-none opacity-0"
//                 style={{
//                     clipPath: 'circle(0% at 50% 100%)',
//                     willChange: 'clip-path'
//                 }}
//             />
//         </>
//     );
// }


'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface EarthSplitSectionProps {
  gridContentRef: React.RefObject<HTMLDivElement | null>;
  statsRef: React.RefObject<HTMLDivElement | null>;
  circleWhite2Ref: React.RefObject<HTMLDivElement | null>;
}

interface StatItemProps {
  value: string;
  label: string;
  isVisible: boolean;
}

function StatItem({ value, label, isVisible }: StatItemProps) {
  const numberRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!isVisible || !numberRef.current || hasAnimated) return;

    // Parse the value to get number and suffix
    const match = value.match(/^(\d+\.?\d*)([MK+]*)/);
    if (!match) return;

    const targetNumber = parseFloat(match[1]);
    const suffix = match[2];

    const counter = { value: 0 };

    gsap.to(counter, {
      value: targetNumber,
      duration: 2.5,
      ease: 'power2.out',
      onUpdate: () => {
        if (numberRef.current) {
          // Format with decimal if original had decimal
          const formattedValue = value.includes('.')
            ? counter.value.toFixed(1)
            : Math.floor(counter.value).toString();
          numberRef.current.textContent = formattedValue + suffix;
        }
      },
      onComplete: () => {
        setHasAnimated(true);
      },
    });

    return () => {
      gsap.killTweensOf(counter);
    };
  }, [isVisible, value, hasAnimated]);

  return (
    <div className="text-center">
      <div
        ref={numberRef}
        className="text-2xl font-light text-[#2C2C2C] mb-1 tabular-nums"
      >
        {value}
      </div>
      <div className="text-xs uppercase tracking-[0.12em] font-medium text-black">
        {label}
      </div>
    </div>
  );
}

export default function EarthSplitSection({
  gridContentRef,
  statsRef,
  circleWhite2Ref,
}: EarthSplitSectionProps) {
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    if (!statsRef.current) return;

    // Observe when stats become visible (opacity > 0)
    const observer = new MutationObserver(() => {
      if (statsRef.current) {
        const opacity = window.getComputedStyle(statsRef.current).opacity;
        if (parseFloat(opacity) > 0.5 && !statsVisible) {
          setStatsVisible(true);
        }
      }
    });

    observer.observe(statsRef.current, {
      attributes: true,
      attributeFilter: ['style', 'class'],
    });

    return () => observer.disconnect();
  }, [statsRef, statsVisible]);

  const stats = [
    { value: '85+', label: 'LANDMARK PROJECTS' },
    { value: '40M+', label: 'SQ. FT. CONSTRUCTION' },
    { value: '35K+', label: 'HAPPY FAMILIES' },
    { value: '21M+', label: 'UNDER DEVELOPMENT' },
  ];

  return (
    <>
      {/* LEFT CONTENT */}
      <div
        ref={gridContentRef}
        className="absolute top-0 left-0 w-[50%] pl-10
                   max-w-[560px] h-full z-29 
                   flex flex-col justify-center items-start text-left 
                   opacity-0 pointer-events-none"
      >
        <h2 className="text-2xl leading-[1.3] font-light text-[#F07D00] mb-5">
          Designing The Present With A Vision
          <br />
          Of Tomorrow.
        </h2>

        <p className="text-[18px] leading-[1.7] font-light text-black mb-8">
          Our impact is driven by our belief: Great designs solve real problems.
          For nearly 4 decades, Ashwin Sheth has built a legacy with 80+ exceptional
          real estate projects in Mumbai and abroad.
        </p>

        <button className="relative w-fit text-sm font-bold uppercase text-[#0E4194] pb-2 hover:opacity-70 transition-opacity cursor-pointer">
          Read More
          <span className="absolute left-0 bottom-0 w-full h-[2px] bg-[#0E4194]" />
        </button>
      </div>

      {/* STATS */}
      <div
        ref={statsRef}
        className="absolute bottom-8 left-0 w-full z-29 opacity-0 pointer-events-none"
      >
        <div className="w-full mx-auto px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {stats.map((stat) => (
              <StatItem
                key={stat.label}
                value={stat.value}
                label={stat.label}
                isVisible={statsVisible}
              />
            ))}
          </div>
        </div>
      </div>

      {/* BEIGE CIRCLE REVEAL */}
      <div
        ref={circleWhite2Ref}
        className="fixed inset-0 z-28 pointer-events-none opacity-0"
        style={{
          clipPath: 'circle(0% at 50% 100%)',
          willChange: 'clip-path',
        }}
      />
    </>
  );
}