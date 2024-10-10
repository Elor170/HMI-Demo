import { sendingIntervalValues } from "./vars";

export const isSendingInterval = (value: unknown): value is SendingInterval =>
  typeof value === "number" &&
  sendingIntervalValues.includes(value as SendingInterval);
