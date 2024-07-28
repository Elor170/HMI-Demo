import express from "express";
import "./types";
import {sendingIntervalValues} from "./vars";
import MessageQueue from "./messageQueue";

const isSendingInterval = (value: unknown): value is SendingInterval =>
  typeof value === "number" && sendingIntervalValues.includes(value as SendingInterval);

const validateChangeInterval = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const newInterval = req.body.newInterval;
  if (isSendingInterval(newInterval)) return next();
  
  console.error(`Received invalid interval ${newInterval} ms.`);
  return res
    .status(400)
    .send(
      "Invalid interval value given. Accepted values are: " +
        sendingIntervalValues.toString()
    );
};

export { sendingIntervalValues, validateChangeInterval, MessageQueue };
