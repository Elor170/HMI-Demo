import { create } from "zustand";

interface StreamerStoreProps {
  resolution: string;
  setResolution: (newState: string) => void;
  timestamp: number;
  setTimestamp: (newState: number) => void;
  duration: number;
  setDuration: (newState: number) => void;
  isBuffering: boolean;
  setIsBuffering: (newState: boolean) => void;
  volume: number;
  setVolume: (newState: number) => void;
  fullscreen: boolean;
  enterFullScreen: () => void;
  exitFullScreen: () => void;
  isPlaying: boolean;
  setIsPlaying: (newState: boolean) => void;
}

const useStreamer = create<StreamerStoreProps>((set) => ({
  resolution: "4k",
  setResolution: (newState) => set({ resolution: newState }),

  timestamp: 0,
  setTimestamp: (newState) => set({ timestamp: newState }),

  duration: 0,
  setDuration: (newState) => set({ duration: newState }),

  isBuffering: false,
  setIsBuffering: (newState) => set({ isBuffering: newState }),

  volume: 1,
  setVolume: (newState) => set({ volume: newState }),

  fullscreen: false,
  enterFullScreen: () => set({ fullscreen: true }),
  exitFullScreen: () => set({ fullscreen: false }),

  isPlaying: false,
  setIsPlaying: (newState) => set({ isPlaying: newState }),
}));

export default useStreamer;