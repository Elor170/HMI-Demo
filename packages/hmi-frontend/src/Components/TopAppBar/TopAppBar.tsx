import { Button, Paper } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import MenuButton from "./MenuButton";
import { GAME_SERVER } from "@/Helper/consts";
import router from "../../Helper/Router";

export default function TopAppBar() {
  return (
    <Box component={Paper}>
      <AppBar position="static" sx={{ display: "flex", flexDirection: "row" }}>
        {router.map(({ path, label }) => (
          <MenuButton nav={path}>{label}</MenuButton>
        ))}

        <MenuButton hrefVal={GAME_SERVER}>Cube</MenuButton>
      </AppBar>
    </Box>
  );
}
