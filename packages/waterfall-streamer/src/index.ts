import { sendingInterval, setSendingInterval } from "./serviceVars";
import generateData from "./Utilities/dataGenerator";
import express, { Request, Response, Express } from 'express';
import cors from 'cors';
import { validateChangeInterval, MessageQueue } from 'hmi-helper';
import dotenv from "dotenv";
dotenv.config();
const { PORT } = process.env;
const envVars: EnvVars = process.env as unknown as EnvVars;
const { RABBITMQ_HOST, RABBITMQ_USER, RABBITMQ_PASS, WATERFALL_QUEUE: queueName } = envVars;

const mqUrl: string = `amqp://${RABBITMQ_USER}:${RABBITMQ_PASS}@${RABBITMQ_HOST}`;
const MQ: MessageQueue = new MessageQueue(mqUrl);


let intervalID: NodeJS.Timeout;
const intervalFunc = () => {
  const newData = generateData();
  try {
    MQ.sendToQueue(queueName, newData.toString());
  } catch (error) {
    console.error('Error:', error);
  }
};

MQ.connect()
.then(() => {
  MQ.createQueue(queueName)
})
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
