"use client";

import Image from "next/image";
import React from "react";
import gsap from "gsap";
import Link from "next/link";

/* ======================================================
   TIMELINE (NAMED EXPORT)
====================================================== */
export function createProjectTimeline3(
  scrollTL: gsap.core.Timeline,
  sliderRefs: {
    slider: React.RefObject<HTMLDivElement | null>;
  },
  projectRefs: {
    project3: React.RefObject<HTMLDivElement | null>;
    circleProject3: React.RefObject<HTMLDivElement | null>;
    projectCard3: React.RefObject<HTMLDivElement | null>;
  }
) {
  if (
    !projectRefs.project3.current ||
    !projectRefs.circleProject3.current ||
    !projectRefs.projectCard3.current
  )
    return;

  /* ---------- INITIAL STATES ---------- */
  /* ---------- INITIAL STATES ---------- */
  gsap.set(projectRefs.project3.current, {
    opacity: 0,
    visibility: "hidden", // Prevent ghost blocking
    pointerEvents: "none",
  });

  gsap.set(projectRefs.projectCard3.current, {
    opacity: 0,
    x: 120,
    willChange: "transform, opacity",
  });

  // ⬇️ START FROM BOTTOM
  gsap.set(projectRefs.circleProject3.current, {
    opacity: 0,
    clipPath: "circle(0% at 50% 100%)",
    backgroundColor: "#fff",
    willChange: "clip-path",
  });

  scrollTL.addLabel("project_reveal");

  /* ---------- SLIDER FADE OUT ---------- */
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

  /* ---------- BACKGROUND ENTER ---------- */
  scrollTL.to(
    projectRefs.project3.current,
    {
      opacity: 1,
      visibility: "visible",
      duration: 0.5,
      ease: "power3.out",
      pointerEvents: "none",
    },
    "project_reveal+=0.3"
  );

  /* ---------- CARD ENTER (FIRST) ---------- */
  scrollTL.to(
    projectRefs.projectCard3.current,
    {
      opacity: 1,
      x: 0,
      duration: 1.2,
      ease: "power3.out",
    },
    "project_reveal+=0.45"
  );

  /* ---------- WHITE CIRCLE REVEAL (AFTER CARD) ---------- */
  scrollTL.to(
    projectRefs.circleProject3.current,
    {
      opacity: 1,
      clipPath: "circle(150% at 50% 100%)",
      duration: 3,
      ease: "power3.inOut",
    },
    "project_reveal+=1"
  );

  /* ---------- HOLD ---------- */
  scrollTL.to({}, { duration: 2 });
}

/* ======================================================
   COMPONENT (DEFAULT EXPORT)
====================================================== */
interface ProjectSectionProps {
  projectRef: React.RefObject<HTMLDivElement | null>;
  circleProjectRef: React.RefObject<HTMLDivElement | null>;
  projectCardRef: React.RefObject<HTMLDivElement | null>;
}

export default function ProjectSection3({
  projectRef,
  circleProjectRef,
  projectCardRef,
}: ProjectSectionProps) {
  return (
    <>
      {/* BACKGROUND */}
      <section
        ref={projectRef}
        className="fixed inset-0 z-[80] opacity-0 pointer-events-none"
      >
        <Image
          src="/assets/images/project-1/fernbg.jpg"
          alt="Project Background"
          fill
          priority
          className="object-fill"
        />

        {/* RIGHT FLOATING CARD */}
        <div
          ref={projectCardRef}
          className="
            absolute right-6 top-1/2 -translate-y-1/2
            w-[340px] sm:w-[360px]
            bg-white  shadow-xl
            overflow-hidden
            pointer-events-none
          "
        >
          {/* Card Image */}
          <div className="relative w-full h-[300px]">
            <Image
              src="/assets/images/project-1/project-4.webp"
              alt="One Marina"
              fill
              className="object-cover"
            />
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 py-3">
            {[1, 2, 3, 4, 5].map((_, i) => (
              <span
                key={i}
                className={`w-2 h-2 rounded-full ${i === 0 ? "bg-blue-600" : "bg-gray-300"
                  }`}
              />
            ))}
          </div>

          {/* Text */}
          <div className="px-6 pb-6 text-center">
            <h3 className="text-xl font-light text-black tracking-widest">
              FERN
            </h3>
            <p className="text-xs tracking-[0.3em] mt-1 text-gray-500">
              THANE WEST
            </p>

            <Link href="/projects" className="mt-6 inline-block text-sm  tracking-widest text-blue-700 hover:underline pointer-events-auto">
              VIEW PROJECT
            </Link>
          </div>
        </div>
      </section>

      {/* ENTRY CIRCLE */}
      <div
        ref={circleProjectRef}
        className="fixed inset-0 z-[85] pointer-events-none opacity-0"
        style={{
          clipPath: "circle(0% at 50% 100%)",
          backgroundColor: "#FEF7F0",
        }}
      />
    </>
  );
}
