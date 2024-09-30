import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { IconButton } from "@mui/material";
import { useRef } from "react";
import { WATERFALL_LOGS_FILE_EXTENSION } from "./WaterfallLogsCard";

interface WaterfallLogsUploaderProps {
  uploadedLogs: WaterfallLogs | null;
  setUploadedLogs: (newState: WaterfallLogs | null) => void;
}

export default function WaterfallLogsUploader({
  setUploadedLogs,
  uploadedLogs,
}: WaterfallLogsUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const str = new TextDecoder().decode(await e.target.files[0].arrayBuffer());
    setUploadedLogs(JSON.parse(str) as WaterfallLogs);
  };

  const onUploadClick = () => {
    if (!fileInputRef.current) return;

    fileInputRef.current.click();
  };

  // Removes the selected file from the input ref in case the user wants to watch the live logs
  if (fileInputRef.current && !uploadedLogs) {
    fileInputRef.current.value = "";
  }

  return (
    <IconButton
      onClick={onUploadClick}
      size="medium"
      sx={{
        position: "absolute",
        left: 0,
        transform: "translateY(-50%)",
        top: "50%",
      }}
    >
      <CloudUploadIcon fontSize="inherit" />

      <input
        onChange={onFileChange}
        multiple={false}
        type="file"
        hidden
        ref={fileInputRef}
        accept={`.${WATERFALL_LOGS_FILE_EXTENSION}`}
      />
    </IconButton>
  );
}
