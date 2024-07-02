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
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ky from "ky";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { darkTheme } from "@/main";

export default function StreamLogsPage() {
  const { isLoading, error, data, refetch } = useQuery<StreamLogData[], Error>(
    "logs",
    () => ky.get(`${STREAMER_SERVER}/logs`).json<StreamLogData[]>()
  );

  const deleteLog = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: StreamLogData["_id"]
  ) => {
    e.stopPropagation();

    const response = await ky.post(`${STREAMER_SERVER}/logs/delete/${id}`);

    if (!response.ok) {
      toast.error(response.statusText);
      return;
    }

    refetch();
  };

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
            {data
              .sort()
              .map(
                ({
                  bufferStartDate,
                  bufferEndDate,
                  bufferTimestamp,
                  resolution,
                  _id,
                }) => (
                  <TableRow key={_id?.toString()}>
                    <TableCell>
                      <IconButton
                        sx={{ backgroundColor: darkTheme.palette.error.main }}
                        onClick={(e) => deleteLog(e, _id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      {new Date(bufferEndDate).getTime() -
                        new Date(bufferStartDate).getTime()}
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
