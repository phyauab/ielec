import React from "react";
import styled from "styled-components";
import { FaBars } from "react-icons/fa";
import logo from "../assets/Logo.png";
import { Button } from "./UI/Button";

const Wrapper = styled.div`
  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.2);
  color: ${(props) => props.theme.background};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  height: 80px;
  width: 100%;
  div {
    display: flex;
    align-items: center;
    @media (min-width: 768px) {
      flex: 1;
      justify-content: center;
    }
    ul {
      padding: 0 2rem;
      align-items: center;
      display: flex;
      list-style: none;
      justify-content: space-around;
      width: 100%;
    }
  }
  .nav-left {
    @media (max-width: 768px) {
      display: none;
    }
  }
  .nav-logo {
    padding: 1rem;
  }
  .nav-right {
    display: none;
    @media (min-width: 768px) {
      display: flex;
    }
  }
  .nav-menu {
    font-size: 1.25rem;
    padding: 1rem;
    @media (min-width: 768px) {
      display: none;
    }
  }
`;

const Navbar = () => {
  return (
    <Wrapper>
      <div className="nav-left">
        <ul>
          <li>Phone</li>
          <li>Laptop</li>
          <li>Headphone</li>
          <li>Accessories</li>
        </ul>
      </div>

      <div className="nav-logo">
        <img src={logo} alt="IELEC" />
      </div>
      <div className="nav-right">
        <input type="text"></input>
        <p>HKD</p>
        <Button>Login</Button>
      </div>
      <div className="nav-menu">
        <FaBars />
      </div>
    </Wrapper>
  );
};

export default Navbar;
