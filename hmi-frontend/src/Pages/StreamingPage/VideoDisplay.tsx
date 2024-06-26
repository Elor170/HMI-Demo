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
  } = useStreamer();

  const videoUrl = `${STREAMER_SERVER}/video/${resolution}`;
  const [displayControls, setDisplayControls] = useState(false);

  const onVideoStart = () => {
    if (videoRef.current) {
      videoRef.current.seekTo(timestamp);
    }
  };

  return (
    <div
      className="video-container"
      onMouseEnter={() => setDisplayControls(true)}
      onMouseLeave={() => setDisplayControls(false)}
    >
      {displayControls && <HoverControls scale="1.5"/>}

      {isBuffering && <CircularProgress className="video-loading" />}
      <div
        className={`react-player ${
          (isBuffering || displayControls) && "react-player-overlay"
        }`}
        onDoubleClick={handleFullscreen}
        onClick={() => setIsPlaying(!isPlaying)}
      >
        <ReactPlayer
          width="100%"
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
