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

export const initDataReceiver = async (): Promise<void> => {
  await MQ.connect().then(async () => {
    await MQ.createQueue(queueName);
  });
};

export const reconnectDataReceiver = async (): Promise<void> => {
  await MQ.reconnect().then(async () => {
    await MQ.createQueue(queueName);
  });
};

export const receiveMsg = async (
  queue: string,
  msgHandler: (msg: ConsumeMessage | null) => void,
): Promise<void> => {
  try {
    await MQ.consume(queue, msgHandler);
  } catch (error) {
    const errorMsg: string = "Error: Failed to consume from queue" + queue;
    console.error(errorMsg);
    throw new Error(errorMsg);
  }
};
