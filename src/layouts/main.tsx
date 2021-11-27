import * as React from "react";
import styled from "styled-components";
import * as types from "styled-components/cssprop";

import Navigation from "../components/navigation";
import TopHeader from "../components/top-header";
import Container from "../components/container";
import Footer from "../components/footer";
import Sidebar from "../components/sidebar";
import GlobalStyles from "../styles/global-styles";
import Seo from "../components/seo";

type Props = {
  children: React.ReactNode;
  title?: string;
  showTitle?: boolean;
  description?: string;
  image?: string;
  sidebar?: boolean;
};

const Grid = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;

  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

const Title = styled.h1`
  margin: 0 0 0.75rem 0;

  @media (max-width: 800px) {
    font-size: 24px;
  }
`;

function MainLayout({
  title,
  sidebar = true,
  children,
  description,
  image,
  showTitle = true,
}: Props) {
  return (
    <>
      <GlobalStyles />
      <TopHeader />
      <Navigation />
      <Seo title={title} description={description} image={image} />

      <Container id="content">
        {title && showTitle && <Title>{title}</Title>}

        {sidebar ? (
          <Grid>
            {children}
            {sidebar && <Sidebar />}
          </Grid>
        ) : (
          children
        )}
      </Container>

      <Footer />
    </>
  );
}

export default MainLayout;
