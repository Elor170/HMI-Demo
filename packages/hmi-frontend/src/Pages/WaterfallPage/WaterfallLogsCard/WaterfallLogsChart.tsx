import { Box, Button, ButtonGroup, Grid, Typography } from "@mui/material";
import { sendingIntervalValues } from "hmi-helper/src/vars";
import { useState } from "react";
import { LineChart, Line } from "recharts";

interface LogsChartProps {
  data: WaterfallLogs;
}

export default function WaterfallLogsChart({ data }: LogsChartProps) {
  const [selectedLogPoint, setSelectedLogPoint] =
    useState<SendingInterval>(100);

  const currentData = data[selectedLogPoint];

  return (
    <Box>
      <Grid>
        <Typography component="h4">Buffer Interval</Typography>
        <ButtonGroup variant="contained">
          {sendingIntervalValues.map((intervalValue) => (
            <Button
              key={intervalValue}
              onClick={() => setSelectedLogPoint(intervalValue)}
            >
              {intervalValue}
            </Button>
          ))}
        </ButtonGroup>
      </Grid>

      <LineChart width={400} height={400} data={data}>
        <Line type="monotone" dataKey="1000" stroke="#8884d8" />
      </LineChart>
    </Box>
  );
}
