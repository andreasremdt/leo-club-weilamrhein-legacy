import * as React from "react";

import SearchForm from "./search-form";
import Container from "./container";
import useSocialLinks from "../hooks/use-social-links";

function Navigation() {
  const socialLinks = useSocialLinks();

  return (
    <header>
      <Container>
        <ul>
          {socialLinks.map((link) => (
            <li key={link.icon}>
              <a
                href={link.path}
                title={link.title}
                target="_blank"
                rel="noopener nofollow noreferrer"
              >
                <svg width={20} height={20}>
                  <use xlinkHref={`/symbol-defs.svg#${link.icon}`} />
                </svg>
              </a>
            </li>
          ))}
        </ul>

        <SearchForm />
      </Container>
    </header>
  );
}

export default Navigation;
