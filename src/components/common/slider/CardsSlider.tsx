import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

import "swiper/css";
import "swiper/css/effect-cards";

interface CardsSliderProps<T> {
  data: T[];
  renderCard: (item: T, index: number) => React.ReactNode;
  containerClassName?: string;
    loop?: boolean;
}

const CardsSlider = <T,>({
  data,
  renderCard,
   containerClassName = "w-[300px]",
  loop,
}: CardsSliderProps<T>) => {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <div  className={`mx-auto text-center ${containerClassName}`}>
      <Swiper
        effect="cards"
        modules={[EffectCards]}
        allowTouchMove={false}
        loop={loop}
        grabCursor={false}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        cardsEffect={{
          slideShadows: false,
          perSlideOffset: 10,
          perSlideRotate: 2,
        }}
      >
        {data.map((item, index) => (
          <SwiperSlide key={index}>
            {renderCard(item, index)}
          </SwiperSlide>
        ))}
      </Swiper>

         <div className="flex items-center justify-center gap-[40px] md:mt-[30px]">
                      <button
                          onClick={() => swiperRef.current?.slidePrev()}
                          className="w-[50px] h-[50px] flex items-center justify-center text-black rounded-full hover:border transition"
                      >
                          <MdKeyboardArrowLeft size={36} />
                      </button>
      
                      <button
                          onClick={() => swiperRef.current?.slideNext()}
                          className="w-[50px] h-[50px] flex items-center justify-center text-black rounded-full hover:border transition"
                      >
                          <MdKeyboardArrowRight size={36} />
                      </button>
                  </div>
    </div>
  );
};

export default CardsSlider;
