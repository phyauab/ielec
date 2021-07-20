import { React, useState } from "react";
import styled from "styled-components";
import { FaBars } from "react-icons/fa";
import { Button, SearchBar } from "./UI";
import logo from "../assets/Logo.png";
import links from "../utils/links";
import { capitalize } from "../utils/helpers";
import { Toggler } from "./components/Theme/Toggler";
import { lightTheme, darkTheme } from "./components/Theme/Theme";

const Wrapper = styled.div`
  align-items: center;
  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.2);
  color: ${(props) => props.theme.background};
  display: flex;
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
      align-items: center;
      display: flex;
      justify-content: center;
      gap: 2rem;
      list-style: none;
      padding: 0 2rem;
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
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  return (
    <Wrapper>
      <div className="nav-left">
        <ul>
          {links.map((link) => (
            <li>{capitalize(link.text)}</li>
          ))}
        </ul>
      </div>

      <div className="nav-logo">
        <img src={logo} alt="IELEC" />
      </div>
      <div className="nav-right">
        <SearchBar />
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
