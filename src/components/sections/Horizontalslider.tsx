// 'use client';

// import { useState, useRef, useEffect } from 'react';
// import Image from 'next/image';
// import { gsap } from 'gsap';

// import { Swiper, SwiperSlide } from 'swiper/react';
// import { EffectCoverflow } from 'swiper/modules';

// import 'swiper/css';
// import 'swiper/css/effect-coverflow';
// import { ChevronRight } from 'lucide-react';

// interface TimelineSlide {
//     year: string;
//     title: string;
//     description: string;
//     bottomTitleYear?: string;
//     bottomTitleText?: string;
//     activeImage: string;
//     sketchImage: string;
// }

// const TIMELINE_DATA: TimelineSlide[] = [
//     {
//         year: "1986-1995",
//         title: "The Foundation Years",
//         description: "Founded in 1986 by Mr. Ashwin Sheth, the Sheth Group began its journey to redefine Mumbai's skyline with vision, quality, and innovation.",
//         bottomTitleYear: "1986-1995",
//         bottomTitleText: "Founded in 1986 by Mr. Ashwin Sheth. the Sheth Group began its journey to redefine Mumbai’s skyline with vision, quality, and innovation.",
//         activeImage: "/assets/images/timeline/new-4.png",
//         sketchImage: "/assets/svg/new-4.svg",
//     },
//     {
//         year: "1996-2005",
//         title: "Expansion & Growth",
//         description: "A decade of remarkable growth, establishing the Sheth Group as a trusted name in Mumbai's real estate landscape.",
//         bottomTitleYear: "1986-1995",
//         bottomTitleText: "Founded in 1986 by Mr. Ashwin Sheth. the Sheth Group began its journey to redefine Mumbai’s skyline with vision, quality, and innovation.",
//         activeImage: "/assets/images/timeline/new-4.png",
//         sketchImage: "/assets/svg/new-4.svg",
//     },
//     {
//         year: "2006-2015",
//         title: "Innovation & Excellence",
//         description: "Introducing groundbreaking projects that set new benchmarks in luxury living and architectural brilliance.",
//         bottomTitleYear: "1986-1995",
//         bottomTitleText: "Founded in 1986 by Mr. Ashwin Sheth. the Sheth Group began its journey to redefine Mumbai’s skyline with vision, quality, and innovation.",
//         activeImage: "/assets/images/timeline/new-2.png",
//         sketchImage: "/assets/svg/new-2.svg",
//     },
//     {
//         year: "2016-2025",
//         title: "Global Recognition",
//         description: "Achieving international acclaim and expanding horizons with projects that redefine modern urban living.",
//         bottomTitleYear: "1986-1995",
//         bottomTitleText: "Founded in 1986 by Mr. Ashwin Sheth. the Sheth Group began its journey to redefine Mumbai’s skyline with vision, quality, and innovation.",
//         activeImage: "/assets/images/timeline/new-4.png",
//         sketchImage: "/assets/svg/new-4.svg",
//     },
//     {
//         year: "2026-Future",
//         title: "Beyond Horizons",
//         description: "Pioneering the future of sustainable urban development with visionary projects that blend innovation, luxury, and environmental responsibility.",
//         bottomTitleYear: "1986-1995",
//         bottomTitleText: "Founded in 1986 by Mr. Ashwin Sheth. the Sheth Group began its journey to redefine Mumbai’s skyline with vision, quality, and innovation.",
//         activeImage: "/assets/images/timeline/new-5.png",
//         sketchImage: "/assets/svg/new-5.svg",
//     }
// ];
// interface HorizontalTimelineProps {
//     onComplete?: () => void;
// }
// export default function HorizontalTimeline({
//     onComplete,
// }: HorizontalTimelineProps) {
//     const [activeIndex, setActiveIndex] = useState(0);
//     const swiperRef = useRef<any>(null);
//     const progressRef = useRef<HTMLDivElement>(null);
//     const hasCompletedRef = useRef(false);

//     const totalSlides = TIMELINE_DATA.length;
//     const currentSlide = TIMELINE_DATA[activeIndex];

//     /* ---------------- Progress Animation ---------------- */
//     useEffect(() => {
//         if (!progressRef.current) return;

//         gsap.to(progressRef.current, {
//             scaleX: (activeIndex + 1) / totalSlides,
//             duration: 0.8,
//             ease: 'power3.out',
//         });
//     }, [activeIndex]);
//     useEffect(() => {
//         if (activeIndex === totalSlides - 1 && !hasCompletedRef.current) {
//             hasCompletedRef.current = true;
//             onComplete?.();
//         }
//     }, [activeIndex, totalSlides, onComplete]);
//     return (
//         <section className="relative w-full h-screen bg-[#FFF8F0] overflow-hidden">
//             {/* ---------- Title ---------- */}
//             <div className="absolute top-20 left-1/2 -translate-x-1/2 z-20 text-center">
//                 <h2 className="text-[#F07D00] text-xl tracking-[2px] font-light">
//                     A (Journey) Through Time
//                 </h2>
//             </div>

//             {/* ---------- Main Content ---------- */}
//             <div className="w-full h-full flex flex-col items-center justify-center px-6 lg:px-16 bg-white">
//                 <div className="w-full flex flex-col lg:flex-row items-center gap-12">

//                     {/* ===== LEFT TEXT ===== */}
//                     <div className="w-full lg:w-1/4 text-center lg:text-left">
//                         <h3 className="text-black text-xl italic tracking-[2px] mb-2">
//                             {currentSlide.year}
//                         </h3>

//                         <p className="text-black text-lg italic tracking-[1px]">
//                             {currentSlide.title}
//                         </p>

//                         {/* Navigation */}
//                         <div className="flex items-center justify-center lg:justify-start gap-4 mt-10 relative z-40">
//                             <button
//                                 onClick={() => swiperRef.current?.slidePrev()}
//                                 className="w-12 h-12 flex justify-center items-center rounded-full border-2 border-black cursor-pointer bg-white text-black hover:bg-black hover:text-white transition relative z-50 pointer-events-auto"
//                             >
//                                 <ChevronRight className="rotate-180" />
//                             </button>

//                             <div className="w-14 h-14 rounded-full border-2 bg-white text-black border-black flex items-center justify-center relative z-40">
//                                 {activeIndex + 1} / {totalSlides}
//                             </div>

//                             <button
//                                 onClick={() => swiperRef.current?.slideNext()}
//                                 className="w-12 h-12 flex justify-center items-center rounded-full border-2 border-black cursor-pointer bg-white text-black hover:bg-black hover:text-white transition relative z-50 pointer-events-auto"
//                             >
//                                 <ChevronRight />
//                             </button>
//                         </div>
//                     </div>

//                     {/* ===== IMAGE STAGE (SWIPER) ===== */}
//                     <div className="w-full lg:w-3/4">
//                         <Swiper
//                             modules={[EffectCoverflow]}
//                             effect="coverflow"
//                             centeredSlides
//                             grabCursor
//                             slidesPerView={2.2}
//                             spaceBetween={10}
//                             coverflowEffect={{
//                                 rotate: 0,
//                                 stretch: 20,
//                                 depth: 380,
//                                 modifier: 1,
//                                 slideShadows: false,
//                             }}
//                             onSwiper={(swiper) => (swiperRef.current = swiper)}
//                             onSlideChange={(swiper) =>
//                                 setActiveIndex(swiper.activeIndex)
//                             }
//                             className="w-full"
//                         >
//                             {TIMELINE_DATA.map((slide, index) => (
//                                 <SwiperSlide key={index}>
//                                     <div className="relative aspect-[3/4] overflow-hidden w-[471px] h-[409px] mx-auto">
//                                         <Image
//                                             src={index === activeIndex ? slide.activeImage : slide.sketchImage}
//                                             alt={slide.title}
//                                             fill
//                                             className={`object-contain transition-all duration-500 ${index === activeIndex ? "scale-100 opacity-100" : "scale-95 opacity-60"
//                                                 }`}
//                                             priority={index === activeIndex}
//                                         />
//                                     </div>
//                                 </SwiperSlide>
//                             ))}
//                         </Swiper>
//                     </div>
//                 </div>
//             </div>
//             {/* Controls & Text */}
//             <div className="w-full max-w-4xl flex items-center justify-between">
//                 {/* Left Arrow */}
//                 <button
//                     onClick={() => swiperRef.current?.slidePrev()}
//                     className="w-11 h-11 rounded-full border-2 border-black flex items-center justify-center
//              bg-white text-black hover:bg-black hover:text-white transition"
//                 >
//                     <ChevronRight className="rotate-180" />
//                 </button>

//                 {/* Text */}
//                 <p className="max-w-3xl text-center text-black text-sm md:text-base tracking-[1px] px-4">
//                     {currentSlide.bottomTitleText}
//                 </p>

//                 {/* Right Arrow */}
//                 <button
//                     onClick={() => swiperRef.current?.slideNext()}
//                     className="w-11 h-11 rounded-full border-2 border-black flex items-center justify-center
//                         bg-white text-black hover:bg-black hover:text-white transition"
//                 >
//                     <ChevronRight />
//                 </button>
//             </div>

//             {/* ---------- Bottom Progress Bar ---------- */}
//             <div className="absolute bottom-8 left-0 right-0 px-8 z-30">
//                 <div className="w-full h-[3px] bg-black/15 overflow-hidden">
//                     <div
//                         ref={progressRef}
//                         className="h-full bg-gradient-to-r from-[#F07D00] to-[#FF9933] origin-left"
//                         style={{ transform: 'scaleX(0)' }}
//                     />
//                 </div>
//             </div>
//         </section>
//     );
// }

// "use client";

// import { useState, useRef, useEffect } from "react";
// import Image from "next/image";
// import { gsap } from "gsap";

// import { Swiper, SwiperSlide } from "swiper/react";
// import { EffectCoverflow } from "swiper/modules";

// import "swiper/css";
// import "swiper/css/effect-coverflow";
// import { ArrowBigLeft, ChevronRight } from "lucide-react";

// interface TimelineSlide {
//   year: string;
//   title: string;
//   description: string;
//   bottomTitleText?: string;
//   activeImage: string;
//   sketchImage: string;
// }

// const TIMELINE_DATA: TimelineSlide[] = [
//   {
//     year: "1986-1995",
//     title: "Foundation Years",
//     description:
//       "Founded in 1986 by Mr. Ashwin Sheth. The Sheth Group began its journey to redefine Mumbai’s skyline with vision, quality, and innovation.",
//     bottomTitleText:
//       "Founded in 1986 by Mr. Ashwin Sheth. The Sheth Group began its journey to redefine Mumbai’s skyline with vision, quality, and innovation.",
//     activeImage: "/timeline/timeline-1.webp",
//     sketchImage: "/timeline/timeline/1.svg",
//   },
//   {
//     year: "1996-2005",
//     title: "Residential Market",
//     description:
//       "Between 1996 and 2005, the Sheth Group entered Mumbai’s residential market with iconic Vasant Series projects, setting new benchmarks in quality living.",
//     bottomTitleText:
//       "Between 1996 and 2005, the Sheth Group entered Mumbai’s residential market with iconic Vasant Series projects, setting new benchmarks in quality living.",
//     activeImage: "/timeline/new-2.png",
//     sketchImage: "/timeline/timeline/new-2.svg",
//   },
//   {
//     year: "2006-2012",
//     title: "Luxury & Commercial ",
//     description:
//       "From 2006 to 2012, landmarks like BeauMonde, Vasant Lawns, and Sheth Cnergy redefined luxury and commercial living, marking the evolution into the Ashwin Sheth Group. Ashwin Sheth expanded its presence beyond Mumbai, with projects in Dubai.",
//     bottomTitleText:
//       "From 2006 to 2012, landmarks like BeauMonde, Vasant Lawns, and Sheth Cnergy redefined luxury and commercial living, marking the evolution into the Ashwin Sheth Group. Ashwin Sheth expanded its presence beyond Mumbai, with projects in Dubai.",
//     activeImage: "/timeline/timeline-3.webp",
//     sketchImage: "/timeline/3.svg",
//   },
//   {
//     year: "2013-2018",
//     title: "Multi-Dimensional Legacy",
//     description:
//       "With Viviana Mall (2013) and Sheth Avalon (2018), the group strengthened its multi-dimensional legacy, uniting design, commerce, and community in Thane’s Platinum Belt.",
//     bottomTitleText:
//       "With Viviana Mall (2013) and Sheth Avalon (2018), the group strengthened its multi-dimensional legacy, uniting design, commerce, and community in Thane’s Platinum Belt.",
//     activeImage: "/timeline/new-4.png",
//     sketchImage: "/timeline/timeline/new-4.svg",
//   },
//   {
//     year: "2019–2024",
//     title: "Modern Business Spaces",
//     description:
//       "In 2020, Sheth Cnergy in Thane’s Platinum Belt marked a new era of modern business spaces, as Ashwin Sheth Group continues shaping how cities live, work, and connect.",
//     bottomTitleText:
//       "In 2020, Sheth Cnergy in Thane’s Platinum Belt marked a new era of modern business spaces, as Ashwin Sheth Group continues shaping how cities live, work, and connect.",
//     activeImage: "/timeline/new-5.png",
//     sketchImage: "/timeline/timeline/new-5.svg",
//   },
//   {
//     year: "2025 Onwards",
//     title: "Premium & Luxury Segment",
//     description:
//       "With launch of Edmont in Kandivali West & last 3 towers in Avalon, AGS continued its growth in premium & luxury segment the latest being One Marina at marine lines.",
//     bottomTitleText:
//       "With launch of Edmont in Kandivali West & last 3 towers in Avalon, AGS continued its growth in premium & luxury segment the latest being One Marina at marine lines.",
//     activeImage: "/timeline/new-6.webp",
//     sketchImage: "/timeline/new-6.svg",
//   },
//   {
//     year: "2025 Onwards",
//     title: "Premium & Luxury Segment",
//     description:
//       "With launch of Edmont in Kandivali West & last 3 towers in Avalon, AGS continued its growth in premium & luxury segment the latest being One Marina at marine lines.",
//     bottomTitleText:
//       "With launch of Edmont in Kandivali West & last 3 towers in Avalon, AGS continued its growth in premium & luxury segment the latest being One Marina at marine lines.",
//     activeImage: "/timeline/new-6.webp",
//     sketchImage: "/timeline/timeline/1.svg",
//   },
// ];

// interface HorizontalTimelineProps {
//   onComplete?: () => void;
// }

// export default function HorizontalTimeline({
//   onComplete,
// }: HorizontalTimelineProps) {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const swiperRef = useRef<any>(null);
//   const progressRef = useRef<HTMLDivElement>(null);
//   const hasCompletedRef = useRef(false);

//   const totalSlides = TIMELINE_DATA.length;
//   const currentSlide = TIMELINE_DATA[activeIndex];

//   /* =================================================
//        PROGRESS BAR (SMOOTH)
//     ================================================= */
//   useEffect(() => {
//     if (!progressRef.current) return;

//     gsap.to(progressRef.current, {
//       scaleX: (activeIndex + 2) / totalSlides,
//       duration: 1,
//       ease: "power3.out",
//     });
//   }, [activeIndex, totalSlides]);

//   useEffect(() => {
//     if (activeIndex === totalSlides - 1 && !hasCompletedRef.current) {
//       hasCompletedRef.current = true;
//       gsap.delayedCall(1, () => {
//         onComplete?.();
//       });
//     }
//   }, [activeIndex, totalSlides, onComplete]);

//   return (
//     <section className="relative w-full h-screen bg-[#FFF8F0] overflow-hidden pointer-events-auto">
//       {/* TITLE */}
//       <div className="absolute top-30 left-1/2 -translate-x-1/2 z-40 text-center">
//         <h2 className="text-[#F07D00] text-xl tracking-[2px] font-light">
//           A (Journey) Through Time
//         </h2>
//       </div>

//       {/* MAIN CONTENT */}
//       <div className="w-full min-h-screen flex flex-col items-center justify-center px-4 md:px-8 lg:px-16 py-32">
//         <div className="w-full flex flex-col lg:flex-row items-center gap-12 ">
//           {/* LEFT TEXT */}
//           <div className="w-full lg:w-[35%] text-center flex flex-col justify-center ">
//             <h3 className="text-black text-[29px] italic tracking-[2px] ">
//               {currentSlide.year}
//               <br />
//               {currentSlide.title}
//             </h3>

//             {/* <p className="text-black text-[29px] italic tracking-[1px]">
//                         </p> */}

//             {/* NAVIGATION */}
//             <div className="flex items-center justify-center gap-4 mt-10 z-50">
//               <button
//                 onClick={() => swiperRef.current?.slidePrev()}
//                 className="w-12 h-12 flex items-center justify-center rounded-full
//                             text-black cursor-pointer"
//               >
//                 <Image
//                   src="/icons/right.png"
//                   className="rotate-180"
//                   alt="Arrow Left"
//                   width={30}
//                   height={30}
//                 />
//               </button>

//               <div className="w-10 h-10 rounded-full border border-black text-black text-xs flex items-center justify-center">
//                 {/* {activeIndex + 2} / {totalSlides} */}
//               </div>

//               <button
//                 onClick={() => swiperRef.current?.slideNext()}
//                 className="w-12 h-12 flex items-center justify-center rounded-full
//                             text-black cursor-pointer"
//               >
//                 <Image
//                   src="/icons/right.png"
//                   alt="Arrow Left"
//                   width={30}
//                   height={30}
//                 />
//               </button>
//             </div>
//           </div>

//           {/* SWIPER */}
//           <div className="w-full lg:w-[65%]">
//             <Swiper
//               modules={[EffectCoverflow]}
//               // effect="coverflow"
//               // centeredSlides
//               // grabCursor
//               slidesPerView={2}
//               spaceBetween={10}
//               // coverflowEffect={{
//               //     rotate: 0,
//               //     stretch: 20,
//               //     depth: 380,
//               //     modifier: 1,
//               //     slideShadows: false,
//               // }}
//               onSwiper={(swiper) => (swiperRef.current = swiper)}
//               onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
//             >
//               {TIMELINE_DATA.map((slide, index) => (
//                 <SwiperSlide key={index}>
//                   <div className="relative h-[359px] mx-auto">
//                     <Image
//                       src={
//                         index === activeIndex
//                           ? slide.activeImage
//                           : slide.sketchImage
//                       }
//                       alt={slide.title}
//                       fill
//                       className={`object-contain transition-all duration-1000 ${
//                         index === activeIndex
//                           ? "scale-100 opacity-100"
//                           : "scale-95 opacity-60"
//                       }`}
//                       priority={index === activeIndex}
//                     />
//                   </div>
//                 </SwiperSlide>
//               ))}
//             </Swiper>
//           </div>
//         </div>
//       </div>

//       {/* BOTTOM TEXT + ARROWS */}
//       <div
//         className="absolute bottom-20 left-1/2 -translate-x-1/2 w-full max-w-4xl
//                       flex items-center justify-between z-40 px-6"
//       >
//         <button
//           onClick={() => swiperRef.current?.slidePrev()}
//           className="w-11 h-11 rounded-full  flex items-center justify-center
//                       text-black cursor-pointer"
//         >
//           <ChevronRight className="rotate-180" />
//         </button>

//         <p className="max-w-3xl text-center text-black text-sm md:text-base tracking-[1px] px-4">
//           {currentSlide.bottomTitleText}
//         </p>

//         <button
//           onClick={() => swiperRef.current?.slideNext()}
//           className="w-11 h-11 rounded-full  flex items-center justify-center
//                       text-black cursor-pointer"
//         >
//           <ChevronRight />
//         </button>
//       </div>

//       {/* PROGRESS BAR */}
//       <div className="absolute bottom-8 left-0 right-0 px-8 z-30">
//         <div className="w-full h-[3px] bg-black/15 overflow-hidden">
//           <div
//             ref={progressRef}
//             className="h-full bg-gradient-to-r from-[#F07D00] to-[#FF9933] origin-left"
//             style={{ transform: "scaleX(0)" }}
//           />
//         </div>
//       </div>
//     </section>
//   );
// }

// "use client";

// import React from "react";
// import Image from "next/image";

// interface TimelineSlide {
//   year: string;
//   title: string;
//   description: string;
//   activeImage: string;
//   sketchImage: string;
// }

// const TIMELINE_DATA: TimelineSlide[] = [
//   {
//     year: "1986-1995",
//     title: "Foundation Years",
//     description:
//       "Founded in 1986 by Mr. Ashwin Sheth. the Sheth Group began its journey to redefine Mumbai's skyline with vision, quality, and innovation.",
//     activeImage: "/timeline/timeline-1.webp",
//     sketchImage: "/timeline/timeline/1.svg",
//   },
//   {
//     year: "1996-2005",
//     title: "Residential Market",
//     description:
//       "The Sheth Group entered Mumbai's residential market with iconic Vasant Series projects, setting new benchmarks in quality living.",
//     activeImage: "/timeline/new-2.png",
//     sketchImage: "/timeline/timeline/new-2.svg",
//   },
//   {
//     year: "2006-2012",
//     title: "Luxury & Commercial",
//     description:
//       "Landmarks like BeauMonde and Vasant Lawns redefined luxury living, marking the evolution into the Ashwin Sheth Group.",
//     activeImage: "/timeline/timeline-3.webp",
//     sketchImage: "/timeline/3.svg",
//   },
//   {
//     year: "2013-2018",
//     title: "Multi-Dimensional Legacy",
//     description:
//       "With Viviana Mall (2013) and expanding commercial presence, the group strengthened its multi-dimensional approach.",
//     activeImage: "/timeline/new-4.png",
//     sketchImage: "/timeline/timeline/new-4.svg",
//   },
//   {
//     year: "2019-2024",
//     title: "Premium Projects",
//     description:
//       "Sheth Avalon and Sheth Cnergy established new standards in premium residential and commercial spaces in Thane's Platinum Belt.",
//     activeImage: "/timeline/new-5.png",
//     sketchImage: "/timeline/timeline/new-5.svg",
//   },
//   {
//     year: "2025-Present",
//     title: "Future Forward",
//     description:
//       "Continuing innovation in premium and luxury segments while shaping how cities live, work, and connect for the future.",
//     activeImage: "/timeline/new-6.webp",
//     sketchImage: "/timeline/new-6.svg",
//   },
// ];

// export { TIMELINE_DATA };

// export default function HorizontalTimelineSection() {
//   return (
//     <div className="w-full h-screen bg-[#FFF8F0] overflow-hidden relative pointer-events-none">
//       {/* TITLE */}
//       <div className="absolute top-28 left-1/2 -translate-x-1/2 z-10 text-center">
//         <h2 className="text-[#F07D00] text-xl md:text-2xl tracking-[2px] font-light">
//           A (Journey) Through Time
//         </h2>
//       </div>

//       {/* SLIDER — uses data attributes for GSAP targeting */}
//       <div className="absolute inset-0 flex items-center ">
//         <div
//           data-timeline-container
//           className="flex items-center gap-[120px] will-change-transform"
//           style={{
//             paddingLeft: "50vw",
//             paddingRight: "50vw",
//           }}
//         >
//           {TIMELINE_DATA.map((slide, index) => (
//             <div
//               key={index}
//               data-timeline-slide
//               className="flex-shrink-0 w-[70px] h-full flex items-center justify-center relative"
//             >
//               <div className="w-full flex items-center justify-center gap-1 px-16">
//                 {/* LEFT TEXT */}
//                 <div
//                   data-timeline-text-left
//                   className="w-[400px] absolute left-[-35%] top-[40%] opacity-0"
//                 >
//                   <h3 className="text-black text-3xl md:text-4xl italic font-light">
//                     {slide.year}:<br />
//                     {slide.title}
//                   </h3>
//                 </div>

//                 {/* CENTER IMAGE */}
//                 <div
//                   data-timeline-image-center
//                   className="w-full flex justify-center"
//                 >
//                   <div className="relative w-full aspect-[3/4] max-w-[380px] h-[380px]">
//                     {/* ACTIVE IMAGE – fades in when centered */}
//                     <Image
//                       data-image-active
//                       src={slide.activeImage}
//                       alt={slide.title}
//                       fill
//                       className="object-contain drop-shadow-2xl opacity-0"
//                       style={{ transform: "scale(0.96)" }}
//                       priority={index === 0}
//                     />
//                     {/* SKETCH IMAGE – visible by default */}
//                     <Image
//                       data-image-sketch
//                       src={slide.sketchImage}
//                       alt={slide.title}
//                       fill
//                       className="object-contain opacity-100"
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* BOTTOM TEXT */}
//               <div
//                 data-timeline-text-bottom
//                 className="absolute -bottom-30   left-1/2 -translate-x-1/2 w-full max-w-[900px] text-center opacity-0"
//               >
//                 <h4 className="text-black text-xl font-medium mb-2">
//                   {slide.year}
//                 </h4>
//                 <p className="text-black text-base max-w-[700px] mx-auto">
//                   {slide.description}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* PROGRESS BAR */}
//       <div className="absolute bottom-10 left-0 right-0 h-[3px] bg-[#F07D00]/20">
//         <div
//           data-scroll-progress
//           className="h-full bg-[#F07D00] origin-left"
//           style={{ transform: "scaleX(0)" }}
//         />
//       </div>
//     </div>
//   );
// }




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
      <div className="absolute top-24 left-1/2 -translate-x-1/2 z-10 text-center">
        <h2 className="text-[#F07D00] text-xl md:text-2xl tracking-[2px] font-light">
          A (Journey) Through Time
        </h2>
      </div>

      {/* SLIDER — uses data attributes for GSAP targeting */}
      <div className="absolute inset-0 flex items-center ">
        <div
          data-timeline-container
          className="flex items-center gap-[200px] will-change-transform"
          style={{
            paddingLeft: "25vw",
            paddingRight: "25vw",
          }}
        >
          {TIMELINE_DATA.map((slide, index) => (
            <div
              key={index}
              data-timeline-slide
              className="flex-shrink-0 w-[628px] h-full flex items-center justify-center relative"
            >
              <div className="w-full flex items-center justify-center gap-1 px-16">
                {/* LEFT TEXT */}
                <div
                  data-timeline-text-left
                  className="absolute left-[-30%] top-[40%] opacity-0"
                >
                  <h3 className="text-black text-xl italic font-light">
                    {slide.year}:<br />
                    {slide.title}

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
                className="absolute -bottom-20   left-1/2 -translate-x-1/2 w-full max-w-[900px] text-center opacity-0"
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