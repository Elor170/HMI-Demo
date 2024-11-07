import { ObjectId } from "mongodb";
import * as amqp from "amqplib";
import { sendingIntervalValues } from "./vars";

declare global {
  interface StreamLogData {
    _id?: ObjectId;
    bufferStartDate: Date;
    bufferEndDate: Date;
    bufferTimestamp: number;
    resolution: string;
  }

  // Waterfall
  type SendingInterval = (typeof sendingIntervalValues)[number];
  type WaterfallDataFrame = {
    dataArr: WaterfallObject[];
    isNewestData: boolean;
    isOldestData: boolean;
  };
  type WaterfallObject = {
    data: RGBObject;
    sendingTime: Date;
    backendTime: Date | null;
    frontendTime: Date | null;
    sendingInterval: SendingInterval;
  };
  type RGBObject = {
    readonly R: readonly number[] | null;
    readonly G: readonly number[];
    readonly B: readonly number[] | null;
  };
  interface ConsumeMessage extends amqp.ConsumeMessage {}
  type WaterfallLogs = {
    [K in SendingInterval]?: {
      [K2 in number]?: number;
    };
  };

  // Game
  interface GameLog {
    _id?: ObjectId;
    spheres: number;
    cubes: number;
    fps: number;
    date: Date;
    secondsPlayed: number;
  }

  namespace NodeJS {
    interface ProcessEnv {
      RABBITMQ_HOST: string;
      RABBITMQ_USER: string;
      RABBITMQ_PASS: string;
      HMI_FRONTEND_PORT: string;
      STREAMER_BACKEND_PORT: string;
      WATERFALL_BACKEND_PORT: string;
      GAME_MONITOR_PORT: string;
      WATERFALL_QUEUE: string;
      WATERFALL_DB: string;
      MONGO_URI: string;
      SERVER_IP: string;
      FRONTEND_IP: string;
    }
  }
}
