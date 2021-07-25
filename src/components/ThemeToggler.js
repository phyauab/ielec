import React from "react";
import styled from "styled-components";
import { useAppContext } from "../context/AppContext";
import { FaSun, FaMoon } from "react-icons/fa";

const Wrapper = styled.button`
  border: none;
  background: ${(props) => props.theme.body};
  font-size: 1.25rem;
  padding: 0.25rem;
  &:hover {
    cursor: pointer;
  }
`;

const ThemeToggler = () => {
  const { switchTheme } = useAppContext();

  return (
    <Wrapper onClick={switchTheme}>
      <FaSun />
    </Wrapper>
  );
};

export default ThemeToggler;
