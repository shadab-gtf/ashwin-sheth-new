"use client";

import { useState, useRef, useEffect } from "react";
import SmoothScroll from "@/components/SmoothScroll";
import Loader from "@/components/Loader";
import EnquiryForm from "@/components/common/form/EnquiryForm";
import { TransitionProvider } from "@/context/TransitionContext";
import SpotlightOverlay from "@/components/common/transition/SpotlightOverlay";
// import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { usePathname } from "next/navigation";
import Footer from "@/components/common/footer/Footer";

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const footerRef = useRef<HTMLDivElement | null>(null);

  const isHome = pathname === "/";


  return (
    <SmoothScroll>
      <TransitionProvider>
        {isHome ? <Loader /> : <SpotlightOverlay />}
        <Header />
        <button
          onClick={() => setOpen(true)}
          className="fixed z-[9999] right-[-60px] top-[40%]
                   translate-x-[-50%] px-[30px] py-[10px]
                   rotate-[-90deg] origin-right
                   bg-[#1B4485] text-white rounded-sm"
        >
          Enquire Now
        </button>

        <EnquiryForm open={open} onClose={() => setOpen(false)} />

        <main>{children}</main>
        {/* {!isHome && <Footer footerRef={footerRef} />} */}
        <Footer footerRef={footerRef} />
      </TransitionProvider>
    </SmoothScroll>
  );
}
