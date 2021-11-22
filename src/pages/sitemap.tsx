import { graphql } from "gatsby";
import * as React from "react";

import Card from "../components/card";
import NavLink from "../components/nav-link";
import MainLayout from "../layouts/main";

type Post = {
  frontmatter: {
    category: string;
    date: string;
    title: string;
  };
  slug: string;
};

type Props = {
  data: {
    allMdx: {
      nodes: Post[];
    };
  };
};

export const query = graphql`
  query SitemapPostsQuery {
    allMdx(sort: { order: DESC, fields: frontmatter___date }) {
      nodes {
        frontmatter {
          category
          date(locale: "de", formatString: "d. MMMM YYYY")
          title
        }
        slug
      }
    }
  }
`;

function SitemapPage({ data }: Props) {
  const posts = data.allMdx?.nodes;

  return (
    <MainLayout title="Sitemap">
      <Card as="main">
        <h2>Seiten</h2>
        <ul>
          <li>
            <NavLink to="/">Startseite</NavLink>
          </li>
          <li>
            <NavLink to="/aktionen">Aktionen</NavLink>
            <ul>
              <li>
                <NavLink to="/aktionen/begegnungen">
                  Begegnungen mit Menschen mit Behinderung
                </NavLink>
              </li>
              <li>
                <NavLink to="/aktionen/kinder">Ausflüge mit Kindern</NavLink>
              </li>
              <li>
                <NavLink to="/aktionen/pflegeheim">
                  Besuche im Pflegeheim
                </NavLink>
              </li>
              <li>
                <NavLink to="/aktionen/weitere">Weitere Aktionen</NavLink>
              </li>
            </ul>
          </li>
          <li>
            <NavLink to="/ueber-uns">Über Uns</NavLink>
          </li>
          <li>
            <NavLink to="/mitglied-werden">Mitglied werden</NavLink>
          </li>
          <li>
            <NavLink to="/kontakt">Kontakt</NavLink>
          </li>
          <li>
            <NavLink to="/impressum">Impressum</NavLink>
          </li>
          <li>
            <NavLink to="/datenschutz">Datenschutz</NavLink>
          </li>
        </ul>

        <h2>Berichte über Aktionen </h2>
        <ul>
          {posts.map((post) => (
            <li key={post.slug}>
              <NavLink
                to={`/aktionen/${post.frontmatter.category}/${post.slug}`}
              >
                {post.frontmatter.date} - {post.frontmatter.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </Card>
    </MainLayout>
  );
}

export default SitemapPage;
