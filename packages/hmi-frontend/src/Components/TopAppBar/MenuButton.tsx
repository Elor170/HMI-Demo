import router from "@/Helper/Router/Router";
import { TypographyOwnProps, Typography } from "@mui/material";

interface MenuButtonProps extends TypographyOwnProps {
  children: string | JSX.Element;
  nav?: string;
}

export default function MenuButton({ children, nav, ...props }: MenuButtonProps) {
  const onClickEvent = () => {
    if (nav) {
      router.navigate(nav)
    }
  }

  return (
    <Typography
      onClick={onClickEvent}
      variant="h6"
      noWrap
      component="a"
      href="#app-bar-with-responsive-menu"
      sx={{
        mr: 2,
        display: { xs: "none", md: "flex" },
        fontFamily: "monospace",
        fontWeight: 700,
        color: "inherit",
        textDecoration: "none",
      }}
      {...props}
    >
      {children}
    </Typography>
  );
}
