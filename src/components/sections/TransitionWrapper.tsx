'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TransitionWrapperProps {
    children: React.ReactNode;
    backgroundColor?: string;
}

/**
 * TransitionWrapper creates a smooth visual bridge between the pinned
 * MasterSequence section and the HorizontalSlider section.
 * 
 * It handles:
 * - Smooth background color transition
 * - Fade-in effect for the next section
 * - Seamless scroll experience
 */
export default function TransitionWrapper({
    children,
    backgroundColor = '#FFF8F0'
}: TransitionWrapperProps) {
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Create a subtle fade-in animation when this section becomes visible
            gsap.fromTo(
                wrapperRef.current,
                {
                    opacity: 0.95,
                    y: 20
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: wrapperRef.current,
                        start: 'top 80%',
                        end: 'top 50%',
                        scrub: 1,
                    }
                }
            );
        }, wrapperRef);

        return () => ctx.revert();
    }, []);

    return (
        <div
            ref={wrapperRef}
            className="relative w-full"
            style={{
                backgroundColor,
                minHeight: '100vh'
            }}
        >
            {children}
        </div>
    );
}