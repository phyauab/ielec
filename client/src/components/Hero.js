import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import hero from "../assets/hero.jpg";
import Button from "./Button";

const Wrapper = styled.section`
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url(${hero});
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: calc(100vh - 80px);
  width: 100%;
  @media (min-width: 1440px) {
    flex-direction: row;
  }
  .spacer {
    display: none;
    @media (min-width: 1440px) {
      display: flex;
      flex: 1 1 50%;
    }
  }
  .container {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 0 1rem;
    @media (min-width: 1440px) {
      padding: 0 5rem;
      flex: 1 1 50%;
    }
    @media (min-width: 1920px) {
      padding: 0 10rem;
    }
    h1 {
      text-align: center;
      font-size: 2rem;
      @media (min-width: 768px) {
        font-size: 4rem;
      }
    }
    p {
      text-align: center;
      line-height: 1.5rem;
    }
    a {
      width: 100%;
      Button {
        width: 100%;
        border: none;
      }
    }
  }
`;

const Hero = () => {
  return (
    <Wrapper>
      <div className="spacer"></div>
      <div className="container content-center">
        <h1>Level Up Your Tech</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores
          praesentium, suscipit obcaecati animi quas quae excepturi fuga ad iure
          incidunt temporibus dicta quasi eligendi quibusdam nobis, tempore sed
          doloremque cupiditate?
        </p>
        <Link to="/products/phones">
          <Button>Shop Now</Button>
        </Link>
      </div>
    </Wrapper>
  );
};

export default Hero;
