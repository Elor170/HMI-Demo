import "./StreamingPage.scss";
import VideoController from "./Controller/VideoController";
import VideoDisplay from "./VideoDisplay";
import useStreamer from "@/Store/StreamerStore";
import { useMount, useUnmount } from "@/Hooks/mountHooks";
import { videoContainerRef } from "./streamerHelper";
import StreamPerformanceLogger from "./Logger/StreamPerformanceLogger";

export default function StreamingPage() {
  const { fullscreen, exitFullScreen, resolution, resetStore } = useStreamer();

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
    <>
      <div ref={videoContainerRef} className="streamer">
        <VideoDisplay />

        <VideoController />

        {!fullscreen && (
          <span style={{ userSelect: "none" }}>
            Current resolution: {resolution}
          </span>
        )}
      </div>
      <StreamPerformanceLogger />
    </>
  );
}
