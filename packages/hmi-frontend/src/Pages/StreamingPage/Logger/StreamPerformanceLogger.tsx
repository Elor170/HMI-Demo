import useStreamer from "@/Store/StreamerStore";
import { useEffect, useState } from "react";
import ky from "ky";
import { STREAMER_LOGGER } from "@/Helper/consts";
import { toast } from "react-toastify";

export default function StreamPerformanceLogger() {
  const { isBuffering, timestamp, resolution } = useStreamer();
  const [checkingBuffer, setCheckingBuffer] = useState(false);
  const [bufferStartDate, setStartTime] = useState(new Date());
  const [bufferTimestamp, setBufferTimestamp] = useState(0);

  useEffect(() => {
    if (!isBuffering && !checkingBuffer) return;
    else if (isBuffering && !checkingBuffer) {
      setCheckingBuffer(true);
      setStartTime(new Date());
      setBufferTimestamp(timestamp);
      return;
    } else if (!isBuffering && checkingBuffer) {
      const logs: StreamLogData = {
        bufferStartDate: bufferStartDate,
        bufferEndDate: new Date(),
        bufferTimestamp,
        resolution,
      };

      const postData = async () => {
        const response = await ky.post(`${STREAMER_LOGGER}/logs/add`, {
          headers: {
            "content-type": "application/json",
          },
          json: logs,
        });

        if (!response.ok) {
          toast.error(`Error while logging buffer: ${response.statusText}`);
        }

        setCheckingBuffer(false);
      };

      postData();
    }
  }, [isBuffering]);

  return null;
}
