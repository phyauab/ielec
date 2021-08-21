import React from "react";
import styled from "styled-components";
import Product from "./Product";
import { useProductContext } from "../context/ProductContext";

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
  const { isLoading, isError } = useProductContext();

  if (isLoading) return <p>Loading</p>;
  if (isError) return <p>Error</p>;

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
