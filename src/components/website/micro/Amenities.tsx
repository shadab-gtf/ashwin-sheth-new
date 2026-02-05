'use client';
import gsap from 'gsap'
import { useRef, useEffect } from 'react';
import { staggerFadeUp } from '@/lib/animations';

import { Library, Waves, PartyPopper, Dumbbell, Flower2, Utensils, Music, Baby } from 'lucide-react';
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const amenities = [
    {
        icon: "/assets/images/micro/amenities/1.png",
        title: 'Multipurpose Hall',
    },
    {
        icon: "/assets/images/micro/amenities/2.png",
        title: 'Library',
    },
    {
        icon: "/assets/images/micro/amenities/3.png",
        title: 'Swimming Pool',
    },
    {
        icon: "/assets/images/micro/amenities/4.png",
        title: 'Party Lawn',
    },
    {
        icon: "/assets/images/micro/amenities/5.png",
        title: 'Walking Track',
    },
    {
        icon: "/assets/images/micro/amenities/6.png",
        title: 'Kids\' Play Area',
    },
    {
        icon: "/assets/images/micro/amenities/7.png",
        title: 'Private Theatre',
    },
    {
        icon: "/assets/images/micro/amenities/8.png",
        title: 'Yoga Zone',
    },
];

export default function Amenities() {
    const containerRef = useRef<HTMLDivElement>(null);

    // useEffect(() => {
    //     if (containerRef.current) {
    //         const items = containerRef.current.querySelectorAll('.amenity-item');
    //         staggerFadeUp(Array.from(items), 0, 0.05);
    //     }
    // }, []);

    useEffect(() => {
  const ctx = gsap.context(() => {
    gsap.from('.amenity-item', {
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.12,
      scrollTrigger: {
        trigger: '#amenities',
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
    })
  })

  return () => ctx.revert()
}, [])


    return (
        <section id="amenities" className="pb-[100px] bg-[#FEF7F0] text-center">
            <div className="container mx-auto px-6">
                <div className="mb-16 max-w-3xl mx-auto">
                    <h2 data-direction="bottom" className="reveal-text text-3xl md:text-4xl leading-[60px] font-medium text-[#E37D24] mb-4">
                        Stunning Luxury Prime Residences, <br /> Designed For Life
                    </h2>
                </div>

                <div ref={containerRef} className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12 max-w-5xl mx-auto">
                    {amenities.map((item, idx) => (
                        <div
                            key={idx}
                            className="amenity-item flex flex-col items-center gap-4 group cursor-default"
                        >
                            <div className="p-4 rounded-full  text-gray-700  transition-colors duration-300">
                                <img src={item.icon} alt={item.title} className='w-[40px] h-[40px] filter brightness-0 saturate-100'/>
                            </div>
                            <h3 className="text-sm md:text-base font-medium text-gray-800">{item.title}</h3>
                        </div>
                    ))}
                </div>

                <div className="mt-16">
                    <button className="text-[#1B4485] font-bold tracking-widest uppercase text-sm border-b pb-1 border-[#1B4485] hover:opacity-80 transition-opacity">
                        Explore More Amenities
                    </button>
                </div>
            </div>
        </section>
    );
}
