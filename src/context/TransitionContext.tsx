"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
} from "react";
import { useRouter, usePathname } from "next/navigation";

type TransitionContextType = {
  navigate: (path: string) => void;
};

const TransitionContext = createContext<TransitionContextType | null>(null);

export const useTransition = () => {
  const ctx = useContext(TransitionContext);
  if (!ctx) throw new Error("useTransition must be used inside provider");
  return ctx;
};

export const TransitionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const isAnimating = useRef(false);
  const pendingPath = useRef<string | null>(null);

  useEffect(() => {
    const onEnterComplete = () => {
      if (!pendingPath.current) return;

      // 🧠 Only push if route is actually different
      if (pendingPath.current !== pathname) {
        router.push(pendingPath.current);
      } else {
        // Same route → immediately exit animation
        window.dispatchEvent(
          new Event("transition-exit-complete")
        );
      }
    };

    const onExitComplete = () => {
      isAnimating.current = false;
      pendingPath.current = null;
    };

    window.addEventListener("transition-in-complete", onEnterComplete);
    window.addEventListener("transition-exit-complete", onExitComplete);

    return () => {
      window.removeEventListener("transition-in-complete", onEnterComplete);
      window.removeEventListener("transition-exit-complete", onExitComplete);
    };
  }, [router, pathname]);

  const navigate = (path: string) => {
    // 🚫 Same route → do nothing
    if (path === pathname) return;

    if (isAnimating.current) return;

    isAnimating.current = true;
    pendingPath.current = path;

    window.dispatchEvent(new Event("start-transition"));
  };

  return (
    <TransitionContext.Provider value={{ navigate }}>
      {children}
    </TransitionContext.Provider>
  );
};
