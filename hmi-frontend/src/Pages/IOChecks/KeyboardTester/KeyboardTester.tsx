import Keyboard from './Keyboard';
import { englishLowerCase, englishUpperCase, hebrewLayout } from './Keyboard/KeyboardLayouts';
import styles from './KeyboardTester.module.scss';

export default function KeyboardTester() {

    return (
        <div className={styles.keyboardTester}>
            <Keyboard layout={englishLowerCase} keyboardName='En-Lower' />
            <Keyboard layout={englishUpperCase} keyboardName='En-Upper' />
            <Keyboard layout={hebrewLayout} keyboardName='Hebrew' />
        </div>
    )
}
