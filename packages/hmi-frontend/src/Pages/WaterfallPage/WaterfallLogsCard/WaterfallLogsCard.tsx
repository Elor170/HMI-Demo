import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CircularProgress,
  Typography,
} from "@mui/material";
import ky from "ky";
import { WATERFALL_BACKEND_URL } from "@/Helper/consts";
import { useQuery } from "react-query";
import WaterfallLogsChart from "./WaterfallLogsChart";
import { sendingIntervalValues } from "hmi-helper/src/vars";
import { useState } from "react";
import LogsDownloadButton from "@/Components/Logs/LogsDownloadButton";
import LogsUploadButton from "@/Components/Logs/LogsUploadButton";

export const WATERFALL_LOGS_FILE_EXTENSION = "wfl";

export default function WaterfallLogsCard() {
  const [selectedLogPoint, setSelectedLogPoint] =
    useState<SendingInterval>(100);

  const [uploadedLogs, setUploadedLogs] = useState<WaterfallLogs | null>(null);

  const { data, isLoading, error, refetch } = useQuery<WaterfallLogs>({
    queryKey: ["waterfall-logs"],
    queryFn: () =>
      ky
        .get(`${WATERFALL_BACKEND_URL}/logs`, { timeout: 60_000 })
        .json<WaterfallLogs>(),
    staleTime: Infinity,
    cacheTime: 0,
    refetchOnWindowFocus: false,
    retry: false,
  });

  const onBackToLiveLogs = () => {
    setUploadedLogs(null);
    refetch();
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error || !data) {
    return (
      <Typography variant="h2">
        Something went wrong while fetching logs. Please try again.
      </Typography>
    );
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
      }}
    >
      <Box position="relative" display="grid" sx={{ placeItems: "center" }}>
        <Typography variant="h4">Logs</Typography>

        <Box display="flex">
          <LogsUploadButton
            logs={uploadedLogs}
            onLogsUpload={setUploadedLogs}
            onBackToLiveLogsClick={onBackToLiveLogs}
            fileExtension={WATERFALL_LOGS_FILE_EXTENSION}
          />
          <LogsDownloadButton
            fileExtension={WATERFALL_LOGS_FILE_EXTENSION}
            data={data}
            fileName="waterfall_logs"
          />
        </Box>

        <Box sx={{ display: "flex", placeItems: "center" }}>
          <Typography marginRight=".5rem" variant="body1">
            Buffer Interval:
          </Typography>
          <ButtonGroup variant="outlined">
            {sendingIntervalValues.map((intervalValue) => (
              <Button
                key={intervalValue}
                onClick={() => setSelectedLogPoint(intervalValue)}
              >
                {intervalValue}
              </Button>
            ))}
          </ButtonGroup>
        </Box>
      </Box>

      <WaterfallLogsChart
        data={
          uploadedLogs ? uploadedLogs[selectedLogPoint] : data[selectedLogPoint]
        }
      />
    </Card>
  );
}
