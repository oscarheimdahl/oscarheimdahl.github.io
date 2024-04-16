import { RefObject } from 'react';
import { create } from 'zustand';

interface AppState {
  backgroundRef: RefObject<HTMLDivElement> | null;
  windowZ: number;
}

interface AppStateActions {
  setBackgroundRef: (ref: RefObject<HTMLDivElement>) => void;
  newWindowZ: () => void;
}

export const useAppState = create<AppState & AppStateActions>()((set) => ({
  windowZ: 1,
  backgroundRef: null,
  newWindowZ: () => set((state) => ({ windowZ: state.windowZ + 1 })),
  setBackgroundRef: (ref) => set(() => ({ backgroundRef: ref })),
}));
