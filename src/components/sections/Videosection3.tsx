'use client';

import gsap from 'gsap';
import VideoStage from '@/components/sections/VideoStage';

const VIDEO_3 = "/videos/3.mp4";
const TEXT_3 = "Blue hues where water meets design.";

interface VideoSection3Props {
    refs: {
        video3: React.RefObject<HTMLDivElement | null>;
        text3: React.RefObject<HTMLHeadingElement | null>;
    };
    activeVideo: number;
}

export function createVideo3Timeline(
    scrollTL: gsap.core.Timeline,
    prevRefs: any,
    refs: VideoSection3Props['refs']
) {
    scrollTL.set(refs.video3.current, { opacity: 0 });
    scrollTL.set(refs.text3.current, { opacity: 0 });

    // Timeline logic moved to MasterSequence
}

export default function VideoSection3({ refs, activeVideo }: VideoSection3Props) {
    return (
        <>
            {/* VIDEO 3 */}
            <div
                ref={refs.video3}
                data-video="3"
                className="absolute inset-0 z-30 opacity-0 pointer-events-none!"
                style={{
                    clipPath: 'circle(0% at 50% 100%)', // Start closed
                    willChange: 'clip-path'
                }}
            >
                <VideoStage src={VIDEO_3} isActive={activeVideo === 2} />
                <div className="absolute inset-0 bg-black/50" />
            </div>

            {/* TEXT 3 */}
            <div className="absolute inset-0 z-40 flex items-center justify-center p-8 pointer-events-none!">
                <h2
                    ref={refs.text3}
                    className="text-white text-3xl font-medium uppercase tracking-[5px] text-center max-w-5xl leading-[1.2] opacity-0 drop-shadow-lg"
                >
                    {TEXT_3}
                </h2>
            </div>
        </>
    );
}
// 'use client';

// import gsap from 'gsap';
// import VideoStage from './VideoStage';
// import React from 'react';
// import { createCircleReveal } from '@/app/utils/Circlereveal';

// const VIDEO_3 = '/videos/video3.mp4';
// const TEXT_3 =
//   'Serenity in every shade of blue, where water and design harmonize effortlessly.';

// interface VideoSection3Props {
//   refs: {
//     video3: React.RefObject<HTMLDivElement | null>;
//     text3: React.RefObject<HTMLHeadingElement | null>;
//     circleOrange: React.RefObject<HTMLDivElement | null>;
//   };
//   activeVideo: number;
// }

// /* -------------------------------------------
//    VIDEO 2 → VIDEO 3 TRANSITION TIMELINE
//    CIRCLE COLOR: BEIGE (warm transition)
// -------------------------------------------- */
// export function createVideo3Timeline(
//   scrollTL: gsap.core.Timeline,
//   prevRefs: {
//     video2: React.RefObject<HTMLDivElement | null>;
//     text2: React.RefObject<HTMLHeadingElement | null>;
//   },
//   refs: VideoSection3Props['refs']
// ) {
//   /* ---------- INITIAL STATES (LOCKED) ---------- */
//   scrollTL.set(refs.video3.current, { opacity: 0, visibility: 'hidden' });
//   scrollTL.set(refs.text3.current, { opacity: 0, visibility: 'hidden' });
//   scrollTL.set(refs.circleOrange.current, {
//     opacity: 1,
//     clipPath: 'circle(0% at 50% 50%)',
//     willChange: 'clip-path',
//   });

//   /* ---------- SECTION REVEAL BLOCK ---------- */
//   scrollTL.addLabel('v2_to_v3');

//   // Fade previous content
//   scrollTL.to(
//     prevRefs.text2.current,
//     {
//       opacity: 0,
//       visibility: 'hidden',
//       duration: 0.35,
//       ease: 'power2.inOut',
//     },
//     'v2_to_v3'
//   );

//   scrollTL.to(
//     prevRefs.video2.current,
//     {
//       opacity: 0,
//       duration: 0.35,
//       ease: 'power2.inOut',
//     },
//     'v2_to_v3'
//   );

//   // BEIGE CIRCLE FULL REVEAL (Bottom-up effect)
//   createCircleReveal(
//     scrollTL,
//     refs.circleOrange.current!,
//     '#FFF8F0', // BEIGE color matching your background
//     'v2_to_v3+=0.05'
//   );

//   // VIDEO 3 APPEAR (AFTER CIRCLE)
//   scrollTL.to(
//     refs.video3.current,
//     {
//       opacity: 1,
//       visibility: 'visible',
//       duration: 0.35,
//       ease: 'power2.out',
//     },
//     'v2_to_v3+=0.35'
//   );

//   // TEXT 3 APPEAR
//   scrollTL.to(
//     refs.text3.current,
//     {
//       opacity: 1,
//       visibility: 'visible',
//       duration: 0.45,
//       ease: 'power2.out',
//     },
//     'v2_to_v3+=0.45'
//   );

//   // Luxury breathing pause
//   scrollTL.to({}, { duration: 0.4 });
// }

// /* -------------------------------------------
//    RENDER
// -------------------------------------------- */
// export default function VideoSection3({
//   refs,
//   activeVideo,
// }: VideoSection3Props) {
//   return (
//     <>
//       {/* VIDEO 3 */}
//       <div
//         ref={refs.video3}
//         className="absolute inset-0 z-30 opacity-0"
//         style={{ visibility: 'hidden' }}
//       >
//         <VideoStage src={VIDEO_3} isActive={activeVideo === 2} />
//       </div>

//       {/* TEXT 3 */}
//       <div className="absolute inset-0 z-40 flex items-center justify-center p-8 pointer-events-none">
//         <h2
//           ref={refs.text3}
//           className="text-white text-3xl font-medium uppercase tracking-[5px] text-center max-w-4xl leading-[1.2] drop-shadow-lg"
//           style={{ visibility: 'hidden' }}
//         >
//           {TEXT_3}
//         </h2>
//       </div>

//       {/* BEIGE CIRCLE REVEAL (Bottom-up effect) */}
//       <div
//         ref={refs.circleOrange}
//         className="absolute inset-0 z-50 pointer-events-none"
//         style={{
//           clipPath: 'circle(0% at 50% 100%)', // Start from bottom
//           willChange: 'clip-path',
//         }}
//       />
//     </>
//   );
// }