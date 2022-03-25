import React, { useEffect, useState } from "react";
import { useAdminContext } from "../../../context/AdminContext";
import { useAppContext } from "../../../context/AppContext";
import { Link } from "react-router-dom";

// Components
import Title from "../../../components/Admin/Title";
import Loading from "../../../components/Loading";
import MoreActionMenu from "../../../components/Admin/MoreActionMenu";

// UI
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
import { DataGrid } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const ProductsPage = () => {
  const { fetchProducts, isLoading, products, deleteProduct } =
    useAdminContext();
  const { showMessage } = useAppContext();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [id, setId] = useState("");
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const deleteItem = async () => {
    const response = await deleteProduct(id);
    if (response.status) {
      showMessage("Product deleted!", "error");
      fetchProducts();
    } else {
      showMessage("Failed to delete", "error");
    }
  };

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
      {
        sortable: false,
        align: "right",
        field: "more",
        headerName: "",
        flex: 1,
        width: 200,
        renderCell: (cell) => {
          // console.log(cell.id);
          return (
            <IconButton
              aria-label="more"
              id="long-button"
              aria-controls={open ? "long-menu" : undefined}
              aria-expanded={open ? "true" : undefined}
              aria-haspopup="true"
              onClick={(e) => {
                e.stopPropagation();
                console.log(cell.id);
                setId(cell.id);
                handleClick(e);
              }}
            >
              <MoreVertIcon />
            </IconButton>
          );
        },
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
          autoHeight
          pageSize={10}
          rowsPerPageOptions={[10]}
        />
      </div>
      <MoreActionMenu
        open={open}
        anchorEl={anchorEl}
        handleClose={handleClose}
        link={`/products/${id}`}
        deleteItem={deleteItem}
      />
    </Container>
  );
};

export default ProductsPage;
