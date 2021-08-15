import { React, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

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
`;

const BreadCrumb = ({ locations }) => {
  return (
    <Wrapper>
      <Link to="/">Home</Link>
      {locations.map((location, index) => {
        return index !== locations.length - 1 ? (
          <Link key={index} to={`/${location}`}>
            &nbsp;/ {location}
          </Link>
        ) : (
          <p>&nbsp;/ {location}</p>
        );
      })}
    </Wrapper>
  );
};

export default BreadCrumb;
