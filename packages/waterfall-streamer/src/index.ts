import { startServer } from "@/Utilities/server";
import { initDataSender } from "@/Utilities/dataSender";
import { startInterval } from "@/Utilities/intervalManager";
import dotenv from "dotenv";
dotenv.config();
const { PORT } = process.env;

await initDataSender()
  .then(startInterval)
  .then(() => startServer(Number(PORT)));