import React, { useState } from "react";
import { useAdminContext } from "../../../context/AdminContext";
import { Link, useHistory } from "react-router-dom";

// Components
import Title from "../../../components/Admin/Title";
import Loading from "../../../components/Loading";

// UI
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import AddIcon from "@mui/icons-material/Add";
import Collapse from "@mui/material/Collapse";
import Alert from "@mui/material/Alert";

const CreateUserPage = () => {
  const { addUser, isLoading } = useAdminContext();
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState(Date.now());
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      username: username,
      firstName: firstName,
      lastName: lastName,
      password: password,
      gender: gender,
      isAdmin: isAdmin,
      email: email,
      birthday: birthday,
    };

    const response = await addUser(user);
    if (response.status) {
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
      <Title title="Add New User" />
      <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <form onSubmit={(e) => handleSubmit(e)}>
          <Paper sx={{ p: 5 }}>
            <Grid container spacing={2} sx={{ maxWidth: "500px" }}>
              <Grid item xs={12}>
                <Collapse in={open}>
                  <Alert severity="error" xs={{ width: "100%" }}>
                    {msg}
                  </Alert>
                </Collapse>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  label="Username"
                  type="text"
                  required
                  fullWidth
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Grid>
              <Grid item>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      variant="outlined"
                      label="First Name"
                      type="text"
                      required
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      variant="outlined"
                      label="Last Name"
                      type="text"
                      required
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <FormControl sx={{ display: "flex" }}>
                  <FormLabel>Gender</FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="gender row"
                    name="row-radio-buttons-group"
                    value={gender}
                    defaultValue="Male"
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <FormControlLabel
                      value="Male"
                      control={<Radio />}
                      label="Male"
                    />
                    <FormControlLabel
                      value="Female"
                      control={<Radio />}
                      label="Female"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl sx={{ display: "flex" }}>
                  <FormLabel>Admin</FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="isAdmin"
                    name="row-radio-buttons-group"
                    value={isAdmin}
                    defaultValue={false}
                    onChange={(e) => {
                      setIsAdmin(e.target.value);
                    }}
                  >
                    <FormControlLabel
                      value={true}
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value={false}
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Birthday"
                    value={birthday}
                    onChange={(newValue) => {
                      setBirthday(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  label="Password"
                  type="password"
                  required
                  fullWidth
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  label="Email"
                  type="email"
                  required
                  fullWidth
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  type="submit"
                  startIcon={<AddIcon />}
                >
                  Create User
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </form>
      </Box>
    </Container>
  );
};

export default CreateUserPage;
