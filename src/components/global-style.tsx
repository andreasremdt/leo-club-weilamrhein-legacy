import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  :root {
    --yellow: rgb(239, 181, 75);
    --red: rgb(255, 98, 71);
    --green: rgb(65, 145, 48);
    --gray-500: rgb(37, 37, 37);
    --gray-400: rgb(124, 124, 124);
    --gray-300: rgb(154, 154, 154);
    --gray-200: rgb(233, 233, 233);
    --gray-100: rgb(246, 246, 246);

    --font-sans: "Open Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    --font-serif: Lora, ui-serif, Georgia, serif;
  }

  html {
    -webkit-text-size-adjust: 100%;
  }

  body {
    margin: unset;
    font: 400 15px/1.8 var(--font-serif);
    color: var(--gray-500);
    background-color: var(--gray-100);
  }

  img {
    max-width: 100%;
    height: auto;
  }

  h1, h2, h3, h4, h5, h6 {
    margin-top: 2rem;
    line-height: 1.1;
  }

  a {
    text-decoration: none;
    color: inherit;
    outline: none;
  }

  p a, td a {
    transition: border-color .1s linear;
    border-bottom: 2px solid var(--yellow);

    &:hover,
    &:focus-visible {
      border-color: var(--gray-500);
    }
  }

  table {
    border-collapse: collapse;
    width: 100%;
    margin-bottom: 1rem;
  }

  th {
    text-align: left;
    border-bottom: 2px solid var(--gray-200);
    padding: .4rem 1rem;
  }

  td {
    border-top: 1px solid var(--gray-200);
    padding: .4rem 1rem;
  }

  input {
    width: 100%;
    font: inherit;
    outline: none;
  }

  button {
    font: inherit;
    outline: none;
    cursor: pointer;
  }
`;

export default GlobalStyle;
