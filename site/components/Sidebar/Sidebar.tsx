/* eslint-disable react/jsx-sort-props */
import { Box } from 'components/Box/Box';
import { Text } from 'components/Text/Text';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { link } from './Sidebar.css';

export function Sidebar({ routes }) {
  return (
    <>
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
