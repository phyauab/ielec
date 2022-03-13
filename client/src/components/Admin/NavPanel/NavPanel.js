import React, { useState } from "react";
import styled from "styled-components";
import { Link, Switch, Route, useRouteMatch, Redirect } from "react-router-dom";
import InputForm from "../InputForm";

// Context
import { useUserContext } from "../../../context/UserContext";

// UI
import {
  Box,
  Button,
  Drawer,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";

// Config
import { NavPanelLinks } from "./NavPanelConfig";

// Icon
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import Logout from "@mui/icons-material/Logout";

// Utils
import capitalize from "@mui/utils/capitalize";

// color
import { grey } from "@mui/material/colors";

const NavPanel_WIDTH = 280;

const NavPanel = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { user, logoutUser } = useUserContext();

  const handleListItemClick = (e, index) => {
    setSelectedIndex(index);
  };

  return (
    <Box
      component="nav"
      sx={{ width: { sm: NavPanel_WIDTH }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: NavPanel_WIDTH,
          },
        }}
        open
      >
        {/* header */}
        <Box
          sx={{
            my: 3,
            mx: 2.5,
          }}
        >
          <Link to="/">
            <Typography variant="h4" component="h4">
              <Typography variant="h4" component="span" color="error">
                I
              </Typography>
              ELEC
            </Typography>
          </Link>
        </Box>

        <Box
          sx={{
            bgcolor: grey[200],
            borderRadius: 3,
            display: "flex",
            my: 3,
            mx: 2.5,
            py: 3,
            px: 1,
          }}
        >
          <SupervisedUserCircleIcon sx={{ mx: 2 }} />
          <Typography variant="body1" component="p" color={grey[800]}>
            Welcome, admin!
          </Typography>
        </Box>

        <List sx={{ minHeight: "60%" }}>
          {NavPanelLinks.map((link, index) => {
            const { title, icon, path } = link;
            return (
              <Link to={path} style={{ color: "inherit" }} key={index}>
                <ListItem
                  button
                  selected={selectedIndex === index}
                  onClick={(e) => handleListItemClick(e, index)}
                >
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText>{capitalize(title)}</ListItemText>
                </ListItem>
              </Link>
            );
          })}
        </List>

        <Box sx={{ mx: 2 }}>
          <Button
            variant="contained"
            color="secondary"
            size="medium"
            fullWidth
            onClick={() => {
              logoutUser();
              <Redirect to="/" />;
            }}
            startIcon={<Logout />}
          >
            Logout
          </Button>
        </Box>
      </Drawer>
    </Box>
  );
};

export default NavPanel;
