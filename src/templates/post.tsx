import * as React from "react";
import { graphql } from "gatsby";
import styled, { css } from "styled-components";
import { MDXRenderer } from "gatsby-plugin-mdx";

import Card from "../components/card";
import Banner from "../components/banner";
import Button from "../components/button";
import MainLayout from "../layouts/main";
import generateImageUrl from "../utils/image-urls";

type Props = {
  data: {
    mdx: {
      frontmatter: {
        date: string;
        images: string[];
        title: string;
        category: string;
      };
      body: string;
    };
  };
};

const Header = styled.header<{ $thumbnail: boolean }>`
  --spacing: -1.5rem;
  text-align: center;
  background: transparent url(/leafs.svg) no-repeat;
  background-size: 40px;
  background-position: center bottom;
  padding: 30px 0 55px;
  position: relative;
  background-color: white;
  border-radius: 2px;
  transform: translateY(
    ${({ $thumbnail }) => ($thumbnail ? "-4rem" : "-2rem")}
  );

  ${({ $thumbnail }) => {
    if ($thumbnail) {
      return css`
        &::before,
        &::after {
          content: "";
          z-index: -1;
          position: absolute;
          border: 1px solid rgba(255, 255, 255, 0.8);
          bottom: 0;
        }

        &::before {
          top: calc(var(--spacing) - 2px);
          left: calc(var(--spacing) + 2px);
          right: calc(var(--spacing) + 2px);
        }

        &::after {
          top: var(--spacing);
          left: var(--spacing);
          right: var(--spacing);
        }

        @media (max-width: 1000px) {
          --spacing: -0.5rem;
        }
      `;
    }
  }}
`;

const Title = styled.h1`
  font-size: 24px;
  margin: 1.5rem 0 0;
`;

const Date = styled.span`
  color: var(--gray-400);
  font-size: 14px;
`;

const Figure = styled.figure`
  --spacing: -3rem;
  order: -1;
  margin: var(--spacing);
  background-color: var(--gray-500);

  @media (max-width: 1000px) {
    --spacing: -1rem;
  }
`;

const Image = styled.img`
  width: 100%;
  border-radius: 2px 2px 0 0;
  height: 450px;
  object-fit: cover;

  @media (max-width: 800px) {
    height: 60vw;
  }
`;

const Gallery = styled.figure`
  --columns: 3;
  --gap: 1.5rem;
  display: grid;
  grid-template-columns: repeat(var(--columns), 1fr);
  gap: var(--gap);
  margin-top: 3rem;

  @media (max-width: 1000px) {
    --gap: 1rem;
  }

  @media (min-width: 800px) and (max-width: 1000px) {
    --columns: 2;
  }

  @media (max-width: 600px) {
    --columns: 2;
  }
`;

const GalleryImage = styled.img`
  object-fit: cover;
  aspect-ratio: 16/9;
`;

export const query = graphql`
  query PostQuery($id: String!) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        images
        date(formatString: "d. MMMM YYYY", locale: "de")
        category
      }
      body
    }
  }
`;

function PostLayout({ data }: Props) {
  const post = data?.mdx;
  const thumbnail = post.frontmatter.images?.[0];

  return (
    <MainLayout sidebar={true}>
      <Card
        as="main"
        css={`
          display: flex;
          flex-direction: column;
        `}
      >
        <Header $thumbnail={Boolean(thumbnail)}>
          <Banner variant="light">{post.frontmatter.category}</Banner>
          <Title>{post.frontmatter.title}</Title>
          <Date>Veröffentlicht am {post.frontmatter.date}</Date>
        </Header>

        {thumbnail && (
          <Figure>
            <Image
              src={generateImageUrl(
                post.frontmatter.images[0],
                post.frontmatter.category,
                800
              )}
              alt=""
              width={800}
              height={450}
            />
          </Figure>
        )}

        <MDXRenderer>{post.body}</MDXRenderer>

        <Button
          to="/aktionen"
          variant="text"
          css={`
            align-self: flex-start;
          `}
        >
          Zurück zu Aktionen
        </Button>

        {post.frontmatter?.images?.length > 0 && (
          <Gallery>
            {post.frontmatter.images.map((image) => (
              <GalleryImage
                src={generateImageUrl(image, post.frontmatter.category, 300)}
                alt=""
                key={image}
                loading="lazy"
                width={300}
                height={180}
              />
            ))}
          </Gallery>
        )}
      </Card>
    </MainLayout>
  );
}

export default PostLayout;
