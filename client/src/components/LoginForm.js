import { React, useState } from "react";
import styled from "styled-components";
import Button from "../components/Button";
import { useUserContext } from "../context/UserContext";
import { Link, useHistory } from "react-router-dom";

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  form {
    border: 1px ${(props) => props.theme.text} solid;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 3rem;
    h1 {
      text-align: center;
    }
    input {
      padding: 0.5rem;
    }
  }
  a {
    text-align: center;
    text-decoration: none;
    color: inherit;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const LoginForm = () => {
  const { loginUser } = useUserContext();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isSuccess= await loginUser({
      username,
      password,
    });
    if(isSuccess) {
      history.push({
        pathname: "/",
      });
    }
  };

  return (
    <Wrapper>
      <form onSubmit={(e) => handleSubmit(e)}>
        <h1>IELEC</h1>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
          required
        ></input>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          placeholder="********"
          onChange={(e) => setPassword(e.target.value)}
          required
        ></input>
        <Button>Login In</Button>
        <Link to="/">Back</Link>
      </form>
    </Wrapper>
  );
};
export default LoginForm;
