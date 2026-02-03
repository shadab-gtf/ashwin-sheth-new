'use client';

import {
    useRef,
    useEffect,
    useImperativeHandle,
    forwardRef,
} from 'react';

interface VideoStageProps {
    src: string;
    className?: string;
    isActive?: boolean;
    onPlayReady?: () => void;

    /** Overlay controls */
    overlay?: boolean;
    overlayOpacity?: number;
    overlayClassName?: string;
}

const VideoStage = forwardRef<HTMLVideoElement, VideoStageProps>(
    (
        {
            src,
            className,
            isActive = false,
            onPlayReady,
            overlay = true,
            overlayOpacity = 0.4,
            overlayClassName = '',
        },
        ref
    ) => {
        const videoRef = useRef<HTMLVideoElement>(null);

        useImperativeHandle(ref, () => videoRef.current!);

        useEffect(() => {
            const video = videoRef.current;
            if (!video) return;

            let cancelled = false;

            const playSafe = async () => {
                try {
                    video.currentTime = 0;
                    await video.play();
                    if (!cancelled && onPlayReady) onPlayReady();
                } catch {
                    setTimeout(() => {
                        if (!cancelled) {
                            video.play().catch(() => {});
                        }
                    }, 100);
                }
            };

            if (isActive) {
                if (video.readyState >= 2) {
                    playSafe();
                } else {
                    const onLoaded = () => playSafe();
                    video.addEventListener('loadeddata', onLoaded, { once: true });
                }
            }

            return () => {
                cancelled = true;
            };
        }, [isActive, onPlayReady]);

        return (
            <div
                className={`relative w-full h-full overflow-hidden ${className ?? ''}`}
            >
                {/* VIDEO */}
                <video
                    ref={videoRef}
                    src={src}
                    muted
                    loop
                    playsInline
                    preload="auto"
                    className="absolute inset-0 w-full h-full object-cover"
                    onError={(e) =>
                        console.error('Video load error:', src, e)
                    }
                />

                {/* OVERLAY */}
                {overlay && (
                    <div
                        className={`
                            pointer-events-none
                            absolute inset-0
                            transition-opacity duration-700 ease-out
                            ${overlayClassName}
                        `}
                        style={{
                            background:
                                'linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 40%, rgba(0,0,0,0.65) 100%)',
                            opacity: isActive ? overlayOpacity : overlayOpacity + 0.15,
                        }}
                    />
                )}
            </div>
        );
    }
);

VideoStage.displayName = 'VideoStage';

export default VideoStage;
