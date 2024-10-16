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

const arrangeData = (data: {
  [x: number]: number | undefined;
}): { key: number; value: number | undefined }[] => {
  const entries = Object.entries(data);
  const sortedEntries = entries.sort(
    (entry1, entry2) =>
      (entry1[0] as unknown as number) - (entry2[0] as unknown as number),
  );

  return sortedEntries.map(([key, value]) => ({
    key: Number(key),
    value,
  }));
};

export default function WaterfallLogsChart({ data }: LogsChartProps) {
  const currentDataArray = data ? arrangeData(data) : [];

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
