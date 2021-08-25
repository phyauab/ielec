import React from "react";
import styled from "styled-components";
import InputForm from "../components/Dashboard/InputForm";
import NavPanel from "../components/Dashboard/NavPanel";

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  @media (min-width: 1024px) {
    flex-direction: row;
  }
`;

const DashboardPage = () => {
  return (
    <Wrapper>
      <NavPanel />
      <InputForm />
    </Wrapper>
  );
};

export default DashboardPage;
