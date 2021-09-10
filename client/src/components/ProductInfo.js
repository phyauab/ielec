import React from "react";
import styled from "styled-components";
import { useProductContext } from "../context/ProductContext";
import Loading from "./Loading";
import Modal from "./Modal";
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
    flex-direction: row;
    justify-content: flex-start;
    span {
      color: black;
      width: 50px;
    }
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
        list.push(<AiFillStar key={i} />);
      } else {
        list.push(<AiOutlineStar key={i} />);
      }
    }
    return <div className="rating property">{list}</div>;
  };

  const buildRows = (category) => {
    const list = [];
    if (category === "phones") {
      const { ram, storage, color } = singleProduct;
      list.push(
        <div className="property" key={0}>
          <span>Ram: </span>
          <p>{ram} GB</p>
        </div>
      );
      list.push(
        <div className="property" key={1}>
          <span>Storage: </span>
          <p>{storage} GB</p>
        </div>
      );
      list.push(
        <div className="property" key={2}>
          <span>Color: </span>
          <p>{color}</p>
        </div>
      );
    } else if (category === "laptops") {
      const { ram, hdd, ssd } = singleProduct;
      list.push(
        <div className="property" key={0}>
          <span>Ram: </span>
          <p>{ram} GB</p>
        </div>
      );
      list.push(
        <div className="property" key={1}>
          <span>HDD: </span>
          <p>{hdd} GB</p>
        </div>
      );
      list.push(
        <div className="property" key={2}>
          <span>SSD: </span>
          <p>{ssd} GB</p>
        </div>
      );
    } else if (category === "headphones") {
      const { anc, wired } = singleProduct;
      list.push(
        <div className="property" key={0}>
          <span>ANC: </span>
          <p>{anc ? "Yes" : "No"}</p>
        </div>
      );
      list.push(
        <div className="property" key={1}>
          <span>WIRED: </span>
          <p>{wired ? "Yes" : "No"}</p>
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
      <div className="description property">
        <p>{description}</p>
      </div>

      {/* List of Info */}
      <div className="brand property">
        <span>Brand:</span>
        <p>{brand}</p>
      </div>
      {buildRows(category)}
      {/* List of Info */}

      <div className="divider"></div>
      {qty > 0 ? (
        <div className="green">
          <span>In Stock</span>
        </div>
      ) : (
        <div className="red">
          <span>Out of stock</span>
        </div>
      )}
      <Button
        onClick={(e) => {
          console.log("hi?");
          return (
            <Modal
              message={"wtfaaaaaaaaaafrekklsbngiltrbnseignbthstihglisdhtgsloi"}
            />
          );
        }}
      >
        Add To Cart
      </Button>
    </Wrapper>
  );
};

export default ProductInfo;
