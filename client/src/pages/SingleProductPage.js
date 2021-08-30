import React, { useEffect } from "react";
import styled from "styled-components";
import BreadCrumb from "../components/BreadCrumb";
import { useLocation, useParams } from "react-router";
import ProductImages from "./ProductImages";
import ProductInfo from "../components/ProductInfo";
import { useProductContext } from "../context/ProductContext";
import Loading from "../components/Loading";

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 180px);
  margin-bottom: 10rem;
  div {
    align-items: flex-start;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    gap: 5rem;
    @media (min-width: 768px) {
      flex-direction: row;
    }
  }
`;

const SingleProductPage = () => {
  const { category, id } = useParams();
  const locations = useLocation().pathname.split("/");
  locations.shift();
  const { fetchSingleProduct, isLoading } = useProductContext();

  useEffect(() => {
    console.log("start fetching");
    fetchSingleProduct(id);
  }, [id]);

  if (isLoading) {
    return (
      <Wrapper>
        <Loading />
      </Wrapper>
    );
  }

  return (
    <Wrapper className="section-center">
      <BreadCrumb locations={locations} />
      <div className="content-center">
        <ProductImages />
        <ProductInfo category={locations[1]} />
      </div>
    </Wrapper>
  );
};

export default SingleProductPage;
