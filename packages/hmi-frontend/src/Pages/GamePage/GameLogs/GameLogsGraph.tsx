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
import { useState } from "react";

interface GameLogsGraphProps {
  data: FormattedGameLogs[];
}

export default function GameLogsGraph({ data }: GameLogsGraphProps) {
  const formattedData = [
    ...new Set([...data].sort((a, b) => b.allObjects - a.allObjects)),
  ];

  const [showAllObjects, setShowAllObjects] = useState(true);
  const [showCubes, setShowCubes] = useState(true);
  const [showSpheres, setShowSpheres] = useState(true);

  const handleLegendClick = (e: any) => {
    const { dataKey } = e;
    if (dataKey === "allObjects") {
      setShowAllObjects(!showAllObjects);
    } else if (dataKey === "cubes") {
      setShowCubes(!showCubes);
    } else if (dataKey === "spheres") {
      setShowSpheres(!showSpheres);
    }
  };

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
          {showAllObjects && (
            <Line
              type="monotone"
              dataKey="allObjects"
              stroke="#1E90FF"
              strokeWidth={3}
            />
          )}
          {showCubes && (
            <Line
              type="monotone"
              dataKey="cubes"
              stroke="#FF6347"
              strokeWidth={3}
              strokeDasharray="5 5"
            />
          )}
          {showSpheres && (
            <Line
              type="monotone"
              dataKey="spheres"
              stroke="#32CD32"
              strokeWidth={3}
              strokeDasharray="5 5"
            />
          )}

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
            style={{ userSelect: "none", cursor: "pointer" }}
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
            onClick={handleLegendClick}
            payload={[
              {
                value: "All Objects",
                type: showAllObjects ? "circle" : "line",
                id: "All Objects",
                color: "#1E90FF",
                dataKey: "allObjects",
                inactive: !showAllObjects,
              },
              {
                value: "Cubes",
                type: showCubes ? "circle" : "line",
                id: "Cubes",
                color: "#FF6347",
                dataKey: "cubes",
                inactive: !showCubes,
              },
              {
                value: "Spheres",
                type: showSpheres ? "circle" : "line",
                id: "Spheres",
                color: "#32CD32",
                dataKey: "spheres",
                inactive: !showSpheres,
              },
            ]}
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
}
