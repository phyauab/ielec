import React, { useState, useContext } from "react";
import axios from "axios";

const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isUserLoading, setIsUserLoading] = useState(false);

  const loginUser = async ({ username, password }) => {
    try {
      setIsUserLoading(true);
      const response = await axios.post("http://localhost:4000/users/login", {
        username,
        password,
      });
      const { user, token } = response.data;
      setUser(user);
      setToken(token);
      setIsLoggedIn(true);
      return true;
    } catch (error) {
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
      value={{ user, loginUser, logoutUser, signUpUser, isLoggedIn, isUserLoading }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
