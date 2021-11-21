import { useStaticQuery, graphql } from "gatsby";

type GatsbyPost = {
  frontmatter: {
    title: string;
    date: string;
    category: string;
  };
  slug: string;
};

type Post = {
  title: string;
  slug: string;
  date: string;
};

function useShortPosts() {
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

  const posts: Post[] = data?.allMdx?.nodes?.map((post: GatsbyPost) => ({
    title: post.frontmatter.title,
    slug: `/aktionen/${post.frontmatter.category}/${post.slug}`,
    date: `Veröffentlicht am ${post.frontmatter.date}`,
  }));

  return posts;
}

export default useShortPosts;
