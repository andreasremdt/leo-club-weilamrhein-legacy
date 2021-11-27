import * as React from "react";
import styled from "styled-components";
import { useStaticQuery, graphql } from "gatsby";

import Button from "./button";
import fancyImageStyles from "../styles/fancy-image";

const Figure = styled.figure`
  border-radius: 2px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  grid-column: 1 / -1;

  ${fancyImageStyles}

  @media (min-width: 650px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const Figcaption = styled.figcaption`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
  padding: 1.5rem 1rem;
  background-color: white;

  @media (min-width: 650px) {
    padding: 2rem;
    position: absolute;
    background: rgba(255, 255, 255, 0.8);
    height: auto;
    max-width: 60%;
    border-radius: 2px;
  }
`;

const Title = styled.h1`
  margin: unset;
  background: transparent url(/leafs.svg) no-repeat;
  background-size: 40px;
  background-position: center bottom;
  padding-bottom: 55px;

  @media (max-width: 580px) {
    font-size: 24px;
  }
`;

function Hero() {
  const data = useStaticQuery(graphql`
    query HeroImage {
      cloudinaryMedia(public_id: { eq: "pflegeheim/20-01" }) {
        secure_url
      }
    }
  `);

  const heroImage = data.cloudinaryMedia?.secure_url;

  return (
    <Figure>
      <img
        src={heroImage}
        alt="Leo-Mitglieder verteilen Rosen im Weiler Pflegeheim"
        height={580}
        css={`
          height: 600px;
          object-fit: cover;
          width: 100%;

          @media (max-width: 650px) {
            height: 50vw;
          }
        `}
      />
      <Figcaption>
        <Title>Miteinander statt Gegeneinander</Title>
        <p>
          Der Leo-Club Weil am Rhein ist ein sozial engagierter Jugendclub aus
          dem Dreiländereck, dessen Mitglieder sich für Menschen mit
          Behinderung, benachteiligte Kinder und Heimbewohner einsetzt.
        </p>
        <Button to="/ueber-uns/">Erfahre mehr über uns</Button>
      </Figcaption>
    </Figure>
  );
}

export default Hero;
