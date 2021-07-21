import { React, useState } from "react";
import { ThemeProvider } from "styled-components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { GlobalStyle } from "./components/Theme/GlobalStyle";
import Navbar from "./components/Navbar";
import { lightTheme, darkTheme } from "./components/Theme/Theme";
import {
  AboutPage,
  CartPage,
  CheckoutPage,
  ErrorPage,
  HomePage,
  ProductsPage,
  SingleProductPage,
} from "./pages";

function App() {
  const [theme, setTheme] = useState("light");
  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyle />
      <Router>
        <Navbar />
        <Switch>
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
    </ThemeProvider>
  );
}

export default App;
