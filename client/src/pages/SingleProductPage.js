import React, { useEffect } from "react";
import BreadCrumb from "../components/BreadCrumb";
import { useParams } from "react-router";
import ProductImages from "../components/SingleProductPage/ProductImages";
import ProductInfo from "../components/SingleProductPage/ProductInfo";
import { useProductContext } from "../context/ProductContext";
import { Link } from "react-router-dom";

// components
import Loading from "../components/Loading";

// UI
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const SingleProductPage = () => {
  const { id } = useParams();
  const { fetchSingleProduct, isProductLoading, singleProduct } =
    useProductContext();

  useEffect(() => {
    fetchSingleProduct(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (isProductLoading || Object.keys(singleProduct).length === 0) {
    return <Loading />;
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
