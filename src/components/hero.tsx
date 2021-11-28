import * as React from "react";
import styled from "styled-components";

import Button from "./button";
import fancyImageStyles from "../styles/fancy-image";
import CloudinaryImage from "./cloudinary-image";

const Figure = styled.figure`
  border-radius: 2px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  grid-column: 1 / -1;

  ${fancyImageStyles}

  @media (min-width: 800px) {
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

  @media (min-width: 800px) {
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
  return (
    <Figure>
      <CloudinaryImage
        name="20-01.jpg"
        category="pflegeheim"
        alt="Leo-Mitglieder verteilen Rosen im Weiler Pflegeheim"
        width={1200}
        height={580}
        lazy={false}
        css={`
          max-height: 600px;
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
