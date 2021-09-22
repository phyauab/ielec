import React from "react";
import styled from "styled-components";
import { NavLink, Switch, Route, useRouteMatch } from "react-router-dom";
import InputForm from "./InputForm";

const Wrapper = styled.section`
  align-items: center;
  border-right: 1px groove ${(props) => props.theme.text};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 2rem;
  height: 100%;
  padding: 1rem;
  width: 20vw;
  ul {
    list-style: none;
    li {
      padding: 0.5rem;
      a {
        color: ${(props) => props.theme.text};
        text-decoration: none;
        transition: 0.3s ease-out;
      }
    }
  }

  .category {
    width: 75%;
  }
  .current {
    color: black;
    pointer-events: none;
    margin-left: 1rem;
    border-bottom: 1px solid black;
  }
`;

const NavPanel = () => {
  let { path, url } = useRouteMatch();
  let action = "add product";
  return (
    <Wrapper>
      <div>
        <h1>Dashboard</h1>
      </div>
      <div className="category">
        <h3>Products</h3>

        <ul>
          <li>
            <NavLink to={`${url}/addproduct`} activeClassName="current">
              Add Product
            </NavLink>
          </li>
          <li>
            <NavLink to={`${url}/addbrand`} activeClassName="current">
              Add User
            </NavLink>
          </li>
        </ul>
      </div>
    </Wrapper>
  );
};

export default NavPanel;
