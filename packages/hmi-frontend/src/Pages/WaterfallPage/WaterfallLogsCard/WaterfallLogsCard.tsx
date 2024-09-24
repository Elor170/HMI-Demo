import {
  Button,
  ButtonGroup,
  Card,
  CircularProgress,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import ky from "ky";
import { WATERFALL_BACKEND_URL } from "@/Helper/consts";
import { useQuery } from "react-query";
import WaterfallLogsChart from "./WaterfallLogsChart";
import { sendingIntervalValues } from "hmi-helper/src/vars";
import { useState } from "react";
import LogsDownloadButton from "@/Components/LogsDownloadButton/LogsDownloadButton";

export default function WaterfallLogsCard() {
  const [selectedLogPoint, setSelectedLogPoint] =
    useState<SendingInterval>(100);

  const { data, isLoading, error } = useQuery<WaterfallLogs>("logs", () =>
    ky.get(`${WATERFALL_BACKEND_URL}/logs`).json<WaterfallLogs>()
  );

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
      component={Paper}
      sx={{
        boxShadow: 3,
        textAlign: "center",
        borderRadius: "5px",
        border: "2px solid white",
        maxHeight: "100vh",
        overflow: "auto",
      }}
    >
      <Typography component="h4">Buffer Interval</Typography>
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
        <WaterfallLogsChart data={data[selectedLogPoint]} />
      </Grid>

      <LogsDownloadButton data={data} fileName="waterfall_logs" />
    </Card>
  );
}
