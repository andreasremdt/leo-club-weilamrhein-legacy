import * as React from "react";
import styled from "styled-components";

import Card from "./card";
import NavLink from "./nav-link";
import Button from "./button";

type Props = {
  variant?: "default" | "short";
  post: {
    frontmatter: {
      category: string;
      date: string;
      title: string;
    };
    excerpt?: string;
    slug: string;
  };
};

const Post = styled(Card)`
  &:not(:last-child) {
    margin-bottom: 1.5rem;
  }
`;

const PostTitle = styled.h2`
  margin: unset;

  &:is(h4) {
    margin: 1.5rem 0 0;
    font-size: 17px;
  }
`;

const PostDate = styled.span`
  color: var(--gray-400);
  font-size: 14px;
`;

function PostPreview({ post, variant = "default" }: Props) {
  if (variant === "short") {
    return (
      <article>
        <PostTitle as="h4">
          <NavLink to={`/aktionen/${post.frontmatter.category}/${post.slug}`}>
            {post.frontmatter.title}
          </NavLink>
        </PostTitle>
        <PostDate>Veröffentlicht am {post.frontmatter.date}</PostDate>
      </article>
    );
  }

  return (
    <Post as="article" key={post.slug} size="small">
      <PostTitle>
        <NavLink to={`/aktionen/${post.frontmatter.category}/${post.slug}`}>
          {post.frontmatter.title}
        </NavLink>
      </PostTitle>
      <PostDate>Veröffentlicht am {post.frontmatter.date}</PostDate>
      <p>{post.excerpt}</p>
      <Button
        to={`/aktionen/${post.frontmatter.category}/${post.slug}`}
        variant="text"
      >
        Weiterlesen
      </Button>
    </Post>
  );
}

export default PostPreview;
