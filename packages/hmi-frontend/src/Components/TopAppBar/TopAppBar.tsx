import { Button, Paper } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import MenuButton from "./MenuButton";
import { GAME_SERVER } from "@/Helper/consts";
import { routerHelper } from "@/Helper/Router/Router";

export default function TopAppBar() {
  return (
    <AppBar position="static" sx={{ display: "flex", flexDirection: "row" }}>
      {routerHelper.map(({ label, path }) => (
        <MenuButton nav={path} key={path}>
          {label}
        </MenuButton>
      ))}

      <a href={GAME_SERVER}>
        <Button>3D-Test</Button>
      </a>
    </AppBar>
  );
}
