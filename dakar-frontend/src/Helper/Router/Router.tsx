import { createBrowserRouter } from "react-router-dom";
import HomePage from "@/Pages/HomePage/HomePage";
import CubePage from "@/Pages/CubePage/CubePage";
import Waterfall from "@/Pages/WaterfallPage/WaterfallPage";
import MapPage from "@/Pages/MapPage/MapPage";
import StreamingPage from "@/Pages/StreamingPage/StreamingPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/cube",
    element: <CubePage />,
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
]);

export default router;