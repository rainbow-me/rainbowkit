/* eslint-disable react/jsx-sort-props */
import { text } from 'css/text.css';
import { vars } from 'css/vars.css';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { link } from './Link.css';

export function Sidebar({ routes }) {
  return (
    <>
      {routes.map(route => (
        <div key={route.label} style={{ marginBottom: 24 }}>
          <h3
            className={text[3]}
            style={{
              color: vars.colors.labelTertiary,
              marginBottom: vars.space[4],
            }}
          >
            {route.label}
          </h3>
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
