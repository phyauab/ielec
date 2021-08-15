import React, { useState } from "react";
import styled from "styled-components";
import links from "../utils/links";

const Wrapper = styled.div`
  flex-grow: 1;
  form {
    div {
      display: flex;
      flex-direction: column;
      button {
        border: none;
        background: ${(props) => props.theme.body};
        padding: 0.5rem 0rem;
        width: fit-content;
        &:hover {
          cursor: pointer;
        }
      }
    }
  }
`;

const ProductFilter = () => {
  return (
    <Wrapper>
      <form>
        <div>
          <h3>Category</h3>
          <button>All</button>
          {links.map((link) => (
            <button>{link.text}</button>
          ))}
        </div>
      </form>
    </Wrapper>
  );
};

export default ProductFilter;
