import React, { useState, useEffect } from "react";
import { useAdminContext } from "../../../context/AdminContext";
import { Link, useHistory } from "react-router-dom";
import { useAppContext } from "../../../context/AppContext";

// Components
import Title from "../../../components/Admin/Title";
import Loading from "../../../components/Loading";
import ProductForm from "../../../components/Admin/Product/ProductForm";

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
const IMAGEKIT_PUBLIC_KEY = process.env.IMAGEKIT_PUBLIC_KEY;
const IMAGEKIT_URL_ENDPOINT = "https://ik.imagekit.io/kni8mpkkuok";
const authenticationEndpoint = "http://localhost:4000/image/auth";

const AddProductPage = () => {
  const { isLoading, brands, fetchBrands, addProduct } = useAdminContext();
  const { showMessage } = useAppContext();
  const history = useHistory();
  const [product, setProduct] = useState({
    category: "Phone",
    name: "",
    brand: "",
    price: 0,
    qty: 0,
    rating: 0,
    isFeatured: false,
    description: "",
    profilePath: null,
    imagePaths: null,
    color: [],
    ram: [],
    storage: [],
  });
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await addProduct(product);
    if (response.status) {
      showMessage("Product added!", "success");
      history.push("/products");
    } else {
      setOpen(true);
      setMsg(response.msg);
      setTimeout(() => {
        setOpen(false);
      }, 5.0 * 1000);
    }
  };
  // const response = await addUser(user);
  // if (response.status) {
  //   history.push("/users");
  // } else {
  //   setOpen(true);
  //   setMsg(response.msg);
  //   setTimeout(() => {
  //     setOpen(false);
  //   }, 5.0 * 1000);
  // }

  useEffect(() => {
    fetchBrands();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container>
      <Toolbar disableGutters>
        <Link to="/products">
          <IconButton>
            <ArrowBackIcon />
          </IconButton>
        </Link>
      </Toolbar>
      <Title title="Add New Product" />

      <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <form onSubmit={(e) => handleSubmit(e)}>
          <Paper sx={{ p: 5 }}>
            {/* Form layout grid */}
            <Grid container rowSpacing={2} sx={{ maxWidth: "500px" }}>
              <Grid item xs={12}>
                <Collapse in={open}>
                  <Alert severity="error" xs={{ width: "100%" }}>
                    {msg}
                  </Alert>
                </Collapse>
              </Grid>

              <ProductForm
                product={product}
                setProduct={setProduct}
                brands={brands}
              />

              <Grid item xs={12}>
                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  type="submit"
                  startIcon={<AddIcon />}
                >
                  Add Product
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </form>
      </Box>
    </Container>
  );
};

export default AddProductPage;
