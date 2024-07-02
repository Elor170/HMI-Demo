import "./StreamingPage.scss";
import VideoController from "./Controller/VideoController";
import VideoDisplay from "./VideoDisplay";
import StreamPerformanceLogger from "./Logger/StreamPerformanceLogger";
import { Backdrop, IconButton } from "@mui/material";
import { useState } from "react";
import StreamLogsPage from "./Logger/StreamLogsPage";
import DescriptionIcon from "@mui/icons-material/Description";
import { darkTheme } from "@/main";

export default function StreamingPage() {
  const [openLogger, setOpenLogger] = useState(false);

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
          position: "absolute",
          right: 0,
          bottom: 0,
        }}
      >
        <DescriptionIcon />
      </IconButton>
      <div className="streamer">
        <VideoDisplay />
        <VideoController />
        <StreamPerformanceLogger />
      </div>
    </div>
  );
}
