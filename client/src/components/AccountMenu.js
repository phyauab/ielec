import React, { useState } from "react";
import { Link } from "react-router-dom";

// Context
import { useUserContext } from "../context/UserContext";

// UI
import {
  Box,
  Divider,
  Typography,
  Menu,
  MenuItem,
  ListItemIcon,
} from "@mui/material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";

const AccountMenu = ({ anchorEl, open, onClose }) => {
  const { user, logoutUser } = useUserContext();
  if (!user) {
    return <></>;
  }

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      onClick={onClose}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: "visible",
          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
          mt: 1.5,
          "& .MuiAvatar-root": {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          "&:before": {
            content: '""',
            display: "block",
            position: "absolute",
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: "background.paper",
            transform: "translateY(-50%) rotate(45deg)",
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      <Box sx={{ p: 0.5 }}>
        <Typography align="center" fontWeight="bold">
          Welcome, {user.username}
        </Typography>
      </Box>
      <Divider />
      <MenuItem>
        <ListItemIcon>
          <AccountBoxIcon />
        </ListItemIcon>
        My Account
      </MenuItem>

      {/* if admin, show dashboard */}
      {user.isAdmin && (
        <MenuItem>
          <Link to="/dashboard">
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            Dashboard
          </Link>
        </MenuItem>
      )}
      <MenuItem
        onClick={() => {
          onClose();
          logoutUser();
        }}
      >
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        Logout
      </MenuItem>
    </Menu>
  );
};

export default AccountMenu;
