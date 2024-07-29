import generateData from "@/Utilities/dataGenerator";
import { reconnectDataSender, sendMsg } from "./dataSender";
let sendingInterval: SendingInterval = 1_000;
let intervalID: NodeJS.Timeout;
let sendingFailsCounter: number = 0;

const handleSendingFailed = async (): Promise<void> => {
  if (sendingFailsCounter === 10) {
    await clearInterval(intervalID);
    await reconnectDataSender().then(startInterval);
  } else {
    sendingFailsCounter++;
  }
};

const intervalFunc = async (): Promise<void> => {
  const newData = generateData();
  await sendMsg(newData.toString())
    .then(() => (sendingFailsCounter = 0))
    .catch(handleSendingFailed);
};

export const changeSendingInterval = (newInterval: SendingInterval) => {
  sendingInterval = newInterval;
  clearInterval(intervalID);
  intervalID = setInterval(intervalFunc, sendingInterval);
  console.log(`Sending interval changed to ${sendingInterval / 1000} sec`);
};

export const startInterval = (): void => {
  intervalID = setInterval(intervalFunc, sendingInterval);
  console.log(`Start to send data each ${sendingInterval / 1000} sec....`);
};
