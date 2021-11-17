import { useStaticQuery, graphql } from "gatsby";

type SocialLink = {
  path: string;
  title: string;
  icon: string;
};

function useSocialLinks() {
  const data = useStaticQuery(graphql`
    query GetSocialLinks {
      site {
        siteMetadata {
          socialLinks {
            icon
            path
            title
          }
        }
      }
    }
  `);

  const socialLinks: SocialLink[] = data?.site?.siteMetadata?.socialLinks;

  return socialLinks;
}

export default useSocialLinks;
