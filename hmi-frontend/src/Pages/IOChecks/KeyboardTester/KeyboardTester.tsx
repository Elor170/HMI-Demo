import Keyboard from './Keyboard';
import { englishLowerCase, englishUpperCase, hebrewLayout } from './Keyboard/KeyboardLayouts';
import styles from './KeyboardTester.module.scss';

export default function KeyboardTester() {

    return (
        <div className={styles.keyboardTester}>
            <Keyboard layout={englishLowerCase} keyboardRegex={/^[a-z]+$/}/>
            <Keyboard layout={englishUpperCase} keyboardRegex={/^[A-Z]+$/}/>
            <Keyboard layout={hebrewLayout} keyboardRegex={/^[\u0590-\u05FF]+$/}/>
        </div>
    )
}

// ת ,
// ץ .
// . /
// ף ;
// , '
// ] [
// [ ]
// / q
// ' w