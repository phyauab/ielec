import { createGlobalStyle } from "styled-components";
export const GlobalStyle = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.primary};
    font-family: Tahoma, Helvetica, Arial, Roboto, sans-serif;
    transition: all 0.3s ease-out;
    box-sizing: border-box;
  }
  h1 {
    font-size: 3rem;
  }
  `;
