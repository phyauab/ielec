import React from "react";
import styled from "styled-components";
import { useProductContext } from "../context/ProductContext";
import Loading from "./Loading";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import Button from "./Button";

const Wrapper = styled.section`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  div {
    align-items: flex-start;
    display: flex;
    justify-content: start;
  }
  .divider {
    height: 1px;
    width: 100%;
    background: ${(props) => props.theme.text};
  }
  .rating {
    gap: 0;
    color: #ffdb0e;
    font-size: 1.5rem;
  }
  .price {
    justify-content: start;
    font-size: 1.5rem;
    font-weight: 700;
  }
  .description {
    line-height: 2rem;
  }

  .property {
    align-items: flex-start;
    display: flex;
    justify-content: start;
  }
  .green {
    color: green;
  }
  .red {
    color: red;
  }
  .phones .laptops .headphones {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;

const ProductInfo = ({ category }) => {
  const { singleProduct, isLoading } = useProductContext();

  if (isLoading) {
    return <Loading />;
  }

  const { name, brand, rating, price, description, qty } = singleProduct;

  const generateRating = (rating) => {
    const list = [];
    for (let i = 0, count = rating; i < 5; ++i, count--) {
      if (count > 0) {
        list.push(<AiFillStar />);
      } else {
        list.push(<AiOutlineStar />);
      }
    }
    return <div className="rating property">{list}</div>;
  };

  const buildRows = (category) => {
    const list = [];
    if (category === "phones") {
      const { ram, storage, color } = singleProduct;
      list.push(
        <div className="property">
          <span>Ram: </span>
          {ram} GB
        </div>
      );
      list.push(
        <div className="property">
          <span>Storage: </span>
          {storage} GB
        </div>
      );
      list.push(
        <div className="property">
          <span>Color: </span>
          {color}
        </div>
      );
    } else if (category === "laptops") {
      const { ram, hdd, ssd } = singleProduct;
      list.push(
        <div className="property">
          <span>Ram: </span>
          {ram} GB
        </div>
      );
      list.push(
        <div className="property">
          <span>HDD: </span>
          {hdd} GB
        </div>
      );
      list.push(
        <div className="property">
          <span>SSD: </span>
          {ssd} GB
        </div>
      );
    } else if (category === "headphones") {
      const { anc, wired } = singleProduct;
      list.push(
        <div className="property">
          <span>ANC: </span>
          {anc ? "Yes" : "No"}
        </div>
      );
      list.push(
        <div className="property">
          <span>WIRED: </span>
          {wired ? "Yes" : "No"}
        </div>
      );
    }
    return list;
  };

  return (
    <Wrapper>
      <h1>{name}</h1>
      <div className="divider"></div>
      {generateRating(rating)}
      <div className="price">{`$ ${price}`}</div>
      <div className="description">
        <p>{description}</p>
      </div>
      <div className="brand property">
        <span>Brand:</span>
        {brand}
      </div>
      {buildRows(category)}
      <div className="divider"></div>
      {qty > 0 ? (
        <div className="property green">
          <span>In Stock</span>
        </div>
      ) : (
        <div className="property red">
          <span>Out of stock</span>
        </div>
      )}
      <Button>Add To Cart</Button>
    </Wrapper>
  );
};

export default ProductInfo;
