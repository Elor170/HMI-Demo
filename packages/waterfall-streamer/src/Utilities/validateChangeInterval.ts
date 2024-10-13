import { sendingIntervalValues } from "hmi-helper";
import type { Request, Response, NextFunction } from "express";
import { isSendingInterval } from "hmi-helper";

export default function validateChangeInterval(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const newInterval = req.body.newInterval;
  if (isSendingInterval(newInterval)) return next();

  console.error(`Received invalid interval ${newInterval} ms.`);
  return res
    .status(400)
    .send(
      "Invalid interval value given. Accepted values are: " +
        sendingIntervalValues.toString()
    );
}
