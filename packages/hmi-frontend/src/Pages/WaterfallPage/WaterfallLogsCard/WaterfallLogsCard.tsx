import { Box, Button, Card, Paper } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import ky from "ky";
import { WATERFALL_BACKEND_URL } from "@/Helper/consts";
import { useQuery } from "react-query";
import downloadLogs from "@/Helper/downloadLogs";

export default function WaterfallLogsCard() {
  const { data } = useQuery<WaterfallObject[], Error>("logs", () =>
    ky.get(`${WATERFALL_BACKEND_URL}/logs`).json<WaterfallObject[]>()
  );

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
      <Box
        sx={{
          height: "60vh",
          minWidth: "80vw",
          overflow: "auto",
        }}
      ></Box>

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
  );
}
