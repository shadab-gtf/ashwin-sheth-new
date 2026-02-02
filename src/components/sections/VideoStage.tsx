'use client';

import { useRef, useEffect, useImperativeHandle, forwardRef } from 'react';

interface VideoStageProps {
    src: string;
    className?: string;
    isActive?: boolean;
    onPlayReady?: () => void;
}

const VideoStage = forwardRef<HTMLVideoElement, VideoStageProps>(
    ({ src, className, isActive = false, onPlayReady }, ref) => {
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
                    if (!cancelled && onPlayReady) {
                        onPlayReady();
                    }
                } catch (err: any) {
                    setTimeout(() => {
                        if (!cancelled) {
                            video.play().catch(() => { });
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
            } else {
                video.pause();
                video.currentTime = 0;
            }

            return () => {
                cancelled = true;
            };
        }, [isActive, onPlayReady]);

        return (
            <video
                ref={videoRef}
                src={src}
                muted
                loop
                playsInline
                preload="auto"
                className={className}
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                }}
                onError={(e) => console.error('Video load error:', src, e)}
            />
        );
    }
);

VideoStage.displayName = 'VideoStage';

export default VideoStage;
