import * as React from "react";
import styled from "styled-components";

import Card from "./card";
import Title from "./title";
import NavLink from "./nav-link";
import PostPreview from "./post-preview";
import useSocialLinks from "../hooks/use-social-links";
import useShortPostList from "../hooks/use-short-post-list";

const Wrapper = styled.aside`
  flex-basis: 330px;
  flex-shrink: 0;
`;

const List = styled.ul`
  list-style: none;
  margin: unset;
  padding: unset;
  display: flex;
  justify-content: center;
`;

const SocialLink = styled.a`
  margin: 0 0.5rem;
  transition: color 0.1s linear;
  display: flex;

  &:hover,
  &:focus-visible {
    color: var(--yellow);
  }
`;

function Sidebar() {
  const socialLinks = useSocialLinks();
  const posts = useShortPostList();

  return (
    <Wrapper>
      <Card
        size="small"
        css={`
          margin-bottom: 1.5rem;
        `}
      >
        <Title as="h2">Über uns</Title>
        <p
          css={`
            text-align: center;
          `}
        >
          Wir sind Jugendliche und Erwachsene und engagieren uns für das Wohl
          von benachteiligten Menschen, etwa aus Kinder- oder Pflegeheimen.
        </p>
      </Card>

      <Card
        size="small"
        css={`
          margin-bottom: 1.5rem;
        `}
      >
        <Title as="h2">Netzwerke</Title>
        <p
          css={`
            text-align: center;
          `}
        >
          Folge uns in den sozialen Netzwerken, um keine Neuigkeiten zu
          verpassen!
        </p>

        <List>
          {socialLinks.map((link) => (
            <li key={link.icon}>
              <SocialLink
                href={link.path}
                title={link.title}
                target="_blank"
                rel="noopener nofollow noreferrer"
              >
                <svg width={20} height={20}>
                  <use xlinkHref={`/symbol-defs.svg#${link.icon}`} />
                </svg>
              </SocialLink>
            </li>
          ))}
        </List>
      </Card>

      <Card
        size="small"
        css={`
          margin-bottom: 1.5rem;
        `}
      >
        <Title as="h2">Aktuelles</Title>

        {posts.map((post) => (
          <PostPreview key={post.slug} post={post} variant="short" />
        ))}
      </Card>

      <Card size="small">
        <Title as="h2">Kategorien</Title>

        <ul>
          <li>
            <NavLink to="/aktionen/begegnungen/">Begegnungen</NavLink>
          </li>
          <li>
            <NavLink to="/aktionen/weitere/">Weitere</NavLink>
          </li>
          <li>
            <NavLink to="/aktionen/pflegeheim/">Pflegeheim</NavLink>
          </li>
          <li>
            <NavLink to="/aktionen/kinder/">Kinder</NavLink>
          </li>
          <li>
            <NavLink to="/aktionen/news">Neuigkeiten</NavLink>
          </li>
        </ul>
      </Card>
    </Wrapper>
  );
}

export default Sidebar;
