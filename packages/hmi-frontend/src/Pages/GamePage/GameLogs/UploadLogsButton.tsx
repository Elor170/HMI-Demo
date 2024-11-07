import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Button, IconButton } from "@mui/material";
import { useRef } from "react";
import { GAME_LOGS_EXTENSION } from "./GameLogs";

interface UploadLogsButtonProps {
  uploadedLogs: GameLog[] | null;
  setUploadedLogs: (newState: GameLog[] | null) => void;
  refetch: () => void;
}

export default function UploadLogsButton({
  uploadedLogs,
  setUploadedLogs,
  refetch,
}: UploadLogsButtonProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const str = new TextDecoder().decode(await e.target.files[0].arrayBuffer());
    setUploadedLogs(JSON.parse(str) as GameLog[]);
  };

  const onUploadClick = () => {
    if (!fileInputRef.current) return;

    fileInputRef.current.click();
  };

  const onShowLiveLogsClick = () => {
    setUploadedLogs(null);
    refetch();
  };

  // Removes the selected file from the input ref in case the user wants to watch the live logs
  if (fileInputRef.current && !uploadedLogs) {
    fileInputRef.current.value = "";
  }

  if (uploadedLogs) {
    return <Button onClick={onShowLiveLogsClick}>Show Live Logs</Button>;
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
        accept={`.${GAME_LOGS_EXTENSION}`}
      />
    </>
  );
}
