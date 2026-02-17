"use client";
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'
const links = [
  {label:"Residential",link:"/projects"},
  {label:"Commercial",link:"/projects"},
  {label:"The Orange Circle",link:"/the-orange-circle"},
]


const TopFooter = () => {
  return (
    <div className=' bg-[var(--secondary)] text-white border-b border-[#ffffff36] pt-[60px] pb-[25px] md:py-[20px]'>
      <div className='flex items-center justify-between gap-[15px] wrapper'>
      <div className='md:mx-0 mx-auto'><Image src={"/logo-white.svg"} alt='logo' width={200} height={100}/></div>
      <div>
          <ul className="hidden md:flex gap-8">
          {links.map((item,index) => (
            <li
              key={index}
              className="cursor-pointer font-normal text-base leading-normal tracking-[0.5px] capitalize hover:text-blue-400 transition-colors"
            >
              <Link className='text-white font-graphik-regular' href={item.link}>
              {item.label}
              </Link>
              
            </li>
          ))}
        </ul>
      </div>
      </div>
      
    </div>
  )
}

export default TopFooter