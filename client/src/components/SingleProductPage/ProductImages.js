import React, { useState } from "react";
import styled from "styled-components";
import { useProductContext } from "../../context/ProductContext";

// components
import Loading from "../Loading";

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 0rem;
  max-width: 600px;
  flex-grow: 1;
  img {
    border-radius: 10px;
  }
  .img-main {
    width: 500px;
    height: 600px;
    img {
      width: 500px;
      height: 600px;
      object-fit: contain;
    }
  }
  .img-list {
    display: flex;
    gap: 1rem;
    flex-direction: row;
    img {
      border: 2px solid transparent;
      width: 100px;
      height: 100px;
      object-fit: cover;
      &:hover {
        cursor: pointer;
      }
    }
  }
  .img-selected {
    border: 2px solid ${(props) => props.theme.text} !important;
  }
`;

const ProductImages = () => {
  const { isProductLoading, singleProduct } = useProductContext();
  const { profilePath, imagePaths } = singleProduct;
  const [imgMain, setImgMain] = useState(profilePath);

  if (isProductLoading) {
    return <Loading />;
  }

  return (
    <Wrapper>
      <div className="img-main">
        <img src={imgMain} alt="asd" />
      </div>
      <div className="img-list">
        <img
          src={profilePath}
          alt="asd"
          onClick={(e) => setImgMain(profilePath)}
          className={imgMain === profilePath ? `img-selected` : ``}
        />
        {imagePaths.map((imagePath, index) => (
          <img
            key={index}
            src={imagePath}
            alt="asd"
            onClick={(e) => setImgMain(imagePath)}
            className={imgMain === imagePath ? `img-selected` : ``}
          />
        ))}
      </div>
    </Wrapper>
  );
};
export default ProductImages;
