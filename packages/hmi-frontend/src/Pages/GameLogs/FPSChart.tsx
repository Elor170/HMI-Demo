import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend,
  Line,
} from "recharts";
import { GameLog } from "./GameLogs";

interface FPSChartProps {
  data: GameLog[];
}

interface AvgObjectsPerFPS {
  fps: number;
  averageObjects: number;
}

export default function FPSChart({ data }: FPSChartProps) {
  const calculateAverageObjectsPerFPS = (
    logs: GameLog[]
  ): AvgObjectsPerFPS[] => {
    // Step 1: Aggregate the total number of objects and count entries for each FPS value
    const fpsMap = new Map<number, { totalObjects: number; count: number }>();

    logs.forEach((log) => {
      const totalObjects = log.cubes + log.spheres;
      if (!fpsMap.has(log.fps)) {
        fpsMap.set(log.fps, { totalObjects: 0, count: 0 });
      }
      const entry = fpsMap.get(log.fps)!;
      entry.totalObjects += totalObjects;
      entry.count += 1;
    });

    // Step 2: Calculate the average number of objects per FPS
    const result: AvgObjectsPerFPS[] = [];
    fpsMap.forEach((value, fps) => {
      result.push({
        fps: fps,
        averageObjects: value.totalObjects / value.count,
      });
    });

    return result;
  };

  return (
    <ResponsiveContainer>
      <LineChart data={calculateAverageObjectsPerFPS(data)}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="fps"
          label={{ value: "FPS", position: "insideBottomRight", offset: 0 }}
        />
        <YAxis
          label={{
            value: "Average Objects",
            angle: -90,
            position: "insideLeft",
          }}
        />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="averageObjects"
          stroke="#8884d8"
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
