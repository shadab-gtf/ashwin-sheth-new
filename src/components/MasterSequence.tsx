'use client';

import { useRef, useLayoutEffect, useState, RefObject } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

/* COMPONENT IMPORTS */
import IntroSection, { createIntroTimeline } from '@/components/sections/Introsection';
import VideoSection2 from '@/components/sections/Videosection2';
import VideoSection3 from '@/components/sections/Videosection3';
import EarthIntroSection from '@/components/sections/Earthintrosection';
import EarthCenterSection from '@/components/sections/Earthcentersection';
import EarthSplitSection from '@/components/sections/Earthsplitsection';
import HorizontalSliderSection from '@/components/sections/Horizontalslidersection';
import ProjectSection from '@/components/sections/ProjectSection';
import BlogSection from '@/components/sections/Blogsection';
import BrandUnfoldedSection from '@/components/sections/BrandUnfoldedSection';
import Footer from '@/components/sections/Footer';

/* UTILS */
import { lockScroll, unlockScroll } from '@/app/utils/scrollLock';
import {
  createExactCircleReveal,
  createExactCircleRevealCenter,
  REVEAL_DURATION
} from '@/app/utils/createExactCircleReveal';
import ProjectSection2 from './sections/ProjectSection2';
import ProjectSection4 from './sections/ProjectSection4';
import ProjectSection3 from './sections/ProjectSection3';

gsap.registerPlugin(ScrollTrigger);

export default function MasterSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeVideo, setActiveVideo] = useState<number>(0);

  /* =====================================================
     REFS
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
      const introTL = createIntroTimeline(refs.intro);
      introTL.eventCallback('onComplete', () => {
        window.dispatchEvent(new Event('show-header'));
        window.dispatchEvent(new Event('header-white'));

        unlockScroll();
        initScroll();
      });
      introTL.play(0);
      const initScroll = () => {
        ScrollTrigger.refresh();

        const scrollTL = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: '+=2000%',
            pin: true,
            scrub: 1.2, // Increased for buttery smooth feel
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });


        // Z-Index: Circle 22, Content 23
        scrollTL.addLabel('v1');

        // Enforce Header White
        scrollTL.call(() => { window.dispatchEvent(new Event('header-white')); }, undefined, 'v1');

        // 1. Fade OUT Video 1 Content
        if (refs.intro.text1.current && refs.intro.scrollDown.current) {
          scrollTL.to([refs.intro.text1.current, refs.intro.scrollDown.current], {
            opacity: 0, duration: 0.8, ease: 'power2.inOut'
          }, 'v1');
        }
        if (refs.intro.video1.current) {
          scrollTL.to(refs.intro.video1.current, {
            opacity: 0, duration: 0.8, ease: 'power2.inOut'
          }, 'v1');
        }

        // 2. VIDEO 2 REVEAL (Bottom-Up)
        createExactCircleReveal(scrollTL, refs.video2.circleGreen.current, 'v1', {
          color: '#86efad56',
          zIndex: 22,
        });

        scrollTL.call(() => setActiveVideo(1), undefined, 'v1');

        // 3. FADE IN Video 2 Content
        if (refs.video2.video2.current) {
          scrollTL.set(refs.video2.video2.current, { zIndex: 23 }, 'v1');
          scrollTL.fromTo(refs.video2.video2.current,
            { opacity: 0 },
            { opacity: 1, duration: 1.0, ease: 'power2.out' }, 'v1+=0.6');
        }
        if (refs.video2.text2.current) {
          scrollTL.set(refs.video2.text2.current, { zIndex: 23 }, 'v1');
          scrollTL.fromTo(refs.video2.text2.current,
            { opacity: 0 },
            { opacity: 1, duration: 1.0, ease: 'power2.out' }, 'v1+=0.8');
        }

        scrollTL.to({}, { duration: 0.8 });


        // Z-Index: Circle 24, Content 25
        scrollTL.addLabel('v2');

        // Enforce Header White
        scrollTL.call(() => { window.dispatchEvent(new Event('header-white')); }, undefined, 'v2');

        if (refs.video2.text2.current && refs.video2.video2.current) {
          scrollTL.to([refs.video2.text2.current, refs.video2.video2.current], {
            opacity: 0, duration: 0.8, ease: 'power2.inOut'
          }, 'v2');
        }

        // VIDEO 3 REVEAL (Bottom-Up)
        createExactCircleReveal(scrollTL, refs.video3.circleOrange.current, 'v2', {
          color: '#fed7aa5a',
          zIndex: 24
        });

        scrollTL.call(() => setActiveVideo(2), undefined, 'v2');

        if (refs.video3.video3.current) {
          scrollTL.set(refs.video3.video3.current, { zIndex: 25 }, 'v2');
          scrollTL.fromTo(refs.video3.video3.current,
            { opacity: 0 },
            { opacity: 1, duration: 1.0, ease: 'power2.out' }, 'v2+=0.6');
        }
        if (refs.video3.text3.current) {
          scrollTL.set(refs.video3.text3.current, { zIndex: 25 }, 'v2');
          scrollTL.fromTo(refs.video3.text3.current,
            { opacity: 0 },
            { opacity: 1, duration: 1.0, ease: 'power2.out' }, 'v2+=0.8');
        }

        // Prep Earth
        if (refs.earthIntro.earth.current) {
          scrollTL.set(refs.earthIntro.earth.current, {
            y: '75vh', scale: 0.65, opacity: 0, zIndex: 20
          }, 'v2');
          scrollTL.to(refs.earthIntro.earth.current, {
            opacity: 1, duration: 0.6, ease: 'power2.out'
          }, 'v2+=0.5');
        }

        scrollTL.to({}, { duration: 0.8 });

        // Z-Index: Circle 26, Content 27
        scrollTL.addLabel('earth_intro');

        // Enforce Header White
        scrollTL.call(() => { window.dispatchEvent(new Event('header-white')); }, undefined, 'earth_intro');

        if (refs.video3.text3.current) {
          scrollTL.to(refs.video3.text3.current, { opacity: 0, duration: 0.8, ease: 'power2.inOut' }, 'earth_intro');
        }

        createExactCircleReveal(scrollTL, refs.earthIntro.circleWhite1.current, 'earth_intro', {
          color: '#FFFFFF',
          zIndex: 26
        });

        if (refs.earthIntro.earth.current) {
          scrollTL.set(refs.earthIntro.earth.current, { zIndex: 27 }, 'earth_intro');
          scrollTL.to(refs.earthIntro.earth.current, {
            y: '30vh', scale: 1, opacity: 1, duration: REVEAL_DURATION, ease: 'power2.out'
          }, 'earth_intro');
        }

        if (refs.earthIntro.earthScrollDown.current) {
          scrollTL.set(refs.earthIntro.earthScrollDown.current, { zIndex: 27 }, 'earth_intro');
          scrollTL.fromTo(refs.earthIntro.earthScrollDown.current,
            { opacity: 0, y: 10, visibility: 'hidden' },
            { opacity: 1, y: 0, visibility: 'visible', duration: 0.8, ease: 'power2.out' },
            'earth_intro+=1.0'
          );
        }

        scrollTL.to({}, { duration: 0.8 });


        // Content stays 27 (Earth). Background is same.
        scrollTL.addLabel('earth_center');

        // Enforce Header BLACK
        scrollTL.call(() => {
          window.dispatchEvent(new Event('header-black'));
          setActiveVideo(-1);
        }, undefined, 'earth_center');

        if (refs.earthIntro.earthScrollDown.current) {
          scrollTL.to(refs.earthIntro.earthScrollDown.current, { opacity: 0, duration: 0.6 }, 'earth_center');
        }
        if (refs.video3.video3.current) {
          scrollTL.to(refs.video3.video3.current, { opacity: 0, duration: 0.8 }, 'earth_center');
        }

        if (refs.earthIntro.earth.current) {
          scrollTL.to(refs.earthIntro.earth.current, {
            scale: 1.15, duration: 1.2, ease: 'power2.inOut'
          }, 'earth_center');
        }

        scrollTL.to({}, { duration: 0.8 });


        // Z-Index: Circle 28, Content 29
        scrollTL.addLabel('earth_split');

        // Enforce Header BLACK
        scrollTL.call(() => { window.dispatchEvent(new Event('header-black')); }, undefined, 'earth_split');

        createExactCircleReveal(scrollTL, refs.earthSplit.circleWhite2.current, 'earth_split', {
          color: '#FFFFFF',
          zIndex: 28
        });

        if (refs.earthIntro.earth.current) {
          scrollTL.set(refs.earthIntro.earth.current, { zIndex: 29 }, 'earth_split');
          scrollTL.to(refs.earthIntro.earth.current, {
            x: '22vw', y: '22vh', scale: 1.25, duration: REVEAL_DURATION, ease: 'power2.inOut'
          }, 'earth_split');
        }

        if (refs.earthSplit.gridContent.current) {
          scrollTL.set(refs.earthSplit.gridContent.current, { zIndex: 29 }, 'earth_split');
          scrollTL.fromTo(refs.earthSplit.gridContent.current,
            { x: -80, opacity: 0, pointerEvents: 'none' },
            { x: 0, opacity: 1, pointerEvents: 'all', duration: REVEAL_DURATION * 1.2, ease: 'power3.out' },
            'earth_split+=0.3'
          );
        }
        if (refs.earthSplit.stats.current) {
          scrollTL.set(refs.earthSplit.stats.current, { zIndex: 29 }, 'earth_split');
          scrollTL.fromTo(refs.earthSplit.stats.current,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: REVEAL_DURATION * 1.2, ease: 'power3.out' },
            'earth_split+=0.5'
          );
        }

        scrollTL.to({}, { duration: 1.2 });

        // Z-Index: Circle 60, Content 61
        scrollTL.addLabel('slider_reveal');

        // Enforce Header BLACK
        scrollTL.call(() => { window.dispatchEvent(new Event('header-black')); }, undefined, 'slider_reveal');

        const earthParts = [
          refs.earthIntro.earth.current,
          refs.earthSplit.gridContent.current,
          refs.earthSplit.stats.current
        ].filter(Boolean);
        scrollTL.to(earthParts, { opacity: 0, pointerEvents: 'none', duration: 0.8, stagger: 0.08, ease: 'power2.inOut' }, 'slider_reveal');

        createExactCircleReveal(scrollTL, refs.slider.circleFinal.current, 'slider_reveal', {
          color: '#FFF8F0',
          zIndex: 60
        });

        if (refs.slider.slider.current) {
          scrollTL.set(refs.slider.slider.current, { zIndex: 61 }, 'slider_reveal');
          scrollTL.fromTo(refs.slider.slider.current,
            { opacity: 0, pointerEvents: 'none' },
            { opacity: 1, pointerEvents: 'all', duration: 0.8, ease: 'power2.out' },
            'slider_reveal+=0.6'
          );
        }

        // HOLD SLIDER for Interaction
        scrollTL.to({}, { duration: 3.5 });


        //  premium project sections

        const projectSections = [
          { refs: refs.project, zBase: 62, bgColor: '#000000', label: 'project1' },
          { refs: refs.project2, zBase: 64, bgColor: '#FFF8F0', label: 'project2' },
          { refs: refs.project3, zBase: 66, bgColor: '#000000', label: 'project3' },
          { refs: refs.project4, zBase: 68, bgColor: '#FFF8F0', label: 'project4' },
        ];

        projectSections.forEach((section, index) => {
          const isFirst = index === 0;
          const isLast = index === projectSections.length - 1;
          const prevSection = index > 0 ? projectSections[index - 1] : null;

          scrollTL.addLabel(section.label);

          // Enforce Header BLACK
          scrollTL.call(() => { window.dispatchEvent(new Event('header-black')); }, undefined, section.label);

          // Fade out previous content
          if (isFirst && refs.slider.slider.current) {
            // Fade out slider for first project
            scrollTL.to(refs.slider.slider.current, {
              opacity: 0,
              y: -20,
              pointerEvents: 'none',
              duration: 1.0,
              ease: 'power3.in'
            }, section.label);
          } else if (prevSection && prevSection.refs.project.current) {
            // Fade out and scale previous project with parallax
            scrollTL.to(prevSection.refs.project.current, {
              opacity: 0,
              scale: 0.92,
              y: -20,
              rotationX: 2,
              pointerEvents: 'none',
              duration: 1.2,
              ease: 'power3.in'
            }, section.label);
          }

          // Smooth circle reveal
          createExactCircleReveal(scrollTL, section.refs.circleProject.current, section.label, {
            color: section.bgColor,
            zIndex: section.zBase,
          });

          // Set initial state for new section with 3D perspective
          if (section.refs.project.current) {
            scrollTL.set(section.refs.project.current, {
              zIndex: section.zBase + 1,
              opacity: 0,
              y: 20,
              scale: 0.95,
              rotationX: -3,
              transformPerspective: 1200,
            }, section.label);

            // Animate in with buttery smooth parallax
            scrollTL.to(section.refs.project.current, {
              opacity: 1,
              y: 0,
              scale: 1,
              rotationX: 0,
              pointerEvents: 'all',
              duration: 1.4,
              ease: 'power3.out'
            }, section.label + '+=0.3');
          }

          // Animate project card with stagger and parallax
          if (section.refs.projectCard.current) {
            scrollTL.set(section.refs.projectCard.current, {
              zIndex: section.zBase + 1,
              opacity: 0,
              x: 8,
              y: 40,
              scale: 0.92,
              rotationY: -8,
            }, section.label);

            scrollTL.to(section.refs.projectCard.current, {
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
              rotationY: 0,
              duration: 1.6,
              ease: 'power4.out'
            }, section.label + '+=0.7');
          }

          // Hold for viewing with subtle breathing animation
          scrollTL.to({}, { duration: 2.2 });

          // Add subtle parallax float on hold
          if (section.refs.projectCard.current) {
            scrollTL.to(section.refs.projectCard.current, {
              y: -20,
              duration: 1.0,
              ease: 'sine.inOut',
              yoyo: true,
              repeat: 1
            }, '<');
          }
        });


        // Z-Index: Circle 70, Content 71
        scrollTL.addLabel('blog_reveal');

        // Enforce Header BLACK
        scrollTL.call(() => { window.dispatchEvent(new Event('header-black')); }, undefined, 'blog_reveal');

        if (refs.project4.project.current) {
          scrollTL.to(refs.project4.project.current, {
            opacity: 0,
            scale: 1,
            y: 0,
            duration: 1.0,
            ease: 'power3.in'
          }, 'blog_reveal');
        }

        createExactCircleReveal(scrollTL, refs.blog.circleBlog.current, 'blog_reveal', {
          color: '#000000',
          zIndex: 70
        });

        if (refs.blog.blog.current) {
          scrollTL.set(refs.blog.blog.current, { zIndex: 71 }, 'blog_reveal');
          scrollTL.fromTo(refs.blog.blog.current,
            { opacity: 0, y: 0, scale: 1 },
            { opacity: 1, y: 0, scale: 1, pointerEvents: 'all', duration: 1.2, ease: 'power3.out' },
            'blog_reveal+=0.4'
          );
        }

        scrollTL.to({}, { duration: 2.5 });

        // Z-Index: Circle 72, Content 73
        scrollTL.addLabel('brand_reveal');

        // Enforce Header BLACK
        scrollTL.call(() => { window.dispatchEvent(new Event('header-black')); }, undefined, 'brand_reveal');

        if (refs.blog.blog.current) {
          scrollTL.to(refs.blog.blog.current, {
            opacity: 0,
            scale: 0.92,
            y: 0,
            pointerEvents: 'none',
            duration: 1.0,
            ease: 'power3.in'
          }, 'brand_reveal');
        }

        createExactCircleReveal(scrollTL, refs.brand.circleBrand.current, 'brand_reveal', {
          color: '#FFF8F0',
          zIndex: 72
        });

        if (refs.brand.brand.current) {
          scrollTL.set(refs.brand.brand.current, { zIndex: 73 }, 'brand_reveal');
          scrollTL.fromTo(refs.brand.brand.current,
            { opacity: 0, y: 0, scale: 1 },
            { opacity: 1, y: 0, scale: 1, pointerEvents: 'all', duration: 1.2, ease: 'power3.out' },
            'brand_reveal+=0.4'
          );
        }

        scrollTL.to({}, { duration: 2.0 });


        // Z-Index: 80
        scrollTL.addLabel('footer_reveal');

        // Enforce Header BLACK
        scrollTL.call(() => { window.dispatchEvent(new Event('header-black')); }, undefined, 'footer_reveal');

        if (refs.brand.brand.current) {
          scrollTL.to(refs.brand.brand.current, {
            opacity: 0,
            scale: 1,
            y: 0,
            duration: 1.0,
            ease: 'power3.in'
          }, 'footer_reveal');
        }

        if (refs.footer.footer.current) {
          scrollTL.set(refs.footer.footer.current, { zIndex: 80 }, 'footer_reveal');
          scrollTL.fromTo(refs.footer.footer.current,
            { y: '100%', opacity: 1, scale: 1 },
            { y: '0%', scale: 1, duration: REVEAL_DURATION * 1.2, ease: 'power3.out' },
            'footer_reveal'
          );
        }
      }

    }, containerRef);

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

        <ProjectSection
          projectRef={refs.project.project}
          circleProjectRef={refs.project.circleProject}
          projectCardRef={refs.project.projectCard}
        />
        <ProjectSection2
          projectRef={refs.project2.project}
          circleProjectRef={refs.project2.circleProject}
          projectCardRef={refs.project2.projectCard}
        />
        <ProjectSection3
          projectRef={refs.project3.project}
          circleProjectRef={refs.project3.circleProject}
          projectCardRef={refs.project3.projectCard}
        />
        <ProjectSection4
          projectRef={refs.project4.project}
          circleProjectRef={refs.project4.circleProject}
          projectCardRef={refs.project4.projectCard}
        />

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