import { useEffect, useState } from "react";
import styles from "./KeyboardShortcuts.module.scss";
import { KeyCode } from "../KeyboardLayouts";
import {
  KeyboardShortcut,
  initShortcutsStatus,
  shortcutsStatus,
} from "./KeyboardShortcutsData";

export default function KeyboardShortcuts() {
  const [shortcutStatus, setShortcutStatus] =
    useState<shortcutsStatus>(initShortcutsStatus);

  const handleShortcut = (shortcut: KeyboardShortcut) =>
    setShortcutStatus({ ...shortcutStatus, [shortcut]: true });

  const handleKeyDown = (event: KeyboardEvent) => {
    event.preventDefault();
    const { ctrlKey, altKey, shiftKey } = event;
    const code: KeyCode = event.code as KeyCode;

    if (ctrlKey) {
      if (code === "KeyC") handleShortcut("Ctrl + C");
      if (code === "KeyV") handleShortcut("Ctrl + V");

      if (shiftKey) {
        if (code === "KeyS") handleShortcut("Ctrl + Shift + S");
        if (code === "ArrowRight") handleShortcut("Ctrl + Shift + >");
      }
    }
    if (shiftKey) {
      if (code === "Tab") handleShortcut("Shift + Tab");
      if (code === "ArrowUp") handleShortcut("Shift + ^");
    }
    if (altKey) {
      if (code === "KeyF") handleShortcut("Alt + F");
      if (code === "KeyE") handleShortcut("Alt + E");
    }
    return false;
  };

  const handleReset = () => setShortcutStatus(initShortcutsStatus);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [shortcutStatus]);

  return (
    <div className={styles.keyboardShortcuts}>
      <div className={styles.keyboardShortcuts_title}>Keyboard Shortcuts</div>

      <div className={styles.shortcutStatus_container}>
        {Object.entries(shortcutStatus).map(
          ([shortcut, status]: [KeyboardShortcut, boolean]) => (
            <span
              className={styles.shortcutStatus}
              key={shortcut}
              style={{
                backgroundColor: status
                  ? "var(--dark-green)"
                  : "var(--dark-red)",
              }}
            >
              {shortcut}
            </span>
          ),
        )}
      </div>
      <button className={styles.resetBtn} onClick={handleReset}>
        Reset Test
      </button>
    </div>
  );
}
