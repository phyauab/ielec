import React from "react";

// UI
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import MemoryIcon from "@mui/icons-material/Memory";
import SdStorageIcon from "@mui/icons-material/SdStorage";
import FaceIcon from "@mui/icons-material/Face";

// Icons
import ColorLensIcon from "@mui/icons-material/ColorLens";

const CartItemChips = ({ options }) => {
  const getIcon = (type) => {
    switch (type) {
      case "Color":
        return <ColorLensIcon />;
      case "Ram":
        return <MemoryIcon />;
      case "Storage":
        return <SdStorageIcon />;
      default:
        return null;
    }
  };

  const getLabel = (option) => {
    switch (option.__t) {
      case "Color":
        return option.name;
      case "Ram":
        return `${option.size}${option.unit}`;
      case "Storage":
        return `${option.size}${option.unit}`;
      default:
        return "";
    }
  };

  return (
    <Stack direction="row" spacing={1}>
      {options.map((option, index) => {
        return (
          <Chip
            key={index}
            icon={getIcon(option.__t)}
            label={getLabel(option)}
            variant="outlined"
            size="small"
          />
        );
      })}
    </Stack>
  );
};

export default CartItemChips;
