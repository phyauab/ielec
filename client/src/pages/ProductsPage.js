import React, { useState, useEffect } from "react";
import styled from "styled-components";
import BreadCrumb from "../components/BreadCrumb";
import { useLocation, useParams } from "react-router-dom";
import ProductFilter from "../components/ProductFilter";
import ProductListView from "../components/ProductListView";
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
  }, []);

  return (
    <Box sx={{ minHeight: "calc(100vh - 132px)", py: 10 }}>
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
