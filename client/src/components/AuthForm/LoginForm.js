import React, { useState, useRef } from "react";
import { useAppContext } from "../../context/AppContext";
import { useUserContext } from "../../context/UserContext";

// UI
import {
  Alert,
  Button,
  DialogContent,
  DialogActions,
  Typography,
  TextField,
} from "@mui/material";

const LoginForm = React.forwardRef(({ setOpenLogin }, ref) => {
  const { showMessage } = useAppContext();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { isLoading, msg, login, clearMsg } = useUserContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let isSuccess = await login(username, password);
    if (isSuccess) {
      showMessage("Login Successfully", "success");
    } else {
      setTimeout(() => {
        clearMsg();
      }, 5.0 * 1000);
    }
  };

  return (
    <form ref={ref} onSubmit={(e) => handleSubmit(e)}>
      <DialogContent
        sx={{ display: "flex", flexDirection: "column", gap: 2, py: 2 }}
      >
        {msg ? (
          <Alert severity="error">
            <strong>{msg}</strong>
          </Alert>
        ) : (
          <></>
        )}

        <TextField
          variant="outlined"
          label="Username"
          type="text"
          required
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          variant="outlined"
          label="Password"
          type="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <Typography></Typography>
      </DialogContent>
      <DialogActions
        sx={{ display: "flex", justifyContent: "space-around", py: 2 }}
      >
        <Button
          onClick={(e) => {
            setOpenLogin(false);
          }}
        >
          Do not have an accrount?
        </Button>
        <Button variant="contained" type="submit" disabled={isLoading}>
          Login
        </Button>
      </DialogActions>
    </form>
  );
});
export default LoginForm;
