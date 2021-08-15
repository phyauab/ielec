import React, { useContext, useReducer } from "react";
import reducer from "../reducers/ProductReducer";
import axios from "axios";
import {
  FETCH_PRODUCT_BEGIN,
  FETCH_PRODUCT_SUCCESS,
  FETCH_PHONE_SUCCESS,
  FETCH_PRODUCT_ERROR,
} from "../reducers/actions/ProductAction";

const ProductContext = React.createContext();

const initialState = {
  isLoading: false,
  isError: false,
  products: [],
};

export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const BASE_URL = "http://localhost:4000";
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
  });

  const fetchProducts = async () => {
    try {
      dispatch({ type: FETCH_PRODUCT_BEGIN });
      const response = await api.get("/products");
      console.log(response);
    } catch (error) {}
  };

  return (
    <ProductContext.Provider value={{ ...state, fetchProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  return useContext(ProductContext);
};
