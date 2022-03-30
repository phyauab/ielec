import React from "react";
import { Route, Redirect } from "react-router";
import { useUserContext } from "../context/UserContext";

const PrivateRoute = ({ children, ...rest }) => {
  const { user } = useUserContext();

  if (!user) {
    return <Redirect to="/"></Redirect>;
  }

  return (
    <Route
      {...rest}
      render={() => {
        return user ? children : <Redirect to="/"></Redirect>;
      }}
    ></Route>
  );
};

export default PrivateRoute;
