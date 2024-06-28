import { useEffect, useState } from 'react';
import styles from './Keyboard.module.scss';
import { KeyboardLayout, layoutToInitState, KeyboardKey, specialKeysCodes } from './KeyboardLayouts';
import KeyboardSection from './KeyboardSection';

interface KeyboardProps {
  layout: KeyboardLayout;
}

export default function Keyboard ({layout}: KeyboardProps) {
  const [keyboardStatus, setkeyboardStatus] = useState(layoutToInitState(layout));
  const flatLayout = [...layout.leftSection.flat(), ...layout.middleSection.flat(), ...layout.rightSection.flat()];
  
  const setKeyStatus = (key: string) => {
    const newKeyboardStatus = structuredClone(keyboardStatus);
    
    newKeyboardStatus[key] = true;
    setkeyboardStatus(newKeyboardStatus);
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    event.preventDefault();
    const { key, code } = event;

    if(code.startsWith('Key') || specialKeysCodes.includes(code)){
      const keyObject = flatLayout.find((keyObject: KeyboardKey) => keyObject.code === code);
      
      if (keyObject && "view" in keyObject)
        if (key !== keyObject.view) 
          return;
    }

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
