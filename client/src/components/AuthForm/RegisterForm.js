import React, { useState } from "react";
import { useUserContext } from "../../context/UserContext";

// UI
import Button from "@mui/material/Button";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
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

const RegisterFrom = React.forwardRef(({ setOpenRegister }, ref) => {
  const { isLoading, register } = useUserContext();
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState(Date.now());

  const handleSubmit = (e) => {
    e.preventDefault();
    register(username, firstName, lastName, password, gender, email, birthday);
  };

  return (
    <form ref={ref} onSubmit={(e) => handleSubmit(e)}>
      <DialogContent sx={{ py: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              label="Username"
              type="text"
              required
              sx={{ width: "100%" }}
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
          <Grid item>
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
          <Grid item>
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
          <Grid item>
            <TextField
              variant="outlined"
              label="Password"
              type="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              variant="outlined"
              label="Email"
              type="email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions
        sx={{ display: "flex", justifyContent: "space-around", py: 2 }}
      >
        <Button
          onClick={(e) => {
            setOpenRegister(false);
          }}
        >
          Already have an accrount?
        </Button>
        <Button variant="contained" type="submit" disabled={isLoading}>
          Register
        </Button>
      </DialogActions>
    </form>
  );
});

export default RegisterFrom;
