import { MessageQueue } from "hmi-helper";

const envVars = process.env;
const {
  RABBITMQ_HOST,
  RABBITMQ_USER,
  RABBITMQ_PASS,
  WATERFALL_QUEUE: queueName,
} = envVars;

const mqUrl: string = `amqp://${RABBITMQ_USER}:${RABBITMQ_PASS}@${RABBITMQ_HOST}`;
const MQ: MessageQueue = new MessageQueue(mqUrl);

export const initDataSender = async (): Promise<void> => {
  await MQ.connect().then(async () => {
    await MQ.createQueue(queueName);
  });
};

export const reconnectDataSender = async (): Promise<void> => {
  await MQ.reconnect().then(async () => {
    await MQ.createQueue(queueName);
  });
};

export const sendMsg = async (data: string): Promise<void> => {
    try {
      await MQ.sendToQueue(queueName, data);
    } catch (error) {
      const errorMsg: string = "Error: Failed to send the message.";
      console.error(errorMsg);
      throw new Error(errorMsg);
    }
};
