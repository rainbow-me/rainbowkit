/* eslint-disable react/jsx-sort-props */
/* eslint-disable sort-destructure-keys/sort-destructure-keys */
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

type TitleAndMetaTagsProps = {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  pathname?: string;
};

export function TitleAndMetaTags({
  title = 'RainbowKit',
  description = 'The best way to connect a wallet 🌈',
  image,
  url = 'https://rainbowkit.com',
  pathname,
}: TitleAndMetaTagsProps) {
  const router = useRouter();

  const imageUrl = `${url}/social/${image || 'default.png'}`;
  const path = pathname || router.pathname;

  return (
    <Head>
      <title>{title}</title>

      <meta name="description" content={description} />

      <meta property="og:url" content={`${url}${path}`} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />

      <meta name="twitter:site" content="@rainbowdotme" />
      <meta name="twitter:card" content="summary_large_image" />

      <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
    </Head>
  );
}
