import React, { useState } from "react";

// Context
import { useUserContext } from "../../context/UserContext";

// Components
import AuthForm from "../AuthForm/AuthForm";

// UI
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";

// function
import { Link } from "react-router-dom";

// utils
import { navLinks } from "./navbar_config";
import { capitalize } from "../../utils/helpers";

import NavbarUser from "./NavbarUser";

const Navbar = () => {
  // Auth Form control
  const [isAuthFormOpen, setIsAuthFormOpen] = useState(false);

  // user
  const { user, isLoggedIn } = useUserContext();

  // Auth Form control
  const openAuthForm = () => {
    setIsAuthFormOpen(true);
  };
  const closeAuthForm = () => {
    setIsAuthFormOpen(false);
  };

  return (
    <Box>
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
                {user ? (
                  <NavbarUser />
                ) : (
                  <ListItem>
                    <Button
                      variant="contained"
                      color="secondary"
                      sx={{ whiteSpace: "nowrap" }}
                      onClick={openAuthForm}
                    >
                      Login In
                    </Button>
                  </ListItem>
                )}
              </List>
            </Box>

            {/* Menu Icon When in phone mode*/}
            <IconButton sx={{ display: { sm: "block", md: "none" } }}>
              <MenuIcon sx={{ color: "white" }} />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      <>
        {isLoggedIn || (
          <AuthForm open={isAuthFormOpen} onClose={closeAuthForm} />
        )}
      </>
    </Box>
  );
};

export default Navbar;
