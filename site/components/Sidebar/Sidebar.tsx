/* eslint-disable react/jsx-sort-props */
import { Text } from 'components/Text/Text';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { link } from './Sidebar.css';

export function Sidebar({ routes }) {
  return (
    <>
      {routes.map(route => (
        <div key={route.label} style={{ marginBottom: 24 }}>
          <Text as="h3" color="labelTertiary" marginBottom="4" marginLeft="5">
            {route.label}
          </Text>
          {route.pages.map(page => (
            <Link key={page.title} slug={page.slug}>
              {page.title}
            </Link>
          ))}
        </div>
      ))}
    </>
  );
}

function Link({ children, slug }) {
  const router = useRouter();

  return (
    <NextLink passHref href={`/docs/${slug}`}>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a className={link} data-active={router.query.slug === slug}>
        {children}
      </a>
    </NextLink>
  );
}
