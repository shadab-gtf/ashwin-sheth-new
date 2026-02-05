'use client'

import React, { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import EnquiryForm from '@/components/common/form/EnquiryForm'
import Link from 'next/link'

gsap.registerPlugin(ScrollTrigger)


const data =[
  {title:"Landmark Projects",desc:"85+"},
  {title:"Sq. Ft. Construction",desc:"40M+"},
  {title:"Happy Families",desc:"35K+"},
  {title:"Underdevelopment",desc:"21M+"},
]



const OverviewNew = () => {
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
        <div className='px-[7%]'>
        <h2  className="overview-animate w-full max-w-[650px] mx-auto font-montserrat text-[32px] leading-[50px] font-normal tracking-[1px] capitalize text-[#F0801B] text-center">
  Designing the Present with a Vision of Tomorrow.
</h2>

       <p className="w-[70%] 2xl:w-[50%] mx-auto overview-animate font-montserrat my-[50px] text-[16px] leading-[25px] font-normal tracking-[1px] text-black text-center">
Since 1986, our journey of real estate has evolved but not changed. The impact we have created has been driven by our steadfast belief in the motto: Great designs solve real problems! For nearly 4 decades, Ashwin Sheth has shaped a legacy by building 80+ remarkable real estate projects in Mumbai and abroad.</p>

<Link href="/" className="overview-animate font-montserrat text-[18px] pb-[5px] font-medium tracking-[1px] border-b border-[#0E4194] uppercase text-[#0E4194] text-center block w-fit mx-auto">read more</Link>

      </div>
         <div className="px-[7%] grid md:grid-cols-4 md:gap-[50px] py-[10px] mt-[100px]">
              {data.map((item,index) =>(
                <div key={index} className='text-center'>
                  <h4 className="text-black text-center text-[24px] font-medium tracking-[3px] capitalize">
                    {item.desc}
                  </h4>
      
                  <p className="text-black mt-[20px] text-center text-[16px] font-normal tracking-[1px] uppercase">
                    {item.title}
                  </p>
      
                </div>
              ))}
            </div>
    </section>
  )
}

export default OverviewNew
