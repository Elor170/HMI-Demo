import useStreamer from "@/Store/StreamerStore";
import { videoRef } from "../streamerHelper";
import { Slider } from "@mui/material";

export default function VideoTimestampSlider() {
  const { timestamp, setTimestamp, duration, play } = useStreamer();

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
