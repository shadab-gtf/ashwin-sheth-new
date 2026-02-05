"use client";

import { useTransition } from "@/context/TransitionContext";
import Link from "next/link";


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
    <Link
      href={href}
      onClick={() => navigate(href)}
      className={`cursor-pointer pointer-events-auto ${className}`}
    >
      {children}
    </Link>
  );
};

export default TransitionLink;
