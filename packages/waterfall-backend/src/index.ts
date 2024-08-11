import { initDataReceiver, receiveMsg } from "@/Utilities/dataReceiver";
import { startServer } from "@/Utilities/server";
import dotenv from "dotenv";
import dataHandler from "./Utilities/dataHandler";
dotenv.config();
const { PORT } = process.env;
const envVars = process.env;
const { WATERFALL_QUEUE: queueName } = envVars;


initDataReceiver()
.then(async () => receiveMsg(queueName, dataHandler))
.then(async () => startServer(Number(PORT)));

