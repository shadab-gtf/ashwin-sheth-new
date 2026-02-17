// "use client"
// import React, { useState } from "react"
// import CommonSlider from "./CommonSlider"
// import Image from "next/image"
// import Lightbox from "yet-another-react-lightbox"
// import useGsapReveal from '@/hooks/useGsapReveal'

// const data = [
//   { src: "/assets/images/micro/gallery/1.jpg", alt: "image 1" },
//   { src: "/assets/images/micro/gallery/2.jpg", alt: "image 2" },
//   { src: "/assets/images/micro/gallery/3.jpg", alt: "image 3" },
//   { src: "/assets/images/micro/gallery/4.webp", alt: "image 4" },
//   { src: "/assets/images/micro/gallery/5.webp", alt: "image 5" },
//   { src: "/assets/images/micro/gallery/6.webp", alt: "image 6" },
// ]

// const Gallery = () => {
//   const [open, setOpen] = useState(false)
//   const [index, setIndex] = useState(0)
//   useGsapReveal();

//   return (
//     <>
//       <section className="bg-[#FEF7F0] pb-[50px] md:pb-[100px]">
//         <h2 data-direction="bottom" className="reveal-text w-full max-w-[800px] mx-auto  text-[32px] leading-[50px] font-medium  tracking-[1px] capitalize text-[#F0801B] text-center">
//           Every Image Tells a Story of Elegance, Captured in Time.
//         </h2>

//         <div className="mt-[50px]">
//           <CommonSlider
//             data={data}
//             loop={false}
//             showProgress={true}
//             slidesPerView={1.2}
//             breakpoints={{
//               0: { slidesPerView: 1 },
//               768: { slidesPerView: 1.2 },
//             }}
//             spaceBetween={20}
//             renderItem={(item, i) => (
//               <div
//                 className="relative cursor-pointer group h-[550px]"
//                 onClick={() => {
//                   setIndex(i)
//                   setOpen(true)
//                 }}
//               >
//                 <Image
//                   src={item.src}
//                   alt={item.alt}
//                   fill
//                   className="object-cover"
//                 />
//               </div>
//             )}
//           />
//         </div>
//       </section>

//       {/* 🔥 Lightbox */}
//       <Lightbox
//         open={open}
//         close={() => setOpen(false)}
//         index={index}
//         slides={data}
//       />
//     </>
//   )
// }

// export default Gallery



// "use client"
// import React, { useState } from "react"
// import CommonSlider from "./CommonSlider"
// import Image from "next/image"
// import Lightbox from "yet-another-react-lightbox"
// import useGsapReveal from '@/hooks/useGsapReveal'


// const data = [
//   { src: "/assets/images/micro/gallery/1.jpg", alt: "image 1" },
//   { src: "/assets/images/micro/gallery/2.jpg", alt: "image 2" },
//   { src: "/assets/images/micro/gallery/3.jpg", alt: "image 3" },
//   { src: "/assets/images/micro/gallery/4.webp", alt: "image 4" },
//   { src: "/assets/images/micro/gallery/5.webp", alt: "image 5" },
//   { src: "/assets/images/micro/gallery/6.webp", alt: "image 6" },
// ]

// const Gallery = () => {
//   const [open, setOpen] = useState(false)
//   const [index, setIndex] = useState(0)
//   useGsapReveal();

//   return (
//     <>
//       <section className="bg-[#FEF7F0] pb-[50px] md:pb-[100px]">
//         <h2 data-direction="bottom" className="reveal-text w-full max-w-[800px] mx-auto  text-[32px] leading-[50px] font-medium  tracking-[1px] capitalize text-[#F0801B] text-center">
//           Every Image Tells a Story of Elegance, Captured in Time.
//         </h2>

//         <div className="mt-[50px]">
//           <CommonSlider
//             data={data}
//             loop={false}
//             showProgress={true}
//             slidesPerView={1.2}
//             breakpoints={{
//               0: { slidesPerView: 1 },
//               768: { slidesPerView: 1.2 },
//             }}
//             spaceBetween={20}
//             renderItem={(item, i) => (
//               <div className="relative pb-[50px]">
//               <div
//                 className="relative cursor-pointer group h-[550px]"
//                 onClick={() => {
//                   setIndex(i)
//                   setOpen(true)
//                 }}
//               >
//                 <Image
//                   src={item.src}
//                   alt={item.alt}
//                   fill
//                   className="object-cover"
//                 />
//                 <span className="uppercase absolute bottom-[10px] left-[50px] bg-black/10 p-[10px]">Render Image</span>
//               </div>
//               <p className="text-center  w-fit absolute right-[35%] bottom-0 mt-[50px] uppercase text-[18px] font-medium tracking-[1px]  text-black">{item.alt}</p>
//               </div>
//             )}
//           />
//         </div>
//       </section>

//       {/* 🔥 Lightbox */}
//       <Lightbox
//         open={open}
//         close={() => setOpen(false)}
//         index={index}
//         slides={data}
//       />
//     </>
//   )
// }

// export default Gallery


"use client"
import React, { useState } from "react"
import CommonSlider from "./CommonSlider"
import Image from "next/image"
import Lightbox from "yet-another-react-lightbox"
import "yet-another-react-lightbox/styles.css";
import useGsapReveal from '@/hooks/useGsapReveal'

const data = [
  { src: "/assets/gallery/building-evelation-3-n.png", title: "Building Elevation", alt: "image 1" },
  { src: "/assets/gallery/building-elevation-2-n.png", title: "Building Elevation", alt: "image 3" },
  { src: "/assets/gallery/building-elevation-1.png", title: "Building Elevation", alt: "image 2" },
  { src: "/assets/gallery/play-park.jpg", title: "Landscape Garden", alt: "image 4" },
  { src: "/assets/gallery/pool.jpg", title: "Swimming Pool", alt: "image 5" },
  { src: "/assets/gallery/living-room.jpg", title: "Living Room", alt: "image 6" },
  { src: "/assets/gallery/master-bedroom.jpg", title: "Master Bedroom", alt: "image 7" },
  { src: "/assets/gallery/kitchen.jpg", title: "Kitchen", alt: "image 8" },
  { src: "/assets/gallery/bathroom.jpg", title: "Bathroom", alt: "image 9" },
]

const Gallery = () => {
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)
  useGsapReveal();

  return (
    <>
      <section className="bg-[#FEF7F0] pb-[50px] md:pb-[100px]">
        <h2 data-direction="bottom" className="reveal-text w-full max-w-[800px] mx-auto  text-[24px] md:text-[32px] leading-[36px] md:leading-[50px] font-medium  tracking-[1px] capitalize text-[#F0801B] text-center">
          Every Image Tells a Story of Elegance, Captured in Time.
        </h2>

        <div className="mt-[30px] md:mt-[50px]">
          <CommonSlider
            data={data}
            loop={false}
            showProgress={true}
            slidesPerView={1.2}
            breakpoints={{
              0: { slidesPerView: 1, spaceBetween: 10 },
              768: { slidesPerView: 1.2, spaceBetween: 20 },
            }}
            spaceBetween={20}
            getItemTitle={(item) => item.title}
            renderItem={(item, i) => (
              <div
                className="relative cursor-pointer group h-[300px] md:h-[550px] po"
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
        render={{
          slide: ({ slide }) =>
            slide.type === "image" ? (
              <div className="relative w-full h-full">
                <Image
                  src={slide.src}
                  alt={slide.alt || ""}
                  fill
                  className="object-contain"
                  sizes="100vw 100vh"
                  priority
                />
              </div>
            ) : undefined,
        }}
      />
    </>
  )
}

export default Gallery
