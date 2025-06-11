import { Box } from 'components/Box/Box';
import { components } from 'components/MdxComponents/MdxComponents';
import { TitleAndMetaTags } from 'components/TitleAndMetaTags/TitleAndMetaTags';
import { docsRoutes } from 'lib/docsRoutes';
import { useLiveReload, useMDXComponent } from 'next-contentlayer/hooks';
import Head from 'next/head';
import React from 'react';
import pckg from '../../../packages/rainbowkit/package.json';
import { type Doc, allDocs } from '.contentlayer/generated';

const RAINBOWKIT_VERSION = pckg.version as string;

const isProd =
  process.env.NODE_ENV === 'production' &&
  process.env.VERCEL_ENV === 'production';

const DOCSEARCH_VERSION = isProd
  ? `${RAINBOWKIT_VERSION},latest`
  : RAINBOWKIT_VERSION;

type DocPageProps = { doc: Doc; sectionName: string };

export default function DocPage({ doc, sectionName }: DocPageProps) {
  const Component = useMDXComponent(doc.body.code);
  useLiveReload();

  return (
    <>
      <TitleAndMetaTags
        description={doc.description}
        title={`${doc.title} — RainbowKit`}
      />
      <Head>
        <meta name="docsearch:language" content={doc.locale} />
        <meta name="docsearch:version" content={DOCSEARCH_VERSION} />
      </Head>
      <Box as="article">
        <p data-algolia-lvl0 style={{ display: 'none' }}>
          {sectionName}
        </p>
        {/* @ts-ignore */}
        <Component components={components} />
      </Box>
    </>
  );
}

export async function getStaticPaths() {
  const paths = allDocs.map((doc) => `/${doc._raw.flattenedPath}`);
  return {
    fallback: false,
    paths,
  };
}

export async function getStaticProps({
  params,
  locale,
}: { params: any; locale: any }) {
  const doc = allDocs.find(
    (doc) => doc.slug === params.slug && doc.locale === locale,
  )!;
  const sectionName = docsRoutes.reduce((acc, curr) => {
    for (const page of curr.pages) {
      if (page.slug === params.slug) {
        // biome-ignore lint/style/noParameterAssign: TODO
        acc = doc.title;
        break;
      }
    }
    return acc;
  }, '');

  return {
    props: {
      doc,
      sectionName,
      messages: (await import(`../../locales/${locale}.json`)).default,
    },
  };
}
