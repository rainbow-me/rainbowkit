import { Box } from 'components/Box/Box';
import { components } from 'components/MdxComponents/MdxComponents';
import { TitleAndMetaTags } from 'components/TitleAndMetaTags/TitleAndMetaTags';
import { useLiveReload, useMDXComponent } from 'next-contentlayer/hooks';
import React from 'react';
import { type Guide, allGuides } from '.contentlayer/generated';

type GuidePageProps = { guide: Guide };

export default function GuidePage({ guide }: GuidePageProps) {
  const Component = useMDXComponent(guide.body.code);
  useLiveReload();

  return (
    <>
      <TitleAndMetaTags
        description={guide.description}
        image={guide.image}
        title={`${guide.title} — RainbowKit`}
      />
      <Box as="article">
        {/* @ts-ignore */}
        <Component components={components} />
      </Box>
    </>
  );
}

export async function getStaticPaths() {
  const paths = allGuides.map((guide) => `/${guide._raw.flattenedPath}`);
  return {
    fallback: false,
    paths,
  };
}

export async function getStaticProps({
  params,
  locale,
}: { params: any; locale: string }) {
  const guide = allGuides.find(
    (guide) => guide.slug === params.slug && guide.locale === locale,
  );
  return {
    props: {
      guide,
      messages: (await import(`../../locales/${locale}.json`)).default,
    },
  };
}
