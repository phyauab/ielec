import React from "react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CircleIcon from "@mui/icons-material/Circle";
import Typography from "@mui/material/Typography";

const ColorOption = ({ color, options, setOptions }) => {
  return (
    <Card
      onClick={() => setOptions({ ...options, color: color._id })}
      sx={{
        borderColor: options.color == color._id ? "#2b75e3" : "#C5C5C5",
        borderWidth: "1px",
        borderStyle: "solid",
        boxShadow: "none",
        borderRadius: "15px ",
        "&:hover": {
          borderColor: options.color == color._id ? "#2b75e3" : "#616161",
          cursor: "pointer",
        },
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircleIcon sx={{ color: `${color.colorCode}` }} />
        <Typography variant="caption">{color.name}</Typography>
      </CardContent>
    </Card>
  );
};

export default ColorOption;
