import React from "react";
import { Link } from "react-router-dom";

// UI
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";

const ProductCard = ({ product }) => {
  const { name, profilePath, brand, price, _id } = product;
  return (
    <Link to={`products/${_id}`}>
      <Card
        variant="outlined"
        sx={{
          maxWidth: 300,
          borderRadius: "10px",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "end",
        }}
      >
        <CardActionArea
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "end",
            height: "100%",
          }}
        >
          <CardMedia component="img" image={profilePath} alt={name} />
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
              {brand.name}
            </Typography>
            <Typography variant="body1" color="success.main" align="center">
              ${price}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
};

export default ProductCard;
