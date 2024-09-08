import { createBrowserRouter } from "react-router-dom";
import HomePage from "@/Pages/HomePage/HomePage";
import Waterfall from "@/Pages/WaterfallPage/WaterfallPage";
import MapPage from "@/Pages/MapPage/MapPage";
import StreamingPage from "@/Pages/StreamingPage/StreamingPage";
import IOChecks from "@/Pages/IOChecks/IOChecks";
import GameLogs from "@/Pages/GameLogs/GameLogs";

interface RouteData {
  path: string;
  element: JSX.Element;
  label: string;
}

export const routerHelper: RouteData[] = [
  {
    path: "/",
    element: <HomePage />,
    label: "Home",
  },
  {
    path: "/waterfall",
    element: <Waterfall />,
    label: "Waterfall",
  },
  {
    path: "/map",
    element: <MapPage />,
    label: "Map",
  },
  {
    path: "/streamer",
    element: <StreamingPage />,
    label: "Streamer",
  },
  {
    path: "/io-checks",
    element: <IOChecks />,
    label: "IO-Checks",
  },
  {
    path: "/cube-data",
    element: <GameLogs />,
    label: "Game-Logss",
  },
];

const router = createBrowserRouter(routerHelper);

export default router;
