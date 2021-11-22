const {
  createFilePath,
  createRemoteFileNode,
} = require(`gatsby-source-filesystem`);

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
      component: require.resolve("./src/layouts/post.tsx"),
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

exports.onCreateNode = async ({
  node,
  actions,
  store,
  cache,
  createNodeId,
}) => {
  const { createNodeField, createNode } = actions;

  if (node.internal.type === "Mdx" && node.frontmatter.testingImg) {
    console.log(node.frontmatter.images);
    const images = node.frontmatter.images.map(
      (image) =>
        `https://res.cloudinary.com/leoclub/image/upload/t_fullscreen,q_75/${node.frontmatter.category}/${image}`
    );

    let t = [];
    for (let image of images) {
      const fileNode = await createRemoteFileNode({
        url: image, // string that points to the URL of the image
        parentNodeId: node.id, // id of the parent node of the fileNode you are going to create
        createNode, // helper function in gatsby-node to generate the node
        createNodeId, // helper function in gatsby-node to generate the node id
        cache, // Gatsby's cache
        store, // Gatsby's Redux store
      });

      if (fileNode) {
        t.push(fileNode);
      }
    }
    createNodeField({ node, name: "localFile", value: t });
  }
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
      social: Social
    }

    type Author {
      name: String
      summary: String
    }

    type Social {
      twitter: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
    }

    type Fields {
      slug: String
    }
  `);
};
