import SocketIOClient from "socket.io-client";
import { isSendingInterval } from "hmi-helper/src/waterfallAssist";
import { WATERFALL_BACKEND_URL } from "@/Helper/consts";
import ky from "ky";
import { addGrayLines, addLineToCanvas } from "./CanvasLogic";

const disconnectionTimeout = 20_000;
const onDisconnect = (
  canvas: HTMLCanvasElement | null,
  isUpdatingCanvas: boolean,
  setIsConnected: (arg: boolean) => void
) => {
  setIsConnected(false);
  if (canvas && isUpdatingCanvas) addGrayLines(canvas);
};

const io = SocketIOClient(WATERFALL_BACKEND_URL);
const sendTimeToBackend = (data: WaterfallObject) => {
  data.frontendTime = new Date();
  io.emit("waterfallToBackend", data);
};

export const addEventListenerToCanvas = (
  canvas: HTMLCanvasElement | null,
  isUpdatingCanvas: boolean,
  setCurrentInterval: (arg: SendingInterval) => void,
  setIsConnected: (arg: boolean) => void
) => {
  let disconnectTimeout = setTimeout(
    () => onDisconnect(canvas, isUpdatingCanvas, setIsConnected),
    disconnectionTimeout
  );

  io.on("waterfallToFrontend", (line: WaterfallObject) => {
    clearTimeout(disconnectTimeout);
    setIsConnected(true);

    disconnectTimeout = setTimeout(
      () => onDisconnect(canvas, isUpdatingCanvas, setIsConnected),
      disconnectionTimeout
    );

    sendTimeToBackend(line);
    setCurrentInterval(line.sendingInterval);

    if (canvas && isUpdatingCanvas) addLineToCanvas(canvas, line);
  });
};

export const removeEventListenerToCanvas = () => {
  io.off("waterfallToFrontend");
};

export const formatInterval = (val: SendingInterval): string => {
  if (!isSendingInterval(val)) return "";
  if (val < 1000) return val + " ms";
  else return val / 1000 + " s";
};

export interface WaterfallQueryParams {
  time: Date;
  type: "older" | "newer";
}

export async function getWaterfallData({
  time,
  type,
}: WaterfallQueryParams): Promise<WaterfallDataFrame> {
  const data: WaterfallDataFrame = await ky
    .get<WaterfallObject[]>(`${type}-waterfall-data`, {
      searchParams: {
        time: time.toString(),
      },
      prefixUrl: WATERFALL_BACKEND_URL,
      timeout: 60_000,
    })
    .json();

  data.dataArr.reverse();
  return data;
}
