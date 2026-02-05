'use client'

import React, { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import Link from 'next/link'
import { div } from 'three/tsl'
import EnquiryForm from '@/components/common/form/EnquiryForm'
// import EnquiryForm from '@/components/common/form/EnquiryForm'

gsap.registerPlugin(ScrollTrigger)

const data =[
  {title:"apartments",desc:"2 & 3 Bed Residences"},
  {title:"total area",desc:"2.02 acres"},
  {title:"Total Units",desc:"249 in tower 1"},
  {title:"status",desc:"Underdevelopment"},
]


const Overview = () => {
    const [open, setOpen] = useState(false);

  const sectionRef = useRef(null)

useEffect(() => {
  const ctx = gsap.context(() => {
    gsap.from('.overview-animate', {
      y: 40,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out',
      stagger: 0.15,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
    })
  }, sectionRef)

  return () => ctx.revert()
}, [])



  return (
    <section ref={sectionRef} className='py-[50px] md:py-[100px] bg-[#FEF7F0]'>
      <div className='px-[7%] grid grid-cols-12 md:gap-[100px]'>
        <div className="md:col-span-1"></div>
        <div className='col-span-12 md:col-span-6'>
          <div className='flex flex-col items-center justify-center h-full'>

            <h2 className="overview-animate w-full text-[32px] leading-[50px] font-medium tracking-[1px] capitalize text-[#F0801B] text-center">
              Home to India’s Most Iconic Residential Lifestyle Experience
            </h2>

            <p className="w-full overview-animate my-[50px] text-[16px] leading-[25px] font-normal tracking-[1px] text-black text-center">
              Edmont by Ashwin Sheth Group is a landmark luxury development in Kandivali West, spread across 2.02 acres with three 51-storey towers. Designed for refined living, it offers elegantly crafted 2 & 3 BHK residences with sweeping views of Manori Creek and lush greens. Blending contemporary design with future-ready luxury, Edmont delivers a sophisticated lifestyle at one of Mumbai’s most coveted addresses. </p>
            <button onClick={() => setOpen(true)} className="overview-animate text-[18px] pb-[5px] font-medium tracking-[1px] border-b border-[#0E4194] uppercase text-[#0E4194] text-center block w-fit mx-auto">
              Download Brochure
            </button>
          </div>
        </div>
        <div className='col-span-12 md:col-span-5'>
          <img src="/assets/images/micro/overview.jpg" alt="overview" className='h-[500px] object-contain' />
        </div>

      </div>
      <div className="px-[7%] grid md:grid-cols-4 md:gap-[50px] py-[10px] mt-[100px]">
        {data.map((item,index) =>(
          <div key={index} className='text-center'>
            <h4 className="text-black text-center text-[24px] font-medium tracking-[3px] capitalize">
              {item.title}
            </h4>

            <p className="text-black mt-[20px] text-center text-[16px] font-normal tracking-[1px] uppercase">
              {item.desc}
            </p>

          </div>
        ))}
      </div>
      <EnquiryForm open={open} onClose={() => setOpen(false)} />
    </section>
  )
}

export default Overview
