import React from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";

const Wrapper = styled.div`
  border: 1px solid ${(props) => props.theme.primary};
  border-radius: 25px;
  background: ${(props) => props.theme.body};
  padding: 0.5rem;
  input {
    border: none;
    background: ${(props) => props.theme.body};
    width: 100%;
    &:focus {
      outline: none;
    }
  }
  button {
    border: none;
  }
`;

export const SearchBar = () => {
  return (
    <Wrapper>
      <input type="text"></input>
      <button>
        <FaSearch />
      </button>
    </Wrapper>
  );
};
