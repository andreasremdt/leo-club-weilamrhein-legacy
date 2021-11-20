import * as React from "react";
import { graphql, Link } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";

import MainLayout from "./main";

type Props = {
  data: {
    mdx: {
      frontmatter: {
        date: string;
        thumbnail: string;
        title: string;
        category: string;
      };
      body: string;
    };
  };
};

export const query = graphql`
  query PostQuery($id: String!) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        images
        date(formatString: "d. MMMM YYYY", locale: "de")
        category
      }
      body
    }
  }
`;

function PostLayout({ data }: Props) {
  const post = data?.mdx;

  return (
    <MainLayout sidebar={true}>
      <header>
        <span aria-hidden="true">{post.frontmatter.category}</span>
        <h1>{post.frontmatter.title}</h1>
        <time>Veröffentlicht am {post.frontmatter.date}</time>
      </header>
      <MDXRenderer>{post.body}</MDXRenderer>

      <Link to="/aktionen">Zurück zu Aktionen</Link>
    </MainLayout>
  );
}

export default PostLayout;
