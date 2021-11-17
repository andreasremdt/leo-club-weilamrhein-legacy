import * as React from "react";
import { PageProps } from "gatsby";
import styled from "styled-components";
import * as types from "styled-components/cssprop";

import Navigation from "../components/navigation";
import TopHeader from "../components/top-header";
import Container from "../components/container";
import Card from "../components/card";
import GlobalStyle from "../components/global-style";
import Footer from "../components/footer";
import Sidebar from "../components/sidebar";

type Props = {
  children: React.ReactNode;
  pageContext: PageProps & FrontmatterProps;
};

type FrontmatterProps = {
  frontmatter: {
    title: string;
    sidebar: boolean;
  };
};

const Grid = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;

  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

function DefaultLayout({ pageContext, children }: Props) {
  return (
    <>
      <GlobalStyle />
      <TopHeader />
      <Navigation />

      <Container>
        <h1>{pageContext.frontmatter.title}</h1>

        <Grid>
          <Card as="main">{children}</Card>
          {pageContext.frontmatter.sidebar && <Sidebar />}
        </Grid>
      </Container>

      <Footer />
    </>
  );
}

export default DefaultLayout;
