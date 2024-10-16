import MouseTester from "./MouseTester";
import styles from "./IOChecks.module.scss";
import KeyboardTester from "./KeyboardTester";

export default function IOChecks() {
  return (
    <div className={styles.ioChecks}>
      <KeyboardTester />
      <MouseTester />
    </div>
  );
}
