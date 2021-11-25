import * as React from "react";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";
import { useLocation } from "@reach/router";

type Props = {
  title?: string;
  description?: string;
  image?: string;
};

function Seo(props: Props) {
  const location = useLocation();
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            siteUrl
          }
        }
      }
    `
  );

  const defaults = data?.site?.siteMetadata;

  const title = props.title
    ? `${props.title} | ${defaults.title}`
    : defaults.title;
  const description = props.description || defaults.description;
  const image = props.image
    ? new URL(props.image, defaults.siteUrl).toString()
    : null;
  const url = new URL(location.pathname || "/", defaults.siteUrl).toString();

  return (
    <Helmet>
      <html lang="de" />

      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {image && <meta name="image" content={image} />}

      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {image && <meta name="og:image" content={image} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}
    </Helmet>
  );
}

export default Seo;
