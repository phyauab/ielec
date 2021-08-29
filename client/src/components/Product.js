import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const Wrapper = styled.div`
  /* border: 1px solid ${(props) => props.theme.text}; */
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 250px;
  height: 380px;
  .img-container {
    position: relative;
    background: #000000;
    border-radius: 10px;
    img {
      border-radius: 9px;
      display: block;
      width: 250px;
      height: 300px;
      object-fit: cover;
      transition: 0.2s ease-out;
    }
    a {
      position: absolute;
      border-radius: 50%;
      background: #000000;
      top: 50%;
      left: 50%;
      width: 2.5rem;
      height: 2.5rem;
      transform: translate(-50%, -50%);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: 0.3s ease-out;
      svg {
        color: white;
      }
    }
  }

  .img-container:hover img {
    opacity: 0.5;
  }

  .img-container:hover a {
    opacity: 1;
  }

  .info {
    align-items: center;
    display: flex;
    justify-content: center;
    flex-direction: column;
    flex-grow: 1;
    font-weight: 600;
    gap: 0.5rem;

    .price {
      color: green;
      font-weight: 600;
    }
  }
`;

const Product = ({ name, img, price, pathname, _id }) => {
  var base64String = btoa(
    new Uint8Array(img.data).reduce(function (data, byte) {
      return data + String.fromCharCode(byte);
    }, "")
  );

  return (
    <Wrapper>
      <div className="img-container">
        <img src={`data:image/png;base64,${base64String}`} alt="asd" />
        <Link to={`${pathname}/${_id}`}>
          <FaSearch />
        </Link>
      </div>
      <div className="info">
        <p>{name}</p>
        <p className="price">${price}</p>
      </div>
    </Wrapper>
  );
};

export default Product;
