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
              <div className={styles.keyboard_key} key={index2} 
              style={{ maxWidth: (keyView.length <= 3 && section != 'middleSection') ? '2.5vw': '',
                backgroundColor: keyboardStatus[code] ? 'rgb(65, 133, 110)' : 'red'
              }}>
                {keyView}
              </div>)
            })}
          </div>
        )}
      </div>
  );
}
