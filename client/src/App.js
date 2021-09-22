import { React, useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { GlobalStyle } from "./components/Theme/GlobalStyle";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import { useUserContext } from "./context/UserContext";
import {
  AboutPage,
  CartPage,
  CheckoutPage,
  ErrorPage,
  HomePage,
  ProductsPage,
  SingleProductPage,
  LoginPage,
  SignUpPage,
  PrivateRoute,
  DashboardPage,
} from "./pages";

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const { user } = useUserContext();

  useEffect(() => {
    if (user) {
      setIsAdmin(user.isAdmin);
    }
  }, [user]);

  return (
    <>
      <GlobalStyle />
      <Router>
        <Navbar />
        <Sidebar />
        <Switch>
          <Route exact path="/signup">
            <SignUpPage />
          </Route>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/login">
            <LoginPage />
          </Route>
          <Route path="/dashboard">
            <DashboardPage />
          </Route>

          <Route exact path="/products" children={<ProductsPage />} />
          <Route
            exact
            path="/products/:category/:id"
            children={<SingleProductPage />}
          />
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
            <ErrorPage />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </>
  );
}

export default App;
