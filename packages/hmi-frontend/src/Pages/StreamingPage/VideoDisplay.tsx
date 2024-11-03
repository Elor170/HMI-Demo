import "./StreamingPage.scss";
import ReactPlayer from "react-player";
import { CircularProgress } from "@mui/material";
import useStreamer from "@/Store/StreamerStore";
import { STREAMER_SERVER } from "@/Helper/consts";
import { useContext, useEffect, useState } from "react";
import HoverControls from "./Controller/HoverControls";
import { VideoContainerRefContext, VideoRefContext } from "./StreamingPage";
import useFullscreen from "@/Hooks/useFullscreen";

export default function VideoDisplay() {
  const {
    resolution,
    isBuffering,
    isPlaying,
    setIsPlaying,
    setDuration,
    setTimestamp,
    setIsBuffering,
    volume,
    timestamp,
  } = useStreamer();

  const videoUrl = `${STREAMER_SERVER}/${resolution}`;
  const [hoverVideo, setHoverVideo] = useState(false);
  const videoRef = useContext(VideoRefContext);
  const videoContainerRef = useContext(VideoContainerRefContext);

  const { isFullscreen, changeFullscreenState } =
    useFullscreen(videoContainerRef);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.seekTo(timestamp);
    }
  }, [resolution]);

  return (
    <div
      className="video-container"
      style={isFullscreen ? { height: "100%" } : undefined}
      onMouseEnter={() => setHoverVideo(true)}
      onMouseLeave={() => setHoverVideo(false)}
      onDoubleClick={changeFullscreenState}
      onClick={() => setIsPlaying(!isPlaying)}
    >
      <HoverControls scale="1.5" hover={hoverVideo} />

      {isBuffering && <CircularProgress className="video-loading" />}
      <div
        style={isFullscreen ? { height: "100%" } : undefined}
        className={`react-player ${
          (isBuffering || (hoverVideo && !isFullscreen)) &&
          "react-player-overlay"
        }`}
      >
        <ReactPlayer
          width="100%"
          height="100%"
          ref={videoRef}
          playing={isPlaying}
          url={videoUrl}
          progressInterval={1}
          onDuration={(newDuration) => setDuration(newDuration)}
          onProgress={(state) => setTimestamp(state.playedSeconds)}
          onBuffer={() => setIsBuffering(true)}
          onBufferEnd={() => setIsBuffering(false)}
          loop
          volume={volume}
          onSeek={(newTimestamp) => setTimestamp(newTimestamp)}
        />
      </div>
    </div>
  );
}
