import { components } from 'components/MdxComponents';
import { useMDXComponent } from 'next-contentlayer/hooks';
import Head from 'next/head';
import React from 'react';
import { allDocs, Doc } from '../../.contentlayer/generated';

export default function DocPage({ doc }: { doc: Doc }) {
  const Component = useMDXComponent(doc.body.code);

  return (
    <>
      <Head>
        <title>{doc.title}</title>
      </Head>
      <article>
        <Component components={components} />
      </article>
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
