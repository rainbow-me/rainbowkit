import { Box } from 'components/Box/Box';
import { components } from 'components/MdxComponents/MdxComponents';
import { TitleAndMetaTags } from 'components/TitleAndMetaTags/TitleAndMetaTags';
import { useLiveReload, useMDXComponent } from 'next-contentlayer/hooks';
import React from 'react';
import { allDocs, Doc } from '.contentlayer/generated';

export default function DocPage({ doc }: { doc: Doc }) {
  const Component = useMDXComponent(doc.body.code);
  useLiveReload();

  return (
    <>
      <TitleAndMetaTags
        description={doc.description}
        title={`${doc.title} — RainbowKit`}
      />
      <Box as="article">
        <Component components={components} />
      </Box>
    </>
  );
}

export async function getStaticPaths() {
  const paths = allDocs.map(doc => `/${doc._raw.flattenedPath}`);
  return {
    fallback: false,
    paths,
  };
}

export async function getStaticProps({ params }) {
  const doc = allDocs.find(doc => doc.slug === params.slug);
  return {
    props: {
      doc,
    },
  };
}
