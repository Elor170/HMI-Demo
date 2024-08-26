import { ObjectId } from "mongodb";
import * as amqp from "amqplib";
import { sendingIntervalValues } from './vars';


declare global {
  interface StreamLogData {
    _id?: ObjectId;
    bufferStartDate: Date;
    bufferEndDate: Date;
    bufferTimestamp: number;
    resolution: string;
  }
  interface EnvVars {
    RABBITMQ_HOST: string;
    RABBITMQ_USER: string;
    RABBITMQ_PASS: string;
    HMI_FRONTEND_PORT: number;
    STREAMER_BACKEND_PORT: number;
    WATERFALL_BACKEND_PORT: number;
    WATERFALL_QUEUE: string;
    MONGO_URI: string;
  }

  // Waterfall
  type SendingInterval = typeof sendingIntervalValues[number];
  type RGBObject = {
    readonly R: readonly number[];
    readonly G: readonly number[];
    readonly B: readonly number[];
  }
  interface ConsumeMessage extends amqp.ConsumeMessage {}
}
