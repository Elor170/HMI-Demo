import HomePage from "@/Pages/HomePage/HomePage";
import Waterfall from "@/Pages/WaterfallPage/WaterfallPage";
import MapPage from "@/Pages/MapPage/MapPage";
import StreamingPage from "@/Pages/StreamingPage/StreamingPage";
import IOChecks from "@/Pages/IOChecks/IOChecks";
import GamePage from "@/Pages/GamePage/GamePage";

interface RouteData {
  path: string;
  element: JSX.Element;
  label: string;
}

// eslint-disable-next-line react-refresh/only-export-components
const router: RouteData[] = [
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
    path: "/io",
    element: <IOChecks />,
    label: "IO-Checks",
  },
];

export default router;
