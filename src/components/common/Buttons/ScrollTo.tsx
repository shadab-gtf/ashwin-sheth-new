import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { MdKeyboardDoubleArrowDown, MdOutlineKeyboardDoubleArrowUp } from "react-icons/md";

gsap.registerPlugin(ScrollToPlugin);

interface ScrollToProps {
  idTop: string;
  idBottom: string;
  className?: string;
}

const ScrollTo: React.FC<ScrollToProps> = ({
  idTop,
  idBottom,
  className = "",
}) => {
  const [direction, setDirection] = useState<"down" | "up">("down");
  const lastScroll = useRef<number>(0);

  useEffect(() => {
    const handler = () => {
      const current = window.scrollY;

      if (current > lastScroll.current) {
        setDirection("down");
      } else {
        setDirection("up");
      }

      lastScroll.current = current;
    };

    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleClick = () => {
    const targetId = direction === "down" ? idTop : idBottom;
    const target = document.getElementById(targetId);

    if (!target) return;

    gsap.to(window, {
      duration: 1.2,
      scrollTo: { y: target, offsetY: 0 },
      ease: "power3.inOut",
    });
  };

  return (
    <button
      onClick={handleClick}
      className={`flex items-center scrollto-btn gap-[5px] bg-[#104196] hover:bg-[#5779b5] px-[20px] py-[5px] text-white rounded-full cursor-pointer absolute bottom-[50px] right-[10px] md:right-[50px] z-51 Pera font-graphik-regular text-[12px] md:text-[14px] font-light leading-[24px] md:leading-[26px] tracking-[0.5px] capitalize ${className}`}
    >
      Skip
      {direction === "down" ? (
        <MdKeyboardDoubleArrowDown />
      ) : (
        <MdOutlineKeyboardDoubleArrowUp />
      )}
    </button>
  );
};

export default ScrollTo;
