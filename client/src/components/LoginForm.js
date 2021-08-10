import {React, useState} from "react";
import styled from "styled-components";
import Button from "../components/Button"
import { useUserContext } from "../context/UserContext"
;
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
`;

const LoginForm = () => {
  const { loginUser } = useUserContext();
  const [ username, setUsername ] = useState("");
  const [ password, setPassword ] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser({
      username,
      password
    })
  }

  return (
    <Wrapper>
      <form onSubmit={(e) => handleSubmit(e)}>
        <h1>IELEC</h1>
        <label for="username">Username</label>
        <input type="text" name="username" placeholder="username" onChange={(e)=>setUsername(e.target.value)} required></input>
        <label>Password</label>
        <input type="password" name="passowrd" placeholder="********" onChange={(e)=>setPassword(e.target.value)} required></input>
          <Button>Login In</Button>
      </form>
    </Wrapper>
  );
};
export default LoginForm;
