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
import { useInfiniteQuery } from "react-query";
import ky from "ky";
import { toast } from "react-toastify";

export default function WaterfallPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);
  const [currentInterval, setCurrentInterval] =
    useState<SendingInterval | null>(null);
  const [scrollPosition, setScrollPosition] = useState({ x: 0, y: 0 });
  const [openLogger, setOpenLogger] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const handleScroll = () => {
    if (pageRef.current) {
      const { scrollLeft, scrollTop } = pageRef.current;
      setScrollPosition({ x: scrollLeft, y: scrollTop });
      if (scrollTop === 0){
        console.log("up");
        if (currentPage > 0)
          setCurrentPage(currentPage - 1);
      }
      else if (scrollTop === canvasHeight - screenHeight + 42){
        // 42 is the height of the header
        console.log("down");
        console.log(hasNextPage);
        if (hasNextPage)
          fetchNextPage().then(() => setCurrentPage(currentPage + 1));
      }
    }
  };


  const fetchProjects = async ({ pageParam =  new Date().toString() }) => {
    
    const res = await ky
    .get<WaterfallObject[]>("older-waterfall-data", {
      searchParams: {
        time: pageParam,
      },
      prefixUrl: WATERFALL_BACKEND_URL,
    })
    .json();
    
    res.reverse();
    return res;
  } 


  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useInfiniteQuery('waterfall-data', fetchProjects, {
    getNextPageParam: (lastPage) => {
      if(lastPage.length < canvasHeight)
        return null;
      
      return new Date(lastPage[lastPage.length - 1].sendingTime);
    }
  })

  
  
  useEffect(() => {
    if (!data) return;
    const page = pageRef.current;
    if (page) page.addEventListener("scroll", handleScroll);

    initCanvas(canvasRef.current, data.pages[currentPage]);
    if (currentPage === 0) {
      addEventListenerToCanvas(canvasRef.current, (newInterval) => {
        setCurrentInterval(newInterval);
      });
    }

    return () => {
      if (page) page.removeEventListener("scroll", handleScroll);
      if (currentPage === 0)
        removeEventListenerToCanvas();
    };
  }, [data, currentPage]);

  if (isFetching) {
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
      {(scrollPosition.y > 0) || currentPage !== 0 ? <div className={styles.YellowLine}></div> : null}
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
