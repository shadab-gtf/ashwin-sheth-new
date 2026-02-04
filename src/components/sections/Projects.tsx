"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Pera from "@/components/common/typography/Pera";
import Heading from "@/components/common/typography/Heading";
import useIsMobile from "@/hooks/useIsMobile";
import ScrollTo from "@/components/common/Buttons/ScrollTo";
import ViewMore from "@/components/common/Buttons/ViewMore";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  title: string;
  slug: string;
  location: string;
  image: string;
  mobile_image: string;
  alt: string;
  description: string;
}

const projects: Project[] = [
  {
    title: "Montana",
    slug: "/projects/sheth-montana",
    location: "Mulund West",
    image: "/assets/images/projects/project-1.webp",
    mobile_image: "/assets/images/projects/mobile/project-1.webp",
    alt: "Seth Zuri",
    description:
      "Sheth Montana is a tranquil 7-acre haven in Mulund West, where classic elegance and modern design meet amid lush greenery and world-class amenities.",
  },
  {
    title: "Avalon",
    slug: "/projects/sheth-avalon",
    location: "Thane",
    image: "/assets/images/projects/project-2.webp",
    mobile_image: "/assets/images/projects/mobile/project-2.webp",
    alt: "Project 2",
    description:
      "Sheth Avalon stands as a luxurious icon on Thane’s Platinum Belt, blending timeless design with modern comfort and elevated living.",
  },
  {
    title: "Edmont",
    slug: "/projects/sheth-edmont",
    location: "Kandivali West",
    image: "/assets/images/projects/project-3.webp",
    mobile_image: "/assets/images/projects/mobile/project-3.webp",
    alt: "Project 3",
    description:
      "Edmont by Ashwin Sheth Group is a 51-storey luxury icon in Kandivali West, featuring elite 2 & 3 BHK residences and 25+ lifestyle indulgences.",
  },
  {
    title: "Vasant Lawns",
    slug: "/projects/sheth-vasant",
    location: "Thane West",
    image: "/assets/images/projects/project-4.webp",
    mobile_image: "/assets/images/projects/mobile/project-4.webp",
    alt: "Project 4",
    description:
      "Vasant Lawns by Ashwin Sheth Group is a 7-acre green oasis in Thane West, offering spacious homes, 40% open spaces, and 40+ amenities.",
  },
];

export default function Projects() {
  const containerRef = useRef<HTMLElement | null>(null);
  const smallImageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const titleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const descRefs = useRef<(HTMLDivElement | null)[]>([]);
  const stripeRefs = useRef<(HTMLDivElement | null)[][]>([]);

  const [containerHeight, setContainerHeight] = useState<number>(0);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const isMobile = useIsMobile(768);
  const numStrips = isMobile ? 1 : 25;
  const stripDuration = isMobile ? 1.3 : 0.8;

  /* Track viewport height */
  useEffect(() => {
    const updateHeight = () => setContainerHeight(window.innerHeight);
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  /* GSAP logic */
  useEffect(() => {
    if (!containerRef.current || !containerHeight) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          id: "projects",
          trigger: containerRef.current,
          start: "top top",
          end: `+=${projects.length * window.innerHeight}`,
          scrub: true,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const index = Math.floor(self.progress * projects.length);
            setActiveIndex(Math.min(index, projects.length - 1));
          },
        },
      });

      smallImageRefs.current.forEach((el, i) =>
        gsap.set(el, { yPercent: i === 0 ? 0 : 100 })
      );

      titleRefs.current.forEach((el, i) =>
        gsap.set(el, { autoAlpha: i === 0 ? 1 : 0, y: i === 0 ? 0 : 20 })
      );

      descRefs.current.forEach((el, i) =>
        gsap.set(el, { autoAlpha: i === 0 ? 1 : 0, y: i === 0 ? 0 : 20 })
      );

      const stripeHeight = Math.ceil(containerHeight / numStrips);

      stripeRefs.current.forEach((stripes, i) => {
        if (!stripes) return;
        gsap.set(stripes, { height: i === 0 ? stripeHeight : 0 });
      });

      projects.forEach((_, i) => {
        if (i === 0) return;
        const stripes = stripeRefs.current[i];
        if (!stripes) return;

        tl.to(stripes, {
          height: stripeHeight,
          stagger: { each: 0.03, from: "end" },
          ease: "power2.out",
          duration: stripDuration,
        });

        tl.to(
          smallImageRefs.current[i],
          { yPercent: 0, duration: 1.3, ease: "power2.inOut" },
          "<"
        );

        tl.to(
          [titleRefs.current[i - 1], descRefs.current[i - 1]],
          { autoAlpha: 0, y: -120, delay: 0.5, duration: 0.2 },
          "<"
        );

        tl.to(
          [titleRefs.current[i], descRefs.current[i]],
          { autoAlpha: 1, y: 0, duration: 0.2 },
          "<"
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [containerHeight, numStrips, stripDuration]);

  if (!containerHeight) return null;

  const stripeHeight = Math.ceil(containerHeight / numStrips);
  const getSrc = (p: Project) => (isMobile ? p.mobile_image : p.image);

  return (
    <section
      id="projects-section"
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden"
    >
      <ScrollTo
        idTop="news-section"
        idBottom="timeline-section"
        className="bottom-[50px] md:bottom-[100px] z-[201]"
      />

      {/* Striped Backgrounds */}
      {projects.map((p, i) => (
        <div key={i} className="absolute inset-0">
          {Array.from({ length: numStrips }).map((_, j) => (
            <div
              key={j}
              ref={(el) => {
                if (!stripeRefs.current[i]) stripeRefs.current[i] = [];
                stripeRefs.current[i]![j] = el;
              }}
              className="stripe absolute w-full overflow-hidden"
              style={{ top: `${j * stripeHeight}px` }}
            >
              <Image
                src={getSrc(p)}
                alt={p.alt}
                width={100}
                height={containerHeight}
                className="object-cover hidden md:block"
                style={{ top: `-${j * stripeHeight}px` }}
              />
              <Image
                src={getSrc(p)}
                alt={p.alt}
                fill
                className="object-cover block md:hidden"
              />
            </div>
          ))}
        </div>
      ))}

      {/* Foreground */}
      <div className="absolute bg-white p-5 text-center w-[90%] md:w-[500px] min-h-[60vh] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[10]">
        <Heading className="!text-[14px]">Key Projects</Heading>

        <div className="flex justify-center gap-1">
          <Pera>{String(activeIndex + 1).padStart(2, "0")}</Pera>-
          <Pera className="opacity-60">
            {String(projects.length).padStart(2, "0")}
          </Pera>
        </div>

        <ViewMore
          link={projects[activeIndex].slug}
          text="Discover More"
          className="mx-auto mt-2"
        />
      </div>
    </section>
  );
}
