import { GoArrowRight } from "react-icons/go";
import Link from "next/link";

const ViewMore = ({text="View More",link = "/",className}) => {
  return (
    <Link
      href={link}
      className={`view-more-btn  w-fit text-black text-[14px] md:text-[20px] leading-normal tracking-[1.5px] capitalize flex items-center justify-start gap-[10px] md:gap-[20px] ${className}`}
    >
      {text}

      <span className="icon-wrap">
        <GoArrowRight className="arrow arrow-1" />
        <GoArrowRight className="arrow arrow-2" />
      </span>
    </Link>
  );
};

export default ViewMore;
