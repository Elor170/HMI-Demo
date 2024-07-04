import { Box, Collapse, Grid, Typography } from "@mui/material";
import { format } from "date-fns";

interface TableMoreDetailsProps {
  log: StreamLogData;
  open?: boolean;
}
export default function TableMoreDetails({
  log: { resolution, bufferStartDate, bufferEndDate, bufferTimestamp },
  open,
}: TableMoreDetailsProps) {
  const formatDate = (date: string | number | Date) =>
    format(date, "PP HH:mm:ss.SS");

  const dataPoints: { title: string; content: string }[] = [
    { title: "Resolution:", content: resolution },
    { title: "Start Date:", content: formatDate(bufferStartDate) },
    { title: "End Date:", content: formatDate(bufferEndDate) },
    { title: "Buffer Timestamp:", content: bufferTimestamp + "s" },
    {
      title: "Buffer Span:",
      content: `${
        new Date(bufferEndDate).getTime() - new Date(bufferStartDate).getTime()
      }ms`,
    },
  ];

  return (
    <Collapse in={open} timeout="auto" unmountOnExit>
      <Box sx={{ margin: 1 }}>
        <Typography variant="h6" gutterBottom component="div">
          More Details
        </Typography>

        {dataPoints.map(({ title, content }) => (
          <Grid key={title}>
            <Typography fontWeight="bold" variant="body1" component="span">
              {title + " "}
            </Typography>

            <Typography variant="body1" component="span">
              {content}
            </Typography>
          </Grid>
        ))}
      </Box>
    </Collapse>
  );
}
