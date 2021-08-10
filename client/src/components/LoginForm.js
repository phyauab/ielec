import React from "react";
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
    div {
      width: 100%;
      Button {
        width: 100%;
        margin-bottom: 5px;
      }
    }
  }
`;

const LoginForm = () => {

  const { loginUser } = useUserContext();

  return (
    <Wrapper>
      <form>
        <h1>IELEC</h1>
        <label for="username">Username</label>
        <input name="username" placeholder="username" required></input>
        <label>Password</label>
        <input name="passowrd" placeholder="********" required></input>
        <div>
          <Button onClick={ (e) => loginUser(e)}>Login In</Button>
          <Button>Sign Up</Button>
        </div>
      </form>
    </Wrapper>
  );
};
export default LoginForm;
