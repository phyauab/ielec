import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCartContext } from "../../context/CartContext";

// Components
import AccountMenu from "./AccountMenu";

// UI
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import Badge from "@mui/material/Badge";

// Icons
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const NavbarUser = () => {
  const { cartItems } = useCartContext();
  // Ac menu control
  const [acAnchorEl, setAcAnchorEl] = useState(null);
  const isAcMenuOpen = Boolean(acAnchorEl);
  // Ac menu control
  const clickAcMenu = (e) => {
    setAcAnchorEl(e.currentTarget);
  };
  const closeAcMenu = () => {
    setAcAnchorEl(null);
  };
  return (
    <>
      <ListItem>
        <Tooltip title="Shopping Cart">
          <Link to="/cart">
            <IconButton style={{ color: "white" }}>
              <Badge badgeContent={cartItems.length} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Link>
        </Tooltip>
      </ListItem>

      <ListItem>
        <Tooltip title="Account">
          <IconButton style={{ color: "white" }} onClick={clickAcMenu}>
            <AccountCircleIcon />
          </IconButton>
        </Tooltip>
      </ListItem>
      <AccountMenu
        anchorEl={acAnchorEl}
        open={isAcMenuOpen}
        onClose={closeAcMenu}
      />
    </>
  );
};

export default NavbarUser;
