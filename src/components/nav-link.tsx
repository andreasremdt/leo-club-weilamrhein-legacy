import { Link } from "gatsby";
import styled from "styled-components";

const NavLink = styled(Link)`
  transition: color 0.1s linear;

  &:hover,
  &:focus-visible,
  &.active {
    color: var(--yellow);
  }
`;

export default NavLink;
