import React from "react";
import { useUserContext } from "../../../context/UserContext";
import { Link } from "react-router-dom";

// Config
import drawerLinks from "./AdminDrawerConfig";

// UI
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

const AdminDrawer = ({ drawerWidth }) => {
  const { logout } = useUserContext();
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar />
      <Divider />
      <List>
        {drawerLinks.map((link, index) => {
          return (
            <ListItem button key={index} component={Link} to={link.url}>
              <ListItemIcon>{link.icon}</ListItemIcon>
              <ListItemText primary={link.title} />
            </ListItem>
          );
        })}
      </List>
      <Divider />
      <Button variant="contained" color="secondary" onClick={() => logout()}>
        Logout
      </Button>
    </Drawer>
  );
};

export default AdminDrawer;
