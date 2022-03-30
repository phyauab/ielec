import React from "react";

// UI
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Title = ({ title }) => {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        {title}
      </Typography>
    </Box>
  );
};

export default Title;
