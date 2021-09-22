import React from "react";
import styled from "styled-components";
import InputForm from "../../components/Dashboard/InputForm";
import NavPanel from "../../components/Dashboard/NavPanel";
import { NavLink, Switch, Route, useRouteMatch } from "react-router-dom";

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  height: 100vh;
  @media (min-width: 1024px) {
    flex-direction: row;
  }
`;

const DashboardPage = () => {
  let { path, url } = useRouteMatch();
  return (
    <Wrapper>
      <NavPanel />

      <Switch>
        <Route path={`${path}/addproduct`}>
          <InputForm action={"product"} />
        </Route>
        <Route path={`${path}/addbrand`}>
          <InputForm action={"user"} />
        </Route>
      </Switch>
    </Wrapper>
  );
};

export default DashboardPage;
