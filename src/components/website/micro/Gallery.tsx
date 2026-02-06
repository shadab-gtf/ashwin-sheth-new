"use client"
import React, { useState } from "react"
import CommonSlider from "./CommonSlider"
import Image from "next/image"
import Lightbox from "yet-another-react-lightbox"
import useGsapReveal from '@/hooks/useGsapReveal'

const data = [
  { src: "/assets/images/micro/gallery/1.jpg", alt: "image 1" },
  { src: "/assets/images/micro/gallery/2.jpg", alt: "image 2" },
  { src: "/assets/images/micro/gallery/3.jpg", alt: "image 3" },
  { src: "/assets/images/micro/gallery/4.webp", alt: "image 4" },
  { src: "/assets/images/micro/gallery/5.webp", alt: "image 5" },
  { src: "/assets/images/micro/gallery/6.webp", alt: "image 6" },
]

const Gallery = () => {
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)
  useGsapReveal();

  return (
    <>
      <section className="bg-[#FEF7F0] pb-[50px] md:pb-[100px]">
        <h2 data-direction="bottom" className="reveal-text w-full max-w-[800px] mx-auto  text-[32px] leading-[50px] font-medium  tracking-[1px] capitalize text-[#F0801B] text-center">
          Every Image Tells a Story of Elegance, Captured in Time.
        </h2>

        <div className="mt-[50px]">
          <CommonSlider
            data={data}
            loop={false}
            showProgress={true}
            slidesPerView={1.2}
            breakpoints={{
              0: { slidesPerView: 1 },
              768: { slidesPerView: 1.2 },
            }}
            spaceBetween={20}
            renderItem={(item, i) => (
              <div
                className="relative cursor-pointer group h-[550px]"
                onClick={() => {
                  setIndex(i)
                  setOpen(true)
                }}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover"
                />
              </div>
            )}
          />
        </div>
      </section>

      {/* 🔥 Lightbox */}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={data}
      />
    </>
  )
}

export default Gallery
