import { React, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { GlobalStyle } from "./components/Theme/GlobalStyle";
import { useAppContext } from "./context/AppContext";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import ThemeToggler from "./components/ThemeToggler";
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
  const [theme, setTheme] = useState("light");
  const switchTheme = () => {
    console.log("switch: " + theme);
    theme === "light" ? setTheme("dark") : setTheme("light");
  };
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
          <Route exact path="/login">
            <LoginPage />
          </Route>
          {/* <PrivateRoute exact path="/dashboard">
            <DashboardPage />
          </PrivateRoute> */}
          <Route exact path="/dashboard">
            <DashboardPage />
          </Route>
          <Route exact path="/dashboard/addproduct">
            <DashboardPage />
          </Route>

          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/products">
            <ProductsPage />
          </Route>
          <Route exact path="/products">
            <ProductsPage />
          </Route>
          <Route path="/products/:id" children={<SingleProductPage />}>
            <ProductsPage />
          </Route>
          <Route exact path="/about">
            <AboutPage />
          </Route>
          <Route exact path="/cart">
            <CartPage />
          </Route>
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
