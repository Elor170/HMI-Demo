import { Paper } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import MenuButton from "./MenuButton";
import { GAME_SERVER } from "@/Helper/consts";

export default function TopAppBar() {

  return (
    <Box component={Paper}>
      <AppBar position="static" sx={{ display: "flex", flexDirection: "row" }}>
        <MenuButton nav="/">Home</MenuButton>
        <MenuButton nav="/streamer">Streamer</MenuButton>
        <MenuButton nav="/waterfall">Waterfall</MenuButton>
        <MenuButton nav="/map">Map</MenuButton>
        <MenuButton nav="/io-checks">IO-Checks</MenuButton>

        <a style={{ color: 'inherit', textDecoration: 'inherit' }} href={GAME_SERVER}>
          <MenuButton>Cube</MenuButton>
        </a>
      </AppBar>
    </Box>
  );
}
