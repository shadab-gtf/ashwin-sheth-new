'use client';

import { useState, useRef, useEffect } from 'react';
import { useLayoutEffect } from "react";
import { Play, X } from 'lucide-react';
import gsap from 'gsap';
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const videos = [
    {
        id: 'WALKTHROUGH',
        label: 'WALKTHROUGH',
        thumbnail: '/assets/images/micro/youtube-thumbnail.webp',
        videoId: 'zQ6SYXDmvmA'
    },
    {
        id: 'LIFESTYLE',
        label: 'LIFESTYLE VIDEO',
        thumbnail: '',
        videoId: ''
    },
    {
        id: 'LOCATION',
        label: 'LOCATION VIDEO',
        thumbnail: '',
        videoId: ''
    },
];

type Video = {
    id: string;
    label: string;
    thumbnail: string;
    videoId: string;
};

export default function Walkthrough() {
    const [activeTab, setActiveTab] = useState('WALKTHROUGH');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
    const sectionRef = useRef<HTMLDivElement | null>(null);
    const videoContainerRef = useRef<HTMLDivElement | null>(null);

    // Get current active video data
    const currentVideo = videos.find(v => v.id === activeTab) || videos[0];
    const isComingSoon = !currentVideo.videoId || !currentVideo.thumbnail;

    // Handle video thumbnail area - trigger white header on scroll
    useLayoutEffect(() => {
        if (!videoContainerRef.current) return;

        const trigger = ScrollTrigger.create({
            trigger: videoContainerRef.current,
            start: "top center",
            end: "bottom top",
            onEnter: () => {
                window.dispatchEvent(new Event("header-white"));
            },
            onEnterBack: () => {
                window.dispatchEvent(new Event("header-white"));
            },
            onLeave: () => {
                window.dispatchEvent(new Event("header-black"));
            },
            onLeaveBack: () => {
                window.dispatchEvent(new Event("header-black"));
            },
        });

        return () => {
            trigger.kill();
        };
    }, []);

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
            <div
                ref={videoContainerRef}
                data-direction="bottom"
                className={`reveal-text relative h-[90vh] w-full mx-auto aspect-video md:aspect-[21/9] overflow-hidden shadow-2xl group ${isComingSoon ? 'bg-[#1B4485]/10 cursor-not-allowed' : 'bg-black cursor-pointer'
                    }`}
                onClick={() => {
                    if (!isComingSoon) {
                        setSelectedVideo(currentVideo);
                        setIsModalOpen(true);
                    }
                }}

            >
                {!isComingSoon ? (
                    <>
                        {/* Thumbnail */}
                        <div
                            className="absolute inset-0 bg-cover bg-top transition-transform duration-700"
                            style={{ backgroundImage: `url(${currentVideo.thumbnail})` }}
                        />

                        {/* Play Button */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 transition-transform duration-300 group-hover:scale-110">
                            <img
                                src="/assets/images/micro/youtube.png"
                                alt="youtube logo"
                                className="w-[80px]"
                            />
                        </div>
                    </>
                ) : (
                    /* Coming Soon State */
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                        <p className="text-[#1B4485] tracking-[0.3em] text-sm md:text-base font-semibold uppercase mb-4">
                            Coming Soon
                        </p>
                        <div className="w-20 h-20 rounded-full border-2 border-dashed border-[#1B4485]/50 flex items-center justify-center">
                            <Play className="w-8 h-8 text-[#1B4485]/50" />
                        </div>
                    </div>
                )}
            </div>


            {/* Video Modal */}
            {isModalOpen && selectedVideo && (
                <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
                    <button
                        onClick={() => {
                            setIsModalOpen(false);
                            setSelectedVideo(null);
                        }}
                        className="absolute top-6 right-6 text-white hover:text-red-500 transition-colors"
                    >
                        <X className="w-10 h-10" />
                    </button>

                    <div className="w-full max-w-6xl aspect-video bg-black rounded-lg overflow-hidden shadow-2xl">
                        <iframe
                            className="w-full h-full"
                            src={`https://www.youtube.com/embed/${selectedVideo.videoId}?autoplay=1&rel=0`}
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        />
                    </div>
                </div>
            )}


        </section>
    );
}