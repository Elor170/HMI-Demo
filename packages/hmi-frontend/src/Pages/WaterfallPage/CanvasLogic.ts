import { canvasHeight, canvasWidth } from "@/Helper/consts";

const grayLinesNum = 10;

export function initCanvas(
  canvas: HTMLCanvasElement | null,
  waterfallData: WaterfallObject[]
): void {
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
          if (dataLine.data.R) canvasData[canvasIndex + 0] = dataLine.data.R[columnIndex];
          canvasData[canvasIndex + 1] = dataGVal; // G value
          if (dataLine.data.B) canvasData[canvasIndex + 2] = dataLine.data.B[columnIndex + 2];
          canvasData[canvasIndex + 3] = 255; // Alpha value (fully opaque)
        });
      });

      // Put the image data back onto the canvas
      ctx.putImageData(imageData, 0, 0);
    }
  }
}

export function addLineToCanvas(
  canvas: HTMLCanvasElement,
  line: WaterfallObject
): void {
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
    let imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight - 1, {});
    ctx.putImageData(imageData, 0, 1); // Shift existing content down by 1 pixel line

    // Draw the new pixel line at the top
    ctx.putImageData(pixelLine, 0, 0);
  }
}

export function addGrayLines(
  canvas: HTMLCanvasElement,
): void {
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (ctx) {
    const pixelLines = ctx.createImageData(canvasWidth, grayLinesNum);
    const linesData = pixelLines.data;

    for (let lineIndex = 0; lineIndex < grayLinesNum; lineIndex++) {
        for (let columnIndex = 0; columnIndex < canvasWidth; columnIndex++) {
            const canvasIndex = (lineIndex * canvas.width + columnIndex) * 4;
            linesData[canvasIndex + 0] = 100;  // R value
            linesData[canvasIndex + 1] = 100; // G value
            linesData[canvasIndex + 2] = 100; // B value
            linesData[canvasIndex + 3] = 255; // Alpha value (fully opaque)
        };
    };

    // Update the pixel data of the new line
    pixelLines.data.set(linesData);

    // Move the existing canvas image down by 1 line (shifting it)
    let imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight - grayLinesNum, {});
    ctx.putImageData(imageData, 0, grayLinesNum); // Shift existing content down by 1 pixel line

    // Draw the new pixel line at the top
    ctx.putImageData(pixelLines, 0, 0);
  }
}
