import React from "react";
import ProductCard from "./ProductCard";
import { useProductContext } from "../context/ProductContext";

// components
import Loading from "./Loading";

// UI
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

const ProductGridView = () => {
  const { isProductLoading, isError, products } = useProductContext();

  if (isProductLoading) return <Loading />;
  if (isError) return <h3>Sorry, there's an error</h3>;
  if (products.length === 0) {
    return <h3>Sorry, there are no products of this kind currently</h3>;
  }

  return (
    <Box>
      <Container>
        <Grid container spacing={3}>
          {products.map((product, index) => {
            return (
              <Grid item xs={4} key={index}>
                <ProductCard key={index} product={product} />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
};

export default ProductGridView;
