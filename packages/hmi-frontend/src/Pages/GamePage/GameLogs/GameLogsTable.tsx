import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { FormattedGameLogs } from "./GameLogs";

interface GameLogsTableProps {
  data: FormattedGameLogs[];
}

export default function GameLogsTable({ data }: GameLogsTableProps) {
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
      rows={data}
      columns={columns}
      getRowId={(row) => row._id}
    />
  );
}
