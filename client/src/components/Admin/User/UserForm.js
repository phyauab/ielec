import React from "react";

// UI
import Button from "@mui/material/Button";
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
import Collapse from "@mui/material/Collapse";
import Alert from "@mui/material/Alert";

const UserForm = ({
  user,
  setUser,
  handleSubmit,
  buttonText,
  startIcon,
  open,
  msg,
  disablePassword,
}) => {
  return (
    <form onSubmit={(e) => handleSubmit(e)}>
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
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
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
                value={user.firstName}
                onChange={(e) =>
                  setUser({ ...user, firstName: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                label="Last Name"
                type="text"
                required
                value={user.lastName}
                onChange={(e) => setUser({ ...user, lastName: e.target.value })}
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
              value={user.gender}
              defaultValue="Male"
              onChange={(e) => setUser({ ...user, gender: e.target.value })}
            >
              <FormControlLabel value="Male" control={<Radio />} label="Male" />
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
              value={user.isAdmin}
              defaultValue={false}
              onChange={(e) => setUser({ ...user, isAdmin: e.target.value })}
            >
              <FormControlLabel value={true} control={<Radio />} label="Yes" />
              <FormControlLabel value={false} control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Birthday"
              value={user.birthday}
              onChange={(newValue) => setUser({ ...user, birthday: newValue })}
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
            disabled={disablePassword}
            fullWidth
            value={user.password || ""}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            variant="outlined"
            label="Email"
            type="email"
            value={user.email}
            required
            fullWidth
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            size="large"
            fullWidth
            type="submit"
            startIcon={startIcon}
          >
            {buttonText}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default UserForm;
