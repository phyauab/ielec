import React from "react";
// import LoginForm from "../components/LoginForm";
import { useUserContext } from "../context/UserContext";

const LoginPage = () => {
  const { isUserLoading } = useUserContext();

  if (isUserLoading) {
    return <p>Loading</p>;
  }

  // return <LoginForm />
  return <p>123</p>;
};

export default LoginPage;
