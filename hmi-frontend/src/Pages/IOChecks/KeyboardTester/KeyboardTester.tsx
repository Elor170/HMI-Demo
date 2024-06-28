import Keyboard from './Keyboard';
import { englishLowerCase, englishUpperCase, hebrewLayout } from './Keyboard/KeyboardLayouts';
import styles from './KeyboardTester.module.scss';

export default function KeyboardTester() {

    return (
        <div className={styles.keyboardTester}>
            <Keyboard layout={englishLowerCase} />
            <Keyboard layout={englishUpperCase} />
            <Keyboard layout={hebrewLayout} />
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