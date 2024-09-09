import { useEffect, useRef, useState } from 'react';
import { getWaterfallData, initCanvas, addEventListenerToCanvas, removeEventListenerToCanvas, formatInterval } from './WaterfallLogic';
import { sendingIntervalValues } from 'hmi-helper/src/vars';
import IntervalSelector from './IntervalSelector';
import styles from './WaterfallPage.module.scss';

export default function WaterfallPage() {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentInterval, setCurrentInterval] = useState<SendingInterval | null>(null);

  useEffect(() => {
    getWaterfallData()
    .then(async data => {
      setIsLoaded(true);

      await initCanvas(canvasRef.current, data);
      await addEventListenerToCanvas(canvasRef.current, (newInterval) => {setCurrentInterval(newInterval)});
    });

    return () => {
      removeEventListenerToCanvas()
    }
  }, []);
  
  
  return (
    <div className={styles.waterfallPage}>
      {isLoaded ? 
      <canvas ref={canvasRef} />:
      <div>Loading...</div>
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
