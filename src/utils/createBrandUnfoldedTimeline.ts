import gsap from 'gsap';

export function createBrandUnfoldedTimeline(
    scrollTL: gsap.core.Timeline,
    prevRefs: {
        blog: React.RefObject<HTMLDivElement | null>;
        circleBlog: React.RefObject<HTMLDivElement | null>;
    },
    brandRefs: {
        brand: React.RefObject<HTMLDivElement | null>;
        circleBrand: React.RefObject<HTMLDivElement | null>;
    }
) {
    /* ---------- INITIAL STATES ---------- */
    gsap.set(brandRefs.brand.current, {
        opacity: 0,
        pointerEvents: 'none',
    });

    gsap.set(brandRefs.circleBrand.current, {
        opacity: 1,
        clipPath: 'circle(0% at 50% 100%)',
        backgroundColor: '#000',
    });

    scrollTL.addLabel('brand_reveal');

    /* 1️⃣ Black circle wipe from Blog */
    scrollTL.to(
        brandRefs.circleBrand.current,
        {
            clipPath: 'circle(150% at 50% 100%)',
            duration: 1.3,
            ease: 'power3.inOut',
        },
        'brand_reveal'
    );

    /* 2️⃣ Fade blog underneath */
    scrollTL.to(
        prevRefs.blog.current,
        {
            opacity: 0,
            duration: 0.6,
            ease: 'power2.in',
        },
        'brand_reveal+=0.35'
    );

    /* 3️⃣ Reveal Brand section */
    scrollTL.to(
        brandRefs.brand.current,
        {
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            pointerEvents: 'all',
        },
        'brand_reveal+=0.6'
    );

    /* 4️⃣ Remove black overlay */
    scrollTL.to(
        brandRefs.circleBrand.current,
        {
            opacity: 0,
            duration: 0.6,
            ease: 'power2.out',
        },
        'brand_reveal+=0.85'
    );

    /* 5️⃣ Gentle stagger for Brand content */
    const brandContent = brandRefs.brand.current?.querySelectorAll('[data-reveal]');
    if (brandContent) {
        scrollTL.fromTo(
            brandContent,
            { opacity: 0, y: 24 },
            {
                opacity: 1,
                y: 0,
                stagger: 0.12,
                duration: 0.8,
                ease: 'power3.out',
            },
            'brand_reveal+=0.75'
        );
    }

    /* 6️⃣ Hold */
    scrollTL.to({}, { duration: 1.2 });
}
