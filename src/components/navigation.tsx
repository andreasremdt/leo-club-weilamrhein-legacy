import * as React from "react";
import { Link } from "gatsby";

import Container from "./container";

function Navigation() {
  return (
    <nav>
      <Container>
        <Link to="/">Leo-Club Weil am Rhein</Link>
        <Link to="/aktionen">Aktionen</Link>
        <Link to="/ueber-uns">Über uns</Link>
        <Link to="/mitglied-werden">Mitglied werden</Link>
        <Link to="/kontakt">Kontakt</Link>
      </Container>
    </nav>
  );
}

export default Navigation;
