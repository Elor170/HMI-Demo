import { createTheme } from "@mui/material";

export const STREAMER_SERVER = import.meta.env.VITE_STREAMER_SERVER;
export const WATERFALL_BACKEND_URL = import.meta.env.VITE_WATERFALL_BACKEND_URL;
export const GAME_SERVER = import.meta.env.VITE_3D_GAME_SERVER;
export const GAME_BACKEND_SERVER = import.meta.env.VITE_GAME_BACKEND_SERVER;

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
  },
});
