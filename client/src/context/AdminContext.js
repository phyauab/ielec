import React, { useState, useContext, useReducer } from "react";
import reducer from "../reducers/AdminReducer";
import axios from "axios";
import {} from "../reducers/actions/AdminAction";

const AdminContext = React.createContext();

const initialState = {
  isLoading: false,
  isError: false,
  categories: [],
  properties: [],
};

export const AdminProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const BASE_URL = "http://localhost:4000";
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
  });

  const addProduct = async (dataArray, category) => {
    // console.log("------");
    // console.log(dataArray);
    try {
      const response = await api.post(`/products/${category}`, dataArray);
      console.log(response);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <AdminContext.Provider value={{ ...state, addProduct }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdminContext = () => {
  return useContext(AdminContext);
};
