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
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import { DataGrid } from "@mui/x-data-grid";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const BrandPage = () => {
  const { fetchBrands, isLoading, brands, deleteBrand } = useAdminContext();
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
    const response = await deleteBrand(id);
    if (response.status) {
      showMessage("Brand deleted!", "error");
      fetchBrands();
    } else {
      showMessage("Failed to delete", "error");
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
      {
        sortable: false,
        align: "right",
        field: "more",
        headerName: "",
        flex: 1,
        width: 200,
        renderCell: (cell) => {
          return (
            <IconButton
              aria-label="more"
              id="long-button"
              aria-controls={open ? "long-menu" : undefined}
              aria-expanded={open ? "true" : undefined}
              aria-haspopup="true"
              onClick={(e) => {
                e.stopPropagation();
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
          pageSize={10}
          rowsPerPageOptions={[10]}
          autoHeight
        />
      </div>
      <MoreActionMenu
        open={open}
        anchorEl={anchorEl}
        handleClose={handleClose}
        link={`/brands/${id}`}
        deleteItem={deleteItem}
      />
    </Container>
  );
};

export default BrandPage;
