// 'use client';

// import { useRef, useState } from 'react';
// import Image from 'next/image';
// import gsap from 'gsap';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { EffectCoverflow, Navigation } from 'swiper/modules';
// import { ChevronLeft, ChevronRight } from 'lucide-react';
// import 'swiper/css';
// import 'swiper/css/effect-coverflow';
// import 'swiper/css/navigation';

// interface BlogPost {
//     id: number;
//     title: string;
//     excerpt: string;
//     category: string;
//     date: string;
//     image: string;
//     source: string;
// }

// const BLOG_POSTS: BlogPost[] = [
//     {
//         id: 1,
//         title: "Ashwin Sheth Group, PAG To Co-Develop Luxury Residential Project",
//         excerpt: "A landmark partnership bringing world-class luxury living to Mumbai's most prestigious locations.",
//         category: "News",
//         date: "11th Jun, 2025",
//         image: "/assets/images/blog/blog-1.jpg",
//         source: "propnewstime.com"
//     },
//     {
//         id: 2,
//         title: "Redefining Mumbai's Skyline with Sustainable Architecture",
//         excerpt: "Exploring innovative approaches to eco-friendly luxury development in urban spaces.",
//         category: "Blogs",
//         date: "8th Jun, 2025",
//         image: "/assets/images/blog/blog-2.jpg",
//         source: "propnewstime.com"
//     },
//     {
//         id: 3,
//         title: "The Future of Premium Real Estate in India",
//         excerpt: "Industry insights on emerging trends shaping the luxury property market.",
//         category: "News",
//         date: "5th Jun, 2025",
//         image: "/assets/images/blog/blog-3.jpg",
//         source: "propnewstime.com"
//     },
//     {
//         id: 4,
//         title: "Award-Winning Design Excellence",
//         excerpt: "Celebrating architectural achievements and recognition in premium development.",
//         category: "Blogs",
//         date: "2nd Jun, 2025",
//         image: "/assets/images/blog/blog-4.jpg",
//         source: "propnewstime.com"
//     }
// ];

// interface BlogSectionProps {
//     blogRef: React.RefObject<HTMLDivElement | null>;
//     circleBlogRef: React.RefObject<HTMLDivElement | null>;
//     onComplete?: () => void;
// }

// export function createBlogTimeline(
//     scrollTL: gsap.core.Timeline,
//     projectRefs: any,
//     blogRefs: {
//         blog: React.RefObject<HTMLDivElement | null>;
//         circleBlog: React.RefObject<HTMLDivElement | null>;
//     }
// ) {
//     // Set initial states
//     gsap.set(blogRefs.blog.current, {
//         opacity: 0,
//         pointerEvents: 'none'
//     });

//     // TRANSITION FROM PROJECT TO BLOG
//     // Fade out project
//     scrollTL.to(projectRefs.project.current, {
//         opacity: 0,
//         duration: 0.8,
//         ease: 'power2.in'
//     }, 'blog_reveal');

//     // Circle reveal transition
//     scrollTL.to(projectRefs.circleProject.current, {
//         clipPath: 'circle(150% at 50% 50%)',
//         duration: 1.2,
//         ease: 'power2.inOut',
//         onStart: () => {
//             if (projectRefs.circleProject.current) {
//                 projectRefs.circleProject.current.style.opacity = '1';
//                 projectRefs.circleProject.current.style.backgroundColor = '#FFF8F0';
//             }
//         }
//     }, 'blog_reveal');

//     // Fade in blog section
//     scrollTL.to(blogRefs.blog.current, {
//         opacity: 1,
//         duration: 1,
//         ease: 'power2.out',
//         pointerEvents: 'all'
//     }, 'blog_reveal+=0.6');
// }

// export default function BlogSection({
//     blogRef,
//     circleBlogRef,
//     onComplete
// }: BlogSectionProps) {
//     const [activeTab, setActiveTab] = useState<'News' | 'Blogs'>('News');
//     const [activeIndex, setActiveIndex] = useState(0);
//     const swiperRef = useRef<any>(null);

//     const filteredPosts = BLOG_POSTS.filter(post => post.category === activeTab);

//     const handleComplete = () => {
//         // Trigger circle reveal to footer
//         gsap.timeline()
//             .to(circleBlogRef.current, {
//                 clipPath: 'circle(150% at 50% 50%)',
//                 duration: 1.5,
//                 ease: 'power2.inOut',
//                 onStart: () => {
//                     if (circleBlogRef.current) {
//                         circleBlogRef.current.style.opacity = '1';
//                         circleBlogRef.current.style.backgroundColor = '#000000';
//                     }
//                 }
//             })
//             .to(blogRef.current, {
//                 opacity: 0,
//                 duration: 0.5,
//                 pointerEvents: 'none',
//                 onComplete: () => {
//                     onComplete?.();
//                 }
//             }, '-=0.5');
//     };

//     return (
//         <>
//             {/* BLOG SECTION WRAPPER */}
//             <div
//                 ref={blogRef}
//                 className="absolute inset-0 z-90 opacity-0 pointer-events-none bg-[#FFF8F0]"
//             >
//                 <div className="w-full h-full flex flex-col items-center justify-center px-6 md:px-16 py-20">
//                     {/* Header */}
//                     <div className="w-full max-w-7xl mb-16">
//                         <h2 className="text-[#F07D00] text-4xl md:text-5xl tracking-wide font-light text-center mb-8 italic">
//                             Exploring What's New, What's Next, And<br />What Defines Us.
//                         </h2>

//                         {/* Tab Navigation */}
//                         <div className="flex items-center justify-center gap-8 mb-4">
//                             <button
//                                 onClick={() => setActiveTab('News')}
//                                 className={`text-lg tracking-[3px] uppercase transition-all duration-300 pb-2 ${
//                                     activeTab === 'News'
//                                         ? 'text-[#1E40AF] border-b-2 border-[#1E40AF] font-medium'
//                                         : 'text-black/40 hover:text-black/60'
//                                 }`}
//                             >
//                                 News
//                             </button>
//                             <div className="w-[1px] h-6 bg-black/20" />
//                             <button
//                                 onClick={() => setActiveTab('Blogs')}
//                                 className={`text-lg tracking-[3px] uppercase transition-all duration-300 pb-2 ${
//                                     activeTab === 'Blogs'
//                                         ? 'text-[#1E40AF] border-b-2 border-[#1E40AF] font-medium'
//                                         : 'text-black/40 hover:text-black/60'
//                                 }`}
//                             >
//                                 Blogs
//                             </button>
//                         </div>
//                     </div>

//                     {/* Cards Carousel */}
//                     <div className="w-full max-w-7xl relative">
//                         {/* Navigation Buttons */}
//                         <button
//                             onClick={() => swiperRef.current?.slidePrev()}
//                             className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-14 h-14 rounded-full 
//                                      bg-white border-2 border-black flex items-center justify-center
//                                      hover:bg-black hover:text-white transition-all duration-300 shadow-lg"
//                         >
//                             <ChevronLeft size={24} />
//                         </button>

//                         <button
//                             onClick={() => swiperRef.current?.slideNext()}
//                             className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-14 h-14 rounded-full 
//                                      bg-white border-2 border-black flex items-center justify-center
//                                      hover:bg-black hover:text-white transition-all duration-300 shadow-lg"
//                         >
//                             <ChevronRight size={24} />
//                         </button>

//                         <Swiper
//                             modules={[EffectCoverflow, Navigation]}
//                             effect="coverflow"
//                             centeredSlides
//                             slidesPerView={1.5}
//                             spaceBetween={30}
//                             coverflowEffect={{
//                                 rotate: 0,
//                                 stretch: 50,
//                                 depth: 200,
//                                 modifier: 1,
//                                 slideShadows: false
//                             }}
//                             breakpoints={{
//                                 768: {
//                                     slidesPerView: 2.2,
//                                     spaceBetween: 40
//                                 },
//                                 1024: {
//                                     slidesPerView: 2.5,
//                                     spaceBetween: 50
//                                 }
//                             }}
//                             onSwiper={(swiper) => (swiperRef.current = swiper)}
//                             onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
//                             className="w-full py-12"
//                         >
//                             {filteredPosts.map((post, index) => (
//                                 <SwiperSlide key={post.id}>
//                                     <div
//                                         className={`bg-white rounded-none shadow-xl overflow-hidden transition-all duration-500 ${
//                                             index === activeIndex ? 'scale-100' : 'scale-90 opacity-70'
//                                         }`}
//                                     >
//                                         {/* Image */}
//                                         <div className="relative h-72 overflow-hidden">
//                                             <Image
//                                                 src={post.image}
//                                                 alt={post.title}
//                                                 fill
//                                                 className="object-cover"
//                                             />
//                                         </div>

//                                         {/* Content */}
//                                         <div className="p-8">
//                                             <div className="text-xs text-[#1E40AF] tracking-[3px] uppercase mb-4">
//                                                 {post.source}
//                                             </div>

//                                             <h3 className="text-xl font-light text-black mb-4 leading-tight">
//                                                 {post.title}
//                                             </h3>

//                                             <p className="text-black/60 text-sm leading-relaxed mb-6">
//                                                 {post.excerpt}
//                                             </p>

//                                             <div className="flex items-center justify-between pt-6 border-t border-black/10">
//                                                 <span className="text-xs text-black/40 uppercase tracking-[2px]">
//                                                     {post.date}
//                                                 </span>
//                                                 <span className="inline-block px-4 py-1 text-xs tracking-[2px] uppercase 
//                                                                border border-[#1E40AF] text-[#1E40AF]">
//                                                     {post.category}
//                                                 </span>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </SwiperSlide>
//                             ))}
//                         </Swiper>
//                     </div>

//                     {/* View All Button */}
//                     <button
//                         onClick={handleComplete}
//                         className="mt-12 group relative overflow-hidden px-12 py-4 border-2 border-black 
//                                  text-black hover:text-white transition-colors duration-500"
//                     >
//                         <span className="relative z-10 text-sm tracking-[3px] uppercase font-light">
//                             View All Articles
//                         </span>
//                         <div className="absolute inset-0 bg-black transform scale-x-0 group-hover:scale-x-100 
//                                       transition-transform duration-500 origin-left" />
//                     </button>
//                 </div>
//             </div>

//             {/* CIRCLE REVEAL TO FOOTER */}
//             <div
//                 ref={circleBlogRef}
//                 className="absolute inset-0 z-95 pointer-events-none opacity-0"
//                 style={{
//                     clipPath: 'circle(0% at 50% 50%)',
//                     willChange: 'clip-path',
//                     backgroundColor: 'transparent'
//                 }}
//             />
//         </>
//     );
// }

'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/navigation';
import Link from 'next/link';

interface BlogPost {
  id: number;
  title: string;
  // excerpt: string;
  category: 'News' | 'Blogs';
  date: string;
  image: string;
  source: string;
  link: string;
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: `Ashwin Sheth Group's Bold Move in Mumbai's Luxurious Housing Market`,
    // excerpt:
    //   "A landmark partnership bringing world-class luxury living to Mumbai's most prestigious locations.",
    category: 'News',
    date: '11th Jun, 2025',
    image: '/assets/images/blog/blog-1.jpg',
    source: 'devdiscourse.com',
    link:'https://www.devdiscourse.com/article/science-environment/3455638-ashwin-sheth-groups-bold-move-in-mumbais-luxurious-housing-market',
  },
  {
    id: 2,
    title: "Ashwin Sheth Group, PAG to co-develop luxury resid",
    // excerpt:
    //   'Exploring innovative approaches to eco-friendly luxury development in urban spaces.',
    category: 'Blogs',
    date: '8th Jun, 2025',
    image: '/assets/images/blog/blog-2.jpg',
    source: 'propnewstime.com',
    link:'',
  },
  {
    id: 3,
    title: 'Ashwin Sheth Group, PAG to co-develop luxury residential project in Marine Lines..',
    // excerpt:
    //   'Industry insights on emerging trends shaping the luxury property market.',
    category: 'News',
    date: '16th Jun, 2025',
    image: '/assets/images/blog/blog-3.jpg',
    source: 'propnewstime.com',
    link:'https://propnewstime.com/getdetailsStories/MTg5Njg=/ashwin-sheth-group-pag-to-co-develop-luxury-residential-project-in-marine-lines',
  },
  {
    id: 4,
    title: 'Ashwin Sheth Group, PAG to co-develop luxury resid',
    // excerpt:
    //   'Celebrating architectural achievements and recognition in premium development.',
    category: 'Blogs',
    date: '2nd Jun, 2025',
    image: '/assets/images/blog/blog-4.jpg',
    source: 'propnewstime.com',
    link:'',
  },
  {
    id: 5,
    title: `PAG invests Rs 540 cr in Ashwin Sheth Group's joint housing project in Mumbai'`,
    // excerpt:
    //   "A landmark partnership bringing world-class luxury living to Mumbai's most prestigious locations.",
    category: 'News',
    date: '11th Jun, 2025',
    image: '/assets/images/blog/blog-1.jpg',
    source: 'ptinews.com',
    link:'https://www.ptinews.com/story/business/pag-invests-rs-540-cr-in-ashwin-sheth-group-s-joint-housing-project-in-mumbai/2637018',
  },
  {
    id: 6,
    title: "Ashwin Sheth Group, PAG to co-develop luxury resid",
    // excerpt:
    //   'Exploring innovative approaches to eco-friendly luxury development in urban spaces.',
    category: 'Blogs',
    date: '8th Jun, 2025',
    image: '/assets/images/blog/blog-2.jpg',
    source: 'propnewstime.com',
    link:'',
  },
  {
    id: 7,
    title: 'Ashwin Sheth unveils an extensive multi-channel campaign across India and New York to launch the new logo',
    // excerpt:
    //   'Industry insights on emerging trends shaping the luxury property market.',
    category: 'News',
    date: 'July 16, 2024',
    image: '/assets/images/blog/blog-3.jpg',
    source: 'propnewstime.com',
    link:'https://audiencereports.in/ashwin-sheth-unveils-an-extensive/',
  },
  {
    id: 8,
    title: 'Ashwin Sheth Group, PAG to co-develop luxury resid',
    // excerpt:
    //   'Celebrating architectural achievements and recognition in premium development.',
    category: 'Blogs',
    date: '2nd Jun, 2025',
    image: '/assets/images/blog/blog-4.jpg',
    source: 'propnewstime.com',
    link:'',
  },
  {
    id: 9,
    title: `PAG invests $65 million in Ashwin Seth group’s luxury project in Mumbai`,
    // excerpt:
    //   "A landmark partnership bringing world-class luxury living to Mumbai's most prestigious locations.",
    category: 'News',
    date: '11th Jun, 2025',
    image: '/assets/images/blog/blog-1.jpg',
    source: 'thehindubusinessline.com',
    link:'https://www.thehindubusinessline.com/companies/pag-invests-65-million-in-ashwin-seth-groups-luxury-project-in-mumbai/article69683889.ece',
  },
  {
    id: 10,
    title: "Ashwin Sheth Group, PAG to co-develop luxury resid",
    // excerpt:
    //   'Exploring innovative approaches to eco-friendly luxury development in urban spaces.',
    category: 'Blogs',
    date: '8th Jun, 2025',
    image: '/assets/images/blog/blog-2.jpg',
    source: 'propnewstime.com',
    link:'',
  },
  
  {
    id: 12,
    title: 'Ashwin Sheth Group, PAG to co-develop luxury resid',
    // excerpt:
    //   'Celebrating architectural achievements and recognition in premium development.',
    category: 'Blogs',
    date: '2nd Jun, 2025',
    image: '/assets/images/blog/blog-4.jpg',
    source: 'propnewstime.com',
    link:'',
  },
];

interface BlogSectionProps {
  blogRef: React.RefObject<HTMLDivElement | null>;
  circleBlogRef: React.RefObject<HTMLDivElement | null>;
}

/* ======================================================
   GSAP TIMELINE
====================================================== */
export function createBlogTimeline(
  scrollTL: gsap.core.Timeline,
  prevRefs: {
    project: React.RefObject<HTMLDivElement | null>;
  },
  blogRefs: {
    blog: React.RefObject<HTMLDivElement | null>;
    circleBlog: React.RefObject<HTMLDivElement | null>;
  }
) {
  if (!blogRefs.blog.current || !blogRefs.circleBlog.current) return;

  /* INITIAL STATES */
  gsap.set(blogRefs.blog.current, {
    opacity: 0,
    pointerEvents: 'none',
  });

  gsap.set(blogRefs.circleBlog.current, {
    opacity: 0,
    clipPath: 'circle(0% at 50% 100%)',
    backgroundColor: '#FFF8F0',
  });

  scrollTL.addLabel('blog_reveal');

  /* FADE OUT PROJECT */
  scrollTL.to(
    prevRefs.project.current,
    {
      opacity: 0,
      duration: 0.6,
      ease: 'power3.in',
      pointerEvents: 'none',
    },
    'blog_reveal'
  );

  /* BLOG CIRCLE REVEAL — TIME BASED (IMPORTANT) */
  scrollTL.add(() => {
    gsap.set(blogRefs.circleBlog.current, { opacity: 1 });

    gsap.timeline()
      .to(blogRefs.circleBlog.current, {
        clipPath: 'circle(150% at 50% 100%)',
        duration: 1.2,
        ease: 'power3.inOut',
      })
      .to(
        blogRefs.circleBlog.current,
        {
          opacity: 0,
          duration: 0.35,
          ease: 'power2.out',
        },
        '-=0.25'
      );
  }, 'blog_reveal+=0.1');

  /* SHOW BLOG */
  scrollTL.to(
    blogRefs.blog.current,
    {
      opacity: 1,
      duration: 0.8,
      ease: 'power3.out',
      pointerEvents: 'all',
    },
    'blog_reveal+=0.45'
  );

  /* HOLD */
  scrollTL.to({}, { duration: 2 });
}

/* ======================================================
   COMPONENT
====================================================== */
export default function BlogSection({
  blogRef,
  circleBlogRef,
}: BlogSectionProps) {
  const swiperRef = useRef<any>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<'News' | 'Blogs'>('News');
  const [progress, setProgress] = useState(0);

  const posts = BLOG_POSTS.filter((p) => p.category === activeTab);

  useEffect(() => {
    swiperRef.current?.slideTo(0, 0);
    setProgress(0);
  }, [activeTab]);

  const handleSlideChange = (swiper: any) => {
    const currentProgress = ((swiper.activeIndex + 1) / swiper.slides.length) * 100;
    setProgress(currentProgress);
  };

  return (
    <>
      {/* ================= BLOG WRAPPER ================= */}
      <div
        ref={blogRef}
        className="absolute inset-0 z-[90] opacity-0 pointer-events-none bg-[#FFF8F0]"
      >
        <div className="h-full w-full flex max-w-7xl mx-auto flex-col justify-center py-8 md:py-12">
          {/* Heading */}
          <div className="text-center px-6 mb-8">
            <h2 className="text-[#F07D00] text-3xl font-light leading-tight">
              Exploring What's New, What's Next, And
              <br className="hidden md:block" />
              What Defines Us.
            </h2>
          </div>

          {/* Tabs */}
          <div className="flex justify-center items-center gap-8 md:gap-8 mb-10  px-6">
            {(['News', 'Blogs'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`
                  text-sm  uppercase 
                  pb-1 transition-all duration-300 font-normal
                  ${activeTab === tab
                    ? 'text-[#1E40AF] border-b-2 border-[#1E40AF]'
                    : 'text-black/40 hover:text-black/70 border-2 border-transparent'
                  }
                `}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Carousel Container */}
          <div className="relative w-full px-4 md:px-8 lg:px-16">
            {/* Navigation Buttons */}
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="
                absolute -left-3 -md:left-6 -lg:left-12 top-1/2 -translate-y-1/2 z-20
                w-10 h-10 md:w-12 md:h-12 text-black
                flex items-center justify-center
              "
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="
                absolute -right-3 -md:right-6 -lg:right-12 top-1/2 -translate-y-1/2 z-20
                w-10 h-10 md:w-12 md:h-12 text-black
                flex items-center justify-center
              "
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            {/* Swiper */}
            <Swiper
              modules={[Autoplay, Navigation]}
              spaceBetween={32}
              slidesPerView={1}
              centeredSlides={false}
              loop={true}
              speed={800}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 1.5,
                  spaceBetween: 32,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 40,
                },
                1024: {
                  slidesPerView: 2.5,
                  spaceBetween: 48,
                },
                1280: {
                  slidesPerView: 3,
                  spaceBetween: 40,
                },
              }}
              onSwiper={(s) => (swiperRef.current = s)}
              onSlideChange={handleSlideChange}
              className="w-full"
            >
              {posts.map((post) => (
                <SwiperSlide key={post.id} className="pb-4 h-[425px] w-[408px]">
                  <div className="bg-white p-8  shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col">
                    {/* Content */}
                    <div className="flex-1 flex flex-col">
                      {/* Source */}
                      <div className="text-sm tracking-[1px] uppercase text-[#1E40AF] mb-4 font-[500]">
                        {post.source}
                      </div>

                      {/* Title */}
                      <h3 className="text-[20px] font-normal tracking-[2px]  mb-3 leading-snug text-black line-clamp-4">
                        {post.title}
                      </h3>

                      {/* Excerpt */}
                      {/* <p className="text-xs md:text-sm text-black/60 mb-6 leading-relaxed line-clamp-2 flex-1">
                        {post.excerpt}
                      </p> */}

                      {/* Footer */}
                      <div className="flex justify-between items-center mt-24 text-[10px] md:text-xs uppercase tracking-[2px] text-black/40 pt-4 ">
                        <span>{post.date}</span>
                       <Link href="">
                       <span className="text-[#1E40AF] font-medium">{post.category}</span>
                       </Link> 
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Progress Bar */}
          <div className="w-full px-8 md:px-16 lg:px-24 mt-10 md:mt-10">
            <div className="relative h-[2px] bg-black/10 overflow-hidden">
              <div
                ref={progressBarRef}
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#F07D00] to-[#1E40AF] transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Transition Circle */}
      <div
        ref={circleBlogRef}
        className="absolute inset-0 z-[95] pointer-events-none opacity-0"
        style={{
          clipPath: 'circle(0% at 50% 100%)',
          willChange: 'clip-path',
          backgroundColor: '#FEF7F0',
        }}
      />
    </>
  );
}