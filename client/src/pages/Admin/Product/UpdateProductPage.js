import React, { useState, useEffect } from "react";
import { useAdminContext } from "../../../context/AdminContext";
import { Link, useHistory, useParams } from "react-router-dom";
import { useAppContext } from "../../../context/AppContext";

// Components
import Title from "../../../components/Admin/Title";
import Loading from "../../../components/Loading";
import ProductForm from "../../../components/Admin/Product/ProductForm";

// UI
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Paper from "@mui/material/Paper";
import AutorenewIcon from "@mui/icons-material/Autorenew";

const UpdateProductPage = () => {
  const { isLoading, brands, fetchBrands, fetchProduct, updateProduct } =
    useAdminContext();
  const { showMessage } = useAppContext();
  const history = useHistory();
  const { id } = useParams();
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

    // category => __t
    let __t = product.category;
    product.__t = __t;

    const response = await updateProduct(product);
    if (response.status) {
      showMessage("Product updated!", "success");
      history.push("/products");
    } else {
      setOpen(true);
      setMsg(response.msg);
      setTimeout(() => {
        setOpen(false);
      }, 5.0 * 1000);
    }
  };

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    fetchBrands();
    const response = await fetchProduct(id);
    console.log(response.data);
    // update __t to category
    let category = response.data.__t;
    delete response.data.__t;
    response.data.category = category;

    // update brand obj to brand id
    let brand = response.data.brand._id;
    response.data.brand = brand;
    setProduct(response.data);
  };

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
      <Title title="Update Product" />

      <Paper
        sx={{
          p: 5,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ProductForm
          product={product}
          setProduct={setProduct}
          brands={brands}
          handleSubmit={handleSubmit}
          open={open}
          msg={msg}
          buttonText="Update Product"
          buttonIcon={<AutorenewIcon />}
        />
      </Paper>
    </Container>
  );
};

export default UpdateProductPage;
