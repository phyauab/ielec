import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
const AdminAppBar = ({ drawerWidth }) => {
  return (
    <AppBar
      position="fixed"
      sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
    >
      <Toolbar sx={{ justifyContent: "end" }}>
        <Stack direction="row" spacing={2}>
          <Avatar>A</Avatar>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default AdminAppBar;
