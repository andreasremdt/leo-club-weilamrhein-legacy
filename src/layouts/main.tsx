import * as React from "react";
import styled from "styled-components";
import * as types from "styled-components/cssprop";

import Navigation from "../components/navigation";
import TopHeader from "../components/top-header";
import Container from "../components/container";
import Footer from "../components/footer";
import Sidebar from "../components/sidebar";
import GlobalStyles from "../styles/global-styles";

type Props = {
  children: React.ReactNode;
  title?: string;
  sidebar: boolean;
};

const Grid = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;

  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

function MainLayout({ title, sidebar = true, children }: Props) {
  return (
    <>
      <GlobalStyles />
      <TopHeader />
      <Navigation />

      <Container>
        {title && <h1>{title}</h1>}

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
