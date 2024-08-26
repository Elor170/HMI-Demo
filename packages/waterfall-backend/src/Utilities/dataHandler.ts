import { receiveMsg, reconnectDataReceiver } from "@/Utilities/dataReceiver";
import { saveMsg } from "@/Utilities/dataBase";
import { sendWaterfallData } from "@/Utilities/socket";
const envVars = process.env;
const { WATERFALL_QUEUE: queueName } = envVars;


const onLostConnection = async(): Promise<void> => {
    reconnectDataReceiver()
    .then(async () => receiveMsg(queueName, dataHandler))
} 
let intervalID: NodeJS.Timeout = setInterval(onLostConnection, 20_000);


const dataHandler = (msg: ConsumeMessage | null) => {
    clearInterval(intervalID);
    intervalID = setInterval(onLostConnection, 20_000);

    if(msg){
        const waterfallObject: WaterfallObject = JSON.parse(msg.content.toString());
        waterfallObject.sendingTime = new Date(waterfallObject.sendingTime);
        waterfallObject.backendTime = new Date();
    
        sendWaterfallData(waterfallObject);
        saveMsg(waterfallObject);
    }
}

export default dataHandler;
