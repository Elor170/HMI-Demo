import { sendingInterval } from "./serviceVars";
import generateData from "./Utilities/dataGenerator";
import { sendData } from "./Utilities/rabbitmq";

setInterval(() => {
  const newData = generateData();
  sendData(newData);
}, sendingInterval);
