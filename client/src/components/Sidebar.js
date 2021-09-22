import React from "react";
import styled from "styled-components";
import { useAppContext } from "../context/AppContext";
import { Link } from "react-router-dom";
import links from "../utils/links";

const Wrapper = styled.div`
  background: ${(props) => props.theme.body};
  height: 0px;
  width: 100%;
  position: absolute;
  top: 80px;
  transition: 0.3s ease-out;
  overflow: hidden;
  ${({ isSidebarOpen }) =>
    isSidebarOpen &&
    `
        height: calc(100vh - 80px);
    `}
  @media (min-width: 768px) {
    height: 0px;
  }
  ul {
    align-items: center;
    display: flex;
    flex-direction: column;
    list-style: none;
    justify-content: center;
    a {
      color: ${(props) => props.theme.text};
      text-decoration: none;
      text-transform: capitalize;
      padding: 1.5rem;
      width: 80vw;
      transition: 0.3ms ease-out;
      &:hover {
        background: #e7e7e7;
      }
      p {
        text-align: center;
      }
    }
  }
`;

const Sidebar = () => {
  const { isSidebarOpen } = useAppContext();
  return (
    <Wrapper
      className={isSidebarOpen ? "active" : ""}
      isSidebarOpen={isSidebarOpen}
    >
      <ul>
        {links.map((link, index) => {
          return (
            <Link to={`/products${link.url}`} key={index}>
              <li>
                <p>{link.text}</p>
              </li>
            </Link>
          );
        })}
      </ul>
    </Wrapper>
  );
};

export default Sidebar;
