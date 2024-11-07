import LogsDownloadButton from "@/Components/LogsDownloadButton/LogsDownloadButton";
import { GAME_SERVER } from "@/Helper/consts";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import {
  AppBar,
  Box,
  Button,
  Card,
  CircularProgress,
  Grid,
  Switch,
  Typography,
} from "@mui/material";
import ky from "ky";
import { useState } from "react";
import { useQuery } from "react-query";
import DeleteLogsButton from "./DeleteLogsButton";
import GameLogsGraph from "./GameLogsGraph";
import GameLogsTable from "./GameLogsTable";
import UploadLogsButton from "./UploadLogsButton";
import { useMemo } from "react";

export const GAME_LOGS_EXTENSION = "game_logs";

export interface FormattedGameLogs {
  _id: string;
  spheres: number;
  cubes: number;
  fps: number;
  date: Date;
  secondsPlayed: string;
  allObjects: number;
}

export default function GameLogs() {
  const [currentPage, setCurrentPage] = useState<"Table" | "Graph">("Table");
  const [uploadedLogs, setUploadedLogs] = useState<GameLog[] | null>(null);

  const switchPage = () => {
    if (currentPage === "Graph") {
      setCurrentPage("Table");
      return;
    }
    setCurrentPage("Graph");
  };

  const { isLoading, error, isError, data, refetch } = useQuery<
    GameLog[],
    Error
  >("logs", () => ky.get(GAME_SERVER + "/logs").json<GameLog[]>());

  if (isLoading) {
    return <CircularProgress />;
  }

  if (isError) {
    return <Typography>{error.message}</Typography>;
  }

  if (!data || data.length === 0) {
    return <Typography>No logs found in database</Typography>;
  }

  // const formattedData = data.map<FormattedGameLogs>((log) => ({
  //   _id: log._id!.toString(),
  //   spheres: log.spheres,
  //   cubes: log.cubes,
  //   fps: log.fps,
  //   date: log.date,
  //   secondsPlayed: log.secondsPlayed + "s",
  //   allObjects: log.spheres + log.cubes,
  // }));

  const formattedData = useMemo(() => {
    let formattedLogs: FormattedGameLogs[];

    if (uploadedLogs) {
      formattedLogs = uploadedLogs as unknown as FormattedGameLogs[];
    } else {
      formattedLogs = data as unknown as FormattedGameLogs[];
    }

    return formattedLogs.map((log) => {
      log.allObjects = log.cubes + log.spheres;
      log._id = log._id.toString();
      return log;
    });
  }, [data, uploadedLogs]);

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
      <AppBar
        position="sticky"
        sx={{ height: "2rem", display: "grid", userSelect: "none" }}
      >
        <Box width="100%" display="flex" position="relative">
          <DeleteLogsButton refetch={refetch} />
          <Button onClick={() => refetch()}>
            <AutorenewIcon />
          </Button>
          <LogsDownloadButton
            data={data}
            fileName="logs"
            fileExtension={GAME_LOGS_EXTENSION}
            onlyShowIcon
          />
          <Grid
            display="flex"
            justifyContent="center"
            position="absolute"
            right={0}
          >
            <Typography component="span">Table</Typography>
            <Switch
              size="small"
              checked={currentPage === "Graph"}
              onClick={switchPage}
            />
            <Typography>Graph</Typography>
          </Grid>

          <UploadLogsButton
            uploadedLogs={uploadedLogs}
            setUploadedLogs={setUploadedLogs}
            refetch={refetch}
          />
        </Box>
      </AppBar>

      {currentPage === "Table" ? (
        <GameLogsTable data={formattedData} />
      ) : (
        <GameLogsGraph data={formattedData} />
      )}
    </Card>
  );
}
