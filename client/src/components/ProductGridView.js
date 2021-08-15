import React from "react";
import styled from "styled-components";
import Product from "./Product";

const Wrapper = styled.div`
  display: grid;
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
  gap: 1rem;
`;

const ProductGridView = ({ products }) => {
  return (
    <Wrapper>
      <Product name="Iphone" price="123" />
      <Product name="Iphone" price="123" />
      <Product name="Iphone" price="123" />
      <Product name="Iphone" price="123" />
      <Product name="Iphone" price="123" />
    </Wrapper>
  );
};

export default ProductGridView;
