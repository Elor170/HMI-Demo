import "./StreamingPage.scss";
import VideoController from "./Controller/VideoController";
import VideoDisplay from "./VideoDisplay";
import useStreamer from "@/Store/streamerStore";
import { useMount, useUnmount } from "@/Hooks/mountHooks";

export default function StreamingPage() {
  const { exitFullScreen, resolution, resetStore } = useStreamer();

  const handleFullscreenChange = () => {
    if (!document.fullscreenElement) {
      exitFullScreen();
    }
  };
  useMount(() => {
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    resetStore();
  });

  useUnmount(() => {
    document.removeEventListener("fullscreenchange", handleFullscreenChange);
    resetStore();
  });

  return (
    <div className="streamer">
      <VideoDisplay />

      <VideoController />

      <span style={{ userSelect: "none" }}>
        Current resolution: {resolution}
      </span>
    </div>
  );
}
