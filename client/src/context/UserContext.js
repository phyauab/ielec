import React, { useContext, useReducer, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useCartContext } from "./CartContext";
import jwt_decode from "jwt-decode";
import reducer from "../reducers/UserReducer";
import api from "./Api";
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
  GETME_DONE,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
} from "../reducers/actions/UserAction";

const UserContext = React.createContext();

const initialUserState = {
  getMe: false,
  isLoggedIn: false,
  isLoading: false,
  isError: false,
  msg: null,
  user: null,
  token: null,
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialUserState);
  const { fetchCartItems } = useCartContext();
  const history = useHistory();

  const clearMsg = () => {
    dispatch({ type: "CLEAR_MSG" });
  };

  const login = async (username, password) => {
    try {
      dispatch({ type: LOGIN_USER_BEGIN });
      const response = await api.post("/users/login", {
        username: username,
        password: password,
      });
      const { user, access_token } = response.data;
      dispatch({ type: LOGIN_USER_SUCCESS, payload: { user } });

      localStorage.setItem("access_token", access_token);

      api.defaults.headers["Authorization"] = `Bearer ${access_token}`;
      return true;
    } catch (error) {
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
      dispatch({ type: LOGOUT_USER_SUCCESS });
      localStorage.removeItem("access_token");
      history.push("/");
    } catch (error) {
      dispatch({ type: LOGOUT_USER_ERROR, payload: {} });
      console.log(error);
    }
  };

  const register = async (
    username,
    firstName,
    lastName,
    password,
    gender,
    email,
    birthday
  ) => {
    try {
      dispatch({ type: SIGNUP_USER_BEGIN });
      const response = await api.post("/users/register", {
        username: username,
        firstName: firstName,
        lastName: lastName,
        password: password,
        gender: gender,
        email: email,
        birthday: birthday,
      });
      console.log(response);
      const { user, access_token } = response.data;
      dispatch({ type: SIGNUP_USER_SUCCESS, payload: { user } });
      localStorage.setItem("access_token", access_token);
      return true;
    } catch (error) {
      dispatch({ type: SIGNUP_USER_ERROR });
      console.log(error);
      return false;
    }
  };

  const updateInfo = async (firstName, lastName, gender, email, birthday) => {
    try {
      dispatch({ type: UPDATE_USER_BEGIN });
      const response = await api.patch("/users/update", {
        firstName: firstName,
        lastName: lastName,
        gender: gender,
        email: email,
        birthday: birthday,
      });
      dispatch({ type: UPDATE_USER_SUCCESS, payload: response.data });
      return true;
    } catch (e) {
      console.log(e);
      dispatch({ type: UPDATE_USER_ERROR });
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
      const { user, access_token } = response.data;
      // admin cannot relogin
      if (user.isAdmin) {
        dispatch({ type: LOGIN_USER_ERROR });
        return;
      }
      dispatch({ type: LOGIN_USER_SUCCESS, payload: { user, access_token } });
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
      console.log(access_token);
      dispatch({ type: LOGIN_USER_SUCCESS, payload: { user } });
      await fetchCartItems();
    } catch (error) {}
  };

  const validateToken = (token) => {
    let expiry = jwt_decode(token).exp;
    const now = new Date();

    // if now < exp time = valid
    return now.getTime() < expiry * 1000;
  };

  const init = async () => {
    const access_token = localStorage.getItem("access_token");
    if (access_token) {
      if (validateToken(access_token)) {
        await getMe(access_token);
      }
    }
  };

  useEffect(() => {
    const init = async () => {
      const access_token = localStorage.getItem("access_token");
      if (access_token) {
        if (validateToken(access_token)) {
          await getMe(access_token);
        }
      }
      dispatch({ type: GETME_DONE });
    };
    init();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <UserContext.Provider
      value={{
        ...state,
        login,
        logout,
        register,
        refresh,
        init,
        clearMsg,
        updateInfo,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
