import gsap from 'gsap';

export function createFooterTimeline(
    scrollTL: gsap.core.Timeline,
    prevRefs: {
        brand: React.RefObject<HTMLDivElement | null>;
    },
    footerRefs: {
        footer: React.RefObject<HTMLDivElement | null>;
    }
) {
    /* Initial state */
    gsap.set(footerRefs.footer.current, {
        opacity: 0,
        pointerEvents: 'none',
    });

    scrollTL.addLabel('footer_reveal');

    /* Fade Brand slightly */
    scrollTL.to(
        prevRefs.brand.current,
        {
            opacity: 0.25,
            duration: 0.6,
            ease: 'power2.out',
        },
        'footer_reveal'
    );

    /* Lift Footer in */
    scrollTL.fromTo(
        footerRefs.footer.current,
        { opacity: 0, y: 80 },
        {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            pointerEvents: 'all',
        },
        'footer_reveal+=0.3'
    );

    /* Final hold */
    scrollTL.to({}, { duration: 1.2 });
}
