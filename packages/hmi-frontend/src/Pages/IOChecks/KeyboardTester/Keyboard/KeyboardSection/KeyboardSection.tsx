import styles from "./KeyboardSection.module.scss";
import {
  KeyboardKey,
  KeyboardLayout,
  KeyboardSectionName,
  KeyboardState,
} from "../KeyboardLayouts";

interface KeyboardSectionProps {
  layout: KeyboardLayout;
  section: KeyboardSectionName;
  keyboardStatus: KeyboardState;
}

export default function KeyboardSection({
  layout,
  section,
  keyboardStatus,
}: KeyboardSectionProps) {
  return (
    <div
      className={`${styles.keyboard_section} ${styles["keyboard_" + section]}`}
    >
      {layout[section].map((keyboardLine: KeyboardKey[], index1: number) => (
        <div className={styles.keyboard_line} key={index1}>
          {keyboardLine.map(({ code, view }: KeyboardKey, index2: number) => (
            <KeyView
              view={view ?? code}
              key={index2}
              section={section}
              status={keyboardStatus[code]}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

interface KeyViewProps {
  view: string;
  status: boolean;
  section: KeyboardSectionName;
}

function KeyView({ view, section, status }: KeyViewProps) {
  return (
    <div
      className={`${styles.keyboard_key} ${status ? styles.keyboard_key_clicked : styles.keyboard_key_notClicked}`}
      style={{
        maxWidth: view.length <= 3 && section != "middleSection" ? "2.5vw" : "",
        fontSize: view.length <= 3 ? "1vw" : "0.75vw",
      }}
    >
      {view}
    </div>
  );
}
