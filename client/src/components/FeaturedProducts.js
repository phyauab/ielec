import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useProductContext } from "../context/ProductContext";
import Loading from "./Loading";
import ProductCard from "./ProductCard";
import Title from "./Title";

// UI
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// const Wrapper = styled.section`
//   align-items: center;
//   background: #f1f5f8;
//   display: flex;
//   flex-direction: column;
//   gap: 5rem;
//   width: 100%;
//   justify-content: center;
//   padding: 5rem;
//   .container {
//     display: flex;
//     flex-direction: column;
//     gap: 5rem;
//     justify-content: center;
//     width: 100%;
//     @media (min-width: 1024px) {
//       flex-direction: row;
//       overflow-y: scroll;
//     }
//   }
// `;

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
      // <Wrapper>
      <Loading />
      // </Wrapper>
    );
  }

  if (featuredProducts.isError || featuredProducts.products.length === 0) {
    return (
      // <Wrapper>
      <h3>Sorry, something went wrong :(</h3>
      // </Wrapper>
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
    <Box sx={{ py: "4rem" }}>
      <Container sx={{ display: "flex", flexDirection: "column", gap: "4rem" }}>
        <Title title="Featured Products" />
        <Grid container spacing={5}>
          {featuredProducts.products.map((product, index) => {
            const { _id, name, brand, profile, price, __t } = product;
            const type = getType(__t);
            return (
              <Grid item xs={3} key={index}>
                <ProductCard
                  key={_id}
                  _id={_id}
                  name={name}
                  brand={brand}
                  img={profile}
                  price={price}
                  pathname={`products/${type}`}
                />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
    // <Wrapper>
    //   <Title title={"Featured Products"} />
    //   <div className="container ">
    //     {featuredProducts.products.map((product, index) => {
    //       const { _id, name, profile, price, __t } = product;
    //       const type = getType(__t);
    //       return (
    //         <ProductCard
    //           key={_id}
    //           _id={_id}
    //           name={name}
    //           img={profile}
    //           price={price}
    //           pathname={`products/${type}`}
    //         />
    //       );
    //     })}
    //   </div>
    // </Wrapper>
  );
};

export default FeaturedProducts;
