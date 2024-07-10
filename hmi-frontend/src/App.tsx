import { Suspense } from "react";
import TopAppBar from "./Components/TopAppBar/TopAppBar";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import router from "./Helper/Router/Router";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { darkTheme } from "./Helper/consts";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={darkTheme}>
        <TopAppBar />
        <CssBaseline />
        <Suspense fallback={<div>Loading...</div>}>
          <RouterProvider router={router} />
        </Suspense>
      </ThemeProvider>

      <ToastContainer />
    </QueryClientProvider>
  );
}
