import { TableCell, TableRow, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { STREAMER_SERVER, darkTheme } from "@/Helper/consts";
import ky from "ky";
import { toast } from "react-toastify";
import { useState } from "react";
import TableMoreDetails from "./TableMoreDetails";
import { format } from "date-fns";

interface LogsTableCellProps {
  log: StreamLogData;
  refetch: () => void;
}

export default function LogsTableCell({ log, refetch }: LogsTableCellProps) {
  const { _id, bufferStartDate, bufferEndDate, bufferTimestamp } = log;

  const [showDetails, setShowDetails] = useState(false);

  const deleteLog = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: StreamLogData["_id"],
  ) => {
    e.stopPropagation();

    const response = await ky.delete(`${STREAMER_SERVER}/logs/delete/${id}`);

    if (!response.ok) {
      toast.error(response.statusText);
      return;
    }

    refetch();
  };

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton
            sx={{ backgroundColor: darkTheme.palette.error.main }}
            onClick={(e) => deleteLog(e, _id)}
          >
            <DeleteIcon />
          </IconButton>
        </TableCell>

        <TableCell>{format(bufferStartDate, "HH:mm:ss.SS")}</TableCell>

        <TableCell>
          {new Date(bufferEndDate).getTime() -
            new Date(bufferStartDate).getTime()}
          ms
        </TableCell>
        <TableCell>{bufferTimestamp}s</TableCell>

        <TableCell>
          <IconButton onClick={() => setShowDetails(!showDetails)}>
            {showDetails ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <TableMoreDetails log={log} open={showDetails} />
        </TableCell>
      </TableRow>
    </>
  );
}
