import { createTheme } from "@mui/material/styles";
import grey from "@mui/material/colors/grey";
import red from "@mui/material/colors/red";

const theme = createTheme({
  palette: {
    primary: {
      main: grey[900],
    },
    secondary: {
      main: red[900],
    },
  },
});

export default theme;
