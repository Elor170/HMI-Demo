import { Box, IconButton, MenuItem, MenuList, Paper } from "@mui/material";
import ResolutionSelector from "./ResolutionSelector";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import ReactPlayer from "react-player";

interface VideoControllerProps {
  setResolution: (newResolution: string) => void;
  videoRef: React.RefObject<ReactPlayer>;
  isPlaying: boolean;
  setIsPlaying: (newState: boolean) => void;
}

export default function VideoController({
  setResolution,
  isPlaying,
  setIsPlaying,
}: VideoControllerProps) {
  return (
    <Box sx={{ width: "100%" }} component={Paper}>
      <MenuList sx={{ display: "flex", flexDirection: "row" }}>
        <MenuItem>
          <IconButton onClick={() => setIsPlaying(!isPlaying)}>
            {isPlaying ? <PlayArrowIcon /> : <PauseIcon />}
          </IconButton>
        </MenuItem>

        <MenuItem>
          <ResolutionSelector setResolution={setResolution} />
        </MenuItem>
      </MenuList>
    </Box>
  );
}
