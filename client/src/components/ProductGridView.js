import React from "react";
import styled from "styled-components";
import Product from "./Product";
import { useProductContext } from "../context/ProductContext";
import Loading from "./Loading";
import { Link, useLocation } from "react-router-dom";

const Wrapper = styled.div`
  display: grid;
  justify-content: center;
  column-gap: 3rem;
  row-gap: 4rem;
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: min-content;
  }
  @media (min-width: 1440px) {
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: min-content;
  }
  h3 {
    grid-column: span 1/3;
    text-align: center;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
`;

const ProductGridView = ({ products }) => {
  const { isLoading, isError } = useProductContext();
  const { pathname } = useLocation();

  if (isLoading) return <Loading />;
  if (isError)
    return (
      <Wrapper>
        <h3>Sorry, there's an error</h3>
      </Wrapper>
    );
  if (products.length === 0) {
    return (
      <Wrapper>
        <h3>Sorry, there are no products of this kind currently</h3>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      {products.map((product) => {
        const { _id, name, price, profile } = product;
        return (
          <Product
            key={_id}
            name={name}
            price={price}
            img={profile}
            pathname={pathname}
            _id={_id}
          />
        );
      })}
    </Wrapper>
  );
};

export default ProductGridView;
