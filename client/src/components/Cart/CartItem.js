import React from "react";
import { useAppContext } from "../../context/AppContext";
import { useCartContext } from "../../context/CartContext";

// Components
import CartItemChips from "./CartItemChip";

// UI
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";

const CartItem = ({ cartItem }) => {
  const { showMessage } = useAppContext();
  const { removeFromCart } = useCartContext();
  const { product } = cartItem;

  const handleDelete = async () => {
    let isSuccess = await removeFromCart(cartItem._id);
    if (isSuccess) {
      showMessage("Item deleted!", "success");
    } else {
      showMessage("Item deletion fails!", "error");
    }
  };

  return (
    <Grid container sx={{ py: 2 }}>
      {/* product */}
      <Grid item xs={7}>
        <Box sx={{ display: "flex" }}>
          <Box sx={{ width: "100px" }}>
            <img
              src={product.profilePath}
              style={{ width: "100%" }}
              alt="img"
            />
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
            <Box sx={{ minHeight: "24px" }}>
              <CartItemChips options={cartItem.options} />
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
        <Typography variant="subtitle2">${cartItem.price}</Typography>
      </Grid>
      {/* delete */}
      <Grid item xs={1} sx={{ display: "flex", alignItems: "center" }}>
        <IconButton
          aria-label="delete"
          size="large"
          onClick={() => handleDelete()}
        >
          <ClearIcon fontSize="inherit" />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default CartItem;
