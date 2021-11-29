import * as React from "react";
import styled, { css } from "styled-components";
import { Link } from "gatsby";

type Props = {
  children: React.ReactNode;
  to?: string;
  variant?: "primary" | "text";
  disabled?: boolean;
  type?: "submit" | "button";
};

const Element = styled.button<{ $variant: string }>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  font-weight: 600;
  transition: background-color 0.1s linear, color 0.1s linear,
    opacity 0.1s linear;

  ${({ $variant }) => {
    if ($variant === "text") {
      return css`
        color: var(--yellow);

        &:hover,
        &:focus-visible {
          color: var(--gray-500);
        }
      `;
    }

    return css`
      background-color: var(--yellow);
      color: white;
      font-size: 14px;
      font-family: var(--font-sans);
      border: unset;
      border-radius: 2px;
      height: 44px;
      padding: 0 1rem;

      &:disabled {
        cursor: not-allowed;
        color: inherit;
        opacity: 0.5;
      }

      &:not(:disabled):hover,
      &:not(:disabled):focus-visible {
        outline: none;
        background-color: var(--gray-500);
        color: white;
      }
    `;
  }}
`;

function Button({
  children,
  to,
  variant = "primary",
  type,
  disabled,
  ...props
}: Props) {
  if (to) {
    return (
      <Element as={Link} to={to} $variant={variant} {...props}>
        {children}
      </Element>
    );
  }

  return (
    <Element $variant={variant} type={type} disabled={disabled} {...props}>
      {children}
    </Element>
  );
}

export default Button;
