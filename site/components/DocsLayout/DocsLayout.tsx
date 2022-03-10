/* eslint-disable sort-keys-fix/sort-keys-fix */
import { Wrapper } from 'components/Wrapper/Wrapper';
import { docsRoutes } from 'lib/docsRoutes';
import React from 'react';

export function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <Wrapper>
      <div
        style={{
          position: 'fixed',
          width: 250,
          left: 'calc(50% - 512px)',
          top: 120,
          bottom: 0,
        }}
      >
        {docsRoutes.map(route => (
          <div key={route.label} style={{ marginBottom: 24 }}>
            <h3>{route.label}</h3>
            {route.pages.map(page => (
              <div key={page.title}>{page.title}</div>
            ))}
          </div>
        ))}
      </div>
      <div style={{ paddingLeft: 250, paddingTop: 60 }}>{children}</div>
    </Wrapper>
  );
}
