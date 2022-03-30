import React from "react";

// Components
import TransactionItem from "./TransactionItem";

// UI
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

const TransactionItemList = ({ cartItems }) => {
  return (
    <Grid container>
      <Grid container>
        <Grid item xs={8}>
          <Typography>Product</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography>Quantity</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography>Price</Typography>
        </Grid>
      </Grid>
      <Grid item xs={12} sx={{ py: 2 }}>
        <Divider />
      </Grid>
      {cartItems.map((cartItem, index) => {
        return <TransactionItem key={index} cartItem={cartItem} />;
      })}
    </Grid>
  );
};

export default TransactionItemList;
