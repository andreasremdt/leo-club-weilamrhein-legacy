import * as React from "react";

import Container from "./container";
import useSocialLinks from "../hooks/use-social-links";

function Footer() {
  const socialLinks = useSocialLinks();

  return (
    <footer>
      <Container>
        <section>
          <h3>Über uns</h3>
        </section>
        <section>
          <h3>Aktionen</h3>
        </section>
        <section>
          <h3>Galerie</h3>
        </section>
        <section>
          <h3>Menü</h3>
        </section>
      </Container>
      <Container>
        <nav>
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
                  {link.icon}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <p>
          &copy; {new Date().getFullYear()} Leo-Club Weil am Rhein. Alle Rechte
          vorbehalten.
        </p>
      </Container>
    </footer>
  );
}

export default Footer;
