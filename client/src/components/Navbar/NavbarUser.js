import React, { useState } from "react";

// Components
import AccountMenu from "./AccountMenu";

// UI
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";

// Icons
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const NavbarUser = () => {
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
          <IconButton style={{ color: "white" }} onClick={clickAcMenu}>
            <ShoppingCartIcon />
          </IconButton>
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
