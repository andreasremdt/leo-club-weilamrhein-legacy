import styled from "styled-components";

const Banner = styled.span.attrs(() => ({
  "aria-hidden": "true",
}))<{ variant: "light" | "dark" }>`
  background: transparent url(/ribbon-${({ variant }) => variant}.svg) no-repeat
    center;
  display: block;
  text-align: center;
  color: white;
  text-transform: uppercase;
  font: 600 12px var(--font-sans);
  height: 35px;
  line-height: 2.4;
`;

export default Banner;
