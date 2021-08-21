import React, { useState, useContext, useReducer } from "react";
import reducer from "../reducers/AdminReducer";
import axios from "axios";
import {
  FETCH_CATEGORIES_BEGIN,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_END,
  FETCH_PROPERTIES_BEGIN,
  FETCH_PROPERTIES_SUCCESS,
  FETCH_PROPERTIES_END,
} from "../reducers/actions/AdminAction";

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

  const fetchCategories = async () => {
    dispatch({ type: FETCH_CATEGORIES_BEGIN });
    try {
      const response = await api.get("/products/categories");
      const tempCategories = response.data.map((category) => {
        if (category != "Accessories") {
          return category.concat("s").toLowerCase();
        }
        return category.toLowerCase();
      });
      dispatch({ type: FETCH_CATEGORIES_SUCCESS, payload: tempCategories });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProperties = async () => {
    dispatch({ type: FETCH_PROPERTIES_BEGIN });
    try {
      const response = await api.get("/products/properties");
      const tempProperties = [];
      const object = response.data;
      for (const property in object) {
        if (property != "_id" && property != "__v" && property != "category") {
          const type = object[property].instance;
          tempProperties.push({ property, type });
        }
      }
      dispatch({ type: FETCH_PROPERTIES_SUCCESS, payload: tempProperties });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AdminContext.Provider
      value={{ ...state, fetchCategories, fetchProperties }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdminContext = () => {
  return useContext(AdminContext);
};
