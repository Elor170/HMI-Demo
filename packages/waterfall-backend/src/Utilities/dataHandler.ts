import { receiveMsg, reconnectDataReceiver } from "@/Utilities/dataReceiver";
import { saveMsg, saveMultipleMsgs } from "@/Utilities/dataBase";
import { sendWaterfallData } from "@/Utilities/socket";
const envVars = process.env;
const { WATERFALL_QUEUE: queueName } = envVars;
const arraysLength = 3840;
const disconnectTimeout = 20_000;
let intervalID: NodeJS.Timeout;


export const addGrayLines = async(): Promise<void> => {
    const grayLine: WaterfallObject = {
        data: {
            R: new Array(arraysLength).fill(100),
            G: new Array(arraysLength).fill(100),
            B: new Array(arraysLength).fill(100)
        },
        sendingTime: new Date(),
        backendTime: null,
        frontendTime: null,
        sendingInterval: 1000
    };

    await saveMultipleMsgs(Array.from({ length: 10 }, () => structuredClone(grayLine)));
}

const onLostConnection = async(): Promise<void> => {
    addGrayLines();
    reconnectDataReceiver()
    .then(async () => receiveMsg(queueName, dataHandler));

    intervalID = setInterval(() => {
        reconnectDataReceiver()
        .then(async () => receiveMsg(queueName, dataHandler));
    }, disconnectTimeout);
} 

let timeoutID: NodeJS.Timeout = setTimeout(onLostConnection, disconnectTimeout);


const dataHandler = (msg: ConsumeMessage | null) => {
    clearTimeout(timeoutID);
    clearInterval(intervalID);
    timeoutID = setTimeout(onLostConnection, disconnectTimeout);

    if(msg){
        const waterfallObject: WaterfallObject = JSON.parse(msg.content.toString());

        const document: WaterfallObject = {
            data: {
                R: null,
                G: waterfallObject.data.G,
                B: null
            },
            sendingTime: new Date(waterfallObject.sendingTime),
            backendTime: new Date(),
            frontendTime: null,
            sendingInterval: waterfallObject.sendingInterval
        };
    
        sendWaterfallData(document);
        saveMsg(document);
    }
}

export default dataHandler;
