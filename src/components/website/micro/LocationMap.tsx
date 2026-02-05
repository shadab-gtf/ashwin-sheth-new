
'use client';

import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import type { Swiper as SwiperType } from 'swiper';
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { IoIosArrowDown } from "react-icons/io";

/* ================= DATA ================= */

export const LOCATION_DATA = [
  {
    key: "eat-drink",
    label: "Eat And Drink",
    dropdown: [
      {
        key: "grocery",
        name: "Grocery Stores",
        image: "/assets/images/micro/location/stores.png",
        places: [
          { title: "D-Mart", distance: "1.6 km" },
          { title: "Reliance Smart", distance: "1.2 km" },
          { title: "Nature’s Basket", distance: "1.0 km" },
        ],
      },
      {
        key: "restaurants",
        name: "Restaurants",
        image: "/assets/images/micro/location/restaurants.png",
        places: [
          { title: "Joey’s Pizza", distance: "0.9 km" },
          { title: "Cream Centre", distance: "1.1 km" },
          { title: "Sammy Sosa", distance: "1.2 km" },
        ],
      },
      {
        key: "cafes",
        name: "Cafes & Bars",
        image: "/assets/images/micro/location/cafe.png",
        places: [
          { title: "Starbucks", distance: "1.0 km" },
          { title: "British Brewing Company", distance: "1.1 km" },
        ],
      },
    ],
  },
  {
    key: "transportation",
    label: "Transportation",
    dropdown: [
      {
        key: "metro",
        name: "Metro Station",
        image: "/assets/images/micro/location/metro.png",
        places: [
          { title: "Lower Juhu Metro Station", distance: "1.6 km" },
          { title: "Oshiwara–Ram Mandir Metro Station", distance: "2.4 km" },
        ],
      },
      {
        key: "railway",
        name: "Railway Station",
        image: "/assets/images/micro/location/train-station.png",
        places: [
          { title: "Kandivali Railway Station", distance: "1.4 km" },
          { title: "Malad Railway Station", distance: "3.2 km" },
        ],
      },
      {
        key: "bus",
        name: "Bus Stops",
        image: "/assets/images/micro/location/bus-stop.png",
        places: [
          { title: "Jain Mandir Bus Stop", distance: "0.4 km" },
          { title: "Kala Maruti Mandir Bus Stop", distance: "0.6 km" },
        ],
      },
    ],
  },
  {
    key: "attractions",
    label: "Attractions",
    dropdown: [
      {
        key: "parks",
        name: "Parks & Open Spaces",
        image: "/assets/images/micro/location/park.png",
        places: [
          { title: "Kamala Vihar Joggers’ Park", distance: "0.8 km" },
          { title: "Panchasheel Joggers’ Park", distance: "1.1 km" },
          { title: "Sanjay Gandhi National Park", distance: "4.5 km" },
        ],
      },
      {
        key: "shopping",
        name: "Shopping & Entertainment",
        image: "/assets/images/micro/location/cinema.png",
        places: [
          { title: "Raghuleela Mall", distance: "1.9 km" },
          { title: "Mahavir Nagar", distance: "1.0 km" },
          { title: "Inorbit Mall Malad", distance: "5.8 km" },
        ],
      },
      {
        key: "culture",
        name: "Leisure & Culture",
        image: "/assets/images/micro/location/leisure.png",
        places: [
          { title: "Mayur Cinema", distance: "0.9 km" },
          { title: "Mindspace Malad", distance: "5.5 km" },
          { title: "Kanheri Caves", distance: "6.5 km" },
        ],
      },
    ],
  },
] as const;

/* ================= COMPONENT ================= */

type TabKey = typeof LOCATION_DATA[number]["key"];

const LocationMap = () => {
  const [activeTab, setActiveTab] = useState<TabKey>("eat-drink");
  const [activeIndex, setActiveIndex] = useState(0);
  const [openKey, setOpenKey] = useState<string | null>(LOCATION_DATA[0].dropdown[0].key);
  const swiperRef = useRef<SwiperType | null>(null);

  const activeTabData = LOCATION_DATA.find(t => t.key === activeTab)!;
  // const activeDropdown = activeTabData.dropdown[activeIndex];
  const activeDropdown = activeTabData.dropdown.find(
    item => item.key === openKey
  );

  return (
    <section className="py-[50px] md:py-[100px] bg-[#FEF7F0] border-t border-black">
      <div>

        <h2
          data-direction="bottom"
          className="reveal-text text-center text-[32px] leading-[50px] tracking-[1px] font-medium text-[#E37D24] mb-12"
        >
          Step Into Your Exclusive Haven
        </h2>

        {/* ================= TABS ================= */}
        <div data-direction="bottom" className="reveal-text flex justify-center gap-6 mb-16">
          {LOCATION_DATA.map(tab => (
            <button
              key={tab.key}
              onClick={() => {
                setActiveTab(tab.key);
                setActiveIndex(0);
                setOpenKey(tab.dropdown[0]?.key ?? null);
                swiperRef.current?.slideTo(0);
              }}
              className={`px-8 py-3 rounded-md font-bold tracking-widest text-sm border
                ${activeTab === tab.key
                  ? 'bg-[#1B4485] text-white'
                  : 'text-[#1B4485] border-[#1B4485]'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ================= SWIPER ================= */}
        <div data-direction="bottom" className="reveal-text relative max-w-[800px] mx-auto mb-[50px]">

          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="absolute left-[-10%] top-[45%] -translate-y-1/2 z-20 w-12 h-12 text-[#0E4194] flex items-center justify-center"
          >
            <GoArrowLeft size={24} />
          </button>

          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="absolute right-[-10%] top-[45%] -translate-y-1/2 z-20 w-12 h-12 text-[#0E4194] flex items-center justify-center"
          >
            <GoArrowRight size={24} />
          </button>

          <Swiper
            modules={[Navigation]}
            spaceBetween={50}
            slidesPerView={1}
            breakpoints={{ 768: { slidesPerView: 3 } }}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            onSlideChange={(swiper) => {
              setActiveIndex(swiper.realIndex);
            }}
          >
            {activeTabData.dropdown.map((item) => (
              <SwiperSlide key={item.key}>
                <div
                  onClick={() =>
                    setOpenKey(openKey === item.key ? null : item.key)
                  }
                  className="flex items-center justify-center gap-2 px-6 cursor-pointer"
                >
                  <img src={item.image} className="h-[30px]" />
                  <p className="text-[#0E4194]">{item.name}</p>
                  <IoIosArrowDown
                    className={`text-[#0E4194] transition-transform ${openKey === item.key ? "rotate-180" : ""
                      }`}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* ================= MAP + LIST ================= */}
        <div className="w-full relative">
          {activeDropdown && (
            <div className="bg-white p-[20px] w-[300px] flex flex-col gap-[20px] absolute top-0 left-[25%] z-10">
              {activeDropdown.places.map((item, index) => (
                <div
                  key={index}
                  className="w-full flex justify-between items-center text-black"
                >
                  <span>{item.title}</span>
                  <span>{item.distance}</span>
                </div>
              ))}
            </div>
          )}
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3767.716561316398!2d72.84200073488769!3d19.207578299999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b6d9129510a1%3A0xae98e7bd01d78422!2sSheth%20Edmont%20Kandivali!5e0!3m2!1sen!2sin!4v1769774277092!5m2!1sen!2sin" width="600" height="500" style={{
            border: 0,
            width: "100%"
          }} loading="lazy" ></iframe>
        </div>

      </div>
    </section>
  );
};

export default LocationMap;
