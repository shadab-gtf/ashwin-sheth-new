// import gsap from 'gsap';

// interface BottomCircleRevealOptions {
//     color?: string;
//     origin?: 'bottom' | 'center';
//     duration?: number;
//     fadeOut?: boolean;
// }

// /**
//  * 🔥 Time-based bottom/center circle reveal
//  * Scroll NEVER controls duration
//  */
// export function playBottomCircleReveal(
//     circleEl: HTMLDivElement,
//     {
//         color = '#000',
//         origin = 'bottom',
//         duration = 1.25,
//         fadeOut = true,
//     }: BottomCircleRevealOptions = {}
// ) {
//     const originPos =
//         origin === 'bottom' ? '50% 100%' : '50% 50%';

//     gsap.set(circleEl, {
//         opacity: 1,
//         backgroundColor: color,
//         clipPath: `circle(0% at ${originPos})`,
//         willChange: 'clip-path',
//     });

//     const tl = gsap.timeline();

//     tl.to(circleEl, {
//         clipPath: `circle(150% at ${originPos})`,
//         duration,
//         ease: 'power3.inOut',
//     });

//     if (fadeOut) {
//         tl.to(
//             circleEl,
//             {
//                 opacity: 0,
//                 duration: 0.4,
//                 ease: 'power2.out',
//             },
//             '-=0.25'
//         );
//     }

//     return tl;
// }
