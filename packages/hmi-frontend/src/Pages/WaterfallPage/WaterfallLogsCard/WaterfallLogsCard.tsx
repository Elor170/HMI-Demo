import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import ky from "ky";
import { WATERFALL_BACKEND_URL } from "@/Helper/consts";
import { useQuery } from "react-query";
import WaterfallLogsChart from "./WaterfallLogsChart";
import { sendingIntervalValues } from "hmi-helper/src/vars";
import { useState } from "react";
import LogsDownloadButton from "@/Components/LogsDownloadButton/LogsDownloadButton";
import WaterfallLogsUploader from "./WaterfallLogsUploader";
import LiveTvIcon from "@mui/icons-material/LiveTv";

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
      }}
    >
      <Grid display="flex" justifyContent="center" position="relative">
        <Box sx={{ display: "grid", placeItems: "center" }}>
          <Typography component="h4">Buffer Interval</Typography>
        </Box>
        <WaterfallLogsUploader
          uploadedLogs={uploadedLogs}
          setUploadedLogs={setUploadedLogs}
        />
      </Grid>

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
      <Grid container alignItems="center" justifyContent="center">
        <WaterfallLogsChart
          data={
            uploadedLogs
              ? uploadedLogs[selectedLogPoint]
              : data[selectedLogPoint]
          }
        />
      </Grid>

      <LogsDownloadButton
        fileExtension={WATERFALL_LOGS_FILE_EXTENSION}
        data={data}
        fileName="waterfall_logs"
      />

      {uploadedLogs && (
        <Button
          onClick={() => setUploadedLogs(null)}
          variant="outlined"
          startIcon={<LiveTvIcon />}
        >
          Back To Live Logs
        </Button>
      )}
    </Card>
  );
}
