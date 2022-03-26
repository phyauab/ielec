import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useCartContext } from "../context/CartContext";

// components
import BreadCrumb from "../components/BreadCrumb";
import CartList from "../components/Cart/CartList";
import TotalPrice from "../components/Cart/TotalPrice";

// UI
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const breadcrumbs = [
  <Link underline="hover" key="1" color="inherit" to="/">
    Home
  </Link>,
  <Typography key="3" color="text.primary">
    Cart
  </Typography>,
];

const CartPage = () => {
  const { fetchCartItems } = useCartContext();

  useEffect(() => {
    fetchCartItems();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Container>
      <BreadCrumb breadcrumbs={breadcrumbs} />

      <Grid container spacing={3}>
        <Grid item xs={8}>
          <CartList />
        </Grid>
        <Grid item xs={4}>
          <TotalPrice />
        </Grid>
      </Grid>
    </Container>
  );
};

export default CartPage;
