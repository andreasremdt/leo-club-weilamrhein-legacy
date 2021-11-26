import * as React from "react";
import styled from "styled-components";
import { connectStateResults } from "react-instantsearch-dom";

type Props = {
  searchResults: {
    nbHits: number;
  };
};

const HitCountWrapper = styled.div`
  font: 600 14px var(--font-sans);
  text-transform: uppercase;
  background-color: var(--gray-100);
  padding: 0.75rem 1.5rem;
  margin-bottom: 0.5rem;
`;

function SearchHitCount({ searchResults }: Props) {
  const hitCount = searchResults?.nbHits;

  if (hitCount > 0) {
    return (
      <HitCountWrapper>
        {hitCount} Ergebnis{hitCount !== 1 ? "se" : ""} gefunden:
      </HitCountWrapper>
    );
  }

  return null;
}

export default connectStateResults(SearchHitCount);
