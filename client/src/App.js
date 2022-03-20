import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

// Context
import { useUserContext } from "./context/UserContext";
import { useAppContext } from "./context/AppContext";

// Layout
import ClientLayout from "./components/Layout/ClientLayout";
import AccountLayout from "./components/Layout/AccountLayout";

// Theme
import theme from "./themes/theme";
import { ThemeProvider } from "@mui/material";

// User Pages
import {
  AboutPage,
  CartPage,
  // ErrorPage,
  HomePage,
  ProductsPage,
  SingleProductPage,
  LoginPage,
  CheckoutPage,
  PrivateRoute,
} from "./pages";

// Snackbar
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Grow from "@mui/material/Grow";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// Admin Pages
// import { AdminProductPage, AdminUserPage, DashboardPage } from "./pages/Admin";

function App() {
  // const [isAdmin, setIsAdmin] = useState(false);
  const { handleSnackbarClose, snackbarState } = useAppContext();
  const { getMe } = useUserContext();

  if (!getMe) {
    return <></>;
  }

  return (
    <ThemeProvider theme={theme}>
      <Router>
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
            {/* <Route
              exact
              path="/products/:category/:id"
              children={<SingleProductPage />}
            /> */}
            <Route exact path="/about">
              <AboutPage />
            </Route>
            <Route exact path="/cart">
              <CartPage />
            </Route>
            <Route exact path="/checkout">
              <CheckoutPage />
            </Route>
            <PrivateRoute path="/account">
              <AccountLayout></AccountLayout>
            </PrivateRoute>
            {/* <PrivateRoute exact path="/dashboard">
            <DashboardPage />
          </PrivateRoute> */}
            {/* <div className="admin">
            <Route exact path="/dashboard">
            <DashboardPage />
            </Route>
            
            <Route exact path="/dashboard/addproduct">
            <DashboardPage />
            </Route>
          </div> */}
            <Route path="*">
              <p>Error</p>
              {/* <Redirect to="/" /> */}
            </Route>
          </Switch>
        </ClientLayout>
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
