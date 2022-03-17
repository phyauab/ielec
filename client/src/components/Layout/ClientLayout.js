import React, { useEffect, useRef } from "react";

import Box from "@mui/material/Box";
import Navbar from "../Navbar/Navbar";
// import Sidebar from "./components/Sidebar";
import Footer from "../Footer";

const ClientLayout = ({ children }) => {
  const navbarRef = useRef(null);
  const footerRef = useRef(null);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Navbar />
      <main>{children}</main>
      <Footer />
    </Box>
  );
};

export default ClientLayout;
