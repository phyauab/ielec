import React, { useEffect } from "react";
import { useProductContext } from "../context/ProductContext";
import ProductCard from "./ProductCard";
import Title from "./Title";

// components
import Loading from "./Loading";

// UI
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

const FeaturedProducts = () => {
  const { fetchFeaturedProducts, isFeaturedProductLoading, featuredProducts } =
    useProductContext();

  useEffect(() => {
    fetchFeaturedProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isFeaturedProductLoading) {
    return <Loading />;
  }

  if (featuredProducts.length === 0) {
    return <></>;
  }

  return (
    <Box sx={{ py: "4rem" }}>
      <Container sx={{ display: "flex", flexDirection: "column", gap: "4rem" }}>
        <Title title="Featured Products" />
        <Grid container spacing={5}>
          {featuredProducts.map((product, index) => {
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
