import * as React from "react";
import { PageProps } from "gatsby";
import * as types from "styled-components/cssprop";

import Navigation from "../components/navigation";
import TopHeader from "../components/top-header";
import Container from "../components/container";
import GlobalStyle from "../components/global-style";
import Footer from "../components/footer";

type Props = {
  children: React.ReactNode;
  pageContext: PageProps;
};

function DefaultLayout(props: Props) {
  return (
    <>
      <GlobalStyle />
      <TopHeader />
      <Navigation />

      <Container>{props.children}</Container>

      <Footer />
    </>
  );
}

export default DefaultLayout;
