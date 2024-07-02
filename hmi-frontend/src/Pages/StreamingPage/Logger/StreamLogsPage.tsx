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
import { format } from "date-fns";

export default function StreamLogsPage() {
  const { isLoading, error, data } = useQuery<StreamLogData[], Error>(
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
    <Card component={Paper} sx={{ boxShadow: 3 }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Buffer Time (in ms)</TableCell>
              <TableCell>Buffer Timestamp</TableCell>
              <TableCell>Resolution</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map(
              ({
                bufferStartDate,
                bufferEndDate,
                bufferTimestamp,
                resolution,
                _id,
              }) => (
                <TableRow key={_id?.toString()}>
                  <TableCell>{format(bufferStartDate, "ss:ms")}</TableCell>
                  <TableCell>{format(bufferEndDate, "ss:ms")}</TableCell>
                  <TableCell>
                    {new Date(bufferEndDate).getDate() -
                      new Date(bufferStartDate).getDate()}
                    ms
                  </TableCell>
                  <TableCell>{bufferTimestamp}</TableCell>
                  <TableCell>{resolution}</TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}
