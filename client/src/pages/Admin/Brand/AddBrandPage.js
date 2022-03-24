import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAppContext } from "../../../context/AppContext";
import { useAdminContext } from "../../../context/AdminContext";

// components
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
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Input from "@mui/material/Input";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

const AddBrandPage = () => {
  const { addBrand } = useAdminContext();
  const { showMessage } = useAppContext();
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await addBrand(name);
    if (response.status) {
      showMessage("Product added!", "success");
      history.push("/brands");
    } else {
      setOpen(true);
      setMsg(response.msg);
      setTimeout(() => {
        setOpen(false);
      }, 5.0 * 1000);
    }
  };
  return (
    <Container>
      <Toolbar disableGutters>
        <Link to="/brands">
          <IconButton>
            <ArrowBackIcon />
          </IconButton>
        </Link>
      </Toolbar>
      <Title title="Add New Brand" />

      <Paper sx={{ p: 10 }}>
        <Grid container>
          <Grid item xs={3}></Grid>
          <Grid item container spacing={2} xs={6}>
            <Grid item xs={12}>
              <Collapse in={open}>
                <Alert severity="error" xs={{ width: "100%" }}>
                  {msg}
                </Alert>
              </Collapse>
            </Grid>
            <Grid item xs={12}>
              <form
                onSubmit={(e) => handleSubmit(e)}
                style={{ display: "flex", flexDirection: "column" }}
              >
                <TextField
                  label="Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Box sx={{ height: "20px" }}></Box>
                <Button variant="contained" type="submit">
                  Add brand
                </Button>
              </form>
            </Grid>
          </Grid>
          <Grid item xs={3}></Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default AddBrandPage;
