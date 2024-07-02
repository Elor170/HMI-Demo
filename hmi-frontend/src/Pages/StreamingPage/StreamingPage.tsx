import "./StreamingPage.scss";
import VideoController from "./Controller/VideoController";
import VideoDisplay from "./VideoDisplay";
import StreamPerformanceLogger from "./Logger/StreamPerformanceLogger";
import { Backdrop } from "@mui/material";
import { useState } from "react";
import StreamLogsPage from "./Logger/StreamLogsPage";

export default function StreamingPage() {
  const [openLogger, setOpenLogger] = useState(false);

  return (
    <div className="streamer">
      <Backdrop open={openLogger} onClick={() => setOpenLogger(false)}>
        {openLogger && <StreamLogsPage />}
      </Backdrop>

      <VideoDisplay />
      <VideoController />
      <button onClick={() => setOpenLogger(!openLogger)}>Show logs</button>
      <StreamPerformanceLogger />
    </div>
  );
}
