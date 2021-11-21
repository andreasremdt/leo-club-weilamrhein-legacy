import * as React from "react";
import { Link } from "gatsby";
import styled from "styled-components";

import useShortPosts from "../hooks/use-posts";

const PostTitle = styled.h4`
  margin: 1.5rem 0 0;
  font-size: 17px;
`;

const PostDate = styled.span`
  color: var(--gray-400);
  font-size: 14px;
`;

const NavLink = styled(Link)`
  transition: color 0.1s linear;

  &:hover,
  &:focus-visible,
  &.active {
    color: var(--yellow);
  }
`;

function ShortPostPreviews() {
  const posts = useShortPosts();

  return (
    <>
      {posts.map((post) => (
        <article key={post.slug}>
          <PostTitle>
            <NavLink to={post.slug}>{post.title}</NavLink>
          </PostTitle>
          <PostDate>{post.date}</PostDate>
        </article>
      ))}
    </>
  );
}

export default ShortPostPreviews;
