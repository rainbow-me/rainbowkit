/* eslint-disable react/jsx-sort-props */
import { Box } from 'components/Box/Box';
import { SearchIcon } from 'components/Icons/Search';
import { SearchButton } from 'components/Search/Search';
import { Text } from 'components/Text/Text';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { link } from './Sidebar.css';

export function Sidebar({ routes }) {
  return (
    <>
      <SearchButton
        display={{ lg: 'flex', xs: 'none' }}
        marginTop="9"
        marginBottom="7"
        position="relative"
        borderRadius="3"
        paddingRight="5"
        paddingLeft="10"
        paddingY="3"
        alignItems="center"
        color={{
          base: 'transparent',
          focus: 'pink',
        }}
        cursor="pointer"
        width="full"
        transform={{
          active: 'shrink',
          hover: 'grow',
        }}
        transitionDuration="100"
        transitionProperty="all"
        transitionTimingFunction="ease"
        backgroundColor={{
          base: 'fillSecondary',
          focus: 'fillElevated',
          hover: 'fillElevated',
        }}
        style={{
          boxShadow: `inset 0 0 0 1px currentColor, 0 0 0 1px currentColor`,
          outline: 'none',
        }}
      >
        {key => (
          <>
            <Box
              as="span"
              color="blueGray40"
              position="absolute"
              left="4"
              top="0"
              bottom="0"
              display="flex"
              alignItems="center"
              style={{ height: '100%', pointerEvents: 'none' }}
            >
              <SearchIcon />
            </Box>
            <Text size="3" color="blueGray60" style={{ fontWeight: 600 }}>
              Search...
            </Text>
            <Box as="span" marginLeft="auto" fontSize="2" color="blueGray50">
              {key}K
            </Box>
          </>
        )}
      </SearchButton>

      {routes.map(route => (
        <Box key={route.label} marginBottom="7">
          <Text
            as="h3"
            variant="subhead"
            color="labelTertiary"
            marginTop="2"
            marginBottom="4"
            marginLeft="5"
            weight="semibold"
          >
            {route.label}
          </Text>
          {route.pages.map(page => (
            <Link key={page.title} slug={page.slug}>
              {page.title}
            </Link>
          ))}
        </Box>
      ))}
    </>
  );
}

function Link({ children, slug }) {
  const router = useRouter();

  return (
    <NextLink passHref href={`/docs/${slug}`}>
      <Box as="a" className={link({ active: router.query.slug === slug })}>
        {children}
      </Box>
    </NextLink>
  );
}
