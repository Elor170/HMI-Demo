import "./StreamingPage.scss";
import ReactPlayer from "react-player";
import { CircularProgress } from "@mui/material";
import useStreamer from "@/Store/streamerStore";
import { videoRef, handleFullscreen } from "./streamerHelper";
import { STREAMER_SERVER } from "@/Helper/consts";
import { useState } from "react";
import HoverControls from "./Controller/HoverControls";

export default function VideoDisplay() {
  const {
    resolution,
    isBuffering,
    isPlaying,
    setIsPlaying,
    setDuration,
    setTimestamp,
    timestamp,
    setIsBuffering,
    volume,
    fullscreen,
  } = useStreamer();

  const videoUrl = `${STREAMER_SERVER}/video/${resolution}`;
  const [hoverVideo, setHoverVideo] = useState(false);

  const onVideoStart = () => {
    if (videoRef.current) {
      videoRef.current.seekTo(timestamp);
    }
  };

  return (
    <div
      className="video-container"
      style={fullscreen ? { height: "100%" } : undefined}
      onMouseEnter={() => setHoverVideo(true)}
      onMouseLeave={() => setHoverVideo(false)}
      onDoubleClick={handleFullscreen}
      onClick={() => setIsPlaying(!isPlaying)}
    >
      <HoverControls scale="1.5" hover={hoverVideo} />

      {isBuffering && <CircularProgress className="video-loading" />}
      <div
        style={fullscreen ? { height: "100%" } : undefined}
        className={`react-player ${
          (isBuffering || (hoverVideo && !fullscreen)) && "react-player-overlay"
        }`}
      >
        <ReactPlayer
          width="100%"
          height="100%"
          ref={videoRef}
          playing={isPlaying}
          onStart={onVideoStart}
          url={videoUrl}
          onDuration={(newDuration) => setDuration(newDuration)}
          onProgress={(state) => setTimestamp(state.playedSeconds)}
          onBuffer={() => setIsBuffering(true)}
          onBufferEnd={() => setIsBuffering(false)}
          loop
          volume={volume}
        />
      </div>
    </div>
  );
}
