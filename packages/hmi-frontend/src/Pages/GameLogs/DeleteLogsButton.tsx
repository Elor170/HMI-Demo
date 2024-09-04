import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ky from "ky";
import { GAME_BACKEND_SERVER } from "@/Helper/consts";
import { toast } from "react-toastify";

interface DeleteLogsButtonComponents {
  refetch?: () => void;
}

export default function DeleteLogsButton({
  refetch,
}: DeleteLogsButtonComponents) {
  const onClick = async () => {
    const response = await ky.delete(`${GAME_BACKEND_SERVER}/logs`);

    if (response.ok) {
      toast.success("Logs deleted successfully");
    } else {
      toast.error("Something went wrong while deleting logs. Please try again");
    }

    if (refetch) {
      refetch();
    }
  };

  return (
    <Button
      onClick={onClick}
      variant="contained"
      color="error"
      endIcon={<DeleteIcon />}
    >
      Delete Logs
    </Button>
  );
}
