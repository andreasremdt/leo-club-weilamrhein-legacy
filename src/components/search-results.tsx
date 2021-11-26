import * as React from "react";
import styled from "styled-components";
import { Hits, Index, PoweredBy } from "react-instantsearch-dom";

import SearchHit from "./search-hit";
import SearchHitCount from "./search-hit-count";

type Props = {
  indices: {
    name: string;
  }[];
};

const SearchWrapper = styled.div`
  max-height: 80vh;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  position: absolute;
  z-index: 2;
  right: 0;
  top: 100%;
  width: 80vw;
  max-width: 40em;
  box-shadow: 0 0 5px 0;
  border-radius: 2px 0 0 2px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: white;
  border-top: 1px solid var(--gray-200);

  ul {
    list-style: none;
    padding: unset;
    margin: unset;
  }

  li {
    padding: 0.5rem 1.5rem;
  }
`;

const SearchPoweredBy = styled(PoweredBy)`
  background-color: var(--gray-100);
  padding: 0.5rem 1.5rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-family: var(--font-sans);
  margin-top: 0.5rem;

  a {
    display: inline-flex;
    margin-left: 0.5rem;
  }
`;

function SearchResults({ indices }: Props) {
  return (
    <SearchWrapper>
      {indices.map((index) => (
        <Index key={index.name} indexName={index.name}>
          <SearchHitCount />
          <Hits hitComponent={SearchHit} />
        </Index>
      ))}
      <SearchPoweredBy translations={{ searchBy: "Suche mittels" }} />
    </SearchWrapper>
  );
}

export default SearchResults;
