import React from "react";
import styled from "styled-components";
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

const ThemeToggler = ({ onClick }) => {
  return (
    <Wrapper onClick={onClick}>
      <FaSun />
    </Wrapper>
  );
};

export default ThemeToggler;
