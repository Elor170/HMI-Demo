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

        const document: WaterfallObject = {
            data: {
                R: null,
                G: waterfallObject.data.G,
                B: null
            },
            sendingTime: new Date(waterfallObject.sendingTime),
            backendTime: new Date(),
            frontendTime: null
        };
    
        sendWaterfallData(document);
        saveMsg(document);
    }
}

export default dataHandler;
