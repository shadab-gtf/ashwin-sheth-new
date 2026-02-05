"use client";

import { useTransition } from "@/context/TransitionContext";


const TransitionLink = ({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) => {
  const { navigate } = useTransition();

  return (
    <button
      onClick={() => navigate(href)}
      className={`cursor-pointer ${className}`}
    >
      {children}
    </button>
  );
};

export default TransitionLink;
