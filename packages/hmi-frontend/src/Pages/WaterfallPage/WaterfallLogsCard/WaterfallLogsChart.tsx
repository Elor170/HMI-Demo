import { Typography } from "@mui/material";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

interface LogsChartProps {
  data: { [x: number]: number | undefined } | undefined;
}

export default function WaterfallLogsChart({ data }: LogsChartProps) {
  const currentDataArray = data
    ? Object.entries(data).map(([key, value]) => ({
        key: Number(key),
        value,
      }))
    : [];

  if (currentDataArray.length === 0) {
    return (
      <div>
        <Typography component="h2">
          No logs found for the selected log point
        </Typography>
      </div>
    );
  }

  return (
    <LineChart
      width={1000}
      height={600}
      style={{ outerHeight: "100%", outerWidth: "100%" }}
      data={currentDataArray}
    >
      <Line type="monotone" dataKey="value" stroke="#8884d8" />
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="key" label="buffer time" />
      <YAxis label="show time" />
      <Tooltip />
    </LineChart>
  );
}
