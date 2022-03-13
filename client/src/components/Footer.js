import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";

const Footer = () => {
  return (
    <footer>
      <Box sx={{ bgcolor: "primary.main", flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Container sx={{ display: "flex", justifyContent: "center" }}>
              <Typography variant="body1" component="p">
                &copy; 2021&ensp;
                <Typography
                  variant="body1"
                  component="span"
                  sx={{ color: "red" }}
                >
                  I
                </Typography>
                ELEC All rights reserverd | built with&ensp;
              </Typography>
              <Typography
                variant="body1"
                component="p"
                sx={{ color: "#42a5f5" }}
              >
                ReactJS
              </Typography>
            </Container>
          </Toolbar>
        </AppBar>
      </Box>
    </footer>
  );
};

export default Footer;
