// "use client";

// import { useRef, useLayoutEffect, useState } from "react";
// import gsap from "gsap";
// import ScrollTrigger from "gsap/ScrollTrigger";
// import IntroSection, {
//   createIntroTimeline,
// } from "@/components/sections/Introsection";
// import VideoSection2 from "@/components/sections/Videosection2";
// import VideoSection3 from "@/components/sections/Videosection3";
// import EarthIntroSection from "@/components/sections/Earthintrosection";
// import EarthSplitSection from "@/components/sections/Earthsplitsection";
// import { masterTimelineStore } from "@/utils/masterTimeline";
// import HorizontalSliderSection, {
//   createHorizontalSliderTimeline,
// } from "@/components/sections/Horizontalslidersection";
// import ProjectSection, {
//   createProjectTimeline,
// } from "@/components/sections/ProjectSection";
// import BlogSection from "@/components/sections/Blogsection";
// import BrandUnfoldedSection from "@/components/sections/BrandUnfoldedSection";
// import Footer from "@/components/common/footer/Footer";
// import { lockScroll, unlockScroll } from "@/utils/scrollLock";
// import { createExactCircleReveal } from "@/utils/createExactCircleReveal";

// gsap.registerPlugin(ScrollTrigger);

// // ─── Constants ───────────────────────────────────────────────────────────────

// const T = {
//   REVEAL: 1.4,
//   FADE: 0.2,
//   CONTENT_DELAY: 0.6,
//   TEXT_DELAY: 0.8,
//   HOLD: 1.2,
//   GAP: 1,
//   EARTH_MOVE: 1.6,
//   SPLIT_DELAY: 0.3,
// } as const;

// const E = {
//   PRIMARY: "power4.inOut",
//   FADE: "power2.inOut",
//   IN: "power3.out",
//   OUT: "power3.in",
//   SMOOTH: "sine.inOut",
//   EARTH: "power2.inOut",
// } as const;

// type HeaderMode = "white" | "black";

// // ─── Config ──────────────────────────────────────────────────────────────────

// const VIDEO_TRANSITIONS = [
//   {
//     label: "v1",
//     videoIndex: 1,
//     headerMode: "white" as HeaderMode,
//     zCircle: 22,
//     zContent: 23,
//     fadeOut: ["intro.text1", "intro.scrollDown"],
//     fadeIn: { video: "video2.video2", text: "video2.text2" },
//     circle: "video2.video2",
//     prepEarth: false,
//   },
//   {
//     label: "v2",
//     videoIndex: 2,
//     headerMode: "white" as HeaderMode,
//     zCircle: 24,
//     zContent: 25,
//     fadeOut: ["video2.text2"],
//     fadeIn: { video: "video3.video3", text: "video3.text3" },
//     circle: "video3.video3",
//     prepEarth: true,
//   },
// ];

// // ─── Helpers ───────────────

// const resolve = (refs: any, path: string): HTMLDivElement | null =>
//   path.split(".").reduce((o, k) => o?.[k], refs)?.current ?? null;

// const setHeader = (mode: HeaderMode) => {
//   window.dispatchEvent(new Event(`header-${mode}`));
// };

// const gap = (tl: gsap.core.Timeline, d: number = T.GAP) =>
//   tl.to({}, { duration: d });

// const fadeOut = (
//   tl: gsap.core.Timeline,
//   targets: (HTMLElement | null)[],
//   label: string,
// ) => {
//   const els = targets.filter(Boolean);
//   if (els.length)
//     tl.to(els, { opacity: 0, duration: T.FADE, ease: E.FADE }, label);
// };

// const reveal = (
//   tl: gsap.core.Timeline,
//   el: HTMLElement | null,
//   label: string,
//   opts: {
//     zIndex: number;
//     delay?: number;
//     from?: gsap.TweenVars;
//     to?: gsap.TweenVars;
//   },
// ) => {
//   if (!el) return;
//   const { zIndex, delay = 0, from = { opacity: 0 }, to } = opts;
//   tl.set(el, { zIndex }, label).fromTo(
//     el,
//     from,
//     {
//       opacity: 1,
//       duration: T.REVEAL,
//       ease: E.IN,
//       ...to,
//       onComplete: () => {
//         gsap.set(el, { pointerEvents: "all" });
//       },
//     },
//     `${label}+=${delay}`,
//   );
// };

// // ─── Ref Factory ─────────────

// function useRefMap() {
//   return {
//     intro: {
//       logo: useRef(null),
//       video1: useRef(null),
//       text1: useRef(null),
//       scrollDown: useRef(null),
//     },
//     video2: {
//       video2: useRef(null),
//       text2: useRef(null),
//       scrollDown: useRef(null),
//     },
//     video3: { video3: useRef(null), text3: useRef(null) },
//     earthIntro: {
//       earth: useRef(null),
//       scrollDown: useRef(null),
//       earthScrollDown: useRef(null),
//       circleWhite1: useRef(null),
//     },
//     earthSplit: {
//       gridContent: useRef(null),
//       stats: useRef(null),
//       circleWhite2: useRef(null),
//     },
//     slider: { slider: useRef(null), circleFinal: useRef(null) },
//     project: { section: useRef(null), circleReveal: useRef(null) },
//     blog: { blog: useRef(null), circleBlog: useRef(null) },
//     brand: { brand: useRef(null), circleBrand: useRef(null) },
//     footer: { footer: useRef(null) },
//   };
// }

// type RefMap = ReturnType<typeof useRefMap>;

// // ─── Timeline Builders ───────────────────────────────────────────────────────

// function buildVideoTransitions(
//   tl: gsap.core.Timeline,
//   refs: RefMap,
//   setActiveVideo: (v: number) => void,
// ) {
//   VIDEO_TRANSITIONS.forEach(
//     ({
//       label,
//       headerMode,
//       fadeOut: outs,
//       circle,
//       zCircle,
//       zContent,
//       videoIndex,
//       fadeIn,
//       prepEarth,
//     }) => {
//       tl.addLabel(label).call(
//         () => {
//           setHeader(headerMode);
//           setActiveVideo(videoIndex);
//         },
//         undefined,
//         label,
//       );

//       fadeOut(
//         tl,
//         outs.map((p) => resolve(refs, p)),
//         label,
//       );

//       // CLIP REVEAL
//       createExactCircleReveal(tl, resolve(refs, circle), label, {
//         color: undefined,
//         zIndex: zCircle,
//       });

//       // REVEAL CONTENT
//       reveal(tl, resolve(refs, fadeIn.text), label, {
//         zIndex: zContent,
//         delay: T.TEXT_DELAY,
//       });

//       if (prepEarth) {
//         const earth = refs.earthIntro.earth.current;
//         if (earth) {
//           tl.set(
//             earth,
//             { y: "70vh", scale: 0.7, opacity: 0, zIndex: 20 },
//             label,
//           ).to(
//             earth,
//             { opacity: 1, duration: T.CONTENT_DELAY, ease: E.IN },
//             `${label}+=1`,
//           );
//         }
//       }

//       gap(tl);
//     },
//   );
// }

// function buildEarthSequence(
//   tl: gsap.core.Timeline,
//   refs: RefMap,
//   setActiveVideo: (v: number) => void,
// ) {
//   const { earth, earthScrollDown, circleWhite1 } = refs.earthIntro;
//   const { gridContent, stats, circleWhite2 } = refs.earthSplit;

//   // Earth Intro - CHANGE TO BLACK HEADER
//   tl.addLabel("earth_intro").call(
//     () => setHeader("black"),
//     undefined,
//     "earth_intro",
//   );
//   fadeOut(tl, [refs.video3.text3.current], "earth_intro");
//   createExactCircleReveal(tl, circleWhite1.current, "earth_intro", {
//     color: "#FFF8F0",
//     zIndex: 26,
//   });

//   // EARTH CENTER
//   if (earth.current) {
//     tl.set(
//       earth.current,
//       { y: "75vh", scale: 0.6, opacity: 1, zIndex: 27 },
//       "earth_intro",
//     ).to(
//       earth.current,
//       { y: "18vh", scale: 1.0, duration: T.EARTH_MOVE, ease: E.EARTH },
//       "earth_intro+=0.2",
//     );
//   }

//   reveal(tl, earthScrollDown.current, "earth_intro", {
//     zIndex: 27,
//     delay: 1.8,
//     from: { opacity: 0, y: 10, visibility: "hidden" },
//     to: { opacity: 1, y: 0, visibility: "visible", duration: 0.5, ease: E.IN },
//   });
//   gap(tl, 1.2);

//   // Earth Center
//   tl.addLabel("earth_center").call(
//     () => {
//       setHeader("black");
//       setActiveVideo(-1);
//     },
//     undefined,
//     "earth_center",
//   );
//   fadeOut(
//     tl,
//     [earthScrollDown.current, refs.video3.video3.current],
//     "earth_center",
//   );
//   gap(tl, 1.5);

//   tl.addLabel("earth_split").call(
//     () => setHeader("black"),
//     undefined,
//     "earth_split",
//   );

//   if (earth.current) {
//     tl.to(
//       earth.current,
//       {
//         xPercent: 35,
//         yPercent: 15,
//         x: -0.054,
//         y: "15vh",
//         scale: 1.1,
//         duration: T.EARTH_MOVE,
//         ease: E.EARTH,
//       },
//       "earth_split",
//     );
//   }

//   if (gridContent.current) {
//     tl.set(
//       gridContent.current,
//       { zIndex: 29, pointerEvents: "none" },
//       "earth_split",
//     ).fromTo(
//       gridContent.current,
//       { x: -60, opacity: 0 },
//       { x: 0, opacity: 1, pointerEvents: "all", duration: 1.2, ease: E.IN },
//       `earth_split+=${T.SPLIT_DELAY}`,
//     );
//   }

//   if (stats.current) {
//     tl.set(stats.current, { zIndex: 29 }, "earth_split").fromTo(
//       stats.current,
//       { y: 30, opacity: 0 },
//       { y: 0, opacity: 1, duration: 1.0, ease: E.IN },
//       `earth_split+=${T.SPLIT_DELAY + 0.2}`,
//     );
//   }

//   const EARTH_SPLIT_HOLD = 0.4;
//   gap(tl, EARTH_SPLIT_HOLD);

//   // Before Slider
//   tl.addLabel("before_slider");
//   createExactCircleReveal(tl, circleWhite2.current, "before_slider", {
//     color: "lab(98 1.43 4.72)",
//     zIndex: 58,
//   });

//   const exits: [HTMLElement | null, gsap.TweenVars][] = [
//     [gridContent.current, { opacity: 0, x: -30 }],
//     [stats.current, { opacity: 0, y: 20 }],
//     [earth.current, { opacity: 0, scale: 0.9 }],
//   ];
//   exits.forEach(([el, props]) => {
//     if (el)
//       tl.to(el, { ...props, duration: 0.8, ease: E.OUT }, "before_slider");
//   });
//   gap(tl, 0.6);
// }

// function buildSlider(tl: gsap.core.Timeline, refs: RefMap) {
//   createHorizontalSliderTimeline(
//     tl,
//     {
//       earth: refs.earthIntro.earth,
//       gridContent: refs.earthSplit.gridContent,
//       stats: refs.earthSplit.stats,
//     },
//     { slider: refs.slider.slider, circleFinal: refs.slider.circleFinal },
//   );
// }

// function buildProjectSection(tl: gsap.core.Timeline, refs: RefMap) {
//   const projectSection = refs.project.section.current;
//   const circleReveal = refs.project.circleReveal.current;

//   // Transition: slider → projects - CHANGE TO BLACK HEADER
//   tl.addLabel("project_reveal").call(
//     () => setHeader("white"),
//     undefined,
//     "project_reveal",
//   );

//   // Fade out slider
//   if (refs.slider.slider.current) {
//     tl.to(
//       refs.slider.slider.current,
//       {
//         opacity: 0,
//         pointerEvents: "none",
//         duration: 1.0,
//         ease: E.OUT,
//       },
//       "project_reveal",
//     );
//   }

//   // Circle reveal
//   if (circleReveal) {
//     createExactCircleReveal(tl, circleReveal, "project_reveal", {
//       color: "#ffffffff",
//       zIndex: 61,
//     });
//   }

//   // Reveal project section
//   if (projectSection) {
//     tl.set(
//       projectSection,
//       { zIndex: 62, pointerEvents: "none" },
//       "project_reveal",
//     ).to(
//       projectSection,
//       {
//         opacity: 1,
//         pointerEvents: "all",
//         duration: 0.8,
//         ease: E.IN,
//       },
//       "project_reveal+=0.5",
//     );
//   }

//   // Internal stripe-stack transitions
//   createProjectTimeline(tl, refs.project.section);
// }

// function buildBlogBrandFooter(tl: gsap.core.Timeline, refs: RefMap) {
//   // Blog
//   tl.addLabel("blog_reveal").call(
//     () => setHeader("black"),
//     undefined,
//     "blog_reveal",
//   );

//   // Fade out projects
//   if (refs.project.section.current) {
//     tl.to(
//       refs.project.section.current,
//       {
//         opacity: 0,
//         pointerEvents: "none",
//         duration: 0.8,
//         ease: E.OUT,
//       },
//       "blog_reveal",
//     );
//   }

//   createExactCircleReveal(tl, refs.blog.circleBlog.current, "blog_reveal", {
//     color: "#fff",
//     zIndex: 70,
//   });
//   reveal(tl, refs.blog.blog.current, "blog_reveal", {
//     zIndex: 71,
//     delay: 0.4,
//     from: { opacity: 0, y: 0, scale: 1 },
//     to: {
//       opacity: 1,
//       y: 0,
//       scale: 1,
//       pointerEvents: "all",
//       duration: 1.2,
//       ease: E.IN,
//     },
//   });
//   gap(tl, 2.5);

//   // Brand
//   tl.addLabel("brand_reveal").call(
//     () => setHeader("black"),
//     undefined,
//     "brand_reveal",
//   );
//   if (refs.blog.blog.current) {
//     tl.to(
//       refs.blog.blog.current,
//       {
//         opacity: 0,
//         scale: 0.92,
//         y: 0,
//         pointerEvents: "none",
//         duration: 1.0,
//         ease: E.OUT,
//       },
//       "brand_reveal",
//     );
//   }
//   createExactCircleReveal(tl, refs.brand.circleBrand.current, "brand_reveal", {
//     color: "#FFF8F0",
//     zIndex: 72,
//   });
//   reveal(tl, refs.brand.brand.current, "brand_reveal", {
//     zIndex: 73,
//     delay: 0.4,
//     from: { opacity: 0, y: 0, scale: 1 },
//     to: {
//       opacity: 1,
//       y: 0,
//       scale: 1,
//       pointerEvents: "all",
//       duration: 1.2,
//       ease: E.IN,
//     },
//   });
//   gap(tl, 0.5);

//     tl.addLabel("footer_reveal").call(() => setHeader("black"), undefined, "footer_reveal");
//   fadeOut(tl, [refs.brand.brand.current], "footer_reveal");
//   if (refs.footer.footer.current) {
//     tl.set(refs.footer.footer.current, { zIndex: 80 }, "footer_reveal")
//       .fromTo(
//         refs.footer.footer.current,
//         { y: "100%", opacity: 1, scale: 1 },
//         {
//           y: "0%", scale: 1,
//           duration: T.REVEAL * 1.2, ease: E.IN,
//           onComplete: () => { gsap.set(refs.footer.footer.current, { pointerEvents: "all" }); },
//         },
//         "footer_reveal"
//       );
//   }
// }

// // ─── Main Component ──────────────────────────────────────────────────────────

// export default function MasterSequence() {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const [activeVideo, setActiveVideo] = useState(0);
//   const refs = useRefMap();

//   useLayoutEffect(() => {
//     lockScroll();

//     const ctx = gsap.context(() => {
//       ScrollTrigger.addEventListener("refreshInit", () => {
//         // if (refs.footer.footer.current) {
//         //   gsap.set(refs.footer.footer.current, {
//         //     visibility: "hidden",
//         //     pointerEvents: "none",
//         //   });
//         // }
//       });

//       const introTL = createIntroTimeline(refs.intro);

//       introTL
//         .eventCallback("onComplete", () => {
//           window.dispatchEvent(new Event("show-header"));
//           setHeader("white");
//           unlockScroll();
//           buildMasterTimeline();
//         })
//         .play(0);
//       // if (refs.footer.footer.current) {
//       //   gsap.set(refs.footer.footer.current, {
//       //     visibility: "visible",
//       //     opacity: 1,
//       //     y: "100%",
//       //     pointerEvents: "none",
//       //   });
//       // }
//       function buildMasterTimeline() {
//         ScrollTrigger.refresh();

//         const master = gsap.timeline({
//           scrollTrigger: {
//             trigger: containerRef.current,
//             start: "top top",
//             end: "+=3000%",
//             pin: true,
//             scrub: 1,
//             anticipatePin: 1,
//             invalidateOnRefresh: true,
//             onRefresh: () => {
//               const pinned = containerRef.current;
//               if (pinned?.parentElement)
//                 pinned.parentElement.style.pointerEvents = "none";
//               if (pinned) pinned.style.pointerEvents = "auto";
//             },
//           },
//         });
//         masterTimelineStore.tl = master;

//         // Compose the full scroll sequence
//         buildVideoTransitions(master, refs, setActiveVideo);
//         buildEarthSequence(master, refs, setActiveVideo);
//         buildSlider(master, refs);
//         buildProjectSection(master, refs);
//         buildBlogBrandFooter(master, refs);
//       }
//     }, containerRef);

//     return () => ctx.revert();
//   }, []);

//   return (
//     <section
//       ref={containerRef}
//       className="relative w-full h-auto overflow-hidden bg-[#FFF8F0] pointer-events-none!"
//       style={{ perspective: "2000px", transformStyle: "preserve-3d" }}
//     >
//       <div className="relative w-full h-screen">
//         {/* Video layers */}
//         <IntroSection refs={refs.intro} activeVideo={activeVideo} />
//         <VideoSection2 refs={refs.video2} activeVideo={activeVideo} />
//         <VideoSection3 refs={refs.video3} activeVideo={activeVideo} />

//         {/* Earth layers */}
//         <EarthIntroSection refs={refs.earthIntro} />
//         <EarthSplitSection
//           gridContentRef={refs.earthSplit.gridContent}
//           statsRef={refs.earthSplit.stats}
//           circleWhite2Ref={refs.earthSplit.circleWhite2}
//         />

//         {/* Horizontal slider */}
//         <HorizontalSliderSection
//           sliderRef={refs.slider.slider}
//           circleFinalRef={refs.slider.circleFinal}
//         />

//         {/* Single project section */}
//         <ProjectSection projectRef={refs.project.section} />

//         {/* Circle reveal overlay for project transition */}
//         <div
//           id="next-timeline"
//           ref={refs.project.circleReveal}
//           className="fixed inset-0 pointer-events-none opacity-0"
//           style={{
//             clipPath: "circle(0% at 50% 50%)",
//             backgroundColor: "#fff",
//             zIndex: 61,
//             willChange: "clip-path",
//           }}
//         />

//         {/* Blog + Brand + Footer */}
//         <BlogSection
//           blogRef={refs.blog.blog}
//           circleBlogRef={refs.blog.circleBlog}
//         />
//         <BrandUnfoldedSection
//           brandRef={refs.brand.brand}
//           circleBrandRef={refs.brand.circleBrand}
//         />

//           <Footer footerRef={refs.footer.footer} />
//         {/* </div> */}
//         {/* <Footer footerRef={refs.footer.footer} /> */}
//       </div>
//     </section>
//   );
// }

"use client";

import { useRef, useLayoutEffect, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import IntroSection, {
  createIntroTimeline,
} from "@/components/sections/Introsection";
import VideoSection2 from "@/components/sections/Videosection2";
import VideoSection3 from "@/components/sections/Videosection3";
import EarthIntroSection from "@/components/sections/Earthintrosection";
import EarthSplitSection from "@/components/sections/Earthsplitsection";
import { masterTimelineStore } from "@/utils/masterTimeline";
import HorizontalSliderSection, {
  createHorizontalSliderTimeline,
} from "@/components/sections/Horizontalslidersection";
import ProjectSection, {
  createProjectTimeline,
} from "@/components/sections/ProjectSection";
import BlogSection from "@/components/sections/Blogsection";
import BrandUnfoldedSection from "@/components/sections/BrandUnfoldedSection";
import Footer from "@/components/common/footer/Footer";
import { lockScroll, unlockScroll } from "@/utils/scrollLock";
import { createExactCircleReveal } from "@/utils/createExactCircleReveal";

gsap.registerPlugin(ScrollTrigger);

// ─── Constants ───────────────────────────────────────────────────────────────

const T = {
  REVEAL: 1.4,
  FADE: 0.2,
  CONTENT_DELAY: 0.6,
  TEXT_DELAY: 0.8,
  HOLD: 1.2,
  GAP: 1,
  EARTH_MOVE: 1.6,
  SPLIT_DELAY: 0.3,
} as const;

const E = {
  PRIMARY: "power4.inOut",
  FADE: "power2.inOut",
  IN: "power3.out",
  OUT: "power3.in",
  SMOOTH: "sine.inOut",
  EARTH: "power2.inOut",
} as const;

type HeaderMode = "white" | "black" | "hidden";

// ─── Header color zones (label → header mode) ───────────────────────────────
// This defines which header color should be active from each label onwards.
// Used by onUpdate to set the correct color in BOTH scroll directions.

const HEADER_COLOR_ZONES: [string, HeaderMode][] = [
  ["v1", "white"],
  ["v2", "white"],
  ["earth_intro", "black"],
  ["earth_center", "black"],
  ["earth_split", "black"],
  ["before_slider", "black"],
  ["project_reveal", "white"],
  ["blog_reveal", "black"],
  ["brand_reveal", "black"],
  ["footer_reveal", "hidden"],
];

// ─── Config ──────────────────────────────────────────────────────────────────

const VIDEO_TRANSITIONS = [
  {
    label: "v1",
    videoIndex: 1,
    headerMode: "white" as HeaderMode,
    zCircle: 22,
    zContent: 23,
    fadeOut: ["intro.text1", "intro.scrollDown"],
    fadeIn: { video: "video2.video2", text: "video2.text2" },
    circle: "video2.video2",
    prepEarth: false,
  },
  {
    label: "v2",
    videoIndex: 2,
    headerMode: "white" as HeaderMode,
    zCircle: 24,
    zContent: 25,
    fadeOut: ["video2.text2"],
    fadeIn: { video: "video3.video3", text: "video3.text3" },
    circle: "video3.video3",
    prepEarth: true,
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

const resolve = (refs: any, path: string): HTMLDivElement | null =>
  path.split(".").reduce((o, k) => o?.[k], refs)?.current ?? null;

const setHeader = (mode: HeaderMode) => {
  window.dispatchEvent(new Event(`header-${mode}`));
};

const gap = (tl: gsap.core.Timeline, d: number = T.GAP) =>
  tl.to({}, { duration: d });

const fadeOut = (
  tl: gsap.core.Timeline,
  targets: (HTMLElement | null)[],
  label: string,
) => {
  const els = targets.filter(Boolean);
  if (els.length)
    tl.to(els, { opacity: 0, duration: T.FADE, ease: E.FADE }, label);
};

const reveal = (
  tl: gsap.core.Timeline,
  el: HTMLElement | null,
  label: string,
  opts: {
    zIndex: number;
    delay?: number;
    from?: gsap.TweenVars;
    to?: gsap.TweenVars;
  },
) => {
  if (!el) return;
  const { zIndex, delay = 0, from = { opacity: 0 }, to } = opts;
  tl.set(el, { zIndex }, label).fromTo(
    el,
    from,
    {
      opacity: 1,
      duration: T.REVEAL,
      ease: E.IN,
      ...to,
      onComplete: () => {
        gsap.set(el, { pointerEvents: "all" });
      },
    },
    `${label}+=${delay}`,
  );
};

// ─── Ref Factory ────────────────────

function useRefMap() {
  return {
    intro: {
      logo: useRef(null),
      video1: useRef(null),
      text1: useRef(null),
      scrollDown: useRef(null),
    },
    video2: {
      video2: useRef(null),
      text2: useRef(null),
      scrollDown: useRef(null),
    },
    video3: { video3: useRef(null), text3: useRef(null) },
    earthIntro: {
      earth: useRef(null),
      scrollDown: useRef(null),
      earthScrollDown: useRef(null),
      circleWhite1: useRef(null),
    },
    earthSplit: {
      gridContent: useRef(null),
      stats: useRef(null),
      circleWhite2: useRef(null),
    },
    slider: { slider: useRef(null), circleFinal: useRef(null) },
    project: { section: useRef(null), circleReveal: useRef(null) },
    blog: { blog: useRef(null), circleBlog: useRef(null) },
    brand: { brand: useRef(null), circleBrand: useRef(null) },
    footer: { footer: useRef(null) },
  };
}

type RefMap = ReturnType<typeof useRefMap>;

// ─── Timeline Builders ───────────────────────────────────────────────────────

function buildVideoTransitions(
  tl: gsap.core.Timeline,
  refs: RefMap,
  setActiveVideo: (v: number) => void,
) {
  VIDEO_TRANSITIONS.forEach(
    ({
      label,
      fadeOut: outs,
      circle,
      zCircle,
      zContent,
      videoIndex,
      fadeIn,
      prepEarth,
    }) => {
      // Add the label (header color is handled by onUpdate, not .call())
      tl.addLabel(label).call(
        () => {
          setActiveVideo(videoIndex);
        },
        undefined,
        label,
      );

      fadeOut(
        tl,
        outs.map((p) => resolve(refs, p)),
        label,
      );

      // CLIP REVEAL
      createExactCircleReveal(tl, resolve(refs, circle), label, {
        color: undefined,
        zIndex: zCircle,
      });

      // REVEAL CONTENT
      reveal(tl, resolve(refs, fadeIn.text), label, {
        zIndex: zContent,
        delay: T.TEXT_DELAY,
      });

      if (prepEarth) {
        const earth = refs.earthIntro.earth.current;
        if (earth) {
          tl.set(
            earth,
            { y: "70vh", scale: 0.7, opacity: 0, zIndex: 20 },
            label,
          ).to(
            earth,
            { opacity: 1, duration: T.CONTENT_DELAY, ease: E.IN },
            `${label}+=1`,
          );
        }
      }

      gap(tl);
    },
  );
}

function buildEarthSequence(
  tl: gsap.core.Timeline,
  refs: RefMap,
  setActiveVideo: (v: number) => void,
) {
  const { earth, earthScrollDown, circleWhite1 } = refs.earthIntro;
  const { gridContent, stats, circleWhite2 } = refs.earthSplit;

  // Earth Intro (header color handled by onUpdate)
  tl.addLabel("earth_intro");
  fadeOut(tl, [refs.video3.text3.current], "earth_intro");
  createExactCircleReveal(tl, circleWhite1.current, "earth_intro", {
    color: "#FFF8F0",
    zIndex: 26,
  });

  // EARTH CENTER
  if (earth.current) {
    tl.set(
      earth.current,
      { y: "75vh", scale: 0.6, opacity: 1, zIndex: 27 },
      "earth_intro",
    ).to(
      earth.current,
      { y: "18vh", scale: 1.0, duration: T.EARTH_MOVE, ease: E.EARTH },
      "earth_intro+=0.2",
    );
  }

  reveal(tl, earthScrollDown.current, "earth_intro", {
    zIndex: 27,
    delay: 1.8,
    from: { opacity: 0, y: 10, visibility: "hidden" },
    to: { opacity: 1, y: 0, visibility: "visible", duration: 0.5, ease: E.IN },
  });
  gap(tl, 1.2);

  // Earth Center
  tl.addLabel("earth_center").call(
    () => {
      setActiveVideo(-1);
    },
    undefined,
    "earth_center",
  );
  fadeOut(
    tl,
    [earthScrollDown.current, refs.video3.video3.current],
    "earth_center",
  );
  gap(tl, 1.5);

  tl.addLabel("earth_split");

  if (earth.current) {
    tl.to(
      earth.current,
      {
        xPercent: 35,
        yPercent: 15,
        x: -0.054,
        y: "15vh",
        scale: 1.1,
        duration: T.EARTH_MOVE,
        ease: E.EARTH,
      },
      "earth_split",
    );
  }

  if (gridContent.current) {
    tl.set(
      gridContent.current,
      { zIndex: 29, pointerEvents: "none" },
      "earth_split",
    ).fromTo(
      gridContent.current,
      { x: -60, opacity: 0 },
      { x: 0, opacity: 1, pointerEvents: "all", duration: 1, ease: E.IN },
      `earth_split+=${T.SPLIT_DELAY}`,
    );
  }

  if (stats.current) {
    tl.set(stats.current, { zIndex: 29 }, "earth_split").fromTo(
      stats.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.0, ease: E.IN },
      `earth_split+=${T.SPLIT_DELAY + 0.2}`,
    );
  }

  const EARTH_SPLIT_HOLD = 0.4;
  gap(tl, EARTH_SPLIT_HOLD);

  // Before Slider
  tl.addLabel("before_slider");
  // createExactCircleReveal(tl, circleWhite2.current, "before_slider", {
  //   color: "lab(98 1.43 4.72)",
  //   zIndex: 58,
  // });

  const exits: [HTMLElement | null, gsap.TweenVars][] = [
    [gridContent.current, { opacity: 0, x: -30 }],
    [stats.current, { opacity: 0, y: 20 }],
    [earth.current, { opacity: 0, scale: 0.9 }],
  ];
  exits.forEach(([el, props]) => {
    if (el)
      tl.to(el, { ...props, duration: 0.2, ease: E.OUT }, "before_slider");
  });
  gap(tl, 0.2);
}

function buildSlider(tl: gsap.core.Timeline, refs: RefMap) {
  createHorizontalSliderTimeline(
    tl,
    {
      earth: refs.earthIntro.earth,
      gridContent: refs.earthSplit.gridContent,
      stats: refs.earthSplit.stats,
    },
    { slider: refs.slider.slider, circleFinal: refs.slider.circleFinal },
  );
}

function buildProjectSection(tl: gsap.core.Timeline, refs: RefMap) {
  const projectSection = refs.project.section.current;
  const circleReveal = refs.project.circleReveal.current;

  // Transition: slider → projects (header color handled by onUpdate)
  tl.addLabel("project_reveal");

  // Fade out slider
  if (refs.slider.slider.current) {
    tl.to(
      refs.slider.slider.current,
      {
        opacity: 0,
        pointerEvents: "none",
        duration: 1.0,
        ease: E.OUT,
      },
      "project_reveal",
    );
  }

  // Circle reveal
  if (circleReveal) {
    createExactCircleReveal(tl, circleReveal, "project_reveal", {
      color: "#ffffffff",
      zIndex: 61,
    });
  }

  // Reveal project section
  if (projectSection) {
    tl.set(
      projectSection,
      { zIndex: 62, pointerEvents: "none" },
      "project_reveal",
    ).to(
      projectSection,
      {
        opacity: 1,
        pointerEvents: "all",
        duration: 0.8,
        ease: E.IN,
      },
      "project_reveal+=0.5",
    );
  }

  // Internal stripe-stack transitions
  createProjectTimeline(tl, refs.project.section);
}

function buildBlogBrandFooter(tl: gsap.core.Timeline, refs: RefMap) {
  // Blog (header color handled by onUpdate)
  tl.addLabel("blog_reveal");

  // Fade out projects
  if (refs.project.section.current) {
    tl.to(
      refs.project.section.current,
      {
        opacity: 0,
        pointerEvents: "none",
        duration: 0.8,
        ease: E.OUT,
      },
      "blog_reveal",
    );
  }

  createExactCircleReveal(tl, refs.blog.circleBlog.current, "blog_reveal", {
    color: "#fff",
    zIndex: 70,
  });
  reveal(tl, refs.blog.blog.current, "blog_reveal", {
    zIndex: 71,
    delay: 0.4,
    from: { opacity: 0, y: 0, scale: 1 },
    to: {
      opacity: 1,
      y: 0,
      scale: 1,
      pointerEvents: "all",
      duration: 1.2,
      ease: E.IN,
    },
  });
  gap(tl, 2.5);

  // Brand (header color handled by onUpdate)
  tl.addLabel("brand_reveal");

  if (refs.blog.blog.current) {
    tl.to(
      refs.blog.blog.current,
      {
        opacity: 0,
        scale: 0.92,
        y: 0,
        pointerEvents: "none",
        duration: 1.0,
        ease: E.OUT,
      },
      "brand_reveal",
    );
  }
  createExactCircleReveal(tl, refs.brand.circleBrand.current, "brand_reveal", {
    color: "#FFF8F0",
    zIndex: 72,
  });
  reveal(tl, refs.brand.brand.current, "brand_reveal", {
    zIndex: 73,
    delay: 0.4,
    from: { opacity: 0, y: 0, scale: 1 },
    to: {
      opacity: 1,
      y: 0,
      scale: 1,
      pointerEvents: "all",
      duration: 1.2,
      ease: E.IN,
    },
  });
  gap(tl, 0.5);

  // Footer (header color handled by onUpdate)
  tl.addLabel("footer_reveal");

  fadeOut(tl, [refs.brand.brand.current], "footer_reveal");
  if (refs.footer.footer.current) {
    tl.set(refs.footer.footer.current, { zIndex: 80 }, "footer_reveal").fromTo(
      refs.footer.footer.current,
      { y: "100%", opacity: 1, scale: 1 },
      {
        y: "0%",
        scale: 1,
        // duration: T.REVEAL * 1.2,
        // ease: E.IN,
        onComplete: () => {
          gsap.set(refs.footer.footer.current, { pointerEvents: "all" });
        },
      },
      "footer_reveal",
    );
  }
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function MasterSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeVideo, setActiveVideo] = useState(0);
  const refs = useRefMap();

  useLayoutEffect(() => {
    lockScroll();

    const ctx = gsap.context(() => {
      ScrollTrigger.addEventListener("refreshInit", () => {
        // Reserved for future use
      });

      const introTL = createIntroTimeline(refs.intro);

      introTL
        .eventCallback("onComplete", () => {
          window.dispatchEvent(new Event("show-header"));
          setHeader("white");
          unlockScroll();
          buildMasterTimeline();
        })
        .play(0);

      function buildMasterTimeline() {
        ScrollTrigger.refresh();

        let lastHeaderMode: HeaderMode | null = null;

        const master = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=3000%",
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,

          
            onUpdate: (self) => {
              const progress = self.progress;
              const totalDuration = master.duration();
              const currentTime = progress * totalDuration;

              let activeMode: HeaderMode = "white"; 
              for (let i = HEADER_COLOR_ZONES.length - 1; i >= 0; i--) {
                const [label, mode] = HEADER_COLOR_ZONES[i];
                const labelTime = master.labels[label];
                if (labelTime !== undefined && currentTime >= labelTime) {
                  activeMode = mode;
                  break;
                }
              }

       
              if (activeMode !== lastHeaderMode) {
                if (activeMode === "hidden") {
                  window.dispatchEvent(new Event("header-hidden"));
                } else {
                  setHeader(activeMode);
                }
                lastHeaderMode = activeMode;
              }
            },

            onRefresh: () => {
              const pinned = containerRef.current;
              if (pinned?.parentElement)
                pinned.parentElement.style.pointerEvents = "none";
              if (pinned) pinned.style.pointerEvents = "auto";
            },
          },
        });
        masterTimelineStore.tl = master;

        // Compose the full scroll sequence
        buildVideoTransitions(master, refs, setActiveVideo);
        buildEarthSequence(master, refs, setActiveVideo);
        buildSlider(master, refs);
        buildProjectSection(master, refs);
        buildBlogBrandFooter(master, refs);
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-auto overflow-hidden bg-[#FFF8F0] pointer-events-none!"
      style={{ perspective: "2000px", transformStyle: "preserve-3d" }}
    >
      <div className="relative w-full h-screen">
        {/* Video layers */}
        <IntroSection refs={refs.intro} activeVideo={activeVideo} />
        <VideoSection2 refs={refs.video2} activeVideo={activeVideo} />
        <VideoSection3 refs={refs.video3} activeVideo={activeVideo} />

        {/* Earth layers */}
        <EarthIntroSection refs={refs.earthIntro} />
        <EarthSplitSection
          gridContentRef={refs.earthSplit.gridContent}
          statsRef={refs.earthSplit.stats}
          circleWhite2Ref={refs.earthSplit.circleWhite2}
        />

        {/* Horizontal slider */}
        <HorizontalSliderSection
          sliderRef={refs.slider.slider}
          circleFinalRef={refs.slider.circleFinal}
        />

        {/* Single project section */}
        <ProjectSection projectRef={refs.project.section} />

        {/* Circle reveal overlay for project transition */}
        <div
          id="next-timeline"
          ref={refs.project.circleReveal}
          className="fixed inset-0 pointer-events-none opacity-0"
          style={{
            clipPath: "circle(0% at 50% 50%)",
            backgroundColor: "#fff",
            zIndex: 61,
            willChange: "clip-path",
          }}
        />

        {/* Blog + Brand + Footer */}
        <BlogSection
          blogRef={refs.blog.blog}
          circleBlogRef={refs.blog.circleBlog}
        />
        <BrandUnfoldedSection
          brandRef={refs.brand.brand}
          circleBrandRef={refs.brand.circleBrand}
        />

        <Footer footerRef={refs.footer.footer} />
      </div>
    </section>
  );
}