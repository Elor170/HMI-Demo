import { startServer } from "@/Utilities/server";
import { initDataSender } from "@/Utilities/dataSender";
import { startInterval } from "@/Utilities/intervalManager";

await initDataSender();
startInterval();
startServer(80);
