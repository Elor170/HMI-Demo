import { useEffect } from "react";
import "./StreamingPage.scss";
import VideoController from "./VideoController";
import { Slider } from "@mui/material";
import VideoDisplay from "./VideoDisplay";
import useStreamer from "@/Store/streamerStore";
import { videoRef } from "./streamerHelper";

export default function StreamingPage() {
  const { setTimestamp, exitFullScreen, timestamp, duration, resolution } =
    useStreamer();

  const onSliderMove = (_: Event, newTimeStamp: number | number[]) => {
    const ts =
      typeof newTimeStamp === "number" ? newTimeStamp : newTimeStamp[0];
    setTimestamp(ts);

    if (videoRef.current) {
      videoRef.current.seekTo(ts);
    }
  };

  const handleFullScreen = () => {};

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        exitFullScreen();
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, [exitFullScreen]);

  return (
    <div className="streamer">
      <VideoDisplay handleFullScreen={handleFullScreen} />

      <Slider
        value={timestamp}
        max={duration}
        min={0}
        onChange={onSliderMove}
      />

      <VideoController />

      <span style={{ userSelect: "none" }}>
        Current resolution: {resolution}
      </span>
    </div>
  );
}
