import {
  Head,
  Html,
  Main,
  default as NextDocument,
  NextScript,
} from 'next/document';
import type React from 'react';

const DocumentHead = Head as unknown as React.ComponentType;
const DocumentMain = Main as unknown as React.ComponentType;
const DocumentNextScript = NextScript as unknown as React.ComponentType;

class Document extends NextDocument {
  render() {
    return (
      <Html data-mode="light">
        <DocumentHead />
        <body>
          <DocumentMain />
          <DocumentNextScript />
        </body>
      </Html>
    );
  }
}

export default Document;
