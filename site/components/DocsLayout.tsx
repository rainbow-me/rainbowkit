import { vars } from 'css/vars.css';
import React from 'react';
import { docsRoutes } from '../lib/docsRoutes';
import { Sidebar } from './Sidebar/Sidebar';
import { Wrapper } from './Wrapper/Wrapper';

export function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <Wrapper>
      <div
        style={{
          bottom: 0,
          left: 'calc(50% - 512px)',
          position: 'fixed',
          top: 120,
          width: 250,
        }}
      >
        <div style={{ marginTop: 24 }}>
          <Sidebar routes={docsRoutes} />
        </div>
      </div>

      <div style={{ paddingBottom: 80, paddingLeft: 250, paddingTop: 60 }}>
        <div style={{ paddingLeft: vars.space[11] }}>{children}</div>
      </div>
    </Wrapper>
  );
}
