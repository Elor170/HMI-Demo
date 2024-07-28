import { Channel, connect, Connection } from "amqplib";

// Get env vars
const envVars: EnvVars = process.env as unknown as EnvVars;
const { RABBITMQ_HOST, RABBITMQ_USER, RABBITMQ_PASS } = envVars;

// Connect
const amqpUrl: string = `amqp://${RABBITMQ_USER}:${RABBITMQ_PASS}@${RABBITMQ_HOST}`;
let connection: Connection | void | null = null;
let channel: Channel;
const queue: string = "waterfall-queue";
const reconnectionTimeout: number = 5_000; // ms

export const connectToMQ = async (): Promise<void> => {
  do {
    await connect(amqpUrl)
      .then(async (newConnection: Connection) => {
        console.log('Connected successfully to message queue.');
        connection = newConnection;

        // Create channel
        channel = await connection.createChannel();
        await channel.assertQueue(queue, { durable: false });
      })
      .catch(async () => {
        console.error("Failed to connect to message queue.");
        console.log(
          `Trying to reconnect in ${reconnectionTimeout / 1_000} sec...`
        );
        await new Promise((f) => setTimeout(f, reconnectionTimeout));
      });
  } while (!connection);
};

export const sendData = (msg: unknown): void => {
  try {
    const msgJson = JSON.stringify(msg);
    channel.sendToQueue(queue, Buffer.from(msgJson));
  } catch (error) {
    console.error("Failed to send data.");
  }
};
