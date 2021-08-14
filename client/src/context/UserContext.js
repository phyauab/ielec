import React, { useState, useContext, useReducer } from "react";
import reducer from "../reducers/UserReducer";
import axios from "axios";
import {
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  LOGOUT_USER_BEGIN,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_ERROR,
  SIGNUP_USER_BEGIN,
  SIGNUP_USER_SUCCESS,
  SIGNUP_USER_ERROR,
} from "../reducers/actions/UserAction";

const UserContext = React.createContext();

const initialState = {
  isLoggedIn: false,
  isLoading: false,
  isError: false,
  user: null,
  token: null,
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const BASE_URL = "http://localhost:4000";
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
  });

  const loginUser = async ({ username, password }) => {
    try {
      dispatch({ type: LOGIN_USER_BEGIN });
      const response = await api.post("/users/login", {
        data: {
          username,
          password,
        },
      });
      const { user, token } = response.data;
      dispatch({ type: LOGIN_USER_SUCCESS, payload: { user, token } });
      return true;
    } catch (error) {
      dispatch({ type: LOGIN_USER_ERROR });
      return false;
    }
  };

  const logoutUser = async () => {
    try {
      dispatch({ type: LOGOUT_USER_BEGIN });
      await api.post(
        "/users/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );
      dispatch({ type: LOGOUT_USER_SUCCESS });
    } catch (error) {
      dispatch({ type: LOGOUT_USER_ERROR });
      console.logoutUser(error);
      alert("Failed to Logout");
    }
  };

  const signUpUser = async ({ username, email, password }) => {
    try {
      dispatch({ type: SIGNUP_USER_BEGIN });
      const response = await axios.post("http://localhost:4000/users/signup", {
        username,
        email,
        password,
      });
      const { user, token } = response.data;
      dispatch({ type: SIGNUP_USER_SUCCESS, payload: { user, token } });
      return true;
    } catch (error) {
      dispatch({ type: SIGNUP_USER_ERROR });
      console.log(error);
      return false;
    }
  };

  return (
    <UserContext.Provider
      value={{
        ...state,
        loginUser,
        logoutUser,
        signUpUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
