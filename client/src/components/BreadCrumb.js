import { React, useEffect } from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";

const Wrapper = styled.section`
  align-items: center;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 120px;
  opacity: 0.7;
  a {
    color: ${(props) => props.theme.text};
    text-decoration: none;
  }
  .current {
    color: #000000;
  }
`;

const BreadCrumb = () => {
  let location = useLocation();
  const locations = location.pathname.split("/");
  locations.shift();
  return (
    <Wrapper>
      <Link to="/">Home</Link>
      {locations.map((location, index) => {
        return (
          <Link key={index} to={`${location}`}>
            &ensp;/&ensp;{location}
          </Link>
        );
      })}
    </Wrapper>
  );
};

export default BreadCrumb;
