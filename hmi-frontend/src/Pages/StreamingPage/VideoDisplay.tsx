import "./StreamingPage.scss";
import ReactPlayer from "react-player";
import { CircularProgress } from "@mui/material";
import useStreamer from "@/Store/streamerStore";
import { videoRef, handleFullscreen } from "./streamerHelper";
import { STREAMER_SERVER } from "@/Helper/consts";

export default function VideoDisplay() {
  const {
    resolution,
    isBuffering,
    isPlaying,
    setDuration,
    setTimestamp,
    timestamp,
    setIsBuffering,
    volume,
  } = useStreamer();

  const videoUrl = `${STREAMER_SERVER}/video/${resolution}`;

  const onVideoStart = () => {
    if (videoRef.current) {
      videoRef.current.seekTo(timestamp);
    }
  };

  return (
    <div className="video-container">
      {isBuffering && <CircularProgress className="video-loading" />}
      <div
        className={`react-player ${isBuffering ? "react-player-loading" : ""}`}
        onDoubleClick={handleFullscreen}
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
