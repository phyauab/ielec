import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AppProvider } from "./context/AppContext";
import { UserProvider } from "./context/UserContext";
import { ProductProvider } from "./context/ProductContext";
import { AdminProvider } from "./context/AdminContext";

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <UserProvider>
        <AdminProvider>
          <ProductProvider>
            <App />
          </ProductProvider>
        </AdminProvider>
      </UserProvider>
    </AppProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
