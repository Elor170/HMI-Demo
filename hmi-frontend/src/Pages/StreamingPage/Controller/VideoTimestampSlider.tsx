import useStreamer from "@/Store/streamerStore";
import { Slider } from "@mui/material";
import { videoRef } from "../streamerHelper";

export default function VideoTimestampSlider() {
  const { timestamp, setTimestamp, duration } = useStreamer();

  const onSliderMove = (_: Event, newTimeStamp: number | number[]) => {
    const ts =
      typeof newTimeStamp === "number" ? newTimeStamp : newTimeStamp[0];
    setTimestamp(ts);

    if (videoRef.current) {
      videoRef.current.seekTo(ts);
    }
  };

  return (
    <Slider value={timestamp} max={duration} min={0} onChange={onSliderMove} />
  );
}
