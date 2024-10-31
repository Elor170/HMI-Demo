import { darkTheme, GAME_SERVER } from "@/Helper/consts";
import styles from "./GamePage.module.scss";
import { Backdrop, IconButton } from "@mui/material";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import { useState } from "react";
import GameLogs from "./GameLogs/GameLogs";

export default function GamePage() {
  const [showLogs, setShowLogs] = useState(false);

  return (
    <div className={styles.container}>
      <Backdrop open={showLogs} onClick={() => setShowLogs(false)}>
        {showLogs && <GameLogs />}
      </Backdrop>
      <IconButton
        onClick={() => setShowLogs(!showLogs)}
        sx={{
          backgroundColor: darkTheme.palette.primary.dark,
        }}
        className={styles.logsBtn}
      >
        <EqualizerIcon />
      </IconButton>
      <iframe className={styles.game} src={GAME_SERVER} />;
    </div>
  );
}
