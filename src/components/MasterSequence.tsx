"use client";

import { useRef, useLayoutEffect, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

/* COMPONENT IMPORTS */
import IntroSection, {
  createIntroTimeline,
} from "@/components/sections/Introsection";
import VideoSection2 from "@/components/sections/Videosection2";
import VideoSection3 from "@/components/sections/Videosection3";
import EarthIntroSection from "@/components/sections/Earthintrosection";
import EarthCenterSection from "@/components/sections/Earthcentersection";
import EarthSplitSection from "@/components/sections/Earthsplitsection";
import HorizontalSliderSection, {
  createHorizontalSliderTimeline,
} from "@/components/sections/Horizontalslidersection";
import ProjectSection from "@/components/sections/ProjectSection";
import ProjectSection2 from "@/components/sections/ProjectSection2";
import ProjectSection3 from "@/components/sections/ProjectSection3";
import ProjectSection4 from "@/components/sections/ProjectSection4";
import BlogSection from "@/components/sections/Blogsection";
import BrandUnfoldedSection from "@/components/sections/BrandUnfoldedSection";
import Footer from "@/components/sections/Footer";

/* UTILS */
import { lockScroll, unlockScroll } from "@/utils/scrollLock";
import { createExactCircleReveal } from "@/utils/createExactCircleReveal";

gsap.registerPlugin(ScrollTrigger);

// ============================================================================
// ANIMATION CONSTANTS
// ============================================================================
const TIMING = {
  REVEAL_DURATION: 1.4,
  FADE_DURATION: 0.2,
  CONTENT_DELAY: 0.6,
  TEXT_DELAY: 0.8,
  HOLD_DURATION: 1.2,
  TRANSITION_GAP: 1,
  EARTH_MOVE: 1.6, // Smooth earth movement
  SPLIT_DELAY: 0.3, // Content reveal delay
} as const;

const EASING = {
  PRIMARY: "power4.inOut",
  FADE: "power2.inOut",
  CONTENT_IN: "power3.out",
  CONTENT_OUT: "power3.in",
  SMOOTH: "sine.inOut",
  EARTH_MOVE: "power2.inOut", // Smoother earth movement
} as const;

// ============================================================================
// VIDEO TRANSITION CONFIG
// ============================================================================
const VIDEO_TRANSITIONS = [
  {
    label: "v1",
    videoIndex: 1,
    headerMode: "white",
    circleColor: "#86efad56",
    zIndexCircle: 22,
    zIndexContent: 23,
    fadeOutRefs: ["intro.text1", "intro.scrollDown", "intro.video1"],
    fadeInRefs: {
      video: "video2.video2",
      text: "video2.text2",
    },
    circleRef: "video2.circleGreen",
    prepEarth: false,
  },
  {
    label: "v2",
    videoIndex: 2,
    headerMode: "white",
    circleColor: "#fed7aa5a",
    zIndexCircle: 24,
    zIndexContent: 25,
    fadeOutRefs: ["video2.text2", "video2.video2"],
    fadeInRefs: {
      video: "video3.video3",
      text: "video3.text3",
    },
    circleRef: "video3.circleOrange",
    prepEarth: true,
  },
] as const;

// ============================================================================
// PROJECT SECTION CONFIG
// ============================================================================
const PROJECT_SECTIONS = [
  {
    refsKey: "project",
    zBase: 62,
    bgColor: "#fff",
    label: "project1",
    component: ProjectSection,
  },
  {
    refsKey: "project2",
    zBase: 64,
    bgColor: "#Fff",
    label: "project2",
    component: ProjectSection2,
  },
  {
    refsKey: "project3",
    zBase: 66,
    bgColor: "#fff",
    label: "project3",
    component: ProjectSection3,
  },
  {
    refsKey: "project4",
    zBase: 68,
    bgColor: "#FFF",
    label: "project4",
    component: ProjectSection4,
  },
] as const;

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================
const getRefByPath = (refs: any, path: string) => {
  const parts = path.split(".");
  let current = refs;
  for (const part of parts) {
    current = current[part];
    if (!current) return null;
  }
  return current?.current || null;
};

const dispatchHeaderEvent = (mode: "white" | "black") => {
  window.dispatchEvent(new Event(`header-${mode}`));
};

export default function MasterSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeVideo, setActiveVideo] = useState<number>(0);

  const refs = {
    intro: {
      logo: useRef<HTMLDivElement>(null),
      video1: useRef<HTMLDivElement>(null),
      text1: useRef<HTMLHeadingElement>(null),
      scrollDown: useRef<HTMLDivElement>(null),
    },
    video2: {
      video2: useRef<HTMLDivElement>(null),
      text2: useRef<HTMLHeadingElement>(null),
      scrollDown: useRef<HTMLDivElement>(null),
      circleGreen: useRef<HTMLDivElement>(null),
    },
    video3: {
      video3: useRef<HTMLDivElement>(null),
      text3: useRef<HTMLHeadingElement>(null),
      circleOrange: useRef<HTMLDivElement>(null),
    },
    earthIntro: {
      earth: useRef<HTMLDivElement>(null),
      scrollDown: useRef<HTMLDivElement>(null),
      earthScrollDown: useRef<HTMLDivElement>(null),
      circleWhite1: useRef<HTMLDivElement>(null),
    },
    earthSplit: {
      gridContent: useRef<HTMLDivElement>(null),
      stats: useRef<HTMLDivElement>(null),
      circleWhite2: useRef<HTMLDivElement>(null),
    },
    slider: {
      slider: useRef<HTMLDivElement>(null),
      circleFinal: useRef<HTMLDivElement>(null),
    },
    project: {
      project: useRef<HTMLDivElement>(null),
      circleProject: useRef<HTMLDivElement>(null),
      projectCard: useRef<HTMLDivElement>(null),
    },
    project2: {
      project: useRef<HTMLDivElement>(null),
      circleProject: useRef<HTMLDivElement>(null),
      projectCard: useRef<HTMLDivElement>(null),
    },
    project3: {
      project: useRef<HTMLDivElement>(null),
      circleProject: useRef<HTMLDivElement>(null),
      projectCard: useRef<HTMLDivElement>(null),
    },
    project4: {
      project: useRef<HTMLDivElement>(null),
      circleProject: useRef<HTMLDivElement>(null),
      projectCard: useRef<HTMLDivElement>(null),
    },
    blog: {
      blog: useRef<HTMLDivElement>(null),
      circleBlog: useRef<HTMLDivElement>(null),
    },
    brand: {
      brand: useRef<HTMLDivElement>(null),
      circleBrand: useRef<HTMLDivElement>(null),
    },
    footer: {
      footer: useRef<HTMLDivElement>(null),
    },
  };

  useLayoutEffect(() => {
    lockScroll();
    const ctx = gsap.context(() => {
      // ================================================================
      // INTRO TIMELINE
      // ================================================================
      const introTL = createIntroTimeline(refs.intro);
      introTL.eventCallback("onComplete", () => {
        window.dispatchEvent(new Event("show-header"));
        dispatchHeaderEvent("white");
        unlockScroll();
        initScroll();
      });
      introTL.play(0);

      // ================================================================
      // MAIN SCROLL TIMELINE
      // ================================================================
      const initScroll = () => {
        ScrollTrigger.refresh();

        const scrollTL = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=3000%",
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onRefresh: () => {
              const pinnedEl = containerRef.current;
              if (!pinnedEl) return;
              const pinSpacer = pinnedEl.parentElement;
              if (pinSpacer) {
                pinSpacer.style.pointerEvents = "none";
              }
              pinnedEl.style.pointerEvents = "auto";
            },
          },
        });

        // ============================================================
        // VIDEO TRANSITIONS
        // ============================================================
        VIDEO_TRANSITIONS.forEach((transition) => {
          scrollTL.addLabel(transition.label);
          scrollTL.call(
            () => dispatchHeaderEvent(transition.headerMode),
            undefined,
            transition.label,
          );

          const fadeOutTargets = transition.fadeOutRefs
            .map((path) => getRefByPath(refs, path))
            .filter(Boolean);

          if (fadeOutTargets.length > 0) {
            scrollTL.to(
              fadeOutTargets,
              {
                opacity: 0,
                duration: TIMING.FADE_DURATION,
                ease: EASING.FADE,
              },
              transition.label,
            );
          }

          const circleEl = getRefByPath(refs, transition.circleRef);
          createExactCircleReveal(scrollTL, circleEl, transition.label, {
            color: transition.circleColor,
            zIndex: transition.zIndexCircle,
          });

          scrollTL.call(
            () => setActiveVideo(transition.videoIndex),
            undefined,
            transition.label,
          );

          const videoEl = getRefByPath(refs, transition.fadeInRefs.video);
          const textEl = getRefByPath(refs, transition.fadeInRefs.text);

          if (videoEl) {
            scrollTL.set(
              videoEl,
              { zIndex: transition.zIndexContent },
              transition.label,
            );
            scrollTL.fromTo(
              videoEl,
              { opacity: 0 },
              {
                opacity: 1,
                duration: TIMING.REVEAL_DURATION,
                ease: EASING.CONTENT_IN,
                onComplete: () => {
                  gsap.set(videoEl, { pointerEvents: "all" });
                },
              },
              transition.label + `+=${TIMING.CONTENT_DELAY}`,
            );
          }

          if (textEl) {
            scrollTL.set(
              textEl,
              { zIndex: transition.zIndexContent },
              transition.label,
            );
            scrollTL.fromTo(
              textEl,
              { opacity: 0 },
              {
                opacity: 1,
                duration: TIMING.REVEAL_DURATION,
                ease: EASING.CONTENT_IN,
                onComplete: () => {
                  gsap.set(textEl, { pointerEvents: "all" });
                },
              },
              transition.label + `+=${TIMING.TEXT_DELAY}`,
            );
          }

          // Prep Earth for v2 transition
          if (transition.prepEarth && refs.earthIntro.earth.current) {
            scrollTL.set(
              refs.earthIntro.earth.current,
              {
                y: "70vh",
                scale: 0.7,
                opacity: 0,
                zIndex: 20,
              },
              transition.label,
            );
            scrollTL.to(
              refs.earthIntro.earth.current,
              {
                opacity: 1,
                duration: TIMING.CONTENT_DELAY,
                ease: EASING.CONTENT_IN,
              },
              transition.label + "+=1",
            );
          }

          scrollTL.to({}, { duration: TIMING.TRANSITION_GAP });
        });

        // ============================================================
        // EARTH INTRO SECTION (Video 3 → Earth Center)
        // ============================================================
        scrollTL.addLabel("earth_intro");
        scrollTL.call(
          () => dispatchHeaderEvent("white"),
          undefined,
          "earth_intro",
        );

        // Fade out Video 3 text
        if (refs.video3.text3.current) {
          scrollTL.to(
            refs.video3.text3.current,
            {
              opacity: 0,
              duration: 0.4,
              ease: EASING.FADE,
            },
            "earth_intro",
          );
        }

        // Circle reveal (beige)
        createExactCircleReveal(
          scrollTL,
          refs.earthIntro.circleWhite1.current,
          "earth_intro",
          {
            color: "#FFF8F0",
            zIndex: 26,
          },
        );

        // Earth moves from bottom to center (synchronized with reveal)
        if (refs.earthIntro.earth.current) {
          scrollTL.set(
            refs.earthIntro.earth.current,
            {
              y: "70vh",
              scale: 0.7,
              opacity: 1,
              zIndex: 27,
            },
            "earth_intro",
          );

          scrollTL.to(
            refs.earthIntro.earth.current,
            {
              y: "32vh",
              scale: 1.15,
              duration: TIMING.EARTH_MOVE,
              ease: EASING.EARTH_MOVE,
            },
            "earth_intro+=0.2",
          );
        }

        // Scroll down indicator
        if (refs.earthIntro.earthScrollDown.current) {
          scrollTL.set(
            refs.earthIntro.earthScrollDown.current,
            { zIndex: 27 },
            "earth_intro",
          );
          scrollTL.fromTo(
            refs.earthIntro.earthScrollDown.current,
            { opacity: 0, y: 10, visibility: "hidden" },
            {
              opacity: 1,
              y: 0,
              visibility: "visible",
              duration: 0.5,
              ease: EASING.CONTENT_IN,
            },
            "earth_intro+=1.8",
          );
        }

        scrollTL.to({}, { duration: 1.2 });

        // ============================================================
        // EARTH CENTER (No circle reveal - just hold)
        // ============================================================
        scrollTL.addLabel("earth_center");
        scrollTL.call(
          () => {
            dispatchHeaderEvent("black");
            setActiveVideo(-1);
          },
          undefined,
          "earth_center",
        );

        // Hide scroll indicator
        if (refs.earthIntro.earthScrollDown.current) {
          scrollTL.to(
            refs.earthIntro.earthScrollDown.current,
            {
              opacity: 0,
              duration: 0.3,
              ease: EASING.FADE,
            },
            "earth_center",
          );
        }

        // Fade out Video 3 completely
        if (refs.video3.video3.current) {
          scrollTL.to(
            refs.video3.video3.current,
            {
              opacity: 0,
              duration: 0.4,
              ease: EASING.FADE,
            },
            "earth_center",
          );
        }

        // NO REVEAL HERE - just hold at center
        scrollTL.to({}, { duration: 1.5 });

        // ============================================================
        // EARTH SPLIT (Center → Right with specific transform)
        // ============================================================
        scrollTL.addLabel("earth_split");
        scrollTL.call(
          () => dispatchHeaderEvent("black"),
          undefined,
          "earth_split",
        );

        // Earth moves to right with specific transform values
        // translate(35%, -15%) translate(-0.054px, 30vh) scale(1.6, 1.6)
        if (refs.earthIntro.earth.current) {
          scrollTL.to(
            refs.earthIntro.earth.current,
            {
              xPercent: 35,
              yPercent: -15,
              x: -0.054,
              y: "30vh",
              scale: 1.6,
              duration: TIMING.EARTH_MOVE,
              ease: EASING.EARTH_MOVE,
            },
            "earth_split",
          );
        }

        // Left content slides in
        if (refs.earthSplit.gridContent.current) {
          scrollTL.set(
            refs.earthSplit.gridContent.current,
            {
              zIndex: 29,
              pointerEvents: "none",
            },
            "earth_split",
          );
          scrollTL.fromTo(
            refs.earthSplit.gridContent.current,
            { x: -60, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              pointerEvents: "all",
              duration: 1.2,
              ease: EASING.CONTENT_IN,
            },
            "earth_split+=" + TIMING.SPLIT_DELAY,
          );
        }

        // Stats fade in
        if (refs.earthSplit.stats.current) {
          scrollTL.set(
            refs.earthSplit.stats.current,
            { zIndex: 29 },
            "earth_split",
          );
          scrollTL.fromTo(
            refs.earthSplit.stats.current,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1.0,
              ease: EASING.CONTENT_IN,
            },
            "earth_split+=" + (TIMING.SPLIT_DELAY + 0.2),
          );
        }

        scrollTL.to({}, { duration: 2 });

        // ============================================================
        // CIRCLE REVEAL BEFORE HORIZONTAL SLIDER
        // ============================================================
        scrollTL.addLabel("before_slider");

        // Circle reveal with lab(98 1.43 4.72) color
        createExactCircleReveal(
          scrollTL,
          refs.earthSplit.circleWhite2.current,
          "before_slider",
          {
            color: "lab(98 1.43 4.72)",
            zIndex: 58,
          },
        );

        // Fade out split content
        if (refs.earthSplit.gridContent.current) {
          scrollTL.to(
            refs.earthSplit.gridContent.current,
            {
              opacity: 0,
              x: -30,
              duration: 0.8,
              ease: EASING.CONTENT_OUT,
            },
            "before_slider",
          );
        }

        if (refs.earthSplit.stats.current) {
          scrollTL.to(
            refs.earthSplit.stats.current,
            {
              opacity: 0,
              y: 20,
              duration: 0.8,
              ease: EASING.CONTENT_OUT,
            },
            "before_slider",
          );
        }

        // Hide earth image
        if (refs.earthIntro.earth.current) {
          scrollTL.to(
            refs.earthIntro.earth.current,
            {
              opacity: 0,
              scale: 0.9,
              duration: 0.8,
              ease: EASING.CONTENT_OUT,
            },
            "before_slider",
          );
        }

        scrollTL.to({}, { duration: 0.6 });

        // ============================================================
        // HORIZONTAL SLIDER (No fade, direct appearance)
        // ============================================================
        createHorizontalSliderTimeline(
          scrollTL,
          {
            earth: refs.earthIntro.earth,
            gridContent: refs.earthSplit.gridContent,
            stats: refs.earthSplit.stats,
          },
          {
            slider: refs.slider.slider,
            circleFinal: refs.slider.circleFinal,
          }
        );

        scrollTL.to({}, { duration: 10 });

        // ============================================================
        // PROJECT SECTIONS
        // ============================================================
        PROJECT_SECTIONS.forEach((section, index) => {
          const isFirst = index === 0;
          const prevSection = index > 0 ? PROJECT_SECTIONS[index - 1] : null;

          scrollTL.addLabel(section.label);
          scrollTL.call(
            () => dispatchHeaderEvent("black"),
            undefined,
            section.label,
          );

          if (isFirst && refs.slider.slider.current) {
            scrollTL.to(
              refs.slider.slider.current,
              {
                opacity: 0,
                y: -20,
                pointerEvents: "none",
                duration: 1,
                ease: EASING.CONTENT_OUT,
              },
              section.label,
            );
          } else if (prevSection) {
            const prevProjectEl = (refs as any)[prevSection.refsKey].project
              .current;
            if (prevProjectEl) {
              scrollTL.to(
                prevProjectEl,
                {
                  opacity: 0,
                  scale: 0.92,
                  y: -20,
                  rotationX: 2,
                  pointerEvents: "none",
                  duration: 1.2,
                  ease: EASING.CONTENT_OUT,
                },
                section.label,
              );
            }
          }

          const circleEl = (refs as any)[section.refsKey].circleProject.current;
          createExactCircleReveal(scrollTL, circleEl, section.label, {
            color: section.bgColor,
            zIndex: section.zBase,
          });

          const projectEl = (refs as any)[section.refsKey].project.current;
          if (projectEl) {
            scrollTL.set(
              projectEl,
              {
                zIndex: section.zBase + 1,
                opacity: 0,
                y: 20,
                scale: 0.95,
                rotationX: -3,
                transformPerspective: 1200,
                pointerEvents: "none",
              },
              section.label,
            );

            scrollTL.to(
              projectEl,
              {
                opacity: 1,
                y: 0,
                scale: 1,
                rotationX: 0,
                pointerEvents: "all",
                duration: TIMING.REVEAL_DURATION,
                ease: EASING.PRIMARY,
              },
              section.label + "+=0.3",
            );
          }

          const cardEl = (refs as any)[section.refsKey].projectCard.current;
          if (cardEl) {
            scrollTL.set(
              cardEl,
              {
                zIndex: section.zBase + 1,
                opacity: 0,
                x: 8,
                y: 40,
                scale: 0.92,
                rotationY: -8,
              },
              section.label,
            );

            scrollTL.to(
              cardEl,
              {
                opacity: 1,
                x: 0,
                y: 0,
                scale: 1,
                rotationY: 0,
                duration: 1.6,
                ease: EASING.PRIMARY,
                onComplete: () => {
                  gsap.set(cardEl, { pointerEvents: "all" });
                },
              },
              section.label + "+=0.7",
            );
          }

          scrollTL.to({}, { duration: TIMING.HOLD_DURATION });

          if (cardEl) {
            scrollTL.to(
              cardEl,
              {
                y: -20,
                duration: 1.0,
                ease: EASING.SMOOTH,
                yoyo: true,
                repeat: 1,
              },
              "<",
            );
          }
        });

        // ============================================================
        // BLOG SECTION
        // ============================================================
        scrollTL.addLabel("blog_reveal");
        scrollTL.call(
          () => dispatchHeaderEvent("black"),
          undefined,
          "blog_reveal",
        );

        if (refs.project4.project.current) {
          scrollTL.to(
            refs.project4.project.current,
            {
              opacity: 0,
              scale: 1,
              y: 0,
              pointerEvents: "none",
              duration: 1.0,
              ease: EASING.CONTENT_OUT,
            },
            "blog_reveal",
          );
        }

        createExactCircleReveal(
          scrollTL,
          refs.blog.circleBlog.current,
          "blog_reveal",
          {
            color: "#fff",
            zIndex: 70,
          },
        );

        if (refs.blog.blog.current) {
          scrollTL.set(
            refs.blog.blog.current,
            {
              zIndex: 71,
              pointerEvents: "none",
            },
            "blog_reveal",
          );
          scrollTL.fromTo(
            refs.blog.blog.current,
            { opacity: 0, y: 0, scale: 1 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              pointerEvents: "all",
              duration: 1.2,
              ease: EASING.CONTENT_IN,
            },
            "blog_reveal+=0.4",
          );
        }

        scrollTL.to({}, { duration: 2.5 });

        // ============================================================
        // BRAND SECTION
        // ============================================================
        scrollTL.addLabel("brand_reveal");
        scrollTL.call(
          () => dispatchHeaderEvent("black"),
          undefined,
          "brand_reveal",
        );

        if (refs.blog.blog.current) {
          scrollTL.to(
            refs.blog.blog.current,
            {
              opacity: 0,
              scale: 0.92,
              y: 0,
              pointerEvents: "none",
              duration: 1.0,
              ease: EASING.CONTENT_OUT,
            },
            "brand_reveal",
          );
        }

        createExactCircleReveal(
          scrollTL,
          refs.brand.circleBrand.current,
          "brand_reveal",
          {
            color: "#FFF8F0",
            zIndex: 72,
          },
        );

        if (refs.brand.brand.current) {
          scrollTL.set(
            refs.brand.brand.current,
            {
              zIndex: 73,
              pointerEvents: "none",
            },
            "brand_reveal",
          );
          scrollTL.fromTo(
            refs.brand.brand.current,
            { opacity: 0, y: 0, scale: 1 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              pointerEvents: "all",
              duration: 1.2,
              ease: EASING.CONTENT_IN,
            },
            "brand_reveal+=0.4",
          );
        }

        scrollTL.to({}, { duration: 2.0 });

        // ============================================================
        // FOOTER SECTION
        // ============================================================
        scrollTL.addLabel("footer_reveal");
        scrollTL.call(
          () => dispatchHeaderEvent("black"),
          undefined,
          "footer_reveal",
        );

        if (refs.brand.brand.current) {
          scrollTL.to(
            refs.brand.brand.current,
            {
              opacity: 0,
              scale: 1,
              y: 0,
              duration: 1.0,
              ease: EASING.CONTENT_OUT,
            },
            "footer_reveal",
          );
        }

        if (refs.footer.footer.current) {
          scrollTL.set(
            refs.footer.footer.current,
            { zIndex: 80 },
            "footer_reveal",
          );
          scrollTL.fromTo(
            refs.footer.footer.current,
            { y: "100%", opacity: 1, scale: 1 },
            {
              y: "0%",
              scale: 1,
              duration: TIMING.REVEAL_DURATION * 1.2,
              ease: EASING.CONTENT_IN,
              onComplete: () => {
                gsap.set(refs.footer.footer.current, { pointerEvents: "all" });
              },
            },
            "footer_reveal",
          );
        }
      };
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-auto overflow-hidden bg-[#FFF8F0] pointer-events-none!"
      style={{
        perspective: "2000px",
        transformStyle: "preserve-3d",
      }}
    >
      <div className="relative w-full h-screen">
        <IntroSection refs={refs.intro} activeVideo={activeVideo} />
        <VideoSection2 refs={refs.video2} activeVideo={activeVideo} />
        <VideoSection3 refs={refs.video3} activeVideo={activeVideo} />

        <EarthIntroSection refs={refs.earthIntro} />

        <EarthSplitSection
          gridContentRef={refs.earthSplit.gridContent}
          statsRef={refs.earthSplit.stats}
          circleWhite2Ref={refs.earthSplit.circleWhite2}
        />

        <HorizontalSliderSection
          sliderRef={refs.slider.slider}
          circleFinalRef={refs.slider.circleFinal}
        />

        {PROJECT_SECTIONS.map((section) => {
          const Component = section.component;
          const sectionRefs = (refs as any)[section.refsKey];
          return (
            <Component
              key={section.label}
              projectRef={sectionRefs.project}
              circleProjectRef={sectionRefs.circleProject}
              projectCardRef={sectionRefs.projectCard}
            />
          );
        })}

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