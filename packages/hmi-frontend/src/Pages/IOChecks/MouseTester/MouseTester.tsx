import React from "react";
import { useEffect, useRef, useState } from "react";
import styles from "./MouseTester.module.scss";
import MouseView from "./MouseView";
import { CheckBox, CheckBoxOutlineBlank } from "@mui/icons-material";

export interface ButtonCheckList {
  rightClicked: boolean;
  leftClicked: boolean;
  scrollClicked: boolean;
  scrollUp: boolean;
  scrollDown: boolean;
}

const initialCheckList: ButtonCheckList = {
  rightClicked: false,
  leftClicked: false,
  scrollClicked: false,
  scrollUp: false,
  scrollDown: false,
};

const formatKeyName = (key: string) => {
  const viewName = key[0].toUpperCase() + key.substring(1);
  return viewName.replace(/([a-z])([A-Z])/g, "$1 $2");
};

export default function MouseTester() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [prevScrollPos, setPrevScrollPos] = useState<number>(0);
  const [checkList, setChecksList] =
    useState<ButtonCheckList>(initialCheckList);

  const setChecksListElement = (buttonEvent: keyof ButtonCheckList) => {
    const copyOfCheckList = structuredClone(checkList);
    copyOfCheckList[buttonEvent] = true;
    setChecksList(copyOfCheckList);
  };

  const handleScroll = () => {
    if (containerRef.current) {
      const currentScrollPos: number = containerRef.current.scrollTop;
      const scrollEvent: keyof ButtonCheckList =
        prevScrollPos > currentScrollPos ? "scrollUp" : "scrollDown";
      setPrevScrollPos(currentScrollPos);
      setChecksListElement(scrollEvent);
    }
  };

  const handleClick = (event: MouseEvent) => {
    let clickEvent: keyof ButtonCheckList | undefined;

    switch (event.button) {
      case 0:
        clickEvent = "leftClicked";
        break;
      case 1:
        clickEvent = "scrollClicked";
        event.preventDefault();
        break;
      case 2:
        clickEvent = "rightClicked";
        break;
    }

    if (clickEvent) setChecksListElement(clickEvent);
  };

  const handleReset = () => setChecksList(initialCheckList);
  const handleContextMenu = (event: React.MouseEvent) => event.preventDefault();

  useEffect(() => {
    const scrollContainer = containerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
      scrollContainer.addEventListener("mousedown", handleClick);
      return () => {
        scrollContainer.removeEventListener("scroll", handleScroll);
        scrollContainer.removeEventListener("mousedown", handleClick);
      };
    }
  }, [prevScrollPos, checkList]);

  return (
    <div
      className={styles.mouseTester_container}
      ref={containerRef}
      onContextMenu={handleContextMenu}
    >
      <div className={styles.mouseTester_scrollArea}>
        <div className={styles.mouseTester}>
          <MouseView buttonsStatus={checkList} />

          {Object.keys(checkList).map((key: string) => {
            const checkStatus = checkList[key as keyof ButtonCheckList];

            return (
              <div className={styles.mouseTester_item} key={key}>
                <span>{formatKeyName(key)}</span>
                {checkStatus ? (
                  <CheckBox className={styles.checkBoxIcon} />
                ) : (
                  <CheckBoxOutlineBlank className={styles.checkBoxIcon} />
                )}
              </div>
            );
          })}

          <button className={styles.resetButton} onClick={handleReset}>
            Reset Test
          </button>
        </div>
      </div>
    </div>
  );
}
