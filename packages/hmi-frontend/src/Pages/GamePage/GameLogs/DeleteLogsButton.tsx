import { GAME_SERVER } from "@/Helper/consts";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import ky from "ky";
import { toast } from "react-toastify";

interface DeleteLogsButtonProps {
  refetch?: () => void;
}

export default function DeleteLogsButton({ refetch }: DeleteLogsButtonProps) {
  const onButtonClick = async () => {
    const response = await ky.delete(GAME_SERVER + "/logs");

    if (!response.ok) {
      toast.error(response.statusText);
    }

    if (refetch) {
      refetch();
    }
  };

  return (
    <Button onClick={onButtonClick} variant="contained" color="warning">
      <DeleteIcon />
    </Button>
  );
}
