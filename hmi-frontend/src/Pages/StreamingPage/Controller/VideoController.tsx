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
import useStreamer from "@/Store/StreamerStore";
import VideoTimestampSlider from "./VideoTimestampSlider";
import { useContext, useMemo } from "react";
import { VideoContainerRefContext } from "../StreamingPage";
import useFullscreen from "@/Hooks/useFullscreen";

export default function VideoController() {
  const { volume, setVolume, setIsPlaying, isPlaying } = useStreamer();

  const videoContainerRef = useContext(VideoContainerRefContext);
  const onVolumeBtnClick = () => {
    if (volume > 0) {
      setVolume(0);
      return;
    }

    setVolume(1);
  };

  const { isFullscreen, changeFullscreenState } =
    useFullscreen(videoContainerRef);

  const containerClass = useMemo(() => {
    if (isFullscreen) return "controller-fullscreen";

    return "";
  }, [isFullscreen]);

  return (
    <div className={containerClass}>
      <VideoTimestampSlider />
      <Box sx={{ width: "100%" }} component={Paper}>
        <MenuList sx={{ display: "flex", flexDirection: "row" }}>
          <MenuItem onClick={() => setIsPlaying(!isPlaying)}>
            <IconButton>
              {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
            </IconButton>
          </MenuItem>

          <ResolutionSelector />

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

          <MenuItem
            sx={{ position: "absolute", right: 0 }}
            onClick={changeFullscreenState}
          >
            <IconButton>
              <FullscreenIcon />
            </IconButton>
          </MenuItem>
        </MenuList>
      </Box>
    </div>
  );
}
