import React, { useState } from "react";
import { useUserContext } from "../../../context/UserContext";
import { Link } from "react-router-dom";

// components
import Loading from "../../Loading";

// Config
import drawerLinks from "./AdminDrawerConfig";

// UI
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import FaceIcon from "@mui/icons-material/Face";
import { deepOrange, grey } from "@mui/material/colors";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const AdminDrawer = ({ drawerWidth }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { logout, user } = useUserContext();
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
      {!user ? (
        <Loading />
      ) : (
        <Box
          sx={{
            m: 3,
            p: 2,
            display: "flex",
            bgcolor: grey[100],
            borderRadius: "15px",
          }}
        >
          <Avatar sx={{ bgcolor: deepOrange[500] }}>
            <FaceIcon />
          </Avatar>
          <Box
            sx={{
              mx: 2,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography sx={{ fontWeight: "bold" }} textAlign="center">
              {user.username}
            </Typography>
          </Box>
        </Box>
      )}
      <List>
        {drawerLinks.map((link, index) => {
          return (
            <ListItem
              button
              key={index}
              component={Link}
              to={link.url}
              selected={index === selectedIndex}
              onClick={(e) => setSelectedIndex(index)}
            >
              <ListItemIcon>{link.icon}</ListItemIcon>
              <ListItemText primary={link.title} />
            </ListItem>
          );
        })}
      </List>
      <Box
        sx={{
          m: 2,
          py: 1,
          px: 2,
        }}
      >
        <Button
          variant="contained"
          color="secondary"
          onClick={() => logout()}
          fullWidth
          startIcon={<ExitToAppIcon />}
          sx={{ borderRadius: "10px" }}
        >
          Logout
        </Button>
      </Box>
    </Drawer>
  );
};

export default AdminDrawer;
