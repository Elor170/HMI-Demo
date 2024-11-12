import { Typography } from "@mui/material";
import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  Tooltip,
  ResponsiveContainer,
   YAxis,
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
      (entry1[0] as unknown as number) - (entry2[0] as unknown as number)
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
        <Typography component="h2" style={{ color: "#ffffff" }}>
          No logs found for the selected log point
        </Typography>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="80%">
      <AreaChart
        data={currentDataArray}
        margin={{ top: 20, right: 30, left: 50, bottom: 40 }}
      >
        <Area
          type="monotone"
          dataKey="value"
          stroke="#1E90FF"
          fill="#1E90FF"
          strokeWidth={3}
          fillOpacity={0.4}
        />
        
        <CartesianGrid strokeDasharray="5 5" stroke="#444" />
        
        <XAxis
          dataKey="key"
          label={{ value: "Buffer Time", dy: 20, fill: '#ffffff' }}
          axisLine={{ stroke: '#888' }}
          tickLine={{ stroke: '#888' }}
          tick={{ fill: '#ffffff' }}
        />
        <YAxis
          label={{
            value: "Show Time", 
            angle: -90, 
            dy: -10, 
            dx: -20,  
            fill: '#ffffff',
          }}
          axisLine={{ stroke: '#888' }}
          tickLine={{ stroke: '#888' }}
          tick={{ fill: '#ffffff' }}
        />
        
        <Tooltip
          contentStyle={{
            backgroundColor: '#333',
            border: '1px solid #888',
            color: '#ffffff',
          }}
          labelStyle={{ color: '#1E90FF' }} // Matching blue color for the tooltip label
          itemStyle={{ color: '#ffffff' }}
          formatter={(value: number | string, _: string, props: any) => {
            return [
              `Show Time: ${value}`,
              `Buffer Time: ${props.payload.key}`,
            ];
          }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
