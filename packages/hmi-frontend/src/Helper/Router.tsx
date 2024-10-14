import HomePage from "@/Pages/HomePage/HomePage";
import Waterfall from "@/Pages/WaterfallPage/WaterfallPage";
import StreamingPage from "@/Pages/StreamingPage/StreamingPage";
import IOChecks from "@/Pages/IOChecks/IOChecks";
import { createBrowserRouter } from "react-router-dom";
import GamePage from "@/Pages/GamePage/GamePage";

interface RouteData {
  path: string;
  element: JSX.Element;
  label?: string;
}

// eslint-disable-next-line react-refresh/only-export-components
export const routerData: RouteData[] = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/waterfall",
    element: <Waterfall />,
    label: "Waterfall",
  },
  {
    path: "/streamer",
    element: <StreamingPage />,
    label: "Streamer",
  },
  {
    path: "/io",
    element: <IOChecks />,
    label: "IO-Checks",
  },
  {
    path: "/game",
    element: <GamePage />,
    label: "Game",
  },
];

const router = createBrowserRouter(routerData);
export default router;
