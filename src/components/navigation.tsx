import * as React from "react";
import { Link } from "gatsby";
import styled from "styled-components";

import Banner from "./banner";
import Container from "./container";

const Nav = styled.nav`
  background-color: white;
  padding: 1rem 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 5rem;
`;

const NavContainer = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-wrap: wrap;
`;

const LogoLink = styled(Link)`
  text-align: center;

  @media (max-width: 900px) {
    width: 100%;
    border-bottom: 1px solid var(--gray-200);
    padding-bottom: 1rem;
  }
`;

const NavLink = styled(Link)`
  font: 600 14px var(--font-sans);
  text-transform: uppercase;
  letter-spacing: 0.025rem;
  transition: color 0.1s linear;
  padding: 0 1rem;

  &:hover,
  &:focus-visible,
  &.active {
    color: var(--yellow);
  }

  @media (min-width: 900px) {
    &:nth-of-type(2),
    &:nth-of-type(3) {
      order: -1;
    }
  }

  @media (max-width: 900px) {
    margin-top: 1rem;
  }
`;

const Title = styled.span`
  color: var(--yellow);
  font-size: 25px;
  font-weight: 700;
  display: block;
  margin: 0.3rem 0;
`;

const Established = styled.span`
  font: 600 13px var(--font-sans);
  text-transform: uppercase;
  text-align: center;
  display: block;

  &::before,
  &::after {
    content: "";
    display: inline-block;
    width: 100px;
    height: 10px;
  }

  &::before {
    background: transparent url(/left-arrow.svg) no-repeat center right;
    margin-right: 0.75rem;
  }

  &::after {
    background: transparent url(/right-arrow.svg) no-repeat center left;
    margin-left: 0.75rem;
  }
`;

function Navigation() {
  return (
    <Nav>
      <NavContainer>
        <LogoLink to="/">
          <Banner variant="dark">Leo-Clubs</Banner>
          <Title>Leo-Club Weil am Rhein</Title>
          <Established>Seit 2009</Established>
        </LogoLink>
        <NavLink activeClassName="active" to="/aktionen/" partiallyActive>
          Aktionen
        </NavLink>
        <NavLink activeClassName="active" to="/ueber-uns/">
          Über uns
        </NavLink>
        <NavLink activeClassName="active" to="/mitglied-werden/">
          Mitglied werden
        </NavLink>
        <NavLink activeClassName="active" to="/kontakt/">
          Kontakt
        </NavLink>
      </NavContainer>
    </Nav>
  );
}

export default Navigation;
