import React from "react";
import styled from "styled-components";
import fair_price from "../assets/fair_price.png";
import good_service from "../assets/good_service.png";
import no_delay from "../assets/no_delay.png";

const Wrapper = styled.section`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 5rem;
  width: 100%;
  justify-content: center;
  padding: 5rem;

  .container {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    justify-content: space-around;
    width: 100%;
    @media (min-width: 1024px) {
      flex-direction: row;
    }
  }
  h1 {
    font-size: 3rem;
  }
`;

const CardWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  justify-content: center;
  img {
    width: 330px;
    height: 330px;
  }
  h2 {
    text-align: center;
  }
`;

const Card = ({ img, title }) => {
  return (
    <CardWrapper>
      <img src={img} alt="img"/>
      <h2>{title}</h2>
    </CardWrapper>
  );
};

const arr = [
  {
    img: fair_price,
    title: "Fair Price",
  },
  {
    img: good_service,
    title: "Good Service",
  },
  {
    img: no_delay,
    title: "No Delay",
  },
];

const Offer = () => {
  return (
    <Wrapper className="section-center">
      <h1>We Will Offer</h1>
      <div className="container section-center">
        {arr.map((item) => {
          const { img, title } = item;
          return <Card img={img} title={title} />;
        })}
      </div>
    </Wrapper>
  );
};

export default Offer;
