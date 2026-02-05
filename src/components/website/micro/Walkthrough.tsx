'use client';

import { useState } from 'react';
import { Play, X } from 'lucide-react';

const videos = [
    {
        id: 'WALKTHROUGH',
        label: 'WALKTHROUGH',
        thumbnail: '/assets/images/micro/thumbnail.png', // Luxury interior placeholder
        videoId: 'zQ6SYXDmvmA' // Placeholder ID - Rick Roll (classic placeholder) or generic real estate
    },
    {
        id: 'LIFESTYLE',
        label: 'LIFESTYLE VIDEO',
        thumbnail: 'https:/images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2670&auto=format&fit=crop', // Lifestyle placeholder
        videoId: 'LXb3EKWsInQ' // 4K Nature placeholder
    },
    {
        id: 'LOCATION',
        label: 'LOCATION VIDEO',
        thumbnail: 'https:/images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=2413&auto=format&fit=crop', // City placeholder
        videoId: 'ysz5S6PUM-U' // NYC placeholder
    },
];

export default function Walkthrough() {
    const [activeTab, setActiveTab] = useState('WALKTHROUGH');
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Get current active video data
    const currentVideo = videos.find(v => v.id === activeTab) || videos[0];

    return (
        <section id="video-gallery" className="pb-[100px] bg-[#FEF7F0]">
            <div className="container mx-auto px-6">

                {/* Tabs */}
                <div data-direction="bottom" className="reveal-text flex flex-wrap justify-center gap-4 md:gap-8 mb-12">
                    {videos.map(video => (
                        <button
                            key={video.id}
                            onClick={() => setActiveTab(video.id)}
                            className={`px-6 md:px-10 py-3 rounded border text-sm md:text-base font-bold tracking-widest uppercase transition-all duration-300 ${activeTab === video.id
                                    ? 'bg-[#1B4485] text-white border-[#1B4485]'
                                    : 'bg-transparent text-[#1B4485] border-[#1B4485] hover:bg-blue-50'
                                }`}
                        >
                            {video.label}
                        </button>
                    ))}
                </div>
                
            </div>

                {/* Video Thumbnail / Presentation Area */}
                <div data-direction="bottom" className="reveal-text relative h-[450px] 2xl:h-[520px] w-full aspect-video md:aspect-[21/9] bg-black overflow-hidden shadow-2xl group cursor-pointer" onClick={() => setIsModalOpen(true)}>
                    {/* Thumbnail Image */}
                    <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                        style={{ backgroundImage: `url(${currentVideo.thumbnail})` }}
                    />

                    {/* Dark Overlay with Branding */}
                    {/* <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center p-4">
                        <p className="text-white/80 font-serif tracking-[0.5em] text-sm md:text-xl mb-4 uppercase">Presenting</p>
                        <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif text-[#C5A25D] mb-2 tracking-wide">EDMONT</h2>
                        <p className="text-white font-light tracking-widest text-sm md:text-lg">KANDIVALI (W)</p>
                    </div> */}

                    {/* Play Button */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 transition-transform duration-300 group-hover:scale-110">
                        <div>
                            <img src="/assets/images/micro/youtube.png" alt="youtube logo" className='w-[80px]'/>
                        </div>
                    </div>
                </div>

                {/* Video Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-6 right-6 text-white hover:text-red-500 transition-colors"
                        >
                            <X className="w-10 h-10" />
                        </button>

                        <div className="w-full max-w-6xl aspect-video bg-black rounded-lg overflow-hidden shadow-2xl">
                            <iframe
                                className="w-full h-full"
                                src={`https://www.youtube.com/embed/${currentVideo.videoId}?autoplay=1&rel=0`}
                                title="YouTube video player"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                )}

        </section>
    );
}
