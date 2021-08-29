import React, { useState } from "react";
import styled from "styled-components";
import { useProductContext } from "../context/ProductContext";
import Loading from "../components/Loading";
import { bufferToImage } from "../utils/helpers";

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  img {
    border-radius: 10px;
  }
  .img-main {
    img {
      width: 600px;
      height: 600px;
      object-fit: cover;
    }
  }
  .img-list {
    display: flex;
    gap: 1rem;
    img {
      width: 130px;
      height: 130px;
      object-fit: cover;
      &:hover {
        cursor: pointer;
      }
    }
  }
  .img-selected {
    border: 2px solid ${(props) => props.theme.text};
  }
`;

const ProductImages = () => {
  const { isLoading, isError, singleProduct } = useProductContext();
  const { profile, images } = singleProduct;
  const [imgMain, setImgMain] = useState(profile);

  if (isLoading || Object.keys(singleProduct).length === 0) {
    return <Loading />;
  }

  return (
    <Wrapper className="content-center">
      <div className="img-main">
        <img src={bufferToImage(imgMain)} alt="asd" />
      </div>
      <div className="img-list">
        <img
          src={bufferToImage(profile)}
          alt="asd"
          onClick={(e) => setImgMain(profile)}
          className={imgMain == profile ? `img-selected` : ``}
        />
        {images.map((image) => (
          <img
            src={bufferToImage(image)}
            alt="asd"
            onClick={(e) => setImgMain(image)}
            className={imgMain == image ? `img-selected` : ``}
          />
        ))}
      </div>
    </Wrapper>
  );
};
export default ProductImages;
