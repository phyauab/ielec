import React, { useState } from "react";
import UserTable from "../../components/Admin/UserPage/UserTable";
import UserForm from "../../components/Admin/UserPage/UserForm";

// UI
import { Box, Button, Container, Typography } from "@mui/material";
// import { green } from "@mui/material/colors";
import AddIcon from "@mui/icons-material/Add";
const AdminUserPage = () => {
  const [openUserForm, setOpenUserForm] = useState(false);
  const [userFormAction, setUserFormAction] = useState("add");

  const handleUserFormClose = () => {
    setOpenUserForm(false);
  };

  return (
    <Box
      sx={{
        alignItems: "center",
        display: "flex",
        width: "100%",
        height: "100%",
        justifyContent: "center",
      }}
    >
      <Container>
        <Box sx={{ display: "flex", justifyContent: "space-between", py: 3 }}>
          <Typography variant="h4">User</Typography>
          <Button
            variant="contained"
            color="success"
            startIcon={<AddIcon />}
            onClick={(e) => {
              setUserFormAction("add");
              setOpenUserForm(true);
            }}
          >
            Add User
          </Button>
        </Box>
        <UserTable />
      </Container>
      <UserForm
        action={userFormAction}
        open={openUserForm}
        onClose={handleUserFormClose}
      />
    </Box>
  );
};

export default AdminUserPage;
