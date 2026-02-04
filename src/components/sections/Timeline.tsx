"use client";

import React, { useLayoutEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Heading from "@/components/common/typography/Heading";
import Pera from "@/components/common/typography/Pera";
import useIsMobile from "@/hooks/useIsMobile";
import ScrollTo from "@/components/common/Buttons/ScrollTo";
import { setArrayRef } from "@/utils/setArrayRef";

gsap.registerPlugin(ScrollTrigger);

interface TimelineProps {
    idTop?: string;
    idBottom?: string;
    onComplete?: () => void;
}

interface BuildingItem {
    image: string;
    image2: string;
    year: string;
    desc: string;
}
interface TimelineSliderProps {
    onComplete?: () => void;
}
const buildingImages: BuildingItem[] = [
    {
        image: "/assets/svg/timeline/1.svg",
        image2: "/assets/images/timeline/timeline-1.webp",
        year: "1987–1995",
        desc:
            "Founded in 1987 by Mr. Ashwin Sheth with Mr. Jitu and Mr. Vallabh Sheth, the Sheth Group began its journey to redefine Mumbai’s skyline with vision, quality, and innovation.",
    },
    {
        image: "/assets/svg/timeline/new-2.svg",
        image2: "/assets/images/timeline/new-2.png",
        year: "1996–2005",
        desc:
            "Between 1987 and 2002, the Sheth Group entered Mumbai’s residential market with iconic Vasant Series projects, setting new benchmarks in quality living.",
    },
    {
        image: "/assets/svg/timeline/3.svg",
        image2: "/assets/images/timeline/timeline-3.webp",
        year: "2006–2012",
        desc:
            "From 2009 to 2012, landmarks like BeauMonde, Vasant Lawns, and Sheth Cnergy redefined luxury and commercial living, marking the evolution into the Ashwin Sheth Group.",
    },
    {
        image: "/assets/svg/timeline/new-4.svg",
        image2: "/assets/images/timeline/new-4.png",
        year: "2013–2018",
        desc:
            "With Viviana Mall (2013) and Sheth Avalon (2016), the group strengthened its multi-dimensional legacy, uniting design, commerce, and community in Thane’s Platinum Belt.",
    },
    {
        image: "/assets/svg/timeline/new-5.svg",
        image2: "/assets/images/timeline/new-5.png",
        year: "2019–Present",
        desc:
            "In 2020, Sheth Cnergy in Thane’s Platinum Belt marked a new era of modern business spaces, as Ashwin Sheth Group continues shaping how cities live, work, and connect.",
    },
];

export default function Timeline({ idTop, idBottom, onComplete }: TimelineProps) {
    const sectionRef = useRef<HTMLElement | null>(null);
    const horizontalRef = useRef<HTMLDivElement | null>(null);
    const pathRef = useRef<SVGPathElement | null>(null);

    const buildingRefs = useRef<HTMLDivElement[]>([]);
    const imageRefs = useRef<HTMLImageElement[]>([]);
    const textRefs = useRef<HTMLDivElement[]>([]);

    const isMobile = useIsMobile(768);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [hasCompleted, setHasCompleted] = useState(false); // prevent multiple calls

    const svgWidthMobile = 1794;
    const svgWidthDesktop = 3802;

    const getScrollForIndex = (index: number) => {
        if (!horizontalRef.current || buildingRefs.current.length === 0) return 0;
        const building = buildingRefs.current[index];
        if (!building) return 0;

        const containerWidth = window.innerWidth;
        const buildingLeft = building.offsetLeft;
        const buildingWidth = building.offsetWidth;

        // Center-ish positioning
        return buildingLeft - (containerWidth - buildingWidth) / 2 + (isMobile ? 40 : 120);
    };

    const goToIndex = useCallback((index: number) => {
        if (index < 0 || index >= buildingImages.length) return;

        const targetScroll = getScrollForIndex(index);
        gsap.to(window, {
            scrollTo: { y: targetScroll, autoKill: false },
            duration: 1.2,
            ease: "power2.inOut",
            onComplete: () => {
                setCurrentIndex(index);

                // Check for completion
                if (index === buildingImages.length - 1 && onComplete && !hasCompleted) {
                    setHasCompleted(true);
                    setTimeout(() => {
                        onComplete();
                    }, 800); // small delay so user sees the last card fully
                }
            },
        });
    }, [hasCompleted, onComplete]);

    const goToPrev = () => goToIndex(currentIndex - 1);
    const goToNext = () => goToIndex(currentIndex + 1);

    useLayoutEffect(() => {
        if (!sectionRef.current || !horizontalRef.current || !pathRef.current) return;

        const section = sectionRef.current;
        const horizontal = horizontalRef.current;
        const path = pathRef.current;
        const buildings = buildingRefs.current;
        const images = imageRefs.current;

        const extraScrollDistance = isMobile ? 80 : 700;

        const pathLength = path.getTotalLength();
        gsap.set(path, { strokeDasharray: pathLength, strokeDashoffset: pathLength });

        gsap.set(buildings, { opacity: 0.7 });
        gsap.set(textRefs.current, { opacity: 0, y: 30 });

        const lastBuilding = buildings[buildings.length - 1];
        const lastOffset = lastBuilding.offsetLeft + lastBuilding.offsetWidth;
        const scrollDistance = lastOffset - window.innerWidth + extraScrollDistance;

        const svgWidth = isMobile ? svgWidthMobile : svgWidthDesktop;
        const domWidth = horizontal.scrollWidth;
        const scale = svgWidth / domWidth;
        const leftPadding = isMobile ? 60 : 320;

        let completionTriggered = false;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: "top top",
                end: `+=${scrollDistance}`,
                scrub: 0.5,
                pin: true,
                onUpdate: (self) => {
                    const progress = self.progress;
                    const revealX = svgWidth * progress + leftPadding * scale;
                    const revealLength = gsap.utils.clamp(0, pathLength, revealX);
                    gsap.set(path, { strokeDashoffset: pathLength - revealLength });

                    let maxRatio = 0;
                    let activeIdx = 0;

                    buildings.forEach((b, idx) => {
                        const rect = b.getBoundingClientRect();
                        const vw = window.innerWidth;
                        const ratio = Math.min(Math.max((vw - rect.left) / (rect.width + vw), 0), 1);

                        if (ratio > maxRatio) {
                            maxRatio = ratio;
                            activeIdx = idx;
                        }

                        const img = images[idx];
                        const item = buildingImages[idx];

                        if (!img) return;

                        if (ratio > 0.38) {
                            gsap.to(b, { opacity: 1, duration: 0.3 });

                            if (ratio >= 0.45 && img.dataset.state !== "real") {
                                img.src = item.image2;
                                img.dataset.state = "real";
                                gsap.to(img, { opacity: 1, duration: 0.4 });
                                gsap.to(textRefs.current[idx], {
                                    opacity: 1,
                                    y: 0,
                                    duration: 0.5,
                                    ease: "power3.out",
                                });
                            }
                        } else {
                            gsap.to(b, { opacity: 0.7, duration: 0.3 });

                            if (img.dataset.state !== "svg") {
                                img.src = item.image;
                                img.dataset.state = "svg";
                                gsap.set(textRefs.current[idx], { opacity: 0, y: 30 });
                                gsap.to(img, { opacity: 1, duration: 0.3 });
                            }
                        }
                    });

                    setCurrentIndex(activeIdx);

                    // Scroll-based completion trigger
                    if (progress >= 0.92 && !completionTriggered && onComplete) {
                        completionTriggered = true;
                        setHasCompleted(true);
                        setTimeout(() => {
                            onComplete();
                        }, 600);
                    }
                },
            },
        });

        tl.to(horizontal, { x: -scrollDistance, ease: "none" });

        gsap.set(path, { strokeDashoffset: pathLength - leftPadding * scale });

        return () => {
            ScrollTrigger.getAll().forEach((st) => st.kill());
        };
    }, [isMobile, onComplete]); // ← onComplete in deps if it might change

    return (
        <section
            ref={sectionRef}
            className="relative w-full h-screen bg-white overflow-hidden mb-24"
        >
            <ScrollTo idTop={idTop || "projects-section"} idBottom={idBottom || "hero-section"} />

            {/* Arrows */}
            <div className="absolute inset-0 z-20 pointer-events-none">
                <div className="absolute left-4 sm:left-10 top-1/2 -translate-y-1/2 pointer-events-auto">
                    <button
                        onClick={goToPrev}
                        disabled={currentIndex === 0}
                        className="p-3 sm:p-4 rounded-full bg-white/90 backdrop-blur border border-gray-200 shadow hover:bg-white disabled:opacity-40 transition"
                        aria-label="Previous"
                    >
                        <ArrowLeft className="w-6 h-6 sm:w-7 sm:h-7 text-gray-800" />
                    </button>
                </div>

                <div className="absolute right-4 sm:right-10 top-1/2 -translate-y-1/2 pointer-events-auto">
                    <button
                        onClick={goToNext}
                        disabled={currentIndex === buildingImages.length - 1}
                        className="p-3 sm:p-4 rounded-full bg-white/90 backdrop-blur border border-gray-200 shadow hover:bg-white disabled:opacity-40 transition"
                        aria-label="Next"
                    >
                        <ArrowRight className="w-6 h-6 sm:w-7 sm:h-7 text-gray-800" />
                    </button>
                </div>
            </div>

            {/* Horizontal content */}
            <div
                ref={horizontalRef}
                className="flex items-center gap-40 sm:gap-[22vw] pl-[12%] sm:pl-[18%] pr-[15%] h-full"
                style={{ width: "fit-content" }}
            >
                {buildingImages.map((item, i) => (
                    <div
                        key={i}
                        ref={setArrayRef(buildingRefs, i)}
                        className="w-[360px] sm:w-[480px] min-h-[400px] flex flex-col items-center sm:items-end shrink-0"
                    >
                        <div className="w-full aspect-[4/5] sm:aspect-[5/6] relative">
                            <img
                                ref={setArrayRef(imageRefs, i)}
                                src={item.image}
                                data-state="svg"
                                className="w-full h-full object-contain transition-opacity duration-400"
                                alt={`Milestone ${item.year}`}
                            />
                        </div>

                        <div
                            ref={setArrayRef(textRefs, i)}
                            className="mt-6 w-full sm:w-[340px] text-center sm:text-right"
                        >
                            <Heading className="!text-[var(--primary)] text-2xl sm:text-3xl font-bold">
                                {item.year}
                            </Heading>
                            <Pera className="mt-4 text-gray-600 text-base sm:text-lg leading-relaxed">
                                {item.desc}
                            </Pera>
                        </div>
                    </div>
                ))}
            </div>

            {/* Your SVG path here – adjust d attribute to match your design */}
            <svg
                className="absolute top-0 left-0 w-full h-full pointer-events-none"
                viewBox={`0 0 ${isMobile ? svgWidthMobile : svgWidthDesktop} 900`}
                preserveAspectRatio="none"
            >
                <path
                    ref={pathRef}
                    d="M80,450 Q900,150 1700,450 T3400,450" // ← customize your actual path!
                    fill="none"
                    stroke="var(--primary)"
                    strokeWidth="7"
                    strokeLinecap="round"
                />
            </svg>
        </section>
    );
}

