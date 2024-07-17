const KeyboardShortcuts: string[] = 
['Ctrl + C', 'Ctrl + V', 'Ctrl + Shift + S', 'Ctrl + Shift + >', 'Shift + Tab', 'Shift + ^', 'Alt + F', 'Alt + E'];
export type KeyboardShortcut = typeof KeyboardShortcuts[number];
export type shortcutsStatus = {[shortcut: string]: boolean};

export const initShortcutsStatus: shortcutsStatus = Object.fromEntries(
    KeyboardShortcuts.map((shortcut: KeyboardShortcut) => 
        [shortcut, false]
    ));
