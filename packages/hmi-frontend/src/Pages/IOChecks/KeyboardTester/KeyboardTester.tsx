import { useState } from "react";
import Keyboard from "./Keyboard";
import {
  englishLowerCase,
  englishUpperCase,
  hebrewLayout,
  KeyboardName,
  keyboardNames,
} from "./Keyboard/KeyboardLayouts";
import styles from "./KeyboardTester.module.scss";
import { NavigateNext } from "@mui/icons-material";
import KeyboardShortcuts from "./Keyboard/KeyboardShortcuts";

export default function KeyboardTester() {
  const [selectedKeyboard, setSelectedKeyboard] =
    useState<KeyboardName>("En-Lower");

  const switchKeyboard = () => {
    const selectedIndex = keyboardNames.findIndex(
      (name) => name === selectedKeyboard,
    );
    const newIndex = (selectedIndex + 1) % 3;
    setSelectedKeyboard(keyboardNames[newIndex]);
  };

  return (
    <div className={styles.keyboardTester}>
      <Keyboard
        layout={englishLowerCase}
        isVisible={selectedKeyboard === "En-Lower"}
      />
      <Keyboard
        layout={englishUpperCase}
        isVisible={selectedKeyboard === "En-Upper"}
      />
      <Keyboard
        layout={hebrewLayout}
        isVisible={selectedKeyboard === "Hebrew"}
      />
      <div className={styles.selectedKeyboard}>
        {selectedKeyboard}
        <NavigateNext className={styles.nextButton} onClick={switchKeyboard} />
      </div>
      <KeyboardShortcuts />
    </div>
  );
}
