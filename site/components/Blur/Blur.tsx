import React from 'react';

import { blur } from './Blur.css';

export function Blur({ style }: { style?: React.CSSProperties }) {
  return <span className={blur} style={style} />;
}
