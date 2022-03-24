import React, { useState, useRef } from "react";
import { useUserContext } from "../../context/UserContext";

// Components
import LoginForm from "./LoginForm";
import RegisterFrom from "./RegisterForm";

// UI
import Container from "@mui/material/Container";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import Slide from "@mui/material/Slide";

const AuthForm = ({ onClose, open }) => {
  const containerRef = useRef(null);
  const { user } = useUserContext();
  //   const [action, setAction] = useState("login");
  const [openLogin, setOpenLogin] = useState(true);
  const [openRegister, setOpenRegister] = useState(false);

  const handleClose = () => {
    onClose();
  };

  if (user) {
    handleClose();
  }
  return (
    <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth={"xs"}>
      {/* <form onSubmit={(e) => handleSubmit(e)}> */}
      <Container sx={{ py: 2 }} ref={containerRef}>
        <DialogTitle>
          <Typography variant="h5" component="span" sx={{ fontWeight: "bold" }}>
            {openLogin ? "Login" : "Register"}
          </Typography>
        </DialogTitle>

        <Slide
          direction="right"
          in={openLogin}
          onExited={() => setOpenRegister(true)}
          container={containerRef.current}
          mountOnEnter
          unmountOnExit
        >
          <LoginForm setOpenLogin={setOpenLogin} />
        </Slide>

        <Slide
          direction="left"
          in={openRegister}
          onExited={() => setOpenLogin(true)}
          container={containerRef.current}
          mountOnEnter
          unmountOnExit
        >
          <RegisterFrom setOpenRegister={setOpenRegister} />
        </Slide>
      </Container>
    </Dialog>
  );
};

export default AuthForm;
