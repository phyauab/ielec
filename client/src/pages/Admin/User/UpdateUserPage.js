import React, { useState, useEffect } from "react";
import { useAppContext } from "../../../context/AppContext";
import { useAdminContext } from "../../../context/AdminContext";
import { Link, useHistory, useParams } from "react-router-dom";

// Components
import Title from "../../../components/Admin/Title";
import Loading from "../../../components/Loading";
import UserForm from "../../../components/Admin/User/UserForm";

// UI
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Paper from "@mui/material/Paper";
import AutorenewIcon from "@mui/icons-material/Autorenew";

const initialUser = {
  username: "",
  firstName: "",
  lastName: "",
  password: "",
  gender: "",
  isAdmin: false,
  email: "",
  birthday: Date.now(),
};

const UpdateUserPage = () => {
  const { showMessage } = useAppContext();
  const { fetchUser, isLoading, updateUser } = useAdminContext();
  const history = useHistory();
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [user, setUser] = useState(initialUser);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const response = await fetchUser(id);
    if (response.data) {
      setUser(response.data);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await updateUser(user);
    if (response.status) {
      showMessage("User updated!", "success");
      history.push("/users");
    } else {
      setOpen(true);
      setMsg(response.msg);
      setTimeout(() => {
        setOpen(false);
      }, 5.0 * 1000);
    }
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <Container>
      <Toolbar disableGutters>
        <Link to="/users">
          <IconButton>
            <ArrowBackIcon />
          </IconButton>
        </Link>
      </Toolbar>
      <Title title="Update User" />
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexColumn: "column",
          justifyContent: "center",
        }}
      >
        <Paper
          sx={{
            p: 5,
            width: "100%",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <UserForm
            user={user}
            setUser={setUser}
            handleSubmit={handleSubmit}
            startIcon={<AutorenewIcon />}
            buttonText="update user"
            open={open}
            msg={msg}
            disablePassword={true}
          />
        </Paper>
      </Box>
    </Container>
  );
};

export default UpdateUserPage;
