import { useEffect, useRef, useState } from 'react';
import styles from './Keyboard.module.scss';
import { KeyboardLayout, layoutToInitState } from './KeyboardLayouts';
import KeyboardSection from './KeyboardSection';

interface KeyboardProps {
  layout: KeyboardLayout;
  keyboardRegex: RegExp;
}

export default function Keyboard ({layout, keyboardRegex}: KeyboardProps) {
  const [keyboardStatus, setkeyboardStatus] = useState(layoutToInitState(layout));
  
  const setKeyStatus = (key: string) => {
    const newKeyboardStatus = structuredClone(keyboardStatus);
    
    newKeyboardStatus[key] = true;
    setkeyboardStatus(newKeyboardStatus);
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    event.preventDefault();
    const { key, code } = event;
    console.log(keyboardRegex.test(key));
    
    console.log({key, code});
    if(code.startsWith('Key') && !keyboardRegex.test(key))
      return;

    setKeyStatus(event.code)
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  }, [keyboardStatus])


  return (
    <div className={styles.keyboard}>
      <KeyboardSection layout={layout} keyboardStatus={keyboardStatus} section='leftSection'/>
      <KeyboardSection layout={layout} keyboardStatus={keyboardStatus} section='middleSection'/>
      <KeyboardSection layout={layout} keyboardStatus={keyboardStatus} section='rightSection'/>
    </div>
  );
};
