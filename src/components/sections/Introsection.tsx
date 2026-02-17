"use client";

import gsap from "gsap";
import Image from "next/image";
import VideoStage from "@/components/sections/VideoStage";

const VIDEO_1 = "/videos/1.mp4";
const TEXT_1 = "Live amidst nature, in calm green serenity.";

interface IntroSectionProps {
  refs: {
    logo: React.RefObject<HTMLDivElement | null>;
    video1: React.RefObject<HTMLDivElement | null>;
    text1: React.RefObject<HTMLHeadingElement | null>;
    scrollDown: React.RefObject<HTMLDivElement | null>;
  };
  activeVideo: number;
}

export function createIntroTimeline(refs: IntroSectionProps["refs"]) {
  // Set initial states
  gsap.set(refs.logo.current, { opacity: 0, visibility: "hidden" });
  gsap.set(refs.text1.current, { opacity: 0 });
  gsap.set(refs.scrollDown.current, { opacity: 0 });


  const timeline = gsap.timeline({ paused: true });

  // 2. Automatic Circle Expansion (3s)
  timeline.to(
    refs.video1.current,
    {
      clipPath: "circle(150% at 50% 50%)",
      duration: 2,
      ease: "power2.inOut",
    },
    3,
  );

  // 3. Logo Reveal (Starts at 3.0s to follow circle)
  timeline.to(
    refs.logo.current,
    {
      opacity: 1,
      visibility: "visible",
      duration: 1,
      ease: "power3.out",
    },
    "+=0.3",
  );

  // 4. Logo Hold (0.5s)
  timeline.to({}, { duration: 0.5 });

  // 5. Logo Hide (1s)
  timeline.to(
    refs.logo.current,
    {
      opacity: 0,
      duration: 0.5,
      ease: "power2.in",
    },
    "logo_hide",
  );

  // 7. Text Reveal (300ms after header appears)
  timeline.to(
    refs.text1.current,
    {
      opacity: 1,
      duration: 1,
      ease: "power2.out",
    },
    "logo_hide+=0.6",
  );

  // 8. Scroll Down Indicator (300ms after text)
  timeline.to(
    refs.scrollDown.current,
    {
      opacity: 1,
      duration: 1,
      ease: "power2.out",
    },
    "logo_hide+=0.9",
  );

  return timeline;
}

export default function IntroSection({ refs, activeVideo }: IntroSectionProps) {
  return (
    <>
      {/* VIDEO 1 */}
      <div
        ref={refs.video1}
        className="absolute inset-0 z-10 pointer-events-none"
        style={{ clipPath: "circle(12% at 50% 50%)", willChange: "clip-path" }}
      >
        <VideoStage src={VIDEO_1} isActive={activeVideo === 0} />
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-700 ease-out "
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 40%, rgba(0,0,0,0.7) 100%)",
            opacity: activeVideo === 0 ? 1 : 0,
          }}
        />
      </div>

      {/* LOGO FLASH */}
      <div
        ref={refs.logo}
        className="absolute inset-0 z-[20] flex items-center justify-center pointer-events-none"
      >
        <Image
          src="/centerlogo.png"
          alt="Ashwin Sheth Group Logo"
          width={500}
          height={200}
          className="w-64 md:w-96 h-auto "
          priority
        />
      </div>

      {/* TEXT 1 */}
      <div className="absolute inset-0 z-40 flex items-center justify-center p-8 pointer-events-none">
        <h2
          ref={refs.text1}
          className="text-white text-3xl font-medium uppercase tracking-[5px] text-center max-w-5xl leading-[1.2] opacity-0 drop-shadow-lg pointer-events-auto select-text"
        >
          {TEXT_1}
        </h2>
      </div>

      {/* SCROLL DOWN INDICATOR */}
      <div
        ref={refs.scrollDown}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 flex flex-col-reverse items-center gap-3 opacity-0 pointer-events-none"
      >
        <div className="w-1.5 h-1.5 rounded-full bg-white animate-bounce pointer-events-auto"></div>
        <span className="text-white text-[10px] font-bold tracking-[0.2em] uppercase pointer-events-auto select-none">
          Scroll Down
        </span>
      </div>
    </>
  );
}
