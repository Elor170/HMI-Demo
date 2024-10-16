import "./StreamingPage.scss";
import VideoController from "./Controller/VideoController";
import VideoDisplay from "./VideoDisplay";
import StreamPerformanceLogger from "./Logger/StreamPerformanceLogger";
import { Backdrop, IconButton } from "@mui/material";
import React, { createContext, useRef, useState } from "react";
import StreamLogsPage from "./Logger/StreamLogsPage";
import DescriptionIcon from "@mui/icons-material/Description";
import ReactPlayer from "react-player";
import { darkTheme } from "@/Helper/consts";
import { useUnmount } from "@/Hooks/mountHooks";
import useStreamer from "@/Store/StreamerStore";

export const VideoRefContext = createContext<React.RefObject<ReactPlayer>>({
  current: null,
});

export const VideoContainerRefContext = createContext<
  React.RefObject<HTMLDivElement>
>({
  current: null,
});

export default function StreamingPage() {
  const [openLogger, setOpenLogger] = useState(false);
  const videoRef = useRef<ReactPlayer>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const { resetStore } = useStreamer();

  useUnmount(() => resetStore());

  return (
    <div>
      <Backdrop
        open={openLogger}
        onClick={() => setOpenLogger(false)}
        sx={{ zIndex: 100 }}
      >
        {openLogger && <StreamLogsPage />}
      </Backdrop>

      <IconButton
        onClick={() => setOpenLogger(!openLogger)}
        sx={{
          backgroundColor: darkTheme.palette.primary.dark,
          position: "fixed",
          right: 0,
          bottom: 0,
          margin: "1rem",
        }}
      >
        <DescriptionIcon />
      </IconButton>
      <VideoContainerRefContext.Provider value={videoContainerRef}>
        <div className="streamer" ref={videoContainerRef}>
          <VideoRefContext.Provider value={videoRef}>
            <VideoDisplay />
            <VideoController />
            <StreamPerformanceLogger />
          </VideoRefContext.Provider>
        </div>
      </VideoContainerRefContext.Provider>
    </div>
  );
}
