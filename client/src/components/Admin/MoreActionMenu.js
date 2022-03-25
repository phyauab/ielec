import React from "react";
import { Link } from "react-router-dom";

// UI
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import DeleteIcon from "@mui/icons-material/Delete";

const MoreActionMenu = ({ anchorEl, open, handleClose, link, deleteItem }) => {
  return (
    <Menu
      id="long-menu"
      MenuListProps={{
        "aria-labelledby": "long-button",
      }}
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
    >
      <MenuItem component={Link} to={link}>
        <ListItemIcon>
          <AutorenewIcon color="success" />
        </ListItemIcon>
        <ListItemText>Update</ListItemText>
      </MenuItem>
      <MenuItem
        onClick={(e) => {
          deleteItem();
          handleClose();
        }}
      >
        <ListItemIcon>
          <DeleteIcon color="secondary" />
        </ListItemIcon>
        <ListItemText>Delete</ListItemText>
      </MenuItem>
    </Menu>
  );
};

export default MoreActionMenu;
