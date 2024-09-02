import { createBrowserRouter } from "react-router-dom";
import HomePage from "@/Pages/HomePage/HomePage";
import Waterfall from "@/Pages/WaterfallPage/WaterfallPage";
import MapPage from "@/Pages/MapPage/MapPage";
import StreamingPage from "@/Pages/StreamingPage/StreamingPage";
import IOChecks from "@/Pages/IOChecks/IOChecks";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/waterfall",
    element: <Waterfall />,
  },
  {
    path: "/map",
    element: <MapPage />,
  },
  {
    path: "/streamer",
    element: <StreamingPage />,
  },
  {
    path: "/io-checks",
    element: <IOChecks />,
  },
]);

export default router;
