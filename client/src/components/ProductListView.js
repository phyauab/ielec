import React from "react";
import styled from "styled-components";
import Product from "./ProductCard";

const Wrapper = styled.div``;

const ProductListView = ({ products }) => {
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

export default ProductListView;
