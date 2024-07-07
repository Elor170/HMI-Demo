import { STREAMER_SERVER } from "@/Helper/consts";
import {
  Button,
  Card,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import ky from "ky";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import LogsTableCell from "./LogsTableCell";

export default function StreamLogsPage() {
  const { isLoading, error, data, refetch } = useQuery<StreamLogData[], Error>(
    "logs",
    () => ky.get(`${STREAMER_SERVER}/logs`).json<StreamLogData[]>()
  );

  const downloadLogs = () => {
    const fileName = "logs";
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const href = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = href;
    link.download = fileName + ".json";
    document.body.appendChild(link);
    link.click();

    // clean up "a" element & remove ObjectURL
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
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
        overflow: "auto",
        height: "50vh",
      }}
    >
      <TableContainer sx={{ overflowX: "initial" }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>
                <Typography fontWeight="bold">Log Date</Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight="bold">Buffer Time (in ms)</Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight="bold">Buffer Timestamp</Typography>
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data
              .sort(
                (a, b) =>
                  Date.parse(b.bufferStartDate.toString()) -
                  Date.parse(a.bufferStartDate.toString())
              )
              .map((log) => (
                <LogsTableCell
                  key={log._id?.toString()}
                  log={log}
                  refetch={refetch}
                />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        onClick={downloadLogs}
        fullWidth
        color="error"
        variant="contained"
        startIcon={<DownloadIcon />}
      >
        Download
      </Button>
    </Card>
  );
}
