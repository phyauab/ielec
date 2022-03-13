import React from "react";
import { Link } from "react-router-dom";
import Title from "./Title";
import hero from "../assets/hero.jpg";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";

const Hero = () => {
  return (
    <Box
      sx={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${hero})`,
        height: "calc(100vh - 68px)",
        color: "white",
      }}
    >
      <Container
        sx={{
          display: "flex",
          height: "100%",
          width: "100%",
        }}
      >
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "2rem",
            height: "100%",
            width: "100%",
          }}
        >
          <Title title="Level Up Your Tech" />
          <Typography component="p" sx={{ textAlign: "center" }}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque
            laboriosam ipsa dignissimos necessitatibus nulla! Reprehenderit,
            itaque officiis ab doloribus magni minus laborum error debitis
            molestias accusamus sunt qui similique. Tempore provident,
          </Typography>
          <Button
            variant="outlined"
            size="large"
            color="secondary"
            sx={{
              borderWidth: "3px",
              ":hover": {
                borderWidth: "3px",
              },
            }}
            endIcon={<AddShoppingCartOutlinedIcon />}
          >
            <Link to="products">
              <Typography variant="h6">Shop Now</Typography>
            </Link>
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Hero;
