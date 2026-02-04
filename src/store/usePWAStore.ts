import { create } from "zustand";

interface PWAState {
  deferredPrompt: any | null;
  isVisible: boolean;
  setPrompt: (e: any) => void;
  hide: () => void;
}

export const usePWAStore = create<PWAState>((set) => ({
  deferredPrompt: null,
  isVisible: false,
  setPrompt: (e) =>
    set({
      deferredPrompt: e,
      isVisible: true,
    }),
  hide: () => set({ isVisible: false }),
}));
