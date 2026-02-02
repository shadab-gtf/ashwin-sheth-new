import gsap from 'gsap';

export function createHorizontalSliderTimeline(
  scrollTL: gsap.core.Timeline,
  sliderRef: React.RefObject<HTMLDivElement>,
  circleFinalRef: React.RefObject<HTMLDivElement>
) {
  const slides = gsap.utils.toArray<HTMLElement>('.slide');
  const track = sliderRef.current!.querySelector('.slider-track')!;
  const progressBar =
    sliderRef.current!.querySelector('.progress-bar')!;

  scrollTL.to(track, {
    xPercent: -100 * (slides.length - 1),
    ease: 'none',
    duration: slides.length,
  });

  scrollTL.to(
    progressBar,
    {
      scaleX: 1,
      ease: 'none',
      duration: slides.length,
    },
    0
  );

  scrollTL.fromTo(
    circleFinalRef.current,
    { scale: 0, opacity: 0 },
    {
      scale: 30,
      opacity: 1,
      duration: 1,
      ease: 'power4.inOut',
    }
  );
}
