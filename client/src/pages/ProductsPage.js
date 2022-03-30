import React, { useEffect } from "react";

import ProductFilter from "../components/ProductFilter";
// import ProductListView from "../components/ProductListView";
import ProductGridView from "../components/ProductGridView";
import { useProductContext } from "../context/ProductContext";

// UI
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

const ProductsPage = () => {
  const { fetchProducts, displayProducts } = useProductContext();

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box sx={{ py: 10 }}>
      <Container>
        <Grid container>
          <Grid item xs={4}>
            <ProductFilter />
          </Grid>
          <Grid item xs={8}>
            <ProductGridView products={displayProducts} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
export default ProductsPage;
