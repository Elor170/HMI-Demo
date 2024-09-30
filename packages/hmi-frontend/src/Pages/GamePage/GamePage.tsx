import { GAME_SERVER } from "@/Helper/consts";
import styles from "./GamePage.module.scss";

export default function GamePage() {
  return <iframe className={styles.gamePageContainer} src={GAME_SERVER} />;
}
