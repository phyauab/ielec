import React, { useEffect } from "react";
import { useAdminContext } from "../../../context/AdminContext";
import { Link } from "react-router-dom";

// Components
import Title from "../../../components/Admin/Title";
import Loading from "../../../components/Loading";

// UI
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
import { DataGrid } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";

const ProductsPage = () => {
  const { fetchProducts, isLoading, products } = useAdminContext();

  useEffect(() => {
    fetchProducts();
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
      { field: "name", headerName: "Name", width: 150 },
      { field: "category", headerName: "Category", width: 100 },
      { field: "brand", headerName: "Brand", width: 100 },
      { field: "qty", headerName: "Quantity", width: 100 },
      { field: "price", headerName: "Price", width: 100 },
      {
        field: "createdAt",
        headerName: "Created At",
        type: "date",
        width: 200,
      },
    ];
    return columns;
  };

  const buildRows = () => {
    let rows = [];
    for (const product of products) {
      rows.push({
        id: product._id,
        name: product.name,
        category: product.__t,
        brand: product.brand.name,
        qty: product.qty,
        price: product.price,
        createdAt: new Date(product.createdAt).toLocaleDateString(
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
        <Title title="Products" />
        <Box>
          <Link to="/products/add">
            <Button variant="contained" startIcon={<AddIcon />}>
              Add new product
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

export default ProductsPage;
