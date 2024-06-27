import { create } from "zustand";

export const getVolume = (): number => {
  const volume = localStorage.getItem("stream_volume");

  if (!volume || Number.isNaN(volume)) return 0;

  return Number(volume);
};

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
  play: () => void;
  pause: () => void;
}

const initialStreamStore: StreamerStoreStates = {
  resolution: "4k",
  timestamp: 0,
  duration: 0,
  isBuffering: false,
  volume: getVolume(),
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

    setVolume: (newState) => {
      localStorage.setItem("stream_volume", newState.toString());
      set({ volume: newState });
    },

    enterFullScreen: () => set({ fullscreen: true }),
    exitFullScreen: () => set({ fullscreen: false }),

    setIsPlaying: (newState) => set({ isPlaying: newState }),

    resetStore: () => set(initialStreamStore),

    play: () => set({ isPlaying: true }),
    pause: () => set({ isPlaying: false }),
  })
);

export default useStreamer;
