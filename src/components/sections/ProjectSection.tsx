// "use client";

// import { useRef, useEffect, useState } from "react";
// import Image from "next/image";
// import gsap from "gsap";
// import useIsMobile from "@/hooks/useIsMobile";

// // ─── Data ────────────────────────────────────────────────────────────────────

// interface Project {
//   title: string;
//   slug: string;
//   location: string;
//   image: string;
//   mobile_image: string;
//   alt: string;
//   description: string;
// }

// const PROJECTS: Project[] = [
//   {
//     title: "Montana",
//     slug: "/projects/sheth-montana",
//     location: "Mulund West",
//     image: "/assets/images/projects/project-1.webp",
//     mobile_image: "/assets/images/projects/mobile/project-1.webp",
//     alt: "Seth Zuri",
//     description:
//       "Sheth Montana is a tranquil 7-acre haven in Mulund West, where classic elegance and modern design meet amid lush greenery and world-class amenities.",
//   },
//   {
//     title: "Avalon",
//     slug: "/projects/sheth-avalon",
//     location: "Thane",
//     image: "/assets/images/projects/project-2.webp",
//     mobile_image: "/assets/images/projects/mobile/project-2.webp",
//     alt: "Project 2",
//     description:
//       "Sheth Avalon stands as a luxurious icon on Thane’s Platinum Belt, blending timeless design with modern comfort and elevated living.",
//   },
//   {
//     title: "Edmont",
//     slug: "/projects/sheth-edmont",
//     location: "Kandivali West",
//     image: "/assets/images/projects/project-3.webp",
//     mobile_image: "/assets/images/projects/mobile/project-3.webp",
//     alt: "Project 3",
//     description:
//       "Edmont by Ashwin Sheth Group is a 51-storey luxury icon in Kandivali West, featuring elite 2 & 3 BHK residences and 25+ lifestyle indulgences.",
//   },
//   {
//     title: "Vasant Lawns",
//     slug: "/projects/sheth-vasant",
//     location: "Thane West",
//     image: "/assets/images/projects/project-4.webp",
//     mobile_image: "/assets/images/projects/mobile/project-4.webp",
//     alt: "Project 4",
//     description:
//       "Vasant Lawns by Ashwin Sheth Group is a 7-acre green oasis in Thane West, offering spacious homes, 40% open spaces, and 40+ amenities.",
//   },
// ];

// export { PROJECTS };

// // ─── Props ───────────────────────────────────────────────────────────────────

// interface ProjectSectionProps {
//   projectRef: React.RefObject<HTMLElement | null>;
// }

// // ─── Component ───────────────────────────────────────────────────────────────

// export default function ProjectSection({ projectRef }: ProjectSectionProps) {
//   const [containerHeight, setContainerHeight] = useState(0);
//   const [activeIndex, setActiveIndex] = useState(0);

//   const isMobile = useIsMobile(768);
//   const numStrips = isMobile ? 1 : 25;

//   useEffect(() => {
//     const update = () => setContainerHeight(window.innerHeight);
//     update();
//     window.addEventListener("resize", update);
//     return () => window.removeEventListener("resize", update);
//   }, []);

//   // Listen for active index changes from master timeline
//   useEffect(() => {
//     const handler = (e: Event) => {
//       const idx = (e as CustomEvent).detail;
//       if (typeof idx === "number") setActiveIndex(idx);
//     };
//     window.addEventListener("project-active-change", handler);
//     return () => window.removeEventListener("project-active-change", handler);
//   }, []);

//   if (!containerHeight) return null;

//   const stripeHeight = Math.ceil(containerHeight / numStrips);
//   const getSrc = (p: Project) => (isMobile ? p.mobile_image : p.image);

//   return (
//      <section
//       ref={projectRef}
//       data-project-section
//       className="relative w-full h-screen overflow-hidden"
//     >
//       {/* Stripes */}
//       {PROJECTS.map((project, i) => (
//         <div
//           key={`stripes-${i}`}
//           data-stripe-group={i}
//           className="absolute inset-0"
//           style={{ zIndex: i + 1 }}
//         >
//           {Array.from({ length: numStrips }).map((_, j) => (
//             <div
//               key={j}
//               data-stripe
//               className="absolute w-full overflow-hidden"
//               style={{ top: `${j * stripeHeight}px` }}
//             >
//               <Image
//                 src={getSrc(project)}
//                 alt={project.alt}
//                 width={1920}
//                 height={containerHeight}
//                 className="object-cover hidden md:block w-full"
//                 style={{ top: `-${j * stripeHeight}px`, position: "relative" }}
//               />
//               <Image
//                 src={getSrc(project)}
//                 alt={project.alt}
//                 fill
//                 className="object-cover block md:hidden"
//               />
//             </div>
//           ))}
//         </div>
//       ))}

//       {/* FOREGROUND BOX */}
//       {/* FOREGROUND BOXES */}
// {PROJECTS.map((project, i) => (
//   <div
//     key={`foreground-${i}`}
//     data-small-image={i}
//     data-project-text={i}
//     className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] md:w-[500px] min-h-[60vh] max-h-[95vh] bg-white p-5 text-center z-[50] flex flex-col items-center justify-center overflow-hidden"
//   >
//     <h4 className="text-[14px] md:text-[16px] font-medium">Key Projects</h4>
//     <div className="flex gap-2 mt-2 text-sm">
//       <span className="data-counter-current">{String(i + 1).padStart(2, "0")}</span>
//       <span className="opacity-60">/</span>
//       <span className="opacity-60">{String(PROJECTS.length).padStart(2, "0")}</span>
//     </div>

//     {/* Small Image */}
//     <div data-small-image={i} className="relative w-full h-[250px] md:w-[400px] md:h-[300px] my-4 rounded-md overflow-hidden">
//       <Image
//         src={getSrc(project)}
//         alt={project.alt}
//         fill
//         className="object-cover rounded-md"
//       />
//     </div>

//     {/* Text */}
//     <h2 data-project-title className="uppercase text-xl md:text-2xl font-semibold">{project.title}</h2>
//     <p data-project-desc className="text-sm md:text-base text-black/70">{project.location}</p>
//     <p data-project-desc className="mt-2 text-sm md:text-base max-w-[400px]">{project.description}</p>

//     <a
//       href={project.slug}
//       className="mt-4 inline-block border-b border-black/30 pb-1 uppercase text-sm md:text-base"
//     >
//       Discover More
//     </a>
//   </div>
// ))}

//     </section>
//   );
// }

// // ─── Timeline Builder ────────────────────────────────────────────────────────
// // Called from MasterSequence — appends project stack transitions to the master timeline

// export function createProjectTimeline(
//   scrollTL: gsap.core.Timeline,
//   projectRef: React.RefObject<HTMLElement | null>
// ) {
//   const section = projectRef.current;
//   if (!section) return;

//   // ── Query all elements via data attributes ──
//   const stripeGroups: HTMLElement[][] = [];
//   const smallImages: HTMLElement[] = [];
//   const titles: HTMLElement[] = [];
//   const descs: HTMLElement[] = [];

//   PROJECTS.forEach((_, i) => {
//     const group = section.querySelector(`[data-stripe-group="${i}"]`);
//     if (group) {
//       stripeGroups.push(Array.from(group.querySelectorAll("[data-stripe]")) as HTMLElement[]);
//     }

//     const img = section.querySelector(`[data-small-image="${i}"]`) as HTMLElement;
//     if (img) smallImages.push(img);

//     const textBlock = section.querySelector(`[data-project-text="${i}"]`) as HTMLElement;
//     if (textBlock) {
//       const title = textBlock.querySelector("[data-project-title]") as HTMLElement;
//       const desc = textBlock.querySelector("[data-project-desc]") as HTMLElement;
//       if (title) titles.push(title);
//       if (desc) descs.push(desc);
//     }
//   });

//   // ── Compute dimensions ──
//   const vh = window.innerHeight;
//   const isMobile = window.innerWidth < 768;
//   const numStrips = isMobile ? 1 : 25;
//   const stripeHeight = Math.ceil(vh / numStrips);
//   const stripDuration = isMobile ? 1.3 : 0.8;

//   // ── Initial states ──
//   // First project: fully visible
//   stripeGroups[0]?.forEach((s) => gsap.set(s, { height: stripeHeight }));
//   // Remaining projects: collapsed
//   stripeGroups.slice(1).forEach((group) => {
//     group.forEach((s) => gsap.set(s, { height: 0 }));
//   });

//   smallImages.forEach((el, i) => gsap.set(el, { yPercent: i === 0 ? 0 : 100 }));
//   titles.forEach((el, i) => gsap.set(el, { autoAlpha: i === 0 ? 1 : 0, y: i === 0 ? 0 : 30 }));
//   descs.forEach((el, i) => gsap.set(el, { autoAlpha: i === 0 ? 1 : 0, y: i === 0 ? 0 : 30 }));

//   // ── Timing ──
//   const HOLD = 1.5;

//   // ── Build each project transition ──
//   PROJECTS.forEach((_, i) => {
//     const label = `proj_${i}`;
//     scrollTL.addLabel(label);

//     // Dispatch active index change
//     scrollTL.call(() => {
//       window.dispatchEvent(new CustomEvent("project-active-change", { detail: i }));
//     }, undefined, label);

//     if (i === 0) {
//       // Just hold the first project
//       scrollTL.to({}, { duration: HOLD });
//       return;
//     }

//     // Stripe reveal — new project slides in via expanding stripes
//     if (stripeGroups[i]) {
//       scrollTL.to(
//         stripeGroups[i],
//         {
//           height: stripeHeight,
//           stagger: { each: 0.03, from: "end" },
//           ease: "power2.out",
//           duration: stripDuration,
//         },
//         label
//       );
//     }

//     // Small image slides up
//     if (smallImages[i]) {
//       scrollTL.to(
//         smallImages[i],
//         { yPercent: 0, duration: 1.3, ease: "power2.inOut" },
//         label
//       );
//     }

//     // Previous text fades out
//     if (titles[i - 1] && descs[i - 1]) {
//       scrollTL.to(
//         [titles[i - 1], descs[i - 1]],
//         { autoAlpha: 0, y: -60, duration: 0.4, ease: "power2.in" },
//         label
//       );
//     }

//     // Current text fades in
//     if (titles[i] && descs[i]) {
//       scrollTL.to(
//         [titles[i], descs[i]],
//         { autoAlpha: 1, y: 0, duration: 0.5, ease: "power3.out" },
//         `${label}+=0.3`
//       );
//     }

//     // Hold so user can read
//     scrollTL.to({}, { duration: HOLD });
//   });

//   // Brief hold on last project then signal completion
//   scrollTL.to({}, { duration: 1.0 });
//   scrollTL.addLabel("projects_complete");
// }




"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import useIsMobile from "@/hooks/useIsMobile";
import Heading from "../common/typography/Heading";
import Pera from "../common/typography/Pera";
import ViewMore from "../common/Buttons/ViewMore";
import ScrollTo from "../common/Buttons/ScrollTo";

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

const PROJECTS: Project[] = [   {
    title: "Avalon",
    slug:"/projects/sheth-avalon",
    location:"Thane",
    image: "/assets/images/projects/project-2.webp",
    mobile_image: "/assets/images/projects/mobile/project-2.webp",
    alt: "Project 2",
    description: "Sheth Avalon stands as a luxurious icon on Thane’s Platinum Belt, blending timeless design with modern comfort and elevated living.",
  },
  {
    title: "Edmont",
    slug:"/projects/sheth-edmont",
    location:"Kandivali West",
    image: "/assets/images/projects/project-3.webp",
    mobile_image: "/assets/images/projects/mobile/project-3.webp",
    alt: "Project 3",
    description: "Edmont by Ashwin Sheth Group is a 51-storey luxury icon in Kandivali West, featuring elite 2 & 3 BHK residences and 25+ lifestyle indulgences.",
  },
  {
    title: "Fern",
    slug:"/projects/sheth-vasant",
    location:"Thane West",
    image: "/assets/images/projects/project-4.webp",
    mobile_image: "/assets/images/projects/mobile/project-4.webp",
    alt: "Project 4",
    description: "Fern by Ashwin Sheth Group is a 7-acre green oasis in Thane West, offering spacious homes, 40% open spaces, and 40+ amenities.",
  },
  {
    title: "One Marina",
    slug:"/projects/sheth-vasant",
    location:"Marine Drive",
    image: "/assets/images/projects/project-5.webp",
    mobile_image: "/assets/images/projects/mobile/project-5.webp",
    alt: "Project 4",
    description:"Set along Marine Drive, One Marina offers thoughtfully crafted residences with uninterrupted sea views.",
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
        
      <Pera className="absolute hidden md:block bottom-[50px] right-[50px] text-white md:text-[20px] z-11">( Keep Scrolling )</Pera>

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

        <div className="absolute bg-white p-5 text-center w-[90%] md:w-[400px] 2xl:w-[500px] min-h-[60vh] max-h-[70vh] md:max-h-[95vh] md:mt-[20px] 2xl:mt-[0] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden z-[10] will-change-transform">
        <Heading className="!text-[14px] !leading-[20px]">Key Projects</Heading>
        <div className="flex justify-center gap-[5px] text-black">
          {/* <Pera>{String(activeIndex + 1).padStart(2, "0")}</Pera>-
          <Pera className="opacity-60">{String(projects.length).padStart(2, "0")}</Pera> */}
          
          <span>{String(activeIndex + 1).padStart(2, "0")}</span>
          <span className="text-black mx-1">-</span>
          <span className="text-black">{String(PROJECTS.length).padStart(2, "0")}</span>
        </div>
        
        {/* Titles */}
        <div className="w-full relative h-[70px] overflow-hidden">
           {/* ── Text Overlays ── */}
        {PROJECTS.map((project, i) => (
          <div
  key={`text-${i}`}
  data-project-title-wrap={i}
  className="absolute inset-0 flex items-center justify-center"
>
  <div data-project-title>
    <h2 className="text-[#0D4DA1] text-[20px] md:text-[28px] font-normal leading-tight">
      {project.title}
    </h2>
    <p className="text-black text-[14px] leading-[22px] tracking-[0.15em] uppercase">
      {project.location}
    </p>
  </div>
</div>
        ))}


        </div>

        
        <div className="w-full project-forground h-[250px] md:w-[300px] 2xl:w-[400px] md:h-[250px] 2xl:h-[320px] relative my-[10px] 2xl:my-[30px] mx-auto overflow-hidden">
{/* ── Small Preview Images ── */}
        {PROJECTS.map((project, i) => (
            <div key={i} className="absolute inset-0">
          <div
            key={`preview-${i}`}
            data-small-image={i}
            className="w-full h-full relative"
            // style={{ zIndex: PROJECTS.length + 10 }}
            style={{ zIndex: 10 + i }}
          >
            <Image
              src={project?.mobile_image}
              alt={project.alt}
                  fill
                  className="object-fit rounded-md"
            />
          </div>
          </div>
        ))}


        </div>
        {/* Description  */}
        <div className="w-full relative h-[100px] overflow-hidden">
          {PROJECTS.map((project, i) => (
            <div
  key={`description-${i}`}
  data-project-desc-wrap={i}
  className="absolute inset-0 flex items-center justify-center"
>
  <div data-project-desc>
    <p className="text-black text-[12px] md:text-[14px] 2xl:text-[16px] max-w-[500px] leading-relaxed">
      {project.description}
    </p>
  </div>
</div>
          ))}
        </div>
        <ViewMore link={PROJECTS[activeIndex].slug} text="Discover More" className="mx-auto 2xl:mt-[10px] text-[14px] md:!text-[16px]"/>

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

  // ─────────────────────────────────────────────
  // Query elements
  // ─────────────────────────────────────────────
  const stripeGroups: HTMLElement[][] = [];
  const smallImages: HTMLElement[] = [];
  const titleWraps: HTMLElement[] = [];
  const descWraps: HTMLElement[] = [];

  PROJECTS.forEach((_, i) => {
    // Stripe groups
    const group = section.querySelector(`[data-stripe-group="${i}"]`);
    if (group) {
      stripeGroups.push(
        Array.from(group.querySelectorAll("[data-stripe]")) as HTMLElement[]
      );
    }

    // Small images
    const img = section.querySelector(
      `[data-small-image="${i}"]`
    ) as HTMLElement | null;
    if (img) smallImages.push(img);

    // Title + description wrappers
    const titleWrap = section.querySelector(
      `[data-project-title-wrap="${i}"]`
    ) as HTMLElement | null;

    const descWrap = section.querySelector(
      `[data-project-desc-wrap="${i}"]`
    ) as HTMLElement | null;

    if (titleWrap) titleWraps.push(titleWrap);
    if (descWrap) descWraps.push(descWrap);
  });

  // ─────────────────────────────────────────────
  // Layout calculations
  // ─────────────────────────────────────────────
  const vh = window.innerHeight;
  const isMobile = window.innerWidth < 768;
  const numStrips = isMobile ? 1 : 25;
  const stripeHeight = Math.ceil(vh / numStrips);
  const stripDuration = isMobile ? 1.3 : 0.8;

  // ─────────────────────────────────────────────
  // Initial states
  // ─────────────────────────────────────────────
  stripeGroups[0]?.forEach((s) =>
    gsap.set(s, { height: stripeHeight })
  );

  stripeGroups.slice(1).forEach((group) =>
    group.forEach((s) => gsap.set(s, { height: 0 }))
  );

  smallImages.forEach((el, i) =>
    gsap.set(el, { yPercent: i === 0 ? 0 : 100 })
  );

  titleWraps.forEach((el, i) =>
    gsap.set(el, {
      autoAlpha: i === 0 ? 1 : 0,
      y: i === 0 ? 0 : 60,
    })
  );

  descWraps.forEach((el, i) =>
    gsap.set(el, {
      autoAlpha: i === 0 ? 1 : 0,
      y: i === 0 ? 0 : 60,
    })
  );

  // ─────────────────────────────────────────────
  // Timing
  // ─────────────────────────────────────────────
  const HOLD = 2.2;

  // ─────────────────────────────────────────────
  // Build timeline
  // ─────────────────────────────────────────────
  PROJECTS.forEach((_, i) => {
    const label = `project_${i}`;
    scrollTL.addLabel(label);

    // Active index event
    scrollTL.call(
      () => {
        window.dispatchEvent(
          new CustomEvent("project-active-change", { detail: i })
        );
      },
      undefined,
      label
    );

    // First project: just hold
    if (i === 0) {
      scrollTL.to({}, { duration: HOLD });
      return;
    }

    // ── Stripe reveal
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

    // ── Image slide
    if (smallImages[i]) {
      scrollTL.to(
        smallImages[i],
        {
          yPercent: 0,
          duration: 1.3,
          ease: "power2.inOut",
        },
        label
      );
    }

    // ── Previous text OUT
    scrollTL.to(
      [titleWraps[i - 1], descWraps[i - 1]],
      {
        autoAlpha: 0,
        y: -60,
        duration: 0.6,
        ease: "power3.in",
      },
      label
    );

    // ── Current text IN
    scrollTL.to(
      [titleWraps[i], descWraps[i]],
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      },
      `${label}+=0.35`
    );

    // Hold
    scrollTL.to({}, { duration: HOLD });
  });

  // End buffer
  scrollTL.to({}, { duration: 1 });
  scrollTL.addLabel("projects_complete");
}
