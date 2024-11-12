import {
  LineChart,
  Line,
  Tooltip,
  XAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { FormattedGameLogs } from "./GameLogs";
import { Box, Typography } from "@mui/material";

interface GameLogsGraphProps {
  data: FormattedGameLogs[];
}

export default function GameLogsGraph({ data }: GameLogsGraphProps) {
  const formattedData = [
    ...new Set([...data].sort((a, b) => b.allObjects - a.allObjects)),
  ];

  return (
    <Box>
      <Typography variant="h4" sx={{ userSelect: "none", color: "#ffffff" }}>
        Amount of objects on screen compared to FPS
      </Typography>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart
          data={formattedData}
          margin={{ top: 20, right: 30, left: 50, bottom: 40 }}
        >
          <Line
            type="monotone"
            dataKey="allObjects"
            stroke="#1E90FF"
            strokeWidth={3}
          />
          <Line
            type="monotone"
            dataKey="cubes"
            stroke="#FF6347"
            strokeWidth={3}
            strokeDasharray="5 5"
          />
          <Line
            type="monotone"
            dataKey="spheres"
            stroke="#32CD32"
            strokeWidth={3}
            strokeDasharray="5 5"
          />
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis
            dataKey="fps"
            label={{ value: "FPS", dy: 20, fill: "#ffffff" }}
            axisLine={{ stroke: "#888" }}
            tickLine={{ stroke: "#888" }}
            tick={{ fill: "#ffffff" }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#333",
              border: "1px solid #888",
              color: "#ffffff",
            }}
            labelStyle={{ color: "#1E90FF" }}
            itemStyle={{ color: "#ffffff" }}
            formatter={(value: number | string, name: string) => {
              return [`${name}: ${value}`];
            }}
          />
          <Legend
            wrapperStyle={{
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              padding: "10px",
              border: "1px solid #555",
            }}
            iconType="circle"
            iconSize={10}
            layout="vertical"
            verticalAlign="top"
            align="right"
            payload={[
              {
                value: "All Objects",
                type: "circle",
                id: "All Objects",
                color: "#1E90FF",
              },
              {
                value: "Cubes",
                type: "circle",
                id: "Cubes",
                color: "#FF6347",
              },
              {
                value: "Spheres",
                type: "circle",
                id: "Spheres",
                color: "#32CD32",
              },
            ]}
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
}
