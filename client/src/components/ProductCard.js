import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

// UI
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";

// Helper
import { bufferToImage } from "../utils/helpers";

const ProductCard = ({ name, brand, img, price, pathname, _id }) => {
  return (
    <Card variant="outlined" sx={{ maxWidth: 300, borderRadius: "10px" }}>
      <CardActionArea>
        <Link to={pathname}>
          <CardMedia component="img" image={bufferToImage(img)} alt={name} />
          <CardContent>
            <Typography variant="h6" component="div" align="center">
              {name}
            </Typography>
            <Typography
              gutterBottom
              variant="body2"
              component="p"
              color="GrayText"
              align="center"
            >
              {brand}
            </Typography>
            <Typography variant="body1" color="success.main" align="center">
              ${price}
            </Typography>
          </CardContent>
        </Link>
      </CardActionArea>
    </Card>
  );
};

export default ProductCard;
