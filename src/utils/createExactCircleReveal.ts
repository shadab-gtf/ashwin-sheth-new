import gsap from 'gsap';

export const REVEAL_DURATION = 1.5;

/**
 * Creates a deterministic, scrub-compatible circle reveal timeline animation.
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
        zIndex = 10
    } = options;

    tl.set(circleEl, {
        clipPath: `circle(0% at ${origin})`,
        backgroundColor: color || undefined, 
        opacity: 1, 
        zIndex: zIndex, 
        willChange: 'clip-path'
    }, label);

    // The Reveal Tween
    tl.to(circleEl, {
        clipPath: `circle(150% at ${origin})`,
        duration: REVEAL_DURATION,
        ease: 'none', 
    }, label);
}

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
