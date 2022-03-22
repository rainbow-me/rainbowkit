import React from 'react';

import { link } from './Link.css';

export function Link(props) {
  // eslint-disable-next-line jsx-a11y/anchor-has-content
  return <a className={link} {...props} />;
}
