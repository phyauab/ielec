import { React, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

// Context
import { useUserContext } from "./context/UserContext";

// Layout
import ClientLayout from "./components/Layout/ClientLayout";

// Theme
import theme from "./themes/theme";
import { ThemeProvider } from "@mui/material";

// User Pages
import {
  AboutPage,
  CartPage,
  CheckoutPage,
  ErrorPage,
  HomePage,
  ProductsPage,
  SingleProductPage,
  LoginPage,
  PrivateRoute,
} from "./pages";

// Admin Pages
import { AdminProductPage, AdminUserPage, DashboardPage } from "./pages/Admin";

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const { user } = useUserContext();

  // useEffect(() => {
  //   if (user) {
  //     setIsAdmin(user.isAdmin);
  //   } else {
  //     setIsAdmin(false);
  //   }
  // }, [user]);

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
              <Redirect to="/" />
            </Route>
          </Switch>
        </ClientLayout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
