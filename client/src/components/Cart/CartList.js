import React from "react";
import { useCartContext } from "../../context/CartContext";

// Components
import CartItem from "./CartItem";
import Loading from "../Loading";

// UI
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const CartList = () => {
  const { cartItems, fetchCartItems, isCartLoading, isCartError } =
    useCartContext();
  return (
    <Grid container>
      {/* Header */}
      <Grid container>
        <Grid item xs={7}>
          <Typography>Product</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography>Quantity</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography>Price</Typography>
        </Grid>
        <Grid item xs={1}>
          {/* <Typography>Total Price</Typography> */}
        </Grid>
      </Grid>
      <Grid item xs={12} sx={{ py: 2 }}>
        <Divider />
      </Grid>
      {isCartLoading ? (
        <Loading />
      ) : (
        <Grid container>
          {cartItems.map((cartItem, index) => {
            return <CartItem key={index} cartItem={cartItem} />;
          })}
        </Grid>
      )}
    </Grid>
  );
};

export default CartList;
