import React from "react";

// UI
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Box from "@mui/material/Box";

const BreadCrumb = ({ breadcrumbs }) => {
  return (
    <Box sx={{ py: "2rem" }}>
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        {breadcrumbs}
      </Breadcrumbs>
    </Box>
  );
};

export default BreadCrumb;
