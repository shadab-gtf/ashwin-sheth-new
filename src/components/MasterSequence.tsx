"use client";

import { useRef, useLayoutEffect, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import IntroSection, { createIntroTimeline } from "@/components/sections/Introsection";
import VideoSection2 from "@/components/sections/Videosection2";
import VideoSection3 from "@/components/sections/Videosection3";
import EarthIntroSection from "@/components/sections/Earthintrosection";
import EarthSplitSection from "@/components/sections/Earthsplitsection";
import HorizontalSliderSection, { createHorizontalSliderTimeline } from "@/components/sections/Horizontalslidersection";
import ProjectSection from "@/components/sections/ProjectSection";
import ProjectSection2 from "@/components/sections/ProjectSection2";
import ProjectSection3 from "@/components/sections/ProjectSection3";
import ProjectSection4 from "@/components/sections/ProjectSection4";
import BlogSection from "@/components/sections/Blogsection";
import BrandUnfoldedSection from "@/components/sections/BrandUnfoldedSection";
import Footer from "@/components/sections/Footer";
import { lockScroll, unlockScroll } from "@/utils/scrollLock";
import { createExactCircleReveal } from "@/utils/createExactCircleReveal";

gsap.registerPlugin(ScrollTrigger);

const TIMING = {
  REVEAL_DURATION: 1.4, FADE_DURATION: 0.2, CONTENT_DELAY: 0.6, TEXT_DELAY: 0.8,
  HOLD_DURATION: 1.2, TRANSITION_GAP: 1, EARTH_MOVE: 1.6, SPLIT_DELAY: 0.3,
} as const;

const EASING = {
  PRIMARY: "power4.inOut", FADE: "power2.inOut", CONTENT_IN: "power3.out",
  CONTENT_OUT: "power3.in", SMOOTH: "sine.inOut", EARTH_MOVE: "power2.inOut",
} as const;

const VIDEO_TRANSITIONS = [
  { label: "v1", videoIndex: 1, headerMode: "white", circleColor: "#86efad56", zIndexCircle: 22, zIndexContent: 23,
    fadeOutRefs: ["intro.text1", "intro.scrollDown", "intro.video1"], fadeInRefs: { video: "video2.video2", text: "video2.text2" },
    circleRef: "video2.circleGreen", prepEarth: false },
  { label: "v2", videoIndex: 2, headerMode: "white", circleColor: "#fed7aa5a", zIndexCircle: 24, zIndexContent: 25,
    fadeOutRefs: ["video2.text2", "video2.video2"], fadeInRefs: { video: "video3.video3", text: "video3.text3" },
    circleRef: "video3.circleOrange", prepEarth: true },
] as const;

const PROJECT_SECTIONS = [
  { refsKey: "project", zBase: 62, bgColor: "#fff", label: "project1", component: ProjectSection },
  { refsKey: "project2", zBase: 64, bgColor: "#Fff", label: "project2", component: ProjectSection2 },
  { refsKey: "project3", zBase: 66, bgColor: "#fff", label: "project3", component: ProjectSection3 },
  { refsKey: "project4", zBase: 68, bgColor: "#FFF", label: "project4", component: ProjectSection4 },
] as const;

const getRef = (refs: any, path: string) => path.split(".").reduce((acc, key) => acc?.[key], refs)?.current || null;
const dispatchHeader = (mode: "white" | "black") => window.dispatchEvent(new Event(`header-${mode}`));
const addGap = (tl: gsap.core.Timeline, duration: number) => tl.to({}, { duration });

const animateFadeOut = (tl: gsap.core.Timeline, elements: any[], label: string) => {
  const targets = elements.filter(Boolean);
  if (targets.length) tl.to(targets, { opacity: 0, duration: TIMING.FADE_DURATION, ease: EASING.FADE }, label);
};

const animateReveal = (tl: gsap.core.Timeline, el: any, label: string, opts: any) => {
  if (!el) return;
  const { zIndex, delay = 0, from = { opacity: 0 }, to = { opacity: 1, duration: TIMING.REVEAL_DURATION, ease: EASING.CONTENT_IN } } = opts;
  tl.set(el, { zIndex }, label)
    .fromTo(el, from, { ...to, onComplete: () => gsap.set(el, { pointerEvents: "all" }) }, `${label}+=${delay}`);
};

const animateSection = (tl: gsap.core.Timeline, config: any) => {
  const { label, headerMode, prevEl, circleEl, circleColor, zIndex, contentEl, cardEl, from, to, cardAnim } = config;
  tl.addLabel(label).call(() => { dispatchHeader(headerMode); }, undefined, label);
  if (prevEl) animateFadeOut(tl, [prevEl], label);
  createExactCircleReveal(tl, circleEl, label, { color: circleColor, zIndex });
  if (contentEl) animateReveal(tl, contentEl, label, { zIndex: zIndex + 1, from, to });
  if (cardEl && cardAnim) {
    tl.set(cardEl, cardAnim.from, label)
      .to(cardEl, { ...cardAnim.to, onComplete: () => gsap.set(cardEl, { pointerEvents: "all" }) }, `${label}+=${cardAnim.delay || 0.7}`);
  }
};

export default function MasterSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeVideo, setActiveVideo] = useState(0);

  const createRefGroup = () => ({
    intro: { logo: useRef(null), video1: useRef(null), text1: useRef(null), scrollDown: useRef(null) },
    video2: { video2: useRef(null), text2: useRef(null), scrollDown: useRef(null), circleGreen: useRef(null) },
    video3: { video3: useRef(null), text3: useRef(null), circleOrange: useRef(null) },
    earthIntro: { earth: useRef(null), scrollDown: useRef(null), earthScrollDown: useRef(null), circleWhite1: useRef(null) },
    earthSplit: { gridContent: useRef(null), stats: useRef(null), circleWhite2: useRef(null) },
    slider: { slider: useRef(null), circleFinal: useRef(null) },
    project: { project: useRef(null), circleProject: useRef(null), projectCard: useRef(null) },
    project2: { project: useRef(null), circleProject: useRef(null), projectCard: useRef(null) },
    project3: { project: useRef(null), circleProject: useRef(null), projectCard: useRef(null) },
    project4: { project: useRef(null), circleProject: useRef(null), projectCard: useRef(null) },
    blog: { blog: useRef(null), circleBlog: useRef(null) },
    brand: { brand: useRef(null), circleBrand: useRef(null) },
    footer: { footer: useRef(null) },
  });

  const refs = createRefGroup();

  useLayoutEffect(() => {
    lockScroll();
    const ctx = gsap.context(() => {
      const introTL = createIntroTimeline(refs.intro);
      introTL.eventCallback("onComplete", () => {
        window.dispatchEvent(new Event("show-header"));
        dispatchHeader("white");
        unlockScroll();
        initScroll();
      }).play(0);

      const initScroll = () => {
        ScrollTrigger.refresh();
        const scrollTL = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current, start: "top top", end: "+=3000%", pin: true,
            scrub: 1, anticipatePin: 1, invalidateOnRefresh: true,
            onRefresh: () => {
              const pinnedEl = containerRef.current;
              if (pinnedEl?.parentElement) pinnedEl.parentElement.style.pointerEvents = "none";
              if (pinnedEl) pinnedEl.style.pointerEvents = "auto";
            },
          },
        });

        // Video Transitions
        VIDEO_TRANSITIONS.forEach(({ label, headerMode, fadeOutRefs, circleRef, circleColor, zIndexCircle,
          zIndexContent, videoIndex, fadeInRefs, prepEarth }) => {
          scrollTL.addLabel(label).call(() => { dispatchHeader(headerMode); setActiveVideo(videoIndex); return; }, undefined, label);
          animateFadeOut(scrollTL, fadeOutRefs.map(p => getRef(refs, p)), label);
          createExactCircleReveal(scrollTL, getRef(refs, circleRef), label, { color: circleColor, zIndex: zIndexCircle });
          animateReveal(scrollTL, getRef(refs, fadeInRefs.video), label, { zIndex: zIndexContent, delay: TIMING.CONTENT_DELAY });
          animateReveal(scrollTL, getRef(refs, fadeInRefs.text), label, { zIndex: zIndexContent, delay: TIMING.TEXT_DELAY });
          if (prepEarth && refs.earthIntro.earth.current) {
            scrollTL.set(refs.earthIntro.earth.current, { y: "70vh", scale: 0.7, opacity: 0, zIndex: 20 }, label)
              .to(refs.earthIntro.earth.current, { opacity: 1, duration: TIMING.CONTENT_DELAY, ease: EASING.CONTENT_IN }, `${label}+=1`);
          }
          addGap(scrollTL, TIMING.TRANSITION_GAP);
        });

        // Earth Intro
        const { earth, earthScrollDown, circleWhite1 } = refs.earthIntro;
        scrollTL.addLabel("earth_intro").call(() => { dispatchHeader("white"); }, undefined, "earth_intro");
        animateFadeOut(scrollTL, [refs.video3.text3.current], "earth_intro");
        createExactCircleReveal(scrollTL, circleWhite1.current, "earth_intro", { color: "#FFF8F0", zIndex: 26 });
        if (earth.current) {
          scrollTL.set(earth.current, { y: "70vh", scale: 0.7, opacity: 1, zIndex: 27 }, "earth_intro")
            .to(earth.current, { y: "32vh", scale: 1.15, duration: TIMING.EARTH_MOVE, ease: EASING.EARTH_MOVE }, "earth_intro+=0.2");
        }
        animateReveal(scrollTL, earthScrollDown.current, "earth_intro", {
          zIndex: 27, delay: 1.8, from: { opacity: 0, y: 10, visibility: "hidden" },
          to: { opacity: 1, y: 0, visibility: "visible", duration: 0.5, ease: EASING.CONTENT_IN }
        });
        addGap(scrollTL, 1.2);

        // Earth Center
        scrollTL.addLabel("earth_center").call(() => { dispatchHeader("black"); setActiveVideo(-1); }, undefined, "earth_center");
        animateFadeOut(scrollTL, [earthScrollDown.current, refs.video3.video3.current], "earth_center");
        addGap(scrollTL, 1.5);

        // Earth Split
        const { gridContent, stats, circleWhite2 } = refs.earthSplit;
        scrollTL.addLabel("earth_split").call(() => { dispatchHeader("black"); }, undefined, "earth_split");
        if (earth.current) {
          scrollTL.to(earth.current, {
            xPercent: 35, yPercent: -15, x: -0.054, y: "30vh", scale: 1.6,
            duration: TIMING.EARTH_MOVE, ease: EASING.EARTH_MOVE
          }, "earth_split");
        }
        if (gridContent.current) {
          scrollTL.set(gridContent.current, { zIndex: 29, pointerEvents: "none" }, "earth_split")
            .fromTo(gridContent.current, { x: -60, opacity: 0 },
              { x: 0, opacity: 1, pointerEvents: "all", duration: 1.2, ease: EASING.CONTENT_IN },
              `earth_split+=${TIMING.SPLIT_DELAY}`);
        }
        if (stats.current) {
          scrollTL.set(stats.current, { zIndex: 29 }, "earth_split")
            .fromTo(stats.current, { y: 30, opacity: 0 },
              { y: 0, opacity: 1, duration: 1.0, ease: EASING.CONTENT_IN },
              `earth_split+=${TIMING.SPLIT_DELAY + 0.2}`);
        }
        addGap(scrollTL, 2);

        // Before Slider
        scrollTL.addLabel("before_slider");
        createExactCircleReveal(scrollTL, circleWhite2.current, "before_slider", { color: "lab(98 1.43 4.72)", zIndex: 58 });
        [
          [gridContent.current, { opacity: 0, x: -30 }],
          [stats.current, { opacity: 0, y: 20 }],
          [earth.current, { opacity: 0, scale: 0.9 }]
        ].forEach(([el, props]) => el && scrollTL.to(el, { ...props, duration: 0.8, ease: EASING.CONTENT_OUT }, "before_slider"));
        addGap(scrollTL, 0.6);

        // Horizontal Slider
        createHorizontalSliderTimeline(scrollTL,
          { earth: refs.earthIntro.earth, gridContent, stats },
          { slider: refs.slider.slider, circleFinal: refs.slider.circleFinal }
        );
        addGap(scrollTL, 10);

        // Project Sections
        PROJECT_SECTIONS.forEach(({ refsKey, zBase, bgColor, label }, index) => {
          const { project: projectEl, circleProject: circleEl, projectCard: cardEl } = refs[refsKey];
          const prevEl = index === 0 ? refs.slider.slider.current :
            (PROJECT_SECTIONS[index - 1] && refs[PROJECT_SECTIONS[index - 1].refsKey].project.current);

          scrollTL.addLabel(label).call(() => { dispatchHeader("black"); }, undefined, label);
          if (prevEl) {
            scrollTL.to(prevEl, {
              opacity: 0, scale: index === 0 ? 1 : 0.92, y: -20,
              ...(index > 0 && { rotationX: 2 }), pointerEvents: "none",
              duration: index === 0 ? 1 : 1.2, ease: EASING.CONTENT_OUT
            }, label);
          }

          createExactCircleReveal(scrollTL, circleEl.current, label, { color: bgColor, zIndex: zBase });

          if (projectEl.current) {
            scrollTL.set(projectEl.current, {
              zIndex: zBase + 1, opacity: 0, y: 20, scale: 0.95, rotationX: -3,
              transformPerspective: 1200, pointerEvents: "none"
            }, label).to(projectEl.current, {
              opacity: 1, y: 0, scale: 1, rotationX: 0, pointerEvents: "all",
              duration: TIMING.REVEAL_DURATION, ease: EASING.PRIMARY
            }, `${label}+=0.3`);
          }

          if (cardEl.current) {
            scrollTL.set(cardEl.current, {
              zIndex: zBase + 1, opacity: 0, x: 8, y: 40, scale: 0.92, rotationY: -8
            }, label).to(cardEl.current, {
              opacity: 1, x: 0, y: 0, scale: 1, rotationY: 0, duration: 1.6, ease: EASING.PRIMARY,
              onComplete: () => { gsap.set(cardEl.current, { pointerEvents: "all" }); }
            }, `${label}+=0.7`);
          }

          addGap(scrollTL, TIMING.HOLD_DURATION);
          if (cardEl.current) scrollTL.to(cardEl.current, { y: -20, duration: 1.0, ease: EASING.SMOOTH, yoyo: true, repeat: 1 }, "<");
        });

        // Blog Section
        animateSection(scrollTL, {
          label: "blog_reveal", headerMode: "black", prevEl: refs.project4.project.current,
          circleEl: refs.blog.circleBlog.current, circleColor: "#fff", zIndex: 70,
          contentEl: refs.blog.blog.current,
          from: { opacity: 0, y: 0, scale: 1 },
          to: { opacity: 1, y: 0, scale: 1, pointerEvents: "all", duration: 1.2, ease: EASING.CONTENT_IN, delay: 0.4 }
        });
        addGap(scrollTL, 2.5);

        // Brand Section
        scrollTL.addLabel("brand_reveal").call(() => { dispatchHeader("black"); }, undefined, "brand_reveal");
        if (refs.blog.blog.current) {
          scrollTL.to(refs.blog.blog.current, {
            opacity: 0, scale: 0.92, y: 0, pointerEvents: "none", duration: 1.0, ease: EASING.CONTENT_OUT
          }, "brand_reveal");
        }
        createExactCircleReveal(scrollTL, refs.brand.circleBrand.current, "brand_reveal", { color: "#FFF8F0", zIndex: 72 });
        animateReveal(scrollTL, refs.brand.brand.current, "brand_reveal", {
          zIndex: 73, delay: 0.4, from: { opacity: 0, y: 0, scale: 1 },
          to: { opacity: 1, y: 0, scale: 1, pointerEvents: "all", duration: 1.2, ease: EASING.CONTENT_IN }
        });
        addGap(scrollTL, 2.0);

        // Footer Section
        scrollTL.addLabel("footer_reveal").call(() => { dispatchHeader("black"); }, undefined, "footer_reveal");
        animateFadeOut(scrollTL, [refs.brand.brand.current], "footer_reveal");
        if (refs.footer.footer.current) {
          scrollTL.set(refs.footer.footer.current, { zIndex: 80 }, "footer_reveal")
            .fromTo(
              refs.footer.footer.current,
              { y: "100%", opacity: 1, scale: 1 },
              {
                y: "0%",
                scale: 1,
                duration: TIMING.REVEAL_DURATION * 1.2,
                ease: EASING.CONTENT_IN,
                onComplete: () => {
                  gsap.set(refs.footer.footer.current, { pointerEvents: "all" });
                }
              },
              "footer_reveal"
            );
        }
      };
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-auto overflow-hidden bg-[#FFF8F0] pointer-events-none!"
      style={{ perspective: "2000px", transformStyle: "preserve-3d" }}>
      <div className="relative w-full h-screen">
        <IntroSection refs={refs.intro} activeVideo={activeVideo} />
        <VideoSection2 refs={refs.video2} activeVideo={activeVideo} />
        <VideoSection3 refs={refs.video3} activeVideo={activeVideo} />
        <EarthIntroSection refs={refs.earthIntro} />
        <EarthSplitSection gridContentRef={refs.earthSplit.gridContent} statsRef={refs.earthSplit.stats}
          circleWhite2Ref={refs.earthSplit.circleWhite2} />
        <HorizontalSliderSection sliderRef={refs.slider.slider} circleFinalRef={refs.slider.circleFinal} />
        {PROJECT_SECTIONS.map(({ label, component: Component, refsKey }) => {
          const { project, circleProject, projectCard } = refs[refsKey];
          return <Component key={label} projectRef={project} circleProjectRef={circleProject} projectCardRef={projectCard} />;
        })}
        <BlogSection blogRef={refs.blog.blog} circleBlogRef={refs.blog.circleBlog} />
        <BrandUnfoldedSection brandRef={refs.brand.brand} circleBrandRef={refs.brand.circleBrand} />
        <Footer footerRef={refs.footer.footer} />
      </div>
    </section>
  );
}