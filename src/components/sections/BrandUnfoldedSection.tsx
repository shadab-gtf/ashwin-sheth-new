'use client';

import gsap from 'gsap';
import Link from 'next/link';
import { Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';
import { useRef } from 'react';

interface BrandUnfoldedProps {
    brandRef: React.RefObject<HTMLDivElement | null>;
    circleBrandRef: React.RefObject<HTMLDivElement | null>;
}

/* ======================================================
   GSAP TIMELINE — BRAND REVEAL
====================================================== */
export function createBrandTimeline(
    scrollTL: gsap.core.Timeline,
    prevRefs: {
        blog: React.RefObject<HTMLDivElement | null>;
        circleBlog: React.RefObject<HTMLDivElement | null>;
    },
    brandRefs: {
        brand: React.RefObject<HTMLDivElement | null>;
        circleBrand: React.RefObject<HTMLDivElement | null>;
    }
) {
    const brand = brandRefs.brand.current;
    const circle = brandRefs.circleBrand.current;

    gsap.set(brand, { opacity: 0, pointerEvents: 'none' });
    gsap.set(circle, {
        clipPath: 'circle(0% at 50% 100%)',
        opacity: 1,
        backgroundColor: '#FEF7F0',
    });

    scrollTL.addLabel('brand_reveal');

    scrollTL.to(circle, {
        clipPath: 'circle(150% at 50% 100%)',
        duration: 1.4,
        ease: 'power2.inOut',
    }, 'brand_reveal');

    scrollTL.to(prevRefs.blog.current, {
        opacity: 0,
        duration: 0.6,
        ease: 'power2.in',
    }, 'brand_reveal+=0.35');

    scrollTL.to(circle, {
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
    }, 'brand_reveal+=0.9');

    scrollTL.to(brand, {
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
    }, 'brand_reveal+=1.0');

    scrollTL.add(() => {
        if (brand) brand.style.pointerEvents = 'none';
    }, 'brand_reveal+=1.4');

    const reveals = brand?.querySelectorAll('[data-reveal]');
    reveals?.forEach((el, i) => {
        scrollTL.fromTo(
            el,
            { opacity: 0, y: 28 },
            { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
            `brand_reveal+=${1.1 + i * 0.15}`
        );
    });
}

/* ======================================================
   COMPONENT
====================================================== */
const socials = [
    { Icon: Facebook, label: 'Facebook', href: 'https://www.facebook.com/ShethGroupLtd' },
    { Icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/ashwinshethgroupltd/' },
    { Icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/company/ashwin-sheth-group/' },
    { Icon: Youtube, label: 'YouTube', href: 'https://www.youtube.com/channel/UCW7PBDljlbTw1c1vB9QuDuQ' },
];

export default function BrandUnfoldedSection({
    brandRef,
    circleBrandRef,
}: BrandUnfoldedProps) {
    const videoRef = useRef<HTMLVideoElement>(null);

    return (
        <>
         
            {/* MAIN SECTION */}
            <section
                ref={brandRef}
                className="absolute inset-0 z-[80] opacity-0 pointer-events-none bg-[#FAFAF7]"
            >
                <div className="w-full h-full flex items-center justify-center px-20">
                    <div className="w-full max-w-[1200px] grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">

                        {/* LEFT COLUMN */}
                        <div className="flex flex-col max-w-[425px] items-start">
                            <h2
                                data-reveal
                                className="text-[32px] text-center leading-[1.25] font-light mb-12 text-[#F07D00]"
                            >
                                The Ashwin Sheth Group Unfolded
                            </h2>

                            <div
                                data-reveal
                                className="w-[425px] px-4 py-12 text-center"
                                style={{ backgroundColor: '#F5EDE4' }}
                            >
                                <div className="flex justify-center gap-6 mb-10">
                                    {socials.map(({ Icon, label, href }) => (
                                        <Link key={label} href={href} aria-label={label}>
                                            <Icon className="w-5 h-5 text-black hover:text-black transition" />
                                        </Link>
                                    ))}
                                </div>

                                <p className="text-xl leading-[1.7] text-black/70 mb-10">
                                    A curated window into the life
                                    <br />
                                    and language of the world we
                                    <br />
                                    continue to shape.
                                </p>

                                <Link
                                    href="#"
                                    className="text-md  tracking-[1px] text-[#0E4194] font-semibold relative inline-block"
                                >
                                    READ MORE
                                    <span className="absolute left-0 -bottom-1 w-full h-px bg-[#0E4194]" />
                                </Link>
                            </div>
                        </div>

                        {/* RIGHT COLUMN — VIDEO */}
                        <div data-reveal className="flex justify-end">
                            <div className="w-[450px] h-[560px] overflow-hidden">
                                <video
                                    ref={videoRef}
                                    className="w-full h-full object-contain"
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                >
                                    <source src="/videos/reel-1.mp4" type="video/mp4" />
                                </video>
                            </div>
                        </div>

                    </div>
                </div> 
            </section>
        </>
    );
}
