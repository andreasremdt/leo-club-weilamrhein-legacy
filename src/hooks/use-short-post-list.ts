import { useStaticQuery, graphql } from "gatsby";

type Post = {
  frontmatter: {
    title: string;
    category: string;
    date: string;
  };
  slug: string;
};

function useShortPostList() {
  const data = useStaticQuery(graphql`
    query ShortPostsQuery {
      allMdx(sort: { fields: frontmatter___date, order: DESC }, limit: 2) {
        nodes {
          frontmatter {
            title
            date(locale: "de", formatString: "d. MMMM YYYY")
            category
          }
          slug
        }
      }
    }
  `);

  const posts: Post[] = data.allMdx?.nodes;

  return posts;
}

export default useShortPostList;
