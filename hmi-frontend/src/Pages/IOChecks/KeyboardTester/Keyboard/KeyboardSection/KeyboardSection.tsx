import styles from './KeyboardSection.module.scss';
import { KeyboardKey, KeyboardLayout, KeyboardSectionName, KeyboardState } from '../KeyboardLayouts';

export interface KeyboardSectionProps {
    layout: KeyboardLayout;
    section: KeyboardSectionName;
    keyboardStatus: KeyboardState;
}

export default function KeyboardSection ({ layout, section, keyboardStatus }: KeyboardSectionProps) {
  return (
      <div className={`${styles.keyboard_section} ${styles['keyboard_' + section]}`}>
        {layout[section].map((keyboardLine: KeyboardKey[], index1: number) => 
          <div className={styles.keyboard_line} key={index1}>
            {keyboardLine.map(({code, view}: KeyboardKey, index2: number) => {
              const keyView = view ?? code;
              return (
              <div key={index2} 
              className={`${styles.keyboard_key} ${keyboardStatus[code] ? styles.keyboard_key_clicked : styles.keyboard_key_notClicked}`}
              style={{ maxWidth: (keyView.length <= 3 && section != 'middleSection') ? '2.5vw': '',
                      fontSize: (keyView.length <= 3) ? '1vw': '0.75vw'}}>
                {keyView}
              </div>)
            })}
          </div>
        )}
      </div>
  );
}
