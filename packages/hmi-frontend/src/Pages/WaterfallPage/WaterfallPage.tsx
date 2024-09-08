import { useEffect, useRef, useState } from 'react';
import { getWaterfallData, initCanvas, addEventListenerToCanvas, removeEventListenerToCanvas } from './WaterfallLogic';
import styles from './WaterfallPage.module.scss';


export default function WaterfallPage() {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    getWaterfallData()
    .then(async data => {
      setIsLoaded(true);

      await initCanvas(canvasRef.current, data);
      await addEventListenerToCanvas(canvasRef.current);
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
    </div>
  )
}
