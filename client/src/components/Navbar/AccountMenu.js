import React from "react";
import { Link } from "react-router-dom";

// Context
import { useUserContext } from "../../context/UserContext";

// UI

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

// Icons
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";

const AccountMenu = ({ anchorEl, open, onClose }) => {
  const { user, logout } = useUserContext();
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
      <Link to="/account">
        <MenuItem>
          <ListItemIcon>
            <AccountBoxIcon />
          </ListItemIcon>
          <ListItemText>My Account</ListItemText>
        </MenuItem>
      </Link>

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
      {/* <Link to="/users/transactions">
        <MenuItem>
          <ListItemIcon>
            <ReceiptLongIcon />
          </ListItemIcon>
          Transactions
        </MenuItem>
      </Link> */}
      <MenuItem
        onClick={() => {
          onClose();
          logout();
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
