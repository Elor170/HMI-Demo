import dotenv from "dotenv";
import { startServer } from "@/Utilities/server";
import { initDataReceiver, receiveMsg } from "@/Utilities/dataReceiver";
dotenv.config();
const { PORT } = process.env;
const EnvVars = process.env as unknown as EnvVars;
const { WATERFALL_QUEUE: queueName } = EnvVars;

// TODO: replace it with suitable function
const dataHandler = (msg: ConsumeMessage | null) => {
    if(msg) {
        const data: RGBObject = JSON.parse(msg.content.toString());
        const {R: red, G: green, B: blue} = data
        data.G.forEach((_ , index) => {
            const g = Math.min(green[index] * 4, 255)
            process.stdout.write(`\x1b[38;2;${red[index]};${g};${blue[index]}m!\x1b[0m`);
        }); 
        console.log()
    }
}


initDataReceiver()
.then(async () => receiveMsg(queueName, dataHandler))
.then(async () => startServer(Number(PORT)));
