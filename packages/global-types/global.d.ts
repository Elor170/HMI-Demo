import type { ObjectId } from "mongodb";

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
    MONGO_URI: string;
  }

  type SendingInterval = 500 | 1_000 | 5_000 | 10_000;
}

export {};
