import { useEffect } from "react";
import "./StreamingPage.scss";
import VideoController from "./Controller/VideoController";
import VideoDisplay from "./VideoDisplay";
import useStreamer from "@/Store/streamerStore";

export default function StreamingPage() {
  const { exitFullScreen, resolution } = useStreamer();

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

      <VideoController />

      <span style={{ userSelect: "none" }}>
        Current resolution: {resolution}
      </span>
    </div>
  );
}
