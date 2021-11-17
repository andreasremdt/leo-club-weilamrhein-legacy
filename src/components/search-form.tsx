import * as React from "react";

function SearchForm() {
  return (
    <form>
      <input type="search" name="q" placeholder="Seite durchsuchen..." />
      <input type="hidden" />
      <button type="submit" aria-label="Suchen">
        <svg width={20} height={20}>
          <use xlinkHref="/symbol-defs.svg#search" />
        </svg>
      </button>
    </form>
  );
}

export default SearchForm;
