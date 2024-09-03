import { GAME_BACKEND_SERVER } from "@/Helper/consts";
import { useMount } from "@/Hooks/mountHooks";
import { Typography } from "@mui/material";
import ky from "ky";
import { useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";

interface GameLog {
  id: string;
  date: Date;
  fps: number;
  cubesInSpace: number;
  SpheresInSpace: number;
}

export default function GameLogs() {
  const [gameLogs, setGameLogs] = useState<GameLog[]>([]);

  const { isLoading, error, data, refetch } = useQuery<GameLog[], Error>(
    "logs",
    () => ky.get(`${GAME_BACKEND_SERVER}/logs`).json<GameLog[]>()
  );

  if (isLoading) {
    return (
      <div>
        <Typography>Loading, please wait...</Typography>
      </div>
    );
  }

  if (error) {
    <div>{error.message}</div>;
  }

  return <div>{data?.toString()}</div>;
}
