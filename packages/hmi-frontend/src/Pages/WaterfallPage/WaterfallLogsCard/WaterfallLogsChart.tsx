import { Box } from "@mui/material";
import { LineChart, Line } from "recharts";

interface LogsChartProps {
  data: WaterfallObject[];
}

export default function WaterfallLogsChart({ data }: LogsChartProps) {
  console.log(data);

  return (
    <Box>
      <LineChart width={400} height={400} data={data}>
        <Line type="monotone" dataKey="1000" stroke="#8884d8" />
      </LineChart>
    </Box>
  );
}
