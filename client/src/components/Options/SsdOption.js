import React from "react";

// import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
// import CircleIcon from "@mui/icons-material/Circle";
import Typography from "@mui/material/Typography";

const SsdOption = ({ ssd, options, setOptions }) => {
  if (!options.ssd) return <></>;
  return (
    <Card
      onClick={() => setOptions({ ...options, ssd: ssd })}
      sx={{
        borderColor: options.ssd._id === ssd._id ? "#2b75e3" : "#C5C5C5",
        borderWidth: "1px",
        borderStyle: "solid",
        boxShadow: "none",
        borderRadius: "15px ",
        "&:hover": {
          borderColor: options.ssd._id === ssd._id ? "#2b75e3" : "#616161",
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
        <Typography variant="h5">
          {ssd.size}
          {ssd.unit}
        </Typography>
        <Typography variant="caption">+${ssd.additionalPrice}</Typography>
      </CardContent>
    </Card>
  );
};

export default SsdOption;
