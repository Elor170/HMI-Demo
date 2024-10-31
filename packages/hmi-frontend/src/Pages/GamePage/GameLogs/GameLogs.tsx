import { GAME_SERVER } from "@/Helper/consts";
import {
  AppBar,
  Card,
  CircularProgress,
  Grid,
  Switch,
  Typography,
} from "@mui/material";
import ky from "ky";
import { useState } from "react";
import { useQuery } from "react-query";
import GameLogsTable from "./GameLogsTable";

export default function GameLogs() {
  const [currentPage, setCurrentPage] = useState<"Table" | "Graph">("Table");

  const switchPage = () => {
    if (currentPage === "Graph") {
      setCurrentPage("Table");
      return;
    }
    setCurrentPage("Graph");
  };

  const { isLoading, error, isError, data } = useQuery<GameLog[], Error>(
    "logs",
    () => ky.get(GAME_SERVER + "/logs").json<GameLog[]>()
  );

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError) {
    return <Typography>{error.message}</Typography>;
  }

  if (!data) {
    return <Typography>No logs found in database</Typography>;
  }

  return (
    <Card
      onClick={(e) => e.stopPropagation()}
      sx={{
        boxShadow: 3,
        textAlign: "center",
        borderRadius: "5px",
        border: "2px solid white",
        maxHeight: "100vh",
        overflow: "auto",
        width: "80%",
        height: "90%",
        display: "grid",
      }}
    >
      <AppBar position="sticky" sx={{ height: "15%", display: "grid" }}>
        <Typography variant="h4">Game Logs</Typography>

        <Grid display="flex" justifyContent="center">
          <Typography>Table</Typography>
          <Switch checked={currentPage === "Graph"} onClick={switchPage} />
          <Typography>Graph</Typography>
        </Grid>
      </AppBar>

      {currentPage === "Table" && <GameLogsTable data={data} />}
    </Card>
  );
}
