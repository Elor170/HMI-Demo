import { useEffect, useState } from "react";
import styles from "./Keyboard.module.scss";
import {
  KeyboardLayout,
  layoutToInitState,
  KeyboardKey,
  specialKeysCodes,
  KeyboardState,
} from "./KeyboardLayouts";
import KeyboardSection from "./KeyboardSection";
import LinearWithValue from "./LinearWithValue";

interface KeyboardProps {
  layout: KeyboardLayout;
  isVisible: boolean;
}

let keyboardPercentage: number = 0;
const calcPercentage = (keyboardStatus: KeyboardState): number => {
  const keyboardStatusVals = Object.values(keyboardStatus);
  const countTrue = keyboardStatusVals.filter((keyStatus) => keyStatus).length;
  const truePercentage = countTrue / keyboardStatusVals.length;
  return Number.parseFloat((truePercentage * 100).toFixed(2));
};

export default function Keyboard({ layout, isVisible }: KeyboardProps) {
  const [keyboardStatus, setkeyboardStatus] = useState(
    layoutToInitState(layout),
  );
  keyboardPercentage = calcPercentage(keyboardStatus);
  const flatLayout = [
    ...layout.leftSection.flat(),
    ...layout.middleSection.flat(),
    ...layout.rightSection.flat(),
  ];

  const setKeyStatus = (key: string) => {
    const newKeyboardStatus = structuredClone(keyboardStatus);

    newKeyboardStatus[key] = true;
    setkeyboardStatus(newKeyboardStatus);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    event.preventDefault();
    const { key, code } = event;

    if (code.startsWith("Key") || specialKeysCodes.includes(code)) {
      const keyObject = flatLayout.find(
        (keyObject: KeyboardKey) => keyObject.code === code,
      );

      if (keyObject && "view" in keyObject) if (key !== keyObject.view) return;
    }

    if (isVisible) setKeyStatus(event.code);
  };

  const resetTest = () => setkeyboardStatus(layoutToInitState(layout));

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [keyboardStatus, isVisible]);

  return (
    <div className={styles.keyboard_container}>
      <div
        className={styles.keyboard}
        style={{ display: isVisible ? "flex" : "none" }}
      >
        <LinearWithValue value={keyboardPercentage} />
        <button className={styles.resetButton} onClick={resetTest}>
          Reset Test
        </button>

        <KeyboardSection
          layout={layout}
          keyboardStatus={keyboardStatus}
          section="leftSection"
        />
        <KeyboardSection
          layout={layout}
          keyboardStatus={keyboardStatus}
          section="middleSection"
        />
        <KeyboardSection
          layout={layout}
          keyboardStatus={keyboardStatus}
          section="rightSection"
        />
      </div>
    </div>
  );
}
