"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { usePWAStore } from "@/store/usePWAStore";

export default function PWARegister() {
  const pathname = usePathname();
  const setPrompt = usePWAStore((s) => s.setPrompt);

  const deferredPromptRef = useRef<any>(null);
  const interactionHandledRef = useRef(false);

  useEffect(() => {
    if (pathname !== "/") return;

    if (localStorage.getItem("pwa-install-shown")) return;

    const handleFirstInteraction = () => {
      if (interactionHandledRef.current) return;
      interactionHandledRef.current = true;

      if (sessionStorage.getItem("pwa-session-used")) return;

      sessionStorage.setItem("pwa-session-used", "true");

      if (deferredPromptRef.current) {
        setPrompt(deferredPromptRef.current);
        deferredPromptRef.current = null;
      }

      removeInteractionListeners();
    };

    const addInteractionListeners = () => {
      window.addEventListener("scroll", handleFirstInteraction, { once: true });
      window.addEventListener("click", handleFirstInteraction, { once: true });
      window.addEventListener("touchstart", handleFirstInteraction, {
        once: true,
      });
      window.addEventListener("keydown", handleFirstInteraction, {
        once: true,
      });
    };

    const removeInteractionListeners = () => {
      window.removeEventListener("scroll", handleFirstInteraction);
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
      window.removeEventListener("keydown", handleFirstInteraction);
    };

    const beforeInstallHandler = (e: any) => {
      e.preventDefault(); 
      deferredPromptRef.current = e;
      addInteractionListeners();
    };

    window.addEventListener("beforeinstallprompt", beforeInstallHandler);

    return () => {
      removeInteractionListeners();
      window.removeEventListener(
        "beforeinstallprompt",
        beforeInstallHandler
      );
    };
  }, [pathname, setPrompt]);

  return null;
}
