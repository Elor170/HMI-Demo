import { initDataReceiver, receiveMsg } from "@/Utilities/dataReceiver";
import { startServer } from "@/Utilities/server";
import dataHandler from "@/Utilities/dataHandler";
import initDB from "@/Utilities/dataBase";
import initSocket from "@/Utilities/socket";

import dotenv from "dotenv"; 
dotenv.config();
const { PORT } = process.env;
const envVars = process.env;
const { WATERFALL_QUEUE: queueName } = envVars;


initDataReceiver()
.then(async () => await initDB())
.then(async () => await initSocket())
.then(async () => await receiveMsg(String(queueName), dataHandler))
.then(async () => await startServer(Number(PORT)));
