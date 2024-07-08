import React, { useContext, useState } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import { IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { RESOLUTIONS } from "@/Helper/consts";
import useStreamer from "@/Store/StreamerStore";
import { VideoContainerRefContext, VideoRefContext } from "../StreamingPage";
import useFullscreen from "@/Hooks/useFullscreen";

interface ResolutionSelectorProps {
  controllerRef: React.RefObject<HTMLDivElement>;
}

export default function ResolutionSelector({
  controllerRef,
}: ResolutionSelectorProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const videoContainerRef = useContext(VideoContainerRefContext);
  const menuOpen = Boolean(anchorEl);
  const { setTimestamp, setResolution } = useStreamer();
  const { isFullscreen } = useFullscreen(videoContainerRef);
  const videoRef = useContext(VideoRefContext);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleResolutionChange = (newResolution: string) => {
    if (videoRef.current) {
      setTimestamp(videoRef.current.getCurrentTime() || 0);
    }

    setResolution(newResolution);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <SettingsIcon />
      </IconButton>

      <Menu
        container={isFullscreen ? controllerRef.current : null}
        sx={{ zIndex: 5 }}
        open={menuOpen}
        anchorEl={anchorEl}
        onClose={handleClose}
      >
        {RESOLUTIONS.map((res) => (
          <MenuItem
            key={res}
            disableRipple
            onClick={() => {
              handleResolutionChange(res);
              handleClose();
            }}
          >
            <Typography variant="body2">{res}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
