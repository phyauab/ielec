import { React, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { GlobalStyle } from "./components/Theme/GlobalStyle";
import { useAppContext } from "./context/AppContext";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
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
        <Switch>
          {/* No Navbar Page */}
          <Route exact path="/login">
            <LoginPage />
          </Route>
          {/* No Navbar Page */}
          <Navbar />
          <Sidebar />
          <Route exact path="/">
            <HomePage />
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
      </Router>
    </>
  );
}

export default App;
