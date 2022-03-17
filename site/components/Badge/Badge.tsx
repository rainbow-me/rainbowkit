import React from 'react';

import { badge } from './Badge.css';

export function Badge(props) {
  return <span className={badge} {...props} />;
}
