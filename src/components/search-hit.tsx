import * as React from "react";
import styled from "styled-components";
import { Highlight, Snippet } from "react-instantsearch-dom";

import formatDate from "../utils/format-date";
import NavLink from "./nav-link";

type Props = {
  hit: {
    slug: string;
    date: string;
  };
};

const Title = styled.h4`
  margin: unset;
`;

const Date = styled.time`
  color: var(--gray-400);
  font-size: 14px;
  display: block;
`;

function SearchHit({ hit }: Props) {
  return (
    <>
      <Title>
        <NavLink to={hit.slug}>
          <Highlight attribute="title" hit={hit} tagName="mark" />
        </NavLink>
      </Title>
      <Date dateTime={hit.date}>{formatDate(hit.date)}</Date>
      <Snippet attribute="content" hit={hit} tagName="mark" />
    </>
  );
}

export default SearchHit;
