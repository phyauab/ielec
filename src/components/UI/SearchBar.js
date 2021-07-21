import { React, useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";

const Wrapper = styled.div`
  border: 1px solid #7b7b7b;
  border-radius: 25px;
  background: ${(props) => props.theme.body};
  padding: 0.5rem 1rem;
  transition: 0.3s ease-out;
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
    padding: 0rem 0.25rem;
    &:hover {
      cursor: pointer;
    }
  }
`;

export const SearchBar = () => {
  const [isFocus, setIsFocus] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (isFocus) {
      wrapperRef.current.style.borderColor = "#3F3F3F";
      wrapperRef.current.style.boxShadow = "0px 0px 8px #3F3F3F";
    } else {
      wrapperRef.current.style.borderColor = "#7b7b7b";
      wrapperRef.current.style.boxShadow = "";
    }
  }, [isFocus]);

  return (
    <Wrapper ref={wrapperRef}>
      <input
        type="text"
        onFocus={() => {
          setIsFocus(true);
        }}
        onBlur={() => {
          setIsFocus(false);
        }}
        placeholder="Search a product..."
      ></input>
      <button>
        <FaSearch />
      </button>
    </Wrapper>
  );
};
