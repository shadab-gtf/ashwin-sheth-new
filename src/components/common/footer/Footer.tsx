"use client";
import React, { useEffect, useRef, useState } from "react";
import TopFooter from "./TopFooter";
import BottomFooter from "./BottomFooter";
import Image from "next/image";
import gsap from "gsap";
import { RiArrowDropDownLine } from "react-icons/ri";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollToPlugin from "gsap/ScrollToPlugin";
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

interface FooterProps {
  footerRef: React.RefObject<HTMLDivElement | null>;
}

const links = [
  {
    label: "Our Profile",
    items: [
      { label: "About Us", link: "/about-us" },
      { label: "Projects", link: "/projects" },
      { label: "Media Center", link: "/media-center" },
      { label: "CSR", link: "/csr" },
      { label: "Blogs", link: "/blogs" },
      { label: "Investor Corner", link: "/investors" },
      { label: "Partners", link: "/our-partners" },
      { label: "Awards", link: "/awards" },
      { label: "Gallery", link: "/our-gallery" },
      { label: "Testimonials", link: "/testimonials" },
      { label: "Leadership", link: "/leadership" },
      { label: "Career", link: "/career" },
    ],
  },
  {
    label: "Residential",
    items: [
      { label: "Edmont", link: "/projects/sheth-edmont" },
      { label: "Avalon", link: "/projects/sheth-avalon/" },
      { label: "Montana", link: "/projects/sheth-montana" },
      { label: "Vasant Lawns", link: "/projects/sheth-vasant" },
      { label: "72 West", link: "/projects/72-west" },
      { label: "Avante", link: "/projects/avante" },
      { label: "Midori", link: "/projects/sheth-midori" },
      { label: "Zuri", link: "/projects/heth-zuri" },
    ],
  },
  {
    label: "Commercial",
    items: [
      { label: "Cnergy", link: "/projects/sheth-cnergy" },
      { label: "Cnergy Prabhadevi", link: "/projects/cnergy-prabhadevi" },
    ],
  },
  {
    label: "More From US",
    items: [
      { label: "The Orange Circle", link: "/the-orange-circle" },
      { label: "Thane's Platinum Belt", link: "/thane" },
      { label: "Grievance Cell", link: "/grievance-cell" },
      { label: "NRI", link: "/nri" },
    ],
  },
];

const PropertyLinks = [
  {
    label: "Residential Properties",
    items: [
      { label: "Properties in Mahalakshmi", slug: "mahalakshmi" },
      { label: "Properties in Mahalakshmi", slug: "mahalakshmi" },
      { label: "Properties in Mahalakshmi", slug: "mahalakshmi" },
      { label: "Properties in Mahalakshmi", slug: "mahalakshmi" },
    ],
  },
  {
    label: "Locations",
    items: [
      { label: "Apartments in Mulund", slug: "apartments-in-mulund" },
      { label: "Apartments in Mulund", slug: "apartments-in-mulund" },
      { label: "Apartments in Mulund", slug: "apartments-in-mulund" },
      { label: "Apartments in Mulund", slug: "apartments-in-mulund" },
    ],
  },
  {
    label: "New Launch",
    items: [
      { label: "New Flats in Mulund", slug: "flats-in-mulund" },
      { label: "New Flats in Mulund", slug: "flats-in-mulund" },
    ],
  },
];

export default function Footer({ footerRef }: FooterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const [showArrow, setShowArrow] = useState(false);
  const [ShowFooterSection, setShowFooterSection] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  useEffect(() => {
    if (!isHomePage) {
      setShowFooterSection(true);
      setShowArrow(true);
      // Reset toggle state when navigating away from homepage
      setIsOpen(false);
      return;
    }

    // Reset footer visibility when returning to homepage
    setShowFooterSection(false);
    setShowArrow(false);
    // Reset toggle state when returning to homepage
    setIsOpen(false);

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: "#video-section-2",
        start: "bottom top",
        once: true,
        onEnter: () => {
          setShowFooterSection(true);
          setShowArrow(true);
        },
      });
    });

    return () => ctx.revert();
  }, [isHomePage]);

  useEffect(() => {
    if (!wrapperRef.current) return;

    const ctx = gsap.context(() => {
      const el = wrapperRef.current!;

      gsap.set(el, { height: 0, autoAlpha: 0 });

      tl.current = gsap.timeline({
        paused: true,
        defaults: { ease: "power2.inOut", duration: 0.6 },
        onComplete: () => {
          const el = wrapperRef.current;
          if (!el) return;

          gsap.to(window, {
            duration: 0.6,
            scrollTo: {
              y: el,
              offsetY: 180
            },
            ease: "power2.out"
          });
        }
      });

      tl.current.to(el, {
        height: "auto",
        autoAlpha: 1,
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, [ShowFooterSection]);

  useEffect(() => {
    if (!isOpen && tl.current) {
      tl.current.reverse();
    }
  }, [isOpen]);

  const toggleFooter = () => {
    const willOpen = !isOpen;
    setIsOpen(willOpen);
    if (tl.current) {
      if (willOpen) {
        tl.current.play();
      } else {
        tl.current.reverse();
      }
    }
  };

  if (isHomePage && !ShowFooterSection) {
    return null;
  }

  return (
    <section
      ref={footerRef}
      id="footer-section"
      className="relative px-8 footer-section h-full bg-[#0a1e35]"
    >
      {/* Toggle Button */}
      <button
        onClick={toggleFooter}
        aria-expanded={isOpen}
        aria-controls="footer-content"
        aria-label={isOpen ? "Close footer" : "Open footer"}
        className="absolute -top-8.5 md:-top-9.75 left-1/2 -translate-x-1/2 z-10 cursor-pointer"
        style={{
          opacity: showArrow ? 1 : 0,
          pointerEvents: showArrow ? "auto" : "none",
          transform: showArrow
            ? "translate(-50%, 0)"
            : "translate(-50%, 100px)",
          transition: "opacity 0.6s ease, transform 0.8s ease",
        }}
      >
        <div className="relative w-17.5 md:w-20 h-17.5 md:h-20">
          {/* Background Image */}
          <Image
            src="/icon-bg.svg"
            alt="" // Decorative image
            fill
            className={`transition-transform duration-500`}
            style={{ objectFit: "contain" }}
          />

          {/* Icon in center */}
          <RiArrowDropDownLine
            className={`absolute top-1/2 left-1/2 text-3xl text-white transition-transform duration-500 ease-in-out`}
            style={{
              transform: `translate(-50%, -50%) rotateX(${isOpen ? 180 : 0}deg)`,
            }}
          />
        </div>
      </button>

      <TopFooter />

      {/* Collapsible Footer Links */}
      <div
        ref={wrapperRef}
        id="footer-content"
        className={`overflow-hidden bg-(--secondary) text-white`}
      >
        <div className={`wrapper ${isOpen ? "pb-7.5" : ""}`}>
          {/* Main Links */}
          <div className="flex justify-between flex-wrap sm:flex-nowrap gap-8 py-10">
            {links.map((group, index) => (
              <div key={index}>
                <h3 className="font-louize text-[20px] leading-6.25 tracking-[2px] uppercase mb-3">
                  {group.label}
                </h3>
                <ul className="space-y-4">
                  {group.items.map((item, idx) => (
                    <li key={idx}>
                      <Link
                        href={`${item.link}`}
                        className="text-white text-[12px] md:text-[14px] font-graphik-light leading-normal tracking-[0.5px] capitalize hover:text-[--primary] transition"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Property Links */}
          <div className="">
            {PropertyLinks.map((group, index) => (
              <div key={index} className="border-t border-[#ffffff36] py-6">
                <h3 className="font-louize text-[20px] leading-6.25 tracking-[2px] capitalize mb-3">
                  {group.label}
                </h3>
                <ul className="flex flex-wrap items-center">
                  {group.items.map((item, idx) => (
                    <React.Fragment key={idx}>
                      <li>
                        <Link
                          href={`${item.slug}`}
                          className="text-white text-[12px] md:text-[14px] font-graphik-light leading-normal tracking-[0.5px] capitalize hover:text-[--primary] transition"
                        >
                          {item.label}
                        </Link>
                      </li>
                      {idx < group.items.length - 1 && (
                        <span className="mx-1.25 text-[--foreground]/60">
                          |
                        </span>
                      )}
                    </React.Fragment>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomFooter />
    </section>
  );
}