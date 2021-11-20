import * as React from "react";
import { PageProps } from "gatsby";

import MainLayout from "./main";

type Props = {
  children: React.ReactNode;
  pageContext: PageProps & {
    frontmatter: {
      title: string;
      sidebar: boolean;
    };
  };
};

function PageLayout({ pageContext, children }: Props) {
  const { title, sidebar } = pageContext.frontmatter;

  return (
    <MainLayout title={title} sidebar={sidebar}>
      {children}
    </MainLayout>
  );
}

export default PageLayout;
