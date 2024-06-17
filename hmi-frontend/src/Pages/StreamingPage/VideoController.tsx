import { Box, IconButton, MenuItem, MenuList, Paper } from "@mui/material";
import ResolutionSelector from "./ResolutionSelector";
import { useState } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";

interface VideoControllerProps {
  setResolution: (newResolution: string) => void;
  videoRef: React.RefObject<HTMLVideoElement>;
}

export default function VideoController({
  setResolution,
  videoRef,
}: VideoControllerProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const onPressedPlay = () => {
    if (isPlaying) {
      videoRef.current?.play();
    } else {
      videoRef.current?.pause();
    }

    setIsPlaying(!isPlaying);
  };

  return (
    <Box sx={{ width: "100%" }} component={Paper}>
      <MenuList sx={{ display: "flex", flexDirection: "row" }}>
        <MenuItem>
          <IconButton onClick={onPressedPlay}>
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
