import SocketIOClient from "socket.io-client";
import { isSendingInterval } from "hmi-helper/src/methods";
import {
  canvasHeight,
  canvasWidth,
  WATERFALL_BACKEND_URL,
} from "@/Helper/consts";

const io = SocketIOClient(WATERFALL_BACKEND_URL);
const sendTimeToBackend = (data: WaterfallObject) => {
  data.frontendTime = new Date();
  io.emit("waterfallToBackend", data);
};

export const initCanvas = (
  canvas: HTMLCanvasElement | null,
  waterfallData: WaterfallObject[]
) => {
  if (canvas) {
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (ctx) {
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;

      // Create an ImageData object
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const canvasData = imageData.data;

      // Set specific RGB values for each pixel
      waterfallData.forEach((dataLine: WaterfallObject, lineIndex: number) => {
        dataLine.data.G.forEach((dataGVal: number, columnIndex: number) => {
          const canvasIndex = (lineIndex * canvas.width + columnIndex) * 4;
          canvasData[canvasIndex + 1] = dataGVal; // G value
          canvasData[canvasIndex + 3] = 255; // Alpha value (fully opaque)
        });
      });

      // // Put the image data back onto the canvas
      ctx.putImageData(imageData, 0, 0);
    }
  }
};

export const addEventListenerToCanvas = (
  canvas: HTMLCanvasElement | null,
  setCurrentInterval: (arg: SendingInterval) => void
) => {
  io.on("waterfallToFrontend", (line: WaterfallObject) => {
    sendTimeToBackend(line);

    setCurrentInterval(line.sendingInterval);

    if (canvas) {
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (ctx) {
        const pixelLine = ctx.createImageData(canvasWidth, 1);
        const lineData = pixelLine.data;

        line.data.G.forEach((dataGVal: number, columnIndex: number) => {
          const canvasIndex = columnIndex * 4;

          lineData[canvasIndex + 1] = dataGVal; // G value
          lineData[canvasIndex + 3] = 255; // Alpha value (fully opaque)
        });

        // Update the pixel data of the new line
        pixelLine.data.set(lineData);

        // Move the existing canvas image down by 1 line (shifting it)
        let imageData = ctx.getImageData(
          0,
          0,
          canvasWidth,
          canvasHeight - 1,
          {}
        );
        ctx.putImageData(imageData, 0, 1); // Shift existing content down by 1 pixel line

        // Draw the new pixel line at the top
        ctx.putImageData(pixelLine, 0, 0);
      }
    }
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
