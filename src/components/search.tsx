import * as React from "react";
import algoliasearch from "algoliasearch/lite";
import { InstantSearch } from "react-instantsearch-dom";

import SearchForm from "./search-form";
import SearchResults from "./search-results";

const indices = [{ name: "posts", title: "Beiträge" }];

const searchClient = algoliasearch(
  process.env.GATSBY_ALGOLIA_APP_ID!,
  process.env.GATSBY_ALGOLIA_SEARCH_KEY!
);

function Search() {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const [query, setQuery] = React.useState("");
  const [hasFocus, setHasFocus] = React.useState(false);

  function handleClickOutside(evt: MouseEvent | TouchEvent) {
    if (
      !rootRef.current ||
      !rootRef.current.contains(evt.target as HTMLDivElement)
    ) {
      setHasFocus(false);
    }
  }

  function handleKeyDown(evt: KeyboardEvent) {
    if (evt.key === "Escape") {
      setHasFocus(false);
    }
  }

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      css={`
        position: relative;
      `}
    >
      <InstantSearch
        searchClient={searchClient}
        indexName={indices[0].name}
        onSearchStateChange={({ query }) => setQuery(query)}
      >
        <SearchForm onFocus={() => setHasFocus(true)} />

        {query && query.length > 0 && hasFocus && (
          <SearchResults indices={indices} />
        )}
      </InstantSearch>
    </div>
  );
}

export default Search;
