import { useMemo, useState } from "react";
import styles from "./HomePage.module.scss";
import { STREAMER_SERVER } from "@/Helper/consts";

export default function HomePage() {
  const [titleClickCounter, setTitleClickCounter] = useState(0);
  const [clicksCounter, setClicksCounter] = useState(0);

  const showFunny = useMemo(
    () => titleClickCounter > 0 && clicksCounter >= 10,
    [titleClickCounter, clicksCounter],
  );

  return (
    <div className={styles.container}>
      <h1 onClick={() => setTitleClickCounter(titleClickCounter + 1)}>
        HMI Demo App
      </h1>
      <p onClick={() => setClicksCounter(clicksCounter + 1)}>
        Please select a route from the top app bar
      </p>

      {showFunny && (
        <iframe className={styles.funny} src={`${STREAMER_SERVER}/lol`} />
      )}
    </div>
  );
}
