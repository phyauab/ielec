import React from "react";
import styled from "styled-components";

const Wrapper = styled.section`
  align-items: center;
  background: #181818;
  color: #f0f0f0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100px;
  @media (min-width: 768px) {
    flex-direction: row;
  }

  .react {
    color: #8abbea;
  }
  .logo {
    color: #ff4949;
  }
`;

const Footer = () => {
  return (
    <Wrapper>
      <div>
        &copy; 2021&ensp; <span className="logo">I</span>ELEC All rights
        reserverd | built with&ensp;
      </div>
      <span className="react"> ReactJS</span>
    </Wrapper>
  );
};

export default Footer;
