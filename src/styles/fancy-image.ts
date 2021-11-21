import { css } from "styled-components";

const fancyImageStyles = css`
  position: relative;

  &::before,
  &::after {
    content: "";
    position: absolute;
    border: 1px solid rgba(255, 255, 255, 0.8);
  }

  &::before {
    top: calc(1.5rem - 2px);
    left: calc(1.5rem + 2px);
    right: calc(1.5rem + 2px);
    bottom: calc(1.5rem - 2px);
  }

  &::after {
    top: 1.5rem;
    left: 1.5rem;
    right: 1.5rem;
    bottom: 1.5rem;
  }
`;

export default fancyImageStyles;
