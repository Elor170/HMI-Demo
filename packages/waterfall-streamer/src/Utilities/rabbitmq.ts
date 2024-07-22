import { Channel, connect, Connection } from 'amqplib';
import dotenv from "dotenv";
dotenv.config();

// Get env vars
const envVars: EnvVars = process.env as unknown as EnvVars;
const { RABBITMQ_HOST, RABBITMQ_USER, RABBITMQ_PASS } = envVars; 

// Connect
const amqpUrl: string = `amqp://${RABBITMQ_USER}:${RABBITMQ_PASS}@${RABBITMQ_HOST}`;
const connection: Connection = await connect(amqpUrl);

// Create channel and queue
const channel: Channel = await connection.createChannel();
const queue: string = 'waterfall-queue';
await channel.assertQueue (queue, { durable: false });

export const sendData = (msg: unknown): void => {
    const msgJson = JSON.stringify(msg);
    channel.sendToQueue(queue, Buffer.from(msgJson));
}
