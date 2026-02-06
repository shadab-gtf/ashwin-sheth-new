'use client'

import { useRef, useState } from 'react'
import { X } from 'lucide-react'
import { FaPlay } from 'react-icons/fa'

import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperType } from 'swiper'
import { Navigation } from 'swiper/modules'
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi';

import 'swiper/css'
import 'swiper/css/navigation'

/* ---------------------------------- */
/* TYPES */
/* ---------------------------------- */

type VideoItem = {
  id: number
  src: string
}

/* ---------------------------------- */
/* DATA */
/* ---------------------------------- */

const constructionVideos = {
  2026: [
    { id: 1, src: '/videos/micro/construction.mp4' },
    { id: 2, src: '/videos/micro/construction.mp4' },
  ],
  2025: [
    { id: 3, src: '/videos/micro/construction.mp4' },
  ],
  2024: [],
} as const

type Year = keyof typeof constructionVideos

const years: Year[] = [2026,2025, 2024]

/* ---------------------------------- */
/* COMPONENT */
/* ---------------------------------- */

const Construction = () => {
  const [activeYear, setActiveYear] = useState<Year>(years[0])
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null)

  const videos = constructionVideos[activeYear]
  const swiperRef = useRef<SwiperType | null>(null)

  return (
    <section className="pb-[100px] bg-[#FEF7F0]">

      {/* Heading */}
      <h2
        data-direction="bottom"
        className="reveal-text text-[32px] leading-[50px] tracking-[1px] md:text-4xl font-medium text-[#E37D24] mb-8 text-center"
      >
        Construction Video
      </h2>

      {/* YEAR TABS */}
      <div className="flex justify-center gap-4 mb-12 flex-wrap">

        {years.map((year) => (
          <button
            key={year}
            onClick={() => setActiveYear(year)}
            className={`px-8 py-2 border font-semibold transition-all duration-300
              ${activeYear === year
                ? 'bg-[#1B4485] text-white border-[#1B4485]'
                : 'border-[#1B4485] text-[#1B4485] hover:bg-blue-50'
              }`}
          >
            {year}
          </button>
        ))}

      </div>

      {/* VIDEO SLIDER */}
      {/* VIDEO SLIDER */}
      <div className="relative max-w-[800px] mx-auto px-6">

        {/* LEFT ARROW */}
        {videos.length > 1 && (
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="absolute -left-16 top-1/2 -translate-y-1/2
                 w-12 h-12 rounded-full bg-white shadow-md
                 text-[#1B4485] flex items-center justify-center z-10"
          >
            <HiOutlineChevronLeft size={24} />
          </button>
        )}

        {/* SWIPER (FIXED WIDTH, CENTERED) */}
        <Swiper
  slidesPerView={1}
  spaceBetween={20}
  onSwiper={(swiper) => (swiperRef.current = swiper)}
>
  {videos.length === 0 ? (
    <SwiperSlide>
      <div className="h-[400px] bg-white max-w-[700px] mx-auto flex flex-col items-center justify-center text-center px-4">
        <p className="text-[#1B4485] tracking-[0.3em] text-sm md:text-base font-semibold uppercase">
          Coming Soon
        </p>
      </div>
    </SwiperSlide>
  ) : (
    videos.map((video) => (
      <SwiperSlide key={video.id}>
        <div
          data-direction="bottom"
          className="reveal-text relative h-[400px] max-w-[700px] mx-auto cursor-pointer overflow-hidden shadow-xl"
          onClick={() => setSelectedVideo(video)}
        >
          <video
            src={video.src}
            muted
            playsInline
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <div className="w-[70px] h-[70px] rounded-full bg-white/90 text-[#1B4485] flex items-center justify-center">
              <FaPlay className="ml-[3px]" />
            </div>
          </div>
        </div>
      </SwiperSlide>
    ))
  )}
</Swiper>

        {/* RIGHT ARROW */}
        {videos.length > 1 && (
          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="absolute -right-16 top-1/2 -translate-y-1/2
                 w-12 h-12 rounded-full bg-white shadow-md
                 text-[#1B4485] flex items-center justify-center z-10"
          >
            <HiOutlineChevronRight size={24} />
          </button>
        )}

      </div>


      {/* MODAL */}
      {selectedVideo && (

        <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4">

          <button
            onClick={() => setSelectedVideo(null)}
            className="absolute top-6 right-6 text-white hover:text-red-500 transition"
          >
            <X size={40} />
          </button>

          <div className="w-full max-w-6xl aspect-video bg-black rounded-lg overflow-hidden shadow-2xl">

            <video
              src={selectedVideo.src}
              autoPlay
              controls
              playsInline
              className="w-full h-full object-cover"
            />

          </div>

        </div>

      )}

    </section>
  )
}

export default Construction
