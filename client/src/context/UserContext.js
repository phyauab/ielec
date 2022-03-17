import React, { useState, useContext, useReducer, useEffect } from "react";
import jwt_decode from "jwt-decode";
import reducer from "../reducers/UserReducer";
import api from "./Api";
import { useHistory } from "react-router-dom";
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

const initialUserState = {
  isLoggedIn: false,
  isLoading: false,
  isError: false,
  msg: null,
  user: null,
  token: null,
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialUserState);

  const login = async (username, password) => {
    try {
      dispatch({ type: LOGIN_USER_BEGIN });
      const response = await api.post("/users/login", {
        username: username,
        password: password,
      });
      console.log(response.data);
      const { user, access_token } = response.data;
      dispatch({ type: LOGIN_USER_SUCCESS, payload: { user } });
      localStorage.setItem("access_token", access_token);
    } catch (error) {
      console.log(error.response.data.msg);
      dispatch({
        type: LOGIN_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
      return false;
    }
  };

  const logout = async () => {
    try {
      dispatch({ type: LOGOUT_USER_BEGIN });
      // await api.post(
      //   "/users/logout",
      //   {},
      //   {
      //     headers: {
      //       Authorization: `Bearer ${state.token}`,
      //     },
      //   }
      // );
      dispatch({ type: LOGOUT_USER_SUCCESS });
      localStorage.removeItem("access_token");
    } catch (error) {
      dispatch({ type: LOGOUT_USER_ERROR, payload: {} });
      console.log(error);
    }
  };

  const signUpUser = async ({ username, password, email }) => {
    try {
      dispatch({ type: SIGNUP_USER_BEGIN });
      const response = await api.post("/users/signup", {
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

  const refresh = async (access_token) => {
    try {
      dispatch({ type: LOGIN_USER_BEGIN });
      const response = await api.post(
        "/users/refresh",
        {},
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      const { user, token } = response.data;
      // admin cannot relogin
      if (user.isAdmin) {
        dispatch({ type: LOGIN_USER_ERROR });
        return;
      }
      dispatch({ type: LOGIN_USER_SUCCESS, payload: { user, token } });
    } catch (error) {
      dispatch({ type: LOGIN_USER_ERROR });
      console.log(error);
    }
  };

  const getMe = async (access_token) => {
    try {
      // dispatch({ type: LOGIN_USER_BEGIN });
      const response = await api.get("/users/me", {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      const user = response.data;
      // admin cannot relogin
      // if (user.isAdmin) {
      //   dispatch({ type: LOGIN_USER_ERROR });
      //   return;
      // }
      // dispatch({ type: LOGIN_USER_SUCCESS, payload: { user } });
    } catch (error) {
      // console.log("getme error");
      // console.log(error.response.data.error);
      // dispatch({
      //   type: LOGIN_USER_ERROR,
      //   payload: { msg: error.response.data.error },
      // });
      // console.log(error);
    }
  };

  const validateToken = (token) => {
    let expiry = jwt_decode(token).exp;
    const now = new Date();

    // if now < exp time = valid
    return now.getTime() < expiry * 1000;
  };

  useEffect(() => {
    const access_token = localStorage.getItem("access_token");
    if (access_token) {
      console.log("have access token");
      if (validateToken(access_token)) {
        console.log("now refresh");
        getMe(access_token);
      }
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        ...state,
        login,
        logout,
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
