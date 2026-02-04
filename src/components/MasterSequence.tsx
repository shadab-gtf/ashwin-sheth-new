'use client';

import { useRef, useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

/* COMPONENT IMPORTS */
import IntroSection, { createIntroTimeline } from '@/components/sections/Introsection';
import VideoSection2 from '@/components/sections/Videosection2';
import VideoSection3 from '@/components/sections/Videosection3';
import EarthIntroSection from '@/components/sections/Earthintrosection';
import EarthCenterSection from '@/components/sections/Earthcentersection';
import EarthSplitSection from '@/components/sections/Earthsplitsection';
import HorizontalSliderSection, { createHorizontalSliderTimeline } from '@/components/sections/Horizontalslidersection';
import ProjectSection from '@/components/sections/ProjectSection';
import ProjectSection2 from '@/components/sections/ProjectSection2';
import ProjectSection3 from '@/components/sections/ProjectSection3';
import ProjectSection4 from '@/components/sections/ProjectSection4';
import BlogSection from '@/components/sections/Blogsection';
import BrandUnfoldedSection from '@/components/sections/BrandUnfoldedSection';
import Footer from '@/components/sections/Footer';

/* UTILS */
import { lockScroll, unlockScroll } from '@/app/utils/scrollLock';
import { createExactCircleReveal } from '@/app/utils/createExactCircleReveal';

gsap.registerPlugin(ScrollTrigger);

// ============================================================================
// ANIMATION CONSTANTS - Awwwards-Level Timing & Easing
// ============================================================================
const TIMING = {
  REVEAL_DURATION: 1.4,        // Consistent reveal duration for all sections
  FADE_DURATION: 0.8,          // Standard fade in/out
  CONTENT_DELAY: 0.6,          // Delay before content fades in
  TEXT_DELAY: 0.8,             // Delay for text reveals
  HOLD_DURATION: 2.2,          // Standard hold time for viewing
  TRANSITION_GAP: 0.8,         // Gap between major transitions
} as const;

const EASING = {
  PRIMARY: 'power4.inOut',     // Premium easing for main transitions
  FADE: 'power2.inOut',        // Subtle fades
  CONTENT_IN: 'power3.out',    // Content entering
  CONTENT_OUT: 'power3.in',    // Content exiting
  SMOOTH: 'sine.inOut',        // Subtle breathing animations
} as const;

// ============================================================================
// VIDEO TRANSITION CONFIG
// ============================================================================
const VIDEO_TRANSITIONS = [
  {
    label: 'v1',
    videoIndex: 1,
    headerMode: 'white',
    circleColor: '#86efad56',
    zIndexCircle: 22,
    zIndexContent: 23,
    fadeOutRefs: ['intro.text1', 'intro.scrollDown', 'intro.video1'],
    fadeInRefs: {
      video: 'video2.video2',
      text: 'video2.text2',
    },
    circleRef: 'video2.circleGreen',
    prepEarth: false,
  },
  {
    label: 'v2',
    videoIndex: 2,
    headerMode: 'white',
    circleColor: '#fed7aa5a',
    zIndexCircle: 24,
    zIndexContent: 25,
    fadeOutRefs: ['video2.text2', 'video2.video2'],
    fadeInRefs: {
      video: 'video3.video3',
      text: 'video3.text3',
    },
    circleRef: 'video3.circleOrange',
    prepEarth: true,
  },
] as const;

// ============================================================================
// PROJECT SECTION CONFIG
// ============================================================================
const PROJECT_SECTIONS = [
  {
    refsKey: 'project',
    zBase: 62,
    bgColor: '#000000',
    label: 'project1',
    component: ProjectSection,
  },
  {
    refsKey: 'project2',
    zBase: 64,
    bgColor: '#FFF8F0',
    label: 'project2',
    component: ProjectSection2,
  },
  {
    refsKey: 'project3',
    zBase: 66,
    bgColor: '#000000',
    label: 'project3',
    component: ProjectSection3,
  },
  {
    refsKey: 'project4',
    zBase: 68,
    bgColor: '#FFF8F0',
    label: 'project4',
    component: ProjectSection4,
  },
] as const;

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================
const getRefByPath = (refs: any, path: string) => {
  const parts = path.split('.');
  let current = refs;
  for (const part of parts) {
    current = current[part];
    if (!current) return null;
  }
  return current?.current || null;
};

const dispatchHeaderEvent = (mode: 'white' | 'black') => {
  window.dispatchEvent(new Event(`header-${mode}`));
};

export default function MasterSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeVideo, setActiveVideo] = useState<number>(0);

  /* =====================================================
     REFS - Destructured for cleaner access
  ===================================================== */
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
      introTL.eventCallback('onComplete', () => {
        window.dispatchEvent(new Event('show-header'));
        dispatchHeaderEvent('white');
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
            start: 'top top',
            end: '+=3000%',
            pin: true,
            scrub: 1, // Perfectly synced with Lenis smooth scroll
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // ============================================================
        // VIDEO TRANSITIONS (Refactored)
        // ============================================================
        VIDEO_TRANSITIONS.forEach((transition) => {
          scrollTL.addLabel(transition.label);
          scrollTL.call(() => dispatchHeaderEvent(transition.headerMode), undefined, transition.label);

          // Fade out previous content
          const fadeOutTargets = transition.fadeOutRefs
            .map(path => getRefByPath(refs, path))
            .filter(Boolean);

          if (fadeOutTargets.length > 0) {
            scrollTL.to(fadeOutTargets, {
              opacity: 0,
              duration: TIMING.FADE_DURATION,
              ease: EASING.FADE,
            }, transition.label);
          }

          // Circle reveal
          const circleEl = getRefByPath(refs, transition.circleRef);
          createExactCircleReveal(scrollTL, circleEl, transition.label, {
            color: transition.circleColor,
            zIndex: transition.zIndexCircle,
          });

          // Update active video
          scrollTL.call(() => setActiveVideo(transition.videoIndex), undefined, transition.label);

          // Fade in new video content
          const videoEl = getRefByPath(refs, transition.fadeInRefs.video);
          const textEl = getRefByPath(refs, transition.fadeInRefs.text);

          if (videoEl) {
            scrollTL.set(videoEl, { zIndex: transition.zIndexContent }, transition.label);
            scrollTL.fromTo(
              videoEl,
              { opacity: 0 },
              {
                opacity: 1,
                duration: TIMING.REVEAL_DURATION,
                ease: EASING.CONTENT_IN,
                onComplete: () => { gsap.set(videoEl, { pointerEvents: 'all' }); },
              },
              transition.label + `+=${TIMING.CONTENT_DELAY}`
            );
          }

          if (textEl) {
            scrollTL.set(textEl, { zIndex: transition.zIndexContent }, transition.label);
            scrollTL.fromTo(
              textEl,
              { opacity: 0 },
              {
                opacity: 1,
                duration: TIMING.REVEAL_DURATION,
                ease: EASING.CONTENT_IN,
                onComplete: () => { gsap.set(textEl, { pointerEvents: 'all' }); },
              },
              transition.label + `+=${TIMING.TEXT_DELAY}`
            );
          }

          // Special: Prep Earth for v2 transition
          if (transition.prepEarth && refs.earthIntro.earth.current) {
            scrollTL.set(refs.earthIntro.earth.current, {
              y: '75vh',
              scale: 0.65,
              opacity: 0,
              zIndex: 20,
            }, transition.label);
            scrollTL.to(refs.earthIntro.earth.current, {
              opacity: 1,
              duration: TIMING.CONTENT_DELAY,
              ease: EASING.CONTENT_IN,
            }, transition.label + '+=0.5');
          }

          scrollTL.to({}, { duration: TIMING.TRANSITION_GAP });
        });

        // ============================================================
        // EARTH INTRO SECTION
        // ============================================================
        scrollTL.addLabel('earth_intro');
        scrollTL.call(() => dispatchHeaderEvent('white'), undefined, 'earth_intro');

        if (refs.video3.text3.current) {
          scrollTL.to(refs.video3.text3.current, {
            opacity: 0,
            duration: TIMING.FADE_DURATION,
            ease: EASING.FADE,
          }, 'earth_intro');
        }

        createExactCircleReveal(scrollTL, refs.earthIntro.circleWhite1.current, 'earth_intro', {
          color: '#FFFFFF',
          zIndex: 26,
        });

        if (refs.earthIntro.earth.current) {
          scrollTL.set(refs.earthIntro.earth.current, { zIndex: 27, scale: 0.65, y: '75vh' }, 'earth_intro');
          scrollTL.to(refs.earthIntro.earth.current, {
            y: '30vh',
            scale: 1, // Stable center scale
            opacity: 1,
            duration: TIMING.REVEAL_DURATION,
            ease: EASING.PRIMARY,
            onComplete: () => {
              gsap.set(refs.earthIntro.earth.current, {
                scale: 1,
                pointerEvents: 'all',
              });
            },
          }, 'earth_intro+=1.35');
        }

        if (refs.earthIntro.earthScrollDown.current) {
          scrollTL.set(refs.earthIntro.earthScrollDown.current, { zIndex: 27 }, 'earth_intro');
          scrollTL.fromTo(
            refs.earthIntro.earthScrollDown.current,
            { opacity: 0, y: 10, visibility: 'hidden' },
            {
              opacity: 1,
              y: 0,
              visibility: 'visible',
              duration: TIMING.FADE_DURATION,
              ease: EASING.CONTENT_IN,
              onComplete: () => { gsap.set(refs.earthIntro.earthScrollDown.current, { pointerEvents: 'all' }); },
            },
            'earth_intro+=1.0'
          );
        }

        scrollTL.to({}, { duration: TIMING.TRANSITION_GAP });

        // ============================================================
        // EARTH CENTER SECTION
        // ============================================================
        scrollTL.addLabel('earth_center');
        scrollTL.call(() => {
          dispatchHeaderEvent('black');
          setActiveVideo(-1);
        }, undefined, 'earth_center');

        if (refs.earthIntro.earthScrollDown.current) {
          scrollTL.to(refs.earthIntro.earthScrollDown.current, {
            opacity: 0,
            duration: TIMING.CONTENT_DELAY,
          }, 'earth_center');
        }

        if (refs.video3.video3.current) {
          scrollTL.to(refs.video3.video3.current, {
            opacity: 0,
            duration: TIMING.FADE_DURATION,
          }, 'earth_center');
        }

        if (refs.earthIntro.earth.current) {
          scrollTL.to(refs.earthIntro.earth.current, {
            scale: 1.15,
            duration: 1.2,
            ease: EASING.PRIMARY,
          }, 'earth_center');
        }

        scrollTL.to({}, { duration: TIMING.TRANSITION_GAP });

        // ============================================================
        // EARTH SPLIT SECTION
        // ============================================================
        scrollTL.addLabel('earth_split');
        scrollTL.call(() => dispatchHeaderEvent('black'), undefined, 'earth_split');

        createExactCircleReveal(scrollTL, refs.earthSplit.circleWhite2.current, 'earth_split', {
          color: '#FFFFFF',
          zIndex: 28,
        });

        if (refs.earthIntro.earth.current) {
          scrollTL.set(refs.earthIntro.earth.current, { zIndex: 29 }, 'earth_split');
          scrollTL.to(refs.earthIntro.earth.current, {
            x: '22vw',
            y: '22vh',
            scale: 1.25,
            duration: TIMING.REVEAL_DURATION,
            ease: EASING.PRIMARY,
            immediateRender: false,
          }, 'earth_split');
        }

        if (refs.earthSplit.gridContent.current) {
          scrollTL.set(refs.earthSplit.gridContent.current, {
            zIndex: 29,
            pointerEvents: 'none',
          }, 'earth_split');
          scrollTL.fromTo(
            refs.earthSplit.gridContent.current,
            { x: -80, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              pointerEvents: 'all',
              duration: TIMING.REVEAL_DURATION * 1.2,
              ease: EASING.CONTENT_IN,
            },
            'earth_split+=0.3'
          );
        }

        if (refs.earthSplit.stats.current) {
          scrollTL.set(refs.earthSplit.stats.current, { zIndex: 29 }, 'earth_split');
          scrollTL.fromTo(
            refs.earthSplit.stats.current,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: TIMING.REVEAL_DURATION * 1.2,
              ease: EASING.CONTENT_IN,
              onComplete: () => { gsap.set(refs.earthSplit.stats.current, { pointerEvents: 'all' }); },
            },
            'earth_split+=0.5'
          );
        }

        scrollTL.to({}, { duration: 1.2 });

        // ============================================================
        // HORIZONTAL TIMELINE SECTION
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

        // ============================================================
        // PROJECT SECTIONS (Refactored)
        // ============================================================
        PROJECT_SECTIONS.forEach((section, index) => {
          const isFirst = index === 0;
          const prevSection = index > 0 ? PROJECT_SECTIONS[index - 1] : null;

          scrollTL.addLabel(section.label);
          scrollTL.call(() => dispatchHeaderEvent('black'), undefined, section.label);

          // Fade out previous content
          if (isFirst && refs.slider.slider.current) {
            scrollTL.to(refs.slider.slider.current, {
              opacity: 0,
              y: -20,
              pointerEvents: 'none',
              duration: 1,
              onComplete: () => {
                document.body.style.pointerEvents = 'auto';
              },
              ease: EASING.CONTENT_OUT,
            }, section.label);
          } else if (prevSection) {
            const prevProjectEl = (refs as any)[prevSection.refsKey].project.current;
            if (prevProjectEl) {
              scrollTL.to(prevProjectEl, {
                opacity: 0,
                scale: 0.92,
                y: -20,
                rotationX: 2,
                pointerEvents: 'none',
                duration: 1.2,
                ease: EASING.CONTENT_OUT,
              }, section.label);
            }
          }

          // Circle reveal
          const circleEl = (refs as any)[section.refsKey].circleProject.current;
          createExactCircleReveal(scrollTL, circleEl, section.label, {
            color: section.bgColor,
            zIndex: section.zBase,
          });

          // Animate project container
          const projectEl = (refs as any)[section.refsKey].project.current;
          if (projectEl) {
            scrollTL.set(projectEl, {
              zIndex: section.zBase + 1,
              opacity: 0,
              y: 20,
              scale: 0.95,
              rotationX: -3,
              transformPerspective: 1200,
              pointerEvents: 'none',
            }, section.label);

            scrollTL.to(projectEl, {
              opacity: 1,
              y: 0,
              scale: 1,
              rotationX: 0,
              pointerEvents: 'all',
              duration: TIMING.REVEAL_DURATION,
              ease: EASING.PRIMARY,
            }, section.label + '+=0.3');
          }

          // Animate project card
          const cardEl = (refs as any)[section.refsKey].projectCard.current;
          if (cardEl) {
            scrollTL.set(cardEl, {
              zIndex: section.zBase + 1,
              opacity: 0,
              x: 8,
              y: 40,
              scale: 0.92,
              rotationY: -8,
            }, section.label);

            scrollTL.to(cardEl, {
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
              rotationY: 0,
              duration: 1.6,
              ease: EASING.PRIMARY,
              onComplete: () => { gsap.set(cardEl, { pointerEvents: 'all' }); },
            }, section.label + '+=0.7');
          }

          // Hold for viewing with subtle breathing animation
          scrollTL.to({}, { duration: TIMING.HOLD_DURATION });

          if (cardEl) {
            scrollTL.to(cardEl, {
              y: -20,
              duration: 1.0,
              ease: EASING.SMOOTH,
              yoyo: true,
              repeat: 1,
            }, '<');
          }
        });

        // ============================================================
        // BLOG SECTION
        // ============================================================
        scrollTL.addLabel('blog_reveal');
        scrollTL.call(() => dispatchHeaderEvent('black'), undefined, 'blog_reveal');

        if (refs.project4.project.current) {
          scrollTL.to(refs.project4.project.current, {
            opacity: 0,
            scale: 1,
            y: 0,
            pointerEvents: 'none',
            duration: 1.0,
            ease: EASING.CONTENT_OUT,
          }, 'blog_reveal');
        }

        createExactCircleReveal(scrollTL, refs.blog.circleBlog.current, 'blog_reveal', {
          color: '#fff',
          zIndex: 70,
        });

        if (refs.blog.blog.current) {
          scrollTL.set(refs.blog.blog.current, {
            zIndex: 71,
            pointerEvents: 'none',
          }, 'blog_reveal');
          scrollTL.fromTo(
            refs.blog.blog.current,
            { opacity: 0, y: 0, scale: 1 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              pointerEvents: 'all',
              duration: 1.2,
              ease: EASING.CONTENT_IN,
            },
            'blog_reveal+=0.4'
          );
        }

        scrollTL.to({}, { duration: 2.5 });

        // ============================================================
        // BRAND SECTION
        // ============================================================
        scrollTL.addLabel('brand_reveal');
        scrollTL.call(() => dispatchHeaderEvent('black'), undefined, 'brand_reveal');

        if (refs.blog.blog.current) {
          scrollTL.to(refs.blog.blog.current, {
            opacity: 0,
            scale: 0.92,
            y: 0,
            pointerEvents: 'none',
            duration: 1.0,
            ease: EASING.CONTENT_OUT,
          }, 'brand_reveal');
        }

        createExactCircleReveal(scrollTL, refs.brand.circleBrand.current, 'brand_reveal', {
          color: '#FFF8F0',
          zIndex: 72,
        });

        if (refs.brand.brand.current) {
          scrollTL.set(refs.brand.brand.current, {
            zIndex: 73,
            pointerEvents: 'none',
          }, 'brand_reveal');
          scrollTL.fromTo(
            refs.brand.brand.current,
            { opacity: 0, y: 0, scale: 1 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              pointerEvents: 'all',
              duration: 1.2,
              ease: EASING.CONTENT_IN,
            },
            'brand_reveal+=0.4'
          );
        }

        scrollTL.to({}, { duration: 2.0 });

        // ============================================================
        // FOOTER SECTION
        // ============================================================
        scrollTL.addLabel('footer_reveal');
        scrollTL.call(() => dispatchHeaderEvent('black'), undefined, 'footer_reveal');

        if (refs.brand.brand.current) {
          scrollTL.to(refs.brand.brand.current, {
            opacity: 0,
            scale: 1,
            y: 0,
            duration: 1.0,
            ease: EASING.CONTENT_OUT,
          }, 'footer_reveal');
        }

        if (refs.footer.footer.current) {
          scrollTL.set(refs.footer.footer.current, { zIndex: 80 }, 'footer_reveal');
          scrollTL.fromTo(
            refs.footer.footer.current,
            { y: '100%', opacity: 1, scale: 1 },
            {
              y: '0%',
              scale: 1,
              duration: TIMING.REVEAL_DURATION * 1.2,
              ease: EASING.CONTENT_IN,
              onComplete: () => { gsap.set(refs.footer.footer.current, { pointerEvents: 'all' }); },
            },
            'footer_reveal'
          );
        }
      };
    }, containerRef);

    // CRITICAL: Proper cleanup to prevent memory leaks
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-auto overflow-hidden bg-[#FFF8F0]"
      style={{
        perspective: '2000px',
        transformStyle: 'preserve-3d',
      }}
    >
      <div className="relative w-full h-screen">
        <IntroSection refs={refs.intro} activeVideo={activeVideo} />
        <VideoSection2 refs={refs.video2} activeVideo={activeVideo} />
        <VideoSection3 refs={refs.video3} activeVideo={activeVideo} />

        <EarthIntroSection refs={refs.earthIntro} />

        <EarthSplitSection
          refs={refs.earthIntro}
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