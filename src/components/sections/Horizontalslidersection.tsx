'use client';

import gsap from 'gsap';
import HorizontalTimelineSection from '@/components/sections/Horizontalslider';

interface HorizontalSliderSectionProps {
  sliderRef: React.RefObject<HTMLDivElement | null>;
  circleFinalRef: React.RefObject<HTMLDivElement | null>;
}

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
  /* =========================================================
     TIMING & EASING
  ========================================================= */
  const TIMING = {
    SCROLL_DURATION: 10,
  };

  /* =========================================================
     INITIAL STATE – SLIDER HIDDEN
  ========================================================= */
  scrollTL.set(sliderRefs.slider.current, {
    opacity: 0,
    visibility: 'hidden',
    pointerEvents: 'none',
    zIndex: 60,
  });

  scrollTL.set(sliderRefs.circleFinal.current, {
    opacity: 0,
    clipPath: 'circle(0% at 50% 100%)',
    backgroundColor: '#FFF8F0',
    willChange: 'clip-path',
  });

  scrollTL.addLabel('timeline_reveal');

  /* =========================================================
     FADE OUT EARTH CONTENT
  ========================================================= */
  scrollTL.to(
    [
      earthSplitRefs.earth.current,
      earthSplitRefs.gridContent.current,
      earthSplitRefs.stats.current,
    ],
    { opacity: 0, stagger: 0.08 },
    'timeline_reveal'
  );

  /* =========================================================
     CIRCLE REVEAL
  ========================================================= */
  scrollTL.add(() => {
    gsap.set(sliderRefs.circleFinal.current, {
      opacity: 1,
      clipPath: 'circle(0% at 50% 100%)',
    });

    gsap.timeline()
      .to(sliderRefs.circleFinal.current, {
        clipPath: 'circle(150% at 50% 100%)',
        duration: 1.1,
        ease: 'power4.inOut',
      })
      .to(sliderRefs.circleFinal.current, {
        opacity: 0,
        duration: 0.35,
      }, '-=0.25');
  }, 'timeline_reveal+=0.05');

  /* =========================================================
     SHOW SLIDER
  ========================================================= */
  scrollTL.to(
    sliderRefs.slider.current,
    {
      opacity: 1,
      visibility: 'visible',
      pointerEvents: 'all',
    },
    'timeline_reveal+=0.7'
  );

  /* =========================================================
     HORIZONTAL SCROLL SETUP
  ========================================================= */
  const sliderEl = sliderRefs.slider.current;
  if (!sliderEl) return;

  const container = sliderEl.querySelector('[data-timeline-container]') as HTMLElement;
  if (!container) return;

  const slides = Array.from(
    container.querySelectorAll('[data-timeline-slide]')
  ) as HTMLElement[];

  const totalSlides = slides.length;
  const scrollDistance = window.innerWidth * 1.1 * (totalSlides - 1);

  /* =========================================================
     INITIAL IMAGE STATE (SKETCH ONLY)
  ========================================================= */
  slides.forEach((slide) => {
    const centerActive = slide.querySelector('[data-image-active]');
    const centerSketch = slide.querySelector('[data-image-sketch]');
    const rightActive = slide.querySelector('[data-right-active]');
    const rightSketch = slide.querySelector('[data-right-sketch]');

    if (centerActive && centerSketch) {
      gsap.set(centerActive, { opacity: 0 });
      gsap.set(centerSketch, { opacity: 1 });
    }

    if (rightActive && rightSketch) {
      gsap.set(rightActive, { opacity: 0 });
      gsap.set(rightSketch, { opacity: 1 });
    }
  });

  /* =========================================================
     PAUSE BEFORE SCROLL
  ========================================================= */
  scrollTL.addLabel('timeline_scroll_start', '+=1');

  /* =========================================================
     HORIZONTAL MOVE + REAL CENTER DETECTION
  ========================================================= */
  scrollTL.to(
    container,
    {
      x: -scrollDistance,
      duration: TIMING.SCROLL_DURATION,
      ease: 'none',

      onUpdate: () => {
        const viewportCenter = window.innerWidth / 2;

        let activeIndex = -1;
        let closestDistance = Infinity;

        slides.forEach((slide, index) => {
          const rect = slide.getBoundingClientRect();
          const slideCenter = rect.left + rect.width / 2;
          const distance = Math.abs(slideCenter - viewportCenter);

          if (distance < closestDistance) {
            closestDistance = distance;
            activeIndex = index;
          }
        });

        slides.forEach((slide, index) => {
          const isActive = index === activeIndex;

          const centerActive = slide.querySelector('[data-image-active]');
          const centerSketch = slide.querySelector('[data-image-sketch]');
          const rightActive = slide.querySelector('[data-right-active]');
          const rightSketch = slide.querySelector('[data-right-sketch]');

          /* CENTER IMAGE */
          if (centerActive && centerSketch) {
            gsap.to(centerActive, {
              opacity: isActive ? 1 : 0,
              duration: 0.3,
              ease: 'power2.out',
            });

            gsap.to(centerSketch, {
              opacity: isActive ? 0 : 1,
              duration: 0.3,
              ease: 'power2.out',
            });
          }

          /* RIGHT IMAGE – SAME CENTER RULE */
          if (rightActive && rightSketch) {
            gsap.to(rightActive, {
              opacity: isActive ? 1 : 0,
              duration: 0.3,
              ease: 'power2.out',
            });

            gsap.to(rightSketch, {
              opacity: isActive ? 0 : 1,
              duration: 0.3,
              ease: 'power2.out',
            });
          }
        });
      },
    },
    'timeline_scroll_start'
  );

  /* =========================================================
     PROGRESS BAR
  ========================================================= */
  const progressBar = sliderEl.querySelector('[data-scroll-progress]');
  if (progressBar) {
    scrollTL.to(
      progressBar,
      {
        scaleX: 1,
        duration: TIMING.SCROLL_DURATION,
        ease: 'none',
      },
      'timeline_scroll_start'
    );
  }

  /* =========================================================
     CLEANUP
  ========================================================= */
  scrollTL.set(sliderRefs.circleFinal.current, {
    opacity: 0,
    pointerEvents: 'none',
  });
}

/* =========================================================
   RENDER
========================================================= */
export default function HorizontalSliderSection({
  sliderRef,
  circleFinalRef,
}: HorizontalSliderSectionProps) {
  return (
    <>
      {/* Timeline container */}
      <div
        ref={sliderRef}
        className="fixed inset-0 z-60 opacity-0 pointer-events-none"
      >
        <HorizontalTimelineSection />
      </div>

      {/* Circle reveal overlay */}
      <div
        ref={circleFinalRef}
        className="fixed inset-0 z-70 pointer-events-none opacity-0"
        style={{
          clipPath: 'circle(0% at 50% 100%)',
          backgroundColor: '#FFF8F0',
          willChange: 'clip-path',
        }}
      />
    </>
  );
}