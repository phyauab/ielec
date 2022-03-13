import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Title = ({ title }) => {
  return (
    <Box
      sx={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        justifyContent: "center",
      }}
    >
      <Typography
        variant="h3"
        component="h3"
        sx={{ textAlign: "center", fontWeight: "bold" }}
      >
        {title}
      </Typography>
      <Box sx={{ background: "red", width: "100px", height: "5px" }}></Box>
    </Box>
  );
};

export default Title;
