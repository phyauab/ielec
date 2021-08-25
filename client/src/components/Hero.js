import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import hero from "../assets/hero.jpg";
import Button from "./Button";

const Wrapper = styled.section`
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url(${hero});
  display: flex;
  height: calc(100vh - 80px);
  width: 100%;
  padding: 1rem;
  @media (min-width: 768px) {
  }
  .spacer {
    display: none;
    flex: 1;
    width: 100%;
    @media (min-width: 768px) {
      display: block;
    }
  }
  .intro {
    align-items: center;
    display: flex;
    justify-content: center;
    flex: 1;

    div {
      align-items: center;
      color: white;
      display: flex;
      flex-direction: column;
      gap: 2rem;
      justify-content: center;
      padding: 1rem;
      width: 400px;
      @media (min-width: 1024px) {
        width: 500px;
      }
      @media (min-width: 1440px) {
        padding: 0rem;
      }
    }
    h1 {
      font-size: 2rem;
      @media (min-width: 768px) {
        font-size: 3rem;
      }
    }
    p {
      line-height: 2rem;
      color: #d0d3d9;
    }
  }

  // shop now button
  a {
    width: 100%;
    Button {
      border: none;
      width: 100%;
    }
  }
`;

const Hero = () => {
  return (
    <Wrapper className="section-center">
      <div className="spacer" />
      <div className="intro">
        <div>
          <h1>Level Up Your Tech</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores
            praesentium, suscipit obcaecati animi quas quae excepturi fuga ad
            iure incidunt temporibus dicta quasi eligendi quibusdam nobis,
            tempore sed doloremque cupiditate?
          </p>
          <Link to="/products/phones">
            <Button>Shop Now</Button>
          </Link>
        </div>
      </div>
    </Wrapper>
  );
};

export default Hero;
