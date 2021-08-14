import React, { useState, useContext, useReducer } from "react";
import reducer from "../reducers/UserReducer";
import axios from "axios";
import {
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
} from "../reducers/actions/UserAction";

const UserContext = React.createContext();

const initialState = {
  isLoggedIn: false,
  isLoading: false,
  isError: false,
  user: null,
  token: "",
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isUserLoading, setIsUserLoading] = useState(false);
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
      console.log(error);
      return false;
    } finally {
      setIsUserLoading(false);
    }
  };

  const logoutUser = async () => {
    try {
      setIsUserLoading(true);
      await axios.post(
        "http://localhost:4000/users/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUser(null);
      setToken(null);
      setIsLoggedIn(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsUserLoading(false);
    }
  };

  const signUpUser = async ({ username, email, password }) => {
    try {
      setIsUserLoading(true);
      const response = await axios.post("http://localhost:4000/users/signup", {
        username,
        email,
        password,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsUserLoading(false);
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
