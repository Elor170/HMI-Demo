import router from "@/Helper/Router";
import { Button, ButtonProps } from "@mui/material";

interface MenuButtonProps extends ButtonProps {
  children: string | JSX.Element;
  nav?: string;
  hrefVal?: string;
}

export default function MenuButton({
  children,
  nav,
  hrefVal,
  ...props
}: MenuButtonProps) {
  const onClickEvent = () => {
    if (nav) {
      router.navigate(nav);
    }
  };

  return (
    <Button
      color="inherit"
      variant="text"
      onClick={onClickEvent}
      href={hrefVal}
      {...props}
    >
      {children}
    </Button>
  );
}
