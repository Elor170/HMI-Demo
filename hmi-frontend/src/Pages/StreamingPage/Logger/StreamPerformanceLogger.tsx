import useStreamer from "@/Store/StreamerStore";
import { useEffect, useState } from "react";
import ky from "ky";
import { STREAMER_SERVER } from "@/Helper/consts";

interface LoggerData {
  bufferTimeMS: number;
  resolution: string;
  bufferStartStamp: number;
  bufferEndStamp: number;
  bufferStartDate: Date;
  bufferEndDate: Date;
}

export default function StreamPerformanceLogger() {
  const { isBuffering, resolution, timestamp } = useStreamer();

  const [bufferingTimeInMs, setBufferingTime] = useState(0);
  const [bufferStartDate, setBufferStartDate] = useState(new Date());
  const [bufferStartStamp, setBufferStartStamp] = useState(0);

  const logBufferData = async () => {
    const bufferLogs: LoggerData = {
      bufferTimeMS: bufferingTimeInMs,
      resolution,
      bufferStartStamp,
      bufferEndStamp: timestamp,
      bufferStartDate,
      bufferEndDate: new Date(),
    };

    const response = await ky.post(`${STREAMER_SERVER}/logs/add`, {
      json: bufferLogs,
    });

    if (response.status !== 200) {
      console.error("Something went wrong while logging buffer...");
    }

    setBufferingTime(0);
    setBufferStartDate(new Date());
    setBufferStartStamp(0);
  };

  useEffect(() => {
    if (isBuffering) {
      setBufferStartDate(new Date());
      setBufferStartStamp(timestamp);

      const interval = setInterval(() => {
        if (!isBuffering) {
          logBufferData();
          clearInterval(interval);
        }

        setBufferingTime(bufferingTimeInMs + 1);
      }, 100);
    }
  }, [isBuffering]);

  return null;
}
