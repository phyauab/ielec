import React, { useState } from "react";
import { useUserContext } from "../../context/UserContext";
import { useAppContext } from "../../context/AppContext";

// UI
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import FormControl from "@mui/material/FormControl";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Divider from "@mui/material/Divider";

const MyAccountPage = () => {
  const { user, updateInfo } = useUserContext();
  const { showMessage } = useAppContext();
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [gender, setGender] = useState(user.gender);
  const [email, setEmail] = useState(user.email);
  const [birthday, setBirthday] = useState(user.birthday);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isSuccess = await updateInfo(
      firstName,
      lastName,
      gender,
      email,
      birthday
    );
    if (isSuccess) {
      showMessage("Account Information updated successfully!", "success");
    }
  };
  return (
    <Paper sx={{ p: 5 }}>
      <form onSubmit={(e) => handleSubmit(e)}>
        <Grid container rowSpacing={3}>
          {/* row */}
          <Grid item>
            <Typography variant="h4">Account Information</Typography>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          {/* row */}
          <Grid item xs={12}>
            <Grid container columnSpacing={5}>
              <Grid item xs={6}>
                <TextField
                  value={firstName}
                  label="First Name"
                  variant="outlined"
                  fullWidth
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  value={lastName}
                  label="Last Name"
                  variant="outlined"
                  fullWidth
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Grid>
            </Grid>
          </Grid>
          {/* row */}
          <Grid item xs={12}>
            <TextField
              value={email}
              label="Email"
              variant="outlined"
              fullWidth
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          {/* row */}
          <Grid item xs={12}>
            <Grid container columnSpacing={5}>
              <Grid item xs={6}>
                <FormControl sx={{ display: "flex" }} fullWidth>
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
              <Grid item xs={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Birthday"
                    value={birthday}
                    onChange={(newValue) => {
                      setBirthday(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField {...params} fullWidth />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>
          </Grid>
          {/* row */}
          <Grid item xs={12}>
            <Typography variant="caption">
              The IELEC user information collected by ISO is used to identify
              users accessing secure content, and to pre-fill forms with
              information about the user submitting the form.
            </Typography>
          </Grid>
          {/* row */}
          <Grid item xs={3}>
            <Button variant="contained" type="submit" fullWidth>
              Save
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default MyAccountPage;
