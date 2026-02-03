'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Loader({ onComplete }: { onComplete?: () => void }) {
    const loaderRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);
    const barRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLSpanElement>(null);

    useLayoutEffect(() => {
        document.body.style.overflow = 'hidden';

        const ctx = gsap.context(() => {
            gsap.set([logoRef.current, barRef.current, textRef.current], {
                willChange: 'transform, opacity',
                force3D: true,
            });

            const tl = gsap.timeline({
                defaults: { ease: 'power2.out' },
                onComplete: () => {
                    loaderRef.current!.style.display = 'none';
                    document.body.style.overflow = '';
                    document.body.setAttribute('data-loaded', 'true');
                    window.dispatchEvent(new Event('loader-complete'));
                    onComplete?.();
                },
            });

            /* ---------------- ENTRY ---------------- */
            tl.from(logoRef.current, {
                y: 10,
                opacity: 0,
                duration: 1,
                ease: 'power3.out',
            });

            /* ---------------- PROGRESS ---------------- */
            tl.to(
                barRef.current,
                {
                    width: '100%',
                    duration: 2,
                    ease: 'power2.inOut',
                },
                '-=0.2'
            );

            tl.to(
                textRef.current,
                {
                    innerText: 100,
                    duration: 2,
                    snap: { innerText: 1 },
                    ease: 'linear',
                    onUpdate: () => {
                        if (textRef.current) {
                            textRef.current.innerText =
                                Math.round(Number(textRef.current.innerText)) + '%';
                        }
                    },
                },
                '<'
            );

            /* ---------------- HOLD (luxury pause) ---------------- */
            tl.to({}, { duration: 0.4 });

            /* ---------------- EXIT ---------------- */
            tl.to(
                [logoRef.current, barRef.current, textRef.current],
                {
                    y: -10,
                    opacity: 0,
                    duration: 1,
                    delay: 0.2,
                    ease: 'power3.in',
                    stagger: 0.08,
                }
            );

            tl.to(
                loaderRef.current,
                {
                    yPercent: -100,
                    duration: 1.1,
                    ease: 'expo.inOut',
                },
                '-=0.25'
            );
        }, loaderRef);

        return () => {
            ctx.revert();
            document.body.style.overflow = '';
        };
    }, [onComplete]);

    return (
        <div
            ref={loaderRef}
            className="fixed inset-0 z-[99999] bg-[#FFF8F0] flex flex-col items-center justify-center overflow-hidden"
        >
            {/* Logo */}
            <div ref={logoRef} className="mb-8">
                <img src="/loaderlogo.png" alt="Logo" className="w-32 h-auto" />
            </div>

            {/* Progress Bar */}
            <div className="w-48 h-[2px] bg-black/10 overflow-hidden mb-4">
                <div
                    ref={barRef}
                    className="h-full bg-[#FF6600]"
                    style={{ width: '0%' }}
                />
            </div>

            {/* Percentage */}
            <span
                ref={textRef}
                className="text-[#333] text-xs tracking-[0.25em] font-mono"
            >
                0%
            </span>
        </div>
    );
}
