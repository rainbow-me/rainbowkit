import { Box } from 'components/Box/Box';
import { components } from 'components/MdxComponents/MdxComponents';
import { TitleAndMetaTags } from 'components/TitleAndMetaTags/TitleAndMetaTags';
import { useLiveReload, useMDXComponent } from 'next-contentlayer/hooks';
import React from 'react';
import { allGuides, Guide } from '.contentlayer/generated';

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
        <Component components={components} />
      </Box>
    </>
  );
}

export async function getStaticPaths() {
  const paths = allGuides.map(guide => `/${guide._raw.flattenedPath}`);
  return {
    fallback: false,
    paths,
  };
}

export async function getStaticProps({ params }) {
  const guide = allGuides.find(guide => guide.slug === params.slug);
  return {
    props: {
      guide,
    },
  };
}
