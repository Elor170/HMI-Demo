import { AppBar, Box, Menu, MenuItem } from "@mui/material";
import ResolutionSelector from "./ResolutionSelector";

interface VideoControllerProps {
  setResolution: (newResolution: string) => void;
}

export default function VideoController({setResolution}: VideoControllerProps) {
  return (
    <Box>
      <Menu>

        <MenuItem>
          <ResolutionSelector setResolution={setResolution}/>
        </MenuItem>
      </Menu>
    </Box>
  )
}
