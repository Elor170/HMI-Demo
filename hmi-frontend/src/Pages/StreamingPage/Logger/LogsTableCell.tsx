import {
  TableCell,
  TableRow,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { darkTheme } from "@/main";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { STREAMER_SERVER } from "@/Helper/consts";
import ky from "ky";
import { toast } from "react-toastify";

interface LogsTableCellProps {
  log: StreamLogData;
  refetch: () => void;
}

export default function LogsTableCell({ log, refetch }: LogsTableCellProps) {
  const { _id, bufferStartDate, bufferEndDate, bufferTimestamp, resolution } =
    log;

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

  return (
    <TableRow>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
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
        </AccordionSummary>
        <AccordionDetails>
          <div>Temp</div>
        </AccordionDetails>
      </Accordion>
    </TableRow>
  );
}
