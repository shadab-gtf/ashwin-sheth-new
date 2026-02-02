import React, { ReactNode, HTMLAttributes } from "react";

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
  className?: string;
}

const Heading: React.FC<HeadingProps> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <h2
      {...props}
      className={`font-louize Heading text-[#0D4DA1] text-center text-[20px] md:text-[28px] font-normal leading-[30px] md:leading-[42px] tracking-[1.5px] capitalize ${className}`}
    >
      {children}
    </h2>
  );
};

export default Heading;
