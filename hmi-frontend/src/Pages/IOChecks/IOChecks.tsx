import MouseTester from './MouseTester';
import styles from './IOChecks.module.scss';


export default function IOChecks() {

  return (
    <div className={styles.ioChecks}>
      <MouseTester />
    </div>
  )
}
