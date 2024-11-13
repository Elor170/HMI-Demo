import { Button, IconButton, SxProps } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";

interface DownloadButtonProps {
  data: unknown;
  fileName: string;
  sx?: SxProps;
  fileExtension?: string;
}

export default function LogsDownloadButton({
  data,
  fileName,
  sx,
  fileExtension,
}: DownloadButtonProps) {
  function downloadLogs<T>(data: T, fileName: string) {
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const href = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = href;
    link.download = fileName + "." + (fileExtension || "json");
    document.body.appendChild(link);
    link.click();

    // clean up "a" element & remove ObjectURL
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  }

  return (
    <IconButton
      sx={sx}
      color="error"
      onClick={() => downloadLogs(data, fileName)}
    >
      <DownloadIcon />
    </IconButton>
  );
}
