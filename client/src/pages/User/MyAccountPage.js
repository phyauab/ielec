import React, { useState } from "react";
import { useUserContext } from "../../context/UserContext";

// UI
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

const MyAccountPage = () => {
  const { user } = useUserContext();
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [gender, setGender] = useState(user.gender);
  const [email, setEmail] = useState(user.email);
  const [birthday, setBirthday] = useState(user.birthday);
  console.log(user);
  return (
    <Grid container>
      <Grid item>
        <Typography variant="h4">Account Information</Typography>
      </Grid>
      <Grid container columnSpacing={5}>
        <Grid item xs={6}>
          <TextField
            value={firstName}
            label="First Name"
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            value={lastName}
            label="Last Name"
            variant="outlined"
            fullWidth
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MyAccountPage;
