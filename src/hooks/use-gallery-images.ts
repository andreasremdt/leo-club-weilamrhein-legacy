import { useStaticQuery, graphql } from "gatsby";

type Node = {
  frontmatter: {
    images: string[];
    category: string;
    title: string;
  };
  slug: string;
};

function useGalleryImages() {
  const data = useStaticQuery(graphql`
    query GalleryImagesQuery {
      allMdx(
        limit: 6
        sort: { fields: frontmatter___date, order: DESC }
        filter: { frontmatter: { images: { ne: null } } }
      ) {
        nodes {
          frontmatter {
            images
            category
            title
          }
          slug
        }
      }
    }
  `);

  const images: {
    name: string;
    category: string;
    title: string;
    url: string;
  }[] = data.allMdx.nodes.map((node: Node) => ({
    name: node.frontmatter.images[0],
    category: node.frontmatter.category,
    title: node.frontmatter.title,
    url: `/aktionen/${node.frontmatter.category}/${node.slug}/`,
  }));

  return images;
}

export default useGalleryImages;
