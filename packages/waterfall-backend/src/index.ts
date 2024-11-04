import { initDataReceiver, receiveMsg } from "@/Utilities/dataReceiver";
import { startServer } from "@/Utilities/server";
import dataHandler from "@/Utilities/dataHandler";
import initDB from "@/Utilities/dataBase";
import initSocket from "@/Utilities/socket";
import dotenv from "dotenv";
dotenv.config();
const { WATERFALL_QUEUE} = process.env;

await initDataReceiver();
await initDB();
await initSocket();
await receiveMsg(String(WATERFALL_QUEUE), dataHandler);
await startServer(80);
