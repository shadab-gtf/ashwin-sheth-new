"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePWAStore } from "@/store/usePWAStore";

export default function PWAInstallPopup() {
  const { isVisible, deferredPrompt, hide } = usePWAStore();

  if (!isVisible || !deferredPrompt) return null;

  const installApp = async () => {
    await deferredPrompt.prompt();
    hide();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="fixed bottom-6 right-6 z-[999] w-[320px]
                   rounded-xl bg-[#0e4194] shadow-2xl border border-black/10 p-4"
      >
        <div className="flex  flex-col items-center ">
          <img
            src="\icons\android\android-launchericon-192-192.png"
            alt="Ashwin Sheth"
            className="w-24 h-24 rounded-lg"
          />

          <div className="flex-1">
            {/* <p className="text-lg font-medium text-white">
              Install Ashwin Sheth
            </p> */}
            <p className="text-base text-white">
              Experience luxury real estate faster
            </p>
          </div>
        </div>

        <div className="mt-4 flex gap-2 ">
          <button
            onClick={installApp}
            className="flex-1 rounded-lg cursor-pointer bg-white text-black
                       py-2 text-sm font-medium hover:opacity-90"
          >
            Install
          </button>

          <button
            onClick={hide}
            className="flex-1 rounded-lg cursor-pointer border text-sm py-2
                       hover:bg-black/5"
          >
            Later
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
