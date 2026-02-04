import gsap from 'gsap';

/* =========================================================
    OBSERVER / AUTO REVEAL
========================================================= */
export function createObserverCircleReveal(
  circleEl: HTMLDivElement,
  bgColor: string,
  options: {
    onComplete?: () => void;
    onProgress?: (progress: number) => void;
  } = {}
) {
  gsap.set(circleEl, {
    backgroundColor: bgColor,
    opacity: 1,
    clipPath: 'circle(0% at 50% 50%)',
    willChange: 'clip-path',
  });

  const tl = gsap.timeline({
    onUpdate() {
      options.onProgress?.(this.progress());
    },
    onComplete: options.onComplete,
  });

  tl.to(circleEl, {
    clipPath: 'circle(150% at 50% 50%)',
    duration: 1.2,
    ease: 'power3.inOut',
  }).to(
    circleEl,
    {
      opacity: 0,
      duration: 0.4,
      ease: 'power2.out',
    },
    '-=0.25'
  );

  return tl;
}

/* =========================================================
   SCROLL-TRIGGERED BOTTOM REVEAL (LOGIC FIXED)
========================================================= */
export function createCircleReveal(
  tl: gsap.core.Timeline,
  circleEl: HTMLDivElement,
  bgColor: string,
  label: string
) {
  tl.add(() => {
    gsap.set(circleEl, {
      backgroundColor: bgColor,
      opacity: 1,
      clipPath: 'circle(0% at 50% 100%)',
      willChange: 'clip-path',
    });

    gsap.timeline()
      .to(circleEl, {
        clipPath: 'circle(150% at 50% 100%)',
        duration: 1.2,
        ease: 'power3.inOut',
      })
      .to(
        circleEl,
        {
          opacity: 0,
          duration: 3,
          ease: 'power2.out',
        },
        '-=1'
      );
  }, label);
}

/* =========================================================
   CENTER REVEAL 
========================================================= */
export function createCircleRevealCenter(
  tl: gsap.core.Timeline,
  circleEl: HTMLDivElement,
  bgColor: string,
  label: string
) {
  tl.add(() => {
    gsap.set(circleEl, {
      backgroundColor: bgColor,
      opacity: 1,
      clipPath: 'circle(0% at 50% 50%)',
      willChange: 'clip-path',
    });

    gsap.timeline()
      .to(circleEl, {
        clipPath: 'circle(150% at 50% 50%)',
        duration: 1.2,
        ease: 'power3.inOut',
      })
      .to(
        circleEl,
        {
          opacity: 0,
          duration: 0.4,
          ease: 'power2.out',
        },
        '-=0.25'
      );
  }, label);
}

/* =========================================================
  NO-FADE VERSION (STAYS VISIBLE)
========================================================= */
export function createCircleRevealNoFade(
  tl: gsap.core.Timeline,
  circleEl: HTMLDivElement,
  bgColor: string,
  label: string
) {
  tl.add(() => {
    gsap.set(circleEl, {
      backgroundColor: bgColor,
      opacity: 1,
      clipPath: 'circle(0% at 50% 100%)',
      willChange: 'clip-path',
    });

    gsap.timeline().to(circleEl, {
      clipPath: 'circle(150% at 50% 100%)',
      duration: 2,
      ease: 'power3.inOut',
    });
  }, label);
}
