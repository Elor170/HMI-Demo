import {
  Box,
  IconButton,
  MenuItem,
  MenuList,
  Paper,
  Slider,
  Stack,
} from "@mui/material";
import ResolutionSelector from "./ResolutionSelector";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeDownIcon from "@mui/icons-material/VolumeDown";
import ReactPlayer from "react-player";
import { useState } from "react";

interface VideoControllerProps {
  setResolution: (newResolution: string) => void;
  videoRef: React.RefObject<ReactPlayer>;
  isPlaying: boolean;
  setIsPlaying: (newState: boolean) => void;
  volume: number;
  setVolume: (newValue: number) => void;
}

export default function VideoController({
  setResolution,
  isPlaying,
  setIsPlaying,
  videoRef,
  volume,
  setVolume,
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
            {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
          </IconButton>
        </MenuItem>

        <ResolutionSelector setResolution={setResolution} />

        <MenuItem onClick={() => handleFullScreen}>
          <IconButton>
            <FullscreenIcon />
          </IconButton>
        </MenuItem>

        <MenuItem>
          <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
            <VolumeDownIcon />
            <Slider
              value={volume}
              onChange={(_, newValue) => setVolume((newValue as number))}
              min={0}
              max={100}
              size="small"
              step={0.01}
            />
            <VolumeUpIcon />
          </Stack>
        </MenuItem>
      </MenuList>
    </Box>
  );
}
