import { React, useState, useRef } from "react";
import { useUserContext } from "../context/UserContext";
import { Link, useHistory, Redirect } from "react-router-dom";

// UI
import {
  Alert,
  AlertTitle,
  Button,
  CloseIcon,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  TextField,
  IconButton,
  Slide,
} from "@mui/material";

const LoginForm = ({ onClose, open }) => {
  const containerRef = useRef(null);
  const [action, setAction] = useState("login");
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState("xs");
  const { isLoading, isLoggedIn, isError, msg, login, user, signUpUser } =
    useUserContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    const username = e.target[0].value;
    const password = e.target[2].value;
    if (action == "login") {
      login(username, password);
    } else if (action == "register") {
      const email = e.target[4].value;
      signUpUser(username, password, email);
    }
  };

  const handleClose = () => {
    onClose();
  };

  if (user) {
    handleClose();
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth={fullWidth}
      maxWidth={maxWidth}
    >
      <Container sx={{ py: 2 }} ref={containerRef}>
        <DialogTitle>
          <Typography variant="h5" component="span" sx={{ fontWeight: "bold" }}>
            Login
          </Typography>
        </DialogTitle>
        {action == "login" ? (
          // Login
          <form onSubmit={(e) => handleSubmit(e)}>
            <DialogContent
              sx={{ display: "flex", flexDirection: "column", gap: 2, py: 2 }}
            >
              {msg ? (
                <Alert severity="error" filled>
                  <strong>{msg}</strong>
                </Alert>
              ) : null}

              <TextField
                variant="outlined"
                label="Username"
                type="text"
                required
              />
              <TextField
                variant="outlined"
                label="Password"
                type="password"
                required
              />
              <Typography></Typography>
            </DialogContent>
            <DialogActions
              sx={{ display: "flex", justifyContent: "space-around", py: 2 }}
            >
              <Button
                onClick={(e) => {
                  setAction("register");
                }}
              >
                Dont have an account?
              </Button>
              <Button variant="contained" type="submit" disabled={isLoading}>
                Login
              </Button>
            </DialogActions>
          </form>
        ) : (
          // Register
          <Slide
            direction="right"
            in={action == "register"}
            container={containerRef.current}
          >
            <form>
              <DialogContent
                sx={{ display: "flex", flexDirection: "column", gap: 2, py: 2 }}
              >
                <TextField
                  variant="outlined"
                  label="Username"
                  type="text"
                  required
                />
                <TextField
                  variant="outlined"
                  label="Password"
                  type="password"
                  required
                />
                <TextField
                  variant="outlined"
                  label="Email"
                  type="email"
                  required
                />
              </DialogContent>
              <DialogActions
                sx={{ display: "flex", justifyContent: "space-around", py: 2 }}
              >
                <Button
                  onClick={(e) => {
                    setAction("login");
                  }}
                >
                  Already have an accrount?
                </Button>
                <Button variant="contained" type="submit" disabled={isLoading}>
                  Register
                </Button>
              </DialogActions>
            </form>
          </Slide>
        )}
      </Container>
    </Dialog>
  );
};
export default LoginForm;
