import * as React from "react";
import { PageProps } from "gatsby";

import MainLayout from "./main";
import Card from "../components/card";

type Props = {
  children: React.ReactNode;
  pageContext: PageProps & {
    frontmatter: {
      title: string;
      sidebar: boolean;
      description: string;
    };
  };
};

function PageLayout({ pageContext, children }: Props) {
  const { title, sidebar, description } = pageContext.frontmatter;

  return (
    <MainLayout title={title} description={description} sidebar={sidebar}>
      <Card as="main">{children}</Card>
    </MainLayout>
  );
}

export default PageLayout;
