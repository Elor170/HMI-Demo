export let sendingInterval: SendingInterval = 1_000;

export function setSendingInterval(newValue: SendingInterval): void {
    sendingInterval = newValue;
}