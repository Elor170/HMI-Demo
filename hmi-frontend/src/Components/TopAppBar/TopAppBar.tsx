import { Paper } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import MenuButton from "./MenuButton";

export default function TopAppBar() {
  return (
    <Box component={Paper}>
      <AppBar position="static" sx={{ display: "flex", flexDirection: "row" }}>
        <MenuButton nav="/">Home</MenuButton>
        <MenuButton nav="/streamer">Streamer</MenuButton>
        <MenuButton nav="/waterfall">Waterfall</MenuButton>
        <MenuButton nav="/cube">Cube</MenuButton>
        <MenuButton nav="/map">Map</MenuButton>
        <MenuButton nav="/io-checks">IO-Checks</MenuButton>
      </AppBar>
    </Box>
  );
}
