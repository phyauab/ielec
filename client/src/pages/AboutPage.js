import React from "react";
import { Link } from "react-router-dom";

// Components
import BreadCrumb from "../components/BreadCrumb";
import Title from "../components/Title";

// UI
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

const breadcrumbs = [
  <Link underline="hover" key="1" color="inherit" to="/">
    Home
  </Link>,
  <Typography key="3" color="text.primary">
    About us
  </Typography>,
];

const AboutPage = () => {
  return (
    <Container>
      <BreadCrumb breadcrumbs={breadcrumbs} />
      <Grid container columnSpacing={10}>
        <Grid item xs={6}>
          <img
            src="https://i.imgur.com/zPdLIFM.jpg"
            alt=""
            srcset=""
            style={{ width: "100%", objectFit: "cover" }}
          />
        </Grid>
        <Grid item xs={6} spacing={5}>
          <Grid container spacing={5}>
            <Grid item>
              <Box
                sx={{
                  alignItems: "start",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                  justifyContent: "center",
                }}
              >
                <Typography
                  variant="h3"
                  component="h3"
                  sx={{ textAlign: "center", fontWeight: "bold" }}
                >
                  Our Story
                </Typography>
                <Box
                  sx={{ background: "red", width: "100px", height: "5px" }}
                ></Box>
              </Box>
            </Grid>
            <Grid item>
              <Typography variant="body1" paragraph sx={{ lineHeight: 2 }}>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Aspernatur ullam, incidunt molestiae dolore porro laborum.
                Possimus, ex, tempore deleniti mollitia rem voluptatem corporis
                impedit iusto neque minus accusamus dignissimos nesciunt est
                quod. Quasi, fuga totam, omnis iste architecto atque autem
                tenetur molestiae ea ad veniam, quo neque et asperiores eum
                ipsum corporis quae. Porro possimus nam quibusdam labore aut
                officiis reiciendis optio in explicabo consequuntur cum nemo
                fuga maiores sunt pariatur suscipit, accusamus esse quo
                expedita, ad dolore earum, rerum doloribus. Consequatur ad,
                aperiam fugit totam corporis magnam quos maiores error sed minus
                vel, perspiciatis numquam iure eos dolorum delectus magni
                voluptatum eveniet earum, saepe et. Ea, asperiores porro quia,
                dolorum vitae repellendus nihil esse iusto molestiae dolores
                labore.
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AboutPage;
