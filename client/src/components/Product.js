import React from "react";
import styled from "styled-components";
import iphone from "../assets/iphone.jpg";

const Wrapper = styled.div`
  /* border: 1px solid ${(props) => props.theme.text}; */
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 300px;
  height: 430px;
  img {
    width: 300px;
    height: 350px;
    object-fit: cover;
  }
  div {
    align-items: center;
    display: flex;
    justify-content: center;
    flex-direction: column;
    flex-grow: 1;
    gap: 0.5rem;
    .price {
      color: green;
      font-weight: 600;
    }
  }
`;

const Product = ({ name, img, price }) => {
  return (
    <Wrapper>
      <img src={iphone} alt="asd"></img>
      <div className="">
        <p>{name}</p>
        <p className="price">${price}</p>
      </div>
    </Wrapper>
  );
};

export default Product;
