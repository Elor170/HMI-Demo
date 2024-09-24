import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import MenuButton from "./MenuButton";
import { GAME_SERVER } from "@/Helper/consts";
import { routerData } from "../../Helper/Router";

export default function TopAppBar() {
  return (
    <Box sx={{ userSelect: "none" }}>
      <AppBar position="static" sx={{ display: "flex", flexDirection: "row" }}>
        {routerData.map(({ path, label }) => (
          <MenuButton key={path} nav={path}>
            {label}
          </MenuButton>
        ))}

        <MenuButton hrefVal={GAME_SERVER}>Cube</MenuButton>
      </AppBar>
    </Box>
  );
}
