import React from "react";

import Box from "@mui/material/Box";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer";

const ClientLayout = ({ children }) => {
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Navbar />
      <Box
        sx={{
          minHeight: "86vh",
          flex: 1,
        }}
      >
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

export default ClientLayout;
