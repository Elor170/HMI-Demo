import { GAME_BACKEND_SERVER } from "@/Helper/consts";
import { Typography, CircularProgress } from "@mui/material";
import ky from "ky";
import { useQuery } from "react-query";
import DeleteLogsButton from "./DeleteLogsButton";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import FPSChart from "./FPSChart";

export interface GameLog {
  id: string;
  date: Date;
  fps: number;
  cubes: number;
  spheres: number;
}

export default function GameLogs() {
  const { isLoading, error, data } = useQuery<GameLog[], Error>("logs", () =>
    ky.get(`${GAME_BACKEND_SERVER}/logs`).json<GameLog[]>()
  );

  if (isLoading) {
    return <CircularProgress />;
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
    <Card className="dark w-96 h-max items-center grid">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <FPSChart data={data} />
      </CardContent>
      <CardFooter>
        <DeleteLogsButton />
      </CardFooter>
    </Card>
  );
}
