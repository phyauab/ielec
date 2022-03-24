import React, { useEffect } from "react";
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
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Input from "@mui/material/Input";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { DataGrid } from "@mui/x-data-grid";

const BrandPage = () => {
  const { fetchBrands, isLoading, brands } = useAdminContext();

  useEffect(() => {
    fetchBrands();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  var options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const buildColumns = () => {
    let columns = [
      {
        field: "id",
        headerName: "ID",
        width: 230,
      },
      { field: "name", headerName: "Name", width: 200 },
      { field: "createdAt", headerName: "Created At", width: 220 },
      { field: "updatedAt", headerName: "Updated At", width: 220 },
    ];
    return columns;
  };

  const buildRows = () => {
    let rows = [];
    for (const brand of brands) {
      rows.push({
        id: brand._id,
        name: brand.name,
        createdAt: new Date(brand.createdAt).toLocaleDateString(
          "en-US",
          options
        ),
        updatedAt: new Date(brand.updatedAt).toLocaleDateString(
          "en-US",
          options
        ),
      });
    }
    return rows;
  };

  return (
    <Container>
      <Toolbar />
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Title title="Brands" />
        <Box>
          <Link to="/brands/add">
            <Button variant="contained" startIcon={<AddIcon />}>
              Add new brand
            </Button>
          </Link>
        </Box>
      </Box>

      <div style={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={buildRows()}
          columns={buildColumns()}
          pageSize={9}
          rowsPerPageOptions={[9]}
          checkboxSelection
        />
      </div>
    </Container>
  );
};

export default BrandPage;
