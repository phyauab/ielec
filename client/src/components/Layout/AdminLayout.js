import React from "react";
import { Switch, Link, Route, useRouteMatch } from "react-router-dom";

// Components
import Navbar from "../Navbar/Navbar";
import AdminAppBar from "../Admin/Appbar/AdminAppBar";
import Footer from "../Footer";
import AdminDrawer from "../Admin/Drawer/AdminDrawer";

// UI
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

// Pages
import DashboardPage from "../../pages/Admin/DashboardPage";
import UserPage from "../../pages/Admin/User/UserPage";
import CreateUserPage from "../../pages/Admin/User/CreateUserPage";
import BrandPage from "../../pages/Admin/Brand/BrandPage";
import AddBrandPage from "../../pages/Admin/Brand/AddBrandPage";
import ProductsPage from "../../pages/Admin/Product/ProductsPage";
import AddProductPage from "../../pages/Admin/Product/AddProductPage";
import SalesPage from "../../pages/Admin/SalesPage";

const drawerWidth = 240;

const AdminLayout = ({ children }) => {
  let { path, url } = useRouteMatch();
  console.log(`${url}/users`);
  console.log(path);
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
          height: "100vh",
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
            <CreateUserPage />
          </Route>
          <Route exact path="/brands">
            <BrandPage />
          </Route>
          <Route path="/brands/add">
            <AddBrandPage />
          </Route>
          <Route exact path="/products">
            <ProductsPage />
          </Route>
          <Route path="/products/add">
            <AddProductPage />
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
