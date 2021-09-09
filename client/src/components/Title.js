import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5rem;
  h1 {
    text-align: center;
    font-size: 2rem;
    @media (min-width: 768px) {
      font-size: 3rem;
    }
    @media (min-width: 1024px) {
      font-size: 4rem;
    }
  }
  div {
    background: ${(props) => props.theme.text};
    height: 0.25rem;
    width: 8rem;
  }
`;

const Title = ({ title }) => {
  return (
    <Wrapper>
      <h1>{title}</h1>
      <div></div>
    </Wrapper>
  );
};

export default Title;
