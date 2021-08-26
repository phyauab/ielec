import React from "react";
import styled from "styled-components";

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  @media (min-width: 1024px) {
    flex-direction: row;
  }
`;

const DashboardPage = () => {
  return <Wrapper>DashboardPage</Wrapper>;
};

export default DashboardPage;
