export function createProjectTimeline(
  scrollTL: gsap.core.Timeline,
  sliderRefs: {
    slider: React.RefObject<HTMLDivElement | null>;
  },
  projectRefs: {
    project: React.RefObject<HTMLDivElement | null>;
    circleProject: React.RefObject<HTMLDivElement | null>;
    projectCard: React.RefObject<HTMLDivElement | null>; // 🔥 NEW
  }
) {
  if (
    !projectRefs.project.current ||
    !projectRefs.circleProject.current ||
    !projectRefs.projectCard.current
  )
    return;

  /* ----------------------------------
     INITIAL STATES (REVERSE SAFE)
  ---------------------------------- */
  gsap.set(projectRefs.project.current, {
    opacity: 0,
    pointerEvents: "none",
  });

  gsap.set(projectRefs.projectCard.current, {
    opacity: 0,
    x: 120,
    willChange: "transform, opacity",
  });

  gsap.set(projectRefs.circleProject.current, {
    opacity: 0,
    clipPath: "circle(0% at 50% 50%)",
    backgroundColor: "#fff",
    willChange: "clip-path",
  });

  scrollTL.addLabel("project_reveal");

  /* ----------------------------------
     SLIDER FADE OUT
  ---------------------------------- */
  if (sliderRefs.slider.current) {
    scrollTL.to(
      sliderRefs.slider.current,
      {
        opacity: 0,
        duration: 0.7,
        ease: "power3.in",
      },
      "project_reveal"
    );
  }

  /* ----------------------------------
     CINEMATIC DARK CIRCLE
  ---------------------------------- */
  scrollTL.to(
    projectRefs.circleProject.current,
    {
      opacity: 1,
      clipPath: "circle(150% at 50% 50%)",
      duration: 1.25,
      ease: "power3.inOut",
    },
    "project_reveal+=0.15"
  );

  /* ----------------------------------
     PROJECT BACKGROUND ENTER
  ---------------------------------- */
  scrollTL.to(
    projectRefs.project.current,
    {
      opacity: 1,
      duration: 0.9,
      ease: "power3.out",
      pointerEvents: "none",
    },
    "project_reveal+=0.45"
  );

  /* ----------------------------------
     🔥 PROJECT CARD REVEAL (IMAGE UI)
  ---------------------------------- */
  scrollTL.to(
    projectRefs.projectCard.current,
    {
      opacity: 1,
      x: 0,
      duration: 0.85,
      ease: "power3.out",
    },
    "project_reveal+=0.65"
  );

  /* ----------------------------------
     HOLD (USER INTERACTION SPACE)
  ---------------------------------- */
  scrollTL.to({}, { duration: 1.5 });
}
