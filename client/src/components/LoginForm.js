import React from "react";
import styled from "styled-components";

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
      input {
        width: 100%;
      }
    }
  }
`;

const LoginForm = () => {
  return (
    <Wrapper>
      <form action="localhost:4000/users">
        <h1>IELEC</h1>
        <label for="username">Username</label>
        <input name="username" placeholder="username" required></input>
        <label>Password</label>
        <input name="passowrd" placeholder="********" required></input>
        <div>
          <input type="submit" value="Sign up"></input>
          <input type="submit" value="Login in"></input>
        </div>
      </form>
    </Wrapper>
  );
};
export default LoginForm;
