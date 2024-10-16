import React from "react";

export default function useFullscreen(
  elementRef: React.RefObject<HTMLDivElement>,
) {
  const isFullscreen = document.fullscreenElement !== null;

  const enterFullscreen = () => {
    if (elementRef.current) {
      elementRef.current.requestFullscreen();
    }
  };

  const exitFullscreen = () => {
    document.exitFullscreen();
  };

  const changeFullscreenState = () => {
    if (!isFullscreen) return enterFullscreen();
    exitFullscreen();
  };

  return {
    isFullscreen,
    enterFullscreen,
    exitFullscreen,
    changeFullscreenState,
  };
}
