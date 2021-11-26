const pageQuery = `
  query AlgoliaSearchQuery {
    allMdx {
      edges {
        node {
          id
          slug
          excerpt(pruneLength: 5000)
          frontmatter {
            title
            date
            category
          }
        }
      }
    }
  }
`;

const queries = [
  {
    query: pageQuery,
    transformer: ({ data }) => {
      return data.allMdx.edges.map(({ node }) => ({
        objectID: node.id,
        title: node.frontmatter.title,
        content: node.excerpt,
        date: node.frontmatter.date,
        slug: `/aktionen/${node.frontmatter.category}/${node.slug}`,
      }));
    },
    indexName: "posts",
    settings: { attributesToSnippet: [`excerpt:20`] },
  },
];

module.exports = queries;
