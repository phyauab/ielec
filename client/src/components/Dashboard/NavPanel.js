import React from "react";
import styled from "styled-components";

const Wrapper = styled.section`
  height: calc(100vh - 80px);
  width: 20vw;
  z-index: -20;
  border-right: 1px groove ${(props) => props.theme.text};
`;

const NavPanel = () => {
  return <Wrapper>panel</Wrapper>;
};

export default NavPanel;
