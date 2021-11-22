import styled from "styled-components";

type Props = {
  size?: string;
};

const Card = styled.div<Props>`
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: ${({ size }) => (size === "small" ? "1rem" : "3rem")};
  border-radius: 2px;

  @media (max-width: 1000px) {
    padding: 1rem;
  }

  > *:first-child {
    margin-top: unset;
  }

  > *:last-child {
    margin-bottom: unset;
  }
`;

export default Card;
