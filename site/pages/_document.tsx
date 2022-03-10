/* eslint-disable sort-imports */
/* eslint-disable react/jsx-sort-props */
import NextDocument, { Html, Head, Main, NextScript } from 'next/document';
import React from 'react';

const FONT_INTER =
  'https://fonts.googleapis.com/css?family=Inter:400,500,600,700&display=swap';

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="https://zora.co/assets/favicon.ico" />

          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <link href={FONT_INTER} rel="preload" as="style" />
          <link href={FONT_INTER} rel="stylesheet" media="all" />

          <noscript>
            <link href={FONT_INTER} rel="stylesheet" />
          </noscript>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
