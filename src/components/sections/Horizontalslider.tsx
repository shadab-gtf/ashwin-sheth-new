

"use client";

import React from "react";
import Image from "next/image";

interface TimelineSlide {
  year: string;
  title: string;
  description: string;
  activeImage: string;
  sketchImage: string;
}

const TIMELINE_DATA: TimelineSlide[] = [
  {
    year: "1986-1995",
    title: "Foundation Years",
    description:
      "Founded in 1986 by Mr. Ashwin Sheth. the Sheth Group began its journey to redefine Mumbai's skyline with vision, quality, and innovation.",
    activeImage: "/timeline/timeline-1.webp",
    sketchImage: "/timeline/timeline/1.svg",
  },
  {
    year: "1996-2005",
    title: "Residential Market",
    description:
      "The Sheth Group entered Mumbai's residential market with iconic Vasant Series projects, setting new benchmarks in quality living.",
    activeImage: "/timeline/new-2.png",
    sketchImage: "/timeline/timeline/new-2.svg",
  },
  {
    year: "2006-2012",
    title: "Luxury & Commercial",
    description:
      "Landmarks like BeauMonde and Vasant Lawns redefined luxury living, marking the evolution into the Ashwin Sheth Group.",
    activeImage: "/timeline/timeline-3.webp",
    sketchImage: "/timeline/3.svg",
  },
  {
    year: "2013-2018",
    title: "Multi-Dimensional Legacy",
    description:
      "With Viviana Mall (2013) and expanding commercial presence, the group strengthened its multi-dimensional approach.",
    activeImage: "/timeline/new-4.png",
    sketchImage: "/timeline/timeline/new-4.svg",
  },
  {
    year: "2019-2024",
    title: "Premium Projects",
    description:
      "Sheth Avalon and Sheth Cnergy established new standards in premium residential and commercial spaces in Thane's Platinum Belt.",
    activeImage: "/timeline/new-5.png",
    sketchImage: "/timeline/timeline/new-5.svg",
  },
  {
    year: "2025-Present",
    title: "Future Forward",
    description:
      "Continuing innovation in premium and luxury segments while shaping how cities live, work, and connect for the future.",
    activeImage: "/timeline/new-6.webp",
    sketchImage: "/timeline/new-6.svg",
  },
];

export { TIMELINE_DATA };

export default function HorizontalTimelineSection() {
  return (
    <div className="w-full h-screen bg-[#FFF8F0] overflow-hidden relative pointer-events-none">
      {/* TITLE */}
      <div className="absolute top-28 left-1/2 -translate-x-1/2 z-10 text-center">
        <h2 className="text-[#F07D00] text-xl md:text-2xl tracking-[2px] font-light">
          A (Journey) Through Time
        </h2>
      </div>

      {/* SLIDER — uses data attributes for GSAP targeting */}
      <div className="absolute inset-0 flex items-center ">
        <div
          data-timeline-container
          className="flex items-center gap-[120px] will-change-transform"
          style={{
            paddingLeft: "25vw",
          }}
        >
          {TIMELINE_DATA.map((slide, index) => (
            <div
              key={index}
              data-timeline-slide
              className="flex-shrink-0 w-[620px] h-full flex items-center justify-center relative"
            >
              <div className="w-full flex items-center justify-center gap-1 px-16">
                {/* LEFT TEXT */}
                <div
                  data-timeline-text-left
                  className="absolute left-[-30%] top-[40%] opacity-0"
                >
                  <h3 className="text-black text-2xl italic font-light">
                    {slide.year}:<br />
                    {slide.title}
                    <br />
                    <span className="border border-black  rounded-full inline-block mt-2 px-5 py-1"> ✌️ {index + 1}</span>
                  </h3>
                </div>

                {/* CENTER IMAGE */}
                <div
                  data-timeline-image-center
                  className="w-full flex justify-center"
                >
                  <div className="relative w-full aspect-[3/4] max-w-[380px] h-[409px]">
                    {/* ACTIVE IMAGE – fades in when centered */}
                    <Image
                      data-image-active
                      src={slide.activeImage}
                      alt={slide.title}
                      fill
                      className="object-contain opacity-0"
                      style={{ transform: "scale(0.96)" }}
                      priority={index === 0}
                    />
                    {/* SKETCH IMAGE – visible by default */}
                    <Image
                      data-image-sketch
                      src={slide.sketchImage}
                      alt={slide.title}
                      fill
                      className="object-contain opacity-100"
                    />
                  </div>
                </div>
              </div>

              {/* BOTTOM TEXT */}
              <div
                data-timeline-text-bottom
                className="absolute -bottom-30   left-1/2 -translate-x-1/2 w-full max-w-[900px] text-center opacity-0"
              >
                <h4 className="text-black text-xl font-medium mb-2">
                  {slide.year}
                </h4>
                <p className="text-black text-base max-w-[700px] mx-auto">
                  {slide.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PROGRESS BAR */}
      <div className="absolute bottom-10 left-0 right-0 h-[3px] bg-[#F07D00]/20">
        <div
          data-scroll-progress
          className="h-full bg-[#F07D00] origin-left"
          style={{ transform: "scaleX(0)" }}
        />
      </div>
    </div>
  );
}