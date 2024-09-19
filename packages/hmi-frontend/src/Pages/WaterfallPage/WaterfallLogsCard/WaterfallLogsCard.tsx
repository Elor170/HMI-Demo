import { Box, Button, Card, Paper } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";

export default function WaterfallLogsCard() {
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
          minWidth: '80vw',
          overflow: "auto",
        }}
      ></Box>

      <Button
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
