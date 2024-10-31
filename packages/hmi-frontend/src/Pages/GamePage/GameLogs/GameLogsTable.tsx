import { DataGrid, GridColDef } from "@mui/x-data-grid";

interface GameLogsTableProps {
  data: GameLog[];
}

interface FormattedGameLogs {
  _id: string;
  spheres: number;
  cubes: number;
  fps: number;
  date: Date;
  secondsPlayed: string;
  allObjects: number;
}

export default function GameLogsTable({ data }: GameLogsTableProps) {
  const formattedData = data.map<FormattedGameLogs>((log) => ({
    _id: log._id!.toString(),
    spheres: log.spheres,
    cubes: log.cubes,
    fps: log.fps,
    date: log.date,
    secondsPlayed: log.secondsPlayed + "s",
    allObjects: log.spheres + log.cubes,
  }));

  const columns: GridColDef[] = [
    { field: "_id", headerName: "ID" },
    { field: "fps", headerName: "FPS" },
    { field: "spheres", headerName: "Spheres" },
    { field: "cubes", headerName: "Cubes" },
    { field: "allObjects", headerName: "Objects Amount" },
    { field: "secondsPlayed", headerName: "Time Played (Seconds)" },
    { field: "date", headerName: "Date" },
  ];

  return (
    <DataGrid
      rows={formattedData}
      columns={columns}
      getRowId={(row) => row._id}
    />
  );
}
