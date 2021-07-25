import React from "react";
import styled from "styled-components";
import { useAppContext } from "../context/AppContext";
import { FaSun, FaMoon } from "react-icons/fa";

const Wrapper = styled.button`
  border: none;
  background: ${(props) => props.theme.body};
  color: ${(props) => props.theme.text};
  font-size: 1.25rem;
  padding: 0.25rem;
  transition: all 0.3s ease-out;
  &:hover {
    cursor: pointer;
  }
`;

const ThemeToggler = () => {
  const { theme, switchTheme } = useAppContext();

  return (
    <Wrapper onClick={switchTheme}>
      {theme === "light" ? <FaMoon /> : <FaSun />}
    </Wrapper>
  );
};

export default ThemeToggler;
