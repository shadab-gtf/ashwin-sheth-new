'use client';

import { useLayoutEffect } from 'react';
import gsap from 'gsap';

type IntroParams = {
  container: HTMLElement | null;
  video: HTMLElement | null;
  logo: HTMLElement | null;
  headerSelector: string;
  content: HTMLElement[];
};

export function useIntroReveal({
  container,
  video,
  logo,
  headerSelector,
  content
}: IntroParams) {
  useLayoutEffect(() => {
    if (!container || !video || !logo) return;

    document.body.style.overflow = 'hidden';

    const tl = gsap.timeline({
      defaults: { ease: 'power2.inOut' },
      onComplete: () => {
        document.body.style.overflow = 'auto';
      }
    });

    // initial states
    gsap.set(video, { clipPath: 'circle(12% at 50% 50%)' });
    gsap.set(logo, { opacity: 0 });
    gsap.set(headerSelector, { opacity: 0, y: -20 });
    gsap.set(content, { opacity: 0, y: 20 });

    // 🔴 Circle auto reveal (NO SCROLL)
    tl.to(video, {
      clipPath: 'circle(150% at 50% 50%)',
      duration: 1.8
    });

    // 🟠 Logo show after 500ms
    tl.to({}, { duration: 0.5 });
    tl.to(logo, { opacity: 1, duration: 0.25 });

    // 🔵 Logo hide after 500ms
    tl.to({}, { duration: 0.5 });
    tl.to(logo, { opacity: 0, duration: 0.25 });

    // 🟢 Header → content → scroll indicator
    tl.to(headerSelector, { opacity: 1, y: 0, duration: 0.6 });
    tl.to(content, { opacity: 1, y: 0, stagger: 0.15, duration: 0.6 });

    return () => { tl.kill(); };
  }, [container, video, logo, headerSelector, content]);
}
