/* eslint-disable sort-keys-fix/sort-keys-fix */
/* eslint-disable jsx-a11y/heading-has-content */
import { pre } from 'css/pre.css';
import { h1, h3, p, text } from 'css/text.css';
import React from 'react';
import { Link } from './Link/Link';

export const components = {
  h1: props => <h1 className={h1} {...props} />,
  h2: props => (
    <h2
      className={text[3]}
      {...props}
      style={{ color: 'rgb(157, 160, 168)', marginBottom: 24 }}
    />
  ),
  h3: props => <h3 className={h3} {...props} />,
  p: props => <p className={p} {...props} />,
  a: props => <Link {...props} />,
  Img: props => (
    // eslint-disable-next-line jsx-a11y/alt-text
    <img {...props} style={{ display: 'block', maxWidth: '100%' }} />
  ),
  li: props => <p className={text[4]} style={{ lineHeight: 1.5 }} {...props} />,
  pre: ({ children, ...props }) => {
    return (
      <pre className={pre} {...props}>
        {children}
      </pre>
    );
  },
};
