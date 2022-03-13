import React, { useState } from "react";

// Context
import { useUserContext } from "../../context/UserContext";

// UI
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import LoginForm from "../LoginForm";
import AccountMenu from "../AccountMenu";

// function
import { Link } from "react-router-dom";

// utils
import { navLinks } from "./navbar_config";
import { capitalize } from "../../utils/helpers";

const Navbar = () => {
  // Login Form control
  const [isLoginFormOpen, setIsLoginFormOpen] = useState(false);

  // Ac menu control
  const [acAnchorEl, setAcAnchorEl] = useState(null);
  const isAcMenuOpen = Boolean(acAnchorEl);

  // user
  const { user, isLoggedIn } = useUserContext();

  // Login Form control
  const openLoginForm = () => {
    setIsLoginFormOpen(true);
  };
  const closeLoginForm = () => {
    console.log("close login");
    setIsLoginFormOpen(false);
  };

  // Ac menu control
  const clickAcMenu = (e) => {
    setAcAnchorEl(e.currentTarget);
  };
  const closeAcMenu = () => {
    setAcAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Container>
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            {/* Title */}
            <Box>
              <Link to="/">
                <Typography variant="h4" component="h4">
                  <Typography variant="h4" component="span" color="error">
                    I
                  </Typography>
                  ELEC
                </Typography>
              </Link>
            </Box>
            {/* Links */}

            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <List sx={{ display: "flex" }}>
                {navLinks.map((link, index) => {
                  const { title, path } = link;
                  return (
                    <ListItem key={index}>
                      <Link to={path}>
                        <ListItemText
                          sx={{
                            whiteSpace: "nowrap",
                            ":hover": { textDecoration: "underline" },
                          }}
                        >
                          {capitalize(title)}
                        </ListItemText>
                      </Link>
                    </ListItem>
                  );
                })}
              </List>
              <List sx={{ display: "flex" }}>
                <ListItem sx={{ px: 0.5 }}>
                  {!user && (
                    <Button
                      variant="contained"
                      color="secondary"
                      sx={{ whiteSpace: "nowrap" }}
                      onClick={openLoginForm}
                    >
                      Login In
                    </Button>
                  )}
                  {user && (
                    <Tooltip title="Account">
                      <IconButton
                        style={{ color: "white" }}
                        onClick={clickAcMenu}
                      >
                        <AccountCircleIcon />
                      </IconButton>
                    </Tooltip>
                  )}
                </ListItem>
              </List>
            </Box>

            {/* Menu Icon */}
            <IconButton sx={{ display: { sm: "block", md: "none" } }}>
              <MenuIcon sx={{ color: "white" }} />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      <>
        {isLoggedIn || (
          <LoginForm open={isLoginFormOpen} onClose={closeLoginForm} />
        )}
      </>

      <AccountMenu
        anchorEl={acAnchorEl}
        open={isAcMenuOpen}
        onClose={closeAcMenu}
      />
    </Box>
  );
};

export default Navbar;
