import { STREAMER_SERVER } from "@/Helper/consts";
import { useRef, useState } from "react";
import "./StreamingPage.scss";
import VideoController from "./VideoController";
import ReactPlayer from "react-player";

export default function StreamingPage() {
  const [resolution, setResolution] = useState<string>("4k");
  const [timeStamp, setTimeStamp] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoUrl = `${STREAMER_SERVER}/video/${resolution}`;

  const videoRef = useRef<ReactPlayer>(null);

  const handleResolutionChange = (newResolution: string) => {
    if (videoRef.current) {
      setTimeStamp(videoRef.current.getCurrentTime() || 0);
    }

    setResolution(newResolution);
  };

  const onVideoStart = () => {
    if (videoRef.current) {
      videoRef.current.seekTo(timeStamp);
    }
  };

  return (
    <div className="streaming-page">
      <div className="video-container">
        <ReactPlayer
          style={{ width: "100%" }}
          ref={videoRef}
          playing={isPlaying}
          onStart={onVideoStart}
          url={videoUrl}
        />

        <VideoController
          videoRef={videoRef}
          setResolution={handleResolutionChange}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
        />
      </div>

      <span style={{ userSelect: "none" }}>
        Current resolution: {resolution}
      </span>
    </div>
  );
}
