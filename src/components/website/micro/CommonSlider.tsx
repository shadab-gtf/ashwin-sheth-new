"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
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
}: CommonSliderProps<T>) => {
    const [swiper, setSwiper] = useState<SwiperType | null>(null);
    const [progress, setProgress] = useState(0);


    const prevRef = useRef<HTMLButtonElement | null>(null);
    const nextRef = useRef<HTMLButtonElement | null>(null);

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
  const visible = swiper.params.slidesPerView as number;
  const current = swiper.activeIndex + visible;

  const value = Math.min(current / total, 1);
  setProgress(value);
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
                    updateProgress(s); // initial
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
            <div className="flex justify-center items-center gap-[10px] w-full max-w-[800px] mx-auto">
            {/* prgress bar */}
            {showProgress && (
            <div className="mt-6 flex items-center gap-4 w-full mx-auto">
                {/* Start count */}
                {/* <span className="text-sm text-black">
                   {data.length < 10 && 0}{Math.min(
                        Math.round(progress * data.length),
                        data.length
                    )}
                </span> */}
                {/* <span className="text-sm text-black">Total Photos {data.length < 10 && 0}{data.length}</span> */}
                        <span className="text-[18px] mr-[30px] font-medium uppercase tracking-[1px] text-black">
                            Total Photos {data.length < 10 && 0}{data.length}
                        </span>


                {/* Bar */}
                <div className="relative flex-1 h-[2px] bg-black/20 max-w-[400px]">
                    <div
                        className="absolute left-0 top-0 h-full bg-black transition-all duration-300"
                        style={{ width: `${progress * 100}%` }}
                    />
                </div>

                {/* End count */}
                {/* <span className="text-sm text-black">
                    {data.length < 10 && 0}{data.length}
                </span> */}
            </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-center gap-[40px] md:mt-[30px]">
                <button
                    ref={prevRef}
                    className="w-[50px] h-[50px] flex items-center justify-center text-black rounded-full hover:border transition"
                >
                    <MdKeyboardArrowLeft size={36} />
                </button>

                <button
                    ref={nextRef}
                    className="w-[50px] h-[50px] flex items-center justify-center text-black rounded-full hover:border transition"
                >
                    <MdKeyboardArrowRight size={36} />
                </button>
            </div>
            </div>

        </>
    );
};

export default CommonSlider;
