import { create } from 'zustand';

interface UIState {
  showLoader: boolean;
  hasVisited: boolean;
  hideLoader: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  showLoader: true,
  hasVisited: false,

  hideLoader: () =>
    set({
      showLoader: false,
      hasVisited: true,
    }),
}));
