'use client';

import { useState } from 'react';

const features = [
    { title: 'Prime Location', description: 'Seamless connectivity to Malad, Goregaon and Andheri.' },
    { title: 'Ideal For Living & Investment', description: 'A perfect blend of connectivity, lifestyle and future value.' },
    { title: 'High Appreciation Potential', description: 'Strong long-term growth prospects in a thriving real estate market.' },
    { title: 'Lifestyle & Recreation', description: 'Parks, gardens, sports complexes and entertainment zones for a balanced lifestyle.' },
    { title: 'Seamless City Access', description: 'Quick and easy access to key commercial and business hubs across Mumbai.' },
    { title: 'Rapid Infrastructure Growth', description: 'Well-developed roads, modern transport, business parks and commercial complexes.' },
];

export default function Highlights() {
    const [activeTab, setActiveTab] = useState('HIGHLIGHTS');

    return (
        <section className="pb-[100px] bg-[#FEF7F0]">
            <div className="container mx-auto px-[80px] text-center">
                <h2  data-direction="bottom" className="reveal-text  text-[32px] leading-[50px]  tracking-[1px] md:text-4xl font-medium text-[#E37D24] mb-12">
                    Infuse Your Home With Values <br /> Of Smart Living
                </h2>

                <div  data-direction="bottom" className="reveal-text flex justify-center gap-6 mb-16">
                    <button
                        onClick={() => setActiveTab('HIGHLIGHTS')}
                        className={`px-8 py-3 rounded-md font-bold tracking-widest text-sm transition-all border ${activeTab === 'HIGHLIGHTS' ? 'bg-[#1B4485] text-white border-[#1B4485]' : 'bg-transparent text-[#1B4485] border-[#1B4485]'}`}
                    >
                        HIGHLIGHTS
                    </button>
                    <button
                        onClick={() => setActiveTab('SPECIFICATION')}
                        className={`px-8 py-3 rounded-md font-bold tracking-widest text-sm transition-all border ${activeTab === 'SPECIFICATION' ? 'bg-[#1B4485] text-white border-[#1B4485]' : 'bg-transparent text-[#1B4485] border-[#1B4485]'}`}
                    >
                        SPECIFICATION
                    </button>
                </div>

                {activeTab === 'HIGHLIGHTS' ? (
                    <div  data-direction="bottom" className=" reveal-text grid md:grid-cols-3  bg-gray-200 ">
                        {features.map((feature, idx) => (
                            <div key={idx} className={`bg-white ${idx < 3 && "border-b"} border-black/20 py-10 px-[25px] flex  items-center justify-between gap-[50px]  transition-shadow z-10`}>
                                <div>
                                <h3 className="font-bold text-lg text-gray-900">{feature.title}</h3>
                                <p className="text-gray-500 text-sm max-w-xs mt-[5px]">{feature.description}</p>
                                </div>
                                {(idx + 1) % 3 !== 0 &&
                                <span className='h-[50px] w-[1px] border-r border-black/20'></span>
                                }
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white p-20 border border-gray-200">
                        <p className="text-gray-500">Specifications content coming soon...</p>
                    </div>
                )}



            </div>
            <div  data-direction="bottom" className='reveal-text w-full mt-[100px]'>
                <img src="/assets/images/micro/highlights.jpg" alt="highlights"  className='h-[500px] w-full object-cover'/>
            </div>
        </section>
    );
}
