import React from 'react';
import { useEffect, useRef, useState } from 'react';
import styles from './MouseTester.module.scss';
import MouseView from './MouseView';
import { CheckBox, CheckBoxOutlineBlank } from '@mui/icons-material';

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

export default function MouseTester() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [prevScrollPos, _setPrevScrollPos] = useState<number>(0);
  const prevScrollPosRef = React.useRef(prevScrollPos);
  const [checkList, _setChecksList] = useState<ButtonCheckList>(initialCheckList);
  const checkListRef = React.useRef(checkList);

  const setChecksList = (newList: ButtonCheckList) => {
    checkListRef.current = newList;
    _setChecksList(newList);
  }

  const setChecksListElement = (buttonEvent: keyof ButtonCheckList) => {
    const copyOfCheckList  = structuredClone(checkListRef.current);
    copyOfCheckList[buttonEvent] = true;
    checkListRef.current = copyOfCheckList;
    _setChecksList(copyOfCheckList);
  }

  const setPrevScrollPos = (data: number) => {
    prevScrollPosRef.current = data
    _setPrevScrollPos(data);
  }

  const handleScroll = () => {
    if (containerRef.current) {
      const currentScrollPos: number = containerRef.current.scrollTop;
      const scrollEvent: keyof ButtonCheckList = prevScrollPosRef.current > currentScrollPos ? 'scrollUp' : 'scrollDown';
      setPrevScrollPos(currentScrollPos);
      setChecksListElement(scrollEvent)
    }
  }

  const handleClick = (event: MouseEvent) => {
    let clickEvent: keyof ButtonCheckList | undefined;

    switch (event.button) {
      case 0:
        clickEvent = 'leftClicked';
        break;
      case 1:
        clickEvent = 'scrollClicked';
        event.preventDefault();
        break;
      case 2:
        clickEvent = 'rightClicked';
        break;
    
      default:
        break;
    }

    if (clickEvent)
      setChecksListElement(clickEvent)
  };

  const handleReset = () => setChecksList(initialCheckList);
  const handleContextMenu = (event: React.MouseEvent) => event.preventDefault();

  useEffect(() => {
      const scrollContainer = containerRef.current;
      if (scrollContainer) { 
        scrollContainer.addEventListener('scroll', handleScroll);
        scrollContainer.addEventListener('mousedown', handleClick);
      return () => {
        scrollContainer.removeEventListener('scroll', handleScroll);
        scrollContainer.removeEventListener('mousedown', handleClick);
      };
    }

  }, []);
  
  return (
    <div className={styles.mouseTester_container} ref={containerRef} onContextMenu={handleContextMenu}>
      <div className={styles.mouseTester_scrollArea}>
        <div className={styles.mouseTester} >
          <MouseView buttonsStatus={checkList}/>

          {Object.keys(checkList).map((key: string) => {    
            let checkTest = key[0].toUpperCase() + key.substring(1);
            checkTest = checkTest.replace(/([a-z])([A-Z])/g, '$1 $2');

            const checkStatus = checkList[key as keyof ButtonCheckList];

            return <div className={styles.mouseTester_item} key={key}>
              <span>{checkTest}</span>
              {(checkStatus ? <CheckBox className={styles.checkBoxIcon}/> : <CheckBoxOutlineBlank className={styles.checkBoxIcon}/>)}
            </div>
            })
          }
          
          <button className={styles.resetButton} onClick={handleReset}>Reset Test</button>
        </div>
      </div>
    </div>
  )
}
