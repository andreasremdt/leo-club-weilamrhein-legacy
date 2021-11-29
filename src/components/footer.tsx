import * as React from "react";
import { Link } from "gatsby";
import styled from "styled-components";

import Container from "./container";
import NavLink from "./nav-link";
import PostPreview from "./post-preview";
import Title from "./title";
import useSocialLinks from "../hooks/use-social-links";
import useShortPostList from "../hooks/use-short-post-list";
import useGalleryImages from "../hooks/use-gallery-images";
import CloudinaryImage from "./cloudinary-image";

const MENU_LINKS = [
  {
    title: "Startseite",
    href: "/",
  },
  {
    title: "Aktionen",
    href: "/aktionen/",
  },
  {
    title: "Über uns",
    href: "/ueber-uns/",
  },
  {
    title: "Mitglied werden",
    href: "/mitglied-werden/",
  },
  {
    title: "Kontakt",
    href: "/kontakt/",
  },
  {
    title: "Impressum",
    href: "/impressum/",
  },
  {
    title: "Datenschutz",
    href: "/datenschutz/",
  },
  {
    title: "Sitemap",
    href: "/sitemap/",
  },
];

const Wrapper = styled.footer`
  background-color: white;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 5rem;
  position: sticky;
  top: 100vh;
`;

const InnerWrapper = styled(Container)`
  --columns: 4;
  --padding: 1.5rem;

  display: grid;
  grid-template-columns: repeat(var(--columns), 1fr);
  gap: var(--padding);
  padding: 1rem var(--padding) 2rem var(--padding);

  @media (max-width: 1000px) {
    --columns: 2;
  }

  @media (max-width: 800px) {
    --padding: 1rem;
  }

  @media (max-width: 550px) {
    --columns: 1;
  }
`;

const LowerFooter = styled.div`
  border-top: 1px solid var(--gray-200);
  font: 400 13px var(--font-sans);
  text-transform: uppercase;
  letter-spacing: 0.05rem;
  padding: 1rem 0;
  text-align: center;
`;

const SocialNav = styled.nav`
  display: flex;
  align-items: center;

  @media (min-width: 1000px) {
    margin-right: auto;
  }
`;

const List = styled.ul`
  list-style: none;
  margin: unset;
  padding: unset;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  margin-right: 1.5rem;
  transition: color 0.1s linear;

  &:hover,
  &:focus-visible {
    color: var(--yellow);
  }

  svg {
    margin-right: 0.5em;
  }
`;

function Footer() {
  const socialLinks = useSocialLinks();
  const posts = useShortPostList();
  const images = useGalleryImages();

  return (
    <Wrapper>
      <InnerWrapper>
        <section>
          <Title>Über uns</Title>
          <p>
            Wir sind Jugendliche und Erwachsene und engagieren uns für das Wohl
            von benachteiligten Menschen, etwa aus Kinder- oder Pflegeheimen.
          </p>
          <p>
            <a
              href="https://www.leo-clubs.de/"
              target="_blank"
              rel="noopener nofollow noreferrer"
            >
              Leo-Clubs Deutschland
            </a>
          </p>
        </section>
        <section>
          <Title>Aktuelles</Title>

          {posts.map((post) => (
            <PostPreview key={post.slug} post={post} variant="short" />
          ))}
        </section>
        <section>
          <Title>Galerie</Title>

          <figure
            css={`
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              gap: 1rem;
            `}
          >
            {images.map((image) => (
              <Link
                to={image.url}
                key={image.name}
                css={`
                  &:focus-visible {
                    outline: 3px solid var(--yellow);
                    outline-offset: 1px;
                    border-radius: 1px;
                  }
                `}
                aria-label={`Link zum Artikel "${image.title}`}
              >
                <CloudinaryImage
                  name={image.name}
                  category={image.category}
                  width={160}
                  height={160}
                />
              </Link>
            ))}
          </figure>
        </section>
        <section>
          <Title>Menü</Title>
          <ul>
            {MENU_LINKS.map((link) => (
              <li key={link.href}>
                <NavLink to={link.href} activeClassName="active">
                  {link.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </section>
      </InnerWrapper>
      <LowerFooter>
        <Container
          css={`
            display: flex;

            @media (max-width: 1000px) {
              flex-direction: column;
              align-items: center;
            }
          `}
        >
          <SocialNav>
            <List>
              {socialLinks.map((link) => (
                <li key={link.icon}>
                  <SocialLink
                    href={link.path}
                    title={link.title}
                    target="_blank"
                    rel="noopener nofollow noreferrer"
                  >
                    <svg width={16} height={16}>
                      <use xlinkHref={`/symbol-defs.svg#${link.icon}`} />
                    </svg>
                    {link.icon}
                  </SocialLink>
                </li>
              ))}
            </List>
          </SocialNav>
          <p>
            &copy; {new Date().getFullYear()}{" "}
            <Link to="/">Leo-Club Weil am Rhein</Link>. Alle Rechte vorbehalten.
          </p>
        </Container>
      </LowerFooter>
    </Wrapper>
  );
}

export default Footer;
