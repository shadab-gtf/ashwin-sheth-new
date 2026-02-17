// "use client";

// import { useEffect, useRef, useState, ReactNode } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import type { Swiper as SwiperType } from "swiper";
// import { Navigation } from "swiper/modules";
// import type { NavigationOptions } from "swiper/types";
// import { SwiperProps } from "swiper/react";

// import "swiper/css";

// import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

// /* ---------- Props Type ---------- */
// interface CommonSliderProps<T> {
//     data: T[];
//     slidesPerView?: number;
//     spaceBetween?: number;
//     renderItem: (item: T, index: number) => ReactNode;
//     containerClass?: string;
//     showProgress?: boolean;
//     speed?: number;
//     loop?: boolean;
//     breakpoints?: SwiperProps["breakpoints"];

// }

// const CommonSlider = <T,>({
//     data,
//     slidesPerView = 3,
//     spaceBetween = 30,
//     speed = 900,
//     renderItem,
//     containerClass = "",
//     showProgress = false,
//     breakpoints,
//     loop,
// }: CommonSliderProps<T>) => {
//     const [swiper, setSwiper] = useState<SwiperType | null>(null);
//     const [progress, setProgress] = useState(0);


//     const prevRef = useRef<HTMLButtonElement | null>(null);
//     const nextRef = useRef<HTMLButtonElement | null>(null);

//     useEffect(() => {
//         if (!swiper || !prevRef.current || !nextRef.current) return;

//         const navigation = swiper.params.navigation as NavigationOptions;

//         requestAnimationFrame(() => {
//             navigation.prevEl = prevRef.current;
//             navigation.nextEl = nextRef.current;

//             swiper.navigation.init();
//             swiper.navigation.update();
//         });
//     }, [swiper]);

//     const updateProgress = (swiper: SwiperType) => {
//   const total = swiper.slides.length;
//   const visible = swiper.params.slidesPerView as number;
//   const current = swiper.activeIndex + visible;

//   const value = Math.min(current / total, 1);
//   setProgress(value);
// };


//     return (
//         <>
//             <Swiper
//                 modules={[Navigation]}
//                 loop={loop}
//                 speed={speed}
//                 slidesPerView={slidesPerView}
//                 breakpoints={breakpoints}
//                 spaceBetween={spaceBetween}
//                 onSwiper={(s) => {
//                     setSwiper(s);
//                     updateProgress(s); // initial
//                 }}
//                 onSlideChange={updateProgress} 
//                 className={containerClass}
//             >
//                 {data.map((item, i) => (
//                     <SwiperSlide key={i}>
//                         {renderItem(item, i)}
//                     </SwiperSlide>
//                 ))}
//             </Swiper>
//             <div className="flex justify-center items-center gap-[10px] w-full max-w-[800px] mx-auto">
//             {/* prgress bar */}
//             {showProgress && (
//             <div className="mt-6 flex items-center gap-4 w-full mx-auto">
//                 {/* Start count */}
//                 {/* <span className="text-sm text-black">
//                    {data.length < 10 && 0}{Math.min(
//                         Math.round(progress * data.length),
//                         data.length
//                     )}
//                 </span> */}
//                 {/* <span className="text-sm text-black">Total Photos {data.length < 10 && 0}{data.length}</span> */}
//                         <span className="text-[18px] mr-[30px] font-medium uppercase tracking-[1px] text-black">
//                             Total Photos {data.length < 10 && 0}{data.length}
//                         </span>


//                 {/* Bar */}
//                 <div className="relative flex-1 h-[2px] bg-black/20 max-w-[400px]">
//                     <div
//                         className="absolute left-0 top-0 h-full bg-black transition-all duration-300"
//                         style={{ width: `${progress * 100}%` }}
//                     />
//                 </div>

//                 {/* End count */}
//                 {/* <span className="text-sm text-black">
//                     {data.length < 10 && 0}{data.length}
//                 </span> */}
//             </div>
//             )}

//             {/* Navigation */}
//             <div className="flex items-center justify-center gap-[40px] md:mt-[30px]">
//                 <button
//                     ref={prevRef}
//                     className="w-[50px] h-[50px] flex items-center justify-center text-black rounded-full hover:border transition"
//                 >
//                     <MdKeyboardArrowLeft size={36} />
//                 </button>

//                 <button
//                     ref={nextRef}
//                     className="w-[50px] h-[50px] flex items-center justify-center text-black rounded-full hover:border transition"
//                 >
//                     <MdKeyboardArrowRight size={36} />
//                 </button>
//             </div>
//             </div>

//         </>
//     );
// };

// export default CommonSlider;  

"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import gsap from "gsap";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Navigation } from "swiper/modules";
import type { NavigationOptions } from "swiper/types";
import { SwiperProps } from "swiper/react";

import "swiper/css";

import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

/* ---------- Props Type ---------- */
interface CommonSliderProps<T> {
    data: T[];
    slidesPerView?: number;
    spaceBetween?: number;
    renderItem: (item: T, index: number) => ReactNode;
    containerClass?: string;
    showProgress?: boolean;
    speed?: number;
    loop?: boolean;
    breakpoints?: SwiperProps["breakpoints"];
    getItemTitle?: (item: T) => string;
}

const CommonSlider = <T,>({
    data,
    slidesPerView = 3,
    spaceBetween = 30,
    speed = 900,
    renderItem,
    containerClass = "",
    showProgress = false,
    breakpoints,
    loop,
    getItemTitle,
}: CommonSliderProps<T>) => {
    const [swiper, setSwiper] = useState<SwiperType | null>(null);
    const [progress, setProgress] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(1);
    const [currentTitle, setCurrentTitle] = useState("");

    // Refs for animation
    const titleRef = useRef<HTMLParagraphElement>(null);
    const prevIndexRef = useRef(0);

    const prevRef = useRef<HTMLButtonElement | null>(null);
    const nextRef = useRef<HTMLButtonElement | null>(null);

    // Initialize title
    useEffect(() => {
        if (data.length > 0 && getItemTitle) {
            setCurrentTitle(getItemTitle(data[0]));
        }
    }, [data, getItemTitle]);

    useEffect(() => {
        if (!swiper || !prevRef.current || !nextRef.current) return;

        const navigation = swiper.params.navigation as NavigationOptions;

        requestAnimationFrame(() => {
            navigation.prevEl = prevRef.current;
            navigation.nextEl = nextRef.current;

            swiper.navigation.init();
            swiper.navigation.update();
        });
    }, [swiper]);

    const updateProgress = (swiper: SwiperType) => {
        const total = swiper.slides.length;
        const current = swiper.realIndex + 1;

        // Determine direction
        const isNext = swiper.realIndex > prevIndexRef.current;
        const isdiff = swiper.realIndex !== prevIndexRef.current;
        prevIndexRef.current = swiper.realIndex;

        setCurrentIndex(current);
        const value = current / total;
        setProgress(value);

        // Animate Title
        if (getItemTitle && titleRef.current && isdiff) {
            const newTitle = getItemTitle(data[swiper.realIndex]);

            // Kill any running animations to prevent "laggy" overlap
            gsap.killTweensOf(titleRef.current);

            // Directions
            const clipFull = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"; // Visible
            const clipRight = "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)"; // Hidden Right
            const clipLeft = "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)"; // Hidden Left

            const tl = gsap.timeline();

            // OUT Animation
            tl.to(titleRef.current, {
                clipPath: isNext ? clipRight : clipLeft, // Wipe out
                duration: 0.8, // Slower OUT
                ease: "expo.in",
                onComplete: () => {
                    // Direct DOM update for instant swap
                    if (titleRef.current) titleRef.current.textContent = newTitle;
                }
            })
                .set(titleRef.current, {
                    clipPath: isNext ? clipLeft : clipRight // Prepare for entry (Hidden on opposite side)
                })
                .to(titleRef.current, {
                    clipPath: clipFull, // Reveal
                    duration: 1.4, // Slow, luxury reveal IN
                    ease: "expo.out",
                    // delay: 0.1 // Slight pause for elegance
                });
        }
    };


    return (
        <>
            <Swiper
                modules={[Navigation]}
                loop={loop}
                speed={speed}
                slidesPerView={slidesPerView}
                breakpoints={breakpoints}
                spaceBetween={spaceBetween}
                onSwiper={(s) => {
                    setSwiper(s);
                    if (getItemTitle) setCurrentTitle(getItemTitle(data[s.realIndex]));
                    const current = s.realIndex + 1;
                    setCurrentIndex(current);
                    setProgress(current / s.slides.length);
                    prevIndexRef.current = s.realIndex;
                }}
                onSlideChange={updateProgress}
                className={containerClass}
            >
                {data.map((item, i) => (
                    <SwiperSlide key={i}>
                        {renderItem(item, i)}
                    </SwiperSlide>
                ))}
            </Swiper>

            {getItemTitle && (
                <div className="w-full max-w-[800px] mx-auto mt-[20px] overflow-hidden">
                    <p ref={titleRef} className="text-[20px] text-center font-medium text-black uppercase tracking-wider relative">
                        {currentTitle}
                    </p>
                </div>
            )}

            <div className="flex items-center justify-between gap-4 w-full max-w-[800px] mx-auto mt-[10px]">
                <button
                    ref={prevRef}
                    className="w-[50px] h-[50px] flex items-center justify-center text-black rounded-full hover:border border-black/10 transition flex-shrink-0"
                >
                    <MdKeyboardArrowLeft size={36} />
                </button>

                {showProgress && (
                    <div className="flex-1 flex items-center gap-4">
                        {/* <span className="text-[18px] font-medium uppercase tracking-[1px] text-black shrink-0">
                            {currentIndex < 10 && 0}{currentIndex}
                        </span> */}

                        <div className="relative flex-1 h-[2px] bg-black/20">
                            <div
                                className="absolute left-0 top-0 h-full bg-black transition-all duration-300"
                                style={{ width: `${progress * 100}%` }}
                            />
                        </div>
                    </div>
                )}

                <button
                    ref={nextRef}
                    className="w-[50px] h-[50px] flex items-center justify-center text-black rounded-full hover:border border-black/10 transition flex-shrink-0"
                >
                    <MdKeyboardArrowRight size={36} />
                </button>
            </div>
        </>
    );
};

export default CommonSlider;

