import styled from "styled-components";

export const Button = styled.button`
  background: ${(props) => props.theme.body};
  font-size: 1em;
  padding: 0.5em 1.5em;
  border: 1px solid ${(props) => props.theme.primary};
  border-radius: 25px;
  transition: 0.3s ease-out;
  &:hover {
    background: ${(props) => props.theme.primary};
    color: ${(props) => props.theme.body};
    cursor: pointer;
  }
`;
