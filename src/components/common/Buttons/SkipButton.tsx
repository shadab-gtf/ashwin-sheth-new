"use client";

import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { masterTimelineStore } from "@/utils/masterTimeline";
import { CgChevronDoubleDown } from "react-icons/cg";

// Register ScrollToPlugin
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollToPlugin);
}

interface SkipButtonProps {
    targetLabel: string;     // e.g. "project_reveal" or "blog_reveal"
    className?: string;
    text?: string;
    onClick?: () => void;
}

export default function SkipButton({
    targetLabel,
    className = "",
    text = "Skip",
    onClick,
}: SkipButtonProps) {
    const handleClick = () => {
        if (onClick) {
            onClick();
            return;
        }

        const tl = masterTimelineStore.tl;
        if (!tl) {
            console.warn("Master timeline not available");
            return;
        }

        // Get the ScrollTrigger instance
        const st = tl.scrollTrigger;
        if (!st) {
            console.warn("ScrollTrigger not found on timeline");
            return;
        }

        // Get label time in the timeline
        const labelTime = tl.labels[targetLabel];
        if (labelTime === undefined) {
            console.warn(`Label "${targetLabel}" not found in timeline`);
            return;
        }

        // Calculate the scroll position for this label
        // ScrollTrigger scrub ties timeline progress to scroll position
        const totalDuration = tl.duration();
        const progress = labelTime / totalDuration;

        // Get scroll start and end from ScrollTrigger
        const scrollStart = st.start;
        const scrollEnd = st.end;
        const targetScroll = scrollStart + (scrollEnd - scrollStart) * progress;

        // Smooth scroll to target position
        gsap.to(window, {
            scrollTo: { y: targetScroll, autoKill: false },
            duration: 1.4,
            ease: "power3.inOut",
        });
    };

    return (
        <button
            onClick={handleClick}
            className={`
               fixed bottom-28 items-center right-6 z-[999]
                bg-[#1B4485] rounded-full text-white
                px-5 py-2 text-xs tracking-[0.2em]
                uppercase pointer-events-auto
                transition-colors
                opacity-0 animate-fadeIn
                ${className}
            `}
            // <!-- aria-label for accessibility -->
            aria-label={`Skip to ${targetLabel.replace(/_/g, " ")}`}

        > 
            {text} 
            <CgChevronDoubleDown className="inline-block ml-1 animate-bounce" />
        </button>
    );
}