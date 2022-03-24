import React, { useEffect } from "react";
import { useAdminContext } from "../../../context/AdminContext";
import { Link } from "react-router-dom";

// Components
import Title from "../../../components/Admin/Title";
import Loading from "../../../components/Loading";

// UI
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { DataGrid } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import Toolbar from "@mui/material/Toolbar";

const UserPage = () => {
  const { fetchUsers, isLoading, users } = useAdminContext();

  useEffect(() => {
    fetchUsers();
  }, []);

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
        width: 200,
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
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={buildRows()}
          columns={buildColumns()}
          pageSize={9}
          rowsPerPageOptions={[9]}
          checkboxSelection
        />
      </div>
    </Container>
  );
};

export default UserPage;
