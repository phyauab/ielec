import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Context
import { useUserContext } from "./context/UserContext";
import { useAppContext } from "./context/AppContext";

// Layout
import ClientLayout from "./components/Layout/ClientLayout";
import AccountLayout from "./components/Layout/AccountLayout";
import AdminLayout from "./components/Layout/AdminLayout";

// Theme
import theme from "./themes/theme";
import { ThemeProvider } from "@mui/material";

// User Pages
import {
  AboutPage,
  CartPage,
  ErrorPage,
  HomePage,
  ProductsPage,
  SingleProductPage,
  LoginPage,
  CheckoutPage,
  PrivateRoute,
} from "./pages";

import { DashboardPage } from "./pages";

// Snackbar
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Grow from "@mui/material/Grow";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function App() {
  const { handleSnackbarClose, snackbarState } = useAppContext();
  const { getMe, user } = useUserContext();

  if (!getMe) {
    return <></>;
  }

  return (
    <ThemeProvider theme={theme}>
      <Router>
        {user == null || !user.isAdmin ? (
          <ClientLayout>
            {/* <Sidebar /> */}
            <Switch>
              <Route exact path="/">
                <HomePage />
              </Route>
              <Route exact path="/login">
                <LoginPage />
              </Route>

              <Route exact path="/products" children={<ProductsPage />} />
              <Route
                exact
                path="/products/:id"
                children={<SingleProductPage />}
              />
              <Route exact path="/about">
                <AboutPage />
              </Route>
              <PrivateRoute exact path="/cart">
                <CartPage />
              </PrivateRoute>
              <PrivateRoute exact path="/checkout">
                <CheckoutPage />
              </PrivateRoute>
              <PrivateRoute path="/account">
                <AccountLayout></AccountLayout>
              </PrivateRoute>
              <Route path="*">
                <ErrorPage />
              </Route>
            </Switch>
          </ClientLayout>
        ) : (
          <AdminLayout>
            <Switch>
              <PrivateRoute exact path="/">
                <DashboardPage />
              </PrivateRoute>
              <Route path="*">
                <ErrorPage />
              </Route>
            </Switch>
          </AdminLayout>
        )}
      </Router>
      <Snackbar
        open={snackbarState.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        TransitionComponent={Grow}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarState.severity}
          sx={{ width: "100%" }}
        >
          {snackbarState.msg}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}

export default App;
