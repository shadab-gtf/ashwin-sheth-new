"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { ArrowBigRight, ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import Link from "next/link";

interface BlogPost {
  id: number;
  title: string;
  category: "News" | "Blogs";
  date: string;
  image: string;
  source: string;
  link: string;
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: `Ashwin Sheth Group's Bold Move in Mumbai's Luxurious Housing Market`,
    category: "News",
    date: "11th Jun, 2025",
    image: "/assets/images/blog/blog-1.jpg",
    source: "devdiscourse.com",
    link: "https://www.devdiscourse.com/article/science-environment/3455638-ashwin-sheth-groups-bold-move-in-mumbais-luxurious-housing-market",
  },
  {
    id: 2,
    title: "Unlocking Potential: How Kandivali Is Redefin...",
    category: "Blogs",
    date: "22 July 2024",
    image: "/assets/images/blog-and-news/thumbnail.webp",
    source: "",
    link: "/blogs",
  },
  {
    id: 3,
    title:
      "Ashwin Sheth Group, PAG to co-develop luxury residential project in Marine Lines..",
    category: "News",
    date: "16th Jun, 2025",
    image: "/assets/images/blog/blog-3.jpg",
    source: "propnewstime.com",
    link: "https://propnewstime.com/getdetailsStories/MTg5Njg=/ashwin-sheth-group-pag-to-co-develop-luxury-residential-project-in-marine-lines",
  },
  {
    id: 4,
    title: "The ethics of architecture: Balancing creativ...",
    category: "Blogs",
    date: "22 July 2024",
    image: "/assets/images/blog-and-news/thumbnail2.webp",
    source: "propnewstime.com",
    link: "/blogs",
  },
  {
    id: 5,
    title: `PAG invests Rs 540 cr in Ashwin Sheth Group's joint housing project in Mumbai'`,
    category: "News",
    date: "11th Jun, 2025",
    image: "/assets/images/blog/blog-1.jpg",
    source: "ptinews.com",
    link: "https://www.ptinews.com/story/business/pag-invests-rs-540-cr-in-ashwin-sheth-group-s-joint-housing-project-in-mumbai/2637018",
  },
  {
    id: 6,
    title: "Balancing work and life: Strategies from a pr...",
    category: "Blogs",
    date: "22 July 2024",
    image: "/assets/images/blog-and-news/thumbnail3.webp",
    source: "propnewstime.com",
    link: "/blogs",
  },
  {
    id: 7,
    title:
      "Ashwin Sheth unveils an extensive multi-channel campaign across India and New York to launch the new logo",
    category: "News",
    date: "July 16, 2024",
    image: "/assets/images/blog/blog-3.jpg",
    source: "propnewstime.com",
    link: "https://audiencereports.in/ashwin-sheth-unveils-an-extensive/",
  },
  {
    id: 8,
    title: "Policy reforms driving growth in India’s comm...",
    category: "Blogs",
    date: "22 July 2024",
    image: "/assets/images/blog-and-news/thumbnail4.webp",
    source: "propnewstime.com",
    link: "/blogs",
  },
  {
    id: 9,
    title: `PAG invests $65 million in Ashwin Seth group's luxury project in Mumbai`,
    category: "News",
    date: "11th Jun, 2025",
    image: "/assets/images/blog/blog-1.jpg",
    source: "thehindubusinessline.com",
    link: "https://www.thehindubusinessline.com/companies/pag-invests-65-million-in-ashwin-seth-groups-luxury-project-in-mumbai/article69683889.ece",
  },
  {
    id: 10,
    title: "Pioneering Infrastructure: Trans Harbour Link...",
    category: "Blogs",
    date: "22 July 2024",
    image: "/assets/images/blog-and-news/thumbnail5.webp",
    source: "propnewstime.com",
    link: "/blogs",
  },
  {
    id: 11,
    title: "Revolutionizing Mumbai’s Real Estate: The Imp...",
    category: "Blogs",
    date: "22 July 2024",
    image: "/assets/images/blog-and-news/thumbnail6.webp",
    source: "propnewstime.com",
    link: "/blogs",
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
  },
) {
  if (!blogRefs.blog.current || !blogRefs.circleBlog.current) return;

  /* INITIAL STATES */
  gsap.set(blogRefs.blog.current, {
    opacity: 0,
    pointerEvents: "none",
  });

  gsap.set(blogRefs.circleBlog.current, {
    opacity: 0,
    clipPath: "circle(0% at 50% 100%)",
    backgroundColor: "#FFF8F0",
  });

  scrollTL.addLabel("blog_reveal");

  /* FADE OUT PROJECT */
  scrollTL.to(
    prevRefs.project.current,
    {
      opacity: 0,
      duration: 0.6,
      ease: "power3.in",
      pointerEvents: "none",
    },
    "blog_reveal",
  );

  /* BLOG CIRCLE REVEAL — TIME BASED (IMPORTANT) */
  scrollTL.add(() => {
    gsap.set(blogRefs.circleBlog.current, { opacity: 1 });

    gsap
      .timeline()
      .to(blogRefs.circleBlog.current, {
        clipPath: "circle(150% at 50% 100%)",
        duration: 1.2,
        ease: "power3.inOut",
      })
      .to(
        blogRefs.circleBlog.current,
        {
          opacity: 0,
          duration: 0.35,
          ease: "power2.out",
        },
        "-=0.25",
      );
  }, "blog_reveal+=0.1");

  /* SHOW BLOG */
  scrollTL.to(
    blogRefs.blog.current,
    {
      opacity: 1,
      duration: 0.8,
      ease: "power3.out",
      pointerEvents: "all",
    },
    "blog_reveal+=0.45",
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
  const [activeTab, setActiveTab] = useState<"News" | "Blogs">("News");
  const [progress, setProgress] = useState(0);

  const posts = BLOG_POSTS.filter((p) => p.category === activeTab);

  useEffect(() => {
    swiperRef.current?.slideTo(0, 0);
    setProgress(0);
  }, [activeTab]);

  const handleSlideChange = (swiper: any) => {
    // Calculate progress based on real index in loop mode
    const totalSlides = posts.length;
    const currentIndex = swiper.realIndex;

    // Progress calculation: (current + 1) / total * 100
    const currentProgress = ((currentIndex + 1) / totalSlides) * 100;
    setProgress(currentProgress);
  };

  return (
    <>
      {/* ================= BLOG WRAPPER ================= */}
      <div
        ref={blogRef}
        className="absolute inset-0 z-[90] opacity-0 pointer-events-none bg-[#FFF8F0]"
      >
        <div className="h-full w-full flex max-w-7xl mx-auto flex-col justify-center py-8 ">
          {/* Heading */}
          <div className="text-center px-6 mb-8">
            <h2 className="text-[#F07D00] text-3xl  font-light leading-tight ">
              Exploring What's New, What's Next, And
              <br className="hidden md:block" />
              What Defines Us.
            </h2>
          </div>

          {/* Tabs */}
          <div className="flex justify-center items-center gap-8 md:gap-12 mb-8 px-6">
            {(["News", "Blogs"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`
                  text-sm md:text-base uppercase tracking-[3px]
                  pb-0.5 transition-all duration-300 font-normal
                  ${
                    activeTab === tab
                      ? "text-[#1E40AF] border-b-2 border-[#1E40AF]"
                      : "text-black/40 hover:text-black/70"
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
                absolute left-0 md:-left-6 lg:-left-12 top-1/2 -translate-y-1/2 z-20
                w-10 h-10 md:w-12 md:h-12 text-black
                flex items-center justify-center
                hover:scale-110 transition-transform duration-300
              "
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
            </button>

            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="
                absolute right-0 md:-right-6 lg:-right-12 top-1/2 -translate-y-1/2 z-20
                w-10 h-10 md:w-12 md:h-12 text-black
                flex items-center justify-center
                hover:scale-110 transition-transform duration-300
              "
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
            </button>

            {/* Swiper */}
            <Swiper
              modules={[Autoplay, Navigation]}
              spaceBetween={24}
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
                  spaceBetween: 48,
                },
              }}
              onSwiper={(s) => (swiperRef.current = s)}
              onSlideChange={handleSlideChange}
              className="w-full"
            >
              {posts.map((post) => (
                <SwiperSlide key={post.id}>
                  {activeTab === "News" ? (
                    // NEWS CARD - Original Design

                    <div className="bg-white  transition-all duration-500 flex flex-col h-[375px]">
                      {/* Content */}
                      <div className="flex-1 flex flex-col p-8">
                        {/* Source */}
                        <div className="text-sm tracking-[1px] uppercase text-[#1E40AF] mb-4 font-[500]">
                          {post.source}
                        </div>

                        {/* Title */}
                        <h3 className="text-[20px] font-normal tracking-[2px] mb-3 leading-snug text-black line-clamp-3">
                          {post.title}
                        </h3>

                        {/* Footer */}
                        <div className="flex justify-between items-center mt-auto text-[10px] md:text-xs uppercase tracking-[2px] text-black/40 pt-4">
                          <span>{post.date}</span>
                          <Link
                            href={post.link || "#"}
                            className={`block ${!post.link && "pointer-events-auto"}`}
                          >
                            {" "}
                            <span className="text-[#1E40AF] font-medium">
                              {post.category} <ArrowUpRight className="w-4 h-4  inline-block ml-1" />
                            </span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ) : (
                    // BLOGS CARD - New Design with Image Overlay

                    <div className="relative w-full aspect-[4/5] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 h-[375px]">
                      {/* Background Image with Overlay */}
                      <div className="absolute inset-0">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                      </div>

                      {/* Content Overlay */}
                      <div className="relative h-full flex flex-col justify-end p-6 md:p-8 text-white">
                        {/* Title */}
                        <h3 className="text-2xl  font-light leading-tight mb-4">
                          {post.title}
                        </h3>

                        {/* Date */}
                        <p className="text-sm md:text-base opacity-90">
                          {post.date}
                        </p>

                        {/* Link Arrow (visible on hover) */}
                        <Link
                          href={post.link || "#"}
                          className={`block group ${!post.link && "pointer-events-none"}`}
                        >
                          {post.link && (
                            <div className="absolute top-6 right-6 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <svg
                                className="w-6 h-6 text-black"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M7 17L17 7M17 7H7M17 7V17"
                                />
                              </svg>
                            </div>
                          )}
                        </Link>
                      </div>
                    </div>
                  )}
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Progress Bar */}
          <div className="w-full px-8 md:px-16 lg:px-24 mt-10 md:mt-12">
            <div className="relative h-[2px] bg-black/10 overflow-hidden rounded-full">
              <div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#F07D00] to-[#1E40AF] transition-all duration-500 ease-out rounded-full"
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
          clipPath: "circle(0% at 50% 100%)",
          willChange: "clip-path",
          backgroundColor: "#FEF7F0",
        }}
      />
    </>
  );
}
