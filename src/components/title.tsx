import styled from "styled-components";

const Title = styled.h3`
  background-color: var(--gray-500);
  color: white;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 0.75rem;
  border-radius: 2px;
  font-size: 17px;

  &::before,
  &::after {
    content: "";
    display: inline-block;
    width: 50px;
    height: 10px;
    filter: brightness(10);
  }

  &::before {
    background: transparent url(/left-arrow.svg) no-repeat center right;
  }

  &::after {
    background: transparent url(/right-arrow.svg) no-repeat center left;
  }
`;

export default Title;
