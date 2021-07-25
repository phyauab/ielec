import { React, useState } from "react";
import styled from "styled-components";
import { FaBars } from "react-icons/fa";
import { SearchBar } from "./UI";
import ThemeToggler from "./ThemeToggler";
import Button from "./Button";
import logo from "../assets/Logo.png";
import links from "../utils/links";
import { capitalize } from "../utils/helpers";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  align-items: center;
  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.2);
  color: ${(props) => props.theme.text};
  display: flex;
  justify-content: space-between;

  height: 80px;
  overflow: hidden;
  width: 100%;
  div {
    display: flex;
    align-items: center;
    @media (min-width: 768px) {
      flex: 1;
      justify-content: center;
    }
    ul {
      align-items: center;
      display: flex;
      justify-content: center;
      gap: 2rem;
      list-style: none;
      padding: 0 2rem;
      width: 100%;
      a {
        border-bottom: 1px solid ${(props) => props.theme.body};
        text-decoration: none;
        padding-bottom: 3px;
        transition: 0.3s ease-out;
        &:visited {
          color: inherit;
        }
        &:hover {
          border-color: ${(props) => props.theme.primary};
        }
      }
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
      padding: 0 2rem;
      justify-content: flex-end;
      gap: 2rem;
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
    <Wrapper className="section-center">
      <div className="nav-left">
        <ul>
          {links.map((link) => (
            <Link to={`/products${link.url}`}>
              <li>{capitalize(link.text)}</li>
            </Link>
          ))}
        </ul>
      </div>

      <div className="nav-logo">
        <Link to="/">
          <img src={logo} alt="IELEC" />
        </Link>
      </div>
      <div className="nav-right">
        <SearchBar />
        <ThemeToggler />
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
