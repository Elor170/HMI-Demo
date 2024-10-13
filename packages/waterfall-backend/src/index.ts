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

await initDataReceiver();
await initDB();
await initSocket();
await receiveMsg(String(queueName), dataHandler);
await startServer(Number(PORT));
