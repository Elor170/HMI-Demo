import { STREAMER_SERVER } from "@/Helper/consts";
import {
  Card,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import ky from "ky";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import LogsTableCell from "./LogsTableCell";

export default function StreamLogsPage() {
  const { isLoading, error, data, refetch } = useQuery<StreamLogData[], Error>(
    "logs",
    () => ky.get(`${STREAMER_SERVER}/logs`).json<StreamLogData[]>()
  );

  if (error) {
    toast.error(error.message);
  }

  if (isLoading) {
    return <CircularProgress />;
  }

  if (!data) {
    return <div>No logs in database</div>;
  }

  return (
    <Card
      onClick={(e) => e.stopPropagation()}
      component={Paper}
      sx={{
        boxShadow: 3,
        textAlign: "center",
        borderRadius: "5px",
        border: "2px solid white",
      }}
    >
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Buffer Time (in ms)</TableCell>
              <TableCell>Buffer Timestamp</TableCell>
              <TableCell>Resolution</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.sort().map((log) => (
              <LogsTableCell
                key={log._id?.toString()}
                log={log}
                refetch={refetch}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}
