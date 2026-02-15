"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import TransitionLink from "./common/transition/TransitionLink";
import Menu from "./header/Menu";

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const [visible, setVisible] = useState(false);
  const [theme, setTheme] = useState<"black" | "white">("black");

  const NAV_CLASSES =
    "text-[16px] pointer-events-auto font-normal tracking-[0.15em] transition-colors cursor-pointer hidden md:block";

  // Auto-show on non-home pages, hide on home (initially)
  useEffect(() => {
    if (!isHome) {
      setVisible(true);
      setTheme("black");
    } else {
      setVisible(false);
    }
  }, [isHome]);

  useEffect(() => {
    const white = () => {
      setTheme("white");
      setVisible(true);
    };

    const black = () => {
      setTheme("black");
      setVisible(true);
    };

    const hidden = () => {
      setVisible(false);
    };

    window.addEventListener("header-white", white);
    window.addEventListener("header-black", black);
    window.addEventListener("header-hidden", hidden);

    return () => {
      window.removeEventListener("header-white", white);
      window.removeEventListener("header-black", black);
      window.removeEventListener("header-hidden", hidden);
    };
  }, []);
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);
  return (
    <>
      <header
        className={clsx(
          "fixed top-0 w-full z-[9999999] transition-all duration-500 pointer-events-none",
          visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6",
        )}
      >
        <div
          className={clsx(
            "flex items-center  w-full mx-auto justify-between px-8 py-4 transition-colors duration-500",
            theme === "black" ? "text-black" : "text-white",
          )}
        >
          <TransitionLink href="/">
            <img
              src={theme === "black" ? "/blacklogo.png" : "/headerlogo.png"}
              alt="Logo"
              className={clsx(
                "h-14 w-auto transition-opacity duration-300 cursor-pointer",
                visible ? "pointer-events-auto" : "pointer-events-none",
              )}
            />
          </TransitionLink>

          <div className="flex items-center justify-center gap-20">
            <nav
              className={clsx(
                "hidden md:flex items-center gap-8 md:gap-8 capitalize",
                visible ? "pointer-events-auto" : "pointer-events-none",
              )}
            >
              {/* <TransitionLink href="/microsite" className={NAV_CLASSES}>Residential</TransitionLink>    */}
              <TransitionLink
                href="/microsite"
                className={clsx(
                  NAV_CLASSES,
                  theme === "white" && "hover:text-white",
                )}
              >
                Residential
              </TransitionLink>

              <TransitionLink
                href="/commercial"
                className={clsx(
                  NAV_CLASSES,
                  theme === "white" && "hover:text-white",
                )}
              >
                Commercial
              </TransitionLink>
              {/* <a href="#" className={NAV_CLASSES}>Land</a> */}
              <TransitionLink
                href="/land"
                className={clsx(
                  NAV_CLASSES,
                  theme === "white" && "hover:text-white",
                )}
              >
                Land
              </TransitionLink>
              {/* <a href="#" className={NAV_CLASSES}>The Orange Circle</a> */}
              <TransitionLink
                href="/orange-circle"
                className={clsx(
                  NAV_CLASSES,
                  theme === "white" && "hover:text-white",
                )}
              >
                The Orange Circle
              </TransitionLink>
            </nav>

            <button
              onClick={toggleMenu}
              aria-label="Toggle Menu"
              className={clsx(
                "relative flex flex-col justify-center items-center w-6 h-6 cursor-pointer",
                visible ? "pointer-events-auto" : "pointer-events-none",
              )}
            >
              <span
                className={clsx(
                  "absolute w-6 h-[1.5px] transition-all duration-300",
                  theme === "black" ? "bg-black" : "bg-white",
                  isOpen ? "rotate-45" : "-translate-y-2",
                )}
              />
              <span
                className={clsx(
                  "absolute w-6 h-[1.5px] transition-all duration-300",
                  theme === "black" ? "bg-black" : "bg-white",
                  isOpen ? "opacity-0" : "opacity-100",
                )}
              />
              <span
                className={clsx(
                  "absolute w-6 h-[1.5px] transition-all duration-300",
                  theme === "black" ? "bg-black" : "bg-white",
                  isOpen ? "-rotate-45" : "translate-y-2",
                )}
              />
            </button>
          </div>
        </div>
      </header>
      <Menu isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}
