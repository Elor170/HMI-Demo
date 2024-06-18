import styles from './MouseView.module.scss';
import { Navigation as ScrollArrow } from '@mui/icons-material';
import { ButtonCheckList } from '../MouseTester';

interface Props {
  buttonsStatus: ButtonCheckList
}

export default function MouseView ({ buttonsStatus }: Props) {
  const { rightClicked, leftClicked, scrollClicked, scrollUp, scrollDown } = buttonsStatus;

  return (
    <div className={styles.mouse_container}>
      <div className={styles.mouse}>
          <div className={styles.mouseBody}>
              <div className={`${styles.mouseButton} ${styles.left} ${leftClicked ? styles.clicked: styles.notClicked}`}></div>
              <div className={`${styles.mouseButton} ${styles.right} ${rightClicked ? styles.clicked: styles.notClicked}`}></div>
              <div className={`${styles.mouseWheel} ${scrollClicked ? styles.clicked: styles.notClicked}`}></div>
          </div>
      </div>

      <div className={styles.scrollArrow_container}>
          <ScrollArrow className={`${styles.scrollArrow} ${scrollUp ? styles.scrolled: styles.notScrolled}`} />
          <ScrollArrow className={`${styles.scrollArrow} ${styles.scrollArrow_down} ${scrollDown ? styles.scrolled: styles.notScrolled}`} />
      </div>
    </div>
  );
}
