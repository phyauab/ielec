import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
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
import Collapse from "@mui/material/Collapse";
import Alert from "@mui/material/Alert";

const UpdateBrandPage = () => {
  const { updateBrand, fetchBrand, isLoading } = useAdminContext();
  const { showMessage } = useAppContext();
  const [brand, setBrand] = useState({ name: "" });
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const response = await fetchBrand(id);
    setBrand(response.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await updateBrand(brand);
    if (response.status) {
      showMessage("Brand updated!", "success");
      history.push("/brands");
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
        <Link to="/brands">
          <IconButton>
            <ArrowBackIcon />
          </IconButton>
        </Link>
      </Toolbar>
      <Title title="Update Brand" />

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
                  value={brand.name}
                  onChange={(e) => setBrand({ ...brand, name: e.target.value })}
                />
                <Box sx={{ height: "20px" }}></Box>
                <Button variant="contained" type="submit">
                  Update Brand
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

export default UpdateBrandPage;
