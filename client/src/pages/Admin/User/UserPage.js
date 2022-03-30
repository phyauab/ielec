import React, { useEffect, useState } from "react";
import { useAppContext } from "../../../context/AppContext";
import { useAdminContext } from "../../../context/AdminContext";
import { Link } from "react-router-dom";

// Components
import Title from "../../../components/Admin/Title";
import Loading from "../../../components/Loading";
import MoreActionMenu from "../../../components/Admin/MoreActionMenu";

// UI
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { DataGrid } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const UserPage = () => {
  const { fetchUsers, isLoading, users, deleteUser } = useAdminContext();
  const { showMessage } = useAppContext();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [id, setId] = useState("");
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const deleteItem = async () => {
    const response = await deleteUser(id);
    if (response.status) {
      showMessage("User deleted!", "error");
      fetchUsers();
    } else {
      showMessage("Failed to delete", "error");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (isLoading) {
    return <Loading />;
  }

  var options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const buildColumns = () => {
    let columns = [
      {
        field: "id",
        headerName: "ID",
        width: 230,
      },
      { field: "username", headerName: "Username", width: 100 },
      { field: "role", headerName: "Role", width: 70 },
      { field: "email", headerName: "Email", width: 200 },
      {
        field: "createdAt",
        headerName: "Created At",
        type: "date",
        width: 230,
      },
      {
        sortable: false,
        align: "right",
        field: "more",
        headerName: "",
        flex: 1,
        width: 200,
        renderCell: (cell) => {
          // console.log(cell.id);
          return (
            <IconButton
              aria-label="more"
              id="long-button"
              aria-controls={open ? "long-menu" : undefined}
              aria-expanded={open ? "true" : undefined}
              aria-haspopup="true"
              onClick={(e) => {
                e.stopPropagation();
                setId(cell.id);
                handleClick(e);
              }}
            >
              <MoreVertIcon />
            </IconButton>
          );
        },
      },
    ];
    return columns;
  };

  const buildRows = () => {
    let rows = [];
    for (const user of users) {
      rows.push({
        id: user._id,
        username: user.username,
        role: user.isAdmin ? "Admin" : "User",
        email: user.email,
        createdAt: new Date(user.createdAt).toLocaleDateString(
          "en-US",
          options
        ),
      });
    }
    return rows;
  };

  return (
    <Container>
      <Toolbar />
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Title title="Users" />
        <Box>
          <Link to="/users/add">
            <Button variant="contained" startIcon={<AddIcon />}>
              Add new user
            </Button>
          </Link>
        </Box>
      </Box>
      <div style={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={buildRows()}
          columns={buildColumns()}
          pageSize={10}
          rowsPerPageOptions={[10]}
          disableSelectionOnClick
          autoHeight
        />
      </div>

      <MoreActionMenu
        open={open}
        anchorEl={anchorEl}
        handleClose={handleClose}
        link={`/users/${id}`}
        deleteItem={deleteItem}
      />
    </Container>
  );
};

export default UserPage;
