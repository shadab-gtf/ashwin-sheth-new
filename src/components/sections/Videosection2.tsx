'use client';

import gsap from 'gsap';
import VideoStage from '@/components/sections/VideoStage';

const VIDEO_2 = "/videos/2.mp4";
const TEXT_2 = "Warm tones filled with light and comfort.";

interface VideoSection2Props {
    refs: {
        video2: React.RefObject<HTMLDivElement | null>;
        text2: React.RefObject<HTMLHeadingElement | null>;
    };
    activeVideo: number;
}

export function createVideo2Timeline(
    scrollTL: gsap.core.Timeline,
    prevRefs: any,
    refs: VideoSection2Props['refs']
) {
    // Set initial states
    gsap.set(refs.video2.current, { opacity: 0 });
    gsap.set(refs.text2.current, { opacity: 0 });

    // Timeline removed as it is now handled by MasterSequence
}

export default function VideoSection2({ refs, activeVideo }: VideoSection2Props) {
    return (
        <>
            {/* VIDEO 2 */}
            <div
                id='video-section-2'
                ref={refs.video2}
                className="absolute inset-0 z-20 opacity-0 pointer-events-none!"
                style={{
                    clipPath: 'circle(0% at 50% 100%)', // Start closed
                    willChange: 'clip-path'
                }}
            >
                <VideoStage src={VIDEO_2} isActive={activeVideo === 1} />
                {/* Removed bg-black/50 overlay to ensure clear video reveal */}
                <div className="absolute inset-0 pointer-events-none" />
            </div>

            {/* TEXT 2 */}
            <div className="absolute inset-0 z-40 flex items-center justify-center p-8 ">
                <h2
                    ref={refs.text2}
                    className="text-white text-3xl font-medium uppercase tracking-[5px] text-center max-w-5xl leading-[1.2] opacity-0 drop-shadow-lg"
                >
                    {TEXT_2}
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

// const VIDEO_2 = '/videos/video2.mp4';
// const TEXT_2 =
//   'A palette of warmth that welcomes you in, creating a space full of light and love.';

// interface VideoSection2Props {
//   refs: {
//     video2: React.RefObject<HTMLDivElement | null>;
//     text2: React.RefObject<HTMLHeadingElement | null>;
//     circleGreen: React.RefObject<HTMLDivElement | null>;
//   };
//   activeVideo: number;
// }

// /* -------------------------------------------
//    VIDEO 1 → VIDEO 2 TRANSITION TIMELINE
//    CIRCLE COLOR: WHITE (for clean transition)
// -------------------------------------------- */
// export function createVideo2Timeline(
//   scrollTL: gsap.core.Timeline,
//   prevRefs: {
//     video1: React.RefObject<HTMLDivElement | null>;
//     text1: React.RefObject<HTMLHeadingElement | null>;
//     scrollDown: React.RefObject<HTMLDivElement | null>;
//   },
//   refs: VideoSection2Props['refs']
// ) {
//   /* ---------- INITIAL STATES (LOCKED) ---------- */
//   scrollTL.set(refs.video2.current, { opacity: 0, visibility: 'hidden' });
//   scrollTL.set(refs.text2.current, { opacity: 0, visibility: 'hidden' });
//   scrollTL.set(refs.circleGreen.current, {
//     opacity: 1,
//     clipPath: 'circle(0% at 50% 50%)',
//     willChange: 'clip-path',
//   });

//   /* ---------- SECTION REVEAL BLOCK ---------- */
//   scrollTL.addLabel('v1_to_v2');

//   // Fade old content
//   scrollTL.to(
//     [prevRefs.text1.current, prevRefs.scrollDown.current],
//     {
//       opacity: 0,
//       visibility: 'hidden',
//       duration: 0.4,
//       ease: 'power2.inOut',
//     },
//     'v1_to_v2'
//   );

//   scrollTL.to(
//     prevRefs.video1.current,
//     {
//       opacity: 0,
//       duration: 0.4,
//       ease: 'power2.inOut',
//     },
//     'v1_to_v2'
//   );

//   // WHITE CIRCLE FULL REVEAL (from bottom-up direction)
//   createCircleReveal(
//     scrollTL,
//     refs.circleGreen.current!,
//     '#FFFFFF', // WHITE color for elegant transition
//     'v1_to_v2+=0.05'
//   );

//   // VIDEO 2 APPEAR (AFTER CIRCLE COVERS SCREEN)
//   scrollTL.to(
//     refs.video2.current,
//     {
//       opacity: 1,
//       visibility: 'visible',
//       duration: 0.35,
//       ease: 'power2.out',
//     },
//     'v1_to_v2+=0.35'
//   );

//   // TEXT 2 APPEAR
//   scrollTL.to(
//     refs.text2.current,
//     {
//       opacity: 1,
//       visibility: 'visible',
//       duration: 0.45,
//       ease: 'power2.out',
//     },
//     'v1_to_v2+=0.45'
//   );

//   // Small hold (luxury pause)
//   scrollTL.to({}, { duration: 0.4 });
// }

// /* -------------------------------------------
//    RENDER
// -------------------------------------------- */
// export default function VideoSection2({
//   refs,
//   activeVideo,
// }: VideoSection2Props) {
//   return (
//     <>
//       {/* VIDEO 2 */}
//       <div
//         ref={refs.video2}
//         className="absolute inset-0 z-20 opacity-0"
//         style={{ visibility: 'hidden' }}
//       >
//         <VideoStage src={VIDEO_2} isActive={activeVideo === 1} />
//       </div>

//       {/* TEXT 2 */}
//       <div className="absolute inset-0 z-30 flex items-center justify-center p-8 pointer-events-none">
//         <h2
//           ref={refs.text2}
//           className="text-white text-3xl font-medium uppercase tracking-[5px] text-center max-w-4xl leading-[1.2] drop-shadow-lg"
//           style={{ visibility: 'hidden' }}
//         >
//           {TEXT_2}
//         </h2>
//       </div>

//       {/* WHITE CIRCLE REVEAL (Bottom-up effect) */}
//       <div
//         ref={refs.circleGreen}
//         className="absolute inset-0 z-50 pointer-events-none"
//         style={{
//           clipPath: 'circle(0% at 50% 100%)', // Start from bottom
//           willChange: 'clip-path',
//         }}
//       />
//     </>
//   );
// }