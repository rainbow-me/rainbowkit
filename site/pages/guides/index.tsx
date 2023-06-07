import { Box } from 'components/Box/Box';
import { Text } from 'components/Text/Text';
import { TitleAndMetaTags } from 'components/TitleAndMetaTags/TitleAndMetaTags';
import NextLink from 'next/link';
import { useLiveReload } from 'next-contentlayer/hooks';
import React from 'react';
import { allGuides, Guide } from '.contentlayer/generated';

type GuidesPageProps = { guides: Guide[] };

export default function GuidesPage({ guides }: GuidesPageProps) {
  useLiveReload();

  return (
    <>
      <TitleAndMetaTags
        description="RainbowKit is a React library that makes it easy to add wallet connection to your dapp. It's intuitive, responsive and customizable."
        title="Guides RainbowKit"
      />
      <Box
        display="flex"
        flexDirection={{ md: 'row', sm: 'column', xs: 'column' }}
        flexWrap="wrap"
        gap={{ md: '10', xs: '8' }}
      >
        {guides.map(guide => (
          <NextLink
            href={`/guides/${guide.slug}`}
            key={guide.slug}
            legacyBehavior
          >
            <Box
              backgroundColor={{
                base: 'fillElevated',
                focus: 'fillElevated',
                hover: 'fillElevated',
              }}
              borderColor={{
                base: 'transparent',
                focus: 'blue',
                hover: 'blue',
              }}
              borderRadius="3"
              borderWidth="2"
              cursor="pointer"
              display={{ md: 'block', xs: 'none' }}
              padding={{ md: '6', xs: '4' }}
            >
              <Text size={{ md: '4', xs: '3' }} weight="bold">
                {guide.title}
              </Text>
              <Text size={{ md: '4', xs: '3' }}>{guide.description}</Text>
            </Box>
          </NextLink>
        ))}
      </Box>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      guides: allGuides,
    },
  };
}
