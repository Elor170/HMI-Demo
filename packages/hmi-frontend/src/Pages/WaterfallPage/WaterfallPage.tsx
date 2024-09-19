import { useEffect, useRef, useState } from "react";
import {
  initCanvas,
  addEventListenerToCanvas,
  removeEventListenerToCanvas,
  formatInterval,
} from "./WaterfallLogic";
import { sendingIntervalValues } from "hmi-helper/src/vars";
import IntervalSelector from "./IntervalSelector";
import styles from "./WaterfallPage.module.scss";
import {
  canvasHeight,
  darkTheme,
  screenHeight,
  WATERFALL_BACKEND_URL,
} from "@/Helper/consts";
import {
  IconButton,
  CircularProgress,
  Backdrop,
  Typography,
} from "@mui/material";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import WaterfallLogsCard from "./WaterfallLogsCard/WaterfallLogsCard";
import { useQuery } from "react-query";
import ky from "ky";
import { toast } from "react-toastify";

export default function WaterfallPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);
  const [currentInterval, setCurrentInterval] =
    useState<SendingInterval | null>(null);
  const [scrollPosition, setScrollPosition] = useState({ x: 0, y: 0 });
  const [openLogger, setOpenLogger] = useState(false);

  const handleScroll = () => {
    if (pageRef.current) {
      const { scrollLeft, scrollTop } = pageRef.current;
      setScrollPosition({ x: scrollLeft, y: scrollTop });
      if (scrollTop === 0) console.log("up");
      else if (scrollTop === canvasHeight - screenHeight + 42)
        // 42 is the height of the header
        console.log("down");
    }
  };

  const { data, error, isLoading } = useQuery("waterfall-logs", () =>
    ky
      .get<WaterfallObject[]>("older-waterfall-data", {
        searchParams: {
          time: new Date().toString(),
        },
        prefixUrl: WATERFALL_BACKEND_URL,
      })
      .json()
  );

  useEffect(() => {
    if (!data) return;
    const page = pageRef.current;
    if (page) page.addEventListener("scroll", handleScroll);

    console.log("bruh");
    initCanvas(canvasRef.current, data.reverse());
    addEventListenerToCanvas(canvasRef.current, (newInterval) => {
      setCurrentInterval(newInterval);
    });

    return () => {
      if (page) page.removeEventListener("scroll", handleScroll);
      removeEventListenerToCanvas();
    };
  }, [data]);

  if (isLoading) {
    return (
      <div className={styles.waterfallPage}>
        <div className={styles.LoadingSpinner}>
          <CircularProgress size="10vh" color="success" />
        </div>
      </div>
    );
  }

  if (error) {
    toast.error("Couldn't fetch previous logs");
    return (
      <div className={styles.waterfallPage}>
        <Typography variant="h4">
          Couldn't fetch previous logs. Please try again
        </Typography>
      </div>
    );
  }

  return (
    <div className={styles.waterfallPage} ref={pageRef}>
      {scrollPosition.y > 0 ? <div className={styles.YellowLine}></div> : null}
      <canvas ref={canvasRef} />

      <div className={styles.currentInterval}>
        Current Interval:
        <br />
        {formatInterval(currentInterval as SendingInterval)}
      </div>

      <div className={styles.IntervalSelector_container}>
        <IntervalSelector
          values={[...sendingIntervalValues]} // Specific values
          defaultValue={1000}
          label="Sending Interval"
        />
      </div>

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
        <EqualizerIcon />
      </IconButton>

      <Backdrop
        open={openLogger}
        onClick={() => setOpenLogger(false)}
        sx={{ zIndex: 100 }}
      >
        {openLogger && <WaterfallLogsCard />}
      </Backdrop>
    </div>
  );
}
