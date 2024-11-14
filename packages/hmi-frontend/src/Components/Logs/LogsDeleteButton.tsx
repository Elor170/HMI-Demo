import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, IconButtonProps } from "@mui/material";
import ky from "ky";
import { toast } from "react-toastify";

interface LogsDeleteButtonProps extends IconButtonProps {
  url: string;
  refetch?: () => void;
}

export default function LogsDeleteButton(props: LogsDeleteButtonProps) {
  const { url, refetch, ...iconButtonProps } = props;

  const onButtonClick = async () => {
    const response = await ky.delete(url);
    if (!response.ok) {
      toast.error(response.statusText);
    }

    if (refetch) {
      refetch();
    }
  };

  return (
    <IconButton onClick={onButtonClick} {...iconButtonProps}>
      <DeleteIcon />
    </IconButton>
  );
}
