import { React, useState } from "react";
import styled from "styled-components";
import { FaBars } from "react-icons/fa";
import { SearchBar } from "./UI";
import ThemeToggler from "./ThemeToggler";
import logoLight from "../assets/Logo-light.png";
import logoDark from "../assets/Logo-dark.png";
import links from "../utils/links";
import { capitalize } from "../utils/helpers";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { useUserContext } from "../context/UserContext";
import Button from "./Button";

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
        color: ${(props) => props.theme.text};
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
    ul {
      display: flex;
      padding: 0;
      justify-content: flex-start;
    }
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
      gap: 0.5rem;
    }
    .nav-right__account{
      div {
        display: flex;
        gap: 0.5rem;
      }
    }
  }
  .nav-menu {
    font-size: 1.25rem;
    padding: 1rem;
    @media (min-width: 768px) {
      display: none;
    }
    &:hover {
      cursor: pointer;
    }
  }
  .btn {
    background: ${(props) => props.theme.body};
    border: 1px solid ${(props) => props.theme.primary};
    border-radius: 25px;
    color: ${(props) => props.theme.text};
    font-size: 1em;
    padding: 0.5em 1em;
    transition: 0.3s ease-out;
    text-decoration: none;
    &:hover {
      background: ${(props) => props.theme.primary};
      color: ${(props) => props.theme.body};
      cursor: pointer;
    }
  }
`;

const Navbar = () => {
  const { theme, isSidebarOpen, setIsSidebarOpen } = useAppContext();
  const { user, logoutUser, isLoggedIn, isUserLoading } = useUserContext();

  return (
    <Wrapper className="section-center">
      <div className="nav-left">
        <ul>
          {links.map((link, index) => (
            <Link key={index} to={`/products${link.url}`}>
              <li>{capitalize(link.text)}</li>
            </Link>
          ))}
        </ul>
      </div>

      <div className="nav-logo">
        <Link to="/">
          <img src={theme === "light" ? logoLight : logoDark} alt="IELEC" />
        </Link>
      </div>
      <div className="nav-right">
        <SearchBar />
        <ThemeToggler />
        <div className="nav-right__account">
          { isUserLoading ? <p>loading</p> 
            : isLoggedIn ? 
            <Button onClick={() => logoutUser()}>Logut</Button> :
            <div>
              <Link to="/login" className="btn">
                Login
              </Link>
              <Link to="/signup" className="btn">
                Sign up
              </Link>
            </div>
          }
        </div>
      </div>
      <div
        className="nav-menu"
        onClick={() => {
          setIsSidebarOpen(!isSidebarOpen);
        }}
      >
        <FaBars />
      </div>
    </Wrapper>
  );
};

export default Navbar;
