import * as React from "react";

import MainLayout from "../layouts/main";
import Button from "../components/button";

function NotFoundPage() {
  return (
    <MainLayout sidebar={false} title="Seite nicht gefunden" showTitle={false}>
      <main
        css={`
          text-align: center;
        `}
      >
        <h1>Seite nicht gefunden</h1>
        <p>
          Leider wurde die gewünschte Seite nicht gefunden. Versichere dich,
          dass du die Adresse richtig geschrieben hast. Möglicherweise wurde der
          Artikel auch geändert oder gelöscht.
        </p>
        <Button to="/">Zur Startseite</Button>
      </main>
    </MainLayout>
  );
}

export default NotFoundPage;
