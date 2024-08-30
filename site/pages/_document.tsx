import {
  Head,
  Html,
  Main,
  default as NextDocument,
  NextScript,
} from 'next/document';
import React from 'react';

class Document extends NextDocument {
  render() {
    return (
      <Html data-mode="light">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;
