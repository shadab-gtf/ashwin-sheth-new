'use client';

import gsap from 'gsap';

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
    REVEAL_DURATION: 1.2,
    SCROLL_DURATION: 10,
  };

  const EASING = {
    REVEAL: 'power4.inOut',
    SMOOTH: 'power2.out',
  };

  /* =========================================================
     INITIAL STATE
     Slider hidden until reveal is complete
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
     FADE OUT EARTH CONTENT (NO FANCY EFFECTS)
  ========================================================= */
  scrollTL.to(
    [
      earthSplitRefs.earth.current,
      earthSplitRefs.gridContent.current,
      earthSplitRefs.stats.current,
    ],
    {
      opacity: 0,
      stagger: 0.08,
    },
    'timeline_reveal'
  );

  /* =========================================================
     CIRCLE REVEAL (ENTRY TRANSITION)
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
        ease: EASING.REVEAL,
      })
      .to(
        sliderRefs.circleFinal.current,
        {
          opacity: 0,
          duration: 0.35,
        },
        '-=0.25'
      );
  }, 'timeline_reveal+=0.05');

  /* =========================================================
     SHOW SLIDER CONTAINER
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
     HORIZONTAL SCROLL LOGIC
  ========================================================= */
  const sliderEl = sliderRefs.slider.current;
  if (!sliderEl) return;

  const container = sliderEl.querySelector('[data-timeline-container]') as HTMLElement;
  if (!container) return;

  const slides = container.querySelectorAll('[data-timeline-slide]');
  const totalSlides = slides.length;

  const scrollDistance = (window.innerWidth * 1.1) * (totalSlides - 1);

  /* =========================================================
     1s CINEMATIC PAUSE BEFORE SCROLL
  ========================================================= */
  scrollTL.addLabel('timeline_scroll_start', '+=1');

  scrollTL.to(
    container,
    {
      x: -scrollDistance,
      duration: TIMING.SCROLL_DURATION,
      ease: 'none',
    },
    'timeline_scroll_start'
  );

  /* =========================================================
     SLIDE ACTIVATION (NO FADE – TRANSFORM ONLY)
  ========================================================= */
  slides.forEach((slide, index) => {
    const textLeft = slide.querySelector('[data-timeline-text-left]');
    const imageCenter = slide.querySelector('[data-timeline-image-center]');
    const imageSketch = slide.querySelector('[data-timeline-image-sketch]');
    const textBottom = slide.querySelector('[data-timeline-text-bottom]');

    if (!textLeft || !imageCenter || !imageSketch || !textBottom) return;

    const slideProgress = index / (totalSlides - 1);
    const revealAt = `timeline_scroll_start+=${slideProgress * TIMING.SCROLL_DURATION}`;

    /* LEFT TEXT */
    scrollTL.to(
      textLeft,
      { x: 0, duration: TIMING.REVEAL_DURATION, ease: EASING.SMOOTH },
      revealAt
    );

    /* CENTER IMAGE (ACTIVE MOMENT) */
    scrollTL.to(
      imageCenter,
      {
        scale: 1,
        duration: TIMING.REVEAL_DURATION,
        ease: 'power3.out',
      },
      revealAt
    );

    /* RIGHT SKETCH */
    scrollTL.to(
      imageSketch,
      { x: 0, duration: TIMING.REVEAL_DURATION, ease: EASING.SMOOTH },
      revealAt
    );

    /* BOTTOM TEXT */
    scrollTL.to(
      textBottom,
      { y: 0, duration: TIMING.REVEAL_DURATION, ease: EASING.SMOOTH },
      revealAt
    );
  });

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
