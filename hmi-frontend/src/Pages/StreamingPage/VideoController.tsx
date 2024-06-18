import { Box, IconButton, MenuItem, MenuList, Paper } from "@mui/material";
import ResolutionSelector from "./ResolutionSelector";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import ReactPlayer from "react-player";
import { useState } from "react";

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
  videoRef,
}: VideoControllerProps) {
  const [fullScreen, setFullScreen] = useState(false);

  const handleFullScreen = () => {
    if (!fullScreen) {
      // Enter fullscreen
      if (videoRef.current) {
        const player = videoRef.current.getInternalPlayer();
        if (player) {
          if (player.requestFullscreen) {
            player.requestFullscreen();
          } else if (player.webkitRequestFullscreen) {
            /* Safari */
            player.webkitRequestFullscreen();
          } else if (player.msRequestFullscreen) {
            /* IE11 */
            player.msRequestFullscreen();
          }
          setFullScreen(true);
        }
      }
    } else {
      // Exit fullscreen
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      setFullScreen(false);
    }
  };

  return (
    <Box sx={{ width: "100%" }} component={Paper}>
      <MenuList sx={{ display: "flex", flexDirection: "row" }}>
        <MenuItem onClick={() => setIsPlaying(!isPlaying)}>
          <IconButton>
            {isPlaying ? <PlayArrowIcon /> : <PauseIcon />}
          </IconButton>
        </MenuItem>

        <ResolutionSelector setResolution={setResolution} />

        <MenuItem onClick={() => handleFullScreen}>
          <IconButton>
            <FullscreenIcon />
          </IconButton>
        </MenuItem>
      </MenuList>
    </Box>
  );
}
