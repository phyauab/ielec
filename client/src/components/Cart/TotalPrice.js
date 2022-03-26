import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCartContext } from "../../context/CartContext";

// Componenets

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const TotalPrice = () => {
  const { cartItems } = useCartContext();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    calculateTotal();
  }, [cartItems.length]); // eslint-disable-line react-hooks/exhaustive-deps

  const calculateTotal = () => {
    let total = 0;
    for (const cartItem of cartItems) {
      total += cartItem.price * cartItem.qty;
    }
    setTotal(total);
  };

  return (
    <Box sx={{ width: "100%", background: "#f2f2f2", p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Summary
      </Typography>
      <Divider />
      <Box sx={{ py: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="subtitle1" gutterBottom>
                Subtotal
              </Typography>
              <Typography variant="body1" gutterBottom>
                ${total}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="subtitle1" gutterBottom>
                Shipping
              </Typography>
              <Typography variant="body1" gutterBottom>
                $0
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h4" gutterBottom>
                Total
              </Typography>
              <Typography variant="h5" gutterBottom>
                ${total}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Button
        variant="contained"
        sx={{ width: "100%" }}
        disabled={!(total > 0)}
      >
        <Link to="/checkout">Checkout</Link>
      </Button>
    </Box>
  );
};
export default TotalPrice;
