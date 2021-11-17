import * as React from "react";
import styled from "styled-components";

import SearchForm from "./search-form";
import Container from "./container";
import useSocialLinks from "../hooks/use-social-links";

const Header = styled.header`
  background-color: white;
  border-bottom: 1px solid var(--gray-200);
`;

const List = styled.ul`
  list-style: none;
  margin: unset;
  padding: unset;
  display: flex;
  align-items: center;
  height: 40px;
  border-right: 1px solid var(--gray-200);
`;

const Link = styled.a`
  color: var(--gray-300);
  margin-right: 0.75rem;
  transition: color 0.1s linear;
  display: flex;

  &:hover,
  &:focus-visible {
    color: var(--gray-500);
    outline: none;
  }
`;

function Navigation() {
  const socialLinks = useSocialLinks();

  return (
    <Header>
      <Container
        css={`
          display: flex;
          justify-content: flex-end;
        `}
      >
        <List>
          {socialLinks.map((link) => (
            <li key={link.icon}>
              <Link
                href={link.path}
                title={link.title}
                target="_blank"
                rel="noopener nofollow noreferrer"
              >
                <svg width={20} height={20}>
                  <use xlinkHref={`/symbol-defs.svg#${link.icon}`} />
                </svg>
              </Link>
            </li>
          ))}
        </List>

        <SearchForm />
      </Container>
    </Header>
  );
}

export default Navigation;
