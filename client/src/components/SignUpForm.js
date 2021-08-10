import {React, useState} from 'react'
import styled from 'styled-components';
import Button from "./Button"
import { useUserContext } from "../context/UserContext"
import { Link } from "react-router-dom"

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
    a {
      text-align: center;
      text-decoration: none;
      color: inherit;
      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

const SignUpForm = () => {
  const { signUpUser } = useUserContext();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    signUpUser({
      username,
      email,
      password
    })
  }

  return (
      <Wrapper>
          <form onSubmit={(e)=> handleSubmit(e)}>
              <h1>IELEC</h1>

              {/* Username */}
              <label htmlFor="username">Username</label>
              <input name="username" placeholder="username" onChange={(e) => setUsername(e.target.value)} required></input>

              {/* Email */}
              <label htmlFor="email">Email</label>
              <input name="email" placeholder="exmaple@gmail.com" onChange={(e) => setEmail(e.target.value)} required></input>

              {/* Password */}
              <label htmlFor="password">Password</label>
              <input name="password" placeholder="********" onChange={(e) => setPassword(e.target.value)} required></input>
              <Button>Sign Up</Button>
              <Link to="/">Back</Link>

          </form>
      </Wrapper>
  )
}

export default SignUpForm;