import * as React from "react";
import styled, { css } from "styled-components";

import Card from "./card";
import NavLink from "./nav-link";
import Button from "./button";
import formatDate from "../utils/format-date";
import fancyImageStyles from "../styles/fancy-image";
import CloudinaryImage from "./cloudinary-image";

type Props = {
  variant?: "default" | "short";
  headingLevel?: "h4" | "h3";
  post: {
    frontmatter: {
      category: string;
      date: string;
      title: string;
      images?: string[];
    };
    excerpt?: string;
    slug: string;
  };
};

const Post = styled(Card)<{ $thumbnail?: boolean }>`
  ${({ $thumbnail }) => {
    if ($thumbnail) {
      return css`
        @media (min-width: 1000px), (min-width: 500px) and (max-width: 800px) {
          display: grid;
          grid-template-columns: auto auto;
          grid-column-gap: 1.5rem;
        }

        @media (min-width: 800px) and (max-width: 1000px), (max-width: 500px) {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
      `;
    }
  }}

  &:not(:last-child) {
    margin-bottom: 1.5rem;
  }
`;

const PostTitle = styled.h2`
  margin: unset;

  &:is(h2) {
    @media (max-width: 1000px) {
      font-size: 20px;
    }
  }
`;

const PostDate = styled.time`
  color: var(--gray-400);
  font-size: 14px;
`;

const Figure = styled.figure`
  background-color: var(--gray-500);

  @media (min-width: 1000px) {
    width: 300px;
  }

  @media (min-width: 1000px), (min-width: 500px) and (max-width: 800px) {
    grid-row: 1 / 6;
    margin: -1rem 0 -1rem -1rem;
  }

  @media (min-width: 800px) and (max-width: 1000px), (max-width: 500px) {
    order: -1;
    margin: -1rem -1rem 1rem -1rem;
    width: calc(100% + 2rem);
  }

  @media (min-width: 800px) and (max-width: 1000px) {
    height: 40vw;
  }

  @media (min-width: 500px) and (max-width: 800px) {
    width: 30vw;
  }

  @media (max-width: 500px) {
    height: 80vw;
  }

  ${fancyImageStyles}
`;

function PostPreview({
  post,
  variant = "default",
  headingLevel = "h4",
}: Props) {
  if (variant === "short") {
    return (
      <article>
        <PostTitle
          as={headingLevel}
          css={`
            font-size: 17px;
            margin: 1.5rem 0 0;
          `}
        >
          <NavLink to={`/aktionen/${post.frontmatter.category}/${post.slug}/`}>
            {post.frontmatter.title}
          </NavLink>
        </PostTitle>
        <PostDate dateTime={post.frontmatter.date}>
          Veröffentlicht am {formatDate(post.frontmatter.date)}
        </PostDate>
      </article>
    );
  }

  const thumbnail = post.frontmatter.images?.[0];

  return (
    <Post
      as="article"
      key={post.slug}
      size="small"
      $thumbnail={Boolean(thumbnail)}
    >
      <PostTitle>
        <NavLink to={`/aktionen/${post.frontmatter.category}/${post.slug}/`}>
          {post.frontmatter.title}
        </NavLink>
      </PostTitle>

      {thumbnail && (
        <Figure>
          <CloudinaryImage
            name={thumbnail}
            category={post.frontmatter.category}
            alt={post.frontmatter.title}
            width={600}
            height={600}
            objectFit="cover"
            css={`
              width: 100%;
              height: 100%;
            `}
          />
        </Figure>
      )}

      <PostDate dateTime={post.frontmatter.date}>
        Veröffentlicht am {formatDate(post.frontmatter.date)}
      </PostDate>
      <p>{post.excerpt}</p>
      <Button
        to={`/aktionen/${post.frontmatter.category}/${post.slug}/`}
        variant="text"
        css={`
          justify-self: start;
        `}
      >
        Weiterlesen
      </Button>
    </Post>
  );
}

export default PostPreview;
