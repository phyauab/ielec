import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";

// Components
import AdminAppBar from "../Admin/Appbar/AdminAppBar";
import AdminDrawer from "../Admin/Drawer/AdminDrawer";

// UI
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";

// Pages
import DashboardPage from "../../pages/Admin/DashboardPage";
import UserPage from "../../pages/Admin/User/UserPage";
import AddUserPage from "../../pages/Admin/User/AddUserPage";
import UpdateUserPage from "../../pages/Admin/User/UpdateUserPage";
import BrandPage from "../../pages/Admin/Brand/BrandPage";
import UpdateBrandPage from "../../pages/Admin/Brand/UpdateBrandPage";
import AddBrandPage from "../../pages/Admin/Brand/AddBrandPage";
import UpdateProductPage from "../../pages/Admin/Product/UpdateProductPage";
import ProductsPage from "../../pages/Admin/Product/ProductsPage";
import AddProductPage from "../../pages/Admin/Product/AddProductPage";
import SalesPage from "../../pages/Admin/SalesPage";

const drawerWidth = 240;

const AdminLayout = ({ children }) => {
  let { path } = useRouteMatch();
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AdminAppBar drawerWidth={drawerWidth} />
      <AdminDrawer drawerWidth={drawerWidth} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "#f7f7f7",
          p: 5,
          minHeight: "110vh",
        }}
      >
        <Toolbar />
        <Switch>
          <Route exact path={path}>
            <DashboardPage />
          </Route>
          <Route exact path="/users">
            <UserPage />
          </Route>
          <Route path="/users/add">
            <AddUserPage />
          </Route>
          <Route path="/users/:id">
            <UpdateUserPage />
          </Route>
          <Route exact path="/brands">
            <BrandPage />
          </Route>
          <Route path="/brands/add">
            <AddBrandPage />
          </Route>
          <Route path="/brands/:id">
            <UpdateBrandPage />
          </Route>
          <Route exact path="/products">
            <ProductsPage />
          </Route>
          <Route path="/products/add">
            <AddProductPage />
          </Route>
          <Route path="/products/:id">
            <UpdateProductPage />
          </Route>
          <Route path="/sales">
            <SalesPage />
          </Route>
        </Switch>

        <Toolbar />
      </Box>
    </Box>
  );
};

export default AdminLayout;
