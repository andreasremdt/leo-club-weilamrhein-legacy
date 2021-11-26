require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: "Leo-Club Weil am Rhein",
    description:
      "Wir sind Jugendliche und Erwachsene und engagieren uns für das Wohl von benachteiligten Menschen, etwa aus Kinder- oder Pflegeheimen.",
    siteUrl: "https://leo-club-weilamrhein.de",
    socialLinks: [
      {
        icon: "facebook",
        title: "Der Leo-Club auf Facebook",
        path: "https://www.facebook.com/pages/Leo-Club-Weil-am-Rhein/189139934566022",
      },
      {
        icon: "youtube",
        title: "Der Leo-Club auf YouTube",
        path: "https://www.youtube.com/channel/UCvhLu58b0UpRoCAseidSn9Q/",
      },
      {
        icon: "instagram",
        title: "Der Leo-Club auf Instagram",
        path: "https://www.instagram.com/leoclubweilamrhein/",
      },
      {
        icon: "rss",
        title: "Der Leo-Club als RSS Feed",
        path: "/feed.xml",
      },
    ],
  },
  plugins: [
    `gatsby-plugin-image`,
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/posts`,
        name: "posts",
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: "gatsby-plugin-algolia",
      options: {
        appId: process.env.ALGOLIA_APP_ID,
        apiKey: process.env.ALGOLIA_ADMIN_KEY,
        queries: require("./src/utils/algolia-queries"),
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 630,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    // {
    //   resolve: `gatsby-plugin-feed`,
    //   options: {
    //     query: `
    //       {
    //         site {
    //           siteMetadata {
    //             title
    //             description
    //             siteUrl
    //             site_url: siteUrl
    //           }
    //         }
    //       }
    //     `,
    //     feeds: [
    //       {
    //         serialize: ({ query: { site, allMarkdownRemark } }) => {
    //           return allMarkdownRemark.nodes.map((node) => {
    //             return Object.assign({}, node.frontmatter, {
    //               description: node.excerpt,
    //               date: node.frontmatter.date,
    //               url: site.siteMetadata.siteUrl + node.fields.slug,
    //               guid: site.siteMetadata.siteUrl + node.fields.slug,
    //               custom_elements: [{ "content:encoded": node.html }],
    //             });
    //           });
    //         },
    //         query: `
    //           {
    //             allMarkdownRemark(
    //               sort: { order: DESC, fields: [frontmatter___date] },
    //             ) {
    //               nodes {
    //                 excerpt
    //                 html
    //                 fields {
    //                   slug
    //                 }
    //                 frontmatter {
    //                   title
    //                   date
    //                 }
    //               }
    //             }
    //           }
    //         `,
    //         output: "/rss.xml",
    //         title: "Gatsby Starter Blog RSS Feed",
    //       },
    //     ],
    //   },
    // },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "Leo-Club Weil am Rhein",
        short_name: "Leo-Club",
        description:
          "Wir sind Jugendliche und Erwachsene und engagieren uns für das Wohl von benachteiligten Menschen, etwa aus Kinder- oder Pflegeheimen.",
        start_url: "/",
        lang: "de",
        background_color: "#ffffff",
        theme_color: "#efb54b",
        display: "browser",
        icon: "src/images/logo.png",
      },
    },
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-styled-components",
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        defaultLayouts: {
          default: require.resolve("./src/layouts/page.tsx"),
        },
      },
    },
  ],
};
