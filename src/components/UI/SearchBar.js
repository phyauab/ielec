import { React, useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";

const Wrapper = styled.div`
  border: 1px solid #7b7b7b;
  border-radius: 25px;
  background: ${(props) => props.theme.body};
  padding: 0.5rem 1rem;
  transition: 0.2s linear;
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
  const [isFocus, setIsFocus] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (isFocus) {
      wrapperRef.current.style.borderColor = "#2D2D2D";
      wrapperRef.current.style.boxShadow = "4px 4px 4px #DCDCDC";
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
