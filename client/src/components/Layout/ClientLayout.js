import React from "react";

import Box from "@mui/material/Box";
import Navbar from "../Navbar/Navbar";
// import Sidebar from "./components/Sidebar";
import Footer from "../Footer";

const ClientLayout = ({ children }) => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Navbar />
      <Box
        sx={{
          minHeight: "100vh",
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
