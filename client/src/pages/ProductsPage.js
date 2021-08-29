import React, { useState, useEffect } from "react";
import styled from "styled-components";
import BreadCrumb from "../components/BreadCrumb";
import { useLocation } from "react-router-dom";
import ProductFilter from "../components/ProductFilter";
import ProductListView from "../components/ProductListView";
import ProductGridView from "../components/ProductGridView";
import { useProductContext } from "../context/ProductContext";

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  /* 180 = navbar + footer  */
  min-height: calc(100vh - 180px);
  .products {
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 5rem;
    margin-bottom: 10rem;
    @media (min-width: 768px) {
      flex-direction: row;
    }
  }
`;

const ProductsPage = () => {
  const locations = useLocation().pathname.split("/");
  locations.shift();
  const [category, setCategory] = useState("phones");
  const { fetchProducts, displayProducts } = useProductContext();

  useEffect(() => {
    setCategory(locations[1]);
  }, [locations]);

  useEffect(() => {
    fetchProducts(category);
  }, [category]);

  return (
    <Wrapper className="content-center">
      <BreadCrumb locations={locations} />

      <div className="products">
        <ProductFilter category={category} />
        <ProductGridView products={displayProducts} />
      </div>
    </Wrapper>
  );
};
export default ProductsPage;
