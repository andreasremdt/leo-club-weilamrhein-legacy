import * as React from "react";
import styled from "styled-components";

import Search from "./search";
import Container from "./container";
import useSocialLinks from "../hooks/use-social-links";

const Header = styled.header`
  background-color: white;
  border-bottom: 1px solid var(--gray-200);
`;

const List = styled.ul`
  list-style: none;
  margin: 0 0 0 auto;
  padding: unset;
  display: flex;
  align-items: center;
  height: 40px;
  border-right: 1px solid var(--gray-200);
`;

const Link = styled.a`
  color: var(--gray-400);
  margin-right: 0.75rem;
  transition: color 0.1s linear;
  display: flex;

  &:hover,
  &:focus-visible {
    color: var(--yellow);
  }
`;

const SkipToContent = styled.a`
  opacity: 0;
  background-color: var(--yellow);
  color: white;
  font: 600 14px var(--font-sans);
  text-transform: uppercase;
  letter-spacing: 0.025rem;
  display: flex;
  padding: 0.3rem 1rem;
  align-items: center;
  transition: transform 0.1s linear, opacity 0.1s linear;
  transform: translateY(-100%);
  border-radius: 0 0 2px 2px;
  position: absolute;
  top: 0;
  left: 0;

  svg {
    margin-left: 5px;
  }

  &:hover {
    text-decoration: underline;
  }

  &:focus {
    transform: translateY(0);
    opacity: 1;
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
          position: relative;
        `}
      >
        <SkipToContent href="#content">
          Zum Inhalt springen{" "}
          <svg aria-hidden="true" width={20} height={20}>
            <use xlinkHref="/symbol-defs.svg#arrow-down" />
          </svg>
        </SkipToContent>
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

        <Search />
      </Container>
    </Header>
  );
}

export default Navigation;
