import React, { useContext, useReducer } from "react";
import ImageKit from "imagekitio-react";

import api from "./Api";
import reducer from "../reducers/AdminReducer";
import axios from "axios";
import {
  FETCH_USERS_BEGIN,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_ERROR,
  FETCH_DASHBOARD_BEGIN,
  FETCH_DASHBOARD_SUCCESS,
  FETCH_DASHBOARD_ERROR,
  FETCH_PRODUCTS_BEGIN,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_ERROR,
  FETCH_TRANSACTONS_BEGIN,
  FETCH_TRANSACTONS_SUCCESS,
  FETCH_TRANSACTONS_ERROR,
  ADD_USER_BEGIN,
  ADD_USER_SUCCESS,
  ADD_USER_ERROR,
  ADD_PRODUCT_BEGIN,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_ERROR,
  FETCH_BRAND_BEGIN,
  FETCH_BRAND_SUCCESS,
  FETCH_BRAND_ERROR,
} from "../reducers/actions/AdminAction";
const REACT_APP_DOMAIN = process.env.REACT_APP_DOMAIN;
console.log(REACT_APP_DOMAIN);

const AdminContext = React.createContext();

const initialState = {
  isLoading: false,
  isError: false,
  msg: null,
  dashboard: {
    user: {
      numOfUsers: 0,
      numOfNewUsers: 0,
    },
    order: {
      numOfOrders: 0,
      numOfNewOrders: 0,
    },
    sales: {
      totalSales: 0,
      todaySales: 0,
    },
    topProducts: [],
  },
  transactions: [],
  products: [],
  brands: [],
  categories: [],
  properties: [],
  users: [],
};

export const AdminProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchDashboard = async () => {
    try {
      dispatch({ type: FETCH_DASHBOARD_BEGIN });
      const response = await api.get("/admin/dashboard");
      dispatch({ type: FETCH_DASHBOARD_SUCCESS, payload: response.data });
      console.log(response);
    } catch (e) {
      console.log(e);
      dispatch({ type: FETCH_DASHBOARD_ERROR });
    }
  };

  // USER

  const fetchUsers = async () => {
    try {
      dispatch({ type: FETCH_USERS_BEGIN });
      const response = await api.get("/admin/users");
      dispatch({ type: FETCH_USERS_SUCCESS, payload: response.data });
    } catch (e) {
      console.log(e);
      dispatch({ type: FETCH_USERS_ERROR });
    }
  };

  // PRODUCT
  const fetchProducts = async () => {
    try {
      dispatch({ type: FETCH_PRODUCTS_BEGIN });
      const response = await api.get("/products");
      dispatch({ type: FETCH_PRODUCTS_SUCCESS, payload: response.data });
    } catch (e) {
      console.log(e);
      dispatch({ type: FETCH_PRODUCTS_ERROR });
    }
  };

  // BRAND
  const fetchBrands = async () => {
    try {
      dispatch({ type: FETCH_BRAND_BEGIN });
      const response = await api.get("/brands");
      dispatch({ type: FETCH_BRAND_SUCCESS, payload: response.data });
    } catch (e) {
      console.log(e);
      dispatch({ type: FETCH_BRAND_ERROR });
    }
  };

  const addBrand = async (name) => {
    try {
      await api.post("/brands", { name: name });
      return { status: true };
    } catch (e) {
      console.log(e.response.data);
      return { status: false, msg: e.response.data };
    }
  };

  // TRANSACTION
  const fetchTransactions = async () => {
    try {
      dispatch({ type: FETCH_TRANSACTONS_BEGIN });
      const response = await api.get("/admin/transactions");
      dispatch({ type: FETCH_TRANSACTONS_SUCCESS, payload: response.data });
    } catch (e) {
      console.log(e);
      dispatch({ type: FETCH_TRANSACTONS_ERROR });
    }
  };

  const addUser = async (user) => {
    try {
      dispatch({ type: ADD_USER_BEGIN });
      await api.post("/admin/users", user);
      dispatch({ type: ADD_USER_SUCCESS });
      return { status: true };
    } catch (e) {
      dispatch({ type: ADD_USER_ERROR });
      return { status: false, msg: e.response.data };
    }
  };

  const addProduct = async (product) => {
    try {
      dispatch({ type: ADD_PRODUCT_BEGIN });
      // make sure no duplicate product
      await api.post("/products/duplicate", product);

      // upload profile
      let profilePath = await uploadImage(
        product.profilePath,
        product.profilePath.name
      );
      product.profilePath = profilePath;

      // upload images
      let imagePaths = [];
      if (product.imagePaths && product.imagePaths.length > 0) {
        for (let i = 0; i < product.imagePaths.length; ++i) {
          imagePaths.push(
            await uploadImage(product.imagePaths[i], product.imagePaths[i].name)
          );
        }
      }
      product.imagePaths = imagePaths;

      await api.post("/products", product);
      dispatch({ type: ADD_PRODUCT_SUCCESS });
      return { status: true };
    } catch (e) {
      console.log(e.response.data);
      dispatch({ type: ADD_PRODUCT_ERROR });
      return { status: false, msg: e.response.data };
    }
  };

  const uploadImage = async (imgRaw, fileName) => {
    try {
      let img64 = await toBase64(imgRaw);

      const auth = await api.get("/image/auth");
      var bodyFormData = new FormData();
      bodyFormData.append("file", img64);
      bodyFormData.append("publicKey", "public_qoA5QkcHMyikXP/IYVqqyw8zh0Q=");
      bodyFormData.append("signature", auth.data.signature);
      bodyFormData.append("expire", auth.data.expire);
      bodyFormData.append("token", auth.data.token);
      bodyFormData.append("fileName", fileName);
      const response = await axios.post(
        "https://upload.imagekit.io/api/v1/files/upload",
        bodyFormData
      );

      return response.data.url;
    } catch (e) {
      console.log(e.response);
    }
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  return (
    <AdminContext.Provider
      value={{
        ...state,
        fetchUsers,
        addUser,
        fetchDashboard,
        fetchProducts,
        fetchBrands,
        addBrand,
        fetchTransactions,
        addProduct,
        uploadImage,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdminContext = () => {
  return useContext(AdminContext);
};
