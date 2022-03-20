import React, { useContext, useReducer } from "react";
import reducer from "../reducers/AdminReducer";
import axios from "axios";
import {
  FETCH_USERS_BEGIN,
  FETCH_USERS_SUCCESS,
  // FETCH_USERS_ERROR,
} from "../reducers/actions/AdminAction";

const AdminContext = React.createContext();

const initialState = {
  isLoading: false,
  isError: false,
  categories: [],
  properties: [],
  users: [],
};

export const AdminProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const BASE_URL = "http://localhost:4000";
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
  });

  const addUser = async (user) => {
    try {
      const response = await api.post("/users/signup", user);
      const status = response.status;
      return status;
    } catch (e) {
      return e;
    }
  };

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

  const fetchUsers = async () => {
    dispatch({ type: FETCH_USERS_BEGIN });
    try {
      const response = await api.get("/users");
      dispatch({ type: FETCH_USERS_SUCCESS, payload: response.data });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <AdminContext.Provider
      value={{ ...state, addUser, addProduct, fetchUsers }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdminContext = () => {
  return useContext(AdminContext);
};
