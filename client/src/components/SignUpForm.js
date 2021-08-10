import React from 'react'
import styled from 'styled-components';
import Button from "./Button"

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

const SignUpForm = () => {
    return (
        <Wrapper>
            <form>
                <h1>IELEC</h1>

                {/* Username */}
                <label for="username">Username</label>
                <input name="username" placeholder="username" required></input>

                {/* Email */}
                <label for="email">Email</label>
                <input name="email" placeholder="exmaple@gmail.com" required></input>

                {/* Password */}
                <label>Password</label>
                <input name="passowrd" placeholder="********" required></input>
                <Button>Sign Up</Button>
            </form>
        </Wrapper>
    )
}

export default SignUpForm;