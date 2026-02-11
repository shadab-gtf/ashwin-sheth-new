"use client";
import React, { useRef, useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { CiMail } from "react-icons/ci";
import { IoCallOutline, IoLogoWhatsapp } from "react-icons/io5";
import { FaInstagram, FaXTwitter } from "react-icons/fa6";
import { AiOutlineYoutube } from "react-icons/ai";
import Heading from "@/components/common/typography/Heading";
import Image from "next/image";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import Link from "next/link";
import { FaFacebookF } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";

const LeftLinks = [
  { label: "Home", link: "/", src: "/assets/videos/menu/menu.mp4" },
  {
    label: "Projects",
    link: "/projects",
    src: "/assets/videos/menu/projects.mp4",
  },
  {
    label: "Gallery",
    link: "/our-gallery",
    src: "/assets/videos/menu/gallery.mp4",
  },
  { label: "Blogs", link: "/blogs", src: "/assets/videos/menu/blogs.mp4" },
  {
    label: "Contact",
    link: "/contact-us",
    src: "/assets/videos/menu/contact.mp4",
  },
];

const RightLinks = [
  {
    label: "About",
    link: "/about-us",
    src: "/assets/videos/menu/about-us.mp4",
  },
  {
    label: "Media Center",
    link: "/media-center",
    src: "/assets/videos/menu/media.mp4",
  },
  { label: "CSR", link: "/csr", src: "/assets/videos/menu/csr.mp4" },
  { label: "Career", link: "/career", src: "/assets/videos/menu/career.mp4" },
  {
    label: "Investors Corner",
    link: "/investors",
    src: "/assets/videos/menu/investors.mp4",
  },
];

const Links = [
  {
    label: "About Us",
    link: "about-us",
    subLinks: [
      {
        label: "Leadership",
        link: "leadership",
      },
      {
        label: "Awards",
        link: "awards",
      },
      {
        label: "Thane's Platinum Belt",
        link: "thane",
      },
      {
        label: "The Orange Circle",
        link: "the-orange-circle",
      },
    ],
  },
  {
    label: "Projects",
    link: "projects",
    subLinks: [
      {
        label: "Residential",
        link: "residential",
      },
      {
        label: "Commercial",
        link: "commercial",
      },
      {
        label: "Land",
        link: "/",
      },
      {
        label: "Retail",
        link: "retail",
      },
    ],
  },
  {
    label: "Media Center",
    link: "media-center",
    subLinks: [
      {
        label: "Press Release",
        link: "media-center/#press-release",
      },
      {
        label: "Blogs",
        link: "blogs",
      },
    ],
  },

  {
    label: "Careers",
    link: "career",
  },
  {
    label: "Investor Relation",
    link: "investors",
    subLinks: [
      {
        label: "NRI Corner",
        link: "nri",
      },
    ],
  },
  {
    label: "More From Us",
    subLinks: [
      {
        label: "Gallery",
        link: "our-gallery",
      },
      {
        label: "Testimonials",
        link: "testimonials",
      },
      {
        label: "Partners",
        link: "our-partners",
      },
      {
        label: "CSR",
        link: "csr",
      },
    ],
  },
  {
    label: "Contact Us",
    link: "contact-us",
    subLinks: [
      {
        label: "Grievance Cell",
        link: "grievance-cell",
      },
    ],
  },
  {
    label: "What's New",
  },
];

const SocialMediaLinks = [
  { icon: <FaFacebookF />, link: "https://www.facebook.com/ShethGroupLtd" },
  {
    icon: <FaInstagram />,
    link: "https://www.instagram.com/ashwinshethgroupltd/",
  },
  {
    icon: <AiOutlineYoutube />,
    link: "https://www.youtube.com/channel/UCW7PBDljlbTw1c1vB9QuDuQ",
  },
  {
    icon: <FaLinkedinIn />,
    link: "https://www.linkedin.com/company/ashwin-sheth-group/",
  },
];

const Menu = ({ isOpen, setIsOpen }) => {
  const data = [...LeftLinks, ...RightLinks];

  const menuRef = useRef(null);
  // const imageRef = useRef(null);
  const imageRefs = useRef([]);
  const linkMap = useRef({});
  const currentPath =
    typeof window !== "undefined" ? window.location.pathname : "/";

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (isOpen) {
      gsap.to(menuRef.current, {
        x: 0,
        duration: 1,
        ease: "power3.out",
      });
    } else {
      gsap.to(menuRef.current, {
        x: "100%",
        duration: 1,
        ease: "power2.inOut",
      });
    }
  }, [isOpen]);

  useEffect(() => {
    // Create map: { "/": 0, "/projects": 1, ... }
    data.forEach((item, i) => {
      linkMap.current[item.link] = i;
    });

    const initialIndex = linkMap.current[currentPath] ?? 0;
    setActiveIndex(initialIndex);

    // Setup images
    imageRefs.current.forEach((img, i) => {
      gsap.set(img, {
        clipPath:
          i === initialIndex ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)",
        zIndex: 10 - i,
      });
    });
  }, [currentPath]);

  const handleHover = (link) => {
    const index = linkMap.current[link];

    if (index === activeIndex || link === currentPath) return;

    const target = imageRefs.current[index];

    // Stop previous tweens
    gsap.killTweensOf(target);

    // Hide all other images instantly
    imageRefs.current.forEach((img, i) => {
      if (i !== activeIndex) {
        gsap.set(img, { clipPath: "inset(100% 0% 0% 0%)", scale: 1 });
      }
    });

    // Set starting state
    gsap.set(target, {
      zIndex: 20,
      clipPath: "inset(100% 0% 0% 0%)",
      scale: 1.2,
    });

    // Reveal + scale animation (1.2 → 1)
    gsap.fromTo(
      target,
      { clipPath: "inset(100% 0% 0% 0%)", scale: 1.2 },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        scale: 1,
        duration: 0.9,
        ease: "power3.out",
      },
    );

    setActiveIndex(index);

    // Fix stacking
    imageRefs.current.forEach((img, i) => {
      gsap.set(img, { zIndex: i === index ? 20 : 10 - i });
    });
  };

  return (
    <section
      ref={menuRef}
      className="fixed top-0 left-0 w-full h-screen bg-[#FEF8F3]   text-black z-[9999999999]!
      flex overflow-hidden translate-x-full"
    >
      <div className="hidden md:block w-1/3 h-full relative overflow-hidden">
        <video
          src="/videos/menu.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        ></video>
      </div>

      <div className="flex flex-col gap-[20px] pt-[30px] md:pt-[40px] md:justify-between w-full md:w-2/3 px-[20px] md:pl-20 py-[20px]  overflow-y-auto relative">
        <div className="relative">
          <button
            onClick={() => setIsOpen(false)}
            className="cursor-pointer text-[30px] absolute right-[0px] md:right-[3px] top-[-15px] md:-top-[22px] "
          >
            <IoMdClose />
          </button>
          <div className="flex gap-[5px] md:gap-[40px]">
            {/* LEFT  LINKS */}
            <div className="w-full space-y-[20px] md:space-y-[10px]">
              {Links.map((item, i) => (
                <div key={i} className="group w-fit hover:w-full">
                  {item.link ? (
                    <Link
                      onClick={() => setIsOpen(false)}
                      href={`/${item.link}`}
                      className="block w-fit"
                    >
                      <Heading
                        className={`${i === 0 ? "text-[#F58220]" : "text-black"} hover:text-[#F58220] text-left text-[18px] md:!text-[22px]`}
                      >
                        {item.label}
                      </Heading>
                    </Link>
                  ) : (
                    <Heading
                      onClick={() => setIsOpen(false)}
                      className={`w-fit mb-[8px] group-hover:mb-[0px] ${i === 0 ? "text-[#F58220]" : "text-black"} hover:text-[#F58220] text-left text-[18px md:!text-[22px]`}
                    >
                      {item.label}
                    </Heading>
                  )}
                  {item.subLinks && (
                    <ul
                      className={`
                                                flex gap-[5px] md:gap-[10px] flex-wrap
                                                overflow-hidden
                                                translate-y-1
                                                transition-all duration-300 ease-out

                                                ${
                                                  i === 0
                                                    ? "opacity-100 translate-y-0"
                                                    : "opacity-0 group-hover:opacity-100 group-hover:translate-y-0"
                                                }
                                                `}
                    >
                      {item.subLinks?.map((child, j) => (
                        <li
                          key={`${i}-${j}`}
                          className={`
                                                        overflow-hidden
                                                        transition-all duration-300 ease-out
                                                        ${
                                                          i === 0
                                                            ? "opacity-100 max-h-[40px]"
                                                            : "opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-[40px]"
                                                        }
                                                       `}
                        >
                          <Link
                            onClick={() => setIsOpen(false)}
                            href={`/${child.link}`}
                            className="text-black  hover:text-[#F58220] text-nowrap font-graphik-regular text-[12px] leading-[28px] tracking-[1px]"
                          >
                            {child.label}
                          </Link>
                          {/* Add | except after last item */}
                          {j !== item.subLinks.length - 1 && (
                            <span className="ml-[5px] md:ml-[10px]">|</span>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <Heading className="text-black/30 md:!text-[22px] text-start  md:mt-0 mb-[10px]">
            Get In Touch
          </Heading>
          <div className="flex flex-col md:flex-row gap-[10px] md:gap-[20px] md:items-center">
            <a
              href="mailto:sales@ashwinshethgroup.com"
              className="flex items-center gap-[8px] text-[12px] md:text-[14px] hover:text-[#104196] transition-colors duration-300"
            >
              <CiMail /> sales@ashwinshethgroup.com
            </a>
            <span className="hidden md:block">|</span>
            <a
              href="tel:+918655661499"
              className="flex items-center gap-[8px] text-[12px] md:text-[14px] hover:text-[#104196] transition-colors duration-300"
            >
              <IoCallOutline /> +91 8655661499
            </a>
          </div>
        </div>

        <div>
          <Heading className="text-black/30 md:!text-[22px] text-start  md:mt-0 mb-[10px]">
            Stay Connected
          </Heading>

          <div className="inline-flex h-[31px] md:h-[63px] px-[20px] md:px-[30px] py-[10px] md:py-[16px] gap-[40px] rounded-[107px] shadow-inner">
            {SocialMediaLinks.map((item, i) => (
              <a
                key={i}
                href={item.link}
                target="_blank"
                className="text-[16px] md:text-[22px] hover:text-[#104196] transition"
              >
                {item.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Menu;
