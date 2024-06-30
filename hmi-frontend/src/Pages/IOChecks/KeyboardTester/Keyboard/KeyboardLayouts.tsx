export type KeyboardSectionName = 'leftSection' | 'middleSection' | 'rightSection';
export type KeyCode = 
    'Escape'|'F1'|'F2'|'F3'|'F4'|'F5'|'F6'|'F7'|'F8'|'F9'|'F10'|'F11'|'F12'|
    'Backquote'|'Digit1'|'Digit2'|'Digit3'|'Digit4'|'Digit5'|'Digit6'|'Digit7'|'Digit8'|'Digit9'|'Digit0'|'0'|'Minus'|'-'|'Equal'|'Backspace'|
    'Tab'|'KeyQ'|'KeyW'|'KeyE'|'KeyR'|'KeyT'|'KeyY'|'KeyU'|'KeyO'|'KeyI'|'KeyP'|'BracketLeft'|'BracketRight'|'Enter'|
    'CapsLock'|'KeyA'|'KeyS'|'KeyD'|'KeyF'|'KeyG'|'KeyH'|'KeyJ'|'KeyK'|'KeyL'|'Semicolon'|'Quote'|'Backslash'|
    'ShiftLeft'|'IntlBackslash'|'KeyZ'|'KeyX'|'KeyC'|'KeyV'|'KeyB'|'KeyN'|'KeyM'|'Comma'|'Period'|'Slash'|'ShiftRight'|
    'ControlLeft'|'MetaLeft'|'AltLeft'|'Space'|'AltRight'|'ControlRight'|
    'ScrollLock'|'Pause'|'Insert'|'Home'|'PageUp'|'Delete'|'End'|'PageDown'|
    'ArrowUp'|'ArrowLeft'|'ArrowDown'|'ArrowRight'|
    'NumLock'|'NumpadDivide'|'NumpadMultiply'|'NumpadSubtract'|
    'Numpad7'|'Numpad8'|'Numpad9'|'NumpadAdd'|
    'Numpad4'|'Numpad5'|'Numpad6'|
    'Numpad1'|'Numpad2'|'Numpad3'|
    'Numpad0'|'NumpadDecimal'|'NumpadEnter';

export interface KeyboardKey {
    code: KeyCode;
    view?: string;
}

export interface KeyboardLayout {
    leftSection: Array<KeyboardKey[]>;
    middleSection: Array<KeyboardKey[]>;
    rightSection: Array<KeyboardKey[]>;
}

export type KeyboardState = {
    [key: string]: boolean;
}

// Codes of keys that have differece between them in the heberew and english layouts(and there codes aren't KeyA, KeyB...) 
export const specialKeysCodes: string[] = 
['BracketLeft', 'BracketRight', 'Semicolon', 'Quote', 'Comma', 'Period', 'Slash'];

export const englishLowerCase: KeyboardLayout = {
    leftSection: [
        [{code: 'Escape', view: 'Esc'}, {code: 'F1'}, {code: 'F2'}, {code: 'F3'}, {code: 'F4'}, {code: 'F5'}, {code: 'F6'}, {code: 'F7'}, {code: 'F8'}, {code: 'F9'}, {code: 'F10'}, {code: 'F11'}, {code: 'F12'}],
        [{code: 'Backquote', view: '`'}, {code: 'Digit1', view: '1'}, {code: 'Digit2', view: '2'}, {code: 'Digit3', view: '3'}, {code: 'Digit4', view: '4'}, {code: 'Digit5', view: '5'}, {code: 'Digit6', view: '6'}, {code: 'Digit7', view: '7'}, {code: 'Digit8', view: '8'}, {code: 'Digit9', view: '9'}, {code: 'Digit0', view: '0'}, {code: 'Minus', view: '-'}, {code: 'Equal', view: '='}, {code: 'Backspace'}],
        [{code: 'Tab'}, {code: 'KeyQ', view: 'q'}, {code: 'KeyW', view: 'w'}, {code: 'KeyE', view: 'e'}, {code: 'KeyR', view: 'r'}, {code: 'KeyT', view: 't'}, {code: 'KeyY', view: 'y'}, {code: 'KeyU', view: 'u'}, {code: 'KeyI', view: 'i'}, {code: 'KeyO', view: 'o'}, {code: 'KeyP', view: 'p'}, {code: 'BracketLeft', view: '['}, {code: 'BracketRight', view: ']'}, {code: 'Enter'}],
        [{code: 'CapsLock'}, {code: 'KeyA', view: 'a'}, {code: 'KeyS', view: 's'}, {code: 'KeyD', view: 'd'}, {code: 'KeyF', view: 'f'}, {code: 'KeyG', view: 'g'}, {code: 'KeyH', view: 'h'}, {code: 'KeyJ', view: 'j'}, {code: 'KeyK', view: 'k'}, {code: 'KeyL', view: 'l'}, {code: 'Semicolon', view: ';'}, {code: 'Quote', view: '\''}, {code: 'Backslash', view: '\\'}],
        [{code: 'ShiftLeft', view:'Shift'}, {code: 'IntlBackslash', view: '|'}, {code: 'KeyZ', view: 'z'}, {code: 'KeyX', view: 'x'}, {code: 'KeyC', view: 'c'}, {code: 'KeyV', view: 'v'}, {code: 'KeyB', view: 'b'}, {code: 'KeyN', view: 'n'}, {code: 'KeyM', view: 'm'}, {code: 'Comma', view: ','}, {code: 'Period', view: '.'}, {code: 'Slash', view: '/'}, {code: 'ShiftRight', view: 'Shift'}],
        [{code: 'ControlLeft', view: 'Control'}, {code: 'MetaLeft', view: 'Win'}, {code: 'AltLeft', view: 'Alt'}, {code: 'Space', view: '        '}, {code: 'AltRight', view: 'Alt'}, {code: 'ControlRight', view: 'Control'} ],
    ],
    middleSection: [
        [{code: 'ScrollLock', view: 'scroll lk'}, {code: 'Pause'}],
        [{code: 'Insert'}, {code: 'Home'}, {code: 'PageUp', view: 'PgUp' }],
        [{code: 'Delete'}, {code: 'End'}, {code: 'PageDown', view: 'PgDown' }],
        [],
        [{code: 'ArrowUp', view: '↑' }],
        [{code: 'ArrowLeft', view: '←' }, {code: 'ArrowDown', view: '↓' }, {code: 'ArrowRight', view: '→' }],
    ],
    rightSection: [
        [],
        [{code: 'NumLock', view: 'NumLk' }, {code: 'NumpadDivide', view: '/'}, {code: 'NumpadMultiply', view: '*'}, {code: 'NumpadSubtract', view: '-'}],
        [{code: 'Numpad7', view: '7'}, {code: 'Numpad8', view: '8'}, {code: 'Numpad9', view: '9'}, {code: 'NumpadAdd', view: '+'}],
        [{code: 'Numpad4', view: '4'}, {code: 'Numpad5', view: '5'}, {code: 'Numpad6', view: '6'}],
        [{code: 'Numpad1', view: '1'}, {code: 'Numpad2', view: '2'}, {code: 'Numpad3', view: '3'}],
        [{code: 'Numpad0', view: '0'}, {code: 'NumpadDecimal', view: '.'}, { code: 'NumpadEnter', view: 'Enter'} ],
    ]
}

export const englishUpperCase: KeyboardLayout =  structuredClone(englishLowerCase);
englishUpperCase.leftSection = [
    [{code: 'Escape', view: 'Esc'}, {code: 'F1'}, {code: 'F2'}, {code: 'F3'}, {code: 'F4'}, {code: 'F5'}, {code: 'F6'}, {code: 'F7'}, {code: 'F8'}, {code: 'F9'}, {code: 'F10'}, {code: 'F11'}, {code: 'F12'}],
    [{code: 'Backquote', view: '`'}, {code: 'Digit1', view: '1'}, {code: 'Digit2', view: '2'}, {code: 'Digit3', view: '3'}, {code: 'Digit4', view: '4'}, {code: 'Digit5', view: '5'}, {code: 'Digit6', view: '6'}, {code: 'Digit7', view: '7'}, {code: 'Digit8', view: '8'}, {code: 'Digit9', view: '9'}, {code: 'Digit0', view: '0'}, {code: 'Minus', view: '-'}, {code: 'Equal', view: '='}, {code: 'Backspace'}],
    [{code: 'Tab'}, {code: 'KeyQ', view: 'Q'}, {code: 'KeyW', view: 'W'}, {code: 'KeyE', view: 'E'}, {code: 'KeyR', view: 'R'}, {code: 'KeyT', view: 'T'}, {code: 'KeyY', view: 'Y'}, {code: 'KeyU', view: 'U'}, {code: 'KeyI', view: 'I'}, {code: 'KeyO', view: 'O'}, {code: 'KeyP', view: 'P'}, {code: 'BracketLeft', view: '['}, {code: 'BracketRight', view: ']'}, {code: 'Enter'}],
    [{code: 'CapsLock'}, {code: 'KeyA', view: 'A'}, {code: 'KeyS', view: 'S'}, {code: 'KeyD', view: 'D'}, {code: 'KeyF', view: 'F'}, {code: 'KeyG', view: 'G'}, {code: 'KeyH', view: 'H'}, {code: 'KeyJ', view: 'J'}, {code: 'KeyK', view: 'K'}, {code: 'KeyL', view: 'L'}, {code: 'Semicolon', view: ';'}, {code: 'Quote', view: '\''}, {code: 'Backslash', view: '\\'}],
    [{code: 'ShiftLeft', view:'Shift'}, {code: 'IntlBackslash', view: '|'}, {code: 'KeyZ', view: 'Z'}, {code: 'KeyX', view: 'X'}, {code: 'KeyC', view: 'C'}, {code: 'KeyV', view: 'V'}, {code: 'KeyB', view: 'B'}, {code: 'KeyN', view: 'N'}, {code: 'KeyM', view: 'M'}, {code: 'Comma', view: ','}, {code: 'Period', view: '.'}, {code: 'Slash', view: '/'}, {code: 'ShiftRight', view: 'Shift'}],
    [{code: 'ControlLeft', view: 'Control'}, {code: 'MetaLeft', view: 'Win'}, {code: 'AltLeft', view: 'Alt'}, {code: 'Space', view: '        '}, {code: 'AltRight', view: 'Alt'}, {code: 'ControlRight', view: 'Control'} ],
];

export const hebrewLayout: KeyboardLayout =  structuredClone(englishLowerCase);
hebrewLayout.leftSection = [
    [{code: 'Escape', view: 'Esc'}, {code: 'F1'}, {code: 'F2'}, {code: 'F3'}, {code: 'F4'}, {code: 'F5'}, {code: 'F6'}, {code: 'F7'}, {code: 'F8'}, {code: 'F9'}, {code: 'F10'}, {code: 'F11'}, {code: 'F12'}],
    [{code: 'Backquote', view: '`'}, {code: 'Digit1', view: '1'}, {code: 'Digit2', view: '2'}, {code: 'Digit3', view: '3'}, {code: 'Digit4', view: '4'}, {code: 'Digit5', view: '5'}, {code: 'Digit6', view: '6'}, {code: 'Digit7', view: '7'}, {code: 'Digit8', view: '8'}, {code: 'Digit9', view: '9'}, {code: 'Digit0', view: '0'}, {code: 'Minus', view: '-'}, {code: 'Equal', view: '='}, {code: 'Backspace'}],
    [{code: 'Tab'}, {code: 'KeyQ', view: '/'}, {code: 'KeyW', view: '\''}, {code: 'KeyE', view: 'ק'}, {code: 'KeyR', view: 'ר'}, {code: 'KeyT', view: 'א'}, {code: 'KeyY', view: 'ט'}, {code: 'KeyU', view: 'ו'}, {code: 'KeyI', view: 'ן'}, {code: 'KeyO', view: 'ם'}, {code: 'KeyP', view: 'פ'}, {code: 'BracketLeft', view: ']'}, {code: 'BracketRight', view: '['}, {code: 'Enter'}],
    [{code: 'CapsLock'}, {code: 'KeyA', view: 'ש'}, {code: 'KeyS', view: 'ד'}, {code: 'KeyD', view: 'ג'}, {code: 'KeyF', view: 'כ'}, {code: 'KeyG', view: 'ע'}, {code: 'KeyH', view: 'י'}, {code: 'KeyJ', view: 'ח'}, {code: 'KeyK', view: 'ל'}, {code: 'KeyL', view: 'ך'}, {code: 'Semicolon', view: 'ף'}, {code: 'Quote', view: ','}, {code: 'Backslash', view: '\\'}],
    [{code: 'ShiftLeft', view:'Shift'}, {code: 'IntlBackslash', view: '|'}, {code: 'KeyZ', view: 'ז'}, {code: 'KeyX', view: 'ס'}, {code: 'KeyC', view: 'ב'}, {code: 'KeyV', view: 'ה'}, {code: 'KeyB', view: 'נ'}, {code: 'KeyN', view: 'מ'}, {code: 'KeyM', view: 'צ'}, {code: 'Comma', view: 'ת'}, {code: 'Period', view: 'ץ'}, {code: 'Slash', view: '.'}, {code: 'ShiftRight', view: 'Shift'}],
    [{code: 'ControlLeft', view: 'Control'}, {code: 'MetaLeft', view: 'Win'}, {code: 'AltLeft', view: 'Alt'}, {code: 'Space', view: '        '}, {code: 'AltRight', view: 'Alt'}, {code: 'ControlRight', view: 'Control'} ],
];

export const layoutToInitState = (layout: KeyboardLayout): KeyboardState => {
    const flatLayout: KeyboardKey[] = Object.values(layout).flat(2);
    const codesSatusesArr: Array<[string, boolean]> = flatLayout.map((key: KeyboardKey) => [key.code, false]);
    return Object.fromEntries(codesSatusesArr);
}
