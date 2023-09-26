import {
  Head,
  Html,
  Main,
  NextScript,
  default as NextDocument,
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
