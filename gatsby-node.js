exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const result = await graphql(`
    query PostsAndCategoriesQuery {
      allMdx(sort: { order: DESC, fields: frontmatter___date }) {
        group(field: frontmatter___category) {
          fieldValue
        }
        nodes {
          frontmatter {
            category
            images
          }
          slug
          id
        }
      }
    }
  `);

  if (result.errors) {
    return reporter.panicOnBuild(
      "There was an error loading your blog posts",
      result.errors
    );
  }

  // Create all post pages.
  const posts = result.data?.allMdx?.nodes;

  posts.forEach((post) => {
    createPage({
      path: `/aktionen/${post.frontmatter.category}/${post.slug}`,
      component: require.resolve("./src/templates/post.tsx"),
      context: {
        id: post.id,
      },
    });
  });

  // Create pages for all categories.
  const categories = result.data?.allMdx?.group;

  categories.forEach((category) => {
    createPage({
      path: `/aktionen/${category.fieldValue}`,
      component: require.resolve("./src/templates/categories.tsx"),
      context: {
        category: category.fieldValue,
      },
    });
  });
};

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;

  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.js

  // Also explicitly define the Markdown frontmatter
  // This way the "MarkdownRemark" queries will return `null` even when no
  // blog posts are stored inside "content/blog" instead of returning an error
  createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
    }

    type Author {
      name: String
      summary: String
    }
  `);
};
