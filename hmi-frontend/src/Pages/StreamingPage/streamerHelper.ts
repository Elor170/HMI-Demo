import useStreamer from "@/Store/streamerStore";
import React from "react";
import ReactPlayer from "react-player";

export const videoRef: React.RefObject<ReactPlayer> = { current: null };

export const handleFullscreen = () => {
  const { enterFullScreen, fullscreen, exitFullScreen } =
    useStreamer.getState();

  if (!fullscreen) {
    // Enter fullscreen
    if (videoRef.current) {
      const player = videoRef.current.getInternalPlayer();
      if (player) {
        if (player.requestFullscreen) {
          player.requestFullscreen();
        }
        enterFullScreen();
      }
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
    exitFullScreen();
  }
};