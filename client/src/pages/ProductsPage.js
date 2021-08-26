import React, { useState, useEffect } from "react";
import styled from "styled-components";
import BreadCrumb from "../components/BreadCrumb";
import { useLocation } from "react-router-dom";
import ProductFilter from "../components/ProductFilter";
import ProductListView from "../components/ProductListView";
import ProductGridView from "../components/ProductGridView";
import { useProductContext } from "../context/ProductContext";
import Loading from "../components/Loading";
import NewsLetter from "../components/NewsLetter";

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 180px);
  .products {
    display: flex;
    justify-content: center;
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
  const { isLoading, fetchProducts, displayProducts, fetchCategories } =
    useProductContext();

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
        {isLoading ? (
          <Loading />
        ) : (
          <ProductGridView products={displayProducts} />
        )}
      </div>
    </Wrapper>
  );
};
export default ProductsPage;
