import { Button, IconButton } from "@mui/material";
import React, { useRef } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

interface LogsUploadButtonProps<T> {
  logs: T | null;
  onLogsUpload: (newLogs: T | null) => void;
  onBackToLiveLogsClick: (
    e?: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  fileExtension?: string;
}

/**
 * A generic component for a logs uploader button
 */
export default function LogsUploadButton<T>({
  logs,
  onLogsUpload,
  onBackToLiveLogsClick,
  fileExtension,
}: LogsUploadButtonProps<T>) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const str = new TextDecoder().decode(await e.target.files[0].arrayBuffer());
    onLogsUpload(JSON.parse(str) as T);
  };

  const onUploadClick = () => {
    if (!fileInputRef.current) return;

    fileInputRef.current.click();
  };

  if (logs) {
    return (
      <Button variant="outlined" onClick={onBackToLiveLogsClick}>
        Back to live logs
      </Button>
    );
  }

  return (
    <>
      <IconButton onClick={onUploadClick}>
        <CloudUploadIcon />
      </IconButton>
      <input
        onChange={onFileChange}
        multiple={false}
        type="file"
        hidden
        ref={fileInputRef}
        accept={`.${fileExtension || "generic_logs"}`}
      />
    </>
  );
}
