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
    loop?: boolean;
    breakpoints?: SwiperProps["breakpoints"];
    
}

const CommonSlider = <T,>({
    data,
    slidesPerView = 3,
    spaceBetween = 30,
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

        </>
    );
};

export default CommonSlider;
