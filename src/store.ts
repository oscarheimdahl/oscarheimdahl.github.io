import { RefObject } from 'react';
import { create } from 'zustand';

interface AppState {
  backgroundRef: RefObject<HTMLDivElement> | null;
  windowZ: number;
  boom: boolean;
  darkMode: boolean;
}

interface AppStateActions {
  setBackgroundRef: (ref: RefObject<HTMLDivElement>) => void;
  newWindowZ: () => void;
  setBoom: (boom: boolean) => void;
  setDarkMode: (darkMode: boolean) => void;
}

export const useAppState = create<AppState & AppStateActions>()((set) => ({
  windowZ: 1,
  backgroundRef: null,
  boom: false,
  darkMode: false,
  setBoom: (boom) => set(() => ({ boom })),
  setDarkMode: (darkMode) => set(() => ({ darkMode })),
  newWindowZ: () => set((state) => ({ windowZ: state.windowZ + 1 })),
  setBackgroundRef: (ref) => set(() => ({ backgroundRef: ref })),
}));
