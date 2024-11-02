import {
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { FormattedGameLogs } from "./GameLogs";

interface GameLogsGraphProps {
  data: FormattedGameLogs[];
}

export default function GameLogsGraph({ data }: GameLogsGraphProps) {
  const formattedData = [
    ...new Set(data.sort((a, b) => b.allObjects - a.allObjects)),
  ];

  return (
    <LineChart data={formattedData} width={1000} height={600}>
      <Line type="monotone" stroke="#8884d8" dataKey="fps" />
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="allObjects" label="Objects Amount" />
      <YAxis label="FPS" />
      <Tooltip />
    </LineChart>
  );
}
