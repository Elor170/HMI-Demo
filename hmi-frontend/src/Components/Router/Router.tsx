import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "@/Pages/HomePage/HomePage";
import CubePage from "@/Pages/CubePage/CubePage";
import Waterfall from "@/Pages/WaterfallPage/WaterfallPage";
import MapPage from "@/Pages/MapPage/MapPage";
import StreamingPage from "@/Pages/StreamingPage/StreamingPage";
import IOChecks from "@/Pages/IOChecks/IOChecks";

export default function Router() {
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
      path: "/streaming",
      element: <StreamingPage />,
    },
    {
      path: "/io-checks",
      element: <IOChecks />,
    },
  ]);

  return <RouterProvider router={router} />;
}
