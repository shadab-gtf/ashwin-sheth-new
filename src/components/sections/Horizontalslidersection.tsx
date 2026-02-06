"use client";

import gsap from "gsap";
import HorizontalTimelineSection from "@/components/sections/Horizontalslider";

// ─── Types ───────────────────────────────────────────────────────────────────

interface HorizontalSliderSectionProps {
  sliderRef: React.RefObject<HTMLDivElement | null>;
  circleFinalRef: React.RefObject<HTMLDivElement | null>;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const SCROLL_DURATION = 10;
const CENTER_THRESHOLD = 0.28;
const HOLD_LAST_SLIDE = 0.7;

const EASE = {
  LUXURY: "expo.out",
  REVEAL: "power4.inOut",
  SMOOTH: "power3.out",
  FADE: "expo.out",
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
  };
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const q = (parent: HTMLElement, attr: string) =>
  parent.querySelector(`[${attr}]`) as HTMLElement | null;

/** Measure exact scrollable distance */
function measureScrollDistance(container: HTMLElement): number {
  return Math.max(0, container.scrollWidth - window.innerWidth);
}

/** Prepare slide elements + quickTo setters */
function prepareSlide(slide: HTMLElement): SlideElements {
  const centerActive = q(slide, "data-image-active");
  const centerSketch = q(slide, "data-image-sketch");
  const leftText = q(slide, "data-timeline-text-left");
  const bottomText = q(slide, "data-timeline-text-bottom");

  if (centerActive) gsap.set(centerActive, { opacity: 0, scale: 0.96 });
  if (centerSketch) gsap.set(centerSketch, { opacity: 1 });
  if (leftText) gsap.set(leftText, { opacity: 0, y: 16 });
  if (bottomText) gsap.set(bottomText, { opacity: 0, y: 16 });

  return {
    centerActive,
    centerSketch,
    leftText,
    bottomText,
    quickSet: {
      activeOpacity: gsap.quickTo(centerActive!, "opacity", { duration: 0.55, ease: EASE.FADE }),
      sketchOpacity: gsap.quickTo(centerSketch!, "opacity", { duration: 0.45, ease: EASE.FADE }),
      leftOpacity: gsap.quickTo(leftText!, "opacity", { duration: 0.6, ease: EASE.SMOOTH }),
      bottomOpacity: gsap.quickTo(bottomText!, "opacity", { duration: 0.6, ease: EASE.SMOOTH }),
      leftY: gsap.quickTo(leftText!, "y", { duration: 0.6, ease: EASE.SMOOTH }),
      bottomY: gsap.quickTo(bottomText!, "y", { duration: 0.6, ease: EASE.SMOOTH }),
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

  // ── Initial state ──
  scrollTL.set(sliderRefs.slider.current, {
    opacity: 0,
    visibility: "hidden",
    pointerEvents: "none",
    zIndex: 60,
  });

  scrollTL.addLabel("timeline_reveal");

  // ── Fade out earth ──
  const earthEls = [
    earthSplitRefs.earth.current,
    earthSplitRefs.gridContent.current,
    earthSplitRefs.stats.current,
  ].filter(Boolean);

  if (earthEls.length) {
    scrollTL.to(
      earthEls,
      { opacity: 0, duration: 0.8, stagger: 0.15, ease: "power2.inOut" },
      "timeline_reveal"
    );
  }

  // ── Show slider ──
  scrollTL.to(
    sliderRefs.slider.current,
    { opacity: 1, visibility: "visible", pointerEvents: "all" },
    "timeline_reveal+=0.7"
  );

  // ── Prepare slides ──
  const slideStates = slides.map(prepareSlide);

  // ── Track activation state ──
  const activationState: boolean[] = new Array(slides.length).fill(false);
  let previousScrollX = 0;

  // ── Horizontal scroll ──
  scrollTL.addLabel("timeline_scroll_start", "+=1");

  scrollTL.to(
    container,
    {
      x: -scrollDistance,
      duration: SCROLL_DURATION,
      ease: "none",
      onUpdate() {
        const viewportCenter = window.innerWidth / 2;
        const currentScrollX = gsap.getProperty(container, "x") as number;
        const isScrollingForward = currentScrollX < previousScrollX;
        previousScrollX = currentScrollX;

        slideStates.forEach((state, i) => {
          const rect = slides[i].getBoundingClientRect();
          const slideCenter = rect.left + rect.width / 2;
          const ratio = Math.abs(slideCenter - viewportCenter) / rect.width;
          const isInCenter = ratio < CENTER_THRESHOLD;

          // Activate when slide enters center
          if (isInCenter && !activationState[i]) {
            activationState[i] = true;
          }

          // Deactivate only when scrolling backward AND slide is past center
          if (!isScrollingForward && slideCenter > viewportCenter && activationState[i]) {
            activationState[i] = false;
          }

          const active = activationState[i];

          state.quickSet.activeOpacity(active ? 1 : 0);
          state.quickSet.sketchOpacity(active ? 0 : 1);
          state.quickSet.leftOpacity(active ? 1 : 0);
          state.quickSet.leftY(active ? 0 : 16);
          state.quickSet.bottomOpacity(active ? 1 : 0);
          state.quickSet.bottomY(active ? 0 : 16);

          if (state.centerActive) {
            gsap.to(state.centerActive, {
              scale: active ? 1 : 0.96,
              duration: 0.6,
              ease: EASE.SMOOTH,
              overwrite: "auto",
            });
          }
        });
      },
    },
    "timeline_scroll_start"
  );

  // ── Progress bar (synced with scroll) ──
  const progressBar = sliderEl.querySelector("[data-scroll-progress]");
  if (progressBar) {
    scrollTL.to(
      progressBar,
      { scaleX: 1, duration: SCROLL_DURATION, ease: "none" },
      "timeline_scroll_start"
    );
  }

  // ── Hold on last slide so user can read it ──
  scrollTL.to({}, { duration: HOLD_LAST_SLIDE });

  scrollTL.addLabel("timeline_complete");

  // ── Cleanup circle ──
  if (sliderRefs.circleFinal.current) {
    scrollTL.set(sliderRefs.circleFinal.current, {
      opacity: 0,
      pointerEvents: "none",
    });
  }
}

export default function HorizontalSliderSection({
  sliderRef,
  circleFinalRef,
}: HorizontalSliderSectionProps) {
  return (
    <>
      <div
        ref={sliderRef}
        className="fixed inset-0 z-60 opacity-0 pointer-events-none"
      >
        <HorizontalTimelineSection />
      </div>

      <div
        ref={circleFinalRef}
        className="fixed inset-0 z-70 pointer-events-none opacity-0"
        style={{
          clipPath: "circle(0% at 50% 100%)",
          backgroundColor: "#FFF8F0",
          willChange: "clip-path",
        }}
      />
    </>
  );
}