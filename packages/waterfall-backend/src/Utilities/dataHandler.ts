import { receiveMsg, reconnectDataReceiver } from "@/Utilities/dataReceiver";
const EnvVars = process.env as unknown as EnvVars;
const { WATERFALL_QUEUE: queueName } = EnvVars;


const onLostConnection = async(): Promise<void> => {
    reconnectDataReceiver()
    .then(async () => receiveMsg(queueName, dataHandler))
} 
let intervalID: NodeJS.Timeout = setInterval(onLostConnection, 20_000);


const dataHandler = (msg: ConsumeMessage | null) => {
    clearInterval(intervalID);
    intervalID = setInterval(onLostConnection, 20_000);

    if(msg)
        printMsg(msg)
}

const printMsg = (msg: ConsumeMessage) => {
    const waterfallObject: WaterfallObject = JSON.parse(msg.content.toString());
    
    const {R: red, G: green, B: blue} = waterfallObject.data;
    green.forEach((_ , index) => {
        const g = Math.min(green[index] * 4, 255)
        process.stdout.write(`\x1b[38;2;${red[index]};${g};${blue[index]}m!\x1b[0m`);
    }); 
    console.log()
}

export default dataHandler;
