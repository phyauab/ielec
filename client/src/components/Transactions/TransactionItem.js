import React, { useEffect } from "react";

// component chips
import CartItemChips from "../Cart/CartItemChip";

// UI
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const TransactionItem = ({ cartItem }) => {
  const { product } = cartItem;
  return (
    <Grid container sx={{ py: 2 }}>
      {/* product */}
      <Grid item xs={7}>
        <Box sx={{ display: "flex" }}>
          <Box sx={{ width: "100px", height: "120px" }}>
            <img src={product.profilePath} style={{ width: "100%" }} />
          </Box>
          <Box
            sx={{
              pl: 3,
              display: "flex",
              flexDirection: "Column",
              alignItems: "start",
              justifyContent: "center",
            }}
          >
            <Box>
              <Typography sx={{ fontWeight: "bold" }}>
                {product.name}
              </Typography>
            </Box>
            <Box>
              <Typography variant="caption">{product.brand.name}</Typography>
            </Box>
            <Box sx={{ height: "24px" }}>
              {cartItem.options.length > 0 ? (
                <CartItemChips options={cartItem.options} />
              ) : (
                <div style={{ height: "24px", width: "24px" }}></div>
              )}
              {/* <CartItemChips options={cartItem.options} /> */}
            </Box>
          </Box>
        </Box>
      </Grid>
      {/* qty */}
      <Grid item xs={2} sx={{ display: "flex", alignItems: "center" }}>
        <Typography variant="subtitle2">{cartItem.qty}</Typography>
      </Grid>
      {/* price */}
      <Grid item xs={2} sx={{ display: "flex", alignItems: "center" }}>
        <Typography variant="subtitle2">${product.price}</Typography>
      </Grid>
      {/* delete */}
      <Grid item xs={1} sx={{ display: "flex", alignItems: "center" }}>
        {/* <IconButton
          aria-label="delete"
          size="large"
          onClick={() => removeFromCart(cartItem._id)}
        >
          <ClearIcon fontSize="inherit" />
        </IconButton> */}
      </Grid>
    </Grid>
  );
};

export default TransactionItem;
