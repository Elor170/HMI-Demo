import useStreamer from "@/Store/StreamerStore";
import { Slider } from "@mui/material";
import { useContext } from "react";
import { VideoRefContext } from "../StreamingPage";

export default function VideoTimestampSlider() {
  const { timestamp, setTimestamp, duration, play } = useStreamer();
  const videoRef = useContext(VideoRefContext);

  const onSliderMove = (_: Event, newTimeStamp: number | number[]) => {
    const ts =
      typeof newTimeStamp === "number" ? newTimeStamp : newTimeStamp[0];
    setTimestamp(ts);

    if (videoRef.current) {
      videoRef.current.seekTo(ts);
      play();
    }
  };

  return (
    <Slider value={timestamp} max={duration} min={0} onChange={onSliderMove} />
  );
}
