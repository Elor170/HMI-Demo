import { sendingInterval } from "./serviceVars";
import { sendData } from "./Utilities/rabbitmq";

const msgObject = {
  name: 'John Doe',
  age: 30,
  occupation: 'Software Developer'
};

setInterval(() => {
  sendData(msgObject)
}, sendingInterval);
