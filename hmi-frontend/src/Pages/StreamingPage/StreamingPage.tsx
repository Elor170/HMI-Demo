import "./StreamingPage.scss";
import VideoController from "./Controller/VideoController";
import VideoDisplay from "./VideoDisplay";
import StreamPerformanceLogger from "./Logger/StreamPerformanceLogger";

export default function StreamingPage() {
  return (
    <div className="streamer">
      <VideoDisplay />
      <VideoController />
      <StreamPerformanceLogger />
    </div>
  );
}
