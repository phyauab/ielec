import React from "react";
import styled from "styled-components";
import Product from "./Product";
import { useProductContext } from "../context/ProductContext";

const Wrapper = styled.div`
  display: grid;
  justify-content: center;
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (min-width: 1440px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
  h3 {
    grid-column: span 1/3;
    text-align: center;
  }
  gap: 1rem;
`;

const ProductGridView = ({ products }) => {
  const { isLoading, isError } = useProductContext();

  if (isLoading) return <p>Loading</p>;
  if (isError) return <p>Error</p>;
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
        return <Product key={_id} name={name} price={price} img={profile} />;
      })}
    </Wrapper>
  );
};

export default ProductGridView;
