import { gsap } from "gsap";

export function createProjectsTimeline(
  scrollTL,
  {
    stripes,
    images,
    titles,
    descriptions,
    projectsCount,
    containerHeight,
    numStrips,
    stripDuration,
    onIndexChange,
  }
) {
  const stripeHeight = Math.ceil(containerHeight / numStrips);

  // Initial states
  images.current.forEach((el, i) => {
    gsap.set(el, { yPercent: i === 0 ? 0 : 100 });
  });

  titles.current.forEach((el, i) => {
    gsap.set(el, { autoAlpha: i === 0 ? 1 : 0, y: 20 });
  });

  descriptions.current.forEach((el, i) => {
    gsap.set(el, { autoAlpha: i === 0 ? 1 : 0, y: 20 });
  });

  stripes.current.forEach((projectStripes, i) => {
    gsap.set(projectStripes, {
      height: i === 0 ? stripeHeight : 0,
    });
  });

  // Animations
  for (let i = 1; i < projectsCount; i++) {
    scrollTL.call(() => onIndexChange(i));

    scrollTL.to(stripes.current[i], {
      height: stripeHeight,
      stagger: { each: 0.03, from: "end" },
      duration: stripDuration,
      ease: "power2.out",
    });

    scrollTL.to(
      images.current[i],
      { yPercent: 0, duration: 1.2, ease: "power2.inOut" },
      "<"
    );

    scrollTL.to(
      [titles.current[i - 1], descriptions.current[i - 1]],
      { autoAlpha: 0, y: -120, duration: 0.25 },
      "<"
    );

    scrollTL.to(
      [titles.current[i], descriptions.current[i]],
      { autoAlpha: 1, y: 0, duration: 0.25 },
      "<"
    );

    scrollTL.to({}, { duration: 1 });
  }
}
