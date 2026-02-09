"use client";

import { useState, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import HorizontalTimelineSection from "@/components/sections/Horizontalslider";
import SkipButton from "@/components/common/Buttons/SkipButton";
import { masterTimelineStore } from "@/utils/masterTimeline";

// ─── Types ───────────────────────────────────────────────────────────────────

interface HorizontalSliderSectionProps {
  sliderRef: React.RefObject<HTMLDivElement | null>;
  circleFinalRef: React.RefObject<HTMLDivElement | null>;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const SCROLL_DURATION = 24; // Extended for ultra-smooth pacing
const CENTER_THRESHOLD = 0.32; // Slightly wider activation zone
const HOLD_LAST_SLIDE = 0.8;

// Premium easing curves for buttery motion
const EASE = {
  LUXURY: "power2.out", // Smoother than expo
  REVEAL: "power3.inOut", // Refined reveal
  SMOOTH: "power2.out", // Ultra-smooth micro-animations
  FADE: "power2.inOut", // Balanced fade
  SCALE: "back.out(1.2)", // Subtle bounce for premium feel
} as const;

// Performance & smoothness settings
const PERFORMANCE = {
  QUICKTO_DURATION: 0.75,
  SCALE_DURATION: 0.8,
  OPACITY_DURATION: 0.7,
  TEXT_DURATION: 0.85,
  STAGGER: 0.08,
} as const;

// ─── Slide State ─────────────────────────────────────────────────────────────

interface SlideElements {
  centerActive: HTMLElement | null;
  centerSketch: HTMLElement | null;
  leftText: HTMLElement | null;
  bottomText: HTMLElement | null;
  quickSet: {
    activeOpacity: gsap.QuickToFunc;
    sketchOpacity: gsap.QuickToFunc;
    leftOpacity: gsap.QuickToFunc;
    bottomOpacity: gsap.QuickToFunc;
    leftY: gsap.QuickToFunc;
    bottomY: gsap.QuickToFunc;
    activeScale: gsap.QuickToFunc;
  };
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const q = (parent: HTMLElement, attr: string) =>
  parent.querySelector(`[${attr}]`) as HTMLElement | null;

/** Measure exact scrollable distance */
function measureScrollDistance(container: HTMLElement): number {
  return Math.max(0, container.scrollWidth - window.innerWidth);
}

/** Smooth interpolation for buttery transitions */
function smoothLerp(current: number, target: number, factor: number = 0.15): number {
  return current + (target - current) * factor;
}

/** Calculate smooth activation ratio with eased falloff */
function calculateActivationRatio(
  slideCenter: number,
  viewportCenter: number,
  slideWidth: number
): number {
  const distance = Math.abs(slideCenter - viewportCenter);
  const maxDistance = slideWidth * CENTER_THRESHOLD;
  const ratio = Math.max(0, Math.min(1, 1 - distance / maxDistance));

  // Apply easing to the ratio for smoother transitions
  return ratio * ratio * (3 - 2 * ratio); // Smoothstep function
}

/** Prepare slide elements + quickTo setters with premium settings */
function prepareSlide(slide: HTMLElement): SlideElements {
  const centerActive = q(slide, "data-image-active");
  const centerSketch = q(slide, "data-image-sketch");
  const leftText = q(slide, "data-timeline-text-left");
  const bottomText = q(slide, "data-timeline-text-bottom");

  // Set initial states with will-change for performance
  if (centerActive) {
    gsap.set(centerActive, {
      opacity: 0,
      scale: 0.94,
      willChange: "opacity, transform",
    });
  }
  if (centerSketch) {
    gsap.set(centerSketch, {
      opacity: 1,
      willChange: "opacity",
    });
  }
  if (leftText) {
    gsap.set(leftText, {
      opacity: 0,
      y: 24,
      willChange: "opacity, transform",
    });
  }
  if (bottomText) {
    gsap.set(bottomText, {
      opacity: 0,
      y: 24,
      willChange: "opacity, transform",
    });
  }

  return {
    centerActive,
    centerSketch,
    leftText,
    bottomText,
    quickSet: {
      // INSTANT image transitions - no duration
      activeOpacity: gsap.quickTo(centerActive!, "opacity", {
        duration: 0.001, // Instant
        ease: "none"
      }),
      sketchOpacity: gsap.quickTo(centerSketch!, "opacity", {
        duration: 0.001, // Instant
        ease: "none"
      }),
      activeScale: gsap.quickTo(centerActive!, "scale", {
        duration: 0.001, // Instant
        ease: "none",
      }),
      // Smooth text transitions for buttery feel
      leftOpacity: gsap.quickTo(leftText!, "opacity", {
        duration: PERFORMANCE.TEXT_DURATION,
        ease: EASE.SMOOTH
      }),
      bottomOpacity: gsap.quickTo(bottomText!, "opacity", {
        duration: PERFORMANCE.TEXT_DURATION,
        ease: EASE.SMOOTH
      }),
      leftY: gsap.quickTo(leftText!, "y", {
        duration: PERFORMANCE.TEXT_DURATION,
        ease: EASE.LUXURY
      }),
      bottomY: gsap.quickTo(bottomText!, "y", {
        duration: PERFORMANCE.TEXT_DURATION,
        ease: EASE.LUXURY
      }),
    },
  };
}

// ─── Timeline Builder ────────────────────────────────────────────────────────

export function createHorizontalSliderTimeline(
  scrollTL: gsap.core.Timeline,
  earthSplitRefs: {
    earth: React.RefObject<HTMLDivElement | null>;
    gridContent: React.RefObject<HTMLDivElement | null>;
    stats: React.RefObject<HTMLDivElement | null>;
  },
  sliderRefs: {
    slider: React.RefObject<HTMLDivElement | null>;
    circleFinal: React.RefObject<HTMLDivElement | null>;
  }
) {
  const sliderEl = sliderRefs.slider.current;
  if (!sliderEl) return;

  const container = sliderEl.querySelector("[data-timeline-container]") as HTMLElement;
  if (!container) return;

  const slides = Array.from(
    container.querySelectorAll("[data-timeline-slide]")
  ) as HTMLElement[];
  if (!slides.length) return;

  const scrollDistance = measureScrollDistance(container);

  // ── Initial state with GPU acceleration ──
  scrollTL.set(sliderRefs.slider.current, {
    opacity: 0,
    visibility: "hidden",
    pointerEvents: "none",
    zIndex: 60,
    force3D: true,
  });

  scrollTL.addLabel("timeline_reveal");

  // ── Buttery-smooth fade out earth with micro-delay ──
  const earthEls = [
    earthSplitRefs.earth.current,
    earthSplitRefs.gridContent.current,
    earthSplitRefs.stats.current,
  ].filter(Boolean);

  if (earthEls.length) {
    scrollTL.to(
      earthEls,
      {
        opacity: 0,
        duration: 0.6,
        ease: EASE.FADE,
        stagger: 0.05,
      },
      "timeline_reveal"
    );
  }

  // ── Ultra-smooth slider reveal with gentle fade ──
  scrollTL.to(
    sliderRefs.slider.current,
    {
      opacity: 1,
      visibility: "visible",
      pointerEvents: "all",
      duration: 0.8,
      ease: EASE.REVEAL,
    },
    "timeline_reveal+=0.3" // Slight delay for premium feel
  );

  // ── Prepare slides ──
  const slideStates = slides.map(prepareSlide);

  // ── Track activation state (binary - instant switching) ──
  const activationState: boolean[] = new Array(slides.length).fill(false);
  const textProgress: number[] = new Array(slides.length).fill(0);
  let previousScrollX = 0;
  const viewportCenter = window.innerWidth / 2;

  // ── Horizontal scroll with buttery-smooth pacing ──
  scrollTL.addLabel("timeline_scroll_start", `+=0.4`);

  scrollTL.to(
    container,
    {
      x: -scrollDistance,
      duration: SCROLL_DURATION,
      ease: "none", // Linear for scroll-driven animation
      force3D: true,
      onUpdate() {
        const currentScrollX = gsap.getProperty(container, "x") as number;
        const isScrollingForward = currentScrollX < previousScrollX;
        previousScrollX = currentScrollX;

        slideStates.forEach((state, i) => {
          const rect = slides[i].getBoundingClientRect();
          const slideCenter = rect.left + rect.width / 2;
          const ratio = Math.abs(slideCenter - viewportCenter) / rect.width;
          const isInCenter = ratio < CENTER_THRESHOLD;

          // Instant activation when slide enters center
          if (isInCenter && !activationState[i]) {
            activationState[i] = true;
          }

          // Deactivate when scrolling backward AND slide leaves center
          if (!isScrollingForward && !isInCenter && activationState[i]) {
            activationState[i] = false;
          }

          const active = activationState[i];

          // INSTANT image switching - no interpolation, no delays
          state.quickSet.activeOpacity(active ? 1 : 0);
          state.quickSet.sketchOpacity(active ? 0 : 1);
          state.quickSet.activeScale(active ? 1 : 0.94);

          // Text with smooth interpolation for buttery feel
          const targetTextProgress = active ? 1 : 0;
          textProgress[i] = smoothLerp(textProgress[i], targetTextProgress, 0.18);

          state.quickSet.leftOpacity(textProgress[i]);
          state.quickSet.leftY(24 * (1 - textProgress[i]));
          state.quickSet.bottomOpacity(textProgress[i]);
          state.quickSet.bottomY(24 * (1 - textProgress[i]));
        });
      },
    },
    "timeline_scroll_start"
  );

  // ── Buttery-smooth progress bar ──
  const progressBar = sliderEl.querySelector("[data-scroll-progress]");
  if (progressBar) {
    gsap.set(progressBar, { transformOrigin: "left center", scaleX: 0 });
    scrollTL.to(
      progressBar,
      {
        scaleX: 1,
        duration: SCROLL_DURATION,
        ease: "none",
        force3D: true,
      },
      "timeline_scroll_start"
    );
  }

  // ── Add subtle hold at the end for premium finish ──
  scrollTL.addLabel("timeline_complete", `+=${HOLD_LAST_SLIDE}`);

  // ── Cleanup circle with smooth fade ──
  if (sliderRefs.circleFinal.current) {
    scrollTL.to(
      sliderRefs.circleFinal.current,
      {
        opacity: 0,
        pointerEvents: "none",
        duration: 0.4,
        ease: EASE.FADE,
      },
      "timeline_complete"
    );
  }

  // Clean up will-change after animations complete
  scrollTL.set(
    [container, ...slides.flatMap(s => [
      q(s, "data-image-active"),
      q(s, "data-image-sketch"),
      q(s, "data-timeline-text-left"),
      q(s, "data-timeline-text-bottom"),
    ].filter(Boolean))],
    { willChange: "auto" },
    "timeline_complete+=0.5"
  );
}

export default function HorizontalSliderSection({
  sliderRef,
  circleFinalRef,
}: HorizontalSliderSectionProps) {
  const [showSkip, setShowSkip] = useState(false);

  // Function to skip to next section (project_reveal)
  const skipToNextSection = () => {
    if (!masterTimelineStore.tl) return;

    const tl = masterTimelineStore.tl;
    const labelTime = tl.labels["project_reveal"];

    if (labelTime !== undefined) {
      const totalDuration = tl.duration();
      const progress = labelTime / totalDuration;

      // Find the ScrollTrigger instance
      const st = ScrollTrigger.getAll().find(
        (trigger) => trigger.vars.trigger === tl.scrollTrigger?.trigger
      );

      if (st) {
        const scrollStart = st.start;
        const scrollEnd = st.end;
        const targetScroll = scrollStart + (scrollEnd - scrollStart) * progress;

        gsap.to(window, {
          scrollTo: targetScroll,
          duration: 1.5,
          ease: "power2.inOut",
        });
      }
    }
  };

  // Monitor when this section is active based on opacity
  useEffect(() => {
    const checkVisibility = () => {
      if (!sliderRef.current) return;

      const opacity = parseFloat(
        window.getComputedStyle(sliderRef.current).opacity
      );

      // Show skip button when section is visible (opacity > 0.5)
      setShowSkip(opacity > 0.5);
    };

    // Poll for visibility changes
    const interval = setInterval(checkVisibility, 100);

    return () => clearInterval(interval);
  }, [sliderRef]);

  return (
    <>
      <div
        ref={sliderRef}
        className="fixed inset-0 z-60 opacity-0 "
        style={{
          willChange: "opacity",
          backfaceVisibility: "hidden",
          perspective: 1000,
        }}
      >
        <HorizontalTimelineSection />

        {/* Skip button inside this section */}
        {showSkip && (
          <SkipButton
            targetLabel="project_reveal"
            text="Skip"
            className="opacity-100 animate-fadeIn"
            onClick={skipToNextSection}
          />
        )}
      </div>

      <div
        ref={circleFinalRef}
        className="fixed inset-0 z-70 pointer-events-none opacity-0"
        style={{
          clipPath: "circle(0% at 50% 100%)",
          backgroundColor: "#FFF8F0",
          willChange: "clip-path, opacity",
          backfaceVisibility: "hidden",
        }}
      />
    </>
  );
}