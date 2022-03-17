import React, { useState, useEffect } from "react";
import { useProductContext } from "../context/ProductContext";
import ProductCard from "./ProductCard";
import Title from "./Title";

// UI
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";

const FeaturedProducts = () => {
  const [featuredProducts, setFeaturedProducts] = useState({
    isLoading: false,
    isError: false,
    products: [],
  });
  const { fetchFeaturedProducts } = useProductContext();

  useEffect(async () => {
    setFeaturedProducts({ ...featuredProducts, isLoading: true });
    try {
      let tempProducts = await fetchFeaturedProducts();
      console.log(tempProducts);
      setFeaturedProducts({
        ...featuredProducts,
        isLoading: false,
        products: tempProducts,
      });
    } catch (error) {
      setFeaturedProducts({
        ...featuredProducts,
        isLoading: false,
        isError: true,
      });
    }
  }, []);

  // console.log("featured products: " + featuredProducts.isLoading);
  if (featuredProducts.isLoading) {
    return (
      <Box sx={{ py: "4rem" }}>
        <Container sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Container>
      </Box>
    );
  }

  if (featuredProducts.isError || featuredProducts.products.length === 0) {
    return <h3>Sorry, something went wrong :(</h3>;
  }

  const getType = (type) => {
    switch (type) {
      case "Phone":
        return "phones";
      case "Laptop":
        return "laptops";
      case "Headphone":
        return "headphones";
      case "Accessories":
        return "accessories";
    }
  };

  return (
    <Box sx={{ py: "4rem" }}>
      <Container sx={{ display: "flex", flexDirection: "column", gap: "4rem" }}>
        <Title title="Featured Products" />
        <Grid container spacing={5}>
          {featuredProducts.products.map((product, index) => {
            // const type = getType(__t);
            return (
              <Grid item xs={3} key={index}>
                <ProductCard product={product} />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
};

export default FeaturedProducts;
