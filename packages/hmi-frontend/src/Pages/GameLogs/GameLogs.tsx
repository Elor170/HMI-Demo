import { GAME_BACKEND_SERVER } from "@/Helper/consts";
import { Box, Typography, CircularProgress } from "@mui/material";
import ky from "ky";
import { useMemo } from "react";
import { useQuery } from "react-query";
import { LineChart } from "@mui/x-charts";
import DeleteLogsButton from "./DeleteLogsButton";

interface GameLog {
  id: string;
  date: Date;
  fps: number;
  cubes: number;
  spheres: number;
}

export default function GameLogs() {
  const { isLoading, error, data, refetch } = useQuery<GameLog[], Error>(
    "logs",
    () => ky.get(`${GAME_BACKEND_SERVER}/logs`).json<GameLog[]>()
  );

  const { fps, elementsOnScreen } = useMemo(() => {
    if (!data) return { xAxisData: [], seriesData: [] };

    const averageFpsData = data.map((log) => log.fps);
    const amountOfElementsData = data.map((log) => log.cubes + log.spheres);

    return {
      fps: { name: "Average FPS", data: averageFpsData },
      elementsOnScreen: {
        name: "Amount of Elements",
        data: amountOfElementsData,
      },
    };
  }, [data]);

  if (isLoading) {
    return <CircularProgress />
  }

  if (error) {
    return (
      <div>
        <Typography color="error">Error: {error.message}</Typography>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return <div>No Data inserted yet</div>;
  }

  return (
    <Box sx={{ display: "grid", placeItems: "center" }}>
      <Typography variant="h6">Game Logs Chart</Typography>
      <LineChart
        xAxis={[{ data: fps?.data }]}
        series={[
          {
            data: elementsOnScreen?.data,
          },
        ]}
        width={1000}
        height={500}
      />

      <DeleteLogsButton {...refetch} />
    </Box>
  );
}
