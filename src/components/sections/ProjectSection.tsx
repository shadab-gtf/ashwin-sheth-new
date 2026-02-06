"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import useIsMobile from "@/hooks/useIsMobile";

// ─── Data ────────────────────────────────────────────────────────────────────

interface Project {
  title: string;
  slug: string;
  location: string;
  image: string;
  mobile_image: string;
  alt: string;
  description: string;
}

const PROJECTS: Project[] = [
  {
    title: "Montana",
    slug: "/projects/sheth-montana",
    location: "Mulund West",
    image: "/assets/images/project-1/project-3.webp",
    mobile_image: "/assets/images/project-1/project-3.webp",
    alt: "Sheth Montana",
    description:
      "Sheth Montana is a tranquil 7-acre haven in Mulund West, where classic elegance and modern design meet amid lush greenery and world-class amenities.",
  },
  {
    title: "Avalon",
    slug: "/projects/sheth-avalon",
    location: "Thane",
    image: "/assets/images/project-1/project-3.webp",
    mobile_image: "/assets/images/project-1/project-3.webp",
    alt: "Sheth Avalon",
    description:
      "Sheth Avalon stands as a luxurious icon on Thane's Platinum Belt, blending timeless design with modern comfort and elevated living.",
  },
  {
    title: "Edmont",
    slug: "/projects/sheth-edmont",
    location: "Kandivali West",
    image: "/assets/images/project-1/project-3.webp",
    mobile_image: "/assets/images/project-1/project-3.webp",
    alt: "Sheth Edmont",
    description:
      "Edmont by Ashwin Sheth Group is a 51-storey luxury icon in Kandivali West, featuring elite 2 & 3 BHK residences and 25+ lifestyle indulgences.",
  },
  {
    title: "Vasant Lawns",
    slug: "/projects/sheth-vasant",
    location: "Thane West",
    image: "/assets/images/project-1/project-4.webp",
    mobile_image: "/assets/images/project-1/project-4.webp",
    alt: "Sheth Vasant Lawns",
    description:
      "Vasant Lawns by Ashwin Sheth Group is a 7-acre green oasis in Thane West, offering spacious homes, 40% open spaces, and 40+ amenities.",
  },
];

export { PROJECTS };

// ─── Props ───────────────────────────────────────────────────────────────────

interface ProjectSectionProps {
  projectRef: React.RefObject<HTMLElement | null>;
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function ProjectSection({ projectRef }: ProjectSectionProps) {
  const [containerHeight, setContainerHeight] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const isMobile = useIsMobile(768);
  const numStrips = isMobile ? 1 : 25;

  useEffect(() => {
    const update = () => setContainerHeight(window.innerHeight);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Listen for active index changes from master timeline
  useEffect(() => {
    const handler = (e: Event) => {
      const idx = (e as CustomEvent).detail;
      if (typeof idx === "number") setActiveIndex(idx);
    };
    window.addEventListener("project-active-change", handler);
    return () => window.removeEventListener("project-active-change", handler);
  }, []);

  if (!containerHeight) return null;

  const stripeHeight = Math.ceil(containerHeight / numStrips);
  const getSrc = (p: Project) => (isMobile ? p.mobile_image : p.image);

  return (
    <section
      ref={projectRef}
      data-project-section
      className="absolute inset-0 w-full h-screen overflow-hidden opacity-0 pointer-events-none"
      style={{ zIndex: 62 }}
    >
      <div data-project-inner className="relative w-full h-full">

        {/* ── Striped Background Layers ── */}
        {PROJECTS.map((project, i) => (
          <div
            key={`stripes-${i}`}
            data-stripe-group={i}
            className="absolute inset-0"
            style={{ zIndex: i + 1 }}
          >
            {Array.from({ length: numStrips }).map((_, j) => (
              <div
                key={j}
                data-stripe
                className="absolute w-full overflow-hidden"
                style={{ top: `${j * stripeHeight}px` }}
              >
                <Image
                  src={getSrc(project)}
                  alt={project.alt}
                  width={1920}
                  height={containerHeight}
                  className="object-cover hidden md:block w-full"
                  style={{
                    position: "relative",
                    top: `-${j * stripeHeight}px`,
                    height: `${containerHeight}px`,
                  }}
                />
                <Image
                  src={getSrc(project)}
                  alt={project.alt}
                  fill
                  className="object-cover block md:hidden"
                />
              </div>
            ))}
          </div>
        ))}

        {/* ── Small Preview Images ── */}
        {PROJECTS.map((project, i) => (
          <div
            key={`preview-${i}`}
            data-small-image={i}
            className="absolute bottom-8 right-8 w-[180px] h-[240px] md:w-[220px] md:h-[300px] rounded-xl overflow-hidden shadow-2xl"
            style={{ zIndex: PROJECTS.length + 10 }}
          >
            <Image
              src={getSrc(project)}
              alt={project.alt}
              fill
              className="object-cover"
            />
          </div>
        ))}

        {/* ── Text Overlays ── */}
        {PROJECTS.map((project, i) => (
          <div
            key={`text-${i}`}
            data-project-text={i}
            className="absolute inset-0 flex flex-col justify-end p-8 md:p-16 pb-16 md:pb-24"
            style={{ zIndex: PROJECTS.length + 20, pointerEvents: "none" }}
          >
            <div data-project-title className="mb-4">
              <h2 className="text-white text-4xl md:text-6xl lg:text-7xl font-light leading-tight">
                {project.title}
              </h2>
              <p className="text-white/70 text-sm md:text-base tracking-[0.15em] mt-2 uppercase">
                {project.location}
              </p>
            </div>

            <div data-project-desc>
              <p className="text-white/80 text-sm md:text-base max-w-[500px] leading-relaxed">
                {project.description}
              </p>
              <a
                href={project.slug}
                className="inline-block mt-4 text-white text-sm tracking-[0.15em] uppercase border-b border-white/40 pb-1 hover:border-white transition-colors pointer-events-auto"
              >
                Discover More
              </a>
            </div>
          </div>
        ))}

        {/* ── Counter ── */}
        <div
          className="absolute top-8 right-8 md:top-12 md:right-16 text-white text-sm tracking-widest"
          style={{ zIndex: PROJECTS.length + 30 }}
        >
          <span>{String(activeIndex + 1).padStart(2, "0")}</span>
          <span className="text-white/40 mx-1">/</span>
          <span className="text-white/40">{String(PROJECTS.length).padStart(2, "0")}</span>
        </div>
      </div>
    </section>
  );
}

// ─── Timeline Builder ────────────────────────────────────────────────────────
// Called from MasterSequence — appends project stack transitions to the master timeline

export function createProjectTimeline(
  scrollTL: gsap.core.Timeline,
  projectRef: React.RefObject<HTMLElement | null>
) {
  const section = projectRef.current;
  if (!section) return;

  // ── Query all elements via data attributes ──
  const stripeGroups: HTMLElement[][] = [];
  const smallImages: HTMLElement[] = [];
  const titles: HTMLElement[] = [];
  const descs: HTMLElement[] = [];

  PROJECTS.forEach((_, i) => {
    const group = section.querySelector(`[data-stripe-group="${i}"]`);
    if (group) {
      stripeGroups.push(Array.from(group.querySelectorAll("[data-stripe]")) as HTMLElement[]);
    }

    const img = section.querySelector(`[data-small-image="${i}"]`) as HTMLElement;
    if (img) smallImages.push(img);

    const textBlock = section.querySelector(`[data-project-text="${i}"]`) as HTMLElement;
    if (textBlock) {
      const title = textBlock.querySelector("[data-project-title]") as HTMLElement;
      const desc = textBlock.querySelector("[data-project-desc]") as HTMLElement;
      if (title) titles.push(title);
      if (desc) descs.push(desc);
    }
  });

  // ── Compute dimensions ──
  const vh = window.innerHeight;
  const isMobile = window.innerWidth < 768;
  const numStrips = isMobile ? 1 : 25;
  const stripeHeight = Math.ceil(vh / numStrips);
  const stripDuration = isMobile ? 1.3 : 0.8;

  // ── Initial states ──
  // First project: fully visible
  stripeGroups[0]?.forEach((s) => gsap.set(s, { height: stripeHeight }));
  // Remaining projects: collapsed
  stripeGroups.slice(1).forEach((group) => {
    group.forEach((s) => gsap.set(s, { height: 0 }));
  });

  smallImages.forEach((el, i) => gsap.set(el, { yPercent: i === 0 ? 0 : 100 }));
  titles.forEach((el, i) => gsap.set(el, { autoAlpha: i === 0 ? 1 : 0, y: i === 0 ? 0 : 30 }));
  descs.forEach((el, i) => gsap.set(el, { autoAlpha: i === 0 ? 1 : 0, y: i === 0 ? 0 : 30 }));

  // ── Timing ──
  const HOLD = 1.5;

  // ── Build each project transition ──
  PROJECTS.forEach((_, i) => {
    const label = `proj_${i}`;
    scrollTL.addLabel(label);

    // Dispatch active index change
    scrollTL.call(() => {
      window.dispatchEvent(new CustomEvent("project-active-change", { detail: i }));
    }, undefined, label);

    if (i === 0) {
      // Just hold the first project
      scrollTL.to({}, { duration: HOLD });
      return;
    }

    // Stripe reveal — new project slides in via expanding stripes
    if (stripeGroups[i]) {
      scrollTL.to(
        stripeGroups[i],
        {
          height: stripeHeight,
          stagger: { each: 0.03, from: "end" },
          ease: "power2.out",
          duration: stripDuration,
        },
        label
      );
    }

    // Small image slides up
    if (smallImages[i]) {
      scrollTL.to(
        smallImages[i],
        { yPercent: 0, duration: 1.3, ease: "power2.inOut" },
        label
      );
    }

    // Previous text fades out
    if (titles[i - 1] && descs[i - 1]) {
      scrollTL.to(
        [titles[i - 1], descs[i - 1]],
        { autoAlpha: 0, y: -60, duration: 0.4, ease: "power2.in" },
        label
      );
    }

    // Current text fades in
    if (titles[i] && descs[i]) {
      scrollTL.to(
        [titles[i], descs[i]],
        { autoAlpha: 1, y: 0, duration: 0.5, ease: "power3.out" },
        `${label}+=0.3`
      );
    }

    // Hold so user can read
    scrollTL.to({}, { duration: HOLD });
  });

  // Brief hold on last project then signal completion
  scrollTL.to({}, { duration: 1.0 });
  scrollTL.addLabel("projects_complete");
}