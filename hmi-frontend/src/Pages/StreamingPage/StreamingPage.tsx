import { STREAMER_SERVER } from "@/Helper/consts";
import { useRef, useState } from "react";
import "./StreamingPage.scss";
import VideoController from "./VideoController";
import ReactPlayer from "react-player";
import { Slider, CircularProgress } from "@mui/material";

export default function StreamingPage() {
  const [resolution, setResolution] = useState<string>("4k");
  const [timeStamp, setTimeStamp] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [duration, setDuration] = useState(0);
  const [isBuffering, setIsBuffering] = useState(true);
  const [volume, setVolume] = useState(1);
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

  const onSliderMove = (_: Event, newTimeStamp: number | number[]) => {
    const ts =
      typeof newTimeStamp === "number" ? newTimeStamp : newTimeStamp[0];
    setTimeStamp(ts);

    if (videoRef.current) {
      videoRef.current.seekTo(ts);
    }
  };

  return (
    <div className="streamer">
      <div className="video-container">
        {isBuffering && <CircularProgress className="video-loading" />}
        <div
          className={`react-player ${
            isBuffering ? "react-player-loading" : ""
          }`}
        >
          <ReactPlayer
            width="100%"
            ref={videoRef}
            playing={isPlaying}
            onStart={onVideoStart}
            url={videoUrl}
            onDuration={(newDuration) => setDuration(newDuration)}
            onProgress={(state) => setTimeStamp(state.playedSeconds)}
            onBuffer={() => setIsBuffering(true)}
            onBufferEnd={() => setIsBuffering(false)}
            loop
            volume={volume}
          />
        </div>
      </div>

      <Slider
        value={timeStamp}
        max={duration}
        min={0}
        onChange={onSliderMove}
      />

      <VideoController
        videoRef={videoRef}
        setResolution={handleResolutionChange}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        volume={volume}
        setVolume={setVolume}
      />

      <span style={{ userSelect: "none" }}>
        Current resolution: {resolution}
      </span>
    </div>
  );
}
