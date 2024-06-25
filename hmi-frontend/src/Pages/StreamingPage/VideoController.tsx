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
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import ReactPlayer from "react-player";
import { useEffect, useState } from "react";

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
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      setFullScreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setFullScreen(false);
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const onVolumeBtnClick = () => {
    if (volume > 0) {
      setVolume(0);
      return;
    }

    setVolume(1);
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

        <Stack
          spacing={2}
          direction="row"
          minWidth="10%"
          maxWidth="25%"
          width="25%"
          alignItems="center"
        >
          <IconButton onClick={onVolumeBtnClick}>
            {volume > 0 ? <VolumeUpIcon /> : <VolumeOffIcon />}
          </IconButton>
          <Slider
            defaultValue={1}
            value={volume}
            onChange={(_, newValue) => setVolume(newValue as number)}
            min={0}
            max={1}
            step={0.01}
            size="small"
          />
        </Stack>

        <MenuItem sx={{position: 'absolute', right: 0}} onClick={handleFullScreen}>
          <IconButton>
            <FullscreenIcon />
          </IconButton>
        </MenuItem>
      </MenuList>
    </Box>
  );
}
