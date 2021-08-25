import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useProductContext } from "../context/ProductContext";
import Loading from "./Loading";
import Product from "./Product";
import Title from "./Title";

const Wrapper = styled.section`
  align-items: center;
  background: #f1f5f8;
  display: flex;
  flex-direction: column;
  gap: 5rem;
  width: 100%;
  justify-content: center;
  padding: 5rem;
  .container {
    display: flex;
    flex-direction: column;
    gap: 5rem;
    justify-content: center;
    width: 100%;
    @media (min-width: 1024px) {
      flex-direction: row;
    }
  }
`;

const FeaturedProducts = () => {
  const [featuredProducts, setFeaturedProducts] = useState({
    isLoading: false,
    products: [],
  });
  const { fetchFeaturedProducts } = useProductContext();

  useEffect(async () => {
    setFeaturedProducts({ ...featuredProducts, isLoading: true });
    let tempProducts = await fetchFeaturedProducts();
    setFeaturedProducts({ isLoading: false, products: tempProducts });
  }, []);

  if (featuredProducts.isLoading) {
    return <Loading />;
  }
  return (
    <Wrapper>
      <Title title={"Featured Products"} />
      <div className="container section-center">
        {featuredProducts.products.map((product) => {
          const { _id, name, profile, price } = product;
          return <Product key={_id} name={name} img={profile} price={price} />;
        })}
      </div>
    </Wrapper>
  );
};

export default FeaturedProducts;
