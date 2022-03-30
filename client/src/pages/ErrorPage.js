import React from "react";

// UI
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

const ErrorPage = () => {
  return (
    <Container>
      <Box
        sx={{
          minHeight: "86vh",
          height: "100%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h4">Oops... Someting is wrong.</Typography>
      </Box>
    </Container>
  );
};

export default ErrorPage;
