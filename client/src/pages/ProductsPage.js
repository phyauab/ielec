import React, { useState, useEffect } from "react";
import styled from "styled-components";
import BreadCrumb from "../components/BreadCrumb";
import { useLocation } from "react-router-dom";
import ProductFilter from "../components/ProductFilter";
import ProductListView from "../components/ProductListView";
import ProductGridView from "../components/ProductGridView";
import { useProductContext } from "../context/ProductContext";
import Loading from "../components/Loading";

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  .products {
    display: flex;
    justify-content: center;
    flex-direction: column;
    @media (min-width: 1024px) {
      flex-direction: row;
    }
    .filter {
      flex-grow: 1;
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
