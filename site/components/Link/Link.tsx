import React from 'react';

import { link } from './Link.css';

export function Link(props) {
  return <span className={link} {...props} />;
}
