const feedQuery = `
  query FeedQuery {
    allMdx(sort: { order: DESC, fields: frontmatter___date }) {
      nodes {
        frontmatter {
          date
          title
          category
        }
        slug
        excerpt
        html
      }
    }
  }
`;

const feeds = [
  {
    serialize: ({ query: { site, allMdx } }) => {
      return allMdx.nodes.map((node) => ({
        title: node.frontmatter.title,
        description: node.excerpt,
        date: node.frontmatter.date,
        url: `${site.siteMetadata.siteUrl}/aktionen/${node.frontmatter.category}/${node.slug}`,
        guid: `${site.siteMetadata.siteUrl}/aktionen/${node.frontmatter.category}/${node.slug}`,
        custom_elements: [{ "content:encoded": node.html }],
      }));
    },
    query: feedQuery,
    output: "/rss.xml",
    title: "Leo-Club Weil am Rhein RSS Feed",
  },
];

module.exports = feeds;
