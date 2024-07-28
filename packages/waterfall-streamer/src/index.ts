import { sendingInterval, setSendingInterval } from "./serviceVars";
import generateData from "./Utilities/dataGenerator";
import { connectToMQ, sendData } from "./Utilities/rabbitmq";
import express, { Request, Response, Express } from 'express';
import cors from 'cors';
import { validateChangeInterval } from 'hmi-helper';
import dotenv from "dotenv";
dotenv.config();
const { PORT } = process.env;


let intervalID: NodeJS.Timeout;
const intervalFunc = () => {
  const newData = generateData();
  sendData(newData);
};

connectToMQ()
.then(() => {
  console.log(`Start to send data each ${sendingInterval / 1000} sec.`);
  intervalID = setInterval(intervalFunc, sendingInterval);
})


const app: Express = express();
app.use(cors());
app.use(express.json());

app.patch('/ChangeSendingInterval', validateChangeInterval, (req: Request, res: Response)  => {
  const { newInterval } = req.body;

  setSendingInterval(newInterval);
  clearInterval(intervalID);
  intervalID = setInterval(intervalFunc, sendingInterval);
  console.log(`Sending interval changed to ${sendingInterval / 1000} sec.`);
  
  return res.status(200).send();
});

app.listen(PORT, () => {
  console.log("Server started on port " + PORT);
});
