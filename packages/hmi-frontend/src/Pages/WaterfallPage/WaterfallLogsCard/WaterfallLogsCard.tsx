import {
  Box,
  Button,
  Card,
  CircularProgress,
  Paper,
  Typography,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import ky from "ky";
import { WATERFALL_BACKEND_URL } from "@/Helper/consts";
import { useQuery } from "react-query";
import downloadLogs from "@/Helper/downloadLogs";
import WaterfallLogsChart from "./WaterfallLogsChart";

export default function WaterfallLogsCard() {
  const { data, isLoading, error } = useQuery<WaterfallObject[]>("logs", () =>
    ky.get(`${WATERFALL_BACKEND_URL}/logs`).json<WaterfallObject[]>()
  );

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error || !data) {
    return (
      <Typography variant="h2">
        Something went wrong while fetching logs. Please try again.
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        height: "60vh",
        minWidth: "80vw",
        overflow: "auto",
      }}
    >
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
        <WaterfallLogsChart data={data} />

        <Button
          onClick={() => downloadLogs(data, "waterfall_logs")}
          fullWidth
          color="error"
          variant="contained"
          startIcon={<DownloadIcon />}
        >
          Download
        </Button>
    </Card>
      </Box>
  );
}
