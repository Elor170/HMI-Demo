import useStreamer from "@/Store/streamerStore";
import React from "react";
import ReactPlayer from "react-player";

export const videoContainerRef: React.RefObject<HTMLDivElement> = {
  current: null,
};
export const videoRef: React.RefObject<ReactPlayer> = { current: null };

export const handleFullscreen = () => {
  const { enterFullScreen, fullscreen, exitFullScreen } =
    useStreamer.getState();

  if (!fullscreen) {
    if (videoContainerRef.current) {
      videoContainerRef.current.requestFullscreen();
      enterFullScreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
    exitFullScreen();
  }
};
