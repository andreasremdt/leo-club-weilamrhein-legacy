import * as React from "react";
import styled from "styled-components";
import { Link } from "gatsby";

import MainLayout from "../layouts/main";
import Card from "../components/card";
import Title from "../components/title";
import Hero from "../components/hero";
import Button from "../components/button";

const Grid = styled.main`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 1.5rem;
`;

const Section = styled(Card)`
  --columns: 2;
  text-align: center;
  grid-column: span var(--columns);
  display: flex;
  flex-direction: column;

  @media (max-width: 800px) {
    --columns: 6;
  }
`;

function HomePage() {
  return (
    <MainLayout sidebar={false}>
      <Grid>
        <Hero />

        <Section size="small">
          <Title as="h2">Engagieren</Title>
          <p>
            Wir sind Freiwillige im Alter zwischen 14 und 30 Jahren, welche sich
            ehrenamtlich für benachteiligte Menschen einsetzen.
          </p>
          <Button
            variant="text"
            css={`
              margin-top: auto;
            `}
            to="/ueber-uns"
          >
            Mehr erfahren
          </Button>
        </Section>
        <Section size="small">
          <Title as="h2">Bewegen</Title>
          <p>
            Wir unternehmen Ausflüge mit Kindern oder Bewohnern eines
            Pflegeheims, sammeln Spenden oder arbeiten mit den Lions zusammen.
          </p>
          <Button
            variant="text"
            css={`
              margin-top: auto;
            `}
            to="/aktionen"
          >
            Berichte lesen
          </Button>
        </Section>
        <Section size="small">
          <Title as="h2">Mitmachen</Title>
          <p>
            Unser Ziel ist eine Gesellschaft, in der sich jeder sozial engagiert
            und für hilfsbedürftige Menschen einsetzt.
          </p>
          <Button
            variant="text"
            css={`
              margin-top: auto;
            `}
            to="/mitglied-werden"
          >
            Mitglied werden
          </Button>
        </Section>
        <Card
          size="small"
          css={`
            --columns: 3;
            grid-column: span var(--columns);

            @media (max-width: 700px) {
              --columns: 6;
            }
          `}
        >
          <figure
            css={`
              height: 100%;
            `}
          >
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/Y3VODSWWxgI"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </figure>
        </Card>
        <Card
          size="small"
          css={`
            --columns: 3;
            grid-column: span var(--columns);

            @media (max-width: 700px) {
              --columns: 6;
            }
          `}
        >
          <p>
            Leo-Clubs ist eine weltweit tätige, zu den Lions gehörende
            Organisation bestehend aus tausenden von Clubs und noch viel mehr
            Mitgliedern. In der Regel kannst du ab 16 Jahre Leo werden, das
            Maximalalter liegt bei 30.
          </p>
          <p>
            Unser Club wurde 2009 gegründet und hat seither mehr als 200
            Aktionen durchgeführt. Einen Teil dieser Aktionen kannst du im Video
            sehen.
          </p>
          <p>
            Hast du Lust, mitzumachen? Noch nicht sicher, worum es wirklich
            geht? Informiere dich über{" "}
            <Link to="/ueber-uns">unsere Geschichte</Link> oder entdecke{" "}
            <Link to="/aktionen">unsere Aktionen</Link>. Oder lerne mehr über
            die <Link to="/mitglied-werden">Mitgliedschaft</Link>.
          </p>
        </Card>
      </Grid>
    </MainLayout>
  );
}

export default HomePage;
