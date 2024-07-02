import type { ObjectId } from "mongodb";

declare global {
  interface StreamLogData {
    _id?: ObjectId;
    bufferStartDate: Date;
    bufferEndDate: Date;
    bufferTimestamp: number;
    resolution: string;
  }
}

export {};
