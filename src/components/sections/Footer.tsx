// "use client";

// import gsap from "gsap";
// import { ChevronDown, Mail, Phone } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import { useState, useRef, useEffect } from "react";
// import { usePathname } from "next/navigation";

// interface FooterProps {
//   footerRef: React.RefObject<HTMLDivElement | null>;
// }

// /* ======================================================
//    GSAP TIMELINE — FINAL CINEMATIC OUTRO (HOME PAGE ONLY)
// ====================================================== */
// export function createFooterTimeline(
//   scrollTL: gsap.core.Timeline,
//   brandRefs: {
//     brand: React.RefObject<HTMLDivElement | null>;
//     circleBrand: React.RefObject<HTMLDivElement | null>;
//   },
//   footerRefs: {
//     footer: React.RefObject<HTMLDivElement | null>;
//   },
// ) {
//   gsap.set(footerRefs.footer.current, {
//     opacity: 0,
//     pointerEvents: "none",
//   });

//   /* Fade out brand */
//   scrollTL.to(
//     brandRefs.brand.current,
//     {
//       opacity: 0,
//       duration: 0.8,
//       ease: "power2.in",
//     },
//     "footer_reveal",
//   );

//   /* Circle cinematic close */
//   scrollTL.to(
//     brandRefs.circleBrand.current,
//     {
//       clipPath: "circle(150% at 50% 100%)",
//       duration: 1.3,
//       ease: "power2.inOut",
//       onStart: () => {
//         if (brandRefs.circleBrand.current) {
//           brandRefs.circleBrand.current.style.opacity = "1";
//           brandRefs.circleBrand.current.style.backgroundColor = "#fff";
//         }
//       },
//     },
//     "footer_reveal",
//   );

//   /* Footer fade in */
//   scrollTL.to(
//     footerRefs.footer.current,
//     {
//       opacity: 1,
//       duration: 1,
//       ease: "power2.out",
//     },
//     "footer_reveal+=0.6",
//   );

//   /* Enable interactions */
//   scrollTL.to(
//     footerRefs.footer.current,
//     {
//       pointerEvents: "all",
//       duration: 0.5,
//     },
//     "footer_reveal+=1",
//   );
// }

// /* ======================================================
//    COMPONENT — PIXEL PERFECT PRESENTATION
// ====================================================== */
// export default function Footer({ footerRef }: FooterProps) {
//   const [accordionOpen, setAccordionOpen] = useState(false);
//   const accordionContentRef = useRef<HTMLDivElement>(null);
//   const accordionIconRef = useRef<HTMLDivElement>(null);
//   const pathname = usePathname();
//   const isHome = pathname === "/";

//   // Set footer visibility based on page
//   useEffect(() => {
//     if (!footerRef.current || isHome) return;

//     // On non-home pages, make footer visible immediately (no GSAP animation)
//     footerRef.current.style.opacity = "1";
//     footerRef.current.style.pointerEvents = "all";
//   }, [isHome, footerRef]);

//   // GSAP accordion animation
//   useEffect(() => {
//     if (!accordionContentRef.current || !accordionIconRef.current) return;

//     const content = accordionContentRef.current;
//     const icon = accordionIconRef.current;

//     if (accordionOpen) {
//       // Get the natural height first
//       const naturalHeight = content.scrollHeight;

//       // Open animation
//       gsap.to(content, {
//         height: naturalHeight,
//         opacity: 1,
//         duration: 0.6,
//         ease: "power3.out",
//         onComplete: () => {
//           // Set to auto after animation for responsiveness
//           gsap.set(content, { height: "auto" });
//         },
//       });
//       gsap.to(icon, {
//         rotation: 180,
//         duration: 0.4,
//         ease: "power2.inOut",
//       });
//     } else {
//       // Close animation - set explicit height before animating to 0
//       const currentHeight = content.scrollHeight;
//       gsap.set(content, { height: currentHeight });
//       gsap.to(content, {
//         height: 0,
//         opacity: 0,
//         duration: 0.4,
//         ease: "power2.in",
//       });
//       gsap.to(icon, {
//         rotation: 0,
//         duration: 0.4,
//         ease: "power2.inOut",
//       });
//     }
//   }, [accordionOpen]);

//   const toggleAccordion = () => {
//     setAccordionOpen(!accordionOpen);
//   };

//   return (
//     <footer
//       ref={footerRef}
//       className={`
//         ${isHome ? "absolute inset-0 z-[100]" : "relative w-full"}
//         bg-[#FEF7F0] text-black
//         ${isHome ? "opacity-0 pointer-events-none" : ""}
//       `}
//     >
//       <div className={`w-full ${isHome ? "h-full" : ""} flex flex-col justify-between overflow-y-auto no-scrollbar`}>
//         {/* ================= HEADER WITH LOGO & NAV ================= */}
//         <div className="w-full ">
//           <div className="border p-[20px] gap-[110px] flex items-center justify-center md:w-[60%] mx-auto mt-[80px] mb-[100px]">
//             <img
//               src="/assets/images/micro/logo-1.png"
//               alt="logo"
//               className="w-[150px] h-[100px] object-contain"
//             />
//             {!isHome && (
//               <>
//                 <div className="w-[1px] h-[80px] bg-black/40"></div>
//                 <img
//                   src="/assets/images/micro/logo.png"
//                   alt="logo"
//                   className="w-[150px] h-[100px] object-contain"
//                 />
//               </>
//             )}
//           </div>

//           {/* Navigation */}
//           <div className="">
//             <div className="max-w-7xl mx-auto px-6 md:px-12">
//               <nav className="flex flex-wrap justify-center gap-8 md:gap-16 ">
//                 {["ABOUT", "PROJECTS", "THE ORANGE CIRCLE", "CONTACT"].map(
//                   (item) => (
//                     <Link
//                       key={item}
//                       href="#"
//                       className="text-xs md:text-sm text-black font-light   hover:text-black/60 transition-colors duration-300"
//                     >
//                       {item}
//                     </Link>
//                   ),
//                 )}
//               </nav>
//             </div>
//           </div>
//         </div>

//         {/* ================= ACCORDION TRIGGER ================= */}
//         <div className="">
//           <div className="w-full mx-auto px-6 md:px-12">
//             <div className="flex items-center">
//               <div className="w-full">
//                 <div className="h-px w-full bg-black"></div>
//               </div>
//               <button
//                 onClick={toggleAccordion}
//                 className="w-[300px] flex items-center justify-center cursor-pointer py-6 md:py-8 group relative z-20 pointer-events-auto"
//                 aria-expanded={accordionOpen}
//                 aria-controls="footer-accordion"
//               >
//                 <span className="text-sm flex gap-2 items-center font-medium tracking-[0.1em] group-hover:tracking-[0.15em] transition-all duration-300">
//                   EXPLORE ALL LINKS
//                   <div ref={accordionIconRef} className="inline-flex">
//                     <ChevronDown className="w-5 h-5" />
//                   </div>
//                 </span>
//               </button>
//             </div>

//             {/* Accordion Content */}
//             <div
//               ref={accordionContentRef}
//               id="footer-accordion"
//               className="overflow-hidden opacity-0"
//               style={{ height: 0 }}
//             >
//               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 pb-12 md:pb-16 pt-8">
//                 {/* Quick Links */}
//                 <div>
//                   <h3 className="text-xs md:text-sm uppercase tracking-[0.15em] font-medium mb-4 md:mb-6 text-black/80">
//                     Quick Links
//                   </h3>
//                   <ul className="space-y-3">
//                     {[
//                       "About Us",
//                       "Projects",
//                       "The Orange Circle",
//                       "News & Blogs",
//                       "Contact",
//                     ].map((item) => (
//                       <li key={item}>
//                         <Link
//                           href="#"
//                           className="text-black/60 hover:text-black transition-colors text-xs md:text-sm font-medium"
//                         >
//                           {item}
//                         </Link>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>

//                 {/* Categories */}
//                 <div>
//                   <h3 className="text-xs md:text-sm uppercase tracking-[0.15em] font-medium mb-4 md:mb-6 text-black/80">
//                     Categories
//                   </h3>
//                   <ul className="space-y-3">
//                     {[
//                       "Residential",
//                       "Commercial",
//                       "Land",
//                       "Ongoing Projects",
//                       "Completed Projects",
//                     ].map((item) => (
//                       <li key={item}>
//                         <Link
//                           href="#"
//                           className="text-black/60 hover:text-black transition-colors text-xs md:text-sm font-medium"
//                         >
//                           {item}
//                         </Link>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>

//                 {/* Services */}
//                 <div>
//                   <h3 className="text-xs md:text-sm uppercase tracking-[0.15em] font-medium mb-4 md:mb-6 text-black/80">
//                     Services
//                   </h3>
//                   <ul className="space-y-3">
//                     {[
//                       "Property Management",
//                       "Investment Advisory",
//                       "Architecture",
//                       "Interior Design",
//                       "Legal Services",
//                     ].map((item) => (
//                       <li key={item}>
//                         <Link
//                           href="#"
//                           className="text-black/60 hover:text-black transition-colors text-xs md:text-sm font-medium"
//                         >
//                           {item}
//                         </Link>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>

//                 {/* Contact */}
//                 <div>
//                   <h3 className="text-xs md:text-sm uppercase tracking-[0.15em] font-medium mb-4 md:mb-6 text-black/80">
//                     Contact Us
//                   </h3>
//                   <ul className="space-y-3 text-black/60 text-xs md:text-sm font-medium">
//                     <li>
//                       Ashwin Sheth Group
//                       <br />
//                       Mumbai, Maharashtra
//                       <br />
//                       India
//                     </li>
//                     <li>
//                       <Link
//                         href="tel:+911234567890"
//                         className="hover:text-black transition-colors"
//                       >
//                         +91 123 456 7890
//                       </Link>
//                     </li>
//                     <li>
//                       <Link
//                         href="mailto:info@ashwinsheth.com"
//                         className="hover:text-black transition-colors"
//                       >
//                         info@ashwinsheth.com
//                       </Link>
//                     </li>
//                   </ul>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* ================= MAIN CONTENT ================= */}
//         <div className="flex-1 flex items-center justify-center">
//           <div className="w-full mx-auto px-6 md:px-12 py-8 md:py-12 w-full">
//             <div className="w-full">
//               <div className="max-w-3xl mx-auto">
//                 <h3 className="text-xs md:text-sm font-medium text-center text-black leading-[32px] tracking-[2px] mb-4">
//                   Welcome To Ashwinsheth Group!
//                 </h3>
//                 <p className="text-xs md:text-sm text-black  text-center font-medium leading-[24px]  tracking-[2px] mb-4">
//                   These Terms And Conditions Outline The Rules And Regulations
//                   For The Use Of Ashwinsheth Group Website, Located At
//                   Https://Www.Ashwinshethgroup.Com/.
//                 </p>
//               </div>

//               <div className="relative flex justify-center gap-[10px] w-full items-center mx-auto">
//                 <div className="flex flex-wrap gap-2 md:gap-3 text-xs md:text-sm">
//                   <Link
//                     href="#"
//                     className="text-xs md:text-sm font-medium text-black leading-[24px]  tracking-[2px] transition-colors"
//                   >
//                     Privacy Policy
//                   </Link>
//                   <span className="text-black">|</span>
//                   <Link
//                     href="#"
//                     className="text-xs md:text-sm font-medium text-black leading-[24px]  tracking-[2px] transition-colors"
//                   >
//                     Disclaimer
//                   </Link>
//                   <span className="text-black">|</span>
//                   <Link
//                     href="#"
//                     className="text-xs md:text-sm font-medium text-black leading-[24px]  tracking-[2px] transition-colors"
//                   >
//                     Term & Conditions
//                   </Link>
//                 </div>
//                 <div className="absolute right-0 bottom-0 flex items-center gap-6">
//                   {/* Phone Icon */}
//                   <Link
//                     href="tel:+911234567890"
//                     className="text-black hover:text-black/60 transition-colors"
//                     aria-label="Call us"
//                   >
//                     <Phone className="w-5 h-5" />
//                   </Link>

//                   <span className="text-black">|</span>

//                   {/* Email Icon */}
//                   <Link
//                     href="mailto:info@ashwinsheth.com"
//                     className="text-black hover:text-black/60 transition-colors"
//                     aria-label="Email us"
//                   >
//                     <Mail className="w-5 h-5" />
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         {/* ================= BOTTOM BAR ================= */}
//         <div className="border-t border-black/10">
//           <div className="w-full mx-auto px-6 md:px-12 py-6 md:py-8">
//             <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
//               <p className="text-xs text-black font-semibold text-center md:text-left">
//                 Copyright © 2025 - Ashwin Sheth Group | All Rights Reserved
//               </p>

//               <p className="text-xs text-black font-semibold text-center md:text-right">
//                 Created BY: GTF Technologies
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }