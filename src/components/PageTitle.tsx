import Head from 'next/head';
import { FC } from 'react';

interface PageTitleProps {
  title: string;
}

const PageTitle: FC<PageTitleProps> = ({ title }) => (
  <Head>
    <title>{title}</title>
  </Head>
);

export default PageTitle;
