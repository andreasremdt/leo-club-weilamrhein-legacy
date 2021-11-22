import * as React from "react";
import { graphql } from "gatsby";

import MainLayout from "../layouts/main";
import PostPreview from "../components/post-preview";
import CATEGORY_TITLES from "../utils/category-titles";

type PostProp = {
  frontmatter: {
    category: string;
    date: string;
    title: string;
  };
  excerpt: string;
  slug: string;
};

type Props = {
  data: {
    allMdx: {
      nodes: PostProp[];
    };
  };
  pageContext: {
    category: string;
  };
};

export const query = graphql`
  query CategoriesQuery($category: String) {
    allMdx(
      sort: { order: DESC, fields: frontmatter___date }
      filter: { frontmatter: { category: { eq: $category } } }
    ) {
      nodes {
        frontmatter {
          category
          date(locale: "de", formatString: "d. MMMM YYYY")
          title
        }
        slug
        excerpt(pruneLength: 200)
      }
    }
  }
`;

function CategoriesTemplate({ pageContext, data }: Props) {
  const posts = data.allMdx?.nodes;

  return (
    <MainLayout
      title={`${CATEGORY_TITLES[pageContext.category]} (${posts.length})`}
    >
      <div>
        {posts.map((post) => (
          <PostPreview post={post} key={post.slug} />
        ))}
      </div>
    </MainLayout>
  );
}

export default CategoriesTemplate;
