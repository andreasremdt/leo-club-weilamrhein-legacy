import * as React from "react";
import styled from "styled-components";

const Form = styled.form`
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  border: unset;
  font-family: var(--font-sans);
  padding-left: 0.75rem;
  height: 40px;
`;

const Button = styled.button`
  background-color: transparent;
  border: none;
  padding: unset;
  color: var(--gray-300);
  display: flex;

  &:hover,
  &:focus-visible {
    color: var(--gray-500);
  }
`;

function SearchForm() {
  return (
    <Form>
      <Input type="search" name="q" placeholder="Seite durchsuchen..." />
      <input type="hidden" />
      <Button type="submit" aria-label="Suchen">
        <svg width={20} height={20}>
          <use xlinkHref="/symbol-defs.svg#search" />
        </svg>
      </Button>
    </Form>
  );
}

export default SearchForm;
