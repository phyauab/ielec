import React, { useEffect, useState } from "react";
import styled from "styled-components";
import BreadCrumb from "../components/BreadCrumb";
import { useLocation, useParams } from "react-router";
import ProductImages from "../components/ProductImages";
import ProductInfo from "../components/ProductInfo";
import { useProductContext } from "../context/ProductContext";
import { Link } from "react-router-dom";

import Offer from "../components/Offer";

// UI
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

const SingleProductPage = () => {
  const { id } = useParams();
  const [a, SetA] = useState(true);

  const { fetchSingleProduct, isProductLoading, singleProduct } =
    useProductContext();

  useEffect(() => {
    fetchSingleProduct(id);
  }, [id]);

  if (isProductLoading || Object.keys(singleProduct).length === 0) {
    return (
      <Container>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" to="/">
      Home
    </Link>,
    <Link underline="hover" key="2" color="inherit" to="/products">
      Products
    </Link>,
    <Typography key="3" color="text.primary">
      {singleProduct.name}
    </Typography>,
  ];

  return (
    <Container>
      <BreadCrumb breadcrumbs={breadcrumbs} />
      <Grid container spacing={2} sx={{ mb: "5rem" }}>
        <Grid item xs={6}>
          <ProductImages />
        </Grid>
        <Grid item xs={6}>
          <ProductInfo />
        </Grid>
      </Grid>
    </Container>
  );
};

export default SingleProductPage;
