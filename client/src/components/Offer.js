import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

// components
import Title from "./Title";

// assets
import fair_price from "../assets/fair_price.png";
import good_service from "../assets/good_service.png";
import no_delay from "../assets/no_delay.png";

const arr = [
  {
    img: fair_price,
    title: "Fair Price",
  },
  {
    img: good_service,
    title: "Good Service",
  },
  {
    img: no_delay,
    title: "No Delay",
  },
];

const Offer = () => {
  return (
    <Box>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "4rem",
          py: "4rem",
        }}
      >
        <Title title="We Will Offer" />
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={15}>
            {arr.map((item, index) => {
              const { title, img } = item;
              const description =
                "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magni neque fugiat excepturi impedit sit nisi non vel asperiores laudantium ratione?";
              return (
                <Grid item xs={4} key={index}>
                  <Card elevation={0}>
                    <CardMedia component="img" alt="green iguana" image={img} />
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        align="center"
                        sx={{ fontWeight: "semi-bold" }}
                      >
                        {title}
                      </Typography>

                      <Typography
                        variant="body2"
                        component="p"
                        color="text.secondary"
                        sx={{ textAlign: "center", lineHeight: 2 }}
                      >
                        {description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Offer;
