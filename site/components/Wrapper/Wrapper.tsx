import React, { ReactNode } from 'react';

import { wrapper } from './Wrapper.css';

export function Wrapper({
  children,
  style,
}: {
  children: ReactNode;
  style: React.CSSProperties;
}) {
  return (
    <div className={wrapper} style={style}>
      {children}
    </div>
  );
}
