import { useEffect, useRef, useState } from 'react';
import { getWaterfallData, initCanvas, addEventListenerToCanvas, removeEventListenerToCanvas, formatInterval } from './WaterfallLogic';
import { sendingIntervalValues } from 'hmi-helper/src/vars';
import IntervalSelector from './IntervalSelector';
import CircularProgress from '@mui/material/CircularProgress';
import styles from './WaterfallPage.module.scss';

export default function WaterfallPage() {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);
  const [currentInterval, setCurrentInterval] = useState<SendingInterval | null>(null);
  const [scrollPosition, setScrollPosition] = useState({ x: 0, y: 0 });

  const handleScroll = () => {
    if (pageRef.current) {
      const {scrollLeft, scrollTop} = pageRef.current;
      setScrollPosition({ x: scrollLeft, y: scrollTop });
    }
  };

  useEffect(() => {
    const page = pageRef.current;
    if (page)
      page.addEventListener("scroll", handleScroll);

    getWaterfallData()
    .then(async data => {
      setIsLoaded(true);

      await initCanvas(canvasRef.current, data);
      await addEventListenerToCanvas(canvasRef.current, (newInterval) => {setCurrentInterval(newInterval)});
    });

    return () => {
      if (page)
        page.removeEventListener("scroll", handleScroll); 
      removeEventListenerToCanvas()
    }
  }, []);
  
  
  return (
    <div className={styles.waterfallPage} ref={pageRef}>
      {
        scrollPosition.y > 0 ?
        <div className={styles.YellowLine}></div> : null
      }
      {isLoaded ? 
      <canvas ref={canvasRef} />:
      <div className={styles.LoadingSpinner}>
        <CircularProgress size={'10vh'} color='success'/>
      </div>
      }

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
    </div>
  )
}
