import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import MenuButton from "./MenuButton";
import { routerData } from "../../Helper/Router";
import { TbSubmarine } from "react-icons/tb";
import { Typography } from "@mui/material";
import styles from "./TopAppBar.module.scss";
import { useMemo } from "react";

export default function TopAppBar() {
  const menuButtons = useMemo<JSX.Element[]>(() => {
    const menuButtons: JSX.Element[] = [];

    routerData.forEach((router) => {
      if (router.label) {
        menuButtons.push(
          <MenuButton key={router.path} nav={router.path}>
            {router.label}
          </MenuButton>
        );
      }
    });

    return menuButtons;
  }, []);

  return (
    <Box sx={{ userSelect: "none", position: "relative" }}>
      <AppBar position="static" sx={{ display: "flex", flexDirection: "row" }}>
        <MenuButton nav="/" className={styles.title} color="inherit">
          <TbSubmarine className={styles.appIcon} />
          <Typography className={styles.centerVer} variant="h6">
            HMI Demo
          </Typography>
        </MenuButton>

        {menuButtons}
      </AppBar>
    </Box>
  );
}
