import gsap from 'gsap';

export const REVEAL_DURATION = 1.5;

/**
 * Creates a deterministic, scrub-compatible circle reveal timeline animation.
 * STRICTLY SCROLL-DRIVEN. NO AUTO-PLAY.
 * 
 * @param tl - The master timeline to add this reveal to.
 * @param circleEl - The element acting as the circle mask.
 * @param label - The label time in the master timeline to start the reveal.
 * @param options - Configuration options.
 */
export function createExactCircleReveal(
    tl: gsap.core.Timeline,
    circleEl: HTMLDivElement | null,
    label: string,
    options: {
        color?: string; // Optional override
        origin?: string; // default: '50% 100%' (bottom center)
        zIndex?: number; // Explicit Z-Index
    } = {}
) {
    if (!circleEl) return;

    const {
        color,
        origin = '50% 100%',
        zIndex = 20
    } = options;

    // IMPORTANT: We use an immediate .set in the timeline flow for the setup,
    // but to ensure it works with 'scrub', we simply assume the element is ready 
    // or we set it at the start of the timeline if needed.
    // Actually, for a scrub timeline, it's safer to use .fromTo or .to from a known state.

    // However, simpler approach: Just Tween.
    // We assume CSS or initial setup has hidden it or set it to circle(0%).

    // To be safe, we add a 0-duration tween at the start label to ensure state.
    tl.set(circleEl, {
        clipPath: `circle(0% at ${origin})`,
        backgroundColor: color || undefined, // Only set if provided, else keep CSS/default
        opacity: 1, // Ensure visible
        zIndex: zIndex, // usage of dynamic zIndex
        willChange: 'clip-path'
    }, label);

    // The Reveal Tween
    tl.to(circleEl, {
        clipPath: `circle(150% at ${origin})`,
        duration: REVEAL_DURATION,
        ease: 'none', // Linear scrub is best, or 'power1.inOut' for a bit of easing feeling while scrubbing
    }, label);

    // Note: We do NOT fade out. The next section will cover this one, 
    // OR this section stays visible as the "base".
    // If this section is an overlay, it stays.
}

/**
 * Center-out reveal (e.g., for Earth Center)
 */
export function createExactCircleRevealCenter(
    tl: gsap.core.Timeline,
    circleEl: HTMLDivElement | null,
    label: string,
    options: {
        color?: string;
        zIndex?: number;
    } = {}
) {
    createExactCircleReveal(tl, circleEl, label, {
        ...options,
        origin: '50% 50%'
    });
}
