import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const fadeUp = (element: string | Element, delay: number = 0) => {
    return gsap.fromTo(
        element,
        { opacity: 0, y: 50 },
        {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: delay,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: element,
                start: 'top 85%',
            },
        }
    );
};

export const staggerFadeUp = (elements: string | Element[], delay: number = 0, stagger: number = 0.1) => {
    return gsap.fromTo(
        elements,
        { opacity: 0, y: 50 },
        {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: delay,
            stagger: stagger,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: elements[0], // Trigger based on the first element
                start: 'top 85%',
            },
        }
    );
};

export const parallaxImage = (imgOrContainer: string | Element, yStart: number = -50, yEnd: number = 50) => {
    return gsap.fromTo(
        imgOrContainer,
        { y: yStart },
        {
            y: yEnd,
            ease: "none",
            scrollTrigger: {
                trigger: imgOrContainer,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        }
    )
}
