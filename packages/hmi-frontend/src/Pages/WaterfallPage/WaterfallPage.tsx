import { useEffect, useRef, useState } from "react";
import {
  addEventListenerToCanvas,
  removeEventListenerToCanvas,
  formatInterval,
  getWaterfallData,
  WaterfallQueryParams,
} from "./WaterfallLogic";
import IntervalSelector from "./IntervalSelector";
import styles from "./WaterfallPage.module.scss";
import {
  canvasHeight,
  darkTheme,
  screenHeight,
  sendingIntervalValues,
} from "@/Helper/consts";
import {
  IconButton,
  CircularProgress,
  Backdrop,
  Typography,
} from "@mui/material";
import { Wifi as ConnectionIcon } from "@mui/icons-material";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import WaterfallLogsCard from "./WaterfallLogsCard/WaterfallLogsCard";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { initCanvas } from "./CanvasLogic";

export default function WaterfallPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);
  const [currentInterval, setCurrentInterval] =
    useState<SendingInterval | null>(null);
  const [scrollPosition, setScrollPosition] = useState({ x: 0, y: 0 });
  const [openLogger, setOpenLogger] = useState(false);
  const [queryParams, setQueryParams] = useState<WaterfallQueryParams>({
    time: new Date(),
    type: "older",
  });
  const [isConnected, setIsConnected] = useState(false);

  const handleScroll = () => {
    if (!pageRef.current) return;

    const { scrollLeft, scrollTop } = pageRef.current;
    setScrollPosition({ x: scrollLeft, y: scrollTop });

    const dataArr = data?.dataArr;
    const isOldestData = data?.isOldestData;
    const isNewestData = data?.isNewestData;
    const isScrollTop = scrollTop === 0;
    // 42 is the height of the header
    const isScrollBottom = scrollTop === canvasHeight - screenHeight + 46;
    const firstLineTime = dataArr?.[0]?.sendingTime;
    const lastLineTime = dataArr?.[dataArr?.length - 1]?.sendingTime;

    if (isScrollTop && !isNewestData && firstLineTime)
      setQueryParams({ time: firstLineTime, type: "newer" });
    else if (isScrollBottom && !isOldestData && lastLineTime)
      setQueryParams({ time: lastLineTime, type: "older" });
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["waterfall-data", queryParams],
    queryFn: () => getWaterfallData(queryParams),
    staleTime: Infinity,
    cacheTime: 0,
    refetchOnWindowFocus: false,
    retry: false,
  });

  useEffect(() => {
    if (!data) return;
    const page = pageRef.current;
    if (page) page.addEventListener("scroll", handleScroll);

    initCanvas(canvasRef.current, data.dataArr);
    addEventListenerToCanvas(
      canvasRef.current,
      data.isNewestData,
      (newInterval) => {
        setCurrentInterval(newInterval);
      },
      (isConnected) => {
        setIsConnected(isConnected);
      },
    );

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
    toast.error("Couldn't fetch data");
    return (
      <div className={styles.waterfallPage}>
        <Typography variant="h4">
          Couldn't fetch data. Please try again
        </Typography>
      </div>
    );
  }

  const notAtScreenTop = scrollPosition.y > 0;
  const isNewestData = data?.isNewestData;
  return (
    <div className={styles.waterfallPage} ref={pageRef}>
      {!isNewestData || notAtScreenTop || !isConnected ? (
        <div className={styles.YellowLine}></div>
      ) : null}
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
          right: "3rem",
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

      <div
        className={styles.ConnectionIcon}
        style={{
          backgroundColor: darkTheme.palette.primary.light,
        }}
      >
        <ConnectionIcon
          sx={{
            fill: isConnected
              ? darkTheme.palette.success.dark
              : darkTheme.palette.error.dark,
          }}
        />
      </div>
    </div>
  );
}

// Error: Channel closed by server: 406 (PRECONDITION-FAILED) with message "PRECONDITION_FAILED - delivery acknowledgement on channel 1 timed out. Timeout value used: 1800000 ms. This timeout value can be configured, see consumers doc guide to learn more"
