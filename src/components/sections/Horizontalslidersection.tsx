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
     CONFIG (LUXURY TUNED)
  ========================================================= */
  const SCROLL_DURATION = 10;
  const CENTER_THRESHOLD = 0.28; 

  /* =========================================================
     INITIAL STATE
  ========================================================= */
  scrollTL.set(sliderRefs.slider.current, {
    opacity: 0,
    visibility: 'hidden',
    pointerEvents: 'none',
    zIndex: 60,
  });

 

  /* =========================================================
     FADE EARTH
  ========================================================= */
  scrollTL.to(
    [
      earthSplitRefs.earth.current,
      earthSplitRefs.gridContent.current,
      earthSplitRefs.stats.current,
    ],
    { opacity: 0, stagger: 1 },
    'timeline_reveal'
  );

  /* =========================================================
     CIRCLE REVEAL
  ========================================================= */
  scrollTL.add(() => {
    gsap.timeline()
      .set(sliderRefs.circleFinal.current, { opacity: 1 })
      .to(sliderRefs.circleFinal.current, {
        clipPath: 'circle(150% at 50% 100%)',
        duration: 1.2,
        ease: 'power4.inOut',
      })
      .to(sliderRefs.circleFinal.current, {
        opacity: 0,
        duration: 0.4,
      }, '-=0.3');
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
     SETUP SLIDES
  ========================================================= */
  const sliderEl = sliderRefs.slider.current;
  if (!sliderEl) return;

  const container = sliderEl.querySelector('[data-timeline-container]') as HTMLElement;
  if (!container) return;

  const slides = Array.from(
    container.querySelectorAll('[data-timeline-slide]')
  ) as HTMLElement[];

  const scrollDistance = 750 * slides.length;

  /* =========================================================
     PREP ELEMENTS + QUICK SETTERS
  ========================================================= */
  const slideState = slides.map((slide) => {
    const centerActive = slide.querySelector('[data-image-active]') as HTMLElement;
    const centerSketch = slide.querySelector('[data-image-sketch]') as HTMLElement;
    const rightActive = slide.querySelector('[data-right-active]') as HTMLElement;
    const rightSketch = slide.querySelector('[data-right-sketch]') as HTMLElement;
    const leftText = slide.querySelector('[data-timeline-text-left]') as HTMLElement;
    const bottomText = slide.querySelector('[data-timeline-text-bottom]') as HTMLElement;

    gsap.set([centerActive, rightActive], { opacity: 0, scale: 0.96 });
    gsap.set([centerSketch, rightSketch], { opacity: 1 });
    gsap.set([leftText, bottomText], { opacity: 0, y: 16 });

    return {
      centerActive,
      centerSketch,
      rightActive,
      rightSketch,
      leftText,
      bottomText,
      setActive: {
        ca: gsap.quickTo(centerActive, 'opacity', { duration: 0.5, ease: 'expo.out' }),
        cs: gsap.quickTo(centerSketch, 'opacity', { duration: 0.4, ease: 'expo.out' }),
        ra: gsap.quickTo(rightActive, 'opacity', { duration: 0.5, ease: 'expo.out' }),
        rs: gsap.quickTo(rightSketch, 'opacity', { duration: 0.4, ease: 'expo.out' }),
        lt: gsap.quickTo(leftText, 'opacity', { duration: 0.6, ease: 'power3.out' }),
        bt: gsap.quickTo(bottomText, 'opacity', { duration: 0.6, ease: 'power3.out' }),
      },
    };
  });

  /* =========================================================
     SCROLL START
  ========================================================= */
  scrollTL.addLabel('timeline_scroll_start', '+=1');

  scrollTL.to(
    container,
    {
      x: -scrollDistance,
      duration: SCROLL_DURATION,
      ease: 'none',

      onUpdate: () => {
        const viewportCenter = window.innerWidth / 2;

        slideState.forEach((state, index) => {
          const rect = slides[index].getBoundingClientRect();
          const slideCenter = rect.left + rect.width / 2;
          const distanceRatio =
            Math.abs(slideCenter - viewportCenter) / rect.width;

          const isActive = distanceRatio < CENTER_THRESHOLD;

          state.setActive.ca(isActive ? 1 : 0);
          state.setActive.cs(isActive ? 0 : 1);
          state.setActive.ra(isActive ? 1 : 0);
          state.setActive.rs(isActive ? 0 : 1);
          state.setActive.lt(isActive ? 1 : 0);
          state.setActive.bt(isActive ? 1 : 0);

          gsap.to(state.centerActive, {
            scale: isActive ? 1 : 0.96,
            duration: 0.6,
            ease: 'power3.out',
          });
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
      { scaleX: 1, duration: SCROLL_DURATION, ease: 'none' },
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