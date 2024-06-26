import { create } from "zustand";

interface StreamerStoreStates {
  resolution: string;
  timestamp: number;
  duration: number;
  isBuffering: boolean;
  volume: number;
  fullscreen: boolean;
  isPlaying: boolean;
}

interface StreamerStoreActions {
  setResolution: (newState: string) => void;
  setTimestamp: (newState: number) => void;
  setDuration: (newState: number) => void;
  setIsBuffering: (newState: boolean) => void;
  setVolume: (newState: number) => void;
  enterFullScreen: () => void;
  exitFullScreen: () => void;
  setIsPlaying: (newState: boolean) => void;
  resetStore: () => void;
}

const initialStreamStore: StreamerStoreStates = {
  resolution: "4k",
  timestamp: 0,
  duration: 0,
  isBuffering: false,
  volume: 1,
  fullscreen: false,
  isPlaying: false,
};

const useStreamer = create<StreamerStoreStates & StreamerStoreActions>(
  (set) => ({
    ...initialStreamStore,
    setResolution: (newState) => set({ resolution: newState }),

    setTimestamp: (newState) => set({ timestamp: newState }),

    setDuration: (newState) => set({ duration: newState }),

    setIsBuffering: (newState) => set({ isBuffering: newState }),

    setVolume: (newState) => set({ volume: newState }),

    enterFullScreen: () => set({ fullscreen: true }),
    exitFullScreen: () => set({ fullscreen: false }),

    setIsPlaying: (newState) => set({ isPlaying: newState }),

    resetStore: () => set(initialStreamStore),
  })
);

export default useStreamer;
