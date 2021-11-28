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
        path: "/rss.xml",
      },
    ],
  },
  plugins: [
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "posts",
        path: `${__dirname}/src/posts`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: "gatsby-plugin-algolia",
      options: {
        appId: process.env.GATSBY_ALGOLIA_APP_ID,
        apiKey: process.env.GATSBY_ALGOLIA_ADMIN_KEY,
        queries: require("./src/utils/algolia-queries"),
      },
    },
    {
      resolve: "gatsby-plugin-feed",
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: require("./src/utils/feed-queries"),
      },
    },
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
