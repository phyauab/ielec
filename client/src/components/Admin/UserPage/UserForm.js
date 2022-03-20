import { React, useRef } from "react";
import { useAdminContext } from "../../../context/AdminContext";

// UI
import {
  Button,
  // CloseIcon,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  TextField,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  // RodioGroup,
  // IconButton,
  Slide,
  RadioGroup,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const UserForm = ({ open, onClose, action }) => {
  const containerRef = useRef(null);
  // const [fullWidth, setFullWidth] = useState(true);
  // const [maxWidth, setMaxWidth] = useState("xs");
  const { addUser } = useAdminContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = e.target[0].value;
    const password = e.target[2].value;
    const email = e.target[4].value;
    const isAdmin = e.target[7].checked;
    const status = await addUser({
      username: username,
      password: password,
      email: email,
      isAdmin: isAdmin,
    });
    console.log(status);
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth={"xs"}>
      <Container sx={{ py: 2 }} ref={containerRef}>
        <DialogTitle>
          <Typography variant="h5" component="span" sx={{ fontWeight: "bold" }}>
            LOG IN TO&thinsp;
            <Typography variant="h5" component="span" color="red">
              I
            </Typography>
            ELEC
          </Typography>
        </DialogTitle>
        {action === "add" ? (
          // Add User
          <form onSubmit={(e) => handleSubmit(e)}>
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
              <FormControl
                component="fieldset"
                sx={{ display: "flex" }}
                required
              >
                <FormLabel component="legend">Role</FormLabel>
                <RadioGroup row aria-label="role" name="role">
                  <FormControlLabel
                    value="admin"
                    control={<Radio />}
                    label="Admin"
                  />
                  <FormControlLabel
                    value="user"
                    control={<Radio />}
                    label="User"
                  />
                </RadioGroup>
              </FormControl>
            </DialogContent>
            <DialogActions sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button variant="contained" type="submit" startIcon={<AddIcon />}>
                Add
              </Button>
            </DialogActions>
          </form>
        ) : (
          // Modify
          <Slide
            direction="right"
            in={(action = "register")}
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
                {/* <Button
                  onClick={(e) => {
                    setAction("login");
                  }}
                >
                  Already have an accrount?
                </Button> */}
                {/* <Button variant="contained" type="submit" disabled={isLoading}>
                  Register
                </Button> */}
              </DialogActions>
            </form>
          </Slide>
        )}
      </Container>
    </Dialog>
  );
};
export default UserForm;
