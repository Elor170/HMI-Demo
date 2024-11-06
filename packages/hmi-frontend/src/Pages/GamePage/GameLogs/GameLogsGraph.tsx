import {
  Line,
  LineChart,
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
    ...new Set(data.sort((a, b) => b.allObjects - a.allObjects)),
  ];

  return (
    <Box>
      <Typography variant="h4" sx={{ userSelect: "none" }}>
        Amount of objects on screen compared to FPS
      </Typography>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={formattedData}>
          <Line type="monotone" stroke="#8884d8" dataKey="allObjects" />
          <Line
            type="monotone"
            stroke="#82ca9d"
            dataKey="cubes"
            label="Cubes"
            strokeDasharray="5 5"
          />
          <Line
            type="monotone"
            stroke="#d32f2f"
            dataKey="spheres"
            label="Spheres"
            strokeDasharray="5 5"
          />
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="fps" label={{ value: "FPS", dy: 20 }} />

          <Tooltip />
          <Legend />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
}
