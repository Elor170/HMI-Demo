import { createTheme } from "@mui/material";
import {
  sendingIntervalValues,
  screenHeight,
  waterfallFrameSize,
} from "hmi-helper/src/vars";

export const STREAMER_SERVER = import.meta.env.VITE_STREAMER_SERVER;
export const WATERFALL_BACKEND_URL = import.meta.env.VITE_WATERFALL_BACKEND_URL;
export const WATERFALL_STREAMER_URL = import.meta.env
  .VITE_WATERFALL_STREAMER_URL;
export const GAME_SERVER = import.meta.env.VITE_3D_GAME_SERVER;
export const STREAMER_LOGGER = import.meta.env.VITE_STREAMER_LOGGER;

export const RESOLUTIONS = [
  "240p",
  "360p",
  "480p",
  "720p",
  "1080p",
  "2k",
  "4k",
  "8k",
];

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#181818",
    },
  },
});

export const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

export { sendingIntervalValues, screenHeight, waterfallFrameSize };
export const canvasHeight = waterfallFrameSize;
export const canvasWidth = 3840; // as screen width
