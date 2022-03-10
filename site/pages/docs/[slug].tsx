import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import { allDocs, Doc } from '../../.contentlayer/generated';

export default function DocPage({ doc }: { doc: Doc }) {
  return (
    <>
      <Head>
        <title>{doc.title}</title>
      </Head>
      <article>
        <div>
          <Link href="/">
            <a href="/">Home</a>
          </Link>
        </div>
        <div>
          <h1>{doc.title}</h1>
        </div>
        <div
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: doc.body.html }}
        />
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
