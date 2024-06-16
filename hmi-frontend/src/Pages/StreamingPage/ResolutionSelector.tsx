import React, { useState } from "react";
import AspectRatioIcon from "@mui/icons-material/AspectRatio";
import { IconButton, Menu, MenuItem, Typography } from "@mui/material";

interface ResolutionsSelectorProps {
  setResolution: (newValue: string) => void;
  allResolutions: string[];
}

export default function ResolutionSelector({
  setResolution,
  allResolutions,
}: ResolutionsSelectorProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <AspectRatioIcon />
      </IconButton>

      <Menu open={menuOpen} anchorEl={anchorEl} onClose={handleClose}>
        {allResolutions.map((resolution) => (
          <MenuItem
            disableRipple
            onClick={() => {
              setResolution(resolution);
              handleClose();
            }}
          >
            <Typography variant="body2">{resolution}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
