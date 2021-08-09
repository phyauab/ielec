import React from "react";
import styled from "styled-components";

const Wrapper = styled.button`
  background: ${(props) => props.theme.body};
  border: 1px solid ${(props) => props.theme.primary};
  border-radius: 25px;
  color: ${(props) => props.theme.text};
  font-size: 1em;
  padding: 0.5em 1.5em;
  transition: 0.3s ease-out;
  &:hover {
    background: ${(props) => props.theme.primary};
    color: ${(props) => props.theme.body};
    cursor: pointer;
  }
`;

const Button = ({ children, onClick }) => {
  return <Wrapper onClick={onClick}>{children}</Wrapper>;
};

export default Button;
