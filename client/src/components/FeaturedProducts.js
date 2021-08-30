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
    isError: false,
    products: [],
  });
  const { fetchFeaturedProducts } = useProductContext();

  useEffect(async () => {
    setFeaturedProducts({ ...featuredProducts, isLoading: true });
    try {
      let tempProducts = await fetchFeaturedProducts();

      setFeaturedProducts({
        ...featuredProducts,
        isLoading: false,
        products: tempProducts,
      });
    } catch (error) {
      setFeaturedProducts({
        ...featuredProducts,
        isLoading: false,
        isError: true,
      });
    }
  }, []);

  if (featuredProducts.isLoading) {
    return (
      <Wrapper>
        <Loading />
      </Wrapper>
    );
  }

  if (featuredProducts.isError || featuredProducts.products.length === 0) {
    return (
      <Wrapper>
        <h3>Sorry, something went wrong :(</h3>
      </Wrapper>
    );
  }

  const getType = (type) => {
    switch (type) {
      case "Phone":
        return "phones";
      case "Laptop":
        return "laptops";
      case "Headphone":
        return "headphones";
      case "Accessories":
        return "accessories";
    }
  };

  return (
    <Wrapper>
      <Title title={"Featured Products"} />
      <div className="container section-center">
        {featuredProducts.products.map((product, index) => {
          const { _id, name, profile, price, __t } = product;
          const type = getType(__t);
          return (
            <Product
              key={_id}
              _id={_id}
              name={name}
              img={profile}
              price={price}
              pathname={`products/${type}`}
            />
          );
        })}
      </div>
    </Wrapper>
  );
};

export default FeaturedProducts;
