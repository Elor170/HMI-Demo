import { useEffect, useState } from 'react';
import styles from './Keyboard.module.scss';
import { KeyboardLayout, layoutToInitState, KeyboardKey, specialKeysCodes } from './KeyboardLayouts';
import KeyboardSection from './KeyboardSection';
import LinearWithValueLabel from './LinearWithValueLabel';

interface KeyboardProps {
  layout: KeyboardLayout;
  isVisible: boolean;
}

export default function Keyboard ({layout, isVisible}: KeyboardProps) {
  const [keyboardStatus, setkeyboardStatus] = useState(layoutToInitState(layout));
  const [keyboardPercentage, setKeyboardPercentage] = useState<number>(0);
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
    
    if (isVisible)
      setKeyStatus(event.code);
  }

  const resetTest = () => setkeyboardStatus(layoutToInitState(layout));

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  }, [keyboardStatus, isVisible]);

  useEffect(()=> {
    const keyboardStatusVals = Object.values(keyboardStatus);
    const countTrue = keyboardStatusVals.filter(keyStatus => keyStatus).length;
    const truePercentage = countTrue / keyboardStatusVals.length;
    const formatedPercentage = Number.parseFloat((truePercentage * 100).toFixed(2));

    setKeyboardPercentage(formatedPercentage);
  }, [keyboardStatus]);


  return (
    <div className={styles.keyboard_container}>
      <div className={styles.keyboard} style={{display: isVisible ? 'flex' : 'none'}}>
        <LinearWithValueLabel value={keyboardPercentage}/>
        <button className={styles.resetButton} onClick={resetTest}>Reset Test</button>

        <KeyboardSection layout={layout} keyboardStatus={keyboardStatus} section='leftSection'/>
        <KeyboardSection layout={layout} keyboardStatus={keyboardStatus} section='middleSection'/>
        <KeyboardSection layout={layout} keyboardStatus={keyboardStatus} section='rightSection'/>
      </div>
    </div>
  );
};
