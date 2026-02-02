'use client';

import gsap from 'gsap';
import HorizontalSlider from '@/components/sections/Horizontalslider';

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
  // initial states
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

  scrollTL.addLabel('slider_reveal');

  // fade out earth split content
  scrollTL.to(
    [
      earthSplitRefs.earth.current,
      earthSplitRefs.gridContent.current,
      earthSplitRefs.stats.current,
    ],
    {
      opacity: 0,
      duration: 0.6,
      ease: 'power3.in',
      stagger: 0.08,
    },
    'slider_reveal'
  );

  // beige circle reveal
  scrollTL.add(() => {
    gsap.set(sliderRefs.circleFinal.current, {
      opacity: 1,
      clipPath: 'circle(0% at 50% 100%)',
    });

    gsap.timeline()
      .to(sliderRefs.circleFinal.current, {
        clipPath: 'circle(150% at 50% 100%)',
        duration: 1.1,
        ease: 'power3.inOut',
      })
      .to(
        sliderRefs.circleFinal.current,
        {
          opacity: 0,
          duration: 0.35,
          ease: 'power2.out',
        },
        '-=0.25'
      );
  }, 'slider_reveal+=0.05');


  scrollTL.to(
    sliderRefs.slider.current,
    {
      opacity: 1,
      visibility: 'visible',
      pointerEvents: 'all',
      duration: 0.6,
      ease: 'power3.out',
    },
    'slider_reveal+=0.7'
  );

  /* ---------- HOLD FOR USER INTERACTION ---------- */
  scrollTL.to({}, { duration: 3 });

  /* ---------- SAFETY: ENSURE OVERLAY IS GONE ---------- */
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
      <div
        ref={sliderRef}
        className="fixed inset-0 z-60 opacity-0 pointer-events-none"
      // style={{ visibility: 'hidden' }}
      >
        <HorizontalSlider />
      </div>

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
