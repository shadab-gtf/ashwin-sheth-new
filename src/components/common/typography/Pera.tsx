import React, { ReactNode, HTMLAttributes } from "react";

interface PeraProps extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode;
  className?: string;
}

const Pera: React.FC<PeraProps> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <p
      {...props}
      className={`text-black text-center font-graphik-regular text-[12px] md:text-[14px] font-light leading-[24px] md:leading-[26px] tracking-[0.5px] capitalize ${className}`}
    >
      {children}
    </p>
  );
};

export default Pera;
